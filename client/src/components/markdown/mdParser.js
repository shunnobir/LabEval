import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function mdParser(buffer) {
  let curPos = -1;

  const Enums = {
    BOLD: 0,
    ITALIC: 1,
    UNDERLINE: 2,
    INLINE_CODE: 3,
    SUP: 4,
    SUB: 5,
    BOXED: 6,
    CHARACTER: 7,
  };

  const isWs = (c) =>
    c === " " || c === "\t" || c === "\r" || c === "\v" || c === "\f";

  const isNewline = (c) => c == "\n";

  const peek = () => (curPos + 1 >= buffer.length ? "\0" : buffer[curPos + 1]);

  const peekNext = () =>
    curPos + 2 >= buffer.length ? "\0" : buffer[curPos + 2];

  const peekPastNext = () =>
    curPos + 3 >= buffer.length ? "\0" : buffer[curPos + 3];

  const next = () => {
    if (curPos + 1 >= buffer.length) return "\0";
    let ret = buffer[curPos + 1];
    curPos += 1;
    return ret;
  };

  const skipWs = () => {
    while (isWs(peek()) && peek() !== "\0") next();
  };

  const skipNewline = () => {
    while (isNewline(peek()) && peek() !== "\0") next();
  };

  const nextToken = () => {
    skipWs();
    skipNewline();

    switch (peek()) {
      case "*":
        if (peekNext() === "*") {
          next();
          next();
          return Enums.BOLD;
        } else {
          next();
          return Enums.ITALIC;
        }
      case "_":
        next();
        if (peek() === "{") {
          next();
          return Enums.SUB;
        } else {
          return Enums.UNDERLINE;
        }
      case "`":
        next();
        return Enums.INLINE_CODE;
      case "^":
        next();
        if (peek() === "{") {
          next();
          return Enums.SUP;
        } else {
          curPos--;
          return Enums.CHARACTER;
        }
      case "[":
        next();
        return Enums.BOXED;
      default:
        return Enums.CHARACTER;
    }
  };

  const parseBlockStatement = () => {
    if (peek() === "#") {
      return parseHeading();
    } else if (peek() === "-") {
      next();
      return parseUnorderedlist();
    } else if (peek() === "=") {
      next();
      return parseOrderedlist();
    } else if (peek() === "`" && peekNext() === "`" && peekPastNext() === "`") {
    } else {
      let r = [];
      while (!isNewline(peek()) && peek() !== "\0")
        r.push(parseSimpleStatement());
      next();
      return <p key={curPos}> {...r} </p>;
    }
  };

  const parseSimpleStatement = (stopChars = "*_[`^") => {
    let token = nextToken();
    switch (token) {
      case Enums.BOLD:
        return parseBold();
      case Enums.ITALIC:
        return parseItalic();
      case Enums.UNDERLINE:
        return parseUnderscore();
      case Enums.INLINE_CODE:
        return parseInlineCode();
      case Enums.SUB:
        return parseSubscript();
      case Enums.SUP:
        return parseSuperscript();
      case Enums.BOXED:
        return parseBoxedStatement();
      case Enums.CHARACTER:
        return parseCharacter(stopChars);
    }
  };

  const parseCharacter = (stopChars = "*_[`^") => {
    let r = "";
    let _prevPos = curPos + 1;
    while (!isNewline(peek()) && peek() !== "\0") {
      if (stopChars.includes(peek())) break;
      next();
    }
    r += buffer.substring(_prevPos, curPos + 1);
    return <span key={curPos}> {r} </span>;
  };

  const parseBold = () => {
    let lst = [];
    let _prevPos = curPos + 1;

    while (!(peek() === "*" && peekNext() === "*") && !isNewline(peek())) {
      if (peek() === "\0" || peekNext() === "\0") break;
      lst.push(parseSimpleStatement());
    }

    if (peek() === "*" && peekNext() === "*") {
      let r = <strong key={curPos}> {...lst} </strong>;
      next();
      next();
      return r;
    }

    if (peek() === "\0" || peekNext() === "\0" || isNewline(peek()))
      return (
        <span key={curPos}>
          {"**" +
            buffer.substring(_prevPos, curPos + 1 + (peek() === "\0" ? 1 : 0))}
        </span>
      );

    return (
      <span key={curPos}>{"**" + buffer.substring(_prevPos, curPos + 1)}</span>
    );
  };

  const parseItalic = () => {
    let lst = [];
    let _prevPos = curPos + 1;

    while (peek() !== "*" && !isNewline(peek()) && peek() !== "\0") {
      lst.push(parseSimpleStatement());
    }

    if (peek() === "*") {
      let r = <em key={curPos}> {...lst} </em>;
      next();
      return r;
    }

    if (peek() === "\0" || isNewline(peek()))
      return (
        <span key={curPos}>{"*" + buffer.substring(_prevPos, curPos + 1)}</span>
      );

    return (
      <span key={curPos}>{"*" + buffer.substring(_prevPos, curPos + 1)}</span>
    );
  };

  const parseUnderscore = () => {
    let _prevPos = curPos + 1;
    let lst = [];

    while (peek() !== "_" && !isNewline(peek()) && peek() !== "\0") {
      lst.push(parseSimpleStatement());
    }

    if (peek() === "_") {
      let r = <u key={curPos}> {...lst} </u>;
      next();
      return r;
    }

    if (isNewline(peek()) || peek() === "\0")
      return (
        <span key={curPos}>{"_" + buffer.substring(_prevPos, curPos + 1)}</span>
      );
  };

  const parseInlineCode = () => {
    let _prevPos = curPos + 1;
    let lst = [];

    while (peek() !== "`" && !isNewline(peek()) && peek() !== "\0")
      lst.push(parseCharacter("`"));

    if (peek() === "`") {
      let r = (
        <span
          key={curPos}
          className={
            robotoMono.className +
            " text-blue-500 border border-solid border-slate-300 bg-slate-200 w-max min-h-[20px] inline-flex flex-row items-center rounded-[5px] whitespace-pre"
          }
        >
          {...lst}
        </span>
      );
      next();
      return r;
    }

    return (
      <span key={curPos}> {"`" + buffer.substring(_prevPos, curPos + 1)} </span>
    );
  };

  const parseSubscript = () => {
    let _prevPos = curPos + 1;
    let lst = [];

    while (peek() !== "}" && !isNewline(peek()) && peek() !== "\0")
      lst.push(parseSimpleStatement("*_[`^}"));

    if (peek() === "}") {
      let r = (
        <sub key={curPos} className="inline-flex flex-row items-center gap-1">
          {...lst}
        </sub>
      );
      next();
      return r;
    }

    return (
      <span key={curPos}>{"_{" + buffer.substring(_prevPos, curPos + 1)}</span>
    );
  };

  const parseSuperscript = () => {
    let _prevPos = curPos + 1;
    let lst = [];

    while (peek() !== "}" && !isNewline(peek()) && peek() !== "\0")
      lst.push(parseSimpleStatement("*_[`^}"));

    if (peek() === "}") {
      let r = (
        <sup key={curPos} className="inline-flex flex-row items-center gap-1">
          {...lst}
        </sup>
      );
      next();
      return r;
    }

    return (
      <span key={curPos}>{"_{" + buffer.substring(_prevPos, curPos + 1)}</span>
    );
  };

  const parseHeading = () => {
    next();
    let headingNo = 1;
    while (peek() === "#" && !isNewline(peek()) && peek() !== "\0") {
      next();
      ++headingNo;
    }

    let lst = [];
    while (!isNewline(peek()) && peek() !== "\0")
      lst.push(parseSimpleStatement());

    if (headingNo <= 6) {
      let fontSizes = ["2rem", "1.5rem", "1.3rem", "1rem", "0.8rem", "0.7rem"];
      return (
        <span
          key={curPos}
          className="block"
          style={{ fontSize: fontSizes[headingNo - 1] }}
        >
          {...lst}
        </span>
      );
    } else {
      return <p key={curPos}> {...lst} </p>;
    }
  };

  const parseAttributes = () => {
    let lst = {
      color: "",
      href: "",
      src: "",
      scale: "",
    };
    while (peek() !== "}" && !isNewline(peek()) && peek() !== "\0") {
      skipWs();
      let attr = "";
      while (peek() !== "=" && !isNewline(peek()) && peek() !== "\0") {
        skipWs();
        attr += next();
      }

      if (isNewline(peek()) || peek() === "\0") {
        return [];
      }

      next();

      let val = "";
      skipWs();
      while (
        peek() !== "," &&
        peek() !== "}" &&
        !isNewline(peek()) &&
        peek() !== "\0"
      ) {
        if (peek() === "\\") next();
        skipWs();
        val += next();
      }

      if (isNewline(peek()) || peek() === "\0") {
        return [];
      }

      if (peek() === ",") next();

      attr.trim();
      val.trim();
      switch (attr) {
        case "color":
          if (
            val !== "red" &&
            val !== "green" &&
            val !== "blue" &&
            val !== "yellow"
          )
            break;
          lst.color = val;
          break;
        case "href":
          lst.href = val;
          break;
        case "src":
          lst.src = val;
          break;
        case "scale":
          lst.scale = val;
          break;
        default:
          break;
      }
    }

    if (peek() !== "}") {
      return [];
    }

    next();
    return lst;
  };

  const parseBoxedStatement = () => {
    let _prevPos = curPos + 1;
    let lst = [];

    while (peek() !== "]" && !isNewline(peek()) && peek() !== "\0") {
      lst.push(parseCharacter("]"));
    }

    if (peek() === "]") {
      next();

      if (peek() !== "{") {
        return (
          <span key={curPos}> {"[" + buffer.substring(_prevPos, curPos)} </span>
        );
      }

      next();
      let attributes = parseAttributes();
      if (attributes.length === 0) {
        return (
          <span key={curPos}>
            {"[" + buffer.substring(_prevPos, curPos + 1)}
          </span>
        );
      }

      return (
        <span
          key={curPos}
          style={{
            color: attributes.color
              ? `var(--${attributes.color}-500)`
              : "var(--slate-900)",
          }}
        >
          {attributes.href ? (
            <a href={attributes.href}>
              {attributes.src ? (
                <img
                  src={attributes.src}
                  style={{
                    transform: `scale(${
                      attributes.scale ? attributes.scale : 1
                    })`,
                  }}
                />
              ) : (
                <span> {...lst} </span>
              )}
            </a>
          ) : attributes.src ? (
            <img
              src={attributes.src}
              style={{
                transform: `scale(${attributes.scale ? attributes.scale : 1})`,
              }}
            />
          ) : (
            <span> {...lst} </span>
          )}
        </span>
      );
    }
  };

  const parseUnorderedlist = (indent = 0) => {
    let lst = [];
    let r = [];

    while (peek() !== "\0" && !(isNewline(peek()) && isNewline(peekNext()))) {
      let spaceCount = 0;
      let _pPos = curPos;
      while (isWs(peek())) {
        next();
        spaceCount++;
      }

      if (peek() === "-" && spaceCount > indent * 4 && spaceCount % 4 === 0) {
        next();
        lst.push(parseUnorderedlist(indent + 1));
      } else {
        while (!isNewline(peek()) && peek() !== "\0") {
          lst.push(parseSimpleStatement());
        }
      }

      if (isNewline(peek()) && isNewline(peekNext())) {
        next();
        next();
        break;
      }

      if (isNewline(peek())) next();

      spaceCount = 0;
      _pPos = curPos;
      while (isWs(peek())) {
        next();
        ++spaceCount;
      }

      if (spaceCount === indent * 4 && peek() === "-") {
        r.push(<li> {...lst} </li>);
        lst = [];
        next();
        continue;
      } else if (spaceCount < indent * 4 && peek() === "-") {
        curPos = _pPos;
        break;
      }

      curPos = _pPos;
    }

    r.push(<li> {...lst} </li>);
    return <ul key={curPos}> {...r} </ul>;
  };

  const parseOrderedlist = (indent = 0) => {
    let lst = [];
    let r = [];

    while (peek() !== "\0" && !(isNewline(peek()) && isNewline(peekNext()))) {
      let spaceCount = 0;
      let _pPos = curPos;
      while (isWs(peek())) {
        next();
        spaceCount++;
      }

      if (peek() === "=" && spaceCount > indent * 4 && spaceCount % 4 === 0) {
        next();
        lst.push(parseOrderedlist(indent + 1));
      } else {
        while (!isNewline(peek()) && peek() !== "\0") {
          lst.push(parseSimpleStatement());
        }
      }

      if (isNewline(peek()) && isNewline(peekNext())) {
        next();
        next();
        break;
      }

      if (isNewline(peek())) next();

      spaceCount = 0;
      _pPos = curPos;
      while (isWs(peek())) {
        next();
        ++spaceCount;
      }

      if (spaceCount === indent * 4 && peek() === "=") {
        r.push(<li> {...lst} </li>);
        lst = [];
        next();
        continue;
      } else if (spaceCount < indent * 4 && peek() === "=") {
        curPos = _pPos;
        break;
      }

      curPos = _pPos;
    }

    r.push(<li> {...lst} </li>);
    return <ol key={curPos}> {...r} </ol>;
  };

  let r = [];
  while (peek() !== "\0") {
    r.push(parseBlockStatement());
  }

  return (
    <div className="labeval-markdown-content h-full w-full py-2 px-4">
      {...r}
    </div>
  );
}

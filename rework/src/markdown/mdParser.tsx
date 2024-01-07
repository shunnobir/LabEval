"use client";

import { Roboto_Mono } from "next/font/google";
import Table from "@/components/Table";
import Image from "next/image";

const robotoMono = Roboto_Mono({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const TokenType = {
  STRONG: 1,
  EM: 2,
  BREAK: 3,
  INLINE_CODE: 4,
  UNDERLINE: 5,
  SUP: 6,
  SUB: 7,
  BOXED: 8,
  TEXT: 9,
  HEADING: 10,
  ULIST: 11,
  OLIST: 12,
  CODE: 13,
  PARA: 14,
  TABLE: 15,
  BLQUOTE: 16,
  HLINE: 17,
  ULIST_ITEMS: 18,
  OLIST_ITEMS: 19,
  HR: 20,
  TABLE_CELL: 22,
  TABLE_ROW: 23,
  TABLE_HEADING: 24,
  SPAN: 24,
  MATH: 25,
  CODE_BLOCK: 26,
  NEWLINE: 996,
  SPACE: 997,
  TAB: 998,
  EOF: 999,
};

function labevalMarkdownRawTextTokenizer(src: string) {
  let tokens = [];
  let curPos = -1;

  const peek = (offset: number): any => {
    if (offset < 0 && curPos + offset < 0) return "\0";
    if (curPos + offset >= src.length) return "\0";
    return src[curPos + offset];
  };

  const peekMultiple = (n: number): any => {
    let ret = src.slice(curPos + 1, curPos + 1 + n);
    return ret;
  };

  const consume = (n: number): any => {
    let ret = "";
    let start = curPos + 1;
    for (let i = start; i < start + n && i < src.length; ++i, ++curPos)
      ret += src[i];
    return ret;
  };

  const isEof = (): any => peek(1) === "\0";

  const consumeNewline = (): any => {
    consume(1);
    return { type: TokenType.BREAK, tag: "<br />" };
  };

  const consumeStrong = (): any => {
    consume(2); // Consume /\*\*/
    let tokens = [];
    while (!isEof() && !/\*\*/.test(peekMultiple(2)))
      tokens.push(tokenizeAll());
    if (isEof() || !/\*\*/.test(peekMultiple(2))) {
      return {
        type: TokenType.SPAN,
        tag: "<span>",
        tokens: [{ type: TokenType.TEXT, raw: "**" }, ...tokens],
      };
    }
    consume(2);
    return { type: TokenType.STRONG, tag: "<strong>", tokens: tokens };
  };

  const consumeEmphasis = (): any => {
    consume(1); // Consume /\*/
    let tokens = [];
    while (!isEof() && !/\*/.test(peek(1))) tokens.push(tokenizeAll());
    if (isEof() || !/\*/.test(peek(1))) {
      return {
        type: TokenType.SPAN,
        tag: "<span>",
        tokens: [{ type: TokenType.TEXT, raw: "*" }, ...tokens],
      };
    }
    consume(1);
    return { type: TokenType.EM, tag: "<em>", tokens: tokens };
  };

  const consumeBoxedStatement = (): any => {
    let offset = 2;
    while (peek(offset) !== "\0" && peek(offset) !== "]") ++offset;
    if (peek(offset) === "\0" || peek(offset) !== "]") {
      consume(1);
      return {
        type: TokenType.SPAN,
        tag: "<span>",
        tokens: [
          { type: TokenType.TEXT, tag: "<text>", raw: "[" },
          consumeText(),
        ],
      };
    }
    ++offset;
    while (peek(offset) !== "\0" && peek(offset) === " ") ++offset;
    if (peek(offset) === "\0" || peek(offset) !== "{") {
      consume(1);
      return {
        type: TokenType.SPAN,
        tag: "<span>",
        tokens: [
          { type: TokenType.TEXT, tag: "<text>", raw: "[" },
          consumeText(),
        ],
      };
    }
    ++offset;
    while (peek(offset) !== "\0" && peek(offset) !== "}") ++offset;
    if (peek(offset) === "\0" || peek(offset) !== "}") {
      consume(1);
      return {
        type: TokenType.SPAN,
        tag: "<span>",
        tokens: [
          { type: TokenType.TEXT, tag: "<text>", raw: "[" },
          consumeText(),
        ],
      };
    }
    ++offset;
    consume(1);
    let content = [];
    while (peek(1) !== "]") {
      if (/\\n/.test(peekMultiple(2))) {
        consume(2);
        content.push({ type: TokenType.BREAK, tag: "<br />" });
      } else {
        content.push(consumeText());
      }
    }
    consume(1);
    while ((peek(1) === " " || peek(1) === "\n") && peek(1) !== "}") consume(1);
    consume(1);
    let curlText = "";
    while (peek(1) !== "}") curlText += consume(1);
    consume(1);
    let attributes = curlText.split(",").map((val): any => {
      let t = val.split("=");
      return { attribute: t[0].trim(), value: t[1].trim() };
    });
    return { type: TokenType.BOXED, attributes, content: content };
  };

  const consumeInlineCode = (): any => {
    consume(1);
    let content = "";
    while (!isEof() && peek(1) !== "`") {
      if (peek(1) === "\n") consume(1);
      else content += consume(1);
    }
    if (isEof()) {
      return { type: TokenType.TEXT, tag: "<text>", raw: "`" + content };
    }
    consume(1);
    return { type: TokenType.INLINE_CODE, raw: content };
  };

  const consumeInlineMath = (): any => {
    let offset = 2;
    while (
      peek(offset) !== "\0" &&
      peek(offset) !== "$" &&
      peek(offset) !== "\n"
    )
      ++offset;
    if (peek(offset) === "\0" || peek(offset) === "\n") {
      consume(1);
      return { type: TokenType.TEXT, tag: "<text>", raw: "$" };
    }

    let raw = src.slice(curPos + 2, curPos + offset);
    consume(raw.length + 2);
    return {
      type: TokenType.TEXT,
      tag: "<text>",
      raw: "\\(" + raw + "\\)",
    };
  };

  const consumeText = (): any => {
    let raw: any = src
      ?.slice(curPos + 1, src.length)
      .match(/^[^\$\*<\\\[\]`]*/); // `
    raw = raw ? raw[0].toString() : "";
    curPos += raw.length;
    if (/\\[^n]/.test(peekMultiple(2))) {
      raw += peek(2);
      curPos += 2;
    }
    return {
      type: TokenType.TEXT,
      tag: "<text>",
      raw: raw,
    };
  };

  const tokenizeAll = (): any => {
    if (/\n/.test(peek(1))) {
      return consumeNewline();
    } else if (/\*\*/.test(peekMultiple(2))) {
      return consumeStrong();
    } else if (/\*/.test(peek(1))) {
      return consumeEmphasis();
    } else if (/\\n/.test(peekMultiple(2))) {
      consume(2);
      return { type: TokenType.BREAK, tag: "<br />" };
    } else if (/\[/.test(peek(1))) {
      return consumeBoxedStatement();
    } else if (peek(1) === "`") {
      return consumeInlineCode();
    } else if (peek(1) === "$") {
      return consumeInlineMath();
    } else {
      return consumeText();
    }
  };

  while (!isEof()) {
    tokens.push(tokenizeAll());
  }

  return tokens;
}

function labEvalMarkdownTokenizer(src: string) {
  src = src.replace(/(\r\n|\n\r|\n)/, "\n").replace(/\t/, "    ");

  let curPos = -1;
  let tokens = [];

  const peek = (offset: number): any => {
    if (offset < 0 && curPos + offset < 0) return "\0";
    if (curPos + offset >= src.length) return "\0";
    return src[curPos + offset];
  };

  const consume = (n: number): any => {
    let ret = "";
    let start = curPos + 1;
    for (let i = start; i < start + n && i < src.length; ++i, ++curPos)
      ret += src[i];
    return ret;
  };

  const isEof = (): any => peek(1) === "\0";

  const isNewline = (): any => peek(1) === "\n";

  const isContinuousNewlines = (): any => {
    let offset = 1,
      newlines = 0;
    while (/^[\s\n]{1}/.test(peek(offset))) {
      while (peek(offset) === " ") ++offset;
      if (peek(offset) !== "\n") return 0;
      while (peek(offset) === "\n") {
        ++offset;
        ++newlines;
      }
    }
    return newlines > 1 ? offset - 1 : 0;
  };

  const isHeading = (): any => {
    if (curPos > 0 && peek(0) !== "\n") return false;
    let spaceCount = 0;
    while (peek(spaceCount + 1) === " ") ++spaceCount;
    if (spaceCount > 3) return false;
    let heading = 0;
    while (peek(spaceCount + 1) === "#") {
      ++heading;
      ++spaceCount;
    }
    if (heading > 6 || heading < 1) return false;
    return true;
  };

  const isUlistItem = (): any => {
    if (curPos > 0 && peek(0) !== "\n") return { indent: -1 };
    let indent = 0,
      spaceCount = 0;
    while (peek(spaceCount + 1) === " ") ++spaceCount;
    indent = Math.floor(spaceCount / 4);
    if (
      /(-|\+|\*)/.test(peek(spaceCount + 1)) &&
      /\s/.test(peek(spaceCount + 2))
    ) {
      return { indent: indent };
    }
    return { indent: -1 };
  };

  const isOlistItem = (): any => {
    if (curPos > 0 && peek(0) !== "\n")
      return { indent: -1, start: -1, len: -1 };
    let indent = 0,
      spaceCount = 0;
    while (peek(spaceCount + 1) === " ") ++spaceCount;
    indent = Math.floor(spaceCount / 4);
    if (/\d/.test(peek(spaceCount + 1))) {
      let digitCount = 0,
        start = 0;
      while (/\d/.test(peek(spaceCount + 1))) {
        ++digitCount;
        ++spaceCount;
        start = start * 10 + peek(spaceCount).charCodeAt(0) - "0".charCodeAt(0);
      }
      if (digitCount > 9) return { indent: -1, start: -1, len: -1 };
      if (
        !/(\.|\))/.test(peek(spaceCount + 1)) ||
        !/\s/.test(peek(spaceCount + 2))
      )
        return { indent: -1, start: -1, len: -1 };
      spaceCount += 2;
      while (peek(spaceCount + 1) === " ") ++spaceCount;
      return { indent, start, len: spaceCount };
    }
    return { indent: -1, start: -1, len: -1 };
  };

  const isHr = (): any => {
    let spaceCount = 0;
    while (peek(spaceCount + 1) === " ") ++spaceCount;
    if (spaceCount > 3) return false;
    let hyphenCount = spaceCount;
    while (peek(hyphenCount + 1) === "-") ++hyphenCount;
    if (hyphenCount < 3) return false;
    let spaces = hyphenCount;
    while (peek(spaces + 1) === " ") ++spaces;
    if (peek(spaces + 1) !== "\n" && peek(spaces + 1) !== "\0") return false;
    return true;
  };

  const isTable = (): any => {
    const isLastCell = (n: number): any => {
      if (peek(n + 1) !== "|") return 0;
      let offset = 2;
      while (peek(n + offset) === " ") ++offset;
      if (peek(n + offset) !== "\n" && peek(n + offset) !== "\0") return 0;
      ++offset;
      return offset;
    };

    let spaceCount = 0;
    while (peek(spaceCount + 1) === " ") ++spaceCount;
    if (spaceCount > 3) return false;
    if (peek(spaceCount + 1) !== "|") return false;
    ++spaceCount;
    if (peek(spaceCount + 1) === "|" || peek(spaceCount + 1) === "\n")
      return false;

    let cells = 0;
    while (peek(spaceCount + 1) !== "\0" && !isLastCell(spaceCount)) {
      if (!/[^|\n]/.test(peek(spaceCount + 1))) return false;
      while (/[^|\n]/.test(peek(spaceCount + 1))) ++spaceCount;
      if (peek(spaceCount + 1) === "\n") return false;
      ++cells;
      if (!isLastCell(spaceCount)) ++spaceCount;
    }

    let offset = isLastCell(spaceCount);
    if (!offset) return false;
    spaceCount += offset - 1;
    while (peek(spaceCount + 1) === " ") ++spaceCount;
    if (peek(spaceCount + 1) !== "|") return false;
    ++spaceCount;
    if (peek(spaceCount + 1) === "|" || peek(spaceCount + 1) === "\n")
      return false;

    while (peek(spaceCount + 1) !== "\0" && !isLastCell(spaceCount)) {
      if (!/[^|\n]/.test(peek(spaceCount + 1))) return false;
      while (peek(spaceCount + 1) === "-") ++spaceCount;
      if (peek(spaceCount + 1) === "\n" || peek(spaceCount + 1) !== "|")
        return false;
      --cells;
      if (!isLastCell(spaceCount)) ++spaceCount;
    }

    offset = isLastCell(spaceCount);
    if (!offset) return false;
    if (cells !== 0) return false;
    return true;
  };

  const isBlockMath = (): any => {
    if (!(peek(1) === "$" && peek(2) === "$")) return false;
    let offset = 3;
    while (
      peek(offset) !== "\0" &&
      !(peek(offset) === "$" && peek(offset + 1) === "$")
    )
      ++offset;
    if (peek(offset) === "\0") return false;
    return true;
  };

  const isCodeBlock = (): any => {
    let tok = peek(1) + peek(2) + peek(3) + peek(4);
    if (tok !== "```\n") return false;
    let offset = 5;
    tok = peek(1) + peek(2) + peek(3);
    while (peek(offset) !== "\0" && tok !== "```") {
      ++offset;
      tok = peek(1) + peek(2) + peek(3);
    }
    return true;
  };

  const consumeSpaces = (): any => {
    while (peek(1) === " ") consume(1);
  };

  const consumeHeading = (): any => {
    consumeSpaces();
    let headingNo = 0;
    while (peek(1) === "#") {
      consume(1); // consume '#'
      ++headingNo;
    }
    consumeSpaces();
    let raw = "";
    while (!isEof() && !isNewline()) {
      let c = consume(1);
      raw += c;
    }
    if (isNewline()) consume(1);

    tokens.push({
      type: TokenType.HEADING,
      raw: `<h${headingNo}>`,
      heading: headingNo,
      tokens: labevalMarkdownRawTextTokenizer(raw.trimEnd()),
    });
  };

  const consumeHLine = (): any => {
    while (!isEof() && peek(1) !== "\n") consume(1);
    consume(1);
    tokens.push({ type: TokenType.HLINE, raw: "<hr />" });
  };

  const consumeUListItem = (): any => {
    let indent = isUlistItem().indent;
    let tokens = [];
    consumeSpaces();
    consume(2); // Consume (-|+|*)\s

    let line = "";
    let i1 = isUlistItem().indent;
    let i2 = isOlistItem().indent;
    while (
      !isEof() &&
      !isContinuousNewlines() &&
      i1 === -1 &&
      i2 === -1 &&
      !isTable() &&
      !isHr() &&
      !isHeading()
    ) {
      let c = consume(1);
      line += c;
      i1 = isUlistItem().indent;
      i2 = isOlistItem().indent;
    }

    tokens.push(...labevalMarkdownRawTextTokenizer(line));
    if (i1 > indent) {
      tokens.push(consumeUList());
    }

    if (i2 > indent) {
      tokens.push(consumeOList());
    }

    return { type: TokenType.ULIST_ITEMS, tag: "<li>", tokens: tokens };
  };

  const consumeOListItem = (): any => {
    let { indent, start, len } = isOlistItem();
    let tokens = [];
    consume(len);

    let line = "";
    let i1 = isUlistItem().indent;
    let i2 = isOlistItem().indent;
    while (
      !isEof() &&
      !isContinuousNewlines() &&
      i1 === -1 &&
      i2 === -1 &&
      !isTable() &&
      !isHr() &&
      !isHeading()
    ) {
      let c = consume(1);
      line += c;
      i1 = isUlistItem().indent;
      i2 = isOlistItem().indent;
    }

    tokens.push(...labevalMarkdownRawTextTokenizer(line));
    if (i1 > indent) {
      tokens.push(consumeUList());
    }

    if (i2 > indent) {
      tokens.push(consumeOList());
    }

    return { type: TokenType.OLIST_ITEMS, tag: "<li>", tokens: tokens };
  };

  const consumeUList = (): any => {
    let items = [];
    let indent = isUlistItem().indent;

    let i1 = isUlistItem().indent;
    let i2 = isOlistItem().indent;
    while (
      !isEof() &&
      !isContinuousNewlines() &&
      (i1 >= indent || i2 > indent)
    ) {
      if (i1 >= indent) items.push(consumeUListItem());
      if (i2 > indent) items.push(consumeOListItem());
      i1 = isUlistItem().indent;
      i2 = isOlistItem().indent;
    }

    return { type: TokenType.ULIST, tag: "<ul>", items: items };
  };

  const consumeOList = (): any => {
    let indent = isOlistItem().indent;
    let items = [];

    let i1 = isUlistItem().indent;
    let i2 = isOlistItem().indent;
    while (
      !isEof() &&
      !isContinuousNewlines() &&
      (i2 >= indent || i1 > indent)
    ) {
      if (i1 > indent) items.push(consumeUListItem());
      if (i2 >= indent) items.push(consumeOListItem());
      i1 = isUlistItem().indent;
      i2 = isOlistItem().indent;
    }

    return { type: TokenType.OLIST, tag: "<ol>", items: items };
  };

  const consumeTable = (): any => {
    let headings = [];
    while (peek(1) === " ") consume(1);
    consume(1); // Consume '|'
    while (peek(1) !== "\0" && peek(1) !== "\n") {
      let head = "";
      while (peek(1) !== "|") head += consume(1);
      headings.push({
        type: TokenType.TABLE_HEADING,
        tag: "<th>",
        tokens: labevalMarkdownRawTextTokenizer(head),
      });
      consume(1); // Consume '|'
    }

    consume(1); // Consume '\n'
    while (peek(1) !== "\0" && peek(1) !== "\n") consume(1); // Consume [|---|]+
    consume(1); // Consume '\n'

    if (peek(1) !== "|") {
      return { type: TokenType.TABLE, headings, rows: [] };
    }

    let rows = [];

    const isLastCell = (): any => {
      if (peek(1) !== "|") return 0;
      let offset = 2;
      while (peek(offset) === " ") ++offset;
      if (peek(offset) !== "\n" && peek(offset) !== "\0") return 0;
      return offset;
    };

    while (peek(1) === "|") {
      let cells = [];
      let offset = isLastCell();
      consume(1); // Consume '|'
      while (peek(1) !== "\0" && !offset) {
        let cell = "";
        while (peek(1) !== "\0" && peek(1) !== "|" && peek(1) !== "\n")
          cell += consume(1);
        cells.push({
          type: TokenType.TABLE_CELL,
          tag: "<td>",
          tokens: labevalMarkdownRawTextTokenizer(cell),
        });
        if (peek(1) === "\0" || peek(1) === "\n") {
          consume(1);
          break;
        }
        offset = isLastCell();
        if (!offset) consume(1); // Consume '|'
      }
      rows.push({
        type: TokenType.TABLE_ROW,
        tag: "<tr>",
        cells: cells.slice(0, headings.length),
      });

      if (offset) consume(offset);
    }

    return { type: TokenType.TABLE, tag: "<table>", rows: rows, headings };
  };

  const consumeBlockMath = (): any => {
    consume(2);
    let raw = "";
    while (!(peek(1) === "$" && peek(2) === "$")) raw += consume(1);
    consume(2);
    return { type: TokenType.MATH, tag: "<math>", raw: "\\[" + raw + "\\]" };
  };

  const consumeCodeBlock = (): any => {
    consume(4);
    let content = "";
    let tok = peek(1) + peek(2) + peek(3);
    while (!isEof() && !/```/.test(tok)) {
      content += consume(1);
      tok = peek(1) + peek(2) + peek(3);
    }
    if (!isEof()) consume(3);
    return { type: TokenType.CODE_BLOCK, raw: content };
  };

  const consumeParagraph = (): any => {
    let raw = "",
      nline = 0;
    if ((nline = isContinuousNewlines())) {
      consume(nline);
      return;
    }
    while (
      !isEof() &&
      !nline &&
      !isTable() &&
      !isHeading() &&
      !isBlockMath() &&
      isOlistItem().indent === -1 &&
      isUlistItem().indent === -1
    ) {
      raw += consume(1);
      nline = isContinuousNewlines();
    }

    consume(nline);
    tokens.push({
      type: TokenType.PARA,
      tag: "<p>",
      tokens: labevalMarkdownRawTextTokenizer(raw.trim()),
    });
  };

  while (!isEof()) {
    // Tokenize headings
    if (isHeading()) {
      consumeHeading();
      continue;
    }

    if (isHr()) {
      consumeHLine();
      continue;
    }

    if (isTable()) {
      tokens.push(consumeTable());
      continue;
    }

    // Tokenize unordered list
    if (isUlistItem().indent >= 0) {
      tokens.push(consumeUList());
      continue;
    }

    if (isOlistItem().indent >= 0) {
      tokens.push(consumeOList());
      continue;
    }

    if (isBlockMath()) {
      tokens.push(consumeBlockMath());
      continue;
    }

    if (isCodeBlock()) {
      tokens.push(consumeCodeBlock());
      continue;
    }

    consumeParagraph();
  }

  tokens.push({ type: TokenType.EOF, raw: "<EOF>" });
  return tokens;
}

export default function labevalMarkdownParser(buffer: string): React.ReactNode {
  let tokens = labEvalMarkdownTokenizer(buffer);
  let html = [];
  let curToken = -1;

  const next = (): any => {
    if (curToken >= tokens.length) return tokens.slice(-1);
    ++curToken;
    return tokens[curToken];
  };

  const parseText = (tok: any, key: number): any => {
    let parts = [];
    let cur = "";
    for (let i = 0; i < tok.raw.length; ++i) {
      if (tok.raw[i] === "\n") {
        if (cur.length > 0) parts.push(<span key={key + 1 + i}>{cur}</span>);
        cur = "";
        parts.push(<br key={key + 2 + i} />);
      } else {
        cur += tok.raw[i];
      }
    }

    if (cur.length > 0)
      parts.push(<span key={key + 1 + tok.raw.length + 1}>{cur}</span>);
    return <span key={key}>{...parts}</span>;
  };

  const parseSpan = (tok: any, key: number): any => {
    return (
      <span key={key}>
        {...tok.tokens.map((token: any, index: number): any => {
          return parseStatement(token, key + 1 + index);
        })}
      </span>
    );
  };

  const parseStrong = (tok: any, key: number): any => {
    return (
      <strong key={key}>
        {...tok.tokens.map((token: any, index: number): any => {
          return parseStatement(token, key + 1 + index);
        })}
      </strong>
    );
  };

  const parseEmphasis = (tok: any, key: number): any => {
    return (
      <em key={key}>
        {...tok.tokens.map((token: any, index: number): any => {
          return parseStatement(token, key + 1 + index);
        })}
      </em>
    );
  };

  const parseParagraph = (tok: any, key: number): any => {
    return (
      <p key={key}>
        {...tok.tokens.map((token: any, index: number): any => {
          return parseStatement(token, key + 1 + index);
        })}
      </p>
    );
  };

  const parseHline = (key: number): any => {
    return <hr key={key} />;
  };

  const parseHeading = (tok: any, key: number): any => {
    let html = tok.tokens.map((token: any, index: number): any => {
      return parseStatement(token, key + 1 + index);
    });
    switch (tok.heading) {
      case 1:
        return <h1 key={key}>{...html}</h1>;
      case 2:
        return <h2 key={key}>{...html}</h2>;
      case 3:
        return <h3 key={key}>{...html}</h3>;
      case 4:
        return <h4 key={key}>{...html}</h4>;
      case 5:
        return <h5 key={key}>{...html}</h5>;
      case 6:
        return <h6 key={key}>{...html}</h6>;
    }
  };

  const parseUlist = (tok: any, key: number): any => {
    return (
      <ul key={key}>
        {...tok.items.map((item: any, index: number): any => {
          return parseStatement(item, key + 1 + index);
        })}
      </ul>
    );
  };

  const parseOlist = (tok: any, key: number): any => {
    return (
      <ol key={key}>
        {...tok.items.map((item: any, index: number): any => {
          return parseStatement(item, key + 1 + index);
        })}
      </ol>
    );
  };

  const parseListItem = (tok: any, key: number): any => {
    return (
      <li key={key}>
        {...tok.tokens.map((token: any, index: number): any => {
          return parseStatement(token, key + 1 + index);
        })}
      </li>
    );
  };

  const parseTableHeading = (tok: any, key: number): any => {
    return (
      <span key={key}>
        {...tok.tokens.map((token: any, index: number): any => {
          return parseStatement(token, key + 1 + index);
        })}
      </span>
    );
  };

  const parseTableCell = (tok: any, key: number): any => {
    return (
      <td key={key}>
        {...tok.tokens.map((token: any, index: number): any => {
          return parseStatement(token, key + 1 + index);
        })}
      </td>
    );
  };

  const parseTableRow = (tok: any, key: number): any => {
    return (
      <tr key={key}>
        {...tok.cells.map((cell: any, index: number): any => {
          return parseStatement(cell, key + 1 + index);
        })}
      </tr>
    );
  };

  const parseTable = (tok: any, key: number): any => {
    return (
      <Table
        key={key}
        heads={tok.headings.map((head: any, index: number): any => {
          return {
            content: parseTableHeading(head, key + 1 + index),
            className: "",
          };
        })}
        className="flex-1 w-full"
      >
        {...tok.rows.map((row: any, index: number): any => {
          return parseStatement(row, key + 1 + index);
        })}
      </Table>
    );
  };

  const parseBoxedStatement = (tok: any, key: number): any => {
    let image = tok.attributes.find(
      (attribute: any): any => attribute.attribute === "src"
    );

    let color = tok.attributes.find(
      (attribute: any): any => attribute.attribute === "color"
    );

    let href = tok.attributes.find(
      (attribute: any): any => attribute.attribute === "href"
    );
    if (image) {
      let width = tok.attributes.find(
        (attribute: any): any => attribute.attribute === "width"
      );

      let height = tok.attributes.find(
        (attribute: any): any => attribute.attribute === "height"
      );

      width = width ? width.value : "auto";
      height = height ? height.value : "auto";
      let elem = (
        <Image
          key={key}
          src={image.value}
          alt=""
          className="h-auto w-auto object-contain"
          style={{ width, height }}
        />
      );

      return href ? (
        <a key={key} href={href.value}>
          {elem}
        </a>
      ) : (
        elem
      );
    }

    return (
      <span
        key={key}
        style={{
          color: color ? `var(--${color.value}-500)` : "var(--zinc-300)",
        }}
      >
        {href ? (
          <a
            key={key + 1}
            href={href.value}
            className="text-blue-500 hover:underline"
          >
            {...tok.content.map((token: any, index: number): any => {
              return parseStatement(token, key + 1 + index);
            })}
          </a>
        ) : (
          <span key={key + 1}>
            {...tok.content.map((token: any, index: number): any => {
              return parseStatement(token, key + 1 + index);
            })}
          </span>
        )}
      </span>
    );
  };

  const parseInlineCode = (tok: any, key: number): any => {
    return (
      <span
        key={key}
        className={
          robotoMono.className +
          " whitespace-pre text-blue-500 bg-zinc-800 rounded-md"
        }
        style={{ paddingInline: "8px" }}
      >
        {tok.raw}
      </span>
    );
  };

  const parseMath = (tok: any, key: number): any => {
    return (
      <div key={key} className="flex flex-col">
        {tok.raw}
      </div>
    );
  };

  const parseCodeBlock = (tok: any, key: number): any => {
    return (
      <p
        key={key}
        className={
          "block-code whitespace-pre bg-zinc-800/50 text-zinc-200 w-full border border-solid border-zinc-800 rounded-md px-2 py-2"
        }
      >
        {tok.raw}
      </p>
    );
  };

  const parseStatement = (tok: any, key: number): any => {
    switch (tok.type) {
      case TokenType.BREAK:
        return <br key={key} />;
      case TokenType.TEXT:
        return parseText(tok, key);
      case TokenType.SPAN:
        return parseSpan(tok, key);
      case TokenType.STRONG:
        return parseStrong(tok, key);
      case TokenType.EM:
        return parseEmphasis(tok, key);
      case TokenType.PARA:
        return parseParagraph(tok, key);
      case TokenType.HLINE:
        return parseHline(key);
      case TokenType.HEADING:
        return parseHeading(tok, key);
      case TokenType.ULIST:
        return parseUlist(tok, key);
      case TokenType.OLIST:
        return parseOlist(tok, key);
      case TokenType.ULIST_ITEMS:
      case TokenType.OLIST_ITEMS:
        return parseListItem(tok, key);
      case TokenType.TABLE:
        return parseTable(tok, key);
      case TokenType.TABLE_HEADING:
        return parseTableHeading(tok, key);
      case TokenType.TABLE_ROW:
        return parseTableRow(tok, key);
      case TokenType.TABLE_CELL:
        return parseTableCell(tok, key);
      case TokenType.BOXED:
        return parseBoxedStatement(tok, key);
      case TokenType.INLINE_CODE:
        return parseInlineCode(tok, key);
      case TokenType.MATH:
        return parseMath(tok, key);
      case TokenType.CODE_BLOCK:
        return parseCodeBlock(tok, key);
    }
  };

  let tok = next();
  while (tok.type !== TokenType.EOF) {
    html.push(parseStatement(tok, curToken));
    tok = next();
  }

  return (
    <main className="labeval-markdown-content h-full w-full">{...html}</main>
  );
}

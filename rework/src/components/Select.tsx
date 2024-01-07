import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type SelectProps = {
  options: string[];
  setSelected: Dispatch<SetStateAction<number>>;
  className?: string;
};

export default function Select({
  options,
  setSelected,
  className,
}: SelectProps) {
  const optionRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [currentOption, setCurrentOption] = useState(0);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!optionRef?.current?.contains(e.target as HTMLDivElement))
        setShow(false);
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [optionRef]);

  return (
    <div
      ref={optionRef}
      className={
        className +
        " select relative h-10 w-full flex flex-col justify-center px-4 bg-zinc-700 rounded-full before:border-[3px] before:border-solid before:border-transparent before:border-t-zinc-400 before:border-r-zinc-400 before:rounded-[2px] before:absolute before:right-4 before:top-[12px] before:w-[10px] before:h-[10px] cursor-pointer" +
        (show
          ? " before:rotate-[-45deg] before:top-[15px]"
          : " before:rotate-[135deg]")
      }
      onClick={() => setShow((prev) => !prev)}
    >
      <span>{options[currentOption]}</span>
      {show ? (
        <div className="select-options animate-opacity bg-zinc-800/90 backdrop-blur-md h-fit w-full shadow-[0_0_0.5rem_rgba(0,0,0,0.3)] z-10 rounded-md flex flex-col absolute top-[105%] left-[0%]">
          {options.map((value, index) => {
            return (
              <div
                className={
                  (index === currentOption
                    ? "bg-zinc-600/50 text-zinc-300"
                    : "text-zinc-400") +
                  " option flex flex-row h-10 px-4 items-center hover:bg-zinc-600/50 hover:backdrop-blur-md cursor-pointer rounded-md"
                }
                key={index}
                onClick={() => {
                  setCurrentOption(index);
                  setSelected(index);
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

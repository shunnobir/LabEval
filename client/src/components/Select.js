import { useEffect, useRef, useState } from "react";

export default function Select({ options, setSelected, className }) {
  const optionRef = useRef(null);
  const [show, setShow] = useState(false);
  const [currentOption, setCurrentOption] = useState(0);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (optionRef?.current && !optionRef.current.contains(e.target))
        setShow(false);
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [optionRef]);

  return (
    <div
      ref={optionRef}
      className={
        "select relative h-10 w-full flex flex-col justify-center px-4 border border-solid border-slate-300 rounded-[5px] before:border-[3px] before:border-solid before:border-transparent before:border-t-slate-900 before:border-r-slate-900 before:rounded-[2px] before:absolute before:right-4 before:top-[12px] before:w-[10px] before:h-[10px] cursor-pointer" +
        (show
          ? " before:rotate-[-45deg] before:top-[15px]"
          : " before:rotate-[135deg]")
          +
          (className ? ` ${className}` : "")
      }
      onClick={() => setShow((prev) => !prev)}
    >
      <span>{options[currentOption]}</span>
      {show ? (
        <div className="select-options animate-opacity bg-[rgba(248,250,252,0.95)] h-fit w-full shadow-[0_0_8px_rgba(0,0,0,0.2)] z-10 rounded-[5px] flex flex-col absolute top-[105%] left-[0%]">
          {options.map((value, index) => {
            return (
              <div
                className="option flex flex-row h-10 px-4 items-center hover:bg-slate-200 cursor-pointer"
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

import { CheckIcon } from "@/icons";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Label from "./Label";

type SelectProps = {
  label?: string;
  options: string[];
  setSelected: Dispatch<SetStateAction<number>>;
  className?: string;
};

export default function Select({
  label,
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
    <div className="flex flex-col gap-1">
      {label ? <Label>{label}</Label> : null}
      <div
        ref={optionRef}
        className={
          className +
          " select relative h-10 w-full flex flex-col justify-center px-4 border border-solid border-slate-300 dark:border-slate-800 rounded-md before:border-[3px] before:border-solid before:border-transparent before:border-t-slate-400 before:border-r-slate-400 before:rounded-[2px] before:absolute before:right-4 before:top-[12px] before:w-[10px] before:h-[10px] cursor-pointer" +
          (show
            ? " before:rotate-[-45deg] before:top-[15px]"
            : " before:rotate-[135deg]")
        }
        onClick={() => setShow((prev) => !prev)}
      >
        <span>{options[currentOption]}</span>
        {show ? (
          <div className="select-options animate-opacity bg-white dark:bg-zinc-950 border border-solid border-slate-300 dark:border-slate-800 max-h-40 overflow-auto w-full shadow-[0_0_0.5rem_rgba(0,0,0,0.3)] z-10 rounded-md flex flex-col absolute top-[105%] left-[0%]">
            {options.map((value, index) => {
              return (
                <div
                  className={
                    (index === currentOption
                      ? "bg-slate-100 dark:bg-slate-700/50 dark:text-slate-300"
                      : "text-slate-700 dark:text-slate-300") +
                    " option flex flex-row gap-2 h-10 px-4 items-center hover:bg-slate-100 hover:dark:bg-slate-700/50 hover:text-slate-700 hover:dark:text-slate-300 cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    setCurrentOption(index);
                    setSelected(index);
                  }}
                >
                  <CheckIcon
                    className={
                      "stroke-green-600 " +
                      (index === currentOption ? "inline-block" : "hidden")
                    }
                    width="20"
                    height="20"
                  />
                  {value}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

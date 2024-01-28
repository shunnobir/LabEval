"use client";

import { ThemeContext } from "@/app/contexts/ThemeContext";
import React, { useContext, useState } from "react";
import Label from "./Label";

type InputProps = {
  label?: string;
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  maxLength?: number;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  showLimit?: boolean;
  accept?: string;
  pattern?: string;
};

function Input({
  label,
  type,
  id,
  name,
  placeholder,
  maxLength,
  value,
  onChange,
  className,
  showLimit,
  accept,
  pattern,
}: InputProps) {
  const [count, setCount] = useState(0);
  const theme = useContext(ThemeContext);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setCount(
      maxLength ? Math.min(maxLength, target.value.length) : target.value.length
    );
    if (onChange) onChange(e);
  };

  return (
    <div className="flex flex-col gap-1 flex-1 overflow-hidden relative">
      {label ? <Label>{label}</Label> : null}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={handleOnChange}
        accept={accept}
        pattern={pattern}
        className={
          className +
          " outline-none focus-within:outline-none bg-transparent border border-solid border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 pl-4 py-2 rounded-md flex-1 w-full placeholder:text-slate-400 dark:placeholder:text-slate-400" +
          (maxLength && showLimit ? " pr-10" : " pr-4")
        }
        style={{ colorScheme: theme }}
      />
      {maxLength && showLimit ? (
        <span className="ml-auto text-sm text-slate-500 absolute bottom-1/4 right-4">
          {count}/{maxLength}
        </span>
      ) : null}
    </div>
  );
}

export default Input;

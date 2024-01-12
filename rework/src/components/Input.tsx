"use client";

import React, { useState } from "react";

type InputProps = {
  // lbl?: string | React.ReactNode;
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
  // lbl,
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
      {/* <label className="font-bold">{lbl}</label> */}
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
          " outline-none focus-within:outline-none bg-transparent border border-solid border-zinc-800 text-zinc-300 pl-4 py-2 rounded-md flex-1 w-full" +
          (maxLength && showLimit ? " pr-10" : " pr-4")
        }
        style={{ colorScheme: "dark" }}
      />
      {maxLength && showLimit ? (
        <span className="ml-auto text-sm text-zinc-500 absolute bottom-1/4 right-4">
          {count}/{maxLength}
        </span>
      ) : null}
    </div>
  );
}

export default Input;

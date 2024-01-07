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
    <div className="flex flex-col gap-1 flex-1 overflow-hidden">
      {/* <label className="font-bold">{lbl}</label> */}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={handleOnChange}
        className={
          className +
          " outline-none focus-within:outline-none bg-transparent border border-solid border-zinc-800 text-zinc-300 placeholder:text-zinc-500 px-4 py-2 rounded-full flex-1"
        }
        style={{ colorScheme: "dark" }}
      />
      {maxLength && showLimit ? (
        <span className="ml-auto text-zinc-400">
          {count}/{maxLength}
        </span>
      ) : null}
    </div>
  );
}

export default Input;

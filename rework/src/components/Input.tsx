import React from "react";

type InputProps = {
  // lbl?: string | React.ReactNode;
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
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
}: InputProps) {
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
        onChange={onChange}
        className={
          className +
          " outline-none focus-within:outline-none bg-zinc-700 text-zinc-300 placeholder:text-zinc-500 px-4 py-2 rounded-full flex-1"
        }
        style={{ colorScheme: "dark" }}
      />
    </div>
  );
}

export default Input;

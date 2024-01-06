import React, { MouseEventHandler, useState } from "react";
import Input from "./Input";
import { CloseEyeIcon, OpenEyeIcon } from "@/icons";
import Button from "./Button";

type EyeInputProps = {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function EyeInput({
  id,
  placeholder,
  value,
  onChange,
  className,
}: EyeInputProps) {
  const [show, setShow] = useState(false);
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  return (
    <div
      className={
        "relative flex bg-zinc-700 rounded-full items-center gap-0 flex-1 " +
        className
      }
    >
      <Input
        type={show ? "text" : "password"}
        name="password"
        id={id}
        placeholder={placeholder}
        maxLength={60}
        value={value}
        onChange={onChange}
        className={"rounded-full bg-zinc-700 pr-12"}
      />
      <button
        className="absolute right-4 ml-auto bg-transparent border-none shadow-zinc-700 shadow-none px-0"
        onClick={handleOnClick}
      >
        {show ? (
          <OpenEyeIcon width="20" height="20" />
        ) : (
          <CloseEyeIcon width="20" height="20" />
        )}
      </button>
    </div>
  );
}

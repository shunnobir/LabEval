import React from "react";

type ButtonProps = {
  width?: string;
  height?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string | "";
};

export default function Button({
  width,
  height,
  icon,
  className,
  children,
  onClick,
  title,
}: ButtonProps) {
  return (
    <button
      className={
        className +
        " bg-blue-600 text-zinc-50 border-t border-solid border-blue-400 px-4 py-1 shadow-sm shadow-zinc-900 flex items-center justify-center"
      }
      title={title}
      onClick={onClick ? onClick : (_) => {}}
    >
      {icon ? icon : null}
      {children}
    </button>
  );
}

import React from "react";

type ButtonProps = {
  width?: string;
  height?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string | "";
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function Button({
  width,
  height,
  icon,
  className,
  children,
  onClick,
  title,
  disabled,
  ...res
}: ButtonProps) {
  return (
    <button
      className={
        className +
        " hover:bg-sky-400 bg-sky-500 text-slate-50 border-t border-solid border-sky-400 px-4 py-2 shadow-sm shadow-slate-300 dark:shadow-slate-900 flex items-center justify-center rounded-md duration-300 disabled:bg-slate-400 disabled:border-t-slate-400 disabled:dark:bg-slate-800 disabled:dark:border-t-slate-800"
      }
      title={title}
      onClick={onClick ? onClick : (_) => {}}
      disabled={disabled || false}
      {...res}
    >
      {icon ? icon : null}
      {children}
    </button>
  );
}

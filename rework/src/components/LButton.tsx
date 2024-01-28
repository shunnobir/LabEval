/*
  This is an improved button component
*/
"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

type LButtonProps = {
  variant: "primary" | "outlined" | "ghost" | "option";
  children?: React.ReactNode;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

interface IVariantStyling {
  [id: string]: string;
}

export default function LButton({
  className,
  variant,
  children,
  icon,
  ...rest
}: LButtonProps) {
  const stylings: IVariantStyling = {
    primary: "bg-sky-500 hover:bg-sky-400 text-slate-50",
    outline:
      "border border-solid border-slate-500 hover:bg-slate-200 hover:dark:bg-slate-900",
    ghost:
      "bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 hover:dark:bg-slate-800",
    option: "bg-transparent hover:bg-slate-200 hover:dark:bg-slate-800",
  };
  const mergedClassName = twMerge(
    stylings[variant] +
      " rounded-md px-4 py-2 flex flex-row items-center gap-2",
    className
  );
  return (
    <button className={mergedClassName} {...rest}>
      {icon ? icon : null}
      {children}
    </button>
  );
}

import { twMerge } from "tailwind-merge";

type LabelProps = {
  children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ children, className, ...rest }: LabelProps) {
  const mergedClassName = twMerge("font-semibold", className);
  return <label className={mergedClassName}>{children}</label>;
}

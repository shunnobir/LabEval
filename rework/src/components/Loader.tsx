type LoaderProps = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Loader({ className, style }: LoaderProps) {
  return (
    <div
      className={
        className +
        " border-2 border-solid border-sky-500 rounded-full animate-loader h-6 w-6 border-b-transparent  dark:border-b-transparent"
      }
      style={style}
    ></div>
  );
}

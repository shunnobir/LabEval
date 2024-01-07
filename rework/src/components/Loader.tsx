type LoaderProps = {
  size?: string | number;
  color?: string;
};

export default function Loader({ size, color }: LoaderProps) {
  const h = size ? size : "20px";
  const w = size ? size : "20px";
  const c = color ? color : "var(--zinc-100)";
  return (
    <div
      className="border-2 border-solid rounded-full animate-loader"
      style={{
        height: `${h}`,
        width: `${w}`,
        borderColor: `${c}`,
        borderBottomColor: "transparent",
      }}
    ></div>
  );
}

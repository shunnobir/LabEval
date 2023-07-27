export default function Loader({ size, color }) {
  const h = size ? size : "20px";
  const w = size ? size : "20px";
  const c = color ? color : "var(--slate-50)";
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

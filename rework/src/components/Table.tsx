type TableProps = {
  heads: {
    content?: string;
    className?: string;
    style?: React.CSSProperties;
  }[];
  children?: React.ReactNode;
  empty?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function Table({
  heads,
  children,
  empty,
  className,
  style,
}: TableProps) {
  return (
    <table
      className={
        "labeval-table animate-opacity table-auto border-collapse h-auto mb-4 " +
        className
      }
      style={style}
    >
      {heads ? (
        <thead>
          <tr>
            {heads.map((value, index) => {
              return (
                <th
                  key={index}
                  className={
                    value.className
                      ? "font-bold " + value.className
                      : "font-bold"
                  }
                  style={value.style}
                >
                  {value.content}
                </th>
              );
            })}
          </tr>
        </thead>
      ) : null}
      <tbody>
        {!empty ? (
          children
        ) : (
          <tr>
            <td
              colSpan={heads.length}
              style={{ textAlign: "center", color: "var(--slate-400)" }}
            >
              Empty
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

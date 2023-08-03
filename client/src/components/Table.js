export default function Table({ heads, children, empty, className }) {
  return (
    <table
      className={
        "labeval-table animate-opacity table-auto border-collapse h-auto " +
        className
      }
    >
      <thead>
        <tr>
          {heads.map((value, index) => {
            return (
              <th
                key={index}
                className={value.className ? value.className : ""}
              >
                {value.content}
              </th>
            );
          })}
        </tr>
      </thead>
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

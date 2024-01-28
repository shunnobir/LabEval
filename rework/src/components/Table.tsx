import { TdHTMLAttributes } from "react";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  heads: {
    content?: string;
    className?: string;
    style?: React.CSSProperties;
  }[];
  children?: React.ReactNode;
  empty?: boolean;
}

interface TableRowProps extends React.TdHTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export function TableRow({ children, className, ...res }: TableRowProps) {
  return (
    <tr
      className={
        className +
        " even:dark:bg-slate-900 even:bg-slate-100 border-b border-solid border-slate-300 dark:border-slate-800 last:border-b-0"
      }
      {...res}
    >
      {children}
    </tr>
  );
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export function TableCell({ children, className, ...res }: TableCellProps) {
  return (
    <td
      className={
        className +
        " px-2 py-1 font-normal text-wrap border-r border-solid border-slate-300 dark:border-slate-800 last:border-r-0"
      }
      {...res}
    >
      {children}
    </td>
  );
}

export default function Table({
  heads,
  children,
  empty,
  className,
  style,
  ...res
}: TableProps) {
  return (
    <div className="overflow-auto rounded-md border border-solid border-slate-300 dark:border-slate-800 border-t-0">
      <table
        className={
          className +
          " labeval-table animate-opacity w-full table-auto border-collapse h-auto"
        }
        style={style}
        {...res}
      >
        {heads ? (
          <thead className="text-slate-100 bg-slate-800 dark:bg-slate-800">
            <TableRow>
              {heads.map((value, index) => {
                return (
                  <th
                    key={index}
                    className={
                      value.className +
                      " border-r border-solid border-slate-600 dark:border-slate-700 font-bold p-2 text-left"
                    }
                    style={value.style}
                  >
                    {value.content}
                  </th>
                );
              })}
            </TableRow>
          </thead>
        ) : null}
        <tbody>
          {!empty ? (
            children
          ) : (
            <TableRow>
              <TableCell
                colSpan={heads.length}
                className="py-2 text-center text-slate-400"
              >
                Empty
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </table>
    </div>
  );
}

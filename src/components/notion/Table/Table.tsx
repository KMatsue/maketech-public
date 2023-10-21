import React, { FC } from "react";

import type {
  TableBlockObjectResponse,
  TableRowBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";
import styles from "@/app/posts/[slug]/post.module.css";

type NotionTableBlockObjectResponse = TableBlockObjectResponse & {
  children?: TableRowBlockObjectResponse[];
};

type Props = {
  block: NotionTableBlockObjectResponse;
};

const Table: FC<Props> = ({ block }) => {
  return (
    <table className="border-collapse border border-slate-400 ...">
      {/* <table className={styles.table}> */}
      <tbody>
        {block.children?.map((child: any, i: number) => {
          const RowElement =
            block.table.has_column_header && i == 0 ? "th" : "td";
          const rowElementCSS =
            RowElement === "th"
              ? "bg-slate-300 dark:bg-slate-900 "
              : "bg-slate-50 dark:bg-slate-800";

          return (
            <tr key={child.id}>
              {child.table_row?.cells?.map((cell: any, i: number) => {
                return (
                  <RowElement
                    className={`border ${rowElementCSS} py-1 px-3 text-slate-800 dark:text-slate-100`}
                    key={`${cell.plain_text}-${i}`}
                  >
                    <Text text={cell} />
                  </RowElement>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

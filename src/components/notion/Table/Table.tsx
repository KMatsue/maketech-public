import React, { FC } from "react";

import type {
  TableBlockObjectResponse,
  TableRowBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type NotionTableBlockObjectResponse = TableBlockObjectResponse & {
  children?: TableRowBlockObjectResponse[];
};

type Props = {
  block: NotionTableBlockObjectResponse;
};

const Table: FC<Props> = ({ block }) => {
  return (
    <table className="border-collapse border border-border-primary">
      {/* <table className={styles.table}> */}
      <tbody>
        {block.children?.map((child: any, i: number) => {
          const RowElement =
            block.table.has_column_header && i == 0 ? "th" : "td";
          const rowElementCSS =
            RowElement === "th"
              ? "bg-muted py-3 px-3"
              : "bg-card py-2 px-3";

          return (
            <tr key={child.id}>
              {child.table_row?.cells?.map((cell: any, i: number) => {
                return (
                  <RowElement
                    className={`border border-border-secondary ${rowElementCSS} text-foreground`}
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

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
    <table className={styles.table}>
      <tbody>
        {block.children?.map((child: any, i: number) => {
          const RowElement =
            block.table.has_column_header && i == 0 ? "th" : "td";
          return (
            <tr key={child.id}>
              {child.table_row?.cells?.map((cell: any, i: number) => {
                return (
                  <RowElement key={`${cell.plain_text}-${i}`}>
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

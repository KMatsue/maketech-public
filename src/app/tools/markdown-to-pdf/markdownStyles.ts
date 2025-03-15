// スタイル適用の共通関数
export const applyMarkdownStyles = (
  container: HTMLElement,
  fontSize: number,
  options?: {
    forPreview?: boolean;
  }
) => {
  container.style.fontFamily =
    "'Hiragino Sans', 'Meiryo', 'Noto Sans JP', sans-serif";
  container.style.fontSize = `${fontSize}px`;
  container.style.padding = options?.forPreview ? "0" : "20px";
  container.style.backgroundColor = "white";
  container.style.color = "black";
  container.style.lineHeight = "1.5";
  container.style.margin = "0 auto";

  // 要素別スタイル適用
  const allElements = container.querySelectorAll("*");
  allElements.forEach((el) => {
    const element = el as HTMLElement;

    // テーブル関連の要素に特別な処理
    if (el.tagName === "TABLE") {
      const tableElement = element as HTMLTableElement;
      tableElement.style.width = "100%";
      tableElement.style.borderCollapse = "collapse";
      tableElement.style.marginBottom = "15px";
      tableElement.style.tableLayout = "fixed";
    } else if (el.tagName === "TH" || el.tagName === "TD") {
      const cellElement = element as HTMLTableCellElement;
      cellElement.style.border = "1px solid #ddd";
      cellElement.style.padding = "8px";
      cellElement.style.textAlign = "left";
      if (el.tagName === "TH") {
        cellElement.style.backgroundColor = "#f2f2f2";
      }
    }
    // コードブロック
    else if (el.tagName === "PRE") {
      element.style.backgroundColor = "#f5f5f5";
      element.style.padding = "10px";
      element.style.borderRadius = "5px";
      element.style.whiteSpace = "pre-wrap";
      element.style.overflowX = "auto";
      element.style.fontFamily = "'Courier New', monospace";
      element.style.fontSize = `${Math.max(fontSize - 1, 8)}px`;
    }
    // インラインコード
    else if (el.tagName === "CODE") {
      element.style.fontFamily = "'Courier New', monospace";
      element.style.backgroundColor = "#f5f5f5";
      element.style.padding = "2px 4px";
      element.style.borderRadius = "3px";
    }
    // 画像
    else if (el.tagName === "IMG") {
      const img = element as HTMLImageElement;
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.display = "block";
      img.style.marginTop = "10px";
      img.style.marginBottom = "10px";
    }
    // 見出し
    else if (el.tagName.match(/^H[1-6]$/)) {
      element.style.marginTop = "20px";
      element.style.marginBottom = "10px";
      element.style.fontWeight = "bold";

      if (el.tagName === "H1") {
        element.style.fontSize = "28px";
      } else if (el.tagName === "H2") {
        element.style.fontSize = "24px";
      } else if (el.tagName === "H3") {
        element.style.fontSize = "20px";
      }
    }
    // 段落
    else if (el.tagName === "P") {
      element.style.marginBottom = "10px";
    }
    // リスト
    else if (el.tagName === "UL" || el.tagName === "OL") {
      element.style.paddingLeft = "20px";
      element.style.marginBottom = "10px";
    }
  });
};

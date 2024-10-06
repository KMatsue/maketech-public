/**
 * タグ文字列を正規化します。
 *
 * この関数は以下の処理を行います：
 * 1. 文字列の先頭と末尾の空白を削除します。
 * 2. すべての文字を小文字に変換します。
 *
 * @param {string} tag - 正規化するタグ文字列
 * @returns {string} 正規化されたタグ文字列
 *
 * @example
 * normalizeTag("  Next.js  ") // 返り値: "next.js"
 * normalizeTag("REACT") // 返り値: "react"
 */
export const normalizeTag = (tag: string): string => {
  return tag.trim().toLowerCase();
};

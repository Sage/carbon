export const BOLD = "BOLD";
export const ITALIC = "ITALIC";
export const UNORDERED_LIST = "unordered-list-item";
export const ORDERED_LIST = "ordered-list-item";

export type InlineStyleType = typeof BOLD | typeof ITALIC;

export type BlockType = typeof UNORDERED_LIST | typeof ORDERED_LIST;

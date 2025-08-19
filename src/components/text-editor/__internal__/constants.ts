import { CodeNode } from "@lexical/code";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { ListNode, ListItemNode, ListType } from "@lexical/list";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import { StyledSpanNode } from "./plugins/Toolbar/custom-nodes/styled-span-node";
import MentionNode from "./mentions/node/node";

import { EditorThemeClasses, TextFormatType } from "lexical";

/** The default prefix applied to the editor's internal class names, IDs, etc. */
const COMPONENT_PREFIX = "carbon-rte";

/** The theme overrides needed to correctly style the editor */
const theme: EditorThemeClasses = {
  text: {
    bold: "textBold",
    italic: "textItalic",
    underline: "textUnderline",
  },
};

/** The available actions that can be used in the editor */
const TextEditorActionTypes = {
  Bold: "bold" as TextFormatType,
  Italic: "italic" as TextFormatType,
  Underline: "underline" as TextFormatType,
  OrderedList: "number" as ListType,
  UnorderedList: "bullet" as ListType,
};

/** The nodes supported by markdown */
const markdownNodes = [
  AutoLinkNode,
  CodeNode,
  LinkNode,
  ListNode,
  ListItemNode,
  HeadingNode,
  QuoteNode,
  HorizontalRuleNode,
  StyledSpanNode,
  MentionNode,
];

export { COMPONENT_PREFIX, markdownNodes, TextEditorActionTypes, theme };

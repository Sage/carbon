import { CodeNode } from "@lexical/code";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { ListNode, ListItemNode, ListType } from "@lexical/list";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TextFormatType } from "lexical";

import { StyledSpanNode } from "../__nodes__/styled-span.node";
import { MentionNode } from "../__nodes__/mention.node";

/** The default prefix applied to the editor's internal class names, IDs, etc. */
const COMPONENT_PREFIX = "carbon-rte";

/** The available actions that can be used in the editor */
const TEXT_EDITOR_ACTION_TYPES = {
  Bold: "bold" as TextFormatType,
  Italic: "italic" as TextFormatType,
  Underline: "underline" as TextFormatType,
  OrderedList: "number" as ListType,
  UnorderedList: "bullet" as ListType,
};

/** The nodes supported by markdown */
const MARKDOWN_NODES = [
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

export { COMPONENT_PREFIX, MARKDOWN_NODES, TEXT_EDITOR_ACTION_TYPES };

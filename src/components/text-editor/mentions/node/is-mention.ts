import { LexicalNode } from "lexical";
import MentionNode from "./node";

function $isMentionNode(
  node: LexicalNode | null | undefined,
): node is MentionNode {
  return node instanceof MentionNode;
}

export default $isMentionNode;

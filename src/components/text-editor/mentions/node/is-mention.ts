import { LexicalNode } from "lexical";
import MentionNode from "./node";

// Helper function to check if a node is a MentionNode
function $isMentionNode(
  node: LexicalNode | null | undefined,
): node is MentionNode {
  return node instanceof MentionNode;
}

export default $isMentionNode;

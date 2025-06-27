import { $applyNodeReplacement } from "lexical";

import MentionNode from "./node";

function $createMentionNode(
  mentionName: string,
  textContent?: string,
): MentionNode {
  const text = textContent ?? mentionName;
  const mentionNode = new MentionNode(mentionName, text);
  mentionNode.setMode("segmented").toggleDirectionless();
  return $applyNodeReplacement(mentionNode);
}

export default $createMentionNode;

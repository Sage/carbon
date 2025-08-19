import { $applyNodeReplacement } from "lexical";

import MentionNode from "./node";

function $createMentionNode(
  mentionName: string,
  textContent?: string,
): MentionNode {
  // If textContent is not provided, use mentionName as the text
  const text = textContent ?? mentionName;

  // Create a new MentionNode with the mentionName and text
  const mentionNode = new MentionNode(mentionName, text);

  // Set the mode to "segmented" and toggle directionless
  // Segmented mode is used for mentions to allow the text to be broken into segments
  // When a node is "directionless", it inherit the text direction from its parent
  mentionNode.setMode("segmented").toggleDirectionless();

  // Apply the node replacement to the mentionNode
  return $applyNodeReplacement(mentionNode);
}

export default $createMentionNode;

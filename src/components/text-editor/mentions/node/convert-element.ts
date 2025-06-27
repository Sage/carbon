import { DOMConversionOutput } from "lexical";
import $createMentionNode from "./create-mention-node";

function convertMentionElement(
  domNode: HTMLElement,
): DOMConversionOutput | null {
  const { textContent } = domNode;
  const mentionName = domNode.getAttribute("data-lexical-mention-name");

  if (textContent !== null) {
    const node = $createMentionNode(
      typeof mentionName === "string" ? mentionName : textContent,
      textContent,
    );
    return {
      node,
    };
  }

  return null;
}

export default convertMentionElement;

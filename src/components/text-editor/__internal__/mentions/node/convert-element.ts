import { DOMConversionOutput } from "lexical";
import $createMentionNode from "./create-mention-node";

function convertMentionElement(
  domNode: HTMLElement,
): DOMConversionOutput | null {
  // Get the text content and mention name from the DOM node
  const { textContent } = domNode;
  const mentionName = domNode.getAttribute("data-lexical-mention-name");

  // If the text content is null, return null
  if (textContent !== null) {
    // Create a mention node with the text content and mention name
    // If mentionName is not a string, use textContent as the mention name
    const node = $createMentionNode(
      typeof mentionName === "string" ? mentionName : textContent,
      textContent,
    );

    // Return the node to be displayed in the editor
    return {
      node,
    };
  }

  return null;
}

export default convertMentionElement;

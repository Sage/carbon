import {
  $applyNodeReplacement,
  DOMConversionOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  TextNode,
} from "lexical";

const mentionStyle = `
  background-color: #EFEFEFFF;
  border: 1px solid #656565FF;
  border-radius: 6px;
  color: #000000DD;
  cursor: pointer;
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  min-height: 21px;
  padding: 0px 8px;
`;

export class MentionNode extends TextNode {
  // The mention name is the text that will be displayed in the editor
  __mention: string;

  // Returns the custom type when requested
  static getType(): string {
    return "mention";
  }

  // Copies the node
  static clone(node: MentionNode): MentionNode {
    return new MentionNode(node.__mention, node.__text, node.__key);
  }

  // Initializes the node with the mention name and optional text/key
  constructor(mentionName: string, text?: string, key?: NodeKey) {
    super(text ?? mentionName, key);
    this.__mention = mentionName;
  }

  // Insert the new node into the editor
  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    dom.style.cssText = mentionStyle;
    dom.className = "mention";
    dom.spellcheck = false;
    return dom;
  }

  // JSON export, used to serialize the node for storage or transmission
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "mention",
      version: 1,
    };
  }

  // JSON import, used to deserialize the node from JSON
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static importJSON(serializedNode: any): TextNode {
    return new TextNode(serializedNode.text);
  }
}

export function $createMentionNode(
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

export function $isMentionNode(
  node: LexicalNode | null | undefined,
): node is MentionNode {
  return node instanceof MentionNode;
}

export function convertMentionElement(
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

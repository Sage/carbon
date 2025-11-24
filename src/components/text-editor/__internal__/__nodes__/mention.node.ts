import {
  $applyNodeReplacement,
  DOMConversionOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
  TextNode,
} from "lexical";

const mentionStyle = `
  background-color: #EFEFEFFF;
  border: 1px solid #656565FF;
  border-radius: 6px;
  color: #000000DD;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  line-height: 1.25rem;
  min-height: 21px;
  padding: 0px 8px;
  margin: 0px 4px;
`;

export interface SerializedMentionNode extends SerializedTextNode {
  mention: string;
}

export class MentionNode extends TextNode {
  // The mention name is the text that will be displayed in the editor
  __mention: string;

  /**
   * Returns the custom type when requested
   * @returns the custom "mention" typing
   */
  static getType(): string {
    return "mention";
  }

  /**
   * [INTERNAL] Copies the node. This method is internal to Lexical and should not be used;
   * use $convertMentionElement or $createMentionNode
   */
  static clone(node: MentionNode): MentionNode {
    return new MentionNode(node.__mention, node.__text, node.__key);
  }

  /**
   * Initializes the node with the mention name and optional text/key
   * @param mentionName The actual mention data
   * @param text The displayed mention
   * @param key Lexical key
   */
  constructor(mentionName: string, text?: string, key?: NodeKey) {
    super(text ?? mentionName, key);
    this.__mention = mentionName;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    dom.style.cssText = mentionStyle;
    dom.className = "mention";
    dom.spellcheck = false;
    return dom;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "mention",
      version: 1,
      mention: this.__mention,
      format: 0,
    };
  }

  static importJSON(serializedNode: SerializedMentionNode): MentionNode {
    return new MentionNode(serializedNode.mention, serializedNode.text);
  }

  // Ignored from coverage as this just prevents
  // formatting from being applied to the node
  // e.g. bold, underline
  /* istanbul ignore next */
  setFormat(): this {
    return this;
  }

  // Ignored from coverage as this just prevents
  // formatting from being applied to the node
  // e.g. bold, underline
  /* istanbul ignore next */
  toggleFormat(): this {
    return this;
  }

  // Ignored from coverage as this just prevents
  // formatting from being applied to the node
  // e.g. bold, underline
  /* istanbul ignore next */
  hasFormat(): boolean {
    return false;
  }

  // Ignored from coverage as this just prevents
  // formatting from being applied to the node
  // e.g. bold, underline
  /* istanbul ignore next */
  canInsertTextBefore(): boolean {
    return true;
  }

  // Ignored from coverage as this just prevents
  // formatting from being applied to the node
  // e.g. bold, underline
  /* istanbul ignore next */
  canInsertTextAfter(): boolean {
    return true;
  }
}

/**
 * Creates a new mention instance
 * @param mentionName The underlying mention content e.g. `john-doe`
 * @param textContent The text representation to display e.g. `John Doe`
 * @returns a new MentionNode
 */
export function $createMentionNode(
  mentionName: string,
  textContent?: string,
): MentionNode {
  // If textContent is not provided, use mentionName as the text
  const text = textContent ?? mentionName;

  // Create a new MentionNode with the mentionName and text
  const mentionNode = new MentionNode(mentionName, text);

  // Set the mode to "token" and toggle directionless
  // Token removes the whole mention on removal of characters
  // When a node is "directionless", it inherit the text direction from its parent
  mentionNode.setMode("token").toggleDirectionless();

  // Apply the node replacement to the mentionNode
  return $applyNodeReplacement(mentionNode);
}

/**
 * Determines whether a node is a MentionNode
 * @param node the node to check
 * @returns true if a mention, otherwise false
 */
export function $isMentionNode(node?: LexicalNode | null): node is MentionNode {
  return node instanceof MentionNode;
}

/**
 * Converts a DOM node to a MentionNode
 * @param domNode The DOM node to convert
 * @returns a MentionNode
 */
export const $convertMentionElement = (
  domNode: HTMLElement,
): DOMConversionOutput | null => {
  // Get the text content and mention name from the DOM node
  const { textContent } = domNode;
  const mentionName = domNode.getAttribute("data-lexical-mention-name");

  // If the text content is null, return null
  if (textContent?.length) {
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
};

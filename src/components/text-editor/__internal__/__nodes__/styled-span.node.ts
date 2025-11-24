import {
  DOMConversionMap,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
  TextNode,
} from "lexical";
import { TypographyKey } from "../__ui__/Toolbar/buttons/typography.component";

// Map of typography keys with their respective styles
const typographyMap: Record<
  TypographyKey,
  { weight: string; size: string; lineHeight: string }
> = {
  title: { weight: "700", lineHeight: "30px", size: "24px" },
  subtitle: { weight: "500", lineHeight: "26.25px", size: "21px" },
  sectionHeader: { weight: "500", lineHeight: "22.5px", size: "18px" },
  sectionSubheader: { weight: "500", lineHeight: "20px", size: "16px" },
  paragraph: { weight: "400", lineHeight: "21px", size: "14px" },
};

export interface SerializedSpanNode extends SerializedTextNode {
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
}

export class StyledSpanNode extends TextNode {
  __fontWeight: string;
  __fontSize: string;
  __lineHeight: string;

  /**
   * Returns the custom type when requested
   * @returns the custom "styled-span" typing
   */
  static getType(): string {
    // Regardless of the text content, this node is always a StyledSpanNode
    // This is important for the editor to recognize it as a custom node
    // and apply the correct styles
    return "styled-span";
  }

  /**
   * [INTERNAL] Copies the node. This method is internal to Lexical and should not be used;
   * use $createStyledSpanNode instead.
   */
  static clone(node: StyledSpanNode): StyledSpanNode {
    return new StyledSpanNode(
      node.__text,
      node.__fontWeight,
      node.__fontSize,
      node.__lineHeight,
      node.__key,
    );
  }

  /**
   * Creates a new styled span node
   * @param text The text of the node
   * @param fontWeight The font weight
   * @param fontSize The font size
   * @param lineHeight The line height of the node
   * @param key Lexical key
   */
  constructor(
    text: string,
    fontWeight: string,
    fontSize: string,
    lineHeight: string,
    key?: NodeKey,
  ) {
    super(text, key);
    this.__fontWeight = fontWeight;
    this.__fontSize = fontSize;
    this.__lineHeight = lineHeight;
  }

  /**
   * Gets the font weight of the node
   * @returns The font weight
   */
  getFontWeight(): string {
    return this.__fontWeight;
  }

  /**
   * Gets the node's font size
   * @returns The font size
   */
  getFontSize(): string {
    return this.__fontSize;
  }

  /**
   * Gets the node's line height
   * @returns The line height
   */
  getLineHeight(): string {
    return this.__lineHeight;
  }

  /**
   * Set the node's font weight
   * @param weight the font's weight
   */
  setFontWeight(weight: string) {
    const writable = this.getWritable();
    writable.__fontWeight = weight;
  }

  /**
   * Set the node's font size
   * @param size the font's size
   */
  setFontSize(size: string) {
    const writable = this.getWritable();
    writable.__fontSize = size;
  }

  /**
   * Set the node's font line height
   * @param lineHeight the font's line height
   */
  setLineHeight(lineHeight: string) {
    const writable = this.getWritable();
    writable.__lineHeight = lineHeight;
  }

  /**
   * Determine the typography key based on the current styles
   * @returns the variant of this styled span
   */
  getTypographyKey(): TypographyKey {
    for (const key of Object.keys(typographyMap) as TypographyKey[]) {
      const { weight, size, lineHeight } = typographyMap[key];
      if (
        this.__fontWeight === weight &&
        this.__fontSize === size &&
        this.__lineHeight === lineHeight
      ) {
        return key;
      }
    }
    return "paragraph";
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("span");
    element.style.fontWeight = this.__fontWeight;
    element.style.fontSize = this.__fontSize;
    element.style.lineHeight = this.__lineHeight;
    element.textContent = this.getTextContent();
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => ({
        conversion: () => {
          const fontWeight = domNode.style.fontWeight || "400";
          const fontSize = domNode.style.fontSize || "14px";
          const lineHeight = domNode.style.lineHeight || "21px";

          return {
            node: new StyledSpanNode(
              domNode.textContent || "",
              fontWeight,
              fontSize,
              lineHeight,
            ),
          };
        },
        priority: 1,
      }),
    };
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "styled-span",
      version: 1,
      fontWeight: this.__fontWeight,
      fontSize: this.__fontSize,
      lineHeight: this.__lineHeight,
    };
  }

  static importJSON(serializedNode: SerializedSpanNode): StyledSpanNode {
    return new StyledSpanNode(
      serializedNode.text,
      serializedNode.fontWeight,
      serializedNode.fontSize,
      serializedNode.lineHeight,
    );
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const dom = super.createDOM(_config);
    dom.style.fontWeight = this.__fontWeight;
    dom.style.fontSize = this.__fontSize;
    dom.style.lineHeight = this.__lineHeight;
    return dom;
  }

  updateDOM(
    prevNode: StyledSpanNode,
    dom: HTMLElement,
    config: EditorConfig,
  ): boolean {
    let updated = super.updateDOM(prevNode, dom, config);

    if (this.__fontWeight !== prevNode.__fontWeight) {
      dom.style.fontWeight = this.__fontWeight;
      updated = true;
    }
    if (this.__fontSize !== prevNode.__fontSize) {
      dom.style.fontSize = this.__fontSize;
      updated = true;
    }
    if (this.__lineHeight !== prevNode.__lineHeight) {
      dom.style.lineHeight = this.__lineHeight;
      updated = true;
    }

    // Return true if the node was updated, false otherwise
    // This is important for the editor to know if it needs to re-render the node
    // If the text content or styles have changed, we return true
    // If the text content is the same but styles have changed, we also return true
    // If neither has changed, we return false
    // This helps optimize rendering performance and ensures that the editor
    // only re-renders nodes when necessary
    return updated;
  }

  /**
   * Factory-style helper method to create a StyledSpanNode from a typography key. Initial text can be provided, defaulting to an empty string.
   * @param option Typography type to use
   * @param text Text to set, or blank
   * @returns StyledSpan node
   */
  static createFromOption(
    option: TypographyKey,
    text: string = "",
  ): StyledSpanNode {
    const { weight, size, lineHeight } = typographyMap[option];
    return new StyledSpanNode(text, weight, size, lineHeight);
  }
}

// Helper function to create a StyledSpanNode with default styles
// This is useful for creating nodes with specific styles without needing to
// manually specify the styles each time

/**
 * Create a StyledSpanNode with default styles. Removes the need to manually specify the styles each time
 * @param text The text of the node
 * @param weight The font weight
 * @param size The font size
 * @param lineHeight The line height
 * @returns a StyledSpanNode representing the config
 */
export function $createStyledSpanNode(
  text: string,
  weight: string,
  size: string,
  lineHeight: string,
): StyledSpanNode {
  return new StyledSpanNode(text, weight, size, lineHeight);
}

/**
 * Determines whether a node is a StyledSpanNode
 * @param node the node to check
 * @returns true if a styled span, otherwise false
 */
export function $isStyledSpanNode(
  node: LexicalNode | null | undefined,
): node is StyledSpanNode {
  return node instanceof StyledSpanNode;
}

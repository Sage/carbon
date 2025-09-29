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
  title: { weight: "700", lineHeight: "37.5px", size: "30px" },
  subtitle: { weight: "700", lineHeight: "30px", size: "24px" },
  sectionHeader: { weight: "700", lineHeight: "26.25px", size: "21px" },
  sectionSubheader: { weight: "700", lineHeight: "22.5px", size: "18px" },
  paragraph: { weight: "400", lineHeight: "21px", size: "14px" },
};

export class StyledSpanNode extends TextNode {
  __fontWeight: string;
  __fontSize: string;
  __lineHeight: string;

  static getType(): string {
    // Regardless of the text content, this node is always a StyledSpanNode
    // This is important for the editor to recognize it as a custom node
    // and apply the correct styles
    return "styled-span";
  }

  static clone(node: StyledSpanNode): StyledSpanNode {
    return new StyledSpanNode(
      node.__text,
      node.__fontWeight,
      node.__fontSize,
      node.__lineHeight,
      node.__key,
    );
  }

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

  // Define getters for the typography style properties
  getFontWeight(): string {
    return this.__fontWeight;
  }
  getFontSize(): string {
    return this.__fontSize;
  }
  getLineHeight(): string {
    return this.__lineHeight;
  }

  // Define setters for the typography style properties
  setFontWeight(weight: string) {
    const writable = this.getWritable();
    writable.__fontWeight = weight;
  }
  setFontSize(size: string) {
    const writable = this.getWritable();
    writable.__fontSize = size;
  }
  setLineHeight(lineHeight: string) {
    const writable = this.getWritable();
    writable.__lineHeight = lineHeight;
  }

  // Determine the typography key based on the current styles
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

  // DOM export, used to convert the node to a DOM element for rendering
  exportDOM(): DOMExportOutput {
    const element = document.createElement("span");
    element.style.fontWeight = this.__fontWeight;
    element.style.fontSize = this.__fontSize;
    element.style.lineHeight = this.__lineHeight;
    element.textContent = this.getTextContent();
    return { element };
  }

  // DOM import, used to convert a DOM element back to a StyledSpanNode
  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => ({
        conversion: () => {
          const { textContent, style } = domNode;
          const {
            fontWeight = "400",
            fontSize = "14px",
            lineHeight = "21px",
          } = style;

          return {
            node: new StyledSpanNode(
              textContent ?? "",
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

  // JSON export, used to serialize the node for storage or transmission
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

  // JSON import, used to deserialize the node from JSON
  static importJSON(
    serializedNode: SerializedTextNode & {
      fontWeight: string;
      fontSize: string;
      lineHeight: string;
    },
  ): StyledSpanNode {
    return new StyledSpanNode(
      serializedNode.text,
      serializedNode.fontWeight,
      serializedNode.fontSize,
      serializedNode.lineHeight,
    );
  }

  // Create the DOM element for this node
  createDOM(_config: EditorConfig): HTMLElement {
    const dom = super.createDOM(_config);
    dom.style.fontWeight = this.__fontWeight;
    dom.style.fontSize = this.__fontSize;
    dom.style.lineHeight = this.__lineHeight;
    return dom;
  }

  // Update the DOM element when the node is updated
  // This is called when the node's properties change
  // and ensures the DOM reflects the current state of the node
  updateDOM(
    prevNode: StyledSpanNode,
    dom: HTMLElement,
    config: EditorConfig,
  ): boolean {
    const updated = super.updateDOM(prevNode, dom, config);

    if (this.__fontWeight !== prevNode.__fontWeight) {
      dom.style.fontWeight = this.__fontWeight;
      return true;
    }
    if (this.__fontSize !== prevNode.__fontSize) {
      dom.style.fontSize = this.__fontSize;
      return true;
    }
    if (this.__lineHeight !== prevNode.__lineHeight) {
      dom.style.lineHeight = this.__lineHeight;
      return true;
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

  // Factory-style helper method to create a StyledSpanNode from a typography key.
  // Initial text can be provided, defaulting to an empty string.
  static createFromKey(key: TypographyKey, text: string = ""): StyledSpanNode {
    const { weight, size, lineHeight } = typographyMap[key];
    return new StyledSpanNode(text, weight, size, lineHeight);
  }
}

// Helper function to create a StyledSpanNode with default styles
// This is useful for creating nodes with specific styles without needing to
// manually specify the styles each time
export function $createStyledSpanNode(
  text: string,
  weight: string,
  size: string,
  lineHeight: string,
): StyledSpanNode {
  return new StyledSpanNode(text, weight, size, lineHeight);
}

// Helper function to check if a node is a StyledSpanNode
export function $isStyledSpanNode(
  node: LexicalNode | null | undefined,
): node is StyledSpanNode {
  return node instanceof StyledSpanNode;
}

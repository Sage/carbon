import { EditorConfig, NodeKey, TextNode } from "lexical";
import mentionStyle from "./style";

class MentionNode extends TextNode {
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
}

export default MentionNode;

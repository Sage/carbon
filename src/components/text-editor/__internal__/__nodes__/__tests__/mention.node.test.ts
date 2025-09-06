import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  LexicalEditor,
} from "lexical";
import { createHeadlessEditor } from "@lexical/headless";
import {
  MentionNode,
  $createMentionNode,
  $isMentionNode,
  convertMentionElement,
} from "../mention.node";

// Mock DOM environment if needed
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => "",
  }),
});

describe("MentionNode", () => {
  let editor: LexicalEditor | null = null;

  beforeEach(() => {
    // Create a headless editor for testing
    editor = createHeadlessEditor({
      nodes: [MentionNode],
      onError: (error) => {
        throw error;
      },
    });
  });

  afterEach(() => {
    editor = null;
  });

  describe("MentionNode class", () => {
    test("should return correct type", () => {
      expect(MentionNode.getType()).toBe("mention");
    });

    test("should create instance with mention name", () => {
      editor?.update(() => {
        const mentionNode = new MentionNode("john_doe");

        expect(mentionNode.__mention).toBe("john_doe");
        expect(mentionNode.getTextContent()).toBe("john_doe");
      });
    });

    test("should use mention name as text when text is not provided", () => {
      editor?.update(() => {
        const mentionNode = new MentionNode("john_doe");

        expect(mentionNode.__mention).toBe("john_doe");
        expect(mentionNode.getTextContent()).toBe("john_doe");
      });
    });

    test("should clone node correctly", () => {
      editor?.update(() => {
        const original = new MentionNode("john_doe", "John Doe", "test-key");
        const cloned = MentionNode.clone(original);

        expect(cloned.__mention).toBe(original.__mention);
        expect(cloned.getTextContent()).toBe(original.getTextContent());
        expect(cloned.getKey()).toBe(original.getKey());
        expect(cloned).not.toBe(original); // Should be different instances
      });
    });

    test("should create DOM element with correct styling and attributes", () => {
      editor?.update(() => {
        const mentionNode = new MentionNode("john_doe", "John Doe");
        const config = editor?.getEditorConfig();
        const domElement = mentionNode.createDOM(config);

        expect(domElement.className).toBe("mention");
        expect(domElement.spellcheck).toBe(false);
        expect(domElement.style.cssText).toContain("background-color");
        expect(domElement.style.cssText).toContain("border");
        expect(domElement.style.cssText).toContain("border-radius");
      });
    });

    test("should export JSON correctly", () => {
      editor?.update(() => {
        const mentionNode = new MentionNode("john_doe", "John Doe");
        const json = mentionNode.exportJSON();

        expect(json.type).toBe("mention");
        expect(json.version).toBe(1);
        expect(json.text).toBe("John Doe");
      });
    });

    test("should import from JSON correctly", () => {
      const serializedNode = {
        text: "John Doe",
        type: "mention",
        version: 1,
      };

      editor?.update(() => {
        const importedNode = MentionNode.importJSON(serializedNode);

        expect(importedNode.getTextContent()).toBe("John Doe");
      });
    });
  });

  describe("$createMentionNode function", () => {
    test("should create mention node with mention name only", () => {
      editor?.update(() => {
        const mentionNode = $createMentionNode("john_doe");

        expect(mentionNode.__mention).toBe("john_doe");
        expect(mentionNode.getTextContent()).toBe("john_doe");
        expect(mentionNode.getMode()).toBe(1); // segmented mode
      });
    });

    test("should create mention node with custom text content", () => {
      editor?.update(() => {
        const mentionNode = $createMentionNode("john_doe", "John Doe");

        expect(mentionNode.__mention).toBe("john_doe");
        expect(mentionNode.getTextContent()).toBe("John Doe");
      });
    });

    test("should set node to segmented mode and directionless", () => {
      editor?.update(() => {
        const mentionNode = $createMentionNode("john_doe");

        expect(mentionNode.getMode()).toBe(1); // segmented mode constant
        // Note: You might need to add a getter for directionless state to test this
      });
    });
  });

  describe("$isMentionNode function", () => {
    test("should return true for MentionNode instances", () => {
      editor?.update(() => {
        const mentionNode = $createMentionNode("john_doe");

        expect($isMentionNode(mentionNode)).toBe(true);
      });
    });

    test("should return false for non-MentionNode instances", () => {
      editor?.update(() => {
        const textNode = $createTextNode("regular text");
        const paragraphNode = $createParagraphNode();

        expect($isMentionNode(textNode)).toBe(false);
        expect($isMentionNode(paragraphNode)).toBe(false);
        expect($isMentionNode(null)).toBe(false);
        expect($isMentionNode(undefined)).toBe(false);
      });
    });
  });

  describe("convertMentionElement function", () => {
    test("should convert DOM element with mention data attribute", () => {
      const domElement = document.createElement("span");
      domElement.textContent = "John Doe";
      domElement.setAttribute("data-lexical-mention-name", "john_doe");

      editor?.update(() => {
        const result = convertMentionElement(domElement);

        expect(result).not.toBeNull();
        expect(result.node).toBeInstanceOf(MentionNode);
        expect(result.node.__mention).toBe("john_doe");
        expect(result.node.getTextContent()).toBe("John Doe");
      });
    });

    test("should convert DOM element without mention data attribute", () => {
      const domElement = document.createElement("span");
      domElement.textContent = "John Doe";

      editor?.update(() => {
        const result = convertMentionElement(domElement);

        expect(result).not.toBeNull();
        expect(result.node).toBeInstanceOf(MentionNode);
        expect(result.node.__mention).toBe("John Doe");
        expect(result.node.getTextContent()).toBe("John Doe");
      });
    });

    test("should return null for DOM element with null textContent", () => {
      const domElement = document.createElement("span");
      domElement.textContent = null;

      editor?.update(() => {
        const result = convertMentionElement(domElement);

        expect(result).toBeNull();
      });
    });

    test("should handle empty string textContent", () => {
      const domElement = document.createElement("span");
      domElement.textContent = "";

      editor?.update(() => {
        const result = convertMentionElement(domElement);

        expect(result).not.toBeNull();
        expect(result.node.getTextContent()).toBe("");
      });
    });
  });

  describe("Integration tests", () => {
    test("should insert mention node into editor", () => {
      editor?.update(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const mentionNode = $createMentionNode("john_doe", "John Doe");

        paragraph.append(mentionNode);
        root.append(paragraph);

        expect(root.getChildrenSize()).toBe(1);
        expect(paragraph.getChildrenSize()).toBe(1);
        expect($isMentionNode(paragraph.getFirstChild())).toBe(true);
      });
    });

    test("should serialize and deserialize correctly", () => {
      let serialized;

      // First, create and serialize
      editor?.update(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const mentionNode = $createMentionNode("john_doe", "John Doe");

        paragraph.append(mentionNode);
        root.append(paragraph);

        serialized = JSON.stringify(editor?.getEditorState().toJSON());
      });

      // Then create new editor and deserialize
      const newEditor = createHeadlessEditor({
        nodes: [MentionNode],
        onError: (error) => {
          throw error;
        },
      });

      const editorState = newEditor?.parseEditorState(serialized);
      newEditor?.setEditorState(editorState);

      newEditor?.read(() => {
        const root = $getRoot();
        const paragraph = root.getFirstChild();
        const mentionNode = paragraph.getFirstChild();

        expect($isMentionNode(mentionNode)).toBe(true);
        expect(mentionNode.getTextContent()).toBe("John Doe");
      });
    });
  });
});

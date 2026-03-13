import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  LexicalEditor,
  ParagraphNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { createHeadlessEditor } from "@lexical/headless";
import {
  StyledSpanNode,
  $createStyledSpanNode,
  $isStyledSpanNode,
  SerializedSpanNode,
} from "./styled-span.node";
import { TypographyKey } from "../__ui__/Toolbar/buttons/typography.component";
import { act, render } from "@testing-library/react";
import React from "react";
import TextEditor from "../../text-editor.component";

// Mock DOM environment if needed
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => "",
  }),
});

const EditorRefPlugin = ({
  onReady,
}: {
  onReady: (editor: LexicalEditor) => void;
}) => {
  const [editor] = useLexicalComposerContext();
  React.useEffect(() => {
    onReady(editor);
  }, [editor, onReady]);
  return null;
};

const staticConfig = {
  nodes: [StyledSpanNode],
  namespace: "StyledSpanNodeTest",
  theme: {},
  onError: (error: Error) => {
    throw error;
  },
};

describe("StyledSpanNode", () => {
  let editor: LexicalEditor | null = null;

  beforeEach(() => {
    // Create a headless editor for testing
    editor = createHeadlessEditor(staticConfig);
  });

  afterEach(() => {
    editor = null;
  });

  describe("StyledSpanNode class", () => {
    test("should return correct type", () => {
      expect(StyledSpanNode.getType()).toBe("styled-span");
    });

    test("should create instance with all style properties", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("Hello World", "700", "24px", "30px");

        expect(node.getTextContent()).toBe("Hello World");
        expect(node.getFontWeight()).toBe("700");
        expect(node.getFontSize()).toBe("24px");
        expect(node.getLineHeight()).toBe("30px");
      });
    });

    test("should clone node correctly", () => {
      editor?.update(() => {
        const paragraph = $createParagraphNode();
        const original = StyledSpanNode.createFromOption(
          "paragraph",
          "Test Text",
        );

        paragraph.append(original);
        $getRoot().append(paragraph);

        const cloned = StyledSpanNode.clone(original);

        expect(cloned.getTextContent()).toBe(original.getTextContent());
        expect(cloned.getFontWeight()).toBe(original.getFontWeight());
        expect(cloned.getFontSize()).toBe(original.getFontSize());
        expect(cloned.getLineHeight()).toBe(original.getLineHeight());
        expect(cloned.getKey()).toBe(original.getKey());
        expect(cloned).not.toBe(original); // Should be different instances
      });
    });

    test("should create node from typography key", () => {
      editor?.update(() => {
        const titleNode = StyledSpanNode.createFromOption("title", "My Title");

        expect(titleNode.getTextContent()).toBe("My Title");
        expect(titleNode.getFontWeight()).toBe("700");
        expect(titleNode.getFontSize()).toBe("24px");
        expect(titleNode.getLineHeight()).toBe("30px");
      });
    });

    test("should create node from typography key with empty text", () => {
      editor?.update(() => {
        const paragraphNode = StyledSpanNode.createFromOption("paragraph");

        expect(paragraphNode.getTextContent()).toBe("");
        expect(paragraphNode.getFontWeight()).toBe("400");
        expect(paragraphNode.getFontSize()).toBe("14px");
        expect(paragraphNode.getLineHeight()).toBe("21px");
      });
    });
  });

  describe("Getters and Setters", () => {
    test("should get font weight, size and line height correctly", () => {
      let editorRef: LexicalEditor | undefined;

      render(
        <TextEditor
          labelText="Test Editor"
          customPlugins={
            <EditorRefPlugin
              onReady={(editor) => {
                editorRef = editor;
              }}
            />
          }
        />,
      );

      act(() => {
        editorRef?.update(() => {
          const node = new StyledSpanNode("Test", "400", "14px", "21px");
          expect(node.getFontWeight()).toBe("400");
          expect(node.getFontSize()).toBe("14px");
          expect(node.getLineHeight()).toBe("21px");
        });
      });
    });

    test("should set font weight, size and line height", () => {
      let editorRef: LexicalEditor | undefined;

      render(
        <TextEditor
          labelText="Test Editor"
          customPlugins={
            <EditorRefPlugin
              onReady={(editor) => {
                editorRef = editor;
              }}
            />
          }
        />,
      );

      editorRef?.update(() => {
        const node = new StyledSpanNode("Test", "400", "14px", "21px");
        node.setFontWeight("700");
        expect(node.getFontWeight()).toBe("700");

        node.setFontSize("18px");
        expect(node.getFontSize()).toBe("18px");

        node.setLineHeight("22px");
        expect(node.getLineHeight()).toBe("22px");
      });
    });
  });

  describe("Typography key detection", () => {
    test("should detect title typography", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("Title", "700", "24px", "30px");
        expect(node.getTypographyKey()).toBe("title");
      });
    });

    test("should detect subtitle typography", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("Subtitle", "500", "21px", "26.25px");
        expect(node.getTypographyKey()).toBe("subtitle");
      });
    });

    test("should detect sectionHeader typography", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("Header", "500", "18px", "22.5px");
        expect(node.getTypographyKey()).toBe("sectionHeader");
      });
    });

    test("should detect sectionSubheader typography", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("Subheader", "500", "16px", "20px");
        expect(node.getTypographyKey()).toBe("sectionSubheader");
      });
    });

    test("should detect paragraph typography", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("Paragraph", "400", "14px", "21px");
        expect(node.getTypographyKey()).toBe("paragraph");
      });
    });

    test("should default to paragraph for unknown styles", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("Unknown", "500", "16px", "24px");
        expect(node.getTypographyKey()).toBe("paragraph");
      });
    });
  });

  describe("DOM creation and manipulation", () => {
    test("should create DOM element with correct styles", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("Test Text", "700", "24px", "30px");
        const config = staticConfig;
        const domElement = node.createDOM(config);

        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.fontWeight).toBe("700");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.fontSize).toBe("24px");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.lineHeight).toBe("30px");

        expect(domElement).toHaveTextContent("Test Text");
      });
    });

    test("should update DOM when styles change", () => {
      editor?.update(() => {
        const prevNode = new StyledSpanNode("Test", "400", "14px", "21px");
        const currentNode = new StyledSpanNode("Test", "700", "18px", "24px");
        const config = staticConfig;

        const domElement = document.createElement("span");
        domElement.style.fontWeight = "400";
        domElement.style.fontSize = "14px";
        domElement.style.lineHeight = "21px";

        const wasUpdated = currentNode.updateDOM(prevNode, domElement, config);

        expect(wasUpdated).toBe(true);
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.fontWeight).toBe("700");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.fontSize).toBe("18px");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.lineHeight).toBe("24px");
      });
    });

    test("should not update DOM when styles are unchanged", () => {
      editor?.update(() => {
        const prevNode = new StyledSpanNode("Test", "400", "14px", "21px");
        const currentNode = new StyledSpanNode("Test", "400", "14px", "21px");
        const config = staticConfig;

        const domElement = document.createElement("span");
        const wasUpdated = currentNode.updateDOM(prevNode, domElement, config);

        expect(wasUpdated).toBe(false);
      });
    });

    test("should update DOM when only one style property changes", () => {
      editor?.update(() => {
        const prevNode = new StyledSpanNode("Test", "400", "14px", "21px");
        const currentNode = new StyledSpanNode("Test", "700", "14px", "21px"); // Only weight changed
        const config = staticConfig;

        const domElement = document.createElement("span");
        domElement.style.fontWeight = "400";
        domElement.style.fontSize = "14px";
        domElement.style.lineHeight = "21px";

        const wasUpdated = currentNode.updateDOM(prevNode, domElement, config);

        expect(wasUpdated).toBe(true);
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.fontWeight).toBe("700");
      });
    });
  });

  describe("DOM export and import", () => {
    test("should export DOM correctly", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("Export Test", "700", "24px", "30px");
        const { element } = node.exportDOM();
        const htmlElement = element as HTMLElement;

        expect(htmlElement.tagName).toBe("SPAN");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(htmlElement.style.fontWeight).toBe("700");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(htmlElement.style.fontSize).toBe("24px");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(htmlElement.style.lineHeight).toBe("30px");
        expect(htmlElement).toHaveTextContent("Export Test");
      });
    });

    test("should have import DOM mapping for span elements", () => {
      editor?.update(() => {
        const importMap = StyledSpanNode.importDOM();

        expect(importMap).not.toBeNull();
        expect(importMap?.span).toBeDefined();
        expect(typeof importMap?.span).toBe("function");
      });
    });

    test("should import from DOM element correctly", () => {
      editor?.update(() => {
        const domElement = document.createElement("span");
        domElement.textContent = "Import Test";
        domElement.style.fontWeight = "700";
        domElement.style.fontSize = "24px";
        domElement.style.lineHeight = "30px";

        const importMap = StyledSpanNode.importDOM();
        const conversionData = importMap?.span(domElement);
        const node = conversionData?.conversion(document.createElement("span"))
          ?.node as StyledSpanNode;

        expect(node).toBeInstanceOf(StyledSpanNode);
        expect(node.getTextContent()).toBe("Import Test");
        expect(node.getFontWeight()).toBe("700");
        expect(node.getFontSize()).toBe("24px");
        expect(node.getLineHeight()).toBe("30px");
      });
    });

    test("should import from DOM with default styles when not specified", () => {
      editor?.update(() => {
        const domElement = document.createElement("span");
        domElement.textContent = "Default Test";

        const importMap = StyledSpanNode.importDOM();
        const conversionData = importMap?.span(domElement);

        const node = conversionData?.conversion(document.createElement("span"))
          ?.node as StyledSpanNode;

        expect(node.getFontWeight()).toBe("400");
        expect(node.getFontSize()).toBe("14px");
        expect(node.getLineHeight()).toBe("21px");
      });
    });
  });

  describe("JSON serialization", () => {
    test("should export JSON correctly", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("JSON Test", "700", "24px", "30px");
        const json = node.exportJSON();

        expect(json.type).toBe("styled-span");
        expect(json.version).toBe(1);
        expect(json.text).toBe("JSON Test");
        expect(json.fontWeight).toBe("700");
        expect(json.fontSize).toBe("24px");
        expect(json.lineHeight).toBe("30px");
      });
    });

    test("should import from JSON correctly", () => {
      editor?.update(() => {
        const serializedNode: SerializedSpanNode = {
          text: "JSON Import Test",
          type: "styled-span",
          version: 1,
          fontWeight: "700",
          fontSize: "24px",
          lineHeight: "30px",
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
        };

        const importedNode = StyledSpanNode.importJSON(serializedNode);

        expect(importedNode).toBeInstanceOf(StyledSpanNode);
        expect(importedNode.getTextContent()).toBe("JSON Import Test");
        expect(importedNode.getFontWeight()).toBe("700");
        expect(importedNode.getFontSize()).toBe("24px");
        expect(importedNode.getLineHeight()).toBe("30px");
      });
    });
  });

  describe("Helper functions", () => {
    test("$createStyledSpanNode should create node correctly", () => {
      editor?.update(() => {
        const node = $createStyledSpanNode(
          "Helper Test",
          "700",
          "24px",
          "30px",
        );

        expect(node).toBeInstanceOf(StyledSpanNode);
        expect(node.getTextContent()).toBe("Helper Test");
        expect(node.getFontWeight()).toBe("700");
        expect(node.getFontSize()).toBe("24px");
        expect(node.getLineHeight()).toBe("30px");
      });
    });

    test("$isStyledSpanNode should return true for StyledSpanNode instances", () => {
      editor?.update(() => {
        const styledNode = $createStyledSpanNode("Test", "400", "14px", "21px");

        expect($isStyledSpanNode(styledNode)).toBe(true);
      });
    });

    test("$isStyledSpanNode should return false for non-StyledSpanNode instances", () => {
      editor?.update(() => {
        const textNode = $createTextNode("regular text");
        const paragraphNode = $createParagraphNode();

        expect($isStyledSpanNode(textNode)).toBe(false);
        expect($isStyledSpanNode(paragraphNode)).toBe(false);
        expect($isStyledSpanNode(null)).toBe(false);
        expect($isStyledSpanNode(undefined)).toBe(false);
      });
    });
  });

  describe("Integration tests", () => {
    test("should insert styled span node into editor", () => {
      editor?.update(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const styledSpanNode = $createStyledSpanNode(
          "Integration Test",
          "700",
          "24px",
          "30px",
        );

        paragraph.append(styledSpanNode);
        root.append(paragraph);

        expect(root.getChildrenSize()).toBe(1);
        expect(paragraph.getChildrenSize()).toBe(1);
        expect($isStyledSpanNode(paragraph.getFirstChild())).toBe(true);
      });
    });

    test("should serialize and deserialize correctly", async () => {
      let serialized: string;

      // First, create and serialize
      await act(() => {
        editor?.update(() => {
          const root = $getRoot();
          const paragraph = $createParagraphNode();
          const styledSpanNode = StyledSpanNode.createFromOption(
            "title",
            "My Title",
          );

          paragraph.append(styledSpanNode);
          root.append(paragraph);
        });
      });

      await act(() => {
        serialized = JSON.stringify(editor?.getEditorState().toJSON());
      });

      // Then create new editor and deserialize
      const newEditor = createHeadlessEditor(staticConfig);

      await act(() => {
        const editorState = newEditor?.parseEditorState(serialized);
        newEditor?.setEditorState(editorState);
      });

      await act(() => {
        newEditor?.read(() => {
          const root = $getRoot();
          const paragraph = root.getFirstChild();
          const styledSpanNode = (paragraph as ParagraphNode).getFirstChild();

          expect($isStyledSpanNode(styledSpanNode)).toBe(true);
          expect(styledSpanNode?.getTextContent()).toBe("My Title");
          expect((styledSpanNode as StyledSpanNode)?.getTypographyKey()).toBe(
            "title",
          );
          expect((styledSpanNode as StyledSpanNode)?.getFontWeight()).toBe(
            "700",
          );
          expect((styledSpanNode as StyledSpanNode)?.getFontSize()).toBe(
            "24px",
          );
          expect((styledSpanNode as StyledSpanNode)?.getLineHeight()).toBe(
            "30px",
          );
        });
      });
    });

    test("should handle style updates in editor context", () => {
      editor?.update(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const styledSpanNode = $createStyledSpanNode(
          "Update Test",
          "400",
          "14px",
          "21px",
        );

        paragraph.append(styledSpanNode);
        root.append(paragraph);

        // Update styles
        styledSpanNode.setFontWeight("500");
        styledSpanNode.setFontSize("21px");
        styledSpanNode.setLineHeight("26.25px");

        expect(styledSpanNode.getFontWeight()).toBe("500");
        expect(styledSpanNode.getFontSize()).toBe("21px");
        expect(styledSpanNode.getLineHeight()).toBe("26.25px");
        expect(styledSpanNode.getTypographyKey()).toBe("subtitle");
      });
    });

    test("should work with all typography keys", () => {
      const typographyKeys = [
        "title",
        "subtitle",
        "sectionHeader",
        "sectionSubheader",
        "paragraph",
      ];

      editor?.update(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();

        typographyKeys.forEach((key) => {
          const node = StyledSpanNode.createFromOption(
            key as TypographyKey,
            `${key} text`,
          );
          paragraph.append(node);
          expect(node.getTypographyKey()).toBe(key);
        });

        root.append(paragraph);
        expect(paragraph.getChildrenSize()).toBe(typographyKeys.length);
      });
    });
  });

  describe("Edge cases and error handling", () => {
    test("should handle empty text content", () => {
      editor?.update(() => {
        const node = new StyledSpanNode("", "400", "14px", "21px");

        expect(node.getTextContent()).toBe("");
        expect(node.getFontWeight()).toBe("400");
      });
    });

    test("should handle DOM import with empty text content", () => {
      editor?.update(() => {
        const domElement = document.createElement("span");
        domElement.textContent = "";
        const importMap = StyledSpanNode.importDOM();
        const conversionData = importMap?.span(domElement);
        const node = conversionData?.conversion(document.createElement("span"))
          ?.node as StyledSpanNode;

        expect(node.getTextContent()).toBe("");
      });
    });

    test("should handle DOM import with null text content", () => {
      editor?.update(() => {
        const domElement = document.createElement("span");
        domElement.textContent = null;

        const importMap = StyledSpanNode.importDOM();
        const conversionData = importMap?.span(domElement);
        const node = conversionData?.conversion(document.createElement("span"))
          ?.node as StyledSpanNode;

        expect(node.getTextContent()).toBe("");
      });
    });
  });
});

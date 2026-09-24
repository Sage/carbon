import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  LexicalEditor,
  ParagraphNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
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

    test("should create DOM with effective bold weight and italic style", () => {
      editor?.update(() => {
        const node = new StyledSpanNode(
          "Formatted Text",
          "400",
          "14px",
          "21px",
        );
        node.toggleFormat("bold");
        node.toggleFormat("italic");
        const config = staticConfig;

        const domElement = node.createDOM(config);

        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.fontWeight).toBe("700");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.fontStyle).toBe("italic");
      });
    });

    test("should update DOM when italic format is toggled on", () => {
      editor?.update(() => {
        const prevNode = new StyledSpanNode(
          "Italic Toggle",
          "400",
          "14px",
          "21px",
        );
        const currentNode = new StyledSpanNode(
          "Italic Toggle",
          "400",
          "14px",
          "21px",
        );
        currentNode.toggleFormat("italic");
        const config = staticConfig;

        const domElement = document.createElement("span");
        domElement.style.fontStyle = "";

        const wasUpdated = currentNode.updateDOM(prevNode, domElement, config);

        expect(wasUpdated).toBe(true);
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.fontStyle).toBe("italic");
      });
    });

    test("should update DOM when italic format is toggled off", () => {
      editor?.update(() => {
        const prevNode = new StyledSpanNode(
          "Italic Toggle",
          "400",
          "14px",
          "21px",
        );
        prevNode.toggleFormat("italic");
        const currentNode = new StyledSpanNode(
          "Italic Toggle",
          "400",
          "14px",
          "21px",
        );
        const config = staticConfig;

        const domElement = document.createElement("span");
        domElement.style.fontStyle = "italic";

        const wasUpdated = currentNode.updateDOM(prevNode, domElement, config);

        expect(wasUpdated).toBe(true);
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(domElement.style.fontStyle).toBe("");
      });
    });

    test("should evaluate bold ternary branches for both previous and current nodes", () => {
      editor?.update(() => {
        const prevNode = new StyledSpanNode(
          "Bold Branch",
          "400",
          "14px",
          "21px",
        );
        prevNode.toggleFormat("bold");
        const currentNode = new StyledSpanNode(
          "Bold Branch",
          "400",
          "14px",
          "21px",
        );
        currentNode.toggleFormat("bold");
        const config = staticConfig;

        const domElement = document.createElement("span");
        const wasUpdated = currentNode.updateDOM(prevNode, domElement, config);

        expect(wasUpdated).toBe(false);
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

    test("should nest multiple format tags when combined", () => {
      editor?.update(() => {
        const node = new StyledSpanNode(
          "Combined Export Test",
          "700",
          "24px",
          "30px",
        );
        node.toggleFormat("bold");
        node.toggleFormat("italic");
        node.toggleFormat("underline");
        const { element } = node.exportDOM();
        const htmlElement = element as HTMLElement;

        expect(htmlElement.tagName).toBe("U");
        // eslint-disable-next-line testing-library/no-node-access
        expect(htmlElement.querySelector("em")).toBeTruthy();
        // eslint-disable-next-line testing-library/no-node-access
        expect(htmlElement.querySelector("strong")).toBeTruthy();
        // eslint-disable-next-line testing-library/no-node-access
        expect(htmlElement.querySelector("strong span")).toHaveTextContent(
          "Combined Export Test",
        );
      });
    });

    test("should preserve the base weight in an attribute when formatting is combined", () => {
      editor?.update(() => {
        const node = new StyledSpanNode(
          "Formatted Export",
          "400",
          "14px",
          "21px",
        );
        node.toggleFormat("bold");
        node.toggleFormat("italic");

        const { element } = node.exportDOM();
        const htmlElement = element as HTMLElement;

        // eslint-disable-next-line testing-library/no-node-access
        const span = htmlElement.querySelector("span") as HTMLElement;

        expect(span).toBeTruthy();
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.fontWeight).toBe("");
        expect(span.getAttribute("data-carbon-base-weight")).toBe("400");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.fontStyle).toBe("");
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

    test("should normalise imported bold weight to paragraph when typography does not match", () => {
      editor?.update(() => {
        const domElement = document.createElement("span");
        domElement.textContent = "Bold looking paragraph";
        domElement.style.fontWeight = "700";
        domElement.style.fontSize = "14px";
        domElement.style.lineHeight = "21px";

        const importMap = StyledSpanNode.importDOM();
        const conversionData = importMap?.span(domElement);
        const node = conversionData?.conversion(document.createElement("span"))
          ?.node as StyledSpanNode;

        expect(node.getFontWeight()).toBe("400");
        expect(node.getFontSize()).toBe("14px");
        expect(node.getLineHeight()).toBe("21px");
        expect(node.hasFormat("bold")).toBe(true);
      });
    });

    test("should preserve bold format from parent strong while normalising span weight", () => {
      editor?.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(
          '<p><strong><span style="font-weight: 700; font-size: 14px; line-height: 21px;">Bold import</span></strong></p>',
          "text/html",
        );

        const nodes = $generateNodesFromDOM(editor as LexicalEditor, dom);
        const paragraph = nodes[0] as ParagraphNode;
        const styledNode = paragraph.getFirstChild();

        expect($isStyledSpanNode(styledNode)).toBe(true);
        expect((styledNode as StyledSpanNode).getFontWeight()).toBe("400");
        expect((styledNode as StyledSpanNode).hasFormat("bold")).toBe(true);
      });
    });

    test("should keep title typography weight without forcing bold format", () => {
      editor?.update(() => {
        const domElement = document.createElement("span");
        domElement.textContent = "Title import";
        domElement.style.fontWeight = "700";
        domElement.style.fontSize = "24px";
        domElement.style.lineHeight = "30px";

        const importMap = StyledSpanNode.importDOM();
        const conversionData = importMap?.span(domElement);
        const node = conversionData?.conversion(document.createElement("span"))
          ?.node as StyledSpanNode;

        expect(node.getFontWeight()).toBe("700");
        expect(node.getFontSize()).toBe("24px");
        expect(node.getLineHeight()).toBe("30px");
        expect(node.hasFormat("bold")).toBe(false);
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

  describe("HTML export/import: typography vs. formatting separation", () => {
    // exportDOM() keeps base typography (font-weight/size/line-height) on
    // the <span>; bold/italic/underline are represented only by the
    // surrounding <strong>/<em>/<u> elements.

    test("bold paragraph omits its weight so the strong wrapper can render bold", () => {
      editor?.update(() => {
        const node = StyledSpanNode.createFromOption(
          "paragraph",
          "Bold paragraph",
        );
        node.toggleFormat("bold");

        const { element } = node.exportDOM();
        const htmlElement = element as HTMLElement;

        expect(htmlElement.tagName).toBe("STRONG");

        // eslint-disable-next-line testing-library/no-node-access
        const span = htmlElement.querySelector("span") as HTMLElement;

        expect(span).toBeTruthy();
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.fontWeight).toBe("");
        expect(span.getAttribute("data-carbon-base-weight")).toBe("400");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.fontSize).toBe("14px");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.lineHeight).toBe("21px");
      });
    });

    test("italic paragraph is wrapped in em alone, with no fontStyle on the span", () => {
      editor?.update(() => {
        const node = StyledSpanNode.createFromOption(
          "paragraph",
          "Italic paragraph",
        );
        node.toggleFormat("italic");

        const { element } = node.exportDOM();
        const htmlElement = element as HTMLElement;

        expect(htmlElement.tagName).toBe("EM");

        // eslint-disable-next-line testing-library/no-node-access
        const span = htmlElement.querySelector("span") as HTMLElement;

        expect(span).toBeTruthy();
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.fontStyle).toBe("");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.fontWeight).toBe("400");
      });
    });

    test("underlined paragraph is wrapped in u alone, with no textDecoration on the span", () => {
      editor?.update(() => {
        const node = StyledSpanNode.createFromOption(
          "paragraph",
          "Underlined paragraph",
        );
        node.toggleFormat("underline");

        const { element } = node.exportDOM();
        const htmlElement = element as HTMLElement;

        expect(htmlElement.tagName).toBe("U");

        // eslint-disable-next-line testing-library/no-node-access
        const span = htmlElement.querySelector("span") as HTMLElement;

        expect(span).toBeTruthy();
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.textDecoration).toBe("");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.fontWeight).toBe("400");
      });
    });

    test("title without additional bold formatting exports as a bare span with font-weight 700", () => {
      editor?.update(() => {
        const node = StyledSpanNode.createFromOption("title", "Title");

        const { element } = node.exportDOM();
        const htmlElement = element as HTMLElement;

        expect(htmlElement.tagName).toBe("SPAN");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(htmlElement.style.fontWeight).toBe("700");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(htmlElement.style.fontSize).toBe("24px");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(htmlElement.style.lineHeight).toBe("30px");
      });
    });

    test("explicitly bold title stores its base weight without overriding strong", () => {
      editor?.update(() => {
        const node = StyledSpanNode.createFromOption(
          "title",
          "Explicitly bold title",
        );
        node.toggleFormat("bold");

        const { element } = node.exportDOM();
        const htmlElement = element as HTMLElement;

        expect(htmlElement.tagName).toBe("STRONG");

        // eslint-disable-next-line testing-library/no-node-access
        const span = htmlElement.querySelector("span") as HTMLElement;
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.fontWeight).toBe("");
        expect(span.getAttribute("data-carbon-base-weight")).toBe("700");
      });
    });

    test.each([
      ["subtitle", "500", "21px", "26.25px"],
      ["sectionHeader", "500", "18px", "22.5px"],
      ["sectionSubheader", "500", "16px", "20px"],
    ] as const)(
      "bold %s stores its non-700 base weight (%s) without overriding strong",
      (typographyKey, weight, size, lineHeight) => {
        editor?.update(() => {
          const node = StyledSpanNode.createFromOption(
            typographyKey,
            "Bold text",
          );
          node.toggleFormat("bold");

          const { element } = node.exportDOM();
          const htmlElement = element as HTMLElement;

          // eslint-disable-next-line testing-library/no-node-access
          const span = htmlElement.querySelector("span") as HTMLElement;

          // eslint-disable-next-line jest-dom/prefer-to-have-style
          expect(span.style.fontWeight).toBe("");
          expect(span.getAttribute("data-carbon-base-weight")).toBe(weight);
          expect(span.style.fontSize).toBe(size);
          expect(span.style.lineHeight).toBe(lineHeight);
        });
      },
    );

    test("italic and underline are not written as inline styles on the span, only via em/u wrappers", () => {
      editor?.update(() => {
        const node = StyledSpanNode.createFromOption("paragraph", "Text");
        node.toggleFormat("italic");
        node.toggleFormat("underline");

        const { element } = node.exportDOM();
        const htmlElement = element as HTMLElement;

        // eslint-disable-next-line testing-library/no-node-access
        const span = htmlElement.querySelector("span") as HTMLElement;

        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.fontStyle).toBe("");
        // eslint-disable-next-line jest-dom/prefer-to-have-style
        expect(span.style.textDecoration).toBe("");
        // The outermost wrapper is <u>, with <em> nested inside it around the span.
        expect(htmlElement.tagName).toBe("U");
        // eslint-disable-next-line testing-library/no-node-access
        expect(htmlElement.querySelector("em")).toBeTruthy();
      });
    });
  });

  describe("HTML export/import round trips", () => {
    const exportHtml = (build: () => void): string => {
      let html = "";
      editor?.update(build);
      editor?.read(() => {
        html = $generateHtmlFromNodes(editor as LexicalEditor, null);
      });
      return html;
    };

    type ImportedSpanSnapshot = {
      fontWeight: string;
      fontSize: string;
      lineHeight: string;
      typographyKey: string;
      isBold: boolean;
      isItalic: boolean;
      isUnderline: boolean;
    };

    const importHtml = (html: string): ImportedSpanSnapshot => {
      let snapshot!: ImportedSpanSnapshot;
      editor?.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, "text/html");
        const nodes = $generateNodesFromDOM(editor as LexicalEditor, dom);
        const paragraph = nodes[0] as ParagraphNode;
        const styledNode = paragraph.getFirstChild() as StyledSpanNode;

        expect($isStyledSpanNode(styledNode)).toBe(true);

        snapshot = {
          fontWeight: styledNode.getFontWeight(),
          fontSize: styledNode.getFontSize(),
          lineHeight: styledNode.getLineHeight(),
          typographyKey: styledNode.getTypographyKey(),
          isBold: styledNode.hasFormat("bold"),
          isItalic: styledNode.hasFormat("italic"),
          isUnderline: styledNode.hasFormat("underline"),
        };
      });
      return snapshot;
    };

    test("bold paragraph survives an export/import round trip", () => {
      const html = exportHtml(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const node = StyledSpanNode.createFromOption(
          "paragraph",
          "Bold paragraph",
        );
        node.toggleFormat("bold");
        paragraph.append(node);
        root.append(paragraph);
      });

      const imported = importHtml(html);

      expect(imported.fontWeight).toBe("400");
      expect(imported.fontSize).toBe("14px");
      expect(imported.lineHeight).toBe("21px");
      expect(imported.typographyKey).toBe("paragraph");
      expect(imported.isBold).toBe(true);
    });

    test("bold + italic + underline combined survive an export/import round trip", () => {
      const html = exportHtml(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const node = StyledSpanNode.createFromOption(
          "paragraph",
          "Combined formatting",
        );
        node.toggleFormat("bold");
        node.toggleFormat("italic");
        node.toggleFormat("underline");
        paragraph.append(node);
        root.append(paragraph);
      });

      const imported = importHtml(html);

      expect(imported.fontWeight).toBe("400");
      expect(imported.isBold).toBe(true);
      expect(imported.isItalic).toBe(true);
      expect(imported.isUnderline).toBe(true);
    });

    test("bold sectionHeader keeps its true 500 base weight and typography key after a round trip", () => {
      const html = exportHtml(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const node = StyledSpanNode.createFromOption(
          "sectionHeader",
          "Bold header",
        );
        node.toggleFormat("bold");
        paragraph.append(node);
        root.append(paragraph);
      });

      const imported = importHtml(html);

      expect(imported.fontWeight).toBe("500");
      expect(imported.fontSize).toBe("18px");
      expect(imported.lineHeight).toBe("22.5px");
      expect(imported.typographyKey).toBe("sectionHeader");
      expect(imported.isBold).toBe(true);
    });

    test("title without extra bold formatting is not treated as user-applied bold after a round trip", () => {
      const html = exportHtml(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const node = StyledSpanNode.createFromOption("title", "Title");
        paragraph.append(node);
        root.append(paragraph);
      });

      const imported = importHtml(html);

      expect(imported.fontWeight).toBe("700");
      expect(imported.typographyKey).toBe("title");
      expect(imported.isBold).toBe(false);
    });

    test("explicitly bold title round trips as both title typography and user-applied bold", () => {
      const html = exportHtml(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const node = StyledSpanNode.createFromOption(
          "title",
          "Explicitly bold title",
        );
        node.toggleFormat("bold");
        paragraph.append(node);
        root.append(paragraph);
      });

      const imported = importHtml(html);

      expect(imported.fontWeight).toBe("700");
      expect(imported.typographyKey).toBe("title");
      expect(imported.isBold).toBe(true);
    });

    test("non-standard typography values (not matching any preset) round trip their raw styles unchanged", () => {
      const html = exportHtml(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const node = $createStyledSpanNode(
          "Custom typography",
          "600",
          "17px",
          "23px",
        );
        paragraph.append(node);
        root.append(paragraph);
      });

      const imported = importHtml(html);

      expect(imported.fontWeight).toBe("600");
      expect(imported.fontSize).toBe("17px");
      expect(imported.lineHeight).toBe("23px");
      expect(imported.typographyKey).toBe("paragraph");
      expect(imported.isBold).toBe(false);
    });

    test("custom 700 typography round trips without becoming bold formatting", () => {
      const html = exportHtml(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const node = $createStyledSpanNode(
          "Custom 700 typography",
          "700",
          "17px",
          "23px",
        );
        paragraph.append(node);
        root.append(paragraph);
      });

      const imported = importHtml(html);

      expect(imported.fontWeight).toBe("700");
      expect(imported.fontSize).toBe("17px");
      expect(imported.lineHeight).toBe("23px");
      expect(imported.isBold).toBe(false);
    });

    test("bold non-standard typography (weight not in any preset) round trips via strong without corrupting size/line-height", () => {
      const html = exportHtml(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const node = $createStyledSpanNode(
          "Bold custom typography",
          "600",
          "17px",
          "23px",
        );
        node.toggleFormat("bold");
        paragraph.append(node);
        root.append(paragraph);
      });

      const imported = importHtml(html);

      expect(imported.fontWeight).toBe("600");
      expect(imported.fontSize).toBe("17px");
      expect(imported.lineHeight).toBe("23px");
      expect(imported.isBold).toBe(true);
    });
  });

  describe("Legacy HTML import fallback (older carbon versions / foreign HTML)", () => {
    // Older carbon exports (and foreign HTML) wrote user-applied bold as a
    // literal font-weight: 700/bold on the span, sometimes with no <strong>
    // wrapper. importDOM()'s typographyMap heuristic exists to handle that
    // legacy markup; current exports never produce spans that need it.

    test("literal font-weight: 700 span with no strong wrapper and no typography match is treated as a formatted paragraph", () => {
      editor?.update(() => {
        const domElement = document.createElement("span");
        domElement.textContent = "Legacy bold paragraph";
        domElement.style.fontWeight = "700";
        domElement.style.fontSize = "14px";
        domElement.style.lineHeight = "21px";

        const importMap = StyledSpanNode.importDOM();
        const conversionData = importMap?.span(domElement);
        const node = conversionData?.conversion(document.createElement("span"))
          ?.node as StyledSpanNode;

        expect(node.getFontWeight()).toBe("400");
        expect(node.hasFormat("bold")).toBe(true);
      });
    });

    test("legacy bold sectionHeader HTML (span font-weight forced to 700, wrapped in strong) recovers the true 500 base weight from size/line-height", () => {
      editor?.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(
          '<p><strong><span style="font-weight: 700; font-size: 18px; line-height: 22.5px;">Legacy bold header</span></strong></p>',
          "text/html",
        );

        const nodes = $generateNodesFromDOM(editor as LexicalEditor, dom);
        const paragraph = nodes[0] as ParagraphNode;
        const styledNode = paragraph.getFirstChild() as StyledSpanNode;

        expect($isStyledSpanNode(styledNode)).toBe(true);
        expect(styledNode.getFontWeight()).toBe("500");
        expect(styledNode.getTypographyKey()).toBe("sectionHeader");
        expect(styledNode.hasFormat("bold")).toBe(true);
      });
    });

    test("literal 700 weight with a size/line-height that matches no preset at all falls back to paragraph weight", () => {
      editor?.update(() => {
        const domElement = document.createElement("span");
        domElement.textContent = "Unrecognised legacy bold";
        domElement.style.fontWeight = "700";
        domElement.style.fontSize = "19px";
        domElement.style.lineHeight = "27px";

        const importMap = StyledSpanNode.importDOM();
        const conversionData = importMap?.span(domElement);
        const node = conversionData?.conversion(document.createElement("span"))
          ?.node as StyledSpanNode;

        expect(node.getFontWeight()).toBe("400");
      });
    });
  });
});

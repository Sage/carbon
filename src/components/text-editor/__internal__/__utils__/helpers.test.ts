import { createHeadlessEditor } from "@lexical/headless";
import {
  createEmpty,
  createFromHTML,
  DeserializeHTML,
  SerializeLexical,
  generateHTMLWithInlineStyles,
  validateUrl,
} from "./helpers";
import { act } from "react";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";

describe("createEmpty", () => {
  it("creates an empty editor", () => {
    const emptyEditor = createEmpty();
    expect(emptyEditor).toBe(
      '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
    );
  });
});

describe("createFromHTML", () => {
  it("creates an editor from HTML", () => {
    const html = `<p><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
    const editorFromHTML = createFromHTML(html);
    expect(editorFromHTML).toEqual(
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is a HTML example.","type":"styled-span","version":1,"fontWeight":"400","fontSize":"14px","lineHeight":"21px"}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Look, it has lists!","type":"styled-span","version":1,"fontWeight":"400","fontSize":"14px","lineHeight":"21px"}],"direction":null,"format":"","indent":0,"type":"listitem","version":1,"value":1}],"direction":null,"format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
    );
  });
});

describe("DeserializeHTML", () => {
  it("deserializes HTML into JSON", () => {
    const html = `<p><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
    const json = DeserializeHTML(html);
    expect(json).toEqual(
      `{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"This is a HTML example.\",\"type\":\"styled-span\",\"version\":1,\"fontWeight\":\"400\",\"fontSize\":\"14px\",\"lineHeight\":\"21px\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Look, it has lists!\",\"type\":\"styled-span\",\"version\":1,\"fontWeight\":\"400\",\"fontSize\":\"14px\",\"lineHeight\":\"21px\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"listitem\",\"version\":1,\"value\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"list\",\"version\":1,\"listType\":\"number\",\"start\":1,\"tag\":\"ol\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}`,
    );
  });
});

describe("SerializeEditor", () => {
  it("serializes editor content to HTML and JSON", async () => {
    const editor = createHeadlessEditor({
      namespace: "test",
      nodes: [],
      onError: () => {},
    });

    await act(async () => {
      editor.update(() => {
        const root = $getRoot();
        root.append(
          $createParagraphNode().append($createTextNode("Hello World!")),
        );
      });
    });

    const { htmlString, json } = SerializeLexical(editor);

    expect(htmlString).toEqual(
      '<p><span style="white-space: pre-wrap;">Hello World!</span></p>',
    );
    expect(json).toEqual({
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Hello World!",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            textFormat: 0,
            textStyle: "",
            type: "paragraph",
            version: 1,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    });
  });
});

describe("validateUrl", () => {
  it("returns true when the URL is valid", () => {
    const validUrl = "https://www.example.com";
    expect(validateUrl(validUrl)).toBe(true);
  });

  it("returns false when the URL is invalid", () => {
    const invalidUrl = "example.url";
    expect(validateUrl(invalidUrl)).toBe(false);
  });
});

describe("generateHTMLWithInlineStyles", () => {
  it("converts the textBold class to a font-weight style", () => {
    const html = '<p class="textBold">Bold text</p>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("font-weight: bold;");
    expect(result).not.toContain('class="textBold"');
  });

  it("converts the textItalic class to a font-style style", () => {
    const html = '<p class="textItalic">Italic text</p>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("font-style: italic;");
    expect(result).not.toContain('class="textItalic"');
  });

  it("converts the textUnderline class to a text-decoration style", () => {
    const html = '<p class="textUnderline">Underline text</p>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("text-decoration: underline;");
    expect(result).not.toContain('class="textUnderline"');
  });

  it("converts multiple format classes on the same element", () => {
    const html =
      '<p class="textBold textItalic textUnderline">Formatted text</p>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("font-weight: bold;");
    expect(result).toContain("font-style: italic;");
    expect(result).toContain("text-decoration: underline;");
  });

  it("applies a font-family to all non-link elements", () => {
    const html = "<p>Text</p><span>More text</span><div>Even more</div>";
    const result = generateHTMLWithInlineStyles(html);

    const fontFamilyMatches = result.match(/font-family:/g);
    expect(fontFamilyMatches).toBeTruthy();
  });

  it("applies link styles to anchor elements", () => {
    const html = '<a href="https://example.com">Link</a>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("color: #007e45ff;");
    expect(result).toContain("cursor: pointer;");
    expect(result).toContain("text-decoration: underline;");
    expect(result).toContain("font-family: 'Sage UI', sans-serif;");
  });

  it("preserves existing inline styles", () => {
    const html = '<p style="color: red;">Text</p>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("color: red;");
    expect(result).toContain("font-family: 'Sage UI', sans-serif;");
  });

  it("merges format classes with existing inline styles", () => {
    const html = '<p class="textBold" style="color: red;">Bold red text</p>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("color: red;");
    expect(result).toContain("font-weight: bold;");
    expect(result).toContain("font-family: 'Sage UI', sans-serif;");
  });

  it("removes the class attribute when it is empty after conversion", () => {
    const html = '<p class="textBold">Text</p>';
    const result = generateHTMLWithInlineStyles(html);
    // Should not have empty class attribute
    expect(result).not.toContain('class=""');
  });

  it("keeps the class attribute when non-format classes remain after conversion", () => {
    const html = '<p class="textBold myClass">Text</p>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain('class="myClass"');
    expect(result).toContain("font-weight: bold;");
  });

  it("handles nested elements with formatting", () => {
    const html =
      '<div><p class="textBold"><span class="textItalic">Nested formatted text</span></p></div>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("font-weight: bold;");
    expect(result).toContain("font-style: italic;");
  });

  it("handles elements with only whitespace", () => {
    const html = '<p class="textBold">   </p>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("font-weight: bold;");
  });

  it("applies font-family to non-anchor elements and link styles only to anchors when both are present", () => {
    const html =
      '<p class="textBold">Text</p><a class="textItalic" href="#">Link</a>';
    const result = generateHTMLWithInlineStyles(html);
    const paragraphSection = result.split("<a")[0];
    expect(paragraphSection).toContain("font-family: 'Sage UI', sans-serif;");
    expect(paragraphSection).not.toContain("color: #007e45ff;");
    expect(result).toContain("color: #007e45ff;");
  });

  it("returns an empty string when given empty HTML", () => {
    const html = "";
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toBe("");
  });

  it("preserves plain text nodes without modification", () => {
    const html = "Plain text";
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("Plain text");
  });

  it("applies font-family to elements with no existing classes or styles", () => {
    const html = "<p>Simple paragraph</p>";
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("font-family: 'Sage UI', sans-serif;");
  });

  it("handles self-closing elements without errors", () => {
    const html = '<div><img src="test.jpg" /><p>Text</p></div>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("font-family: 'Sage UI', sans-serif;");
  });

  it("converts recognised format classes and preserves unrecognised ones on the class attribute", () => {
    const html = '<p class="textBold unknownClass anotherClass">Text</p>';
    const result = generateHTMLWithInlineStyles(html);
    expect(result).toContain("font-weight: bold;");
    expect(result).toContain('class="unknownClass anotherClass"');
  });
});

import { createHeadlessEditor } from "@lexical/headless";
import {
  createEmpty,
  createFromHTML,
  DeserializeHTML,
  SerializeLexical,
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
    const html = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
    const editorFromHTML = createFromHTML(html);
    expect(editorFromHTML).toEqual(
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is a HTML example.","type":"styled-span","version":1,"fontWeight":"400","fontSize":"14px","lineHeight":"21px"}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Look, it has lists!","type":"styled-span","version":1,"fontWeight":"400","fontSize":"14px","lineHeight":"21px"}],"direction":null,"format":"","indent":0,"type":"listitem","version":1,"value":1}],"direction":null,"format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
    );
  });
});

describe("DeserializeHTML", () => {
  it("deserializes HTML into JSON", () => {
    const html = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
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

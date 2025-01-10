import React from "react";
import RichTextEditor from "./rich-text-editor.component";

export const RichTextEditorDefaultComponent = ({ ...props }) => {
  return (
    <RichTextEditor
      labelText="Playwright Example"
      namespace="pw-rte"
      {...props}
    />
  );
};

export const RichTextEditorWithValue = ({ ...props }) => {
  const initialValue = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Sample text with ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: "some formatting",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: " ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 2,
              mode: "normal",
              style: "",
              text: "applied",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: ".",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
          textFormat: 0,
          textStyle: "",
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };
  const value = JSON.stringify(initialValue);
  return (
    <RichTextEditor
      labelText="Playwright Example"
      namespace="pw-rte"
      value={value}
      {...props}
    />
  );
};

export const RichTextEditorWithUnformattedValue = ({ ...props }) => {
  const initialValue = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "This text needs formatting",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
          textFormat: 0,
          textStyle: "",
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };
  const value = JSON.stringify(initialValue);
  return (
    <RichTextEditor
      labelText="Playwright Example"
      namespace="pw-rte"
      value={value}
      {...props}
    />
  );
};

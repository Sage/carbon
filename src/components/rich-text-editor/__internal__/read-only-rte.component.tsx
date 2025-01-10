/* eslint-disable no-console */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import React, { useMemo } from "react";

import {
  CreateFromHTML,
  RichTextEditorProps,
} from "../rich-text-editor.component";
import { markdownNodes, theme } from "../constants";

const wrapLinksInAnchors = (value: string) => {
  const urlRegex = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/g;
  return value.replace(urlRegex, "<a href='$1'>$1</a>");
};

const determineFormat = (value: string | undefined) => {
  let isJson;

  if (!value) {
    return CreateFromHTML("<p><br></p>");
  }

  try {
    const isValidJSON = JSON.parse(value);
    /* istanbul ignore else */
    if (isValidJSON) isJson = true;
  } catch (e) {
    isJson = false;
  }

  if (!isJson) {
    const isHTML = /<[a-z][\s\S]*>/i.test(value);
    if (isHTML) {
      return CreateFromHTML(value);
    }
    const wrappedPlainText = `<p dir="ltr"><span data-lexical-text="true">${wrapLinksInAnchors(value)}</span></p>`;
    return CreateFromHTML(wrappedPlainText);
  }
  return JSON.parse(value);
};

const ReadOnlyEditor = ({
  namespace = "carbon-rte-readonly",

  value,
}: Partial<RichTextEditorProps>) => {
  const initialConfig = useMemo(() => {
    return {
      namespace,
      nodes: markdownNodes,
      onError: console.error,
      theme,
      editorState: determineFormat(value),
      editable: false,
    };
  }, [namespace, value]);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            data-role="carbon-rte-readonly-content-editor"
            /** The following are automatically added by Lexical but violate WCAG 4.1.2 Name, Role, Value and so have been overriden */
            aria-autocomplete={undefined}
            aria-readonly={undefined}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
};

export default ReadOnlyEditor;

import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import React, { useMemo } from "react";

import { TextEditorProps } from "../text-editor.component";
import { createFromHTML } from "../utils";
import { markdownNodes, theme } from "./constants";
import Logger from "../../../__internal__/utils/logger";

const wrapLinksInAnchors = (value: string) => {
  const urlRegex = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/g;
  return value.replace(urlRegex, "<a href='$1'>$1</a>");
};

const determineFormat = (value: string | undefined) => {
  let isJson;

  if (!value) {
    return createFromHTML("<p><br></p>");
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
      return createFromHTML(value);
    }
    const wrappedPlainText = `<p dir="ltr"><span data-lexical-text="true">${wrapLinksInAnchors(value)}</span></p>`;
    return createFromHTML(wrappedPlainText);
  }
  return value;
};

const ReadOnlyEditor = ({
  namespace = "carbon-rte-readonly",
  value,
}: Partial<TextEditorProps>) => {
  const initialConfig = useMemo<InitialConfigType>(() => {
    return {
      namespace,
      nodes: markdownNodes,
      onError: /* istanbul ignore next */ (e) => Logger.error(e.message),
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
            data-role={`${namespace}-content-editor`}
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

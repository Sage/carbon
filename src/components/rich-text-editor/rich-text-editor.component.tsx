import React, { useState } from "react";

// Main Lexical component
import { LexicalComposer } from "@lexical/react/LexicalComposer";
// Rich Text Editor plugin for Lexical
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// Error handler for Lexical
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// History component for Lexical
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import ContentEditor from "./__internal__/content-editor";
import Placeholder from "./__internal__/placeholder";
import OnChangePlugin from "./__internal__/plugins/on-change-plugin";

import StyledRichTextEditor from "./rich-text-editor.style";

import Logger from "../../__internal__/utils/logger";

function onError(error: any) {
  Logger.error(error);
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RichTextEditorProps {}

const theme = {};

export const RichTextEditor = React.forwardRef(
  ({ ...rest }: RichTextEditorProps, ref) => {
    const initialConfig = {
      namespace: "Carbon Rich Text Editor",
      theme,
      onError,
    };

    return (
      <StyledRichTextEditor>
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={<ContentEditor />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin
            onChange={(editorState) => console.log(editorState)}
          />
        </LexicalComposer>
      </StyledRichTextEditor>
    );
  },
);

export default RichTextEditor;

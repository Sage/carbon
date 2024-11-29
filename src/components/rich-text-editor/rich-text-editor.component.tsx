import React, { useState } from "react";

// Main Lexical component
import { LexicalComposer } from "@lexical/react/LexicalComposer";
// Rich Text Editor plugin for Lexical
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// Error handler for Lexical
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// History component for Lexical
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

import ContentEditor from "./__internal__/content-editor";
import Placeholder from "./__internal__/placeholder";
import { OnChangePlugin, ToolbarPlugin } from "./__internal__/plugins";

import StyledRichTextEditor from "./rich-text-editor.style";

import Logger from "../../__internal__/utils/logger";

function onError(error: any) {
  Logger.error(error);
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RichTextEditorProps {}

const theme = {
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
};

export const RichTextEditor = React.forwardRef(
  ({ ...rest }: RichTextEditorProps, ref) => {
    const initialConfig = {
      namespace: "Carbon Rich Text Editor",
      theme,
      onError,
      nodes: [
        CodeNode,
        LinkNode,
        ListNode,
        ListItemNode,
        HeadingNode,
        QuoteNode,
        HorizontalRuleNode,
      ],
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
          <OnChangePlugin onChange={() => {}} />
          <MarkdownShortcutPlugin />
          <ToolbarPlugin />
        </LexicalComposer>
      </StyledRichTextEditor>
    );
  },
);

export default RichTextEditor;

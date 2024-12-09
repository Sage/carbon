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
import { EditorState, $getRoot } from "lexical";

import Label from "../../__internal__/label";

import ContentEditor from "./__internal__/content-editor";
import Placeholder from "./__internal__/placeholder";
import {
  CharacterCountPlugin,
  OnChangePlugin,
  ToolbarPlugin,
} from "./__internal__/plugins";

import {
  StyledRichTextEditor,
  StyledRichTextEditorWrapper,
  StyledRichTextEditorError,
} from "./rich-text-editor.style";

import Logger from "../../__internal__/utils/logger";

function onError(error: any) {
  Logger.error(error);
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RichTextEditorProps {
  /** The maximum number of characters for this rich text editor. */
  characterLimit?: number;
  /** whether the value of this component is required */
  isRequired?: boolean;
  /** The label to attach to this rich text editor */
  label: string;
  /** Callback function to be called when the editor state changes */
  onChange?: (value: string | undefined) => void;
  /** Callback function to be called when the editor is saved via command button */
  onSave?: (value: string | undefined) => void;
  /** Callback function to be called when the editor is saved via command button */
  onCancel?: () => void;
  /** whether the value of this component is optional */
  optional?: boolean;
  /** Whether to show the command buttons in the toolbar */
  showCommandButtons?: boolean;
  /** Whether the editor is in an erroneous state */
  error?: boolean | string | undefined;
}

const theme = {
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
};

export const RichTextEditor = React.forwardRef(
  (
    {
      characterLimit = 0,
      isRequired = false,
      label,
      optional = false,
      showCommandButtons = false,
      onChange = undefined,
      onSave = undefined,
      onCancel = undefined,
      error = undefined,
    }: RichTextEditorProps,
    ref,
  ) => {
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

    const [editorState, setEditorState] = useState<EditorState | undefined>(
      undefined,
    );

    return (
      <div>
        <Label isRequired={isRequired} optional={optional}>
          {label}
        </Label>
        <StyledRichTextEditorWrapper
          error={error}
          id="carbon-lexical-rich-text-editor-wrapper"
        >
          {error && error !== true && (
            <StyledRichTextEditorError>{error}</StyledRichTextEditorError>
          )}
          <StyledRichTextEditor id="carbon-lexical-rich-text-editor">
            <LexicalComposer initialConfig={initialConfig}>
              <div id="error-wrapper">
                <RichTextPlugin
                  contentEditable={<ContentEditor />}
                  placeholder={<Placeholder />}
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <OnChangePlugin
                  onChange={(newState) => {
                    setEditorState(newState);
                    if (onChange) {
                      const currentTextContent = newState.read(() =>
                        $getRoot().getTextContent(),
                      );
                      onChange?.(currentTextContent);
                    }
                  }}
                />
                <MarkdownShortcutPlugin />
                <ToolbarPlugin
                  showCommandButtons={showCommandButtons}
                  onSave={(value: string | undefined) => onSave?.(value)}
                  onCancel={onCancel}
                />
              </div>
              {characterLimit > 0 && (
                <CharacterCountPlugin
                  editorState={editorState}
                  maxChars={characterLimit}
                />
              )}
            </LexicalComposer>
          </StyledRichTextEditor>
        </StyledRichTextEditorWrapper>
      </div>
    );
  },
);

export default RichTextEditor;

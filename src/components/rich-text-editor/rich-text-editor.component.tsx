/* eslint-disable no-console */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { EditorState, $getRoot } from "lexical";
import React, { useMemo, useState } from "react";

import { componentPrefix, markdownNodes, theme } from "./constants";
import {
  CharacterCounterPlugin,
  ContentEditor,
  OnChangePlugin,
  Placeholder,
  ToolbarPlugin,
} from "./plugins";
import StyledRichTextEditor from "./rich-text-editor.style";

import Label from "../../__internal__/label";

export interface RichTextEditorProps {
  /** The maximum number of characters allowed in the editor */
  characterLimit?: number;
  /** The message to be shown when the editor is in an error state */
  error?: string;
  /** Whether the content of the editor can be empty */
  isOptional?: boolean;
  /** The label to display above the editor */
  labelText: string;
  /** The identifier for the Rich Text Editor. This allows for the using of multiple Rich Text Editors on a screen */
  namespace?: string;
  /** The callback to fire when the Cancel button within the editor is pressed */
  onCancel?: () => void;
  /** The callback to fire when a change is registered within the editor */
  onChange?: (value: string) => void;
  /** The callback to fire when the Save button within the editor is pressed */
  onSave?: (value: string) => void;
  /** The placeholder to display when the editor is empty */
  placeholder?: string;
  /** Whether the content of the editor is required to have a value */
  required?: boolean;
  /** The message to be shown when the editor is in an warning state */
  warning?: string;
}

export const RichTextEditor = ({
  characterLimit = 3000,
  error,
  isOptional = false,
  labelText,
  namespace = componentPrefix,
  onCancel,
  onChange,
  onSave,
  placeholder,
  required = false,
  warning,
}: RichTextEditorProps) => {
  const initialConfig = useMemo(() => {
    return {
      namespace,
      nodes: markdownNodes,
      onError: console.error,
      theme,
    };
  }, [namespace]);
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  );

  return (
    <>
      <Label
        isRequired={required}
        optional={isOptional}
        error={error}
        warning={warning}
      >
        {labelText}
      </Label>
      <LexicalComposer initialConfig={initialConfig}>
        <StyledRichTextEditor>
          <RichTextPlugin
            contentEditable={<ContentEditor />}
            placeholder={<Placeholder text={placeholder} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MarkdownShortcutPlugin />
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
        </StyledRichTextEditor>
        <ToolbarPlugin onCancel={onCancel} onSave={onSave} />

        {characterLimit > 0 && (
          <CharacterCounterPlugin
            editorState={editorState}
            maxChars={characterLimit}
          />
        )}
      </LexicalComposer>
    </>
  );
};

export default RichTextEditor;

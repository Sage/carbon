/* eslint-disable no-console */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";

import { EditorState, $getRoot, LexicalEditor } from "lexical";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { MarginProps } from "styled-system";

import Label from "../../__internal__/label";
import useLocale from "../../hooks/__internal__/useLocale";

import { componentPrefix, markdownNodes, theme } from "./constants";
import { DeserializeHTML, validateUrl } from "./helpers";
import {
  AutoLinkerPlugin,
  CharacterCounterPlugin,
  ContentEditor,
  LinkMonitorPlugin,
  OnChangePlugin,
  Placeholder,
  ToolbarPlugin,
} from "./plugins";
import RichTextEditorContext from "./rich-text-editor.context";
import StyledRichTextEditor, {
  StyledEditorToolbarWrapper,
  StyledHintText,
  StyledValidationMessage,
  StyledWrapper,
} from "./rich-text-editor.style";
import { SaveCallbackProps } from "./plugins/Toolbar/buttons/save.component";

export interface RichTextEditorProps extends MarginProps {
  /** The maximum number of characters allowed in the editor */
  characterLimit?: number;
  /** The message to be shown when the editor is in an error state */
  error?: string;
  /** A hint string rendered before the editor but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
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
  /** The callback to fire when a link is added into the editor */
  onLinkAdded?: (link: string, state: string) => void;
  /** The callback to fire when the Save button within the editor is pressed */
  onSave?: (value: SaveCallbackProps) => void;
  /** The placeholder to display when the editor is empty */
  placeholder?: string;
  /** An array of link preview nodes to render in the editor */
  previews?: React.JSX.Element[];
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Whether the content of the editor is required to have a value */
  required?: boolean;
  /** Whether to reset the editor to the default state when pressing the Cancel button */
  resetOnCancel?: boolean;
  /** Number greater than 2 multiplied to override the default min-height of the editor */
  rows?: number;
  /** The message to be shown when the editor is in an warning state */
  warning?: string;
  /** The initial value of the editor, as a HTML string, or JSON */
  value?: string | undefined;
}

export const CreateFromHTML = (html: string) => {
  // DeserializeHTML is tested as part of the helper tests
  /* istanbul ignore next */
  return DeserializeHTML(html);
};

export const RichTextEditor = ({
  characterLimit = 3000,
  error,
  inputHint,
  isOptional = false,
  labelText,
  namespace = componentPrefix,
  onCancel,
  onChange,
  onLinkAdded,
  onSave,
  placeholder,
  previews = [],
  readOnly = false,
  required = false,
  resetOnCancel = false,
  rows,
  warning,
  value,
}: RichTextEditorProps) => {
  const editorRef = useRef<LexicalEditor | undefined>(undefined);
  const locale = useLocale();
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  );
  const [characterLimitWarning, setCharacterLimitWarning] = useState<
    string | undefined
  >(undefined);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const initialConfig = useMemo(() => {
    return {
      namespace,
      nodes: markdownNodes,
      onError: console.error,
      theme,
      editorState: value,
      editable: !readOnly,
    };
  }, [namespace, readOnly, value]);

  // OnChangePlugin is tested separately
  /* istanbul ignore next */
  const handleChange = useCallback(
    (newState) => {
      setEditorState(newState);
      const currentTextContent = newState.read(() =>
        $getRoot().getTextContent(),
      );

      if (onChange) {
        onChange?.(currentTextContent);
      }

      if (characterLimit > 0) {
        const currentDiff = characterLimit - currentTextContent.length;
        setCharacterLimitWarning(
          currentDiff < 0
            ? locale.richTextEditor.characterLimit(Math.abs(currentDiff))
            : undefined,
        );
      }
    },
    [characterLimit, locale, onChange],
  );

  const handleCancel = useCallback(() => {
    const editor = editorRef.current;
    /* istanbul ignore next */
    const isEditable = editor?.isEditable() || false;
    /* istanbul ignore if */
    if (!isEditable) return;

    /* istanbul ignore else */
    if (onCancel) {
      onCancel();
    }

    /* istanbul ignore else */
    if (resetOnCancel && value) {
      /* istanbul ignore else */
      if (editor) {
        const newEditorState = editor.parseEditorState(value);
        editor.setEditorState(newEditorState);
      }
    }
  }, [onCancel, resetOnCancel, value]);

  const toolbarProps = useMemo(
    () => ({
      namespace,
      onCancel: onCancel ? handleCancel : undefined,
      onSave,
    }),
    [handleCancel, namespace, onCancel, onSave],
  );

  return (
    <RichTextEditorContext.Provider value={{ onLinkAdded, readOnly }}>
      <Label
        isRequired={required}
        optional={isOptional}
        labelId={`${namespace}-label`}
      >
        {labelText}
      </Label>

      {inputHint && (
        <StyledHintText data-role={`${namespace}-input-hint`}>
          {inputHint}
        </StyledHintText>
      )}
      <LexicalComposer initialConfig={initialConfig}>
        <EditorRefPlugin editorRef={editorRef} />
        <StyledWrapper
          data-role={`${namespace}-wrapper`}
          error={error || undefined}
          namespace={namespace}
          warning={characterLimitWarning || warning || undefined}
        >
          {(error || characterLimitWarning || warning) && (
            <StyledValidationMessage
              error={error}
              data-role={`${namespace}-validation-message`}
            >
              {error || characterLimitWarning || warning}
            </StyledValidationMessage>
          )}
          <StyledEditorToolbarWrapper
            data-role={`${namespace}-editor-toolbar-wrapper`}
            id={`${namespace}-editor-toolbar-wrapper`}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            focused={isFocused}
          >
            <StyledRichTextEditor data-role={`${namespace}-editor`}>
              <RichTextPlugin
                contentEditable={
                  <ContentEditor
                    error={error}
                    namespace={namespace}
                    previews={previews}
                    rows={rows}
                    warning={warning}
                  />
                }
                placeholder={
                  <Placeholder namespace={namespace} text={placeholder} />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <MarkdownShortcutPlugin />
              <OnChangePlugin onChange={handleChange} />
              <LinkPlugin validateUrl={validateUrl} />
              <ClickableLinkPlugin newTab />
              <AutoLinkerPlugin />
            </StyledRichTextEditor>
            {!readOnly && <ToolbarPlugin {...toolbarProps} />}
            <LinkMonitorPlugin />
          </StyledEditorToolbarWrapper>

          {characterLimit > 0 && !readOnly && (
            <CharacterCounterPlugin
              editorState={editorState}
              maxChars={characterLimit}
              namespace={namespace}
            />
          )}
        </StyledWrapper>
      </LexicalComposer>
    </RichTextEditorContext.Provider>
  );
};

export default RichTextEditor;

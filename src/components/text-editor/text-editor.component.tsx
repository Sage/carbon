/* eslint-disable no-console */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import { $getRoot, LexicalEditor } from "lexical";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MarginProps } from "styled-system";
import { SerializeLexical, validateUrl } from "./__internal__/helpers";

import Label from "../../__internal__/label";
import useDebounce from "../../hooks/__internal__/useDebounce";
import useLocale from "../../hooks/__internal__/useLocale";
import Logger from "../../__internal__/utils/logger";

import {
  COMPONENT_PREFIX,
  markdownNodes,
  theme,
} from "./__internal__/constants";
import {
  AutoLinkerPlugin,
  CharacterCounterPlugin,
  ContentEditor,
  LinkMonitorPlugin,
  OnChangePlugin,
  Placeholder,
  ToolbarPlugin,
} from "./__internal__/plugins";
import TextEditorContext from "./text-editor.context";
import StyledTextEditor, {
  StyledEditorToolbarWrapper,
  StyledHeaderWrapper,
  StyledFooterWrapper,
  StyledTextEditorWrapper,
  StyledValidationMessage,
  StyledWrapper,
} from "./text-editor.style";
import { EditorFormattedValues as SaveCallbackProps } from "./__internal__/plugins/Toolbar/buttons/save.component";
import { createEmpty } from "./utils";
import HintText from "../../__internal__/hint-text";
import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

export type EditorFormattedValues = SaveCallbackProps;

export interface TextEditorProps extends MarginProps, TagProps {
  /** The maximum number of characters allowed in the editor */
  characterLimit?: number;
  /** The message to be shown when the editor is in an error state */
  error?: string;
  /** Custom footer content to be displayed below the editor */
  footer?: React.ReactNode;
  /** Custom header content to be displayed above the editor */
  header?: React.ReactNode;
  /** A hint string rendered before the editor but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /**
   * [Legacy] Whether the content of the editor can be empty
   * @deprecated If the value of this component is not required, use the `required` prop and set it to false instead.
   */
  isOptional?: boolean;
  /** The label to display above the editor */
  labelText: string;
  /** The identifier for the Text Editor. This allows for the using of multiple Text Editors on a screen */
  namespace?: string;
  /** The callback to fire when the Cancel button within the editor is pressed */
  onCancel?: () => void;
  /** The callback to fire when a change is registered within the editor */
  onChange?: (value: string, formattedValues: EditorFormattedValues) => void;
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
  /** Number greater than 2 multiplied to override the default min-height of the editor */
  rows?: number;
  /** The message to be shown when the editor is in an warning state */
  warning?: string;
  /** The initial value of the editor, as a HTML string, or JSON */
  value?: string | undefined;
}

let deprecateOptionalWarnTriggered = false;

export const TextEditor = ({
  characterLimit = 3000,
  error,
  footer,
  header,
  inputHint,
  isOptional = false,
  labelText,
  namespace = COMPONENT_PREFIX,
  onCancel,
  onChange,
  onLinkAdded,
  onSave,
  placeholder,
  previews = [],
  readOnly = false,
  required = false,
  rows,
  warning,
  value,
  ...rest
}: TextEditorProps) => {
  if (!deprecateOptionalWarnTriggered && isOptional) {
    deprecateOptionalWarnTriggered = true;
    Logger.deprecate(
      "`isOptional` is deprecated in TextEditor and support will soon be removed. If the value of this component is not required, use the `required` prop and set it to false instead.",
    );
  }
  const editorRef = useRef<LexicalEditor | undefined>(undefined);
  const locale = useLocale();
  const [characterLimitWarning, setCharacterLimitWarning] = useState<
    string | undefined
  >(undefined);
  const hasWarningOrError = Boolean(error || characterLimitWarning || warning);
  const contentEditorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const editorElement = contentEditorRef?.current;

    const handleFocus = () => {
      setIsFocused(true);
    };
    const handleBlur = () => {
      setIsFocused(false);
    };

    editorElement?.addEventListener("focus", handleFocus);
    editorElement?.addEventListener("blur", handleBlur);

    const cleanup = () => {
      editorElement?.removeEventListener("focus", handleFocus);
      editorElement?.removeEventListener("blur", handleBlur);
    };

    return cleanup;
  }, [contentEditorRef]);

  const [cancelTrigger, setCancelTrigger] = useState<boolean>(false);

  const debounceWaitTime = 500;

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
  const handleChange = useDebounce((newState) => {
    const currentTextContent = newState.read(() => $getRoot().getTextContent());

    if (onChange) {
      const formattedValues = editorRef.current
        ? SerializeLexical(editorRef.current)
        : {};
      onChange?.(currentTextContent, formattedValues);
    }

    // If the character limit is set, check if the limit has been exceeded
    if (characterLimit > 0) {
      const currentDiff = characterLimit - currentTextContent.length;
      // If the character limit has been exceeded, show the character limit warning
      setCharacterLimitWarning(
        currentDiff < 0
          ? locale.textEditor.characterLimit(Math.abs(currentDiff))
          : undefined,
      );
    }
  }, debounceWaitTime);

  const handleCancel = useCallback(() => {
    const editor = editorRef.current;
    /* istanbul ignore next */
    const isEditable = editor?.isEditable() || false;
    /* istanbul ignore if */
    if (!isEditable) return;

    /* istanbul ignore else */
    if (onCancel) {
      setCancelTrigger((prev) => !prev);
      onCancel();
    }
  }, [onCancel]);

  // Reset the value of the editor when the cancel trigger is updated (implements reset on cancel)
  useEffect(() => {
    const editor = editorRef.current;
    const safeValue = value || createEmpty();

    /* istanbul ignore else */
    if (editor) {
      const newEditorState = editor.parseEditorState(safeValue);
      editor.setEditorState(newEditorState);
    }
  }, [cancelTrigger, value]);

  const toolbarProps = useMemo(
    () => ({
      namespace,
      onCancel: onCancel ? handleCancel : undefined,
      onSave,
    }),
    [handleCancel, namespace, onCancel, onSave],
  );

  return (
    <StyledTextEditorWrapper
      data-role={`${namespace}-editor-wrapper`}
      {...filterStyledSystemMarginProps(rest)}
      {...tagComponent("text-editor", rest)}
    >
      <TextEditorContext.Provider value={{ onLinkAdded }}>
        <Label
          isRequired={required}
          optional={isOptional}
          labelId={`${namespace}-label`}
        >
          {labelText}
        </Label>

        {inputHint && (
          <HintText
            id={`${namespace}-input-hint`}
            marginBottom="var(--spacing100)"
          >
            {inputHint}
          </HintText>
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
              focused={isFocused}
              hasWarningOrError={hasWarningOrError}
            >
              {header && (
                <StyledHeaderWrapper data-role={`${namespace}-header-wrapper`}>
                  {header}
                </StyledHeaderWrapper>
              )}
              {!readOnly && (
                <ToolbarPlugin hasHeader={Boolean(header)} {...toolbarProps} />
              )}
              <StyledTextEditor data-role={`${namespace}-editor`}>
                <RichTextPlugin
                  contentEditable={
                    <ContentEditor
                      ref={contentEditorRef}
                      inputHint={inputHint}
                      namespace={namespace}
                      previews={previews}
                      rows={rows}
                      readOnly={readOnly}
                    />
                  }
                  placeholder={
                    <Placeholder namespace={namespace} text={placeholder} />
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <ListPlugin />
                <HistoryPlugin />
                <MarkdownShortcutPlugin />
                <OnChangePlugin onChange={handleChange} />
                <LinkPlugin validateUrl={validateUrl} />
                <ClickableLinkPlugin newTab />
                <AutoLinkerPlugin />
              </StyledTextEditor>
              {footer && (
                <StyledFooterWrapper data-role={`${namespace}-footer-wrapper`}>
                  {footer}
                </StyledFooterWrapper>
              )}
              <LinkMonitorPlugin />
            </StyledEditorToolbarWrapper>

            {characterLimit > 0 && !readOnly && (
              <CharacterCounterPlugin
                maxChars={characterLimit}
                namespace={namespace}
              />
            )}
          </StyledWrapper>
        </LexicalComposer>
      </TextEditorContext.Provider>
    </StyledTextEditorWrapper>
  );
};

export default TextEditor;

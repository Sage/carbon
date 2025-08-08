import {
  type InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { $getRoot, EditorState, LexicalEditor } from "lexical";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react";
import { MarginProps } from "styled-system";
import { SerializeLexical, validateUrl } from "./__internal__/helpers";

import Label from "../../__internal__/label";
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
  Placeholder,
  ToolbarPlugin,
} from "./__internal__/plugins";
import TextEditorContext from "./text-editor.context";
import StyledTextEditor, {
  StyledEditorToolbarWrapper,
  StyledHeaderWrapper,
  StyledFooterWrapper,
  StyledTextEditorWrapper,
  StyledWrapper,
} from "./text-editor.style";
import { EditorFormattedValues as SaveCallbackProps } from "./__internal__/plugins/Toolbar/buttons/save.component";
import { createEmpty } from "./utils";
import HintText from "../../__internal__/hint-text";
import ValidationMessage from "../../__internal__/validation-message";
import ErrorBorder from "../textbox/textbox.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

export interface TextEditorHandle {
  /** Programmatically focus on the text editor. */
  focus: () => void;
}

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
  /** Callback that is triggered when the editor loses focus. */
  onBlur?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** Callback that is triggered when the editor's cancel button is activated. The cancel button is rendered when this function is provided.  */
  onCancel?: () => void;
  /** Callback that is triggered when the editor's text content is modified or styled. */
  onChange?: (value: string, formattedValues: EditorFormattedValues) => void;
  /** Callback that is triggered when the editor gains focus. */
  onFocus?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** Callback that is triggered when a link is added in the editor's content. */
  onLinkAdded?: (link: string, state: string) => void;
  /** Callback that is triggered when the editor's save button is activated. The save button is rendered when this function is provided. */
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
  /**
   * Alias of `initialValue` prop.
   * @deprecated Please use `initialValue` instead.
   */
  value?: string | undefined;
  /** The initial value of the editor, as a HTML string, or JSON */
  initialValue?: string | undefined;
  /**
   * Allows the injection of one or more Lexical-compatible React components into the editor to extend its functionality.
   * This prop is optional and supports a single plugin, multiple plugins (via fragments or arrays), or `null`.
   */
  customPlugins?: React.ReactNode;
  /** Render the ValidationMessage above the TextEditor */
  validationMessagePositionTop?: boolean;
}

let deprecateValueTriggered = false;
let deprecateOptionalWarnTriggered = false;

export const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(
  (
    {
      characterLimit = 3000,
      error,
      footer,
      header,
      inputHint,
      isOptional = false,
      labelText,
      namespace = COMPONENT_PREFIX,
      onBlur,
      onCancel,
      onChange,
      onFocus,
      onLinkAdded,
      onSave,
      placeholder,
      previews = [],
      readOnly = false,
      required = false,
      rows,
      warning,
      customPlugins,
      validationMessagePositionTop = true,
      ...rest
    },
    ref,
  ) => {
    if (!deprecateOptionalWarnTriggered && isOptional) {
      deprecateOptionalWarnTriggered = true;
      Logger.deprecate(
        "`isOptional` is deprecated in TextEditor and support will soon be removed. If the value of this component is not required, use the `required` prop and set it to false instead.",
      );
    }
    if (!deprecateValueTriggered && rest.value) {
      deprecateValueTriggered = true;
      Logger.deprecate(
        "`value` is deprecated in TextEditor and support will soon be removed. Please use `initialValue` instead.",
      );
    }

    const initialValue = useRef(
      rest.initialValue ?? rest.value ?? createEmpty(),
    );
    const locale = useLocale();
    const [characterLimitWarning, setCharacterLimitWarning] = useState<
      string | undefined
    >(undefined);
    const contentEditorRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    useImperativeHandle<TextEditorHandle, TextEditorHandle>(
      ref,
      () => ({
        focus() {
          contentEditorRef.current?.focus();
        },
      }),
      [],
    );

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

    const initialConfig = useMemo<InitialConfigType>(() => {
      return {
        namespace,
        nodes: markdownNodes,
        onError: /* istanbul ignore next */ (e) => Logger.error(e.message),
        theme,
        editorState: initialValue.current,
        editable: !readOnly,
      };
    }, [namespace, readOnly]);

    const handleChange = useCallback(
      (editorState: EditorState, editor: LexicalEditor) => {
        const currentTextContent = editorState.read(() => {
          return $getRoot()
            .getChildren()
            .map((node) => node.getTextContent())
            .join("\n\n");
        });

        if (onChange) {
          const formattedValues = SerializeLexical(editor);
          onChange?.(currentTextContent, formattedValues);
        }

        // If the character limit is set, check if the limit has been exceeded
        /* istanbul ignore else */
        if (characterLimit > 0) {
          const currentDiff = characterLimit - currentTextContent.length;
          // If the character limit has been exceeded, show the character limit warning
          setCharacterLimitWarning(
            currentDiff < 0
              ? locale.textEditor.characterLimit(Math.abs(currentDiff))
              : undefined,
          );
        }
      },
      [characterLimit, locale.textEditor, onChange],
    );

    const handleCancel = useCallback(
      (editor: LexicalEditor) => {
        const isEditable = editor.isEditable();
        /* istanbul ignore if */
        if (!isEditable) {
          return;
        }

        /* istanbul ignore if */
        if (!onCancel) {
          return;
        }

        const newEditorState = editor.parseEditorState(initialValue.current);
        editor.setEditorState(newEditorState);
        onCancel();
      },
      [onCancel],
    );

    const toolbarProps = useMemo(
      () => ({
        namespace,
        onCancel: onCancel ? handleCancel : undefined,
        onSave,
      }),
      [handleCancel, namespace, onCancel, onSave],
    );

    const warningMessage = warning || characterLimitWarning;

    return (
      <StyledTextEditorWrapper
        data-role={`${namespace}-editor-wrapper`}
        onBlur={(ev) => {
          if (!ev.currentTarget.contains(ev.relatedTarget)) {
            onBlur?.(ev);
          }
        }}
        onFocus={(ev) => {
          if (!ev.currentTarget.contains(ev.relatedTarget)) {
            onFocus?.(ev);
          }
        }}
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
            <StyledWrapper data-role={`${namespace}-wrapper`}>
              {validationMessagePositionTop && (
                <>
                  <ValidationMessage
                    error={error}
                    warning={warningMessage}
                    validationId={`${namespace}-validation-message`}
                    data-role={`${namespace}-validation-message`}
                    validationMessagePositionTop={validationMessagePositionTop}
                  />
                  {(error || warningMessage) && (
                    <ErrorBorder warning={!!(!error && warningMessage)} />
                  )}
                </>
              )}
              <StyledEditorToolbarWrapper
                data-role={`${namespace}-editor-toolbar-wrapper`}
                id={`${namespace}-editor-toolbar-wrapper`}
                focused={isFocused}
                error={!!error}
              >
                {header && (
                  <StyledHeaderWrapper
                    data-role={`${namespace}-header-wrapper`}
                  >
                    {header}
                  </StyledHeaderWrapper>
                )}
                {!readOnly && (
                  <ToolbarPlugin
                    hasHeader={Boolean(header)}
                    {...toolbarProps}
                  />
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
                        required={required}
                        error={!!error}
                        warning={!!warning || !!characterLimitWarning}
                        validationMessagePositionTop={
                          validationMessagePositionTop
                        }
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
                  <OnChangePlugin
                    onChange={handleChange}
                    ignoreHistoryMergeTagChange
                    ignoreSelectionChange
                  />
                  <LinkPlugin validateUrl={validateUrl} />
                  <ClickableLinkPlugin newTab />
                  <AutoLinkerPlugin />
                  {customPlugins}
                </StyledTextEditor>
                {footer && (
                  <StyledFooterWrapper
                    data-role={`${namespace}-footer-wrapper`}
                  >
                    {footer}
                  </StyledFooterWrapper>
                )}
                <LinkMonitorPlugin />
              </StyledEditorToolbarWrapper>
              {!validationMessagePositionTop && (
                <>
                  <ValidationMessage
                    error={error}
                    warning={warningMessage}
                    validationId={`${namespace}-validation-message`}
                    data-role={`${namespace}-validation-message`}
                    validationMessagePositionTop={validationMessagePositionTop}
                  />
                  {(error || warningMessage) && (
                    <ErrorBorder warning={!!(!error && warningMessage)} />
                  )}
                </>
              )}

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
  },
);

export default TextEditor;

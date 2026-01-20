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
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useEffect,
} from "react";

import Label from "../../__internal__/label";
import useLocale from "../../hooks/__internal__/useLocale";
import Logger from "../../__internal__/utils/logger";

import {
  COMPONENT_PREFIX,
  MARKDOWN_NODES,
} from "./__internal__/__utils__/constants";
import {
  AutoLinkerPlugin,
  LinkMonitorPlugin,
} from "./__internal__/__plugins__";
import TextEditorContext from "./text-editor.context";
import StyledTextEditor, {
  StyledEditorToolbarWrapper,
  StyledHeaderWrapper,
  StyledFooterWrapper,
  StyledTextEditorWrapper,
  StyledWrapper,
} from "./text-editor.style";
import {
  createEmpty,
  SerializeLexical,
  validateUrl,
} from "./__internal__/__utils__/helpers";
import HintText from "../../__internal__/hint-text";
import ValidationMessage from "../../__internal__/validation-message";
import ErrorBorder from "../textbox/textbox.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent from "../../__internal__/utils/helpers/tags";
import ReadOnlyEditor from "./__internal__/__ui__/ReadOnlyEditor/read-only-rte.component";
import {
  TextEditorHandle,
  TextEditorProps,
} from "./__internal__/__utils__/interfaces.types";
import { getTheme } from "./__internal__/__utils__/theme";
import {
  CharacterCounterPlugin,
  ContentEditor,
  Placeholder,
  ToolbarPlugin,
} from "./__internal__/__ui__";
import StyledSpanEnterPlugin from "./__internal__/__plugins__/StyledSpanEnter/styled-span-enter.plugin";

let deprecateValueTriggered = false;
let deprecateOnCancelWarnTriggered = false;
let deprecateOnSaveWarnTriggered = false;

export const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(
  (
    {
      characterLimit = 3000,
      error,
      footer,
      header,
      inputHint,
      labelText,
      namespace = COMPONENT_PREFIX,
      id,
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
      size = "medium",
      warning,
      customPlugins,
      validationMessagePositionTop = false,
      toolbarControls,
      ...rest
    },
    ref,
  ) => {
    if (!deprecateValueTriggered && rest.value) {
      deprecateValueTriggered = true;
      Logger.deprecate(
        "`value` is deprecated in TextEditor and support will soon be removed. Please use `initialValue` instead.",
      );
    }
    if (!deprecateOnCancelWarnTriggered && onCancel) {
      deprecateOnCancelWarnTriggered = true;
      Logger.deprecate(
        "`onCancel` is deprecated in TextEditor and support will soon be removed. Please ensure that `TextEditor` is used as a part of a `Form` component, which will handle the cancel functionality.",
      );
    }
    if (!deprecateOnSaveWarnTriggered && onSave) {
      deprecateOnSaveWarnTriggered = true;
      Logger.deprecate(
        "`onSave` is deprecated in TextEditor and support will soon be removed. Please ensure that `TextEditor` is used as a part of a `Form` component, which will handle the save functionality.",
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
        nodes: MARKDOWN_NODES,
        onError: /* istanbul ignore next */ (e) => Logger.error(e.message),
        theme: getTheme(),
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
        toolbarControls,
      }),
      [handleCancel, namespace, onCancel, onSave, toolbarControls],
    );

    const warningMessage = warning || characterLimitWarning;

    const getMarginsForSize = () => {
      switch (size) {
        case "large":
          return "var(--spacing150)";
        case "small":
          return "var(--spacing050)";
        default:
          return "var(--spacing100)";
      }
    };

    return (
      <StyledTextEditorWrapper
        data-role={`${namespace}-editor-wrapper`}
        onBlur={(ev) => {
          /* istanbul ignore next */
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
          <Label isRequired={required} labelId={`${namespace}-label`}>
            {labelText}
          </Label>

          {inputHint && !readOnly && (
            <HintText
              id={`${namespace}-input-hint`}
              marginBottom={getMarginsForSize()}
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
                error={!!error}
                id={`${namespace}-editor-toolbar-wrapper`}
              >
                {header && (
                  <StyledHeaderWrapper
                    data-role={`${namespace}-header-wrapper`}
                  >
                    {header}
                  </StyledHeaderWrapper>
                )}
                {readOnly ? (
                  <ReadOnlyEditor
                    aria-label={labelText}
                    initialValue={
                      contentEditorRef.current?.innerHTML ||
                      initialValue.current
                    }
                    size={size}
                  />
                ) : (
                  <>
                    <ToolbarPlugin
                      contentEditorRef={contentEditorRef}
                      hasHeader={Boolean(header)}
                      size={size}
                      {...toolbarProps}
                    />

                    <StyledTextEditor
                      data-role={`${namespace}-editor`}
                      error={!!error}
                    >
                      <RichTextPlugin
                        contentEditable={
                          <ContentEditor
                            id={id}
                            ref={contentEditorRef}
                            inputHint={inputHint}
                            isFocused={isFocused}
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
                            size={size}
                          />
                        }
                        placeholder={
                          <Placeholder
                            namespace={namespace}
                            text={placeholder}
                          />
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
                      <StyledSpanEnterPlugin />
                      {React.Children.toArray(customPlugins)}
                    </StyledTextEditor>
                  </>
                )}
                {footer && (
                  <StyledFooterWrapper
                    data-role={`${namespace}-footer-wrapper`}
                    size={size}
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
                  isFocused={isFocused}
                  maxChars={characterLimit}
                  namespace={namespace}
                  marginTop={getMarginsForSize()}
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

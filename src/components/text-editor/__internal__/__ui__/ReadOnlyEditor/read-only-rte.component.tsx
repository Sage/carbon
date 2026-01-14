import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";

import { createFromHTML, validateUrl } from "../../__utils__/helpers";

import React, { useMemo } from "react";

import { getTheme } from "../../__utils__/theme";
import { MARKDOWN_NODES } from "../../__utils__/constants";
import Logger from "../../../../../__internal__/utils/logger";
import StyledContentEditable from "../ContentEditor/content-editor.style";
import { AutoLinkerPlugin } from "../../__plugins__";
import { TextEditorProps } from "../../__utils__/interfaces.types";

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
  } catch {
    isJson = false;
  }

  if (!isJson) {
    const isHTML = /<[a-z][\s\S]*>/i.test(value);
    if (isHTML) {
      return createFromHTML(value);
    }
    const wrappedPlainText = `<p><span data-lexical-text="true">${wrapLinksInAnchors(value)}</span></p>`;
    return createFromHTML(wrappedPlainText);
  }
  return value;
};

const ReadOnlyEditor = ({
  "aria-label": ariaLabel,
  initialValue,
  namespace = "carbon-rte-readonly",
  size = "medium",
  useBackgroundColor = true,
}: Partial<TextEditorProps> & {
  useBackgroundColor?: boolean;
}) => {
  const initialConfig = useMemo<InitialConfigType>(() => {
    return {
      namespace,
      nodes: MARKDOWN_NODES,
      onError: /* istanbul ignore next */ (e) => Logger.error(e.message),
      theme: getTheme(),
      editorState: determineFormat(initialValue),
      editable: false,
    };
  }, [namespace, initialValue]);

  return (
    <StyledContentEditable
      namespace={namespace}
      readOnly
      size={size}
      useBackgroundColor={useBackgroundColor}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              aria-label={ariaLabel}
              data-role={`${namespace}-content-editor`}
              /** The following are automatically added by Lexical but violate WCAG 4.1.2 Name, Role, Value and so have been overriden */
              aria-autocomplete={undefined}
              aria-readonly={undefined}
              /**
               * We don't have access to the underlying element, setting a role here means the element will remain a div
               * but assistive technologies will recognise the element as an article. Which is more suitable for an element which
               * is meant to be read-only and non interactive/editable.
               */
              role="article"
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LinkPlugin validateUrl={validateUrl} />
        <ClickableLinkPlugin newTab />
        <AutoLinkerPlugin />
      </LexicalComposer>
    </StyledContentEditable>
  );
};

export default ReadOnlyEditor;

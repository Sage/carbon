/**
 * This is where the actual content editor is rendered. It uses the `ContentEditable` component from the `@lexical/react` package
 * as per their documentation. It also uses the `LinkPreviewerPlugin` to render link previews.
 */
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import React from "react";

import StyledContentEditable from "./content-editor.style";
import { LinkPreviewerPlugin, useCursorAtEnd } from "..";

export interface ContentEditorProps {
  /** The active error message of the editor */
  error?: string;
  /** A hint string rendered before the editor but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /** The namespace of the editor that this content editor belongs to */
  namespace: string;
  /** The link previews to render at the foot of the editor */
  previews?: React.JSX.Element[];
  /** The number of rows to render in the editor */
  rows?: number;
  /** The active warning message of the editor */
  warning?: string;
}

const ContentEditor = ({
  error,
  inputHint,
  namespace,
  previews = [],
  rows,
  warning,
}: ContentEditorProps) => {
  const focusAtEnd = useCursorAtEnd();

  return (
    <StyledContentEditable
      data-role={`${namespace}-content-editable`}
      error={error}
      namespace={namespace}
      rows={rows}
      warning={warning}
    >
      <ContentEditable
        aria-describedby={inputHint && `${namespace}-input-hint`}
        aria-labelledby={`${namespace}-label`}
        className={`${namespace}-editable`}
        data-role={`${namespace}-editable`}
        onFocus={(event) => {
          // If the related target is not a toolbar button, focus at the end of the editor
          /* istanbul ignore next */
          if (
            !event.relatedTarget ||
            !event.relatedTarget.classList.contains("toolbar-button")
          ) {
            focusAtEnd(event);
          }
        }}
        /** The following are automatically added by Lexical but violate WCAG 4.1.2 Name, Role, Value and so have been overriden */
        aria-autocomplete={undefined}
        aria-readonly={undefined}
      />
      <LinkPreviewerPlugin
        error={error}
        previews={previews}
        warning={warning}
      />
    </StyledContentEditable>
  );
};

export default ContentEditor;

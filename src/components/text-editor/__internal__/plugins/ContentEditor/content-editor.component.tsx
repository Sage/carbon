/**
 * This is where the actual content editor is rendered. It uses the `ContentEditable` component from the `@lexical/react` package
 * as per their documentation. It also uses the `LinkPreviewerPlugin` to render link previews.
 */
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import React, { forwardRef } from "react";
import StyledContentEditable from "./content-editor.style";
import { LinkPreviewerPlugin, useCursorAtEnd } from "..";

export interface ContentEditorProps {
  /** A hint string rendered before the editor but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /** The namespace of the editor that this content editor belongs to */
  namespace: string;
  /** The link previews to render at the foot of the editor */
  previews?: React.JSX.Element[];
  /** The number of rows to render in the editor */
  rows?: number;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Whether the editor is required */
  required?: boolean;
  /** Editor has an error */
  error?: boolean;
  /** Editor has a warning */
  warning?: boolean;
}

const ContentEditor = forwardRef<HTMLDivElement, ContentEditorProps>(
  (
    {
      inputHint,
      namespace,
      previews = [],
      rows,
      readOnly,
      required,
      error,
      warning,
    },
    ref,
  ) => {
    const focusAtEnd = useCursorAtEnd();

    const validationMessageId =
      error || warning ? `${namespace}-validation-message` : "";
    const inputHintId = inputHint ? `${namespace}-input-hint` : "";
    const ariaDescribedBy = `${validationMessageId} ${inputHintId}`.trim();

    return (
      <StyledContentEditable
        data-role={`${namespace}-content-editable`}
        namespace={namespace}
        rows={rows}
        readOnly={readOnly}
      >
        <ContentEditable
          ref={ref}
          aria-describedby={ariaDescribedBy}
          aria-labelledby={`${namespace}-label`}
          aria-required={required}
          aria-invalid={error}
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
          /** The following are automatically added by Lexical but violate WCAG 4.1.2 Name, Role, Value and so have been overridden */
          aria-autocomplete={undefined}
          aria-readonly={undefined}
        />
        <LinkPreviewerPlugin previews={previews} />
      </StyledContentEditable>
    );
  },
);

export default ContentEditor;

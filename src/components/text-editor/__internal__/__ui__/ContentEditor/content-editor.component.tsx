/**
 * This is where the actual content editor is rendered. It uses the `ContentEditable` component from the `@lexical/react` package
 * as per their documentation. It also uses the `LinkPreviewerPlugin` to render link previews.
 */
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import React, { forwardRef } from "react";
import StyledContentEditable from "./content-editor.style";

import { ContentEditorProps } from "../../__utils__/interfaces.types";
import { useCursorAtEnd } from "../../__plugins__";
import { LinkPreviewerPlugin } from "..";

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
      validationMessagePositionTop,
      size = "medium",
      id,
    },
    ref,
  ) => {
    const focusAtEnd = useCursorAtEnd();

    const validationMessageId =
      error || warning ? `${namespace}-validation-message` : "";
    const inputHintId = inputHint ? `${namespace}-input-hint` : "";
    const describedByString = validationMessagePositionTop
      ? `${validationMessageId} ${inputHintId}`
      : `${inputHintId} ${validationMessageId}`;
    const ariaDescribedBy = describedByString.trim();

    return (
      <StyledContentEditable
        data-role={`${namespace}-content-editable`}
        error={error}
        warning={warning}
        namespace={namespace}
        rows={rows}
        readOnly={readOnly}
        size={size}
      >
        <ContentEditable
          id={id}
          ref={ref}
          aria-describedby={ariaDescribedBy}
          aria-labelledby={`${namespace}-label`}
          aria-required={required}
          aria-invalid={error}
          className={`${namespace}-editable`}
          data-role={`${namespace}-editable`}
          onBlur={(event) => {
            /**
             * Blur handler needs specific instructions to take focus
             * back into the toolbar, otherwise it gets stuck.
             * */

            const targetInToolbar =
              event.relatedTarget?.classList.contains("toolbar-button");
            if (targetInToolbar) {
              const targetId = event.relatedTarget?.id;
              /* istanbul ignore else */
              if (targetId) {
                const targetElement = document.querySelector(
                  `[id="${targetId}"]`,
                );
                /* istanbul ignore else */
                if (targetElement) (targetElement as HTMLElement).focus();
              }
            }
          }}
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

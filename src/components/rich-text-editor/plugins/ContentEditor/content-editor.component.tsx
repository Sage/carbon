/**
 * This is where the actual content editor is rendered. It uses the `ContentEditable` component from the `@lexical/react` package
 * as per their documentation. It also uses the `LinkPreviewerPlugin` to render link previews.
 */
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import React from "react";

import StyledContentEditable from "./content-editor.style";
import { LinkPreviewerPlugin } from "..";

import useLocale from "../../../../hooks/__internal__/useLocale";

export interface ContentEditorProps {
  /** The active error message of the editor */
  error?: string;
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
  namespace,
  previews = [],
  rows,
  warning,
}: ContentEditorProps) => {
  // Get the locale to enable translations
  const locale = useLocale();

  return (
    <StyledContentEditable
      data-role={`${namespace}-content-editable`}
      error={error}
      namespace={namespace}
      rows={rows}
      warning={warning}
    >
      <ContentEditable
        data-role={`${namespace}-editable`}
        className={`${namespace}-editable`}
        ariaLabel={locale.richTextEditor.contentEditorAria()}
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

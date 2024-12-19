import React from "react";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import StyledContentEditable from "./content-editor.style";

import { componentPrefix } from "../../constants";

export interface ContentEditorProps {
  rows?: number;
}

const ContentEditor = ({ rows }: ContentEditorProps) => {
  return (
    <StyledContentEditable
      data-role={`${componentPrefix}-content-editable`}
      rows={rows}
    >
      <ContentEditable
        data-role={`${componentPrefix}-editable`}
        className={`${componentPrefix}-editable`}
        ariaLabel="Rich text content editor"
      />
    </StyledContentEditable>
  );
};

export default ContentEditor;

import React from "react";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import StyledContentEditable from "./content-editor.style";

import { componentPrefix } from "../../constants";

const ContentEditor = () => {
  return (
    <StyledContentEditable>
      <ContentEditable
        data-role={`${componentPrefix}-editable`}
        className={`${componentPrefix}-editable`}
        ariaLabel="Rich text content editor"
      />
    </StyledContentEditable>
  );
};

export default ContentEditor;

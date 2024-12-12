import React from "react";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import StyledContentEditor from "./content-editor.style";

const ContentEditor = () => {
  return (
    <StyledContentEditor>
      <ContentEditable
        data-role="rte-editable"
        className="carbon-rte-editable"
        ariaLabel="Rich text content editor"
      />
    </StyledContentEditor>
  );
};

export default ContentEditor;

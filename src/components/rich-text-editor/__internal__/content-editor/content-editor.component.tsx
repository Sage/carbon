import React from "react";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import StyledContentEditor from "./content-editor.style";

const ContentEditor = () => {
  return (
    <StyledContentEditor>
      <ContentEditable className="carbon-rte-editable" />
    </StyledContentEditor>
  );
};

export default ContentEditor;

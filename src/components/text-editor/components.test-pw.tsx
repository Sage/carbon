import React from "react";
import TextEditor from "./text-editor.component";

const TextEditorDefaultComponent = ({ ...props }) => {
  return (
    <TextEditor labelText="Playwright Example" namespace="pw-rte" {...props} />
  );
};

export default TextEditorDefaultComponent;

import React, { useContext } from "react";

import TextEditorContext from "../../../text-editor.context";

import StyledLinkPreviewer from "./link-previewer.style";

export interface LinkPreviewerProps {
  /** The active error message of the editor */
  error?: string;
  /** The link previews to render at the foot of the editor */
  previews?: React.JSX.Element[];
  /** The active warning message of the editor */
  warning?: string;
}

const LinkPreviewer = ({
  error,
  previews = [],
  warning,
}: LinkPreviewerProps) => {
  const { readOnly } = useContext(TextEditorContext);

  return (
    <StyledLinkPreviewer error={error} readOnly={readOnly} warning={warning}>
      {previews}
    </StyledLinkPreviewer>
  );
};

export default LinkPreviewer;

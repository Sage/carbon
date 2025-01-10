import React, { useContext } from "react";

import StyledLinkPreviewer from "./link-previewer.style";

import RichTextEditorContext from "../../rich-text-editor.context";
import createGuid from "../../../../__internal__/utils/helpers/guid";

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
  const { readOnly } = useContext(RichTextEditorContext);

  return (
    <StyledLinkPreviewer error={error} readOnly={readOnly} warning={warning}>
      {previews.map((preview) => {
        const key = createGuid();
        return <div key={key}>{preview}</div>;
      })}
    </StyledLinkPreviewer>
  );
};

export default LinkPreviewer;

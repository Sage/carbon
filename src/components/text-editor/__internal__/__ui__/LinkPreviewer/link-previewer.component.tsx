import React from "react";

import StyledLinkPreviewer from "./link-previewer.style";

const LinkPreviewer = ({
  previews = [],
}: {
  previews?: React.JSX.Element[];
}) => <StyledLinkPreviewer>{previews}</StyledLinkPreviewer>;

export default LinkPreviewer;

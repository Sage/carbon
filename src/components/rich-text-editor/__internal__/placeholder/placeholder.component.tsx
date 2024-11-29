import React from "react";

import StyledPlaceholder from "./placeholder.style";

const Placeholder = () => {
  return (
    <StyledPlaceholder
      id="carbon-rich-text-editor-placeholder"
      data-role="rte-placeholder"
    >
      Enter some text...
    </StyledPlaceholder>
  );
};

export default Placeholder;

import React from "react";

import StyledPlaceholder from "./placeholder.style";

interface PlaceholderProps {
  text: string | undefined;
}

const Placeholder = ({ text = "Enter some text..." }: PlaceholderProps) => {
  return (
    <StyledPlaceholder
      id="carbon-rich-text-editor-placeholder"
      data-role="rte-placeholder"
    >
      {text}
    </StyledPlaceholder>
  );
};

export default Placeholder;

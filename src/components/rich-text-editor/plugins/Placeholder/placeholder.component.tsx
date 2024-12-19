import React from "react";

import StyledPlaceholder from "./placeholder.style";

import { componentPrefix } from "../../constants";

interface PlaceholderProps {
  text: string | undefined;
}

const Placeholder = ({ text = "Enter some text..." }: PlaceholderProps) => {
  return (
    <StyledPlaceholder data-role={`${componentPrefix}-command-buttons`}>
      {text}
    </StyledPlaceholder>
  );
};

export default Placeholder;

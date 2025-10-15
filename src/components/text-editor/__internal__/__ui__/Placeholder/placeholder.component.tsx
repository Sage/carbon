/**
 * The placeholder component does not reside in the editor in a traditional sense, but is instead rendered
 * in a separate component which is then styled to appear as if it is part of the editor. This is by design
 * in the Lexical project to allow for greater flexibility in the design of the editor (apparently).
 */
import React from "react";

import StyledPlaceholder from "./placeholder.style";
import { PlaceholderProps } from "../../__utils__/interfaces.types";

const Placeholder = ({ namespace, text = "" }: PlaceholderProps) => {
  return (
    <StyledPlaceholder data-role={`${namespace}-placeholder`}>
      {text}
    </StyledPlaceholder>
  );
};

export default Placeholder;

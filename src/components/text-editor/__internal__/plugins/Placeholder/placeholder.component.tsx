/**
 * The placeholder component does not reside in the editor in a traditional sense, but is instead rendered
 * in a separate component which is then styled to appear as if it is part of the editor. This is by design
 * in the Lexical project to allow for greater flexibility in the design of the editor (apparently).
 */
import React from "react";

import StyledPlaceholder from "./placeholder.style";

interface PlaceholderProps {
  /** The namespace of the editor that this placeholder belongs to */
  namespace: string;
  /** The text to display in the placeholder */
  text: string | undefined;
}

const Placeholder = ({ namespace, text = "" }: PlaceholderProps) => {
  return (
    <StyledPlaceholder data-role={`${namespace}-placeholder`}>
      {text}
    </StyledPlaceholder>
  );
};

export default Placeholder;

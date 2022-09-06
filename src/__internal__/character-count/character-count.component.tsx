import React from "react";

import StyledCharacterCount from "./character-count.style";

interface CharacterCountProps {
  value: string;
  limit: string;
  isOverLimit: boolean;
  "data-element"?: string;
}

const CharacterCount = ({
  value,
  limit,
  isOverLimit,
  "data-element": dataElement,
}: CharacterCountProps) => (
  <StyledCharacterCount
    aria-live="polite"
    isOverLimit={isOverLimit}
    data-element={dataElement}
  >
    {`${value}/${limit}`}
  </StyledCharacterCount>
);

export default CharacterCount;

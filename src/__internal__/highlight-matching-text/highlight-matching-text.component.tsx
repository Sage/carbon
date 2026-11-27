import React from "react";
import styled from "styled-components";

const HighlightedMatch = styled.strong<{ $size?: string }>`
  &&&& {
    ${({ $size }) =>
      `font: var(--global-font-static-comp-medium-${$size?.charAt(0) || "m"});`}
  }
`;

export default function highlightMatchingText(
  text: string,
  query: string,
  size?: string,
): React.ReactNode {
  if (!query) return text;

  const matchStartIndex = text.toLowerCase().indexOf(query.toLowerCase());
  if (matchStartIndex === -1) return text;

  const matchEndIndex = matchStartIndex + query.length;
  return (
    <>
      {text.slice(0, matchStartIndex)}
      <HighlightedMatch $size={size} data-role="matching-text">
        {text.slice(matchStartIndex, matchEndIndex)}
      </HighlightedMatch>
      {text.slice(matchEndIndex)}
    </>
  );
}

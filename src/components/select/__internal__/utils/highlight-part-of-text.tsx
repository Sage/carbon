import React from "react";
import MatchingText from "./matching-text.style";

function highlightPartOfText(
  text: string,
  partToHighlight: string,
): React.ReactNode {
  if (!partToHighlight || !partToHighlight.length || !text) return text;
  const lowercaseText = text.toLowerCase();
  const lowercasePart = partToHighlight.toLowerCase();
  const indexOfFirstMatch = lowercaseText.indexOf(lowercasePart);

  if (indexOfFirstMatch === -1) {
    return text;
  }

  const precedingText = text.slice(0, indexOfFirstMatch);
  const matchingText = text.slice(
    indexOfFirstMatch,
    indexOfFirstMatch + partToHighlight.length,
  );
  const followingText = text.slice(
    indexOfFirstMatch + partToHighlight.length,
    text.length,
  );

  let followingTextNode: React.ReactNode = followingText;

  if (followingText.length >= partToHighlight.length) {
    followingTextNode = highlightPartOfText(followingText, partToHighlight);
  }

  const newValue = [
    <span key="preceding">{precedingText}</span>,
    <MatchingText key="match" data-role="matching-text">
      {matchingText}
    </MatchingText>,
    <span key="following">{followingTextNode}</span>,
  ];

  return newValue;
}

export default function highlightPartOfTextRecursive(
  child: React.ReactNode,
  partToHighlight: string,
): React.ReactNode {
  if (typeof child === "string") {
    return highlightPartOfText(child, partToHighlight);
  }
  /* istanbul ignore if */
  if (!React.isValidElement<{ children: React.ReactNode }>(child)) {
    return child;
  }
  const highlightedChildren = React.Children.map(
    child.props.children,
    (grandChild) => highlightPartOfTextRecursive(grandChild, partToHighlight),
  );
  return React.cloneElement(child, { children: highlightedChildren });
}

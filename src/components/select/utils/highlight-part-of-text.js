import React from "react";
import MatchingText from "./matching-text.style";

export default function highlightPartOfText(text, partToHighlight) {
  if (!partToHighlight || !partToHighlight.length || !text) return text;
  const lowercaseText = text.toLowerCase();
  const lowercasePart = partToHighlight.toLowerCase();
  const indexOfFirstMatch = lowercaseText.indexOf(lowercasePart);

  if (indexOfFirstMatch === -1) {
    return text;
  }

  const precedingText = text.substr(0, indexOfFirstMatch);
  const matchingText = text.substr(indexOfFirstMatch, partToHighlight.length);
  let followingText = text.substr(
    indexOfFirstMatch + partToHighlight.length,
    text.length
  );

  if (followingText.length >= partToHighlight.length) {
    followingText = highlightPartOfText(followingText, partToHighlight);
  }

  const newValue = [
    <span key="preceding">{precedingText}</span>,
    <MatchingText key="match">{matchingText}</MatchingText>,
    <span key="following">{followingText}</span>,
  ];

  return newValue;
}

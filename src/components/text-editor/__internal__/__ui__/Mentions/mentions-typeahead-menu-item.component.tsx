import React from "react";
import MentionTypeaheadOption from "./mention-typeahead-option.class";

const HighlightedText = ({ text, query }: { text: string; query?: string }) => {
  if (!query) return <span>{text}</span>;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) {
    return <span>{text}</span>;
  }

  const beforeMatch = text.slice(0, matchIndex);
  const matchText = text.slice(matchIndex, matchIndex + query.length);
  const afterMatch = text.slice(matchIndex + query.length);

  return (
    <span className="text">
      {beforeMatch}
      <strong>{matchText}</strong>
      {afterMatch}
    </span>
  );
};

export const MentionsTypeaheadMenuItem = ({
  index,
  isSelected,
  namespace,
  onClick,
  onMouseEnter,
  option,
  currentQueryString,
}: {
  index: number;
  isSelected: boolean;
  namespace: string;
  onClick: () => void;
  onMouseEnter: () => void;
  option: MentionTypeaheadOption;
  currentQueryString?: string;
}) => {
  const className = "item" + (isSelected ? " selected" : "");

  return (
    <li
      key={option.id}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={`${namespace}-typeahead-item-${index}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      onKeyDown={onClick}
      aria-label={option.name}
    >
      {option.picture}
      <HighlightedText text={option.name} query={currentQueryString} />
    </li>
  );
};

export default MentionsTypeaheadMenuItem;

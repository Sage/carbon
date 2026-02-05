import React from "react";
import MentionTypeaheadOption from "./mention-typeahead-option.class";
import { MentionsListItem } from "./mentions.style";
import Portrait from "../../../../portrait";

// Difficult to test this for coverage purposes, will be handled by Playwright
// when unit tests are moved over
/* istanbul ignore next */
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
  onClick,
  onMouseEnter,
  option,
  currentQueryString,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: MentionTypeaheadOption;
  currentQueryString?: string;
}) => {
  const className = "item" + (isSelected ? " selected" : "");

  return (
    <MentionsListItem
      key={option.id}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={`typeahead-item-${index}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      onKeyDown={onClick}
      aria-label={option.name}
    >
      <Portrait
        initials={option.initials}
        src={option.src}
        iconType={option.iconType || "individual"}
        size="XS"
        shape="circle"
      />
      <HighlightedText text={option.name} query={currentQueryString} />
    </MentionsListItem>
  );
};

export default MentionsTypeaheadMenuItem;

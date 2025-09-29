import React from "react";
import MentionTypeaheadOption from "./mention-typeahead-option.class";

export const MentionsTypeaheadMenuItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: MentionTypeaheadOption;
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
      id={`typeahead-item-${index}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      onKeyDown={onClick}
      aria-label={option.name}
    >
      {option.picture}
      <span className="text">{option.name}</span>
    </li>
  );
};

export default MentionsTypeaheadMenuItem;

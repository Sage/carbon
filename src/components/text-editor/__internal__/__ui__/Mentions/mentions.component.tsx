import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  MenuTextMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { TextNode } from "lexical";
import React, { useCallback, useMemo } from "react";
import ReactDOM from "react-dom";

import { $createMentionNode } from "../../__nodes__/mention.node";
import Icon from "../../../../icon";

import "./style.css";

const PUNCTUATION =
  "\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%'\"~=<>_:;";

const NAME = `\\b[A-Z][^\\s${PUNCTUATION}]`;

const DocumentMentionsRegex = {
  NAME,
  PUNCTUATION,
};

const PUNC = DocumentMentionsRegex.PUNCTUATION;
const TRIGGERS = ["@"].join("");
const VALID_CHARS = `[^${TRIGGERS}${PUNC}\\s]`;
const VALID_JOINS =
  `(?:` +
  `\\.[ |$]|` + // E.g. "r. " in "Mr. Smith"
  ` |` + // E.g. " " in "Josh Duck"
  `[${PUNC}]|` + // E.g. "-' in "Salier-Hellendag"
  `)`;
const LENGTH_LIMIT = 75;
const ALIAS_LENGTH_LIMIT = 50;
const SUGGESTION_LIST_LENGTH_LIMIT = 5;

const AtSignMentionsRegex = new RegExp(
  `(^|\\s|\\()(` +
    `[${TRIGGERS}]` +
    `((?:${VALID_CHARS}${VALID_JOINS}){0,${LENGTH_LIMIT}})` +
    `)$`,
);
const AtSignMentionsRegexAliasRegex = new RegExp(
  `(^|\\s|\\()(` +
    `[${TRIGGERS}]` +
    `((?:${VALID_CHARS}){0,${ALIAS_LENGTH_LIMIT}})` +
    `)$`,
);

export function checkForAtSignMentions(
  text: string,
  minMatchLength: number,
): MenuTextMatch | null {
  // Check the text against the regex for mentions.
  let match = AtSignMentionsRegex.exec(text);

  // No match found, check for aliases.
  if (match === null) {
    match = AtSignMentionsRegexAliasRegex.exec(text);
  }

  // If a match is found, check if it meets the minimum match length.
  // If it does, return the match details.
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];

    // The matching string is the part of the text that matches the regex.
    const matchingString = match[3];

    // If the matching string is shorter than the minimum match length, return null.
    if (matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: match[2],
      };
    }
  }

  return null;
}

export function getPossibleQueryMatch(text: string): MenuTextMatch | null {
  // Matches must be at least 1 character long.
  return checkForAtSignMentions(text, 1);
}

export class MentionTypeaheadOption extends MenuOption {
  name: string;

  picture: JSX.Element;

  constructor(name: string, picture: JSX.Element) {
    super(name);

    this.name = name;
    this.picture = picture;
  }
}

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
  let className = "item";

  if (isSelected) {
    className += " selected";
  }

  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={`typeahead-item-${index}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {option.picture}
      <span className="text">{option.name}</span>
    </li>
  );
};

export const MentionsPlugin = ({
  results,
  setQueryString,
}: {
  results: Array<string>;
  setQueryString: (query: string | null) => void;
}) => {
  const [editor] = useLexicalComposerContext();

  const options = useMemo(
    () =>
      results
        .map(
          (result) =>
            new MentionTypeaheadOption(
              result,
              (
                <Icon
                  bgShape="circle"
                  color="#00000088"
                  bg="transparent"
                  type="person"
                />
              ),
            ),
        )
        .slice(0, SUGGESTION_LIST_LENGTH_LIMIT),
    [results],
  );

  const onSelectOption = useCallback(
    (
      selectedOption: MentionTypeaheadOption,
      nodeToReplace: TextNode | null,
      closeMenu: () => void,
    ) => {
      editor.update(() => {
        const mentionNode = $createMentionNode(`@${selectedOption.name}`);
        if (nodeToReplace) {
          nodeToReplace.replace(mentionNode);
        }
        mentionNode.select();
        closeMenu();
      });
    },
    [editor],
  );

  // Trigger function to check for mention matches in the text.
  const checkForMentionMatch = useCallback((text: string) => {
    return getPossibleQueryMatch(text);
  }, []);

  return (
    <LexicalTypeaheadMenuPlugin<MentionTypeaheadOption>
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForMentionMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
      ) =>
        anchorElementRef.current && results.length
          ? ReactDOM.createPortal(
              <div className="typeahead-popover mentions-menu">
                <ul>
                  {options.map((option, i: number) => (
                    <MentionsTypeaheadMenuItem
                      index={i}
                      isSelected={selectedIndex === i}
                      onClick={() => {
                        setHighlightedIndex(i);
                        selectOptionAndCleanUp(option);
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(i);
                      }}
                      key={option.key}
                      option={option}
                    />
                  ))}
                </ul>
              </div>,
              anchorElementRef.current,
            )
          : null
      }
    />
  );
};

export default MentionsPlugin;

// The mentions component is notoriously difficult to cover with unit tests
// due to its reliance on the Lexical editor and asynchronous data fetching.
// Most of its functionality is covered by Playwright tests, so we ignore it
// for code coverage purposes.
/* istanbul ignore file */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalTypeaheadMenuPlugin } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { TextNode } from "lexical";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

import { SUGGESTION_LIST_LENGTH_LIMIT } from "./constants";
import { getPossibleQueryMatch } from "./helpers";
import Mention from "./mention.type";
import MentionsTypeaheadMenuItem from "./mentions-typeahead-menu-item.component";
import MentionTypeaheadOption from "./mention-typeahead-option.class";

import { $createMentionNode } from "../../__nodes__/mention.node";
import Icon from "../../../../icon";
import useLocale from "../../../../../hooks/__internal__/useLocale";

import "./style.css";

export const MentionsPlugin = ({
  namespace,
  searchOptions,
}: {
  namespace: string;
  searchOptions: Array<Mention>;
}) => {
  const mentionsCache = new Map();
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);
  const [results, setResults] = useState<Array<Mention>>([]);
  const locale = useLocale();

  const lookupService = (
    string: string,
    callback: (results: Array<Mention>) => void,
  ): void => {
    setTimeout(() => {
      const results = searchOptions.filter((mention) =>
        mention.name.toLowerCase().includes(string.toLowerCase()),
      );
      callback(results);
    }, 500);
  };

  const options = useMemo(
    () =>
      results
        .map(
          (result) =>
            new MentionTypeaheadOption(
              result.id,
              result.name,
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
  const checkForMentionMatch = (text: string) => {
    return getPossibleQueryMatch(text);
  };

  useEffect(() => {
    const cachedResults = mentionsCache.get(queryString);

    if (queryString == null) {
      setResults([]);
      return;
    }

    if (cachedResults === null) {
      return;
    }
    if (cachedResults !== undefined) {
      setResults(cachedResults);
      return;
    }

    mentionsCache.set(queryString, null);
    lookupService(queryString, (newResults) => {
      mentionsCache.set(queryString, newResults);
      setResults(newResults);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

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
              <div
                id={`${namespace}-mentions-menu`}
                className="typeahead-popover mentions-menu"
              >
                <ul
                  data-role={`mention-list`}
                  id={`${namespace}-mention-list`}
                  role="listbox"
                  aria-label={locale.textEditor.mentions.listAriaLabel()}
                >
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
                      key={option.id || option.key}
                      option={option}
                      namespace={namespace}
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

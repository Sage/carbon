// The mentions component is notoriously difficult to cover with unit tests
// due to its reliance on the Lexical editor and asynchronous data fetching.
// Most of its functionality is covered by Playwright tests, so we ignore it
// for code coverage purposes.
/* istanbul ignore file */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalTypeaheadMenuPlugin } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import {
  $getSelection,
  $isRangeSelection,
  $createTextNode,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  TextNode,
} from "lexical";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

import { SUGGESTION_LIST_LENGTH_LIMIT } from "./constants";
import { getPossibleQueryMatch } from "./helpers";
import Mention from "./mention.types";
import MentionsTypeaheadMenuItem from "./mentions-typeahead-menu-item.component";
import MentionTypeaheadOption from "./mention-typeahead-option.class";

import {
  $createMentionNode,
  $isMentionNode,
} from "../../__nodes__/mention.node";
import useLocale from "../../../../../hooks/__internal__/useLocale";

import { MentionsList, TypeaheadPopover } from "./mentions.style";

export const MentionsPlugin = ({
  namespace,
  searchOptions,
}: {
  namespace: string;
  searchOptions: Array<Mention>;
}) => {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);
  const results = useMemo(
    () =>
      queryString
        ? searchOptions.filter((mention) =>
            mention.name.toLowerCase().includes(queryString.toLowerCase()),
          )
        : [],
    [queryString, searchOptions],
  );
  const locale = useLocale();

  const options = useMemo(
    () =>
      results
        .map(
          (result) =>
            new MentionTypeaheadOption(
              result.id,
              result.name,
              result.initials,
              result.iconType,
              result.src,
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
        const nextSibling = mentionNode.getNextSibling();
        if (
          $isTextNode(nextSibling) &&
          nextSibling.getTextContent().startsWith(" ")
        ) {
          nextSibling.select(1, 1);
        } else {
          const spaceNode = $createTextNode(" ");
          mentionNode.insertAfter(spaceNode);
          spaceNode.select();
        }
        closeMenu();
      });
    },
    [editor],
  );

  // Trigger function to check for mention matches in the text.
  const checkForMentionMatch = (text: string) => {
    return getPossibleQueryMatch(text);
  };

  // Difficult to test this for coverage purposes, will be handled by Playwright
  // when unit tests are moved over
  /* istanbul ignore next */
  useEffect(() => {
    // Handles the transition from MentionNode back to TextNode
    // when backspace pressed
    return editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      () => {
        // Get the current selection
        const selection = $getSelection();
        // If nothing is highlighted, abort
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
          return false;
        }

        // Get selection anchor point
        const { anchor } = selection;
        // Get node from anchor
        const node = anchor.getNode();

        // Check node is a mention
        if ($isMentionNode(node)) {
          // Instanciate a new TextNode using the existing content
          const textNode = new TextNode(node.getTextContent());
          // Replace the current node
          node.replace(textNode);
          return true;
        }

        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return (
    <LexicalTypeaheadMenuPlugin<MentionTypeaheadOption>
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForMentionMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
      ) => {
        const anchorElement = anchorElementRef.current;

        if (!anchorElement || results.length === 0) {
          anchorElement?.removeAttribute("aria-label");
          return null;
        }

        anchorElement.setAttribute(
          "aria-label",
          locale.textEditor.mentions.listAriaLabel(),
        );

        return ReactDOM.createPortal(
          <TypeaheadPopover
            className="carbon-portal-mentions"
            id={`${namespace}-mentions-menu`}
          >
            <MentionsList
              data-role={`mention-list`}
              id={`${namespace}-mention-list`}
              role="group"
              tabIndex={0}
            >
              {options.map((option, i: number) => {
                const optionKey =
                  option.key ?? option.id ?? `${namespace}-${i}`;

                return (
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
                    key={optionKey}
                    option={option}
                    currentQueryString={queryString ?? undefined}
                  />
                );
              })}
            </MentionsList>
          </TypeaheadPopover>,
          anchorElement,
        );
      }}
    />
  );
};

export default MentionsPlugin;

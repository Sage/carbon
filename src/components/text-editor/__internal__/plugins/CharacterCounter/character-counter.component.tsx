import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import {
  StyledCharacterCounter,
  VisuallyHiddenCharacterCounter,
} from "./character-counter.style";

import useDebounce from "../../../../../hooks/__internal__/useDebounce";
import useLocale from "../../../../../hooks/__internal__/useLocale";

export interface CharacterCounterPluginProps {
  /** The maximum number of characters to allow before showing the warning */
  maxChars: number;
  /** The namespace of the editor that this counter belongs to */
  namespace: string;
}

const CharacterCounterPlugin = ({
  maxChars,
  namespace,
}: CharacterCounterPluginProps) => {
  const [rawContent, setRawContent] = useState<string>("");

  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    // The character counter plugin listens for updates to the editor state
    // independently to ensure updates do not conflict/interrupt other state
    // changes
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const newContent = $getRoot()
          .getChildren()
          .map((node) => node.getTextContent())
          .join("\n\n");

        setRawContent(newContent);
      });
    });
  }, [editor]);

  // Get the locale to enable translations
  const locale = useLocale();

  // Get the current locale and format the number
  const getFormatNumber = useCallback(
    (rawValue: number) => {
      return new Intl.NumberFormat(locale.locale()).format(rawValue);
    },
    [locale],
  );
  const [debouncedValue, setDebouncedValue] = useState<number>(0);

  // Calculate the number of characters remaining
  const rawCharactersRemaining = useMemo(() => {
    // Calculate the number of characters remaining
    const activeCount = maxChars - (rawContent ? rawContent.length : 0);
    // Return the active count if it is greater than 0, otherwise return 0
    return activeCount >= 0 ? activeCount : 0;
  }, [rawContent, maxChars]);

  // Use a debounced value to update the remaining character count for screen readers to use
  /* istanbul ignore next */
  const debouncedText = useDebounce((newValue) => {
    setDebouncedValue(newValue || 0);
  }, 2000);

  useEffect(() => {
    debouncedText(rawCharactersRemaining);
  }, [rawCharactersRemaining, debouncedText]);

  return (
    <>
      <StyledCharacterCounter data-role={`${namespace}-character-limit`}>
        {locale.textEditor.characterCounter(
          getFormatNumber(rawCharactersRemaining),
        )}
      </StyledCharacterCounter>
      <VisuallyHiddenCharacterCounter aria-live="polite">
        {locale.textEditor.characterCounter(getFormatNumber(debouncedValue))}
      </VisuallyHiddenCharacterCounter>
    </>
  );
};

export default CharacterCounterPlugin;

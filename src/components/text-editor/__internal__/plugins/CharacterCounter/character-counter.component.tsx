import React, { useCallback, useEffect, useState } from "react";
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
  const [charactersRemaining, setCharactersRemaining] = useState(0);

  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    const updateCharCount = () => {
      editor.getEditorState().read(() => {
        const root = $getRoot();
        const paragraphs = root.getChildren();

        if (
          paragraphs.length === 1 &&
          paragraphs[0].getTextContent().length === 0
        ) {
          setCharactersRemaining(maxChars);
        }

        const count = paragraphs.reduce((acc, node, index) => {
          const textLength = node.getTextContent().length;
          const isLast = index === paragraphs.length - 1;

          return acc + textLength + (isLast ? 0 : 2);
        }, 0);
        setCharactersRemaining(maxChars - count > 0 ? maxChars - count : 0);
      });
    };

    updateCharCount();

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateCharCount();
      });
    });
  }, [editor, maxChars]);

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

  // Use a debounced value to update the remaining character count for screen readers to use
  /* istanbul ignore next */
  const debouncedText = useDebounce((newValue) => {
    setDebouncedValue(newValue || 0);
  }, 2000);

  useEffect(() => {
    debouncedText(charactersRemaining);
  }, [charactersRemaining, debouncedText]);

  return (
    <>
      <StyledCharacterCounter data-role={`${namespace}-character-limit`}>
        {locale.textEditor.characterCounter(
          getFormatNumber(charactersRemaining),
        )}
      </StyledCharacterCounter>
      <VisuallyHiddenCharacterCounter aria-live="polite">
        {locale.textEditor.characterCounter(getFormatNumber(debouncedValue))}
      </VisuallyHiddenCharacterCounter>
    </>
  );
};

export default CharacterCounterPlugin;

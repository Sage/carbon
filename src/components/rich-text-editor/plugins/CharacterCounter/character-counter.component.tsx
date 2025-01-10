import { EditorState, $getRoot } from "lexical";

import React, { useMemo } from "react";

import StyledCharacterCounter from "./character-counter.style";

import useLocale from "../../../../hooks/__internal__/useLocale";

export interface CharacterCounterPluginProps {
  /** The editor's current state. Needed to get the raw character count */
  editorState: EditorState | undefined;
  /** The maximum number of characters to allow before showing the warning */
  maxChars: number;
  /** The namespace of the editor that this counter belongs to */
  namespace: string;
}

const CharacterCounterPlugin = ({
  editorState,
  maxChars,
  namespace,
}: CharacterCounterPluginProps) => {
  // Get the locale to enable translations
  const locale = useLocale();

  // Calculate the number of characters remaining
  const rawCharactersRemaining = useMemo(() => {
    // If there is no editor state, return the max number of characters
    if (!editorState) return maxChars;
    // Get the text content of the editor
    const editorStateTextString = editorState.read(() =>
      $getRoot().getTextContent(),
    );
    // Calculate the number of characters remaining
    const activeCount = maxChars - editorStateTextString.length;
    // Return the active count if it is greater than 0, otherwise return 0
    return activeCount > 0 ? activeCount : 0;
  }, [editorState, maxChars]);

  return (
    <StyledCharacterCounter data-role={`${namespace}-character-limit`}>
      {locale.richTextEditor.characterCounter(rawCharactersRemaining)}
    </StyledCharacterCounter>
  );
};

export default CharacterCounterPlugin;

import { EditorState, $getRoot } from "lexical";

import React, { useMemo } from "react";

import StyledCharacterCounter from "./character-counter.style";

export interface CharacterCounterPluginProps {
  editorState: EditorState | undefined;
  maxChars: number;
}

const CharacterCounterPlugin = ({
  editorState,
  maxChars,
}: CharacterCounterPluginProps) => {
  const rawCharactersRemaining = useMemo(() => {
    if (!editorState) return maxChars;
    const editorStateTextString = editorState.read(() =>
      $getRoot().getTextContent(),
    );
    const activeCount = maxChars - editorStateTextString.length;
    return activeCount > 0 ? activeCount : 0;
  }, [editorState, maxChars]);

  return (
    <StyledCharacterCounter>
      {rawCharactersRemaining} characters remaining
    </StyledCharacterCounter>
  );
};

export default CharacterCounterPlugin;

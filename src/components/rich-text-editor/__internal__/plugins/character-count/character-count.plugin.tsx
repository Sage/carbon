import { EditorState, $getRoot } from "lexical";

import React, { useMemo } from "react";

import StyledCharacterCounter from "./character-count.plugin.style";

export interface CharacterCountPluginProps {
  editorState: EditorState | undefined;
  maxChars: number;
}

const CharacterCountPlugin = ({
  editorState,
  maxChars,
}: CharacterCountPluginProps) => {
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

export default CharacterCountPlugin;

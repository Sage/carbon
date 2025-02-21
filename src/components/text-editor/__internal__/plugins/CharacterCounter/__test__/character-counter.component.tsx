import React, { useEffect, useMemo, useState } from "react";
import { $getRoot, LexicalEditor } from "lexical";

export interface CharacterCounterPluginProps {
  /** The maximum number of characters to allow before showing the warning */
  maxChars: number;
  /** The Lexical editor instance */
  editor: LexicalEditor;
}

const CharacterCounterPlugin = ({
  maxChars,
  editor,
}: CharacterCounterPluginProps) => {
  const [rawContent, setRawContent] = useState<string>("");

  // Simplified update listener using Lexical v0.21.0 approach
  useEffect(() => {
    const removeListener = editor.registerUpdateListener(() => {
      const editorState = editor.getEditorState();
      editorState.read(() => {
        const newContent = $getRoot().getTextContent();
        setRawContent(newContent);
      });
    });

    return () => {
      removeListener();
    };
  }, [editor]);

  // Calculate the number of characters remaining
  const rawCharactersRemaining = useMemo(() => {
    const activeCount = maxChars - (rawContent ? rawContent.length : 0);
    return activeCount >= 0 ? activeCount : 0;
  }, [maxChars, rawContent]);

  return (
    <>
      <div data-role="visible-counter">{rawCharactersRemaining}</div>
    </>
  );
};

export default CharacterCounterPlugin;

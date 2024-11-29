import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { EditorState } from "lexical";

import { useEffect } from "react";

const OnChangePlugin = (props: {
  onChange: (editorState: EditorState) => void;
}) => {
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);

  return null;
};

export default OnChangePlugin;

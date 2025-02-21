/**
 * This plugin listens to changes in the editor and calls the `onChange` prop with the new editor state.
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { EditorState } from "lexical";

import { useEffect } from "react";

const OnChangePlugin = (props: {
  onChange: (editorState: EditorState) => void;
}) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;

  // Register an update listener to call the `onChange` prop
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const isEditable = editor.isEditable();
      /* istanbul ignore else */
      if (isEditable) onChange(editorState);
    });
  }, [editor, onChange]);

  return null;
};

export default OnChangePlugin;

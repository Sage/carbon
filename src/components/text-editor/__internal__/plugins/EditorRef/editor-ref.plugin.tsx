/**
 * This plugin allows retrieval of a reference to the current editor. It's useful
 * for testing purposes, where tests might need to directly interact with the editor to
 * emulate e.g. blurring.
 */
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor } from "lexical";

const EditorRefPlugin = ({
  setEditorRef,
}: {
  setEditorRef: (editor: LexicalEditor) => void;
}) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    setEditorRef(editor);
  }, [editor, setEditorRef]);

  return null;
};

export default EditorRefPlugin;

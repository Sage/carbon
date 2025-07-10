/**
 * This plugin listens to changes in the editor and calls the `onChange` prop with the new editor state.
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState, $isTextNode, $getNodeByKey, TextNode } from "lexical";
import { $isListNode } from "@lexical/list";
import { useEffect, useRef } from "react";

const OnChangePlugin = (props: {
  onChange: (editorState: EditorState) => void;
}) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;

  /* Register an update listener to call the `onChange` prop
   whenever the text content changes within the editor */
  useEffect(() => {
    const unregisterTextContentListener = editor.registerTextContentListener(
      () => {
        const isEditable = editor.isEditable();
        const editorState = editor.getEditorState();
        /* istanbul ignore else */
        if (isEditable) onChange(editorState);
      },
    );

    return () => {
      unregisterTextContentListener();
    };
  }, [editor, onChange]);

  const previousFormatsRef = useRef(new Map());

  /* Register an update mutation listener to call the `onChange` prop
   whenever the text node format changes within the editor */
  useEffect(() => {
    const unregisterMutationListener = editor.registerMutationListener(
      TextNode,
      (mutatedNodes) => {
        const isEditable = editor.isEditable();
        if (isEditable) {
          editor.read(() => {
            let hasFormatChanged = false;
            for (const [nodeKey, mutation] of mutatedNodes) {
              const node = $getNodeByKey(nodeKey);
              if ($isTextNode(node) && mutation === "updated") {
                const currentFormat = node.getFormat();
                const previousFormat = previousFormatsRef.current.get(nodeKey);
                if (
                  previousFormat !== undefined &&
                  currentFormat !== previousFormat
                ) {
                  hasFormatChanged = true;
                }
                previousFormatsRef.current.set(nodeKey, currentFormat);
              }
            }
            if (hasFormatChanged) {
              const editorState = editor.getEditorState();
              onChange(editorState);
            }
          });
        }
      },
    );

    return () => {
      unregisterMutationListener();
    };
  }, [editor, onChange]);

  const previousListCountRef = useRef({ bullet: 0, number: 0 });

  /* Register an update listener to call the `onChange` prop
   whenever an unordered/ordered list node is created/destroyed within the editor */
  useEffect(() => {
    const unregisterUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        const isEditable = editor.isEditable();
        if (isEditable) {
          editorState.read(() => {
            let bulletCount = 0;
            let numberCount = 0;
            // Count all list nodes in the current state
            const allNodes = editorState._nodeMap;
            for (const node of allNodes.values()) {
              if ($isListNode(node)) {
                const listType = node.getListType();
                if (listType === "bullet") {
                  bulletCount += 1;
                } else if (listType === "number") {
                  numberCount += 1;
                }
              }
            }
            const previousCounts = previousListCountRef.current;
            const hasListChanged =
              bulletCount !== previousCounts.bullet ||
              numberCount !== previousCounts.number;
            if (hasListChanged) {
              previousListCountRef.current = {
                bullet: bulletCount,
                number: numberCount,
              };
              onChange(editorState);
            }
          });
        }
      },
    );

    return () => {
      unregisterUpdateListener();
    };
  }, [editor, onChange]);

  return null;
};

export default OnChangePlugin;

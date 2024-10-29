import {
  EditorState,
  Modifier,
  ContentBlock,
  DraftInlineStyle,
  ContentState,
} from "draft-js";
import decorators from "../decorators";

import {
  BlockType,
  InlineStyleType,
  ORDERED_LIST,
  UNORDERED_LIST,
} from "../../types";

export const computeBlockType = (char: string, type: string) => {
  if (char === "." && type !== ORDERED_LIST) {
    return ORDERED_LIST;
  }
  if (char === "*" && type !== UNORDERED_LIST) {
    return UNORDERED_LIST;
  }
  return "unstyled";
};

/*
Returns default block-level metadata for various block type. Empty object otherwise.
*/
const getDefaultBlockData = (
  blockType: BlockType | "unstyled",
  initialData = {},
) => {
  switch (blockType) {
    case ORDERED_LIST:
      return {};
    case UNORDERED_LIST:
      return {};
    default:
      return initialData;
  }
};

/*
Changes the block type of the current block.
*/
export const resetBlockType = (
  value: EditorState,
  newType: BlockType | "unstyled" = "unstyled",
) => {
  const contentState = value.getCurrentContent();
  const selectionState = value.getSelection();
  const key = selectionState.getStartKey();
  const blockMap = contentState.getBlockMap();
  const block = blockMap.get(key);

  const newBlock = block.merge({
    text: "",
    type: newType,
    data: getDefaultBlockData(newType),
  });

  const newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock as ContentBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: 0,
      focusOffset: 0,
    }),
  });

  return EditorState.push(
    value,
    newContentState as ContentState,
    "change-block-type",
  );
};

export function blockStyleFn(block: ContentBlock) {
  switch (block.getType()) {
    case "unordered-list-item":
      return "text-editor-block-unordered";
    case "ordered-list-item":
      return "text-editor-block-ordered";
    default:
      return "";
  }
}

/*
  Return mutated editorState with decorators added
*/
export const getDecoratedValue = (value: EditorState) =>
  EditorState.set(value, { decorator: decorators });

/*
  Get the current Content State
*/
export const getContent = (value: EditorState) => value.getCurrentContent();

/*
  Get the current selection State
*/
export const getSelection = (value: EditorState) => value.getSelection();

/*
  Get the current Content and Block information
*/
export const getContentInfo = (value: EditorState) => {
  const content = getContent(value);
  const currentBlock = content.getBlockForKey(
    getSelection(value).getStartKey(),
  );
  const blockType = currentBlock.getType();
  const blockLength = currentBlock.getLength();
  const blockText = currentBlock.getText();
  const blockMap = content.getBlockMap();

  return {
    content,
    currentBlock,
    blockType,
    blockLength,
    blockText,
    blockMap,
  };
};

/*
  Get the current Selection information
*/
export const getSelectionInfo = (value: EditorState) => {
  const selection = getSelection(value);
  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();
  const startOffset = selection.getStartOffset();
  const endOffset = selection.getEndOffset();

  return {
    selection,
    startKey,
    endKey,
    startOffset,
    endOffset,
  };
};

/*
  Move cursor to end of Content
*/
export const moveSelectionToEnd = (value: EditorState) =>
  EditorState.forceSelection(value, getContent(value).getSelectionAfter());

/*
  Returns the current Selection length
*/
export const getSelectedLength = (value: EditorState) => {
  const selection = getSelection(value);

  let length = 0;

  if (!selection.isCollapsed()) {
    const { startKey, endKey, startOffset, endOffset } =
      getSelectionInfo(value);
    const { content, blockLength } = getContentInfo(value);
    const startLength = blockLength - startOffset;
    const keyAfterEnd = content.getKeyAfter(endKey);

    if (startKey === endKey) {
      length += endOffset - startOffset;
    } else {
      let currentKey = startKey;

      while (currentKey && currentKey !== keyAfterEnd) {
        if (currentKey === startKey) {
          length += startLength + 1;
        } else if (currentKey === endKey) {
          length += endOffset;
        } else {
          length += content.getBlockForKey(currentKey).getLength() + 1;
        }

        currentKey = content.getKeyAfter(currentKey);
      }
    }
  }

  return length;
};

export function hasBlockStyle(value: EditorState, type: BlockType) {
  const { blockType } = getContentInfo(value);
  return blockType === type;
}

export function hasInlineStyle(value: EditorState, style: InlineStyleType) {
  return value.getCurrentInlineStyle().has(style);
}

export function isASCIIChar(str: string) {
  return /^\S+$/.test(str);
}

export function replaceText(
  editorState: EditorState,
  text: string,
  inlineStyle: DraftInlineStyle,
) {
  const contentState = Modifier.replaceText(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    text,
    inlineStyle,
  );

  return EditorState.push(editorState, contentState, "insert-characters");
}

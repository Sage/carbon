import { EditorState, Modifier } from "draft-js";
import decorators from "../decorators";

const ORDERLIST_TYPE = "ordered-list-item";
const UNORDERLIST_TYPE = "unordered-list-item";

export const computeBlockType = (char, type) => {
  if (char === "." && type !== ORDERLIST_TYPE) {
    return ORDERLIST_TYPE;
  }
  if (char === "*" && type !== UNORDERLIST_TYPE) {
    return UNORDERLIST_TYPE;
  }
  return "unstyled";
};

/*
Returns default block-level metadata for various block type. Empty object otherwise.
*/
const getDefaultBlockData = (blockType, initialData = {}) => {
  switch (blockType) {
    case ORDERLIST_TYPE:
      return {};
    case UNORDERLIST_TYPE:
      return {};
    default:
      return initialData;
  }
};

/*
Changes the block type of the current block.
*/
export const resetBlockType = (value, newType = "unstyled") => {
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
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: 0,
      focusOffset: 0,
    }),
  });

  return EditorState.push(value, newContentState, "change-block-type");
};

export function blockStyleFn(block) {
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
export const getDecoratedValue = (value) =>
  EditorState.set(value, { decorator: decorators });

/*
  Get the current Content State
*/
export const getContent = (value) => value.getCurrentContent();

/*
  Get the current selection State
*/
export const getSelection = (value) => value.getSelection();

/*
  Get the current Content and Block information
*/
export const getContentInfo = (value) => {
  const content = getContent(value);
  const currentBlock = content.getBlockForKey(
    getSelection(value).getStartKey()
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
export const getSelectionInfo = (value) => {
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
export const moveSelectionToEnd = (value) =>
  EditorState.forceSelection(value, getContent(value).getSelectionAfter());

/*
  Returns the current Selection length
*/
export const getSelectedLength = (value) => {
  const selection = getSelection(value);

  let length = 0;

  if (!selection.isCollapsed()) {
    const { startKey, endKey, startOffset, endOffset } = getSelectionInfo(
      value
    );
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

export function hasBlockStyle(value, type) {
  const { blockType } = getContentInfo(value);
  return blockType === type;
}

export function hasInlineStyle(value, style) {
  return value.getCurrentInlineStyle().has(style);
}

export function isASCIIChar(str) {
  return /^\S+$/.test(str);
}

export function replaceText(editorState, text, inlineStyle, forceSelection) {
  const contentState = Modifier.replaceText(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    text,
    inlineStyle
  );

  return EditorState.push(
    editorState,
    contentState,
    "insert-characters",
    forceSelection
  );
}

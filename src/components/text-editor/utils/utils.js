import {
  EditorState,
  SelectionState
} from 'draft-js';
import decorators from '../decorators';

const ORDERLIST_TYPE = 'ordered-list-item';
const UNORDERLIST_TYPE = 'unordered-list-item';

export const computeBlockType = (char, type) => {
  if (char === '.' && type !== ORDERLIST_TYPE) {
    return ORDERLIST_TYPE;
  }
  if (char === '*' && type !== UNORDERLIST_TYPE) {
    return UNORDERLIST_TYPE;
  }
  return 'unstyled';
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
export const resetBlockType = (value, newType) => {
  const contentState = value.getCurrentContent();
  const selectionState = value.getSelection();
  const key = selectionState.getStartKey();
  const blockMap = contentState.getBlockMap();
  const block = blockMap.get(key);

  const newBlock = block.merge({
    text: '',
    type: newType,
    data: getDefaultBlockData(newType)
  });

  const newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: 0,
      focusOffset: 0
    })
  });

  return EditorState.push(value, newContentState, 'change-block-type');
};

// return mutated editorState with decorators added
export const getDecoratedValue = value => EditorState.set(value, { decorator: decorators });

// gets contentState
export const getContent = value => value.getCurrentContent();

// gets selectionState
export const getSelection = value => value.getSelection();

// gets useful content and block info
export const getContentInfo = (value) => {
  const content = getContent(value);
  const currentBlock = content.getBlockForKey(getSelection(value).getStartKey());
  const blockType = currentBlock.getType();
  const blockLength = currentBlock.getLength();
  const blockText = currentBlock.getText();
  const blockMap = content.getBlockMap();

  return {
    content, currentBlock, blockType, blockLength, blockText, blockMap
  };
};

// position cursor at end of text
export const moveSelectionToEnd = (value) => {
  const { blockMap } = getContentInfo(value);

  const key = blockMap.last().getKey();
  const length = blockMap.last().getLength();

  const selection = new SelectionState({
    anchorKey: key,
    anchorOffset: length,
    focusKey: key,
    focusOffset: length
  });
  // const newValue = getDecoratedValue(value);

  return EditorState.forceSelection(value, selection);
  // EditorState.moveSelectionToEnd(value); // content.getSelectionAfter()
};

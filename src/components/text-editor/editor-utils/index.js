import {
  Block,
  EditorState
} from 'draft-js';

const ORDERLIST_TYPE = 'ordered-list-item';
const UNORDERLIST_TYPE = 'unordered-list-item';

export const computeBlockType = (char, type) => {
  switch (char) {
    case '.':
      if (type !== ORDERLIST_TYPE) {
        return ORDERLIST_TYPE;
      }
      // eslint-disable-next-line import/no-fallthrough
    case '*':
      if (type !== UNORDERLIST_TYPE) {
        return UNORDERLIST_TYPE;
      }
      // eslint-disable-next-line import/no-fallthrough
    default:
      return 'unstyled';
  }
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
export const resetBlockType = (value, newType = Block.UNSTYLED) => {
  const contentState = value.getCurrentContent();
  const selectionState = value.getSelection();
  const key = selectionState.getStartKey();
  const blockMap = contentState.getBlockMap();
  const block = blockMap.get(key);
  let newText = '';
  const text = block.getText();
  if (block.getLength() >= 2) {
    newText = text.substr(1);
  }
  const newBlock = block.merge({
    text: newText,
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

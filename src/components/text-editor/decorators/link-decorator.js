import EditorLink from '../editor-link';

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  // eslint-disable-next-line no-cond-assign
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + text.split(' ')[0].length);
  }
}

const linkStrategy = (contentBlock, callback, contentState) => {
  // eslint-disable-next-line consistent-return
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    if (entityKey !== null) {
      // for pasted links
      return contentState.getEntity(entityKey).getType() === 'LINK';
    }
    // for strings or non link entity pasting
    findWithRegex(RegExp('http+', 'g'), contentBlock, callback);
  }, callback);
};

export default {
  strategy: linkStrategy,
  component: EditorLink
};

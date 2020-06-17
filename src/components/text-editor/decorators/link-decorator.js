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

const linkStrategy = (contentBlock, callback) => {
  const expr = /(https:\/\/|http:\/\/|www\.)\w+(\.)[a-z+]/g;
  findWithRegex(RegExp(expr), contentBlock, callback);
};

export default {
  strategy: linkStrategy,
  component: EditorLink
};

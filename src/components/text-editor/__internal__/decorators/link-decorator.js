import EditorLink from "../editor-link";

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr;
  let start = 0;
  let candidates = [];

  text.split(" ").forEach((chars) => {
    candidates = [...candidates, [...chars]];
  });

  candidates.forEach((candidate) => {
    // eslint-disable-next-line no-cond-assign
    while ((matchArr = regex.exec(candidate.join(""))) !== null) {
      start += matchArr.index;
      callback(start, start + candidate.length);
    }
    start += candidate.length + 1;
  });
}

const linkStrategy = (contentBlock, callback) => {
  const expr = /\s*(https:\/\/|http:\/\/|www\.)\S+(:{0,1}(\w*@)?)(\.{1}(?!\.)\S{2,})|(:[0-9]+)(\/|\/([\w#!:.?+=&%@!-/]))?\s*/g;

  findWithRegex(RegExp(expr), contentBlock, callback);
};

export default {
  strategy: linkStrategy,
  component: EditorLink,
};

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
  const combineRegex = (...regex) =>
    new RegExp(regex.map((r) => r.source).join(""), "g");
  const urlRegex = combineRegex(
    /\b/,
    /(http:\/\/|https:\/\/|www\.)/, // prefix
    /([\w-]+:([\w-]+@))?/, // userinfo
    /([\w-]+\.)+\w+/, // domain
    /(:\d+)?/, // port
    /(\/[\w#!:.?+=&%@!-/]+)?/, // paths, queries, fragments
    /\b/
  );

  findWithRegex(urlRegex, contentBlock, callback);
};

export default {
  strategy: linkStrategy,
  component: EditorLink,
};

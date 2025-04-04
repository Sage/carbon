import { DeserializeHTML } from "./__internal__/helpers";

const createFromHTML = (html: string) => {
  // DeserializeHTML is tested as part of the helper tests
  /* istanbul ignore next */
  return DeserializeHTML(html);
};

/** Creates and returns a string representation of an empty editor */
const createEmpty = () => {
  // Create a default empty state
  const value =
    '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
  return value;
};

export { createEmpty, createFromHTML };

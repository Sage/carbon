import guid from '../guid';

const AutoFocus = {
  default: (key, autoFocus) => {
    if (key && autoFocus) {
      return { key, autoFocus };
    }

    return {
      key: guid(),
      autoFocus: false
    };
  },

  getKey: (autoFocus, { ...previous }) => {
    if (autoFocus && previous && previous.autoFocus === autoFocus) {
      return previous.key;
    }

    return guid();
  }
};

export default AutoFocus;

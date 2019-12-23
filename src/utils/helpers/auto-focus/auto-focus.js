import guid from '../guid';

const AutoFocus = {
  getKey: (autoFocus, { ...previous }) => {
    if (autoFocus && previous && previous.autoFocus === autoFocus) {
      return previous.key;
    }

    return guid();
  }
};

export default AutoFocus;

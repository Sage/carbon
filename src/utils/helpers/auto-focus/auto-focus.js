import guid from '../guid';

const AutoFocus = {
  getKey: (autoFocus, previous) => {
    if (autoFocus !== undefined && previous !== undefined && previous.autoFocus === autoFocus) {
      return previous.key;
    }

    return guid();
  }
};

export default AutoFocus;

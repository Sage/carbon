export default {
  compact: {
    height: '24px',
    fontSize: '13px',
    paddingSize: '8px',
    inputHeight: '22px'
  },
  small: {
    height: '32px',
    fontSize: '14px',
    paddingSize: '8px',
    inputHeight: '24px'
  },
  medium: {
    height: '40px',
    fontSize: '14px',
    paddingSize: '11px',
    inputHeight: '32px'
  },
  large: {
    height: '48px',
    fontSize: '16px',
    paddingSize: '13px',
    inputHeight: '32px'
  },
  wrapper: (total) => {
    return {
      compact: `${24 * total}px`,
      small: `${32 * total}px`,
      medium: `${40 * total}px`,
      large: `${48 * total}px`
    };
  }
};

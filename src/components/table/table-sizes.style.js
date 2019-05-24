export default {
  compact: {
    height: '24px',
    font: '13px',
    padding: '8px',
    inputHeight: '22px'
  },
  small: {
    height: '32px',
    font: '14px',
    padding: '8px',
    inputHeight: '24px'
  },
  medium: {
    height: '40px',
    font: '14px',
    padding: '11px',
    inputHeight: '32px'
  },
  large: {
    height: '48px',
    font: '16px',
    padding: '13px',
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

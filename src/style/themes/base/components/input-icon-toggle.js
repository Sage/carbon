export default ({ palette, blackWithOpacity }) => ({
  base: {
    alignItems: 'center',
    color: blackWithOpacity(0.9),
    cursor: 'pointer',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    marginRight: '-13px' // correction for parent element padding
  },
  states: {
    error: {
      color: palette.errorRed
    },
    warning: {
      color: palette.gold
    }
  },
  sizes: {
    small: {
      width: '32px'
    },
    medium: {
      width: '40px'
    },
    large: {
      width: '48px'
    }
  }
});

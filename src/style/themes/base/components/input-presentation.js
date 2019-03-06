export default ({ palette, blackWithOpacity }) => ({
  base: {
    alignItems: 'center',
    color: blackWithOpacity(0.9),
    background: 'transparent',
    lineHeight: '16px',
    display: 'flex',
    cursor: 'text',
    margin: '0px',
    minHeight: '32px',
    border: `1px solid ${palette.slateTint(80)}`
  },
  states: {
    error: {
      border: `2px solid ${palette.errorRed}`
    },
    warning: {
      border: `2px solid ${palette.gold}`
    },
    hasFocus: {
      outline: `3px solid ${palette.gold}`
    },
    disabled: {
      color: blackWithOpacity(0.55),
      background: palette.slateTint(85),
      cursor: 'not-allowed'
    },
    readOnly: {
      background: 'transparent',
      border: 'none'
    }
  },
  sizes: {
    small: {
      height: '32px',
      fontSize: '14px',
      paddingLeft: '8px',
      paddingRight: '8px',
      width: '80px'
    },
    medium: {
      height: '40px',
      fontSize: '14px',
      paddingLeft: '11px',
      paddingRight: '11px',
      width: '128px'
    },
    large: {
      height: '48px',
      fontSize: '16px',
      paddingLeft: '13px',
      paddingRight: '13px',
      width: '256px'
    }
  }
});

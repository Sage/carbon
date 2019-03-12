export default palette => ({
  borderColor: palette.slateTint(40),

  small: {
    height: '32px',
    padding: '8px'
  },
  medium: {
    height: '40px',
    padding: '11px'
  },
  large: {
    height: '48px',
    padding: '13px'
  },
  disabled: {
    backgroundColor: palette.slateTint(95),
    borderColor: palette.slateTint(80)
  },
  hover: {
    borderColor: palette.slateTint(40)
  },
  active: {
    border: `outline: 3px solid ${palette.gold};`
  }
});

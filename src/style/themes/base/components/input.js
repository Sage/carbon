export default blackWithOpacity => ({
  base: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    flexGrow: 1,
    width: '30px',
    color: blackWithOpacity(0.85),
    fontSize: '14px'
  },
  states: {
    disabled: {
      cursor: 'not-allowed'
    }
  }
});

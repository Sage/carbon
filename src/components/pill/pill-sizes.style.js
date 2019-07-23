export default (css, isClassic, isDeletable) => ({
  small: {
    pill: `
      ${!isClassic && css`
        font-size: 10px;
        min-width: 42px;
        padding: 2px 6px 2px 6px;
      `}
    `,
    button: `
      ${isClassic && `
        border-radius: 0 9px 9px 0;
        padding: ${isDeletable ? '3px 0px 2px 0' : '2px 2px'};
        
        .carbon-icon {
          font-size: 9px;

          &:before {
            font-size: 9px;
          }
        }
      `}
    `
  },
  medium: {
    pill: `
      font-size: 12px;
      border-radius: 16px;
      min-width: 34px;
      padding: ${isDeletable ? '2px 12px 2px 7px' : '2px 7px'};
    `,
    button: `
      border-radius: 0 9px 9px 0;
    `
  },
  large: {
    pill: `
      font-size: 14px;
      border-radius: 24px;
      min-width: 42px;
      padding: ${isDeletable ? '2px 14px 2px 7px' : '2px 7px'};
    `,
    button: `
      border-radius: 0 14px 14px 0;
    `
  }
});

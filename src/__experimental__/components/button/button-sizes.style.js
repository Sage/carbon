export default ({ sizes }) => ({
  small: `
    font-size: ${sizes.text.default};
    height: 32px;
    padding-left: 16px;
    padding-right: 16px;
  `,
  medium: `
    font-size: ${sizes.text.default};
    height: 40px;
    padding-left: 24px;
    padding-right: 24px;
  `,
  large: `
    font-size: 16px;
    height: 48px;
    padding-left: 32px;
    padding-right: 32px;
  `
});

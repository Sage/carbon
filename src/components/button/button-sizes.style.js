export default ({ text }, ml) => ({
  small: `
    font-size: ${text.size};
    height: 32px;
    padding-left: 16px;
    padding-right: 16px;
    margin-left: ${ml || 0};
  `,
  medium: `
    font-size: ${text.size};
    height: 40px;
    padding-left: 24px;
    padding-right: 24px;
    margin-left: ${ml || 0};
  `,
  large: `
    font-size: 16px;
    height: 48px;
    padding-left: 32px;
    padding-right: 32px;
    margin-left: ${ml || 0};
  `
});

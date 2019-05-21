export default ({ text }) => ({
  small: `
    font-size: ${text.size};
    height: 32px;
    padding-left: 16px;
    padding-right: 16px;
  `,
  medium: `
    font-size: ${text.size};
    max-height: 40px;
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

import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';
import buttonTypes from './button-types.style';
import buttonSizes from './button-sizes.style';

const StyledButton = styled.button`
  border: 2px solid transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 600;

  &:focus {
    outline: solid 3px ${({ theme }) => theme.colors.warning};
  }

  ${({ size, theme }) => size === 'small' && css`
    font-size: ${theme.sizes.text.default};
    height: 32px;
    padding-left: 16px;
    padding-right: 16px;
  `}
  ${({ size, theme }) => size === 'medium' && css`
    font-size: ${theme.sizes.text.default};
    height: 40px;
    padding-left: 24px;
    padding-right: 24px;
  `}
  ${({ size }) => size === 'large' && css`
    font-size: 16px;
    height: 48px;
    padding-left: 32px;
    padding-right: 32px;
  `}

  ${stylingForType}
`;

function sizingButton({ size, theme }) {
  const sizeStyle = buttonSizes = buttonSizes(size, theme);
}

function queryColor(disabled) {
  return (color, disabledColor) => {
    if (!color) return 'transparent';
    return disabled ? disabledColor : color;
  };
}

function stylingForType({ disabled, renderAs, theme }) {
  const type = buttonTypes(theme)[renderAs];
  const renderValue = queryColor(disabled);
  return css`
    background: ${renderValue(type.default.background, theme.button.disabled.background)};
    border-color: ${renderValue(type.default.borderColor, theme.button.disabled.text)};
    color: ${renderValue(type.default.color, theme.button.disabled.text)};
    &:hover {
      background: ${renderValue(type.hover.background, theme.button.disabled.background)};
      border-color: ${renderValue(type.hover.borderColor, theme.button.disabled.text)};
      color: ${renderValue(type.hover.color, theme.button.disabled.text)};
    }
  `;
}

StyledButton.defaultProps = {
  theme: baseTheme,
  medium: true
};

export default StyledButton;

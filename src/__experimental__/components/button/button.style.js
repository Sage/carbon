import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';
import buttonTypes from './button-types.style';
import buttonSizes from './button-sizes.style';

const StyledButton = styled.button`
  border: 2px solid transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 600;
  line-height: 16px;

  &:focus {
    outline: solid 3px ${({ theme }) => theme.colors.warning};
  }

  ${stylingForType}
  ${({ theme, size }) => buttonSizes(theme)[size]}
`;

export const StyledButtonChildren = styled.span`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledSubtext = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

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
    background: ${renderValue(type.default.background, theme.colors.disabled.background)};
    border-color: ${renderValue(type.default.borderColor, theme.text.placeholder)};
    color: ${renderValue(type.default.color, theme.colors.disabled.text)};
    &:hover {
      background: ${renderValue(type.hover.background, theme.colors.disabled.background)};
      border-color: ${renderValue(type.hover.borderColor, theme.colors.disabled.text)};
      color: ${renderValue(type.hover.color, theme.colors.disabled.text)};
    }
  `;
}

StyledButton.defaultProps = {
  theme: baseTheme,
  medium: true
};

export default StyledButton;

import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import buttonTypes from './button-types.style';
import buttonSizes from './button-sizes.style';

const StyledButton = styled.button`
  align-items: center;
  border: 2px solid transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  flex-direction: column;
  flex-flow: wrap;
  font-weight: 600;
  justify-content: center;
  vertical-align: middle;

  &:focus {
    outline: solid 3px ${({ theme }) => theme.colors.warning};
  }

  & + & {
    margin-left: 16px;
  }

  ${stylingForType}
  ${({ theme, size }) => buttonSizes(theme)[size]};
  ${({ iconPosition }) => css`
    .carbon-icon {
      margin-left: ${iconPosition === 'before' ? '-4px' : '8px'};
      margin-right: ${iconPosition === 'before' ? '8px' : '-4px'};
    }
  `}

  ${({ theme }) => theme.name === 'classic' && css`
  `}
`;

export const StyledButtonSubtext = styled.span`
  font-size: 14px;
  font-weight: 400;
  display: block;
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
    border-color: ${renderValue(type.default.borderColor, theme.colors.disabled.background)};
    color: ${renderValue(type.default.color, theme.colors.disabled.text)};
    &:hover {
      background: ${renderValue(type.hover.background,
    (renderAs === 'secondary' ? 'transparent' : theme.colors.disabled.background))};
      border-color: ${renderValue(type.hover.borderColor, theme.colors.disabled.background)};
      color: ${renderValue(type.hover.color, theme.colors.disabled.text)};
    }
  `;
}

StyledButton.defaultProps = {
  theme: baseTheme,
  medium: true
};


StyledButton.propTypes = {
  renderAs: PropTypes.string, // Customises appearance, options: 'primary', 'secondary', 'tertiary' or 'destructive'
  children: PropTypes.node.isRequired, // Required, what the button displays
  disabled: PropTypes.bool, // Apply disabled state to the button
  iconPosition: PropTypes.string, // Defines an Icon position within the button 'before' / 'after'
  iconType: PropTypes.string, // Defines an Icon type within the button
  size: PropTypes.string, // Assigns a size to the button
  subtext: PropTypes.string // Second text child, renders under main text, only works when size is "large"
};
export default StyledButton;

import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import buttonTypes from './button-types.style';
import buttonSizes from './button-sizes.style';
import classicConfig from './button-classic-config.style';

const StyledButton = styled.button`
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  flex-direction: column;
  flex-flow: wrap;
  justify-content: center;
  vertical-align: middle;

  ${({ theme }) => theme.name !== 'classic' && stylingForType}
  ${({ theme, size }) => theme.name !== 'classic' && buttonSizes(theme)[size]}

  ${({ theme, renderAs }) => theme.name === 'classic' && classicRenderAs(renderAs) && stylingForClassic}

  ${({ iconPosition }) => css`
    .carbon-icon {
      margin-left: ${iconPosition === 'before' ? '-4px' : '8px'};
      margin-right: ${iconPosition === 'before' ? '8px' : '-4px'};
    }
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
    border: 2px solid transparent;
    background: ${renderValue(type.default.background, theme.colors.disabled.background)};
    border-color: ${renderValue(type.default.borderColor, theme.colors.disabled.background)};
    color: ${renderValue(type.default.color, theme.colors.disabled.text)};
    font-weight: 600;
    &:hover {
      background: ${renderValue(type.hover.background,
    (renderAs === 'secondary' ? 'transparent' : theme.colors.disabled.background))};
      border-color: ${renderValue(type.hover.borderColor, theme.colors.disabled.background)};
      color: ${renderValue(type.hover.color, theme.colors.disabled.text)};
    }
    &:focus {
      outline: solid 3px ${theme.colors.warning};
    }
    & + & {
      margin-left: 16px;
    }
  `;
}

function classicRenderAs(renderAs) {
  return renderAs === 'primary' || renderAs === 'secondary';
}

function stylingForClassic({
  disabled, renderAs, variant, size
}) {
  if (disabled) {
    return css`
      font-weight: 700;
      ${classicConfig.disabled}
      ${classicConfig[size]}
      & + & {
        margin-left: 15px;
      }
    `;
  }
  return css`
    font-weight: 700;
    ${classicConfig[renderAs][variant]}
    ${classicConfig[size]}
    & + & {
      margin-left: 15px;
    }
  `;
}

StyledButton.defaultProps = {
  theme: BaseTheme,
  medium: true,
  renderAs: 'secondary',
  variant: 'blue'
};

StyledButton.propTypes = {
  renderAs: PropTypes.string, // Customises appearance, options: 'primary', 'secondary', 'tertiary' or 'destructive'
  children: PropTypes.node.isRequired, // Required, what the button displays
  disabled: PropTypes.bool, // Apply disabled state to the button
  iconPosition: PropTypes.string, // Defines an Icon position within the button 'before' / 'after'
  iconType: PropTypes.string, // Defines an Icon type within the button
  size: PropTypes.oneOf(['small', 'medium', 'large']), // Assigns a size to the button
  subtext: PropTypes.string, // Second text child, renders under main text, only works when size is "large"
  variant: PropTypes.oneOf(['blue', 'grey', 'magenta', 'magenta-dull', 'red', 'white']) // controls legacy themes
};
export default StyledButton;

import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import buttonTypes from './button-types.style';
import buttonSizes from './button-sizes.style';
import classicConfig from './button-classic-config.style';
import OptionsHelper from '../../utils/helpers/options-helper';

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
    background: ${renderValue(type.default.background, theme.disabled.button)};
    border-color: ${renderValue(type.default.borderColor, theme.disabled.button)};
    color: ${renderValue(type.default.color, theme.disabled.text)};
    font-weight: 600;
    &:hover {
      background: ${renderValue(type.hover.background,
    (renderAs === 'secondary' ? 'transparent' : theme.disabled.button))};
      border-color: ${renderValue(type.hover.borderColor, theme.disabled.button)};
      color: ${renderValue(type.hover.color, theme.disabled.text)};
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
  /** Color variants for new business themes */
  renderAs: PropTypes.oneOf(OptionsHelper.themesBinary),
  /** The text the button displays */
  children: PropTypes.node.isRequired,
  /** Apply disabled state to the button */
  disabled: PropTypes.bool,
  /** Used to transfrom button into anchor */
  href: PropTypes.string,
  /** Defines an Icon position within the button */
  iconPosition: PropTypes.oneOf([...OptionsHelper.buttonIconPositions, '']),
  /** Defines an Icon type within the button */
  iconType: PropTypes.oneOf([...OptionsHelper.icons, '']),
  /** Assigns a size to the button */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** Second text child, renders under main text, only when size is "large" */
  subtext: (props) => {
    if (props.subtext.length > 0 && props.size !== 'large') {
      throw new Error('subtext prop has no effect unless the button is large');
    } else {
      return null;
    }
  },
  /** Set this prop to pass in legacy theme color variants */
  variant: PropTypes.oneOf(OptionsHelper.buttonColors),
  /** Used to transfrom button into anchor */
  to: PropTypes.string
};
export default StyledButton;

import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';
import buttonBaseTheme from './themes/button-base.theme';

// merge the configs and parse them based on props and state of component
const formatStyleObjectKeys = (styleObj) => {
  const regex = /([a-z])([A-Z])/g;

  return Object.entries(styleObj).reduce((acc, [key, val]) => {
    return `${acc} ${key.replace(regex, '$1-$2').toLowerCase()}: ${val};`;
  }, '');
};

const fetchSizeConfig = (size) => {
  if (size === 'small') return formatStyleObjectKeys(buttonBaseTheme.sizes.small);
  if (size === 'medium') return formatStyleObjectKeys(buttonBaseTheme.sizes.medium);
  if (size === 'large') return formatStyleObjectKeys(buttonBaseTheme.sizes.large);
  return {};
};

const StyledButton = styled.button`
  ${(props) => {
    const { theme, size } = props;
    const sizeConfig = fetchSizeConfig(size);

    let mainColor = theme.colors.primary;
    let hoverColor = theme.colors.secondary;
    let cursor = 'pointer';
    let textColors = [theme.colors.white, theme.colors.primary];

    if (props.disabled) {
      mainColor = theme.colors.disabled;
      hoverColor = mainColor;
      cursor = 'not-allowed';
      textColors = textColors.map(() => {
        return theme.colors.text.placeholder;
      });
    }

    let text = textColors[0];
    let backColor = mainColor;
    let hoverText = '';
    let border = `solid 1px ${mainColor}`;

    switch (props.renderAs) {
      case 'primary':

        if (props.darkBackground) {
          backColor = 'transparent';
          text = textColors[1];
          hoverText = textColors[0];
          border = 'none';
        }

        return css`
          border: ${border};
          background: ${backColor};
          color: ${text};
          cursor: ${cursor};
          ${sizeConfig};

          &:hover {
            background: ${hoverColor};
            color: ${hoverText};
          }
          &:focus {
            outline: solid 3px ${theme.colors.warning};
          }
      `;

      case 'secondary':
        return css`
          border: solid 2px ${mainColor};
          background: transparent;
          color: ${textColors[1]};
          cursor: ${cursor};
          ${sizeConfig};

          &:hover {
            border: solid 2px ${hoverColor};
          }
          &:focus {
            outline: solid 3px ${theme.colors.warning};
          }
      `;

      case 'tertiary':
        return css`
          background: transparent;
          color: ${textColors[1]};
          border: none;
          cursor: ${cursor};
          ${sizeConfig};

          &:hover {
            color: ${theme.colors.text.placeholder};
          }
          &:focus {
            outline: solid 3px ${theme.colors.warning};
          }
      `;

      default:
        return css`
          border: ${theme.colors.error};
          background: ${theme.colors.error};
          color: ${textColors[0]};
          cursor: ${cursor};
          ${sizeConfig};

          &:hover {
            background: ${props.disabled && theme.colors.destructiveHover};
          }
          &:focus {
            outline: solid 3px ${theme.colors.warning};
          }
      `;
    }
  }}
`;

StyledButton.defaultProps = {
  theme: baseTheme,
  medium: true
};

export default StyledButton;

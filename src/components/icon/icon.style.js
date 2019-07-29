import styled, { css } from 'styled-components';
import '../../style/fonts/fonts.css';
import classicConfig from './icon-classic-config';
import iconUnicodes from './icon-unicodes';
import classicIconStyles from './icon-classic.style';
import baseTheme from '../../style/themes/base';

const getBackgroundColor = (theme, bgTheme) => {
  switch (bgTheme) {
    case 'info':
      return theme.colors.info;
    case 'error':
      return theme.colors.error;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'business':
      return theme.colors.primary;
    default:
      return 'none';
  }
};

const getFontSize = (fontSize) => {
  switch (fontSize) {
    case 'small':
      return '16px';
    case 'large':
      return '24px';
    default:
      return '16px';
  }
};

const getIconColor = (bgTheme, theme) => {
  if (bgTheme === 'success' || bgTheme === 'warning') return theme.colors.black;
  return theme.colors.white;
};

const StyledIcon = styled.span`
  display: inline-block;
  position: relative;
  color: ${({ theme, bgTheme }) => getIconColor(bgTheme, theme)};

    ${({ bgTheme, bgSize }) => (bgSize || bgTheme)
      && css`
        align-items: center;
        display: inline-flex;
        justify-content: center;
        height: ${classicConfig.sizes[bgSize]};
        width: ${classicConfig.sizes[bgSize]};
    `}

    ${({ bgShape }) => bgShape
      && css`
        border-radius: ${classicConfig.shapes[bgShape]};
      `}

    ${({ bgTheme, theme }) => bgTheme
      && css`
        background-color: ${getBackgroundColor(theme, bgTheme)};
      `}

    ${({ isFont, type, fontSize }) => isFont
      && css`
        &::before {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          font-family: CarbonIcons;
          content: "${iconUnicodes[type]}";
          font-size: ${getFontSize(fontSize)};
          font-style: normal;
          font-weight: normal;
          line-height: getFontSize
          vertical-align: middle;
        }
    `}

    ${classicIconStyles}
`;

StyledIcon.defaultProps = {
  theme: baseTheme
};

const StyledSvgIcon = styled.span`
  display: inline-block;

  .carbon-icon__svg {
    fill: currentColor;
  }
`;

export { StyledIcon, StyledSvgIcon };

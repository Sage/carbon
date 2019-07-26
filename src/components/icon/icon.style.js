import styled, { css } from 'styled-components';
import '../../style/fonts/fonts.css';
import classicConfig from './icon-classic-config';
import iconUnicodes from './icon-unicodes';
import classicIconStyles from './icon-classic.style';

const StyledIcon = styled.span`
  display: inline-block;
  position: relative;
  color: ${({ theme }) => theme.colors.primary};

    ${({ hasShape, bgSize }) => hasShape
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

    ${({ bgTheme }) => bgTheme
      && css`
        background-color: ${classicConfig.backgroundColor[bgTheme]};
      `}

    ${({ isFont, type }) => isFont
      && css`
        &::before {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          font-family: CarbonIcons;
          content: "${iconUnicodes[type]}";
          font-size: 16px;
          font-style: normal;
          font-weight: normal;
          

          line-height: 16px;
          vertical-align: middle;
        }
    `}

    ${classicIconStyles}
`;

const StyledSvgIcon = styled.span`
  display: inline-block;

  .carbon-icon__svg {
    fill: currentColor;
  }
`;

export { StyledIcon, StyledSvgIcon };

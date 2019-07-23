import styled, { css } from 'styled-components';

const iconSizes = {
  small: '24px',
  medium: '32px',
  large: '40px'
};

const iconBackgroundShapes = {
  square: '0%',
  'rounded-rect': '20%',
  circle: '50%'
};

const iconBackgroundColors = {
  default: '#335c6d',
  error: '#C7384F',
  help: '#FFAB00',
  info: '#1573E6',
  maintenance: '#FF7D00',
  new: '#663399',
  success: '#50B848',
  warning: '#FF7D00'
};

const StyledIcon = styled.span`
    
    @font-face {
        font-family: 'CarbonIcons';
        src: url('./fonts/carbon-icons-webfont.woff') format('woff');
    }

  display: inline-block;
  position: relative;

    ${({ hasShape, bgSize }) => hasShape
      && css`
        align-items: center;
        display: inline-flex;
        justify-content: center;
        height: ${iconSizes[bgSize]};
        width: ${iconSizes[bgSize]};
      `}

    ${({ bgShape }) => bgShape
      && css`
        border-radius: ${iconBackgroundShapes[bgShape]};
      `}

    ${({ bgTheme }) => bgTheme
      && css`
        background-color: ${iconBackgroundColors[bgTheme]};
      `}

    ${({ isFont }) => isFont && css`
      &::before {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        font-family: CarbonIcons;
        size: 16px;
        font-style: normal;
        font-weight: normal;

        line-height: 16px;
        vertical-align: middle;
      }
    `}
`;

export default StyledIcon;

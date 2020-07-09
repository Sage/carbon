import styled, { css } from 'styled-components';
import { baseTheme } from '../../style/themes';

const StyledNavigationBar = styled.div`
  ${({ navigationType, theme }) => css`
    min-height: 40px;
    background-color: ${theme.navigationBar.light.background};
    border-bottom: 1px solid ${theme.navigationBar.light.borderBottom};

    ${navigationType === 'dark' && css`
      background-color: ${theme.navigationBar.dark.background};
      border-bottom: 1px solid ${theme.navigationBar.dark.borderBottom};
      color: ${theme.colors.white};
    `}

    .carbon-logo {
      margin-right: 10px;
    }
  
    .carbon-navigation-bar__content {
      line-height: 40px;
    }

    .carbon-navigation-bar__content > * {
      box-sizing: border-box;
      display: inline-block;
      height: 40px;
      vertical-align: middle;
    }
  `}
`;

StyledNavigationBar.defaultProps = {
  theme: baseTheme
};

export default StyledNavigationBar;

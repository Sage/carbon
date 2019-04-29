import styled, { css } from 'styled-components';
import baseTheme from '../../style/themes/base';
import { sidebarClassicStyle, sidebarCloseClassicStyle } from './sidebar-classic.style';

const sidebarSizes = {
  'extra-small': '150px',
  small: '250px',
  'medium-small': '350px',
  medium: '450px',
  'medium-large': '550px',
  large: '650px',
  'extra-large': '750px'
};

const SidebarStyle = styled.div`
  background-color: ${({ theme }) => theme.disabled.input};
  border-radius: 1px;
  bottom: 0;
  position: fixed;
  top: 0;
  z-index: 1002;
  
  ${({ size }) => size && css`
      width: ${sidebarSizes[size]};
  `};

  ${({ position, theme }) => position && css`
      box-shadow: ${theme.shadows.depth3};
      ${position}: 0;
  `};

  ${sidebarClassicStyle}
`;

const SidebarCloseStyle = styled.div`
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 15px;
  z-index: 1;
  color: ${({ theme }) => theme.colors.border};

  &:hover {
      color: ${({ theme }) => theme.colors.focusedIcon};
  };

  ${sidebarCloseClassicStyle}
`;

SidebarStyle.defaultProps = {
  theme: baseTheme
};

SidebarCloseStyle.defaultProps = {
  theme: baseTheme
};

export { SidebarStyle, SidebarCloseStyle };

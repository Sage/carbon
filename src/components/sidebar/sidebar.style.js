import styled, { css } from 'styled-components';
import baseTheme from '../../style/themes/base';
import sidebarClassicStyle from './sidebar-classic.style';
import StyledIconButton from '../icon-button/icon-button.style';

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
  padding: 27px 32px 32px 32px;
  z-index: 1002;

  ${({ size }) => size && css`
      width: ${sidebarSizes[size]};
  `};

  ${({ position, theme }) => position && css`
      box-shadow: ${theme.shadows.depth3};
      ${position}: 0;
  `};

  ${StyledIconButton} {
    z-index: 1;
    right: 25px;
    top: 25px;
  }

  ${sidebarClassicStyle}
`;

SidebarStyle.defaultProps = {
  theme: baseTheme
};

export default SidebarStyle;

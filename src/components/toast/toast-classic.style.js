import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const colors = {
  warning: { color: '#FF7D00', backgroundColor: '#FFF8F2' },
  default: { color: '#335B6D', backgroundColor: '#335B6D' },
  error: { color: '#c7384f', backgroundColor: '#FDF5F5' },
  info: { color: '#1573E6', backgroundColor: '#F3F8FE' },
  new: { color: '#663399', backgroundColor: '#F7F5FA' },
  success: { color: '#50B848', backgroundColor: '#F6FBF6' },
  help: { color: '#FFAB00', backgroundColor: '#FFFBF2' },
  maintenance: { color: '#FF7D00', backgroundColor: '#FFF8F2' }
};

const classicToastTypeStyle = ({ theme, variant }) => theme.name === THEMES.classic && css`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  left: -1px;
  width: 31px;
  background-color: ${colors[variant].color};
  border-radius: 0;
  
  .carbon-icon__svg {
    height: 24px;
    margin-top: -12px;
    width: 30px;

    .carbon-icon__svg-group {
      fill: #fff;
    }
  }
`;

const classicToastStyle = ({ theme, variant }) => theme.name === THEMES.classic && css`
  margin-top: 30px;
  position: fixed;
  right: 30px;
  top: 0;
  width: 300px;
  z-index: 2001;
  box-shadow: 0 15px 20px 0 rgba(2,18,36, 0.2);
  border: none;
  border-radius: 0px;
  background-color: ${colors[variant].backgroundColor};

  &.toast-appear,
  &.toast-enter {
    opacity: 0;
    margin-top: -100px;
  }

  &.toast-appear.toast-appear-active,
  &.toast-enter.toast-enter-active {
    opacity: 1;
    margin-top: 30px;
    transition: all 300ms 1000ms cubic-bezier(0.250, 0.250, 0.000, 1.500);
  }

  &.toast-leave.toast-leave-active {
    opacity: 0;
    right: -360px;
    transition: all 300ms cubic-bezier(0.960, -0.335, 0.750, 0.750);
  }

  strong {
    color: ${colors[variant].color};
  }

  .carbon-toast__close {
    color: ${colors[variant].color};
  }

`;

const classicToastContentStyle = ({ theme }) => theme.name === THEMES.classic && css`
  padding: 15px 20px 15px 50px;
  white-space: pre-wrap;
`;

export { classicToastStyle, classicToastTypeStyle, classicToastContentStyle };

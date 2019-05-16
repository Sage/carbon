import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const colors = {
  warning: { color: '#FF7D00', backgroundColor: '#FFF8F2' },
  default: { color: '#335B6D', backgroundColor: '#335B6D' },
  error: { color: '#D63F40', backgroundColor: '#FDF5F5' },
  info: { color: '#1573E6', backgroundColor: '#F3F8FE' },
  new: { color: '#663399', backgroundColor: '#F7F5FA' },
  success: { color: '#50B848', backgroundColor: '#F6FBF6' },
  help: { color: '#FFAB00', backgroundColor: '#FFFBF2' },
  maintenance: { color: '#FF7D00', backgroundColor: '#FFF8F2' }
};

const classicToastTypeStyle = ({ theme, messageType }) => theme.name === THEMES.classic && css`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  left: -1px;
  width: 31px;
  background-color: ${colors[messageType].color};

  .carbon-toast__type-icon {
    &:before {
      color: #FFF;
      display: block;
      font-size: 16px;
    }
  }

  .carbon-icon__svg {
    height: 24px;
    margin-top: -12px;
    width: 30px;

    .carbon-icon__svg-group {
      fill: #fff;
    }
  }
`;

const classicToastStyle = ({ theme, messageType }) => theme.name === THEMES.classic && css`
  margin-top: 30px;
  position: fixed;
  right: 30px;
  top: 0;
  width: 300px;
  z-index: 2001;
  box-shadow: 0 15px 20px 0 rgba(2,18,36, 0.2);
  border: none;
  background-color: ${colors[messageType].backgroundColor};

  strong {
    color: ${colors[messageType].color};
  }

  .carbon-toast__close {
    color: ${colors[messageType].color};
  }

`;

const classicToastContentStyle = ({ theme }) => theme.name === THEMES.classic && css`
  padding: 15px 50px;
  white-space: pre-wrap;
`;

export { classicToastStyle, classicToastTypeStyle, classicToastContentStyle };

/* eslint-disable max-len */
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';
import messageClassicStyle from './message-classic.style';

const MessageStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  ${({ theme, transparent, messageType }) => (theme.name !== THEMES.classic ? getBorderAndBackgroundStyles(theme, transparent, messageType) : null)}
  ${({ theme }) => (theme.name === THEMES.classic ? messageClassicStyle : null)};
`;

function getBorderAndBackgroundStyles(theme, transparent, messageType) {
  return `
    border: ${transparent ? 'none;' : `1px solid ${theme.colors[messageType]};`}
    background-color: ${transparent ? `${theme.colors.white};` : `${theme.colors.white};`}
  `;
}

MessageStyle.defaultProps = {
  border: true,
  messageType: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

MessageStyle.propTypes = {
  messageType: PropTypes.string,
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default MessageStyle;

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
  border-radius: ${({ roundedCorners }) => (roundedCorners ? '3px;' : '0px;')}
  ${({ theme, transparent, type }) => (theme.name === THEMES.classic ? getBorderAndBackgroundStyles(theme, transparent, type) : null)}
  ${({ theme }) => (theme.name === THEMES.classic ? messageClassicStyle : null)};
`;

function getBorderAndBackgroundStyles(theme, transparent, type) {
  return `
    border: ${transparent ? 'none;' : `border: 1px solid ${theme.colors[type]};`}
    background-color: ${transparent ? `${theme.colors.white};` : `${theme.colors.white};`}
  `;
}

MessageStyle.defaultProps = {
  border: true,
  as: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

MessageStyle.propTypes = {
  as: PropTypes.string,
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default MessageStyle;

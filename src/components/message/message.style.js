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
  border-radius: ${({ roundedCorners }) => (roundedCorners ? '3px;' : '0px;')};
  ${({ transparent, theme, type }) => {
    theme.name === THEMES.classic
      ? `
  border: ${transparent ? 'none;' : `border: 1px solid ${theme.colors[type]};`}
  background-color: ${transparent ? `${theme.colors.white};` : `${theme.colors.white};`}
  `
      : null;
  }}
  ${({ theme }) => (theme.name === THEMES.classic ? messageClassicStyle : null)};
`;

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

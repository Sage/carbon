import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';
import messageClassicStyle from './message-classic.style';

const MessageStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  ${({ roundedCorners }) => (roundedCorners
    ? css`
          border-radius: 3px;
        `
    : css`
          border-radius: none;
        `)}
  ${({ transparent, theme, type }) => (transparent
    ? css`
          border: none;
          background-color: ${theme.colors.white};
        `
    : css`
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors[type]};
        `)}
  ${({ theme }) => (theme.name === THEMES.classic ? messageClassicStyle : null)}
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

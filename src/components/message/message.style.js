import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import messageClassicStyling from './message-classic.style';

const MessageStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  border: 1px solid ${({ theme, messageType }) => theme.colors[messageType]};
  background-color: ${({ theme }) => theme.colors.white};

  ${({ transparent }) => transparent && css`
      border: none;
  `}

  ${messageClassicStyling}
`;

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

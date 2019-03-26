import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const MessageStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  ${({ theme, type, transparent }) => theme.name === 'classic'
    && !transparent
    && css`
      background-color: ${(type === 'info' && '#f3f8fe')
        || (type === 'warning' && '#fff8f2')
        || (type === 'error' && '#fdf5f5')
        || (type === 'success' && '#dcf1da')};
    `} 
  ${({ roundedCorners }) => roundedCorners
    && css`
      border-radius: 3px;
    `}
  ${({ border, theme, type }) => border
    && css`
      border: 1px solid
        ${(type === 'info' && theme.colors.info)
          || (type === 'warning' && theme.colors.warning)
          || (type === 'error' && theme.colors.error)
          || (type === 'success' && theme.colors.success)};
    `}
    ${({ transparent }) => transparent
      && css`
        border: none;
      `}
`;

MessageStyle.propTypes = {
  as: PropTypes.oneOf(['error', 'success', 'warning', 'info']),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default MessageStyle;

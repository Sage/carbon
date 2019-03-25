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
const MessageContentStyle = styled.div`
  padding: 15px 20px;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.text.color};
`;
const MessageBodyStyle = styled.div``;
const MessageTitleStyle = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.text.size}
  color: ${({ type, theme }) => (type === 'info' && theme.colors.info)
    || (type === 'warning' && theme.colors.warning)
    || (type === 'error' && theme.colors.error)
    || (type === 'success' && theme.colors.success)};
`;

const MessageIconContainerStyle = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 30px;
  text-align: center;
  
  ${({ roundedCorners }) => roundedCorners
    && css`
      border-radius: 3px 0 0 3px;
    `}
  background-color: 
    ${({ type, theme }) => (type === 'info' && theme.colors.info)
      || (type === 'warning' && theme.colors.warning)
      || (type === 'error' && theme.colors.error)
      || (type === 'success' && theme.colors.success)};
    ${({ transparent, theme }) => transparent
      && css`
        background-color: ${theme.colors.white};
      `}

    span {
        &:before {
            color: 
                ${({ type, theme }) => (type === 'info' && theme.colors.info)
                  || (type === 'warning' && theme.colors.warning)
                  || (type === 'error' && theme.colors.error)
                  || (type === 'success' && theme.colors.success)};
            
                ${({ transparent, theme }) => !transparent
                  && css`
                    color: ${theme.colors.white};
                  `}
            display: block;
            font-size: 16px;
        }
    }
`;

const MessageCloseIconContainerStyle = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  justify-content: center;
  text-align: center;
  width: 45px;

  span {
    cursor: pointer;
    &:before {
      font-size: 16px;
      display: block;
      color: ${({ theme, type }) => (type === 'info' && theme.colors.info)
        || (type === 'warning' && theme.colors.warning)
        || (type === 'error' && theme.colors.error)
        || (type === 'success' && theme.colors.success)};
    }
  }
`;

MessageStyle.defaultProps = {
  as: 'info',
  border: true,
  roundedCorners: true,
  transparent: false
};

MessageStyle.propTypes = {
  as: PropTypes.oneOf(['error', 'success', 'warning', 'info']),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export {
  MessageStyle,
  MessageContentStyle,
  MessageBodyStyle,
  MessageTitleStyle,
  MessageIconContainerStyle,
  MessageCloseIconContainerStyle
};

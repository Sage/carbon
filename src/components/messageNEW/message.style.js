import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../icon';
import baseTheme from '../../style/themes/base';

const MessageStyle = styled.div`
  position: relative;
  ${({ theme }) => console.log(theme)}
  display: flex;
  justify-content: flex-start;
  align-content: center;
  ${({ roundedCorners }) => roundedCorners
    && css`
      border-radius: 3px;
    `}
  ${({ border }) => border
    && css`
      border: 1px solid
        ${({ type, theme }) => (type === 'info' && theme.colors.info)
          || (type === 'warning' && theme.colors.warning)
          || (type === 'error' && theme.colors.error)
          || (type === 'success' && theme.colors.success)};
    `}
`;
const MessageContentStyle = styled.div`
  padding: 15px 20px;
  white-space: pre-wrap;
`;
const MessageBodyStyle = styled.div``;
const MessageTitleStyle = styled.div`
  font-weight: bold;
`;
const MessageIconContainerStyle = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 30px;
  text-align: center;
  ${({ roundedCorners }) => roundedCorners
    && css`
      border-radius: 3px;
    `}
  background-color: ${({ type, theme }) => (type === 'info' && theme.colors.info)
    || (type === 'warning' && theme.colors.warning)
    || (type === 'error' && theme.colors.error)
    || (type === 'success' && theme.colors.success)};
`;

const MessageCloseIconContainerStyle = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  justify-content: center;
  text-align: center;
  border-radius: 3px 0 0 3px;
  width: 45px;
`;

const MessageCloseIconStyle = styled(Icon)`
  cursor: pointer;
  &:before {
    font-size: 16px;
    display: block;
  }
`;

const MessageIconStyle = styled(Icon)`
  &:before {
    color: ${({ theme }) => theme.colors.white};
    display: block;
    font-size: 16px;
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
  MessageCloseIconStyle,
  MessageIconStyle,
  MessageCloseIconContainerStyle
};

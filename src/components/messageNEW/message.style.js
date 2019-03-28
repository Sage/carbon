import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import classicConfig from './message-classic-config.style';

const MessageStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;

  ${({ roundedCorners }) => roundedCorners
    && css`
      border-radius: 3px;
    `}

  ${({
    theme, type, transparent, border
  }) => theme.name === 'classic' && styligForClassic(type, transparent, border)}
  ${({ theme, type, transparent }) => theme.name !== 'classic' && stylingForType(type, theme, transparent)}
`;

function stylingForType(type, theme, transparent) {
  if (transparent) {
    return css`
      border: none;
    `;
  }

  return css`
    background-color: #fff;
    border: 1px solid
      ${(type === 'info' && theme.colors.info)
        || (type === 'warning' && theme.colors.warning)
        || (type === 'error' && theme.colors.error)
        || (type === 'success' && theme.colors.success)};
  `;
}

function styligForClassic(type, transparent, border) {
  if (transparent) {
    return css`
      border: none;
      background-color: ${classicConfig.transparent.backgroundColor};
    `;
  }

  if (!border) {
    return css`
      border: none;
      background-color: ${classicConfig[type].backgroundColor};
    `;
  }

  return css`
    background-color: ${classicConfig[type].backgroundColor};
    border: 1px solid ${classicConfig[type].borderColor};
  `;
}

MessageStyle.propTypes = {
  as: PropTypes.string,
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default MessageStyle;

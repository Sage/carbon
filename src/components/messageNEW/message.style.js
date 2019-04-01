import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import classicConfig from './message-classic-config.style';
import BaseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';

const MessageStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  ${addCornersStyle}
  ${addProperStyles}
`;

function addCornersStyle(props) {
  const { roundedCorners } = props;
  if (roundedCorners) {
    return css`
      border-radius: 3px;
    `;
  }
  return css`
    border-radius: none;
  `;
}

function addProperStyles(props) {
  const {
    theme, type, transparent, border
  } = props;
  if (theme.name === THEMES.classic) return stylingForClassic(type, transparent, border, theme);
  return stylingForType(type, theme, transparent);
}

function stylingForType(type, theme, transparent) {
  if (transparent) {
    return css`
      border: none;
      background-color: ${theme.colors.white};
    `;
  }

  return css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors[type]};
  `;
}

function stylingForClassic(type, transparent, border) {
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

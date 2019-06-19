import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { THEMES } from '../../style/themes';
import BaseTheme from '../../style/themes/base';
import Icon from '../icon';
import OptionsHelper from '../../utils/helpers/options-helper';

/* eslint-disable key-spacing, no-multi-spaces */

const sizeParams = {
  'extra-small':  { dimensions: 24,  iconDimensions: 16 },
  small:          { dimensions: 32,  iconDimensions: 16 },
  'medium-small': { dimensions: 40,  iconDimensions: 24 },
  medium:         { dimensions: 56,  iconDimensions: 32 },
  'medium-large': { dimensions: 72,  iconDimensions: 32 },
  large:          { dimensions: 104, iconDimensions: 48 },
  'extra-large':  { dimensions: 128, iconDimensions: 64 }
};

const sizeParamsClassic = {
  'extra-small':  { dimensions: 25,  iconDimensions: null, iconPadding: 4  },
  small:          { dimensions: 30,  iconDimensions: null, iconPadding: 6  },
  'medium-small': { dimensions: 40,  iconDimensions: 24,   iconPadding: 12 },
  medium:         { dimensions: 60,  iconDimensions: 32,   iconPadding: 14 },
  'medium-large': { dimensions: 70,  iconDimensions: 32,   iconPadding: 18 },
  large:          { dimensions: 100, iconDimensions: 48,   iconPadding: 25 },
  'extra-large':  { dimensions: 120, iconDimensions: 64,   iconPadding: 27 }
};

/* eslint-enable key-spacing, no-multi-spaces */

function isThemeClassic(theme) {
  return (theme.name === THEMES.classic);
}

function stylingForBorder(props) {
  if (isThemeClassic(props.theme) || props.darkBackground || props.showGravatar || props.showCustomImg) {
    return css``;
  }

  if (props.showIcon) {
    return css`border: 1px dashed ${props.theme.portrait.border};`;
  }

  if (props.showInitials) {
    return css`border: 1px solid ${props.theme.portrait.border};`;
  }

  return css``;
}

function stylingForSize({ size, theme }) {
  const params = (isThemeClassic(theme) ? sizeParamsClassic[size] : sizeParams[size]);

  if (!params) {
    return css``;
  }

  return css`
    width:  ${params.dimensions}px;
    height: ${params.dimensions}px;
  `;
}

function stylingForShape({ shape }) {
  switch (shape) {
    case 'standard': return css`border-radius: 0px;`;
    case 'circle': return css`border-radius: 50%;`;
    case 'leaf': return css`border-radius: 10% 40% 10%;`;
    default: return css``;
  }
}

function stylingForIcon({ size, theme, darkBackground }) {
  const isClassic = isThemeClassic(theme);
  const params = (isClassic ? sizeParamsClassic[size] : sizeParams[size]);

  if (!params) {
    return css``;
  }

  let color = theme.portrait.border;
  let backgroundColor = theme.portrait.background;
  let iconPadding = (params.dimensions - params.iconDimensions) / 2;

  if (darkBackground) {
    color = theme.portrait.background;
    backgroundColor = theme.portrait.border;
  }

  if (isClassic) {
    color = (darkBackground ? '#ffffff' : '#335c6d');
    backgroundColor = (darkBackground ? '#668592' : '#ccd6db');
    iconPadding = params.iconPadding;
  }

  return css`
    padding:          ${iconPadding}px;
    background-color: ${backgroundColor};
    color:            ${color};

    ${params.iconDimensions && css`
      svg {
        width:  ${params.iconDimensions}px;
        height: ${params.iconDimensions}px;
      }
    `}

    ${isClassic && css`
      border: 1px solid #8099a4;
    `}
  `;
}


export const StyledInitialsImage = styled.img`
  position: absolute;
  ${stylingForSize}
`;

StyledInitialsImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};


export const StyledAvatarImage = styled.img`
  display:  inline-block;
  position: absolute;
  ${stylingForSize}
`;

StyledAvatarImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.string
};

StyledAvatarImage.defaultProps = {
  size: 'medium'
};


// && is used here to increase the specificity
export const StyledIcon = styled(
  ({ darkBackground, ...rest }) => <Icon { ...rest } />
)`
  && {
    position:    absolute;
    box-sizing:  border-box;
    line-height: 14px;
    ${stylingForSize}
    ${stylingForIcon}
    ${stylingForShape}
  }
`;

StyledIcon.propTypes = {
  darkBackground: PropTypes.bool,
  size: PropTypes.oneOf(OptionsHelper.sizesFull),
  theme: PropTypes.object,
  type: PropTypes.string.isRequired
};

StyledIcon.defaultProps = {
  darkBackground: false,
  size: 'medium',
  theme: BaseTheme
};


const StyledPortrait = styled.div`
  display:        inline-block;
  position:       relative;
  vertical-align: middle;
  overflow:       hidden;
  ${stylingForBorder}
  ${stylingForSize}
  ${stylingForShape}
`;

StyledPortrait.propTypes = {
  size: PropTypes.oneOf(OptionsHelper.sizesFull),
  shape: PropTypes.oneOf(OptionsHelper.shapesVaried),
  showIcon: PropTypes.bool,
  showInitials: PropTypes.bool,
  showGravatar: PropTypes.bool,
  showCustomImg: PropTypes.bool,
  darkBackground: PropTypes.bool,
  theme: PropTypes.object
};

StyledPortrait.defaultProps = {
  size: 'medium',
  shape: 'standard',
  showIcon: false,
  showInitials: false,
  showGravatar: false,
  showCustomImg: false,
  darkBackground: false,
  theme: BaseTheme
};

export default StyledPortrait;

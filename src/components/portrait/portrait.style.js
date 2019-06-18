import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import BaseTheme from '../../style/themes/base';
import Icon from '../icon';
import OptionsHelper from '../../utils/helpers/options-helper';

const sizeParams = {
  'extra-small': { dimensions: 24, iconDimensions: 16 },
  small: { dimensions: 32, iconDimensions: 16 },
  'medium-small': { dimensions: 40, iconDimensions: 24 },
  medium: { dimensions: 56, iconDimensions: 32 },
  'medium-large': { dimensions: 72, iconDimensions: 32 },
  large: { dimensions: 104, iconDimensions: 48 },
  'extra-large': { dimensions: 128, iconDimensions: 64 }
};

function stylingForSize({ size }) {
  const params = sizeParams[size];

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
  const params = sizeParams[size];

  if (!params) {
    return css``;
  }

  const iconPadding = (params.dimensions - params.iconDimensions) / 2;

  return css`
    padding:          ${iconPadding}px;
    background-color: ${theme.colors.previewBackground};
    color:            ${theme.colors.focusedIcon};

    ${params.iconDimensions && css`
      svg {
        width:  ${params.iconDimensions}px;
        height: ${params.iconDimensions}px;
      }
    `}

    ${darkBackground && css`
      background-color: ${theme.colors.border};
      color:            ${theme.colors.white};
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
  }
`;

StyledIcon.propTypes = {
  darkBackground: PropTypes.bool,
  size: PropTypes.string,
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
  ${stylingForSize}
  ${stylingForShape}
  ${({ showBorder, theme }) => (showBorder && css`
    border: 1px dashed ${theme.colors.border};
  `)}
`;

StyledPortrait.propTypes = {
  size: PropTypes.oneOf(OptionsHelper.sizesFull),
  shape: PropTypes.oneOf(OptionsHelper.shapesVaried),
  showBorder: PropTypes.bool,
  theme: PropTypes.object
};

StyledPortrait.defaultProps = {
  size: 'medium',
  shape: 'standard',
  showBorder: false,
  theme: BaseTheme
};

export default StyledPortrait;

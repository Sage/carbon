import React           from 'react';
import styled, { css } from 'styled-components';
import PropTypes       from 'prop-types';

import BaseTheme from '../../style/themes/base';
import Icon      from '../icon';

const sizeParams = {
  'extra-small':  { dimensions:  25, iconPadding:  4, iconDimensions: null },
  'small':        { dimensions:  30, iconPadding:  6, iconDimensions: null },
  'medium-small': { dimensions:  40, iconPadding: 12, iconDimensions: 24   },
  'medium':       { dimensions:  60, iconPadding: 14, iconDimensions: 32   },
  'medium-large': { dimensions:  70, iconPadding: 18, iconDimensions: 32   },
  'large':        { dimensions: 100, iconPadding: 25, iconDimensions: 48   },
  'extra-large':  { dimensions: 120, iconPadding: 27, iconDimensions: 64   }
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
    case 'standard':  return css`border-radius: 0px;`;
    case 'circle':    return css`border-radius: 50%;`;
    case 'leaf':      return css`border-radius: 10% 40% 10%;`;
    default:          return css``;
  }

}

function stylingForIcon({ size, theme, darkBackground }) {

  const params = sizeParams[size];

  if (!params) {
    return css``;
  }

  return css`
    padding:          ${params.iconPadding}px;
    border: solid 1px ${theme.colors.border};
    background-color: ${theme.colors.previewBackground};
    color:            ${theme.colors.focusedIcon};

    ${params.iconDimensions && css`
      width:  ${params.iconDimensions}px;
      height: ${params.iconDimensions}px;
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
  src:  PropTypes.string.isRequired,
  alt:  PropTypes.string,
  size: PropTypes.string
};

StyledAvatarImage.defaultProps = {
  size: 'medium'
};


export const StyledIcon = styled(
  ({ darkBackground, ...rest }) => <Icon {...rest} />
)`
  position:    absolute;
  box-sizing:  border-box;
  line-height: 14px;
  ${stylingForIcon}
`;

StyledIcon.propTypes = {
  darkBackground: PropTypes.bool,
  size:           PropTypes.string,
  theme:          PropTypes.object,
  type:           PropTypes.string.isRequired
};

StyledIcon.defaultProps = {
  darkBackground: false,
  size:           'medium',
  theme:          BaseTheme
};


const StyledPortrait = styled.div`
  display:        inline-block;
  position:       relative;
  vertical-align: middle;
  overflow:       hidden;
  ${stylingForSize}
  ${stylingForShape}
`;

StyledPortrait.propTypes = {
  size:  PropTypes.string,
  shape: PropTypes.string
};

StyledPortrait.defaultProps = {
  size:  'medium',
  shape: 'standard'
};

export default StyledPortrait;

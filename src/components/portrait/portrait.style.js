import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import getSizeParams from './portrait-size.config';
import BaseTheme from '../../style/themes/base';
import Icon from '../icon';
import OptionsHelper from '../../utils/helpers/options-helper';
import { isClassic } from '../../utils/helpers/style-helper';

function stylingForSize({ size, theme }) {
  const params = getSizeParams(theme, size);

  if (!params) {
    return css``;
  }

  return css`
    width:  ${params.dimensions}px;
    height: ${params.dimensions}px;
  `;
}

function stylingForShape({ shape }) {
  let cssString = `
    position: absolute;
    overflow: hidden;
  `;

  if (shape === 'standard') cssString += 'border-radius: 0px;';
  if (shape === 'square') cssString += 'border-radius: 0px;';
  if (shape === 'circle') cssString += 'border-radius: 50%;';
  if (shape === 'leaf') cssString += 'border-radius: 10% 40% 10%;';

  return css`${cssString}`;
}

function stylingForIcon({ size, theme, darkBackground }) {
  const isThemeClassic = isClassic(theme);
  const params = getSizeParams(theme, size);

  if (!params) {
    return css``;
  }

  let color = theme.portrait.border;
  let backgroundColor = theme.portrait.background;
  let iconPadding = ((params.dimensions - params.iconDimensions) / 2) - 1;

  if (darkBackground) {
    color = theme.portrait.background;
    backgroundColor = theme.portrait.border;
  }

  if (isThemeClassic) {
    color = (darkBackground ? '#ffffff' : '#335c6d');
    backgroundColor = (darkBackground ? '#668592' : '#ccd6db');
    iconPadding = params.iconPadding;
  }

  return css`
    padding: ${iconPadding}px;
    background-color: ${backgroundColor};
    color: ${color};

    ${params.iconDimensions && css`
      svg {
        width:  ${params.iconDimensions}px;
        height: ${params.iconDimensions}px;
      }
    `}

    ${isThemeClassic && css`
      border: 1px solid #8099a4;
    `}
  `;
}

export function getColorsForInitials(theme, darkBackground) {
  if (isClassic(theme)) {
    return {
      textColor: (darkBackground ? '#FFFFFF' : '#636872'),
      bgColor: (darkBackground ? '#8A8E95' : '#D8D9DC')
    };
  }

  return {
    textColor: (darkBackground ? theme.portrait.background : theme.portrait.initials),
    bgColor: (darkBackground ? theme.portrait.initials : theme.portrait.background)
  };
}


export const StyledPortraitInitials = styled.div`
  ${stylingForShape}
  ${({ theme }) => !isClassic(theme) && css`border: 1px solid ${theme.portrait.border};`}
`;

StyledPortraitInitials.propTypes = {
  theme: PropTypes.object,
  shape: PropTypes.oneOf([...OptionsHelper.shapesVaried, ...OptionsHelper.shapesPortrait])
};

StyledPortraitInitials.defaultProps = {
  theme: BaseTheme,
  shape: 'square'
};


export const StyledPortraitInitialsImg = styled.img`
  display: block;
`;

StyledPortraitInitialsImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};


export const StyledPortraitGravatar = styled.img`
  display: inline-block;
  ${stylingForSize}
  ${stylingForShape}
`;

StyledPortraitGravatar.propTypes = {
  shape: PropTypes.oneOf([...OptionsHelper.shapesVaried, ...OptionsHelper.shapesPortrait]),
  size: PropTypes.oneOf([...OptionsHelper.sizesFull, ...OptionsHelper.sizesPortrait]).isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};


export const StyledCustomImg = styled.img`
  display: inline-block;
  ${stylingForSize}
  ${stylingForShape}
`;

StyledCustomImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  shape: PropTypes.oneOf([...OptionsHelper.shapesVaried, ...OptionsHelper.shapesPortrait]),
  size: PropTypes.oneOf([...OptionsHelper.sizesFull, ...OptionsHelper.sizesPortrait]).isRequired
};


// && is used here to increase the specificity
export const StyledIcon = styled(
  ({ darkBackground, ...rest }) => <Icon { ...rest } />
)`
  && {
    box-sizing: border-box;
    line-height: 14px;
    ${stylingForSize}
    ${stylingForIcon}
    ${stylingForShape}
    ${({ theme }) => !isClassic(theme) && css`border: 1px dashed ${theme.portrait.border};`}
  }
`;

StyledIcon.propTypes = {
  darkBackground: PropTypes.bool,
  size: PropTypes.oneOf([...OptionsHelper.sizesFull, ...OptionsHelper.sizesPortrait]),
  shape: PropTypes.oneOf([...OptionsHelper.shapesVaried, ...OptionsHelper.shapesPortrait]),
  theme: PropTypes.object,
  type: PropTypes.string.isRequired
};

StyledIcon.defaultProps = {
  darkBackground: false,
  size: 'M',
  shape: 'square',
  theme: BaseTheme
};


const StyledPortrait = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  ${stylingForSize}
`;

StyledPortrait.propTypes = {
  size: PropTypes.oneOf([...OptionsHelper.sizesFull, ...OptionsHelper.sizesPortrait]),
  darkBackground: PropTypes.bool,
  theme: PropTypes.object
};

StyledPortrait.defaultProps = {
  size: 'M',
  darkBackground: false,
  theme: BaseTheme
};

export default StyledPortrait;

import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import classicThemeForPill from './pill-classic.style';
import smallTheme from '../../style/themes/small';
import styleConfig from './pill.style.config';
import { THEMES } from '../../style/themes';
import OptionsHelper from '../../utils/helpers/options-helper';

// all DLS themes currently default to Small, as others are introduced this
// function should be updated to correctly allow them.
// eventually we can remove it altogether.
const setTheme = (theme) => {
  switch (theme.name) {
    case THEMES.classic:
    case THEMES.base:
      return smallTheme;

    default:
      return theme;
  }
};

const PillStyle = styled.span`
 ${({
    colorVariant, theme, inFill, isDeletable, pillRole
  }) => {
    const { colors } = baseTheme;
    const correctedThemeConfig = styleConfig(setTheme(theme));
    const styleSet = correctedThemeConfig[pillRole];
    const { boxShadow, hoverColor } = correctedThemeConfig;
    Object.assign(styleSet, {
      boxShadow,
      hoverColor
    });
    const variety = (pillRole === 'status') ? colorVariant : 'primary';

    return css`
      border: 2px solid ${styleSet[variety].color};
      border-radius: 12px;
      font-size: 14px;
      padding: 2px 7px;
      font-weight: 600;
      position: relative;
      top: -1px;
      margin: 0px 8px 16px 0px;
      min-height: 15px;
      display: inline-block;

      ${inFill && css`
        background-color: ${styleSet[variety].color};
        color: ${(variety === 'warning') ? colors.black : colors.white};
      `}

      ${!isClassic(theme, colorVariant) && !isDeletable && css`
        padding: 2px 8px 2px 8px;
      `}

      ${!isClassic(theme, colorVariant) && isDeletable && css`
        padding: 2px 27px 2px 8px;

        button {
          -webkit-appearance: none;
          border-radius: 0 9px 9px 0;
          border: none;
          bottom: 0;
          font-size: 100%;
          margin: 0;
          padding: 0 22px 2px 0;
          position: absolute;
          right: 0;
          top: 0;
          width: 17px;

          ${inFill && css`
            background-color: ${styleSet[variety].color};
            color: ${(variety === 'warning') ? colors.black : styleSet.hoverColor};
          `}

          ${!inFill && css`
            background-color: transparent;
            color: ${colors.black};
          `}

          &:focus {
            outline: none;
            box-shadow: 0 0 0 3px ${styleSet.boxShadow};
            background-color: ${styleSet[variety].buttonFocus};
            color: ${(variety === 'warning') ? colors.black : styleSet.hoverColor} !important;
            ::-moz-focus-inner {
              border: 0;
            }
          }

          &:hover {
            background-color: ${styleSet[variety].buttonFocus};
            color: ${(variety === 'warning') ? colors.black : styleSet.hoverColor};
            cursor: pointer;
          }
 
          .carbon-icon {
            font-size: 12px;
            padding: 0 4px;

            &:hover, 
            &:focus {
              color: ${(variety === 'warning') ? colors.black : styleSet.hoverColor};
            }
            &:before {
              font-size: 12px;
            }
          }
      `}

      ${isClassic(theme, colorVariant) && classicThemeForPill(colorVariant, inFill, isDeletable)}
    `;
  }
}
`;

function isClassic(theme, colorVariant) {
  // handles incorrect default activeTheme in StoryBook AppWrapper
  if (OptionsHelper.pillColors.includes(colorVariant)) {
    return false;
  }
  return theme.name === THEMES.classic;
}

PillStyle.defaultProps = {
  inFill: false,
  colorVariant: 'default',
  isDeletable: false,
  theme: baseTheme
};

PillStyle.propTypes = {
  inFill: PropTypes.bool,
  colorVariant: PropTypes.string,
  isDeletable: PropTypes.func
};

export default PillStyle;

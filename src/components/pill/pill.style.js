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
    const correctedTheme = setTheme(theme);
    const styleSet = styleConfig(correctedTheme)[pillRole];
    const color = (pillRole === 'status') ? colorVariant : 'primary';

    return css`
      border: 2px solid ${styleSet[color]};
      border-radius: 12px;
      font-size: 14px;
      padding: 2px 7px;
      font-weight: 600;
      position: relative;
      top: -1px;
      margin: 0px 8px 16px 0px;

      ${inFill && css`
        background-color: ${styleSet[color]};
        color: ${colors.white};

        .carbon-icon.icon-cross {
          color: ${colors.white};
        }
      `}

      ${!isClassic(theme, colorVariant) && !isDeletable && css`
        padding: 2px 8px 2px 8px;
      `}

      ${!isClassic(theme, colorVariant) && isDeletable && css`
        padding: 2px 27px 2px 8px;

        &:hover,
        &:focus {
          box-shadow: 0 0 0 3px ${styleSet.boxShadow};
        }

        button {
          -webkit-appearance: none;
          border-radius: 0 9px 9px 0;
          border: none;
          bottom: 0;
          font-size: 100%;
          margin: 0;
          padding: 0 23px 0 0;
          position: absolute;
          right: 0;
          top: 0;
          width: 17px;

          ${inFill && css`
            background-color: ${styleSet[color]};
          `}

          ${!inFill && css`
            background-color: transparent;
          `}

          &:hover {
            background-color: ${styleSet[color]};
            color: ${styleSet.hoverColor};
          }
 
          .carbon-icon {
            font-size: 12px;
            padding: 0 4px;
            
            &:before {
              font-size: 12px;
            }

            &:hover,
            &:focus {
              color: ${styleSet.hoverColor};
            }

            ${inFill && css`
              .carbon-icon {
                color: ${styleSet[color]};
              }
            `}
          }
      `}

      ${isClassic(theme, colorVariant) && classicThemeForPill(colorVariant, inFill, isDeletable)}
    `;
  }
}
`;

function isClassic(theme, colorVariant) {
  // handles incorrect default activeTheme in StoryBook AppWrapper
  if (OptionsHelper.pillColours.includes(colorVariant)) {
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

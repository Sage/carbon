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
    colorVariant, theme, inFill, isDeletable, pillRole, size
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
      font-size: 10px;
      letter-spacing: 0.7px;
      font-weight: 600;
      position: relative;
      display: inline-block;
      text-align: center;
      margin-top: 1px;

      ${inFill && css`
        background-color: ${styleSet[variety].color};
        color: ${(variety === 'warning') ? colors.black : colors.white};
      `}

      ${!isClassic(theme, colorVariant) && isDeletable && css`
        button {
          -webkit-appearance: none;
          border-radius: 0 6px 6px 0;
          border: none;
          bottom: 0;
          font-size: 100%;
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;

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
            background-color: ${styleSet[variety].color};
            color: ${(variety === 'warning') ? colors.black : styleSet.hoverColor};
            cursor: pointer;
          }
 
          .carbon-icon {
            padding: 0 7px;

            &:hover, 
            &:focus {
              color: ${(variety === 'warning') ? colors.black : styleSet.hoverColor};
            }
          }
        }

        ${size === 'S' && css`
          padding: 0 20px 0 8px;

          button {
            padding: 0;

            .carbon-icon {
              padding: 0;

              &:before {
                font-size: 7px;
              }
            }
          }
        `}

        ${size === 'M' && css`
          padding: 0 28px 0 12px;
          border-radius: 12px;

          button {
            width: 24px;
            padding: 0;
            border-radius: 0 8px 8px 0;

            .carbon-icon {
              padding: 2px 7px 3px 7px;
              margin-top: -1px;

              &:before {
                font-size: 10px;
              }
            }
          }
        `}

        ${size === 'L' && css`
          padding: 0 32px 0 16px;
          border-radius: 13px;

          button {
            width: 28px;
            padding: 0;
            border-radius: 0 10px 10px 0;

            .carbon-icon {
              padding: 3px 8px 4px 8px;
              margin-top: -1px;

              &:before {
                font-size: 12px;
              }
            }
          }
        `}

        ${size === 'XL' && css`
          padding: 0 36px 0 20px;
          border-radius: 15px;

          button {
            width: 32px;
            padding: 0;
            border-radius: 0 12px 12px 0;

            .carbon-icon {
              padding: 3px 9px 5px 9px;
              margin-top: -1px;

              &:before {
                font-size: 13px;
              }
            }
          }
        `}
      `}

      ${!isClassic(theme, colorVariant) && !isDeletable && css`
        ${size === 'S' && css`
          padding: 0 20px 0 8px;

          button {
            padding: 0;

            .carbon-icon {
              padding: 0;

              &:before {
                font-size: 7px;
              }
            }
          }
        `}

        ${size === 'M' && css`
          padding: 0 28px 0 12px;
          border-radius: 12px;

          button {
            width: 24px;
            padding: 0;
            border-radius: 0 8px 8px 0;

            .carbon-icon {
              padding: 2px 7px 3px 7px;
              margin-top: -1px;

              &:before {
                font-size: 10px;
              }
            }
          }
        `}

        ${size === 'L' && css`
          padding: 0 32px 0 16px;
          border-radius: 13px;

          button {
            width: 28px;
            padding: 0;
            border-radius: 0 10px 10px 0;

            .carbon-icon {
              padding: 3px 8px 4px 8px;
              margin-top: -1px;

              &:before {
                font-size: 12px;
              }
            }
          }
        `}

        ${size === 'XL' && css`
          padding: 0 36px 0 20px;
          border-radius: 15px;

          button {
            width: 32px;
            padding: 0;
            border-radius: 0 12px 12px 0;

            .carbon-icon {
              padding: 3px 9px 5px 9px;
              margin-top: -1px;

              &:before {
                font-size: 13px;
              }
            }
          }
        `}
      `}

      ${isClassic(theme, colorVariant) && classicThemeForPill(colorVariant, inFill, isDeletable, size)}

      ${size === 'S' && css`
        height: 16px;
        line-height: 16px;
        font-size: 10px;
      `}

      ${size === 'M' && css`
        height: 20px;
        line-height: 20px;
        font-size: 12px;
      `}

      ${size === 'L' && css`
        height: 24px;
        line-height: 24px;
        font-size: 14px;
      `}

      ${size === 'XL' && css`
        height: 26px;
        line-height: 26px;
        font-size: 16px;
      `}
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
  isDeletable: PropTypes.func,

  /** Assigns a size to the pill */
  size: PropTypes.oneOf(OptionsHelper.pillSizesRestricted)
};

export default PillStyle;

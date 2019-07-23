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
      padding: 2px 7px;
      font-weight: 600;
      position: relative;
      top: -1px;
      margin: 0px 8px 16px 0px;
      min-height: 15px;
      min-width: 24px;
      display: inline-block;
      text-align: center;

      ${inFill && css`
        background-color: ${styleSet[variety].color};
        color: ${(variety === 'warning') ? colors.black : colors.white};
      `}

      ${!isClassic(theme, colorVariant) && !isDeletable && css`
        padding: 4px 8px 2px 8px;
      `}

      ${!isClassic(theme, colorVariant) && isDeletable && css`
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
            padding: 0 4px;

            &:hover, 
            &:focus {
              color: ${(variety === 'warning') ? colors.black : styleSet.hoverColor};
            }
          }
        }

        ${size === 'small' && css`
        
        min-width: 38px;
        padding: 4px 7px 2px 2px;

          button {
            padding: 0px 7px 2px 2px;

            .carbon-icon {
              padding: 3px 2px;

              &:before {
                font-size: 8px;
              }
            }
          }
        `}

        ${size === 'medium' && css`
          min-width: 42px;
          padding: 4px 10px 4px 2px;
          font-size: 12px;

            button {
              padding: 2px 2px 2px 0px;

              .carbon-icon {
                padding: 0px 3px;

                &:before {
                  font-size: 10px;
                }
              }
            }
        `}

        ${size === 'large' && css`
          min-width: 48px;
          padding: 4px 10px 4px 2px;
          font-size: 14px;

            button {
              width: 19px;
              padding: 2px 2px 2px 0px;

              .carbon-icon {

                &:before {
                  font-size: 11px;
                }
              }
            }
        `}
      `}

      ${!isClassic(theme, colorVariant) && !isDeletable && css`
        ${size === 'small' && css`
        font-size: 10px;
        min-width: 38px;
        padding: 4px 7px 3px 7px;

          button {
            padding: 0px 7px 2px 2px;

            .carbon-icon {
              padding: 3px 2px;

              &:before {
                font-size: 8px;
              }
            }
          }
        `}

        ${size === 'medium' && css`
          min-width: 42px;
          padding: 4px 8px;
          font-size: 12px;

            button {
              padding: 2px 2px 2px 0px;

              .carbon-icon {
                padding: 0px 3px;

                &:before {
                  font-size: 10px;
                }
              }
            }
        `}

        ${size === 'large' && css`
          min-width: 48px;
          padding: 4px 10px;
          font-size: 14px;

            button {
              width: 19px;
              padding: 2px 2px 2px 0px;

              .carbon-icon {

                &:before {
                  font-size: 11px;
                }
              }
            }
        `}
      `}

      ${isClassic(theme, colorVariant) && classicThemeForPill(colorVariant, inFill, isDeletable)}
      
      ${isClassic(theme, colorVariant) && !isDeletable && css`
        ${size === 'small' && css`
          font-size: 10px;

          button {
            .carbon-icon {
              &:before {
                font-size: 8px;
              }
            }
          }
        `}

        ${size === 'medium' && css`
          font-size: 12px;
          min-width: 38px;
          padding: 4px 8px 4px 8px;
        `}

        ${size === 'large' && css`
          font-size: 14px;
          min-width: 46px;
          padding: 4px 8px 4px 8px;
        `}
      `};

      ${isClassic(theme, colorVariant) && isDeletable && css`
        ${size === 'small' && css`
          font-size: 10px;
          padding: 2px 16px 2px 8px;

          button {
            .carbon-icon {
              font-size: 13px;

              &:before {
                font-size: 8px;
              }
            }
          }
        `}

        ${size === 'medium' && css`
          font-size: 12px;
          min-width: 38px;
          padding: 4px 10px 4px 4px;

          button {
            .carbon-icon {
              font-size: 13px;
              
              &:before {
                font-size: 10px;
              }
            }
          }
        `}

        ${size === 'large' && css`
          font-size: 14px;
          min-width: 46px;
          padding: 4px 8px 4px 2px;

          button {
            .carbon-icon {
              &:before {
                font-size: 11px;
              }
            }
          }
        `}
      `};
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
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted)
};

export default PillStyle;

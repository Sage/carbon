import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import classicThemeForPill from './pill-classic.style';
import styleConfig from './pill.style.config';
import { baseTheme } from '../../style/themes';
import { isClassic } from '../../utils/helpers/style-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledIcon from '../icon/icon.style';

function addStyleToPillIcon(padding, fontSize, margin) {
  return `
    ${StyledIcon} {
      padding: ${padding};
      margin-top: ${margin};

      &:before {
        font-size: ${fontSize};
      }
    }
  `;
}

const PillStyle = styled.span`
 ${({
    colorVariant, theme, inFill, isDeletable, pillRole, size
  }) => {
    const { colors, text } = baseTheme;

    let carbonColor = colorVariant;
    if (!isClassic(theme) && !hasCarbonColorVariant(colorVariant)) {
      carbonColor = 'neutral';
    }
    const variety = (pillRole === 'status') ? carbonColor : 'primary';
    const { varietyColor, buttonFocus } = styleConfig(theme)[pillRole][variety];

    return css`
      border-radius: 12px;
      font-size: 10px;
      letter-spacing: 0.7px;
      font-weight: 600;
      position: relative;
      display: inline-block;
      text-align: center;

      ${hasCarbonColorVariant(carbonColor) && css`
        border: 2px solid ${varietyColor};
        height: auto;

        ${inFill && css`
          background-color: ${varietyColor};
          color: ${(variety === 'warning') ? text.color : colors.white};
        `}

        ${size === 'S' && css`
          min-height: 16px;
          line-height: 16px;
          font-size: 10px;
        `}

        ${size === 'M' && css`
          min-height: 20px;
          line-height: 20px;
          font-size: 12px;
        `}

        ${size === 'L' && css`
          min-height: 24px;
          line-height: 24px;
          font-size: 14px;
        `}

        ${size === 'XL' && css`
          min-height: 26px;
          line-height: 26px;
          font-size: 16px;
        `}

        ${isDeletable && css`
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
            margin: 0;
            line-height: 16px;

            ${inFill && css`
              background-color: ${varietyColor};
              color: ${(variety === 'warning') ? text.color : colors.white};
              ${StyledIcon} {
                color: ${(variety === 'warning') ? text.color : colors.white};
              }
            `}

            ${!inFill && css`
              background-color: transparent;
              color: ${text.color};
            `}

            &:focus {
              outline: none;
              box-shadow: 0 0 0 3px ${colors.focus};
              background-color: ${buttonFocus};
              & { color: ${(variety === 'warning') ? text.color : colors.white} }
              ::-moz-focus-inner {
                border: 0;
              }
              ${StyledIcon} {
                color: ${(variety === 'warning') ? text.color : colors.white};
              }
            }

            &:hover {
              background-color: ${buttonFocus};
              color: ${(variety === 'warning') ? text.color : colors.white};
              cursor: pointer;
              ${StyledIcon} {
                color: ${(variety === 'warning') ? text.color : colors.white};
              }
            }
  
            ${StyledIcon} {
              font-size: 12px;
              padding: 0 4px;

              &:hover, 
              &:focus {
                color: ${(variety === 'warning') ? text.color : colors.white};
              }
            }
          }

          ${size === 'S' && css`
            padding: 0 24px 0 7px;

            button {
              padding: 0;
              border-radius: 0 8px 8px 0;
              line-height: 14px;

              ${addStyleToPillIcon('0', '7px')}
            }
          `}

          ${size === 'M' && css`
            padding: 0 32px 0 11px;
            border-radius: 12px;

            button {
              width: 24px;
              padding: 0;
              border-radius: 0 10px 10px 0;
              line-height: 15px;

              ${addStyleToPillIcon('2px 7px 3px 7px', '10px')}
            }
          `}

          ${size === 'L' && css`
            padding: 0 36px 0 15px;
            border-radius: 13px;

            button {
              width: 28px;
              padding: 0;
              border-radius: 0 11px 11px 0;
              line-height: 16px;

              ${addStyleToPillIcon('3px 8px 4px 8px', '12px', '1px')}
            }
          `}

          ${size === 'XL' && css`
            padding: 0 41px 0 19px;
            border-radius: 15px;

            button {
              width: 32px;
              padding: 0;
              border-radius: 0 12px 12px 0;
              line-height: 18px;

              ${addStyleToPillIcon('3px 9px 5px 9px', '13px', '1px')}
            }
          `}
        `}

        ${!isDeletable && css`
          ${size === 'S' && css`
            padding: 0 7px;

            button {
              padding: 0;
            }
          `}

          ${size === 'M' && css`
            padding: 0 11px;
            border-radius: 12px;

            button {
              width: 24px;
              padding: 0;
              border-radius: 0 8px 8px 0;
            }
          `}

          ${size === 'L' && css`
            padding: 0 15px;
            border-radius: 13px;

            button {
              width: 28px;
              padding: 0;
              border-radius: 0 10px 10px 0;
            }
          `}

          ${size === 'XL' && css`
            padding: 0 19px;
            border-radius: 15px;

            button {
              width: 32px;
              padding: 0;
              border-radius: 0 12px 12px 0;
            }
          `}
        `}
      `}

      ${isClassic(theme) && classicThemeForPill(colorVariant, inFill, isDeletable, size)}
    `;
  }
}
`;

function hasCarbonColorVariant(colorVariant) {
  return [...OptionsHelper.pillColors, 'warning'].includes(colorVariant);
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

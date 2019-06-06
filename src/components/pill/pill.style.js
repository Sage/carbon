import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import classicThemeForPill from './pill-classic.style';
import styleConfig from './pill.style.config';
import { THEMES } from '../../style/themes';
import OptionsHelper from '../../utils/helpers/options-helper';

const PillStyle = styled.span`
 ${({
    colourVariant, theme, inFill, isDeletable
  }) => {
    const { colors } = baseTheme;
    const themeName = (theme.name === THEMES.classic || theme.name === THEMES.base) ? THEMES.small : theme.name;
    const styleSet = styleConfig[themeName];

    return css`
      border: 2px solid ${styleSet.colors[colourVariant]};
      border-radius: 12px;
      font-size: 14px;
      padding: 2px 7px;
      font-weight: 600;
      position: relative;
      top: -1px;
      margin: 0px 8px 16px 0px;
    
      ${inFill && css`
        background-color: ${styleSet.colors[colourVariant]};
        color: ${colors.white};

        .carbon-icon.icon-cross {
          color: ${colors.white};
        }
      `}

      ${!isClassic(theme, colourVariant) && !isDeletable && css`
        padding: 2px 8px 2px 8px;
      `}

      ${!isClassic(theme, colourVariant) && isDeletable && css`
        padding: 2px 27px 2px 8px;

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
            background-color: ${styleSet.colors[colourVariant]};
          `}

          ${!inFill && css`
            background-color: transparent;
          `}

          &:hover {
            background-color: ${styleSet.colors[colourVariant]};
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
                color: ${styleSet.colors[colourVariant]};
              }
            `}
          }
      `}

      ${isClassic(theme, colourVariant) && classicThemeForPill(colourVariant, inFill, isDeletable)}
    `;
  }
}
`;

function isClassic(theme, colourVariant) {
  // handles incorrect default activeTheme in StoryBook AppWrapper
  if (OptionsHelper.pillColours.includes(colourVariant)) {
    return false;
  }
  return theme.name === THEMES.classic;
}

PillStyle.defaultProps = {
  inFill: false,
  colourVariant: 'default',
  isDeletable: false,
  theme: baseTheme
};

PillStyle.propTypes = {
  inFill: PropTypes.bool,
  colourVariant: PropTypes.string,
  isDeletable: PropTypes.func
};

export default PillStyle;

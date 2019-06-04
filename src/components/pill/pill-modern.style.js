import { css } from 'styled-components';
import modernConfig from './pill-modern.config';
import { THEMES } from '../../style/themes';

export default ({
  styledAs, theme, inFill, isDeletable
}) => {
  // default theme to small where no theme provided
  theme.name = (theme.name === THEMES.base) ? THEMES.small : theme.name;
  const styleSet = modernConfig[theme.name];

  return css`
      border: 2px solid ${styleSet.colors[styledAs]};
      border-radius: 12px;
      font-size: 14px;
      padding: 2px 7px;
      font-weight: 600;
      position: relative;
      top: -1px;
      margin: 0px 8px 16px 0px;
    
      ${inFill && css`
      background-color: ${styleSet.colors[styledAs]};
      color: #FFFFFF;

      .carbon-icon.icon-cross {
        color: #FFFFFF;
      }
    `}

      ${!isDeletable && css`
        padding: 2px 8px 2px 8px;
      `}

      ${isDeletable && css`
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
            background-color: ${styleSet.colors[styledAs]};
          `}
  
          ${!inFill && css`
            background-color: transparent;
          `}
  
            &:hover {
              background-color: ${styleSet.colors[styledAs]};
              color: ${styleSet.hoverColor[styledAs]};
            }
          .carbon-icon {
            font-size: 12px;
            padding: 0 4px;
            
  
            &:before {
              font-size: 12px;
            }
  
            ${inFill && css`
              .carbon-icon {
                color: ${styleSet.colors[styledAs]};
              }
            `}
  
            &:hover,
            &:focus {
              color: ${styleSet.colors[styledAs]};
            }
          }
      `}
  `;
};

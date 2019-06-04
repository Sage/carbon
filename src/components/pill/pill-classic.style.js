import { css } from 'styled-components';

export const classicStyleConfig = {
  disabled: {
    color: '#CCD6DA'
  },
  default: {
    color: '#335B6D',
    hoverBackgroundColor: '#004b87',
    hoverColor: '#FFFFFF'
  },
  error: {
    color: '#C7384F',
    hoverBackgroundColor: '#C11E20',
    hoverColor: '#FFFFFF'
  },
  help: {
    color: '#FFAB00',
    hoverBackgroundColor: '#FFDA7F',
    hoverColor: '#FFFFFF'
  },
  info: {
    color: '#1573E6',
    hoverBackgroundColor: '#1573E6',
    hoverColor: '#FFFFFF'
  },
  maintenance: {
    color: '#FF7D00',
    hoverBackgroundColor: '#FF5400',
    hoverColor: '#FFFFFF'
  },
  warning: {
    color: '#FF7D00',
    hoverBackgroundColor: '#FF5400',
    hoverColor: '#FFFFFF'
  },
  new: {
    color: '#663399',
    hoverBackgroundColor: '#E0D6EB',
    hoverColor: '#FFFFFF'
  },
  success: {
    color: '#50B848',
    hoverBackgroundColor: '#4782F7',
    hoverColor: '#FFFFFF'
  }
};

export default ({ styledAs, inFill, isDeletable }) => {
  const colourSet = classicStyleConfig[styledAs];

  return css`
    border-radius: 10px; 
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: 0.7px;
    position: relative;
    text-align: center;

    .common-input & {
      font-size: 13px;
      line-height: 13px;
    }
   
    border: 1px solid ${colourSet.color};
    color: ${colourSet.color};

    ${styledAs !== 'disabled' && `
      .carbon-icon{
        &:hover,
          &:focus {
            cursor: pointer;
          }
      }
    `}
    ${inFill && css`
      background-color: ${colourSet.color};
      color: #FFFFFF;

      .carbon-icon.icon-cross {
        color: #FFFFFF;
      }
    `}

    ${!isDeletable && css`
      padding: 2px 7px;
    `}

    ${isDeletable && css`
      padding: 2px 19px 2px 7px;

      button {
        -webkit-appearance: none;
        border-radius: 0 9px 9px 0;
        border: none;
        bottom: 0;
        font-size: 100%;
        margin: 0;
        padding: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 17px;

        ${inFill && css`
          background-color: ${colourSet.color};
        `}

        ${!inFill && css`
          background-color: transparent;
          color: ${colourSet.color};
        `}

          &:hover {
            background-color: ${colourSet.hoverBackgroundColor};
            color: ${colourSet.hoverColor};
          }
        .carbon-icon {
          font-size: 14px;
          margin-left: -1px;

          &:before {
            font-size: 9px;
          }

          ${inFill && css`
            .carbon-icon {
              color: ${colourSet.color};
            }
          `}

          &:hover,
          &:focus {
            color: ${colourSet.hoverColor};
          }
        }
      }
    `};
  `;
};

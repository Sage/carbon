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
    hoverBackgroundColor: '#004b87',
    hoverColor: '#FFFFFF'
  },
  help: {
    color: '#FFAB00',
    hoverBackgroundColor: '#004b87',
    hoverColor: '#FFFFFF'
  },
  info: {
    color: '#1573E6',
    hoverBackgroundColor: '#004b87',
    hoverColor: '#FFFFFF'
  },
  maintenance: {
    color: '#FF7D00',
    hoverBackgroundColor: '#004b87',
    hoverColor: '#FFFFFF'
  },
  warning: {
    color: '#FF7D00',
    hoverBackgroundColor: '#004b87',
    hoverColor: '#FFFFFF'
  },
  new: {
    color: '#663399',
    hoverBackgroundColor: '#004b87',
    hoverColor: '#FFFFFF'
  },
  success: {
    color: '#50B848',
    hoverBackgroundColor: '#004b87',
    hoverColor: '#FFFFFF'
  }
};

export default (colorVariant, inFill, isDeletable) => {
  const colorSet = classicStyleConfig[colorVariant];

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
   
    border: 1px solid ${colorSet.color};
    color: ${colorSet.color};

    ${colorVariant !== 'disabled' && `
      .carbon-icon{
        &:hover,
        &:focus {
          cursor: pointer;
        }
      }
    `}

    ${inFill && css`
      background-color: ${colorSet.color};
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
          background-color: ${colorSet.color};
        `}

        ${!inFill && css`
          background-color: transparent;
          color: ${colorSet.color};
        `}

        &:hover {
          background-color: ${colorSet.hoverBackgroundColor};
          color: ${colorSet.hoverColor};
        }
        
        .carbon-icon {
          font-size: 14px;
          margin-left: -1px;

          ${inFill && css`
            color: ${colorSet.color};
          `}

          &:before {
            font-size: 9px;
          }

          &:hover,
          &:focus {
            color: ${colorSet.hoverColor};
          }
        }
      }
    `};
  `;
};

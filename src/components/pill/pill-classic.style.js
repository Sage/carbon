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

export default (colorVariant, inFill, isDeletable, size) => {
  const colorSet = classicStyleConfig[colorVariant];

  return css`
    border-radius: 10px; 
    display: inline-block;
    font-weight: 700;
    letter-spacing: 0.7px;
    position: relative;
    text-align: center;
    padding: 0 20px 0 8px;
    margin-top: 1px;

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
      ${size === 'S' && css`
        padding: 0 12px;

        button {
          .carbon-icon {
            &:before {
              font-size: 8px;
            }
          }
        }
      `}

      ${size === 'M' && css`
        padding: 0 16px;
        border-radius: 12px;
      `}

      ${size === 'L' && css`
        padding: 0 20px;
        border-radius: 13px;
      `}

      ${size === 'XL' && css`
        padding: 0 24px;
        border-radius: 15px;
      `}
    `}

    ${isDeletable && css`
      button {
        -webkit-appearance: none;
        border-radius: 0 6px 6px 0;
        border: none;
        bottom: 0;
        font-size: 100%;
        margin: 0;
        padding: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;

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
          padding: 0 7px;

          ${inFill && css`
            color: ${colorSet.color};
          `}

          &:hover,
          &:focus {
            color: ${colorSet.hoverColor};
          }
        }
      }

      ${size === 'S' && css`
        padding: 0 24px 0 12px;

        button {
          border-radius: 0 7px 7px 0;

          .carbon-icon {
            &:before {
              font-size: 7px;
            }
          }
        }
      `}

      ${size === 'M' && css`
        padding: 0 32px 0 16px;
        border-radius: 12px;

        button {
          width: 24px;
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
        padding: 0 36px 0 20px;
        border-radius: 13px;

        button {
          width: 28px;
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
        padding: 0 40px 0 24px;
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
    `};
  `;
};

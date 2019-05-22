import { css } from 'styled-components';

const styleConfig = {
  disabled: {
    color: '#CCD6DA',
    bgColor: '#CCD6DA'
  },
  default: {
    color: '#335B6D',
    bgColor: '#335B6D',
    hoverBgColor: '#004b87',
    hoverColor: '#FFFFFF'
  },
  error: {
    color: '#C7384F',
    bgColor: '#C7384F',
    hoverBgColor: '#C11E20',
    hoverColor: '#FFFFFF'
  },
  help: {
    color: '#FFAB00',
    bgColor: '#FFAB00',
    hoverBgColor: '#FFDA7F',
    hoverColor: '#FFFFFF'
  },
  info: {
    color: '#1573E6',
    bgColor: '#1573E6',
    hoverBgColor: '#1573E6',
    hoverColor: '#FFFFFF'
  },
  maintenance: {
    color: '#FF7D00',
    bgColor: '#FF7D00',
    hoverBgColor: '#FF5400',
    hoverColor: '#FFFFFF'
  },
  warning: {
    color: '#FF7D00',
    bgColor: '#FF7D00',
    hoverBgColor: '#FF5400',
    hoverColor: '#FFFFFF'
  },
  new: {
    color: '#663399',
    bgColor: '#663399',
    hoverBgColor: '#E0D6EB',
    hoverColor: '#FFFFFF'
  },
  success: {
    color: '#50B848',
    bgColor: '#50B848',
    hoverBgColor: '#4782F7',
    hoverColor: '#FFFFFF'
  }
};

export default (props) => {
  const colourSet = styleConfig[props.styledAs];

  return css`
    border-radius: 10px; 
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.7px;
    position: relative;
    text-align: center;

    .common-input & {
      font-size: 13px;
      line-height: 13px;
    }
   
    border:1px solid ${colourSet.bgColor};
    color: ${colourSet.color};

    ${props.styledAs !== 'disabled' && `
      .carbon-icon{
        &:hover,
          &:focus {
            cursor: pointer;
          }
      }
    `}
    ${props.inFill && `
      background-color: ${colourSet.bgColor};
      color: #FFFFFF;

      .carbon-icon.icon-cross {
        color: #FFFFFF;
      }
    `}

    ${!props.isDeletable && `
      padding: 2px 7px;
    `}

    ${props.isDeletable && `
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

        ${props.inFill && `
          background-color: ${colourSet.color};
        `}

        ${!props.inFill && `
          background-color: transparent;
          color: ${colourSet.color};
        `}

          &:hover {
            background-color: ${colourSet.hoverBgColor};
            color: ${colourSet.hoverColor};
          }
        .carbon-icon {
          font-size: 14px;
          margin-left: -1px;

          &:before {
            font-size: 9px;
          }

          ${props.inFill && `
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

import { css } from 'styled-components';

const styleConfig = {
  disabled: {
    color: '#99adb6'
  },
  default: {
    color: '#335B6D',
    hoverColor: '#668491'
  },
  error: {
    color: '#C7384F',
    hoverColor: '#C11E20'
  },
  help: {
    color: '#FFAB00',
    hoverColor: '#FFDA7F'
  },
  info: {
    color: '#1573E6',
    hoverColor: '#D0E3FA'
  },
  maintenance: {
    color: '#FF7D00',
    hoverColor: '#FF5400'
  },
  warning: {
    color: '#FF7D00',
    hoverColor: '#FF5400'
  },
  new: {
    color: '#663399',
    hoverColor: '#E0D6EB'
  },
  success: {
    color: '#50B848',
    hoverColor: '#4782F7'
  }
};

export default (props) => {
  const colourSet = styleConfig[props.styledAs];
  const { theme } = props;
  return css`
    border-radius: 10px; 
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.7px;
    padding: 2px 7px;
    position: relative;
    text-align: center;

    .common-input & {
      font-size: 13px;
      line-height: 13px;
    }
   
    border:1px solid ${theme.colors.primary};
    color: ${colourSet.color};
    .carbon-icon.icon-cross {
      color: ${colourSet.color}
    }

    ${props.inFill && `
      background-color: ${colourSet.color};
      color: #FFF;

      .carbon-icon.icon-cross {
        color: #FFF
      }
    `}

    ${props.isDeletable && `
      padding-right: 19px;

      button {
        -webkit-appearance: none;
        background-color: transparent;
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

        ${props.styledAs !== 'disabled' && `
          &:hover {
            background-color: ${colourSet.hoverColor};
            color: ${colourSet.color};
            cursor: pointer;
          }
        `};

        .carbon-icon {
          font-size: 14px;
          margin-left: -1px;

          &:before {
            font-size: 9px;
          }
        }
      }
    `};
  `;
};

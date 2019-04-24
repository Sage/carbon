import { css } from 'styled-components';

const blue = {
  default: '#255bc7',
  hover: '#1e499f'
};

const grey = {
  default: '#335c6d',
  hover: '#003349'
};

const magenta = {
  default: '#ed1c5f',
  hover: '#be164c'
};

const magentaDull = {
  default: '#ca2a60',
  hover: '#be164c'
};

const red = {
  default: '#c7384f',
  hover: '#9f2d3f'
};

const white = {
  default: '#ffffff',
  hover: '#cccccc',
  text: '#1b1d21'
};

const buttonStyles = {
  primary: {
    blue: `
      background: ${blue.default};
      border: 1px solid transparent;
      color: ${white.default};
      &:hover {
        background: ${blue.hover};
        border: 1px solid ${blue.hover};
        color: ${white.default};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(25,99,246,.6);
        outline: none;
      }
    `,
    grey: `
      background: ${grey.hover};
      border: 1px solid transparent;
      color: ${white.default};
      &:hover {
        background: ${blue.default};
        border: 1px solid ${blue.default};
        color: ${white.default};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(51,92,109,.6);
        outline: none;
      }
    `,
    magenta: `
      background: ${magenta.default};
      border: 1px solid transparent;
      color: ${white.default};
      &:hover {
        background: ${magenta.hover};
        border: 1px solid ${magenta.hover};
        color: ${white.default};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(243,46,109,.6);
        outline: none;
      }
    `,
    'magenta-dull': `
      background: ${magentaDull.default};
      border: 1px solid transparent;
      color: ${white.default};
      &:hover {
        background: ${magentaDull.hover};
        border: 1px solid ${magentaDull.hover};
        color: ${white.default};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(213,85,128,.6);
        outline: none;
      }
    `,
    red: `
      background: ${red.default};
      border: 1px solid transparent;
      color: ${white.default};
      &:hover {
        background: ${red.hover};
        border: 1px solid ${red.hover};
        color: ${white.default};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(228,44,45,.6);
        outline: none;
      }
    `,
    white: `
      background: ${white.default};
      border: 1px solid transparent;
      color: rgba(0,0,0, 85);
      &:hover {
        background: ${white.hover};
        border: 1px solid ${white.hover};
        color: ${white.text};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(51,92,109,.6);
        outline: none;
      }
    `
  },
  secondary: {
    blue: `
      background: transparent;
      border: 1px solid ${blue.default};
      color: ${blue.default};
      &:hover {
        background: ${blue.hover};
        border: 1px solid ${blue.hover};
        color: ${white.default};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(25,99,246,.6);
        outline: none;
        background: ${blue.hover};
        border: 1px solid ${blue.hover};
        color: ${white.default};
      }
    `,
    grey: `
      background: transparent;
      border: 1px solid ${grey.default};
      color: ${grey.default};
      &:hover {
        background: ${grey.hover};
        border: 1px solid ${grey.hover};
        color: ${white.default};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(51,92,109,.6);
        outline: none;
        background: ${grey.hover};
        border: 1px solid ${grey.hover};
        color: ${white.default};
      }
    `,
    magenta: `
      background: transparent;
      border: 1px solid ${magenta.default};
      color: ${magenta.default};
      &:hover {
        background: ${magenta.hover};
        border: 1px solid ${magenta.hover};
        color: ${white.default};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(243,46,109,.6);
        outline: none;
        background: ${magenta.hover};
        border: 1px solid ${magenta.hover};
        color: ${white.default};
      }
    `,
    'magenta-dull': `
      background: transparent;
      border: 1px solid ${magentaDull.default};
      color: ${magentaDull.default};
      &:hover {
        background: ${magentaDull.hover};
        border: 1px solid ${magentaDull.hover};
        color: ${white.default};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(213,85,128,.6);
        outline: none;
        background: ${magentaDull.hover};
        border: 1px solid ${magentaDull.hover};
        color: ${white.default};
      }
    `,
    red: `
      background: transparent;
      border: 1px solid ${red.default};
      color: ${red.default};
      &:hover {
        background: ${red.hover};
        border: 1px solid ${red.hover};
        color: ${white.default};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(228,44,45,.6);
        outline: none;
        background: ${red.hover};
        border: 1px solid ${red.hover};
        color: ${white.default};
      }
    `,
    white: `
      background: transparent;
      border: 1px solid ${white.default};
      color: rgba(0,0,0, 85);
      &:hover {
        background: ${white.hover};
        border: 1px solid ${white.hover};
        color: ${white.text};
      }
      &:focus {
        box-shadow: 0 0 6px rgba(51,92,109,.6);
        outline: none;
      }
    `
  },
  disabled: `
    background: #e6ebed;
    border: 1px solid transparent;
    color: rgba(0,0,0,.2);
    cursor: default;
    &:hover {
      background: #e6ebed;
      border: 1px solid transparent;
      color: rgba(0,0,0,.2);
    }
  `,
  small: `
    border-radius: 0;
    font-size: 11px;
    height: 25px;
    letter-spacing: .5px;
    padding: 2px 10px;
  `,
  medium: `
    border-radius: 0;
    font-size: 14px;
    height: 31px;
    line-height: 16px;
    margin-left: 0;
    margin-right: 0;
    padding: 0 18px;
  `,
  large: `
    border-radius: 0;
    font-size: 14px;
    height: 43px;
    line-height: 16px;
    margin-left: 0;
    margin-right: 0;
    padding: 0 20px;
  `
};

export default ({
  disabled, colorVariant, variant, size
}) => {
  if (disabled) {
    return css`
      box-sizing: border-box;
      font-weight: 700;
      ${buttonStyles.disabled}
      ${buttonStyles[size]}
        & + & {
        margin-left: 15px;
      }
    `;
  }

  return css`
    box-sizing: border-box;
    font-weight: 700;
    ${buttonStyles[colorVariant][variant]}
    ${buttonStyles[size]}
    text-decoration: none;
    
    & + & {
      margin-left: 15px;
    }
  `;
};

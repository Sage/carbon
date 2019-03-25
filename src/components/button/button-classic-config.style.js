export default {
  primary: {
    blue: `
      background: #255bc7;
      border: 1px solid transparent;
      color: #ffffff;
      &:hover {
        background: #1e499f;
        border: 1px solid #1e499f;
        color: #ffffff;
      }
      &:focus {
        box-shadow: 0 0 6px rgba(25,99,246,.6);
        outline: none;
      }
    `,
    grey: `
      background: #335c6d;
      border: 1px solid transparent;
      color: #ffffff;
      &:hover {
        background: #003349;
        border: 1px solid #003349;
        color: #ffffff;
      }
      &:focus {
        box-shadow: 0 0 6px rgba(51,92,109,.6);
        outline: none;
      }
    `,
    magenta: `
      background: #ed1c5f;
      border: 1px solid transparent;
      color: #ffffff;
      &:hover {
        background: #be164c;
        border: 1px solid #be164c;
        color: #ffffff;
      }
      &:focus {
        box-shadow: 0 0 6px rgba(243,46,109,.6);
        outline: none;
      }
    `,
    'magenta-dull': `
      background: #ca2a60;
      border: 1px solid transparent;
      color: #ffffff;
      &:hover {
        background: #A2224A;
        border: 1px solid #A2224A;
        color: #ffffff;
      }
      &:focus {
        box-shadow: 0 0 6px rgba(213,85,128,.6);
        outline: none;
      }
    `,
    red: `
      background: #c7384f;
      border: 1px solid transparent;
      color: #ffffff;
      &:hover {
        background: #9f2d3f;
        border: 1px solid #9f2d3f;
        color: #ffffff;
      }
      &:focus {
        box-shadow: 0 0 6px rgba(228,44,45,.6);
        outline: none;
      }
    `,
    white: `
      background: #ffffff;
      border: 1px solid transparent;
      color: rgba(0,0,0,85);
      &:hover {
        background: #ccc;
        border: 1px solid #ccc;
        color: #1b1d21;
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
      border: 1px solid #255bc7;
      color: #255bc7;
      &:hover {
        background: #1e499f;
        border: 1px solid #1e499f;
        color: #ffffff;
      }
      &:focus {
        box-shadow: 0 0 6px rgba(25,99,246,.6);
        outline: none;
        background: #1e499f;
        border: 1px solid #1e499f;
        color: #ffffff;
      }
    `,
    grey: `
      background: transparent;
      border: 1px solid #335c6d;
      color: #335c6d;
      &:hover {
        background: #003349;
        border: 1px solid #003349;
        color: #ffffff;
      }
      &:focus {
        box-shadow: 0 0 6px rgba(51,92,109,.6);
        outline: none;
        background: #003349;
        border: 1px solid #003349;
        color: #ffffff;
      }
    `,
    magenta: `
      background: transparent;
      border: 1px solid #ed1c5f;
      color: #ed1c5f;
      &:hover {
        background: #be164c;
        border: 1px solid #be164c;
        color: #ffffff;
      }
      &:focus {
        box-shadow: 0 0 6px rgba(243,46,109,.6);
        outline: none;
        background: #be164c;
        border: 1px solid #be164c;
        color: #ffffff;
      }
    `,
    'magenta-dull': `
      background: transparent;
      border: 1px solid #ca2a60;
      color: #ca2a60;
      &:hover {
        background: #A2224A;
        border: 1px solid #A2224A;
        color: #ffffff;
      }
      &:focus {
        box-shadow: 0 0 6px rgba(213,85,128,.6);
        outline: none;
        background: #A2224A;
        border: 1px solid #A2224A;
        color: #ffffff;
      }
    `,
    red: `
      background: transparent;
      border: 1px solid #c7384f;
      color: #c7384f;
      &:hover {
        background: #9f2d3f;
        border: 1px solid #9f2d3f;
        color: #ffffff;
      }
      &:focus {
        box-shadow: 0 0 6px rgba(228,44,45,.6);
        outline: none;
        background: #9f2d3f;
        border: 1px solid #9f2d3f;
        color: #ffffff;
      }
    `,
    white: `
      background: transparent;
      border: 1px solid #ffffff;
      color: rgba(0,0,0,85);
      &:hover {
        background: #ccc;
        border: 1px solid #ccc;
        color: #1b1d21;
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

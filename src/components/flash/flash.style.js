import styled, { css } from 'styled-components';

const colors = {
  warning: '#FF7D00',
  default: '#335B6D',
  error: '#c7384f',
  info: '#1573E6',
  new: '#663399',
  success: '#50B848',
  help: '#FFAB00',
  maintenance: '#FF7D00'
};

const requireWhiteTextColor = [
  'error',
  'new',
  'info'
];

const FlashStyle = styled.div`
  bottom: 0px;
  overflow: hidden;
  position: fixed;
  right: 0;
  text-align: center;
  width: 100%;

    > div {
    display: inline-block;
    height: 100%;
    width: 100%;
  };

    ${({ variant }) => variant && css`
        .carbon-flash__slider {
          background: ${colors[variant]};
        };

        ${requireWhiteTextColor.includes(variant) && `
        
          .carbon-flash__message,
          .carbon-flash__close,
          .carbon-flash__icon:before {
            color: white;
          };

        `}
    `};
`;

export {
  FlashStyle
};

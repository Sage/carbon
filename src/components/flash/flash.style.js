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

const sliderAnimation = `
  .carbon-flash__slider-appear,
  .carbon-flash__slider-enter {
    left: 50%;
    opacity: 0;
    right: 50%;
  }

  .carbon-flash__slider-appear-active,
  .carbon-flash__slider-enter-active {
    left: 0%;
    opacity: 1;
    right: 0%;
    transition: 500ms ease 100ms;
  }

  .carbon-flash__slider-leave {
    opacity: 1;
  }

  .carbon-flash__slider-leave-active  {
    opacity: 0;
    transition: 500ms ease 100ms;
  }
`;

const contentAnimation = `
  .carbon-flash__content-appear,
  .carbon-flash__content-enter {
    opacity: 0;
  }

  .carbon-flash__content-appear-active,
  .carbon-flash__content-enter-active {
    opacity: 1;
    transition: 400ms ease 400ms;
  }

  .carbon-flash__content-leave {
    opacity: 1;
  }

  .carbon-flash__content-leave-active  {
    opacity: 0;
    transition: 400ms ease-out 100ms;
  }
`;

const FlashContentStyle = styled.div`
  background-color: transparent ;
  margin: 0 auto;
  max-width: 1600px;
  min-width: 958px;
  position: relative;
`;

const FlashSliderStyle = styled.div`
  content: 'h';
  display: inline-block;
  font-size: 13px;
  height: 100%;
  left: 0;
  line-height: 18px;
  position: absolute;
  right: 0;
`;

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
        ${FlashSliderStyle} {
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

    ${sliderAnimation};
    ${contentAnimation};
`;

export {
  FlashStyle,
  FlashSliderStyle,
  FlashContentStyle
};

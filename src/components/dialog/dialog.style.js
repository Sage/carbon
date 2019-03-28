import styled, { css } from 'styled-components';

const dialogSizes = {
  extraSmall: '300px',
  small: '380px',
  mediumSmall: '540px',
  medium: '750px',
  mediumLarge: '850px',
  large: '960px',
  extraLarge: '1080px'
};

const DialogStyle = styled.div`
  background-color: $slate-tint-95;
  box-shadow: $shadow-depth-3;
  position: fixed;
  top: 50%;

  &:focus {
    outline: none;
  }

  ${({ size }) => size && css`
    width: ${dialogSizes[size]}
  `}

  ${({ fixedBottom }) => fixedBottom && css`
    bottom: 0;
    min-height: 0px !important;
  `}
`;

const DialogTitleStyle = styled.div`
  padding: 23px 35px 0;
`;

const DialogContentStyle = styled.div`
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  padding: 0px 35px 30px;
  width: 100%;

  ${({ fixedBottom }) => fixedBottom && css`
    @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
      overflow-y: scroll
  }  
  `}
`;

const DialogInnerContentStyle = styled.div`
  padding-top: 20px;
  position: relative;
`;

export {
  DialogStyle,
  DialogTitleStyle,
  DialogContentStyle,
  DialogInnerContentStyle
};

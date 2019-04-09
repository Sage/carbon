import styled, { css } from 'styled-components';
import baseTheme from '../../style/themes/base';

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
  background-color: #F2F5F6;
  box-shadow: ${({ theme }) => theme.shadows.depth3};
  position: fixed;
  top: 50%;

  .carbon-heading--has-divider .carbon-heading__header {
    border-bottom: none;
    padding-bottom: 0;
  }

  .carbon-heading__title {
    color: ${({ theme }) => theme.text.color}
  }

  &:focus {
    outline: none;
  }

  ${({ size }) => size && css`
    width: ${dialogSizes[size]}

    // IE10+ fix (caters for scrollbar width)
      @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
        width: $size - 16;
      }
  `}

  ${({ fixedBottom }) => fixedBottom && css`
    bottom: 0;
    min-height: 0px !important;
  `}
`;

const DialogTitleStyle = styled.div`
  padding: 23px 35px 0;
  border-bottom: 1px solid #ccd6db;
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
  ${({ height }) => height && css`
    min-height: ${height - 40}px}
  `}
`;

DialogStyle.defaultProps = {
  theme: baseTheme
};

export {
  DialogStyle,
  DialogTitleStyle,
  DialogContentStyle,
  DialogInnerContentStyle
};

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

  ${({ height }) => height && css`
    min-height: ${height - 40}px;

    .carbon-form {
      padding-bottom: 80px;
    }

    .carbon-form__footer-wrapper {
      bottom: 0px;
      position: absolute;
      width: 100%;
    }
  `};

  ${({ fixedBottom }) => fixedBottom && css`
      bottom: 0;
      min-height: 0px !important;
  `}

  ${({ fixedBottom, stickyFormFooter, size }) => fixedBottom && stickyFormFooter && css`
      .carbon-form__footer-wrapper {
        box-sizing: border-box;
        animation: form-buttons-animate-in 0.25s ease-out;
        background-color: white;
        bottom: 0;
        left: auto;
        margin-left: -35px;
        box-shadow: 0 -4px 12px 0 rgba(0, 0, 0, 0.05);
        padding-bottom: 13px;
        padding-top: 15px;
        padding-left: 35px;
        padding-right: 35px;
        position: fixed;
        z-index: 1000;
        width: ${dialogSizes[size]};
      }
  `}

  .carbon-dialog__close {
    color: #4d7080;
    cursor: pointer;
    position: absolute;
    right: 35px;
    top: 28px;
    z-index: 1;

    &:hover {
      color: #255BC7;
    }
    &.carbon-icon {
      position: absolute;
    }
  }
`;

const DialogTitleStyle = styled.div`
  padding: 23px 35px 0;
  border-bottom: 1px solid #ccd6db;

  .carbon-heading--has-divider .carbon-heading__header {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  .carbon-heading__title {
    color: ${({ theme }) => theme.text.color}
  }
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

DialogTitleStyle.defaultProps = {
  theme: baseTheme
};

DialogStyle.defaultProps = {
  theme: baseTheme
};

export {
  DialogStyle,
  DialogTitleStyle,
  DialogContentStyle,
  DialogInnerContentStyle
};

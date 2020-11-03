import styled, { css } from "styled-components";

import baseTheme from "../../style/themes/base";
import { StyledForm, StyledFormFooter } from "../form/form.style";
import StyledIconButton from "../icon-button/icon-button.style";

const dialogSizes = {
  auto: "auto",
  "extra-small": "300px",
  small: "380px",
  "medium-small": "540px",
  medium: "750px",
  "medium-large": "850px",
  large: "960px",
  "extra-large": "1080px",
};

const DialogStyle = styled.div`
  background-color: #f2f5f6;
  box-shadow: ${({ theme }) => theme.shadows.depth3};
  position: fixed;
  top: 50%;

  &:focus {
    outline: none;
  }

  ${({ size }) =>
    size &&
    css`
      width: ${dialogSizes[size]};

      // IE10+ fix (caters for scrollbar width)
      @media screen and (-ms-high-contrast: active),
        screen and (-ms-high-contrast: none) {
        width: $size - 16;
      }
    `}

  ${({ height }) =>
    height &&
    css`
      min-height: ${height - 40}px;

      ${StyledForm} {
        min-height: inherit;
        padding-bottom: 88px;
        box-sizing: border-box;
      }

      ${StyledFormFooter} {
        bottom: 0px;
        position: absolute;
        width: 100%;
      }
    `};

  // prettier-ignore
  ${({ size }) => css`
    ${StyledFormFooter}.sticky {
      margin-left: -35px;
      left: auto;
      width: ${dialogSizes[size]};
      position: fixed;
    }
  `}

  ${({ fixedBottom }) =>
    fixedBottom &&
    css`
      bottom: 0;
      min-height: 0px !important;
    `}


  ${StyledIconButton} {
    position: absolute;
    right: 33px;
    top: 32px;
    z-index: 1;

    &:hover {
      color: #255BC7;
    }
  }
`;

const DialogTitleStyle = styled.div`
  padding: 23px 35px 0;
  border-bottom: 1px solid #ccd6db;
  ${({ showCloseIcon }) => showCloseIcon && "padding-right: 85px"};

  .carbon-heading--has-divider .carbon-heading__header {
    border-bottom: none;
    padding-bottom: 0;
  }

  .carbon-heading__title {
    color: ${({ theme }) => theme.text.color};
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: ${({ hasSubtitle }) => !hasSubtitle && "4px 0px"};
  }
`;

const DialogContentStyle = styled.div`
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  padding: 0px 35px 30px;
  width: 100%;

  ${({ fixedBottom }) =>
    fixedBottom &&
    css`
      @media screen and (-ms-high-contrast: active),
        screen and (-ms-high-contrast: none) {
        overflow-y: scroll;
      }
    `}
`;

const DialogInnerContentStyle = styled.div`
  padding-top: 20px;
  position: relative;

  ${({ height }) =>
    height &&
    css`
    min-height: ${height - 40}px}
  `}
`;

DialogTitleStyle.defaultProps = {
  theme: baseTheme,
};

DialogStyle.defaultProps = {
  theme: baseTheme,
};

export {
  DialogStyle,
  DialogTitleStyle,
  DialogContentStyle,
  DialogInnerContentStyle,
};

import styled, { css } from "styled-components";

import baseTheme from "../../style/themes/base";
import {
  StyledForm,
  StyledFormFooter,
  StyledFormContent,
} from "../form/form.style";
import {
  StyledHeaderContent,
  StyledHeading,
  StyledHeadingTitle,
} from "../heading/heading.style";
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

const HORIZONTAL_PADDING = 35;
const CONTENT_BOTTOM_PADDING = 30;

const DialogStyle = styled.div`
  background-color: #f2f5f6;
  box-shadow: ${({ theme }) => theme.shadows.depth3};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  max-height: ${({ topMargin }) => `calc(100vh - ${topMargin}px)`};

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

  ${({ dialogHeight }) =>
    dialogHeight &&
    css`
      height: ${dialogHeight}px;
    `};

  ${StyledForm} {
    padding-bottom: 0px;
    box-sizing: border-box;
  }

  ${StyledFormContent}.sticky {
    padding-right: ${HORIZONTAL_PADDING}px;
    padding-left: ${HORIZONTAL_PADDING}px;
    padding-top: 20px;
    margin-right: -${HORIZONTAL_PADDING}px;
    margin-left: -${HORIZONTAL_PADDING}px;
    margin-top: -20px;
  }

  ${StyledFormFooter}.sticky {
    margin-left: -${HORIZONTAL_PADDING}px;
    bottom: -${CONTENT_BOTTOM_PADDING}px;
    margin-bottom: -${CONTENT_BOTTOM_PADDING}px;
    width: calc(100% + ${2 * HORIZONTAL_PADDING}px);
    padding-left: ${HORIZONTAL_PADDING}px;
    padding-right: ${HORIZONTAL_PADDING}px;
  }

  > ${StyledIconButton} {
    margin: 0;
    position: absolute;
    right: 33px;
    top: 32px;
    z-index: 1;

    &:hover {
      color: #255bc7;
    }
  }
`;

const DialogTitleStyle = styled.div`
  padding: 23px ${HORIZONTAL_PADDING}px 0;
  border-bottom: 1px solid #ccd6db;
  ${({ showCloseIcon }) => showCloseIcon && "padding-right: 85px"};

  ${StyledHeaderContent} {
    align-items: baseline;
  }

  ${StyledHeading} {
    margin-bottom: 20px;

    ${StyledHeadingTitle} {
      color: ${({ theme }) => theme.text.color};
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: ${({ hasSubtitle }) => !hasSubtitle && "4px 0px"};
    }
  }
`;

const DialogContentStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  flex: 1;
  padding: 0px ${HORIZONTAL_PADDING}px ${CONTENT_BOTTOM_PADDING}px;
`;

const DialogInnerContentStyle = styled.div`
  padding-top: 20px;
  position: relative;
  flex: 1;
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

import styled, { css } from "styled-components";

import Button from "../../button/__next__";
import addFocusStyling from "../../../style/utils/add-focus-styling";

interface StyledResponsiveMenuProps {
  childOpen?: boolean;
  height?: string;
  iconsVisible?: boolean;
  left?: string;
  reduceMotion: boolean;
  responsive?: boolean;
  menu: "primary" | "secondary" | "tertiary";
  top?: string;
  width?: string;
}

interface StyledButtonProps {
  active?: boolean;
}

export const StyledBackdrop = styled.div`
  position: fixed;
  inset: 0;
`;

export const ModalContainer = styled.div<{ width: string }>`
  position: fixed;
  top: 0;

  ${({ width }) => css`
    width: ${width};
  `}
`;

export const StyledButton = styled(Button)<StyledButtonProps>`
  border: none;
  border-radius: 0;
  background-color: var(
    ${({ active }) =>
      active ? "--nav-primary-bg-child" : "--nav-primary-bg-default"}
  );

  && [data-component="icon"]:not([data-color]) {
    color: var(--nav-primary-label-default);
  }

  &&:hover,
  &&:active {
    background-color: var(--nav-primary-bg-child);
    border-color: transparent;
  }

  &&:hover [data-component="icon"]:not([data-color]),
  &&:active [data-component="icon"]:not([data-color]) {
    color: var(--nav-primary-label-default);
  }

  &:focus {
    appearance: none;
    -webkit-appearance: none;
    -webkit-box-shadow: ${addFocusStyling(true)};
    box-shadow: ${addFocusStyling(true)};
    border: 1px solid black;
    outline: transparent 3px solid;
  }
`;

export const StyledCloseButtonWrapper = styled.div`
  background-color: var(--nav-primary-bg-child);
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  padding: 0 var(--global-space-layout-3-xs);
  width: 100%;
  height: 40px;
`;

export const StyledCloseButton = styled(Button)`
  border: none;
  border-radius: 0;

  && [data-component="icon"]:not([data-color]) {
    color: var(--nav-primary-label-default);
  }

  &&:hover,
  &&:active {
    background-color: var(--nav-primary-bg-child);
    border-color: transparent;
  }

  &&:hover [data-component="icon"]:not([data-color]),
  &&:active [data-component="icon"]:not([data-color]) {
    color: var(--nav-primary-label-default);
  }
`;

export const StyledGlobalVerticalMenuWrapper = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: row;
  position: absolute;
  width: fit-content;
`;

export const StyledResponsiveMenu = styled.ul<StyledResponsiveMenuProps>`
  margin: 0;
  padding: 0;
  align-items: stretch;
  background-color: var(--nav-primary-bg-default);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height || "100%"};
  justify-content: flex-start;
  overflow-y: auto;
  ${({ responsive }) => css`
    padding: ${responsive
      ? "var(--global-space-comp-s)"
      : "var(--global-space-comp-l)"};
  `};
  position: fixed;
  width: ${({ width }) => width || "100%"};
  max-width: 375px;
  z-index: 1000;
  border-right: ${({ childOpen, menu }) =>
    menu === "secondary" || (!childOpen && menu === "primary")
      ? "2px solid var(--nav-primary-bg-default)"
      : "1px solid var(--nav-primary-bg-default)"};

  ${({ top }) => css`
    top: ${top};
    max-height: calc(100% - ${top === "auto" ? "40px" : top});
  `}

  ${({ childOpen }) =>
    childOpen &&
    css`
      padding-right: calc(var(--global-space-comp-l) + 1px);
    `}

  ${({ height, left, menu }) =>
    menu === "secondary" &&
    css`
      left: ${left};
      height: ${height};
    `}

  ${({ responsive }) =>
    responsive &&
    css`
      > li + li::before {
        content: "";
        display: block;
        border-top: 1px solid var(--nav-primary-divider);
        margin: var(--global-space-comp-s) 0;
      }
    `}

  ${({ responsive, menu }) =>
    !responsive &&
    menu === "secondary" &&
    css`
      border-left: 1px solid var(--nav-primary-divider);
    `};
`;

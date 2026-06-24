import styled, { css } from "styled-components";
import addFocusStyling from "../../../../../../../style/utils/add-focus-styling";

type ButtonProps = { size: "small" | "medium" | "large"; menuOpen?: boolean };
type ListProps = { size: "small" | "medium" | "large" };

const sizeMap = {
  small: {
    buttonFont: "var(--global-font-static-comp-medium-s)",
    buttonHeight: "var(--global-size-s)",
    dropdownTop: "36px",
    dropdownPadding: "var(--global-space-comp-xs)",
    itemHeight: "var(--global-size-s)",
    itemFont: "var(--global-font-static-comp-regular-s)",
  },
  medium: {
    buttonFont: "var(--global-font-static-comp-medium-m)",
    buttonHeight: "var(--global-size-m)",
    dropdownTop: "44px",
    dropdownPadding: "var(--global-space-comp-s)",
    itemHeight: "var(--global-size-m)",
    itemFont: "var(--global-font-static-comp-regular-m)",
  },
  large: {
    buttonFont: "var(--global-font-static-comp-medium-l)",
    buttonHeight: "var(--global-size-l)",
    dropdownTop: "52px",
    dropdownPadding: "var(--global-space-comp-m)",
    itemHeight: "var(--global-size-l)",
    itemFont: "var(--global-font-static-comp-regular-l)",
  },
};

export const StyledButton = styled.button<ButtonProps>`
  ${({ size, menuOpen }) => css`
    width: 100%;
    height: ${sizeMap[size].buttonHeight};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    background: transparent;
    border-radius: var(--global-radius-action-m);
    cursor: pointer;
    padding: 0 var(--global-space-comp-xs);
    color: var(--button-typical-toggle-label-default);
    font: ${sizeMap[size].buttonFont};

    ${menuOpen &&
    css`
      ${addFocusStyling()}
    `}

    &:focus {
      ${addFocusStyling()}
    }
  `}
`;

export const StyledMenu = styled.ul<ListProps>`
  ${({ size }) => css`
    position: absolute;
    top: ${sizeMap[size].dropdownTop};
    left: 0;
    z-index: 1;

    background: var(--popover-bg-default);
    border-radius: var(--global-radius-container-m);
    box-shadow: var(--global-depth-lvl1);
    list-style: none;
    margin: 0;
    padding: ${sizeMap[size].dropdownPadding} 0;
    width: 100%;
    overflow-y: auto;
  `}
`;

export const StyledMenuItem = styled.li<{
  size: "small" | "medium" | "large";
}>`
  ${({ size }) => css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-height: ${sizeMap[size].itemHeight};
    padding: ${sizeMap[size].dropdownPadding} var(--global-space-comp-xl);
    cursor: pointer;
    user-select: none;
    color: var(--input-dropdown-label-default);
    font: ${sizeMap[size].itemFont};

    &:hover {
      background-color: var(--input-dropdown-bg-hover);
      color: var(--input-dropdown-label-hover);
    }

    &:focus-visible {
      box-shadow: inset 0px 0px 0px var(--global-borderwidth-s)
        var(--focus-borderalt);
      outline: none;
    }
  `}
`;

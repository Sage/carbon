import styled from "styled-components";
import addFocusStyling from "../../../../../../style/utils/add-focus-styling";
import addInnerFocusStyling from "../../../../../../style/utils/add-inner-focus-styling";
import addScrollbarStyling from "../../../../../../style/utils/add-scrollbar-styling";

import {
  subtleSelectSizeConfig,
  SubtleSelectSize,
} from "./subtle-select.config";

export const StyledWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: max-content;
  min-width: var(--global-size-4-xl);
  color: var(--input-dropdown-label-default);

  &:has(select:disabled) {
    color: var(--input-dropdown-label-disabled);
  }
`;

export const StyledSelect = styled.select<{
  $size: SubtleSelectSize;
}>`
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  background: var(--input-typical-bg-default);
  border: none;
  outline: none;
  border-radius: var(--global-radius-container-m);
  padding: ${({ $size }) => subtleSelectSizeConfig[$size].blockPadding}
    calc(
      ${({ $size }) => subtleSelectSizeConfig[$size].inlinePadding} +
        var(--global-size-3-xs) + var(--global-space-comp-m)
    )
    ${({ $size }) => subtleSelectSizeConfig[$size].blockPadding}
    ${({ $size }) => subtleSelectSizeConfig[$size].inlinePadding};
  min-height: ${({ $size }) => subtleSelectSizeConfig[$size].height};
  min-width: var(--global-size-4-xl);
  width: auto;
  font: ${({ $size }) => subtleSelectSizeConfig[$size].controlFont};
  color: inherit;
  text-align: left;

  &:focus-visible {
    ${addFocusStyling()}
    position: relative;
    z-index: 2;
  }

  &:disabled {
    background: var(--input-typical-bg-disabled);
    cursor: not-allowed;
  }

  &:open {
    background: var(--popover-bg-default);
    border-radius: var(--global-radius-container-m);
  }

  @supports (appearance: base-select) {
    &,
    &::picker(select) {
      appearance: base-select;
    }

    button {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      width: 100%;
      color: inherit;
      font: inherit;
    }

    [data-subtle-select-selected-content] {
      display: inline-flex;
      align-items: center;
    }

    &::picker(select) {
      box-sizing: border-box;
      padding: var(--global-space-comp-xs) 0;
      background: var(--popover-bg-default);
      border: none;
      border-radius: var(--global-radius-container-m);
      box-shadow: var(--global-depth-lvl1);
      ${addScrollbarStyling()}
    }

    &::picker-icon {
      display: none;
    }

    option::checkmark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: ${({ $size }) => subtleSelectSizeConfig[$size].checkmarkWidth};
      height: 20px;
      margin: 0;
      color: var(--input-dropdown-label-alt);
      font-family: CarbonIcons, sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: normal;
      line-height: 12px;
      content: "\\f003";
    }
  }

  option {
    display: flex;
    align-items: center;
    gap: 0;
    box-sizing: border-box;
    height: ${({ $size }) => subtleSelectSizeConfig[$size].height};
    min-height: ${({ $size }) => subtleSelectSizeConfig[$size].height};
    padding: 0;
    font: ${({ $size }) => subtleSelectSizeConfig[$size].optionFont};
    background: var(--popover-bg-default);
    color: var(--input-dropdown-label-default);
    text-align: left;
  }

  option:hover,
  option:focus {
    color: var(--input-dropdown-label-hover);
  }

  option:hover {
    background: var(--input-dropdown-bg-hover);
  }

  option:checked {
    color: var(--input-dropdown-label-default);
  }

  option:disabled {
    color: var(--input-dropdown-label-disabled);
    background: var(--popover-bg-default);
  }

  @supports (appearance: base-select) {
    option:focus,
    option:focus-visible {
      ${addInnerFocusStyling()}
      color: var(--input-dropdown-label-hover);
    }
  }
`;

export const StyledIcon = styled.span`
  position: absolute;
  right: var(--global-space-comp-xs);
  z-index: 3;
  display: flex;
  align-items: center;
  pointer-events: none;

  [data-component="icon"] {
    color: currentColor;
    font-size: var(--global-size-3-xs);
    height: var(--global-size-4-xs);
    width: var(--global-size-3-xs);
  }
`;

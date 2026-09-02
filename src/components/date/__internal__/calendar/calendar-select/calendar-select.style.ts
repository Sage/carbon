import styled, { css } from "styled-components";
import addFocusStyling from "../../../../../style/utils/add-focus-styling";

const MAX_VISIBLE_OPTIONS = 12;

export const StyledWrapper = styled.div<{ $disabled?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: max-content;
  min-width: var(--global-size-4-xl);
  color: var(--input-dropdown-label-default);

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: var(--input-dropdown-label-disabled);
    `}
`;

export const StyledSelect = styled.select`
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
  padding: var(--global-space-comp-xs)
    calc(
      var(--global-space-comp-m) + var(--global-size-2-xs) +
        var(--global-space-comp-xs)
    )
    var(--global-space-comp-xs) var(--global-space-comp-m);
  min-height: var(--global-size-s);
  min-width: var(--global-size-4-xl);
  width: auto;
  font: var(--global-font-static-comp-medium-s);
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

  option {
    display: flex;
    align-items: center;
    gap: 0;
    box-sizing: border-box;
    height: var(--global-size-s);
    min-height: var(--global-size-s);
    padding: var(--global-space-none);
    padding-inline-end: var(--global-space-comp-m);
    font: var(--global-font-static-comp-regular-s);
    background: var(--popover-bg-default);
    color: var(--input-dropdown-label-default);
    text-align: left;
  }

  option:checked {
    color: var(--input-dropdown-label-alt);
  }

  option:disabled {
    color: var(--input-dropdown-label-disabled);
    background: var(--popover-bg-default);
    cursor: not-allowed;
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

    [data-calendar-select-selected-content] {
      display: inline-flex;
      align-items: center;
    }

    &::picker(select) {
      --calendar-select-option-block-size: var(--global-size-s);
      --calendar-select-picker-padding-block: var(--global-space-comp-xs);

      box-sizing: border-box;
      padding: var(--global-space-comp-xs) 0;
      background: var(--popover-bg-default);
      border: none;
      border-radius: var(--global-radius-container-m);
      box-shadow: var(--global-depth-lvl1);
      /* Limit the picker to 12 option rows and include its block padding so
       * the final visible row is not clipped. */
      max-block-size: calc(
        ${MAX_VISIBLE_OPTIONS} * var(--calendar-select-option-block-size) + 2 *
          var(--calendar-select-picker-padding-block)
      );
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    &::picker-icon {
      display: none;
    }

    option::checkmark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: var(--global-size-2-xs);
      height: var(--global-size-2-xs);
      margin: 0;
      color: var(--input-dropdown-label-alt);
      font-family: CarbonIcons, sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: normal;
      line-height: 12px;
      content: "\\f003";
    }

    option:not(:disabled):hover,
    option:not(:disabled):focus {
      color: var(--input-dropdown-label-hover);
    }

    option:not(:disabled):hover {
      background: var(--input-dropdown-bg-hover);
    }

    option:not(:disabled):focus,
    option:not(:disabled):focus-visible {
      ${addFocusStyling(true)}
      color: var(--input-dropdown-label-hover);
    }
  }
`;

export const StyledIcon = styled.span<{ $disabled?: boolean }>`
  position: absolute;
  inset-inline-end: var(--global-space-comp-m);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--global-size-2-xs);
  height: var(--global-size-2-xs);
  pointer-events: none;

  [data-component="icon"] {
    color: ${({ $disabled }) =>
      $disabled
        ? "var(--input-dropdown-label-disabled)"
        : "var(--input-dropdown-label-default)"};
    font-size: var(--global-size-3-xs);
    height: var(--global-size-4-xs);
    width: var(--global-size-3-xs);
  }
`;

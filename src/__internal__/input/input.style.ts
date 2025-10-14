import styled, { css } from "styled-components";
import addFocusStyling from "../../style/utils/add-focus-styling";
import {
  dateStyleOverrides,
  searchStyleOverrides,
  selectStyleOverrides,
  pagerStyleOverrides,
  numeralDateStyles,
} from "./input-style-overrides.style";

interface InputContainerProps {
  $align?: "left" | "right";
  $error?: boolean;
  $isDisabled?: boolean;
  $isReadOnly?: boolean;
  $size?: "small" | "medium" | "large";
}

const InputContainer = styled.div<InputContainerProps>`
  ${({ $align, $error, $isDisabled, $isReadOnly, $size }) => css`
    display: flex;
    align-items: center;
    align-self: stretch;
    max-width: 100%;
    border-radius: var(--global-radius-action-m);

    ${$size === "small" &&
    css`
      min-height: var(--global-size-s);
    `}

    ${$size === "medium" &&
    css`
      min-height: var(--global-size-m);
    `}

    ${$size === "large" &&
    css`
      min-height: var(--global-size-l);
    `}

    &&& {
      ${$isReadOnly &&
      css`
        cursor: default;

        * {
          cursor: default;
        }

        background: var(--input-typical-bg-read-only);
        border: var(--global-borderwidth-xs) solid
          var(--input-typical-border-read-only);

        &:focus-within:has(:focus:not(button)) {
          ${addFocusStyling()}
          z-index: 2;
        }
      `}

      ${$isDisabled &&
      css`
        cursor: not-allowed;
        background: var(--input-typical-bg-disabled);
        border: var(--global-borderwidth-xs) solid
          var(--input-typical-border-disabled);

        * {
          cursor: not-allowed;
        }
      `}
    }

    ${!$isDisabled &&
    !$isReadOnly &&
    css`
      cursor: text;

      &:focus-within:has(:focus:not(button)) {
        ${addFocusStyling()}
        z-index: 2;
      }
    `}

    ${!$isDisabled &&
    !$isReadOnly &&
    css`
      background: var(--input-typical-bg-default);
      border: ${$error
        ? `var(--global-borderwidth-s) solid var(--input-validation-border-error)`
        : `var(--global-borderwidth-xs) solid var(--input-typical-border-default)`};
    `}

    .input-text-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      flex: 1 0 0;
      max-width: 100%;
      align-self: stretch;

      input {
        align-self: stretch;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        flex: 1 0 0;
        min-width: 0;
        overflow: hidden;
        border: none;
        outline: none;
        background: transparent;
        text-overflow: ellipsis;
        text-align: ${$align};

        ${$isReadOnly &&
        css`
          color: var(--input-typical-txt-read-only);
        `}

        ${$isDisabled &&
        css`
          color: var(--input-typical-txt-disabled);
        `}

        ${!$isReadOnly &&
        !$isDisabled &&
        css`
          color: var(--input-typical-txt-default);
        `}

        font: ${$size === "large"
          ? "var(--global-font-static-comp-regular-l)"
          : "var(--global-font-static-comp-regular-m)"};

        ${$size === "small" &&
        css`
          padding: var(--global-space-none) var(--global-space-comp-s);
        `}

        ${$size === "medium" &&
        css`
          padding: var(--global-space-none) var(--global-space-comp-m);
        `}

        ${$size === "large" &&
        css`
          padding: var(--global-space-none) var(--global-space-comp-l);
        `}
      }

      [data-element="textbox-prefix"] {
        font-weight: 500;
        margin-left: var(--global-space-comp-m);
      }
    }
  `}

  ${dateStyleOverrides}

  ${searchStyleOverrides}

  ${({ $size, $isDisabled, $isReadOnly }) =>
    selectStyleOverrides($size, $isDisabled, $isReadOnly)}

  ${pagerStyleOverrides}

  ${numeralDateStyles}
`;

export default InputContainer;

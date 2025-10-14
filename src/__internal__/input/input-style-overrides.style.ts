import { css } from "styled-components";

/**
 * Overrides for input when part of Date component
 */
export const dateStyleOverrides = css`
  .date & {
    .input-text-container input {
      padding: 0 0 0 12px;
      margin-right: -12px;
    }
  }
`;

/**
 * Overrides for input when part of Search component
 */
const searchBaseStyles = css`
  .search & {
    height: 40px;
    box-sizing: border-box;

    .input-text-container {
      flex-wrap: wrap;
    }

    input {
      width: 30px;
    }
  }
`;

const searchNoBorderStyles = css`
  .search:not(.with-button):not(.has-value) &:not(:focus-within) {
    border-color: transparent;
  }
`;

const searchWithButtonStyles = css`
  .search.with-button & {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const searchDarkPlaceholderStyles = css`
  .search.dark-background & {
    input {
      ::-moz-placeholder {
        color: var(--colorsUtilityYang080);
        opacity: 1;
      }
      ::placeholder {
        color: var(--colorsUtilityYang080);
      }
    }
  }
`;

const searchDarkHasValueStyles = css`
  .search.dark-background:not(.with-button) & {
    input {
      color: var(--input-typical-inverse-txt-default);
    }
  }
  .search.dark-background.has-value:not(.with-button) & {
    .input-text-container,
    input {
      color: var(--colorsUtilityYang080);
    }

    .input-text-container:hover {
      input {
        color: var(--colorsUtilityYang100);
      }
    }
  }
`;

const searchDarkWithButtonNoValueStyles = css`
  .search.dark-background.with-button:not(.has-value) & {
    input {
      color: var(--colorsUtilityYang100);
    }
  }
`;

const searchDarkNoButtonStyles = css`
  .search.dark-background:not(.with-button) & {
    background-color: transparent;
    border-color: var(--colorsUtilityYang080);
  }
`;

export const searchStyleOverrides = css`
  ${searchBaseStyles}
  ${searchNoBorderStyles}
  ${searchWithButtonStyles}
  ${searchDarkPlaceholderStyles}
  ${searchDarkHasValueStyles}
  ${searchDarkWithButtonNoValueStyles}
  ${searchDarkNoButtonStyles}
`;

/**
 * Overrides for input when part of Select component
 */
const selectTransparentStyles = (
  $isDisabled?: boolean,
  $isReadOnly?: boolean,
) => css`
  &[data-is-transparent="true"] {
    background: transparent;
    border: none;

    ${!$isDisabled &&
    !$isReadOnly &&
    css`
      cursor: pointer;

      * {
        cursor: pointer;
      }
    `}

    input {
      text-align: right;
      position: absolute;
      padding: var(--global-space-none);

      &::placeholder {
        color: var(--colorsUtilityYin100);
      }
    }
  }
`;

const selectNoTypingStyles = css`
  [data-role="select-textbox"] &[data-is-transparent="false"] {
    .input-text-container {
      position: relative;

      .select-text:not(.disabled):not(.read-only) {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 48px);
        height: 100%;
        padding: var(--global-space-none) var(--global-space-none)
          var(--global-space-none) var(--global-space-comp-m);
        cursor: pointer;
      }
    }
  }
`;

const selectTypingAllowedStyles = css`
  .multi-select &,
  .filterable-select & {
    .input-text-container:not(.disabled):not(.read-only) {
      cursor: text;

      input {
        cursor: text;
      }
    }
  }
`;

const mulitiSelectInputStyles = ($size?: string) => css`
  .multi-select & {
    input {
      padding: var(--global-space-none);
    }

    .input-text-container {
      ${$size === "small" &&
      css`
        padding: var(--global-space-none) var(--global-space-comp-2-xl)
          var(--global-space-none) var(--global-space-comp-s);
      `}
      ${$size === "medium" &&
      css`
        padding: var(--global-space-none) 40px var(--global-space-none)
          var(--global-space-comp-m);
      `}
      ${$size === "large" &&
      css`
        padding: var(--global-space-none) 48px var(--global-space-none)
          var(--global-space-comp-l);
      `}
    }
  }
`;

const simpleSelectStyles = css`
  [data-element="simple-select-input"] & {
    input {
      opacity: 0;
    }

    input {
      cursor: pointer;
    }
  }
`;

export const selectStyleOverrides = (
  $size?: string,
  $isDisabled?: boolean,
  $isReadOnly?: boolean,
) => css`
  ${simpleSelectStyles}
  ${selectTransparentStyles($isDisabled, $isReadOnly)}
  ${selectNoTypingStyles}
  ${selectTypingAllowedStyles}
  ${mulitiSelectInputStyles($size)}
`;

/* Overrides for input when part of Pager component */
const pageSelectionStyles = css`
  .pager-navigation & {
    margin: 4px 8px;
    height: 26px;
    min-height: unset;

    .input-text-container {
      padding: 0px;
      line-height: 26px;
      min-height: 24px;

      input {
        text-align: center;
        padding: 0;
      }
    }
  }
`;

const pageSizeSelectionStyles = css`
  &&& {
    .pager-size-options & {
      min-height: unset;

      .input-text-container {
        width: 64px;
        height: 26px;
        min-height: 26px;
        min-width: 10px;
        margin: 0px;

        .select-text:not(.disabled):not(.read-only) {
          width: calc(100% - 28px);
        }
      }
    }
  }
`;

export const pagerStyleOverrides = css`
  ${pageSelectionStyles}
  ${pageSizeSelectionStyles}
`;

/* Overrides for input when part of NumeralDate component */
export const numeralDateStyles = css`
  .numeral-date-wrapper & {
    .input-text-container input {
      text-align: center;
    }
  }
`;

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

const searchCancelIcon =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.9497 5.05022C15.3403 5.44074 15.3403 6.07391 14.9497 6.46443L11.4142 9.99997L14.9497 13.5355C15.3403 13.926 15.3403 14.5592 14.9497 14.9497C14.5592 15.3402 13.9261 15.3402 13.5355 14.9497L10 11.4142L6.46446 14.9497C6.07394 15.3402 5.44077 15.3402 5.05025 14.9497C4.65972 14.5592 4.65972 13.926 5.05025 13.5355L8.58578 9.99997L5.05025 6.46443C4.65972 6.07391 4.65972 5.44074 5.05025 5.05022C5.44077 4.65969 6.07394 4.65969 6.46446 5.05022L10 8.58575L13.5355 5.05022C13.9261 4.65969 14.5592 4.65969 14.9497 5.05022Z'/%3E%3C/svg%3E\")";

/**
 * Overrides for input when part of Search component
 */
const searchBaseStyles = css`
  .search & {
    --search-clear-icon-color: var(--button-typical-subtle-label-default);
    --search-button-icon-color: var(--button-typical-subtle-label-default);
    --search-button-hover-bg: var(--button-typical-subtle-bg-hover);
    --search-button-hover-icon-color: var(--button-typical-subtle-label-hover);

    input[type="search"]::-webkit-search-cancel-button {
      -webkit-appearance: none;
      appearance: none;
      width: var(--global-size-2XS, 20px);
      height: var(--global-size-2XS, 20px);
      background-color: var(--search-clear-icon-color);
      -webkit-mask: center / contain no-repeat ${searchCancelIcon};
      mask: center / contain no-repeat ${searchCancelIcon};
      cursor: pointer;
    }

    button {
      border-radius: var(--global-radius-none, 0)
        var(--global-radius-action-m, 8px) var(--global-radius-action-m, 8px)
        var(--global-radius-none, 0);
    }

    button:hover {
      background-color: var(--search-button-hover-bg);
    }

    button span[type="search"] {
      color: var(--search-button-icon-color);
    }

    button:hover span[type="search"] {
      color: var(--search-button-hover-icon-color);
    }
  }
`;

const searchInverseStyles = css`
  .search.inverse & {
    --search-clear-icon-color: var(--button-typical-subtle-inverse-label-default);
    --search-button-icon-color: var(--button-typical-subtle-inverse-label-default);
    --search-button-hover-bg: var(--button-typical-subtle-inverse-bg-hover);
    --search-button-hover-icon-color: var(--button-typical-subtle-inverse-label-hover);

    background-color: var(--input-typical-inverse-bg-default);

    .input-text-container input[type="search"] {
      color: var(--input-typical-inverse-txt-default);
    }
  }
`;

const searchLegacyMenuStyles = css`
  [data-component="menu-item"] .search &,
  [data-component="menu-fullscreen"] .search & {
    height: 40px;
    box-sizing: border-box;

    .input-text-container {
      flex-wrap: wrap;
    }

    input {
      width: 30px;
    }
  }

  [data-component="menu-item"] .search:not(.with-button):not(.has-value) &:not(:focus-within),
  [data-component="menu-fullscreen"] .search:not(.with-button):not(.has-value) &:not(:focus-within) {
    border-color: transparent;
    background: transparent;
  }

  [data-component="menu-item"] .search.with-button &,
  [data-component="menu-fullscreen"] .search.with-button & {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  [data-component="menu-item"] .search.dark-background &,
  [data-component="menu-fullscreen"] .search.dark-background & {
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

  [data-component="menu-item"] .search.dark-background:not(.with-button) &,
  [data-component="menu-fullscreen"] .search.dark-background:not(.with-button) & {
    background-color: transparent;
    border-color: var(--colorsUtilityYang080);

    input {
      color: var(--input-typical-inverse-txt-default);
    }
  }

  [data-component="menu-item"] .search.dark-background.has-value:not(.with-button) &,
  [data-component="menu-fullscreen"] .search.dark-background.has-value:not(.with-button) & {
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

  [data-component="menu-item"] .search.dark-background.with-button:not(.has-value) &,
  [data-component="menu-fullscreen"] .search.dark-background.with-button:not(.has-value) & {
    input {
      color: var(--colorsUtilityYang100);
    }
  }
`;

export const searchStyleOverrides = css`
  ${searchBaseStyles}
  ${searchInverseStyles}
  ${searchLegacyMenuStyles}
`;

/**
 * Overrides for input when part of Select component
 */
const selectTransparentStyles = (
  $isDisabled?: boolean,
  $isReadOnly?: boolean,
) => css`
  &[data-is-transparent="true"] {
    &&& {
      background: transparent;
      border: none;
    }
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
      width: 30px;
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

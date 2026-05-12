import { margin } from "styled-system";
import styled, { css } from "styled-components";

import StyledInputIconToggle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import StyledIcon from "../icon/icon.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import StyledFormField from "../../__internal__/form-field/form-field.style";

interface StyledSearchProps {
  name?: string;
  isFocused?: boolean;
  searchHasValue?: boolean;
  searchWidth?: string;
  maxWidth?: string;
  showSearchButton?: boolean;
  inverse?: boolean;
}

const StyledSearch = styled.div.attrs(applyBaseTheme)<StyledSearchProps>`
  ${({
    isFocused,
    searchWidth,
    maxWidth,
    searchHasValue,
    showSearchButton,
    inverse,
  }) => {
    return css`
      input[type="search"]:focus + [data-role="search-divider"] {
        visibility: hidden;
      }

      input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
        width: var(--global-size-2XS, 20px);
        height: var(--global-size-2XS, 20px);
        background-color: ${inverse ? "white" : "black"};
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.9497 5.05022C15.3403 5.44074 15.3403 6.07391 14.9497 6.46443L11.4142 9.99997L14.9497 13.5355C15.3403 13.926 15.3403 14.5592 14.9497 14.9497C14.5592 15.3402 13.9261 15.3402 13.5355 14.9497L10 11.4142L6.46446 14.9497C6.07394 15.3402 5.44077 15.3402 5.05025 14.9497C4.65972 14.5592 4.65972 13.926 5.05025 13.5355L8.58578 9.99997L5.05025 6.46443C4.65972 6.07391 4.65972 5.44074 5.05025 5.05022C5.44077 4.65969 6.07394 4.65969 6.46446 5.05022L10 8.58575L13.5355 5.05022C13.9261 4.65969 14.5592 4.65969 14.9497 5.05022Z'/%3E%3C/svg%3E");
        mask-image:  /* same as above */;
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        cursor: pointer;
      }

      button {
        align-self: end;
        border-radius: var(--global-radius-none, 0) var(--global-radius-action-M, 8px) var(--global-radius-action-M, 8px) var(--global-radius-none, 0);
        border-style: solid;
        border-color: var(--input-typical-border-default);
        border-width: var(--global-borderwidth-xs) var(--global-borderwidth-xs) var(--global-borderwidth-xs) 0;

        &:hover {
          border-style: solid;
          border-color: var(--input-typical-border-default);
          border-width: var(--global-borderwidth-xs) var(--global-borderwidth-xs) var(--global-borderwidth-xs) 0;
          border-radius: var(--global-radius-none, 0) var(--global-radius-action-M, 8px) var(--global-radius-action-M, 8px) var(--global-radius-none, 0);
        }
      }

      [data-role="input-container"] {
        border-right: none;
      }

      ${inverse &&
      css`
        label {
          color: white;
        }

        [data-role="hint-text"] {
          color: white;
        }

        .input-text-container {
          background-color: black;
          border-radius: var(--global-radius-action-m);
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;

          input {
            color: white;
          }
        }

        button {
          ${StyledIcon} {
            color: white;

            &:hover {
              color: white;
            }
          }
        }
      `}

      ${margin}
      width: ${searchWidth ? `${searchWidth}` : "100%"};
      max-width: ${maxWidth ? `${maxWidth}` : "100%"};
      display: inline-flex;
      align-items: center;
    `;
  }}
`;

export default StyledSearch;

import { margin } from "styled-system";
import styled, { css } from "styled-components";

import applyBaseTheme from "../../style/themes/apply-base-theme";
import TextInput from "../textbox/__internal__/__next__";

interface StyledSearchProps {
  $inverse?: boolean;
}

const StyledSearch = styled(TextInput).attrs(applyBaseTheme)<StyledSearchProps>`
  ${({ $inverse }) => {
    return css`
      input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
        width: var(--global-size-2XS, 20px);
        height: var(--global-size-2XS, 20px);
        background-color: var(--button-typical-subtle-label-default);
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.9497 5.05022C15.3403 5.44074 15.3403 6.07391 14.9497 6.46443L11.4142 9.99997L14.9497 13.5355C15.3403 13.926 15.3403 14.5592 14.9497 14.9497C14.5592 15.3402 13.9261 15.3402 13.5355 14.9497L10 11.4142L6.46446 14.9497C6.07394 15.3402 5.44077 15.3402 5.05025 14.9497C4.65972 14.5592 4.65972 13.926 5.05025 13.5355L8.58578 9.99997L5.05025 6.46443C4.65972 6.07391 4.65972 5.44074 5.05025 5.05022C5.44077 4.65969 6.07394 4.65969 6.46446 5.05022L10 8.58575L13.5355 5.05022C13.9261 4.65969 14.5592 4.65969 14.9497 5.05022Z'/%3E%3C/svg%3E");
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        cursor: pointer;
      }

      button {
        border-radius: var(--global-radius-none, 0)
          var(--global-radius-action-M, 8px) var(--global-radius-action-M, 8px)
          var(--global-radius-none, 0);

        &:hover {
          background-color: var(--button-typical-subtle-bg-hover);
        }
      }

      button span[type="search"] {
        color: var(--button-typical-subtle-label-default);

        &:hover {
          color: var(--button-typical-subtle-label-hover);
        }
      }

      ${$inverse &&
      css`
        label {
          color: var(--input-labelset-inverse-label-default);
        }

        [data-role="hint-text"] {
          color: var(--input-labelset-inverse-label-alt);
        }

        [data-role="input-container"] {
          background-color: var(--input-typical-inverse-bg-default);
        }

        [data-role="input-container"]
          .input-text-container
          input[type="search"] {
          color: var(--input-typical-inverse-txt-default);
        }

        input[type="search"]::-webkit-search-cancel-button {
          background-color: var(--button-typical-subtle-inverse-label-default);
        }

        button {
          span[type="search"] {
            color: var(--button-typical-subtle-inverse-label-default);
          }

          &:hover {
            background-color: var(--button-typical-subtle-inverse-bg-hover);

            span[type="search"] {
              color: var(--button-typical-subtle-inverse-label-hover);
            }
          }
        }
      `}

      ${margin}
    `;
  }}
`;

export default StyledSearch;

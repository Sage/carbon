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
  variant?: string;
}

const StyledSearch = styled.div.attrs(applyBaseTheme)<StyledSearchProps>`
  ${({
    isFocused,
    searchWidth,
    maxWidth,
    searchHasValue,
    showSearchButton,
    variant,
  }) => {
    const darkVariant = variant === "dark";
    const variantColor = darkVariant
      ? "var(--colorsUtilityYang080)"
      : "var(--colorsUtilityMajor300)";

    return css`
      margin-bottom: var(--fieldSpacing);
      ${margin}
      width: ${searchWidth ? `${searchWidth}` : "100%"};
      max-width: ${maxWidth ? `${maxWidth}` : "100%"};
      padding-bottom: var(--spacing025);
      background-color: transparent;
      display: inline-flex;
      align-items: center;
      font-size: var(--fontSize100);

      ${!showSearchButton &&
      css`
        border-bottom: var(--spacing025) solid ${variantColor};

        :hover {
          border-bottom-color: ${darkVariant
            ? "var(--colorsUtilityYang100)"
            : "var(--colorsUtilityMajor400)"};
          cursor: pointer;
        }

        ${(searchHasValue || isFocused) &&
        css`
          border-bottom-color: transparent;

          :hover {
            border-bottom-color: transparent;
            cursor: default;
          }
        `}
      `}

      ${StyledFormField} {
        flex: 1;
      }

      ${StyledIcon} {
        :not([data-element="search"]) {
          ${darkVariant &&
          !showSearchButton &&
          css`
            color: var(--colorsUtilityYang080);

            :hover {
              color: var(--colorsUtilityYang100);
            }
          `}

          ${!darkVariant &&
          css`
            color: var(--colorsActionMinor500);

            :hover {
              color: var(--colorsActionMinor600);
            }
          `}
        }
        cursor: pointer;
      }

      ${StyledInputIconToggle} {
        ${searchHasValue &&
        css`
          margin-bottom: -1px;
        `}
      }
    `;
  }}
`;

export default StyledSearch;

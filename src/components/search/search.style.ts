import { margin } from "styled-system";
import styled, { css } from "styled-components";

import StyledInputIconToggle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import StyledInput from "../../__internal__/input/input.style";
import StyledIcon from "../icon/icon.style";
import { baseTheme } from "../../style/themes";
import StyledFormField from "../../__internal__/form-field/form-field.style";

interface StyledSearchProps {
  name?: string;
  isFocused?: boolean;
  searchHasValue?: boolean;
  searchIsActive?: boolean;
  searchWidth?: string;
  maxWidth?: string;
  showSearchButton?: boolean;
  variant?: string;
}

const StyledSearch = styled.div<StyledSearchProps>`
  ${({
    isFocused,
    searchWidth,
    maxWidth,
    searchIsActive,
    searchHasValue,
    showSearchButton,
    theme,
    variant,
  }) => {
    const darkVariant = variant === "dark";
    const variantColor = darkVariant
      ? "var(--colorsUtilityMajor200)"
      : "var(--colorsUtilityMajor300)";

    const iconColor =
      darkVariant &&
      ((searchHasValue && isFocused) ||
        (!searchHasValue && isFocused) ||
        (!isFocused && searchHasValue && showSearchButton));
    return css`
      ${margin}
      width: ${searchWidth ? `${searchWidth}` : "100%"};
      max-width: ${maxWidth ? `${maxWidth}` : "100%"};
      padding-bottom: 2px;
      background-color: transparent;
      border-bottom: 2px solid ${variantColor};
      display: inline-flex;
      font-size: 14px;
      font-weight: 700;
      :hover {
        border-bottom-color: ${darkVariant
          ? "var(--colorsUtilityMajor100)"
          : "var(--colorsUtilityMajor400)"};
        cursor: pointer;
      }
      ${(isFocused || searchHasValue) &&
      css`
        border-color: transparent;
        transition: background 0.2s ease;
        :hover {
          border-color: transparent;
        }
      `}
      ${isFocused &&
      !searchIsActive &&
      css`
        border-color: transparent;
      `}
      ${!isFocused &&
      searchHasValue &&
      !showSearchButton &&
      css`
        border-bottom: 2px solid ${variantColor};
        :hover {
          border-bottom-color: var(--colorsUtilityMajor400);
          cursor: pointer;
        }
      `}


      ${StyledInput} {
        ::-moz-placeholder {
          color: var(--colorsUtilityYin055);
          opacity: 1;
        }
        ::placeholder {
          color: var(--colorsUtilityYin055);
        }

        ${darkVariant &&
        !isFocused &&
        css`
          ::-moz-placeholder {
            color: var(--colorsUtilityMajor200);
            opacity: 1;
          }
          ::placeholder {
            color: var(--colorsUtilityMajor200);
          }
        `}

        ${darkVariant &&
        !isFocused &&
        searchHasValue &&
        !showSearchButton &&
        css`
          color: var(--colorsUtilityYang100);
        `}
      }

      ${StyledInputPresentation} {
        background-color: ${searchHasValue || isFocused
          ? "var(--colorsUtilityYang100)"
          : "transparent"};

        ${showSearchButton &&
        css`
          border-top-right-radius: var(--borderRadius000);
          border-bottom-right-radius: var(--borderRadius000);
        `}

        flex: 1;
        font-size: 14px;
        font-weight: 700;
        padding-bottom: 2px;
        padding-top: 1px;
        cursor: pointer;
        ${!isFocused &&
        !searchHasValue &&
        css`
          border: 1px solid transparent;
        `}
        ${!isFocused &&
        searchHasValue &&
        !showSearchButton &&
        css`
          border: 1px solid transparent;
          background-color: ${darkVariant
            ? "transparent"
            : "var(--colorsUtilityYang100)"};
        `}
      }

      ${StyledFormField} {
        flex: 1;
        z-index: ${theme.zIndex.smallOverlay};
      }
      ${StyledIcon} {
        ${darkVariant &&
        css`
          ${iconColor &&
          css`
            color: var(--colorsUtilityMajor400);

            :hover {
              color: var(--colorsUtilityMajor500);
            }
          `}
          ${!iconColor &&
          css`
            color: var(--colorsUtilityMajor200);

            :hover {
              color: var(--colorsUtilityMajor100);
            }
          `}
        `}

        ${!darkVariant &&
        css`
          color: var(--colorsActionMinor500);

          :hover {
            color: var(--colorsActionMinor600);
          }
        `}

        width: 20px;
        height: 20px;
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

StyledSearch.defaultProps = { theme: baseTheme };

export default StyledSearch;

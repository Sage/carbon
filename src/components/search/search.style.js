import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledInputPresentation from "../../__experimental__/components/input/input-presentation.style";
import StyledInput from "../../__experimental__/components/input/input.style";
import StyledIcon from "../icon/icon.style";
import StyledButton from "../button/button.style";
import { baseTheme } from "../../style/themes";
import StyledFormField from "../../__experimental__/components/form-field/form-field.style";

const StyledSearch = styled.div`
  ${({
    isFocused,
    searchWidth,
    searchIsActive,
    searchHasValue,
    showSearchButton,
    theme,
    variant,
  }) => {
    const darkVariant = variant === "dark";
    const variantColor = darkVariant
      ? `${theme.search.darkVariantBorder}`
      : `${theme.search.passive}`;
    const iconColor =
      darkVariant &&
      ((searchHasValue && isFocused) ||
        (!searchHasValue && isFocused) ||
        (!isFocused && searchHasValue && showSearchButton));
    return css`
      ${margin}
      width: ${searchWidth ? `${searchWidth}` : "100%"};
      padding-bottom: 2px;
      background-color: transparent;
      border-bottom: 2px solid ${variantColor};
      display: inline-flex;
      font-size: 14px;
      font-weight: 700;
      :hover {
        border-bottom-color: ${theme.search.active};
        cursor: pointer;
      }
      ${
        (isFocused || searchHasValue) &&
        css`
          border-color: transparent;
          transition: background 0.2s ease;
          color: ${theme.icon.defaultHover};
          :hover {
            border-color: transparent;
          }
        `
      }
      ${
        isFocused &&
        !searchIsActive &&
        css`
          border-color: transparent;
          color: ${theme.icon.defaultHover};
        `
      }
      ${
        !isFocused &&
        searchHasValue &&
        !showSearchButton &&
        css`
          border-bottom: 2px solid ${variantColor};
          :hover {
            border-bottom-color: ${theme.search.active};
            cursor: pointer;
          }
        `
      }

      ${StyledInput} {
        ${
          darkVariant &&
          !isFocused &&
          css`
            ::-moz-placeholder {
              color: ${theme.search.darkVariantPlaceholder};
              opacity: 1;
            }
            ::placeholder {
              color: ${theme.search.darkVariantPlaceholder};
            }
          `
        }

        ${
          darkVariant &&
          css`
            ${!isFocused &&
            searchHasValue &&
            !showSearchButton &&
            css`
              color: ${theme.search.darkVariantText};
            `}
            ${!isFocused &&
            !searchHasValue &&
            css`
              color: ${theme.search.darkVariantPlaceholder};
            `}
          `
        }
      }

      ${StyledInputPresentation} {
        background-color: ${
          searchHasValue || isFocused ? `${theme.colors.white}` : "transparent"
        }
        flex: 1;
        font-size: 14px;
        font-weight: 700;
        padding-bottom: 2px;
        padding-top: 1px; 
        cursor: pointer;
          ${
            !isFocused &&
            !searchHasValue &&
            css`
              border: 1px solid transparent;
              color: ${theme.icon.default};
            `
          }
          ${
            !isFocused &&
            searchHasValue &&
            !showSearchButton &&
            css`
              border: 1px solid transparent;
              background-color: ${darkVariant
                ? "transparent"
                : `${theme.colors.white}`};
            `
          }
        }

      ${StyledFormField} {
        flex: 1;
        z-index: ${theme.zIndex.smallOverlay};
      }
      ${StyledButton} { 
        background-color: ${theme.search.button};
        cursor: pointer;
        color: ${theme.colors.white};
      }
      ${StyledIcon} {
        color: ${
          iconColor ? `${theme.search.icon}` : `${theme.search.iconDarkVariant}`
        };
        ${
          !darkVariant &&
          css`
            color: ${theme.search.icon};
          `
        }
        width: 20px;
        height: 20px;
        cursor: pointer;
        :hover {
          color: ${
            iconColor
              ? `${theme.search.iconHover}`
              : `${theme.search.iconDarkVariantHover}`
          };
          ${
            !darkVariant &&
            css`
              color: ${theme.search.iconHover};
            `
          }
        };
      }
    `;
  }}
`;

StyledSearch.defaultProps = { theme: baseTheme };
export default StyledSearch;

export const StyledSearchButton = styled.div`
  display: inline-flex;
  border-bottom: none;
  &&& ${StyledButton} {
    ${({ theme }) => css`
      background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      :hover {
        background: ${theme.colors.secondary};
        border-color: ${theme.colors.secondary};
      }
    `}

    width: 40px;
    margin: 0px 0px;
    padding-bottom: 3px;
    :focus {
      z-index: ${({ theme }) => theme.zIndex.smallOverlay};
    }
  }
`;

export const StyledButtonIcon = styled.div`
  &&& ${StyledIcon} {
    color: white;
    margin-right: 0px;
  }
`;
StyledSearchButton.defaultProps = { theme: baseTheme };

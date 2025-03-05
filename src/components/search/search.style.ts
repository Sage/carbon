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
    searchHasValue,
    showSearchButton,
    theme,
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
      font-size: var(--fontSize100);
      font-weight: 500;

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

      ${StyledInput} {
        ::-moz-placeholder {
          color: var(--colorsUtilityYin055);
          opacity: 1;
        }
        ::placeholder {
          color: var(--colorsUtilityYin055);
        }

        ${darkVariant &&
        css`
          ::-moz-placeholder {
            color: var(--colorsUtilityYang080);
            opacity: 1;
          }
          ::placeholder {
            color: var(--colorsUtilityYang080);
          }
        `}

        ${darkVariant &&
        searchHasValue &&
        !showSearchButton &&
        css`
          color: var(--colorsUtilityYang100);
        `}
      }

      ${StyledInputPresentation} {
        [data-element="search"] {
          height: auto;

          ${!darkVariant &&
          css`
            color: var(--colorsUtilityYin065);

            :hover {
              color: var(--colorsUtilityYin100);
            }
          `}

          ${darkVariant &&
          css`
            color: var(--colorsUtilityYang080);

            :hover {
              color: var(--colorsUtilityYang100);
            }
          `}
        }

        ${darkVariant &&
        !showSearchButton &&
        css`
          background-color: transparent;
          border-color: var(--colorsUtilityYang080);
        `}

        ${!darkVariant &&
        css`
          background-color: ${searchHasValue || isFocused || showSearchButton
            ? "var(--colorsUtilityYang100)"
            : "transparent"};
        `}

        ${showSearchButton &&
        css`
          border-top-right-radius: var(--borderRadius000);
          border-bottom-right-radius: var(--borderRadius000);
        `}

        flex: 1;
        font-size: var(--fontSize100);
        font-weight: 500;
        padding-bottom: var(--spacing025);
        padding-top: 1px;
        cursor: pointer;

        ${!isFocused &&
        !searchHasValue &&
        !showSearchButton &&
        css`
          border: 1px solid transparent;
        `}

        ${!isFocused &&
        searchHasValue &&
        !showSearchButton &&
        css`
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

StyledSearch.defaultProps = { theme: baseTheme };

export default StyledSearch;

import styled, { css } from "styled-components";
import StyledInputPresentation from "../input/input-presentation.style";
import StyledIcon from "../../../components/icon/icon.style";
import StyledButton from "../../../components/button/button.style";
import { baseTheme } from "../../../style/themes";
import StyledFormField from "../form-field/form-field.style";

const StyledSearch = styled.div`
  ${({ isFocused, searchWidth, searchIsActive, searchHasValue, theme }) => {
    return css`
      width: ${searchWidth ? `${searchWidth}` : "100%"};
      padding-bottom: 2px;
      background-color: transparent;
      border-bottom: 2px solid ${theme.search.passive};
      display: inline-flex;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 0px;
      :hover {
        border-bottom-color: ${theme.search.active};
        cursor: pointer;
      }
      ${
        !isFocused &&
        !searchHasValue &&
        css`
          ${StyledInputPresentation} {
            border: 1px solid transparent;
            color: ${theme.icon.default};
          }
        `
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
          color: ${theme.icon.defaultHover};
        `
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
      }
      ${StyledFormField} {
        flex: 1;
        z-index: ${theme.zIndex.overlay};
      }
      ${StyledButton} { 
        background-color: ${theme.search.button};
        cursor: pointer;
        color: ${theme.colors.white};
      }
      ${StyledIcon} {
        color: ${theme.search.searchActive};
        width: 20px;
        height: 20px;
        cursor: pointer;
        :hover {
          color: ${theme.icon.default};
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
      z-index: ${({ theme }) => theme.zIndex.overlay};
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

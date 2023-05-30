import styled, { css } from "styled-components";

import StyledIconButton from "../icon-button/icon-button.style";
import StyledIcon from "../icon/icon.style";
import { BatchSelectionProps } from ".";
import addFocusStyling from "../../style/utils/add-focus-styling";

const oldFocusStyling = `
  outline: solid 3px var(--colorsSemanticFocus500);
`;

const StyledBatchSelection = styled.div<
  Pick<BatchSelectionProps, "disabled" | "colorTheme" | "hidden">
>`
  ${({ disabled, colorTheme, hidden }) => css`
    align-items: center;
    display: inline-flex;
    border-radius: var(--borderRadius100);

    ${hidden && "opacity: 0;"}

    ${StyledIcon} {
      color: var(--colorsActionMajorYin065);
      &:focus {
        ${({ theme }) =>
          `${theme.focusRedesignOptOut ? oldFocusStyling : addFocusStyling()}`}
      }
    }

    ${colorTheme === "dark" &&
    css`
      background-color: var(--colorsUtilityMajor500);
      color: var(--colorsUtilityYang100);

      ${StyledIcon} {
        color: var(--colorsActionMajorYang100);
      }
    `}

    ${colorTheme === "light" &&
    css`
      background-color: var(--colorsUtilityMajor150);
    `}

    ${colorTheme === "white" &&
    css`
      background-color: var(--colorsUtilityYang100);
      box-shadow: var(--boxShadow100);
    `}

    ${StyledIconButton} {
      margin: 0;
      position: static;
      padding: 10px;
    }

    ${StyledIconButton}:hover {
      background-color: var(--colorsActionMajor500);
      border-radius: var(--borderRadius100);

      ${StyledIcon} {
        color: var(--colorsActionMajorYang100);
      }
    }

    ${StyledIconButton}:focus {
      border-radius: var(--borderRadius100);
      ${({ theme }) =>
        `${theme.focusRedesignOptOut ? oldFocusStyling : addFocusStyling()}`}
    }

    ${disabled &&
    css`
      background: transparent;
      color: var(--colorsUtilityYin030);
      cursor: not-allowed;

      ${StyledIconButton} {
        background: transparent;
        pointer-events: none;

        ${StyledIcon} {
          color: var(--colorsActionMajorYin030);
        }
      }
    `}
  `}
`;

const StyledSelectionCount = styled.span`
  display: inline-block;
  padding: 10px 15px;
`;

export { StyledBatchSelection, StyledSelectionCount };

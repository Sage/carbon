import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledButton from "../button/button.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import StyledIcon from "../icon/icon.style";
import { MultiActionButtonProps } from "./multi-action-button.component";
import computeSizing from "../../style/utils/element-sizing";
import { borderRadiusStyling } from "../split-button/split-button-children.style";

type StyledMultiActionButtonProps = Pick<MultiActionButtonProps, "width"> & {
  displayed: boolean;
};

const StyledMultiActionButton = styled.div.attrs(
  applyBaseTheme,
)<StyledMultiActionButtonProps>`
  ${margin}

  display: inline-block;
  position: relative;

  ${({ width }) =>
    width &&
    css`
      ${computeSizing({ width })}

      ${StyledButton} {
        width: 100%;
        justify-content: space-between;
      }

      /* The toggle button's dropdown icon is a child nested inside the
         main-text span, so the button's space-between has nothing to push
         apart. Stretch the wrapper and main-text full width and space them
         out here so the icon sits at the button's end (as it did before the
         icon was moved into children to inherit the button colour). */
      & > ${StyledButton} {
        > span {
          flex: 1;
          min-width: 0;
        }

        [data-element="main-text"] {
          width: 100%;
          justify-content: space-between;
        }
      }
    `}

  & > ${StyledButton} {
    margin: 0;

    ${StyledIcon} {
      margin-left: 0;
      left: 8px;
    }

    &:focus {
      background-color: var(--colorsActionMajor700);
      border: 3px solid var(--colorsActionMajor700);
      outline: none;
      margin: 0 -1px;

      &,
      ${StyledIcon} {
        color: var(--colorsActionMajorYang100);
      }
    }

    &:active {
      background-color: var(--colorsActionMajor700);
      border-color: var(--colorsActionMajor700);

      &&& {
        color: var(--colorsActionMajorYang100);
      }

      &&& [data-component="icon"]:not([data-color]) {
        color: var(--colorsActionMajorYang100);
      }
    }

    ${({ displayed }) =>
      displayed &&
      css`
        background-color: var(--colorsActionMajor700);
        border-color: var(--colorsActionMajor700);

        &,
        ${StyledIcon} {
          color: var(--colorsActionMajorYang100);
        }

        &:focus {
          margin: 0 -1px;
        }
      `}
  }
`;

type StyledButtonChildrenContainerProps = {
  align: "left" | "right";
  minWidth: number;
};

const StyledButtonChildrenContainer = styled.ul.attrs(
  applyBaseTheme,
)<StyledButtonChildrenContainerProps>`
  ${({ theme, align, minWidth }) => css`
    background-color: var(--colorsActionMajorYang100);
    min-width: ${minWidth}px;
    white-space: nowrap;
    z-index: ${theme.zIndex.popover};
    box-shadow: var(--boxShadow100);
    border-radius: var(--borderRadius100);
    list-style: none;
    padding: 0;
    margin: 0;

    ${borderRadiusStyling}

    ${StyledButton} {
      border: 1px solid var(--colorsActionMajorTransparent);
      display: flex;
      justify-content: ${align};
      margin-left: 0;
      min-width: 100%;
      text-align: ${align};

      & + & {
        margin-top: 3px;
      }

      &:focus {
        position: relative;
        z-index: 1;
      }
    }
  `}
`;

export { StyledButtonChildrenContainer, StyledMultiActionButton };

import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";

import applyBaseTheme from "../../style/themes/apply-base-theme";
import IconButton from "../icon-button";
import StyledIcon from "../icon/icon.style";

import { PodProps } from "./pod.component";
import { PodSize, PodVariant } from "./pod.config";

type StyledPodProps = MarginProps &
  Pick<PodProps, "alignTitle" | "internalEditButton" | "height">;

const StyledPod = styled.div.attrs(applyBaseTheme)<StyledPodProps>`
  ${margin}
  display: flex;
  align-items: flex-start;
  width: 100%;
  ${({ internalEditButton }) => internalEditButton && "position: relative"};
  ${({ height }) => height && `height: ${height}`};

  &:focus {
    outline: none;
  }
`;

const blockBackgrounds = {
  primary: "var(--colorsUtilityYang100)",
  secondary: "var(--colorsUtilityMajor025)",
  tertiary: "var(--colorsUtilityMajor040)",
  transparent: "var(--colorsUtilityMajorTransparent)",
  tile: "var(--colorsUtilityYang100)",
};

interface StyledBlockProps
  extends Pick<PodProps, "softDelete" | "internalEditButton"> {
  variant: PodVariant;
  noBorder: boolean;
  hasButtons: boolean;
  contentTriggersEdit?: boolean;
  fullWidth?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
}
const StyledBlock = styled.div<StyledBlockProps>`
  ${({
    variant,
    softDelete,
    noBorder,
    hasButtons,
    contentTriggersEdit,
    fullWidth,
    internalEditButton,
    isHovered,
    isFocused,
  }) => css`
    box-sizing: border-box;
    border-radius: var(--borderRadius100);
    display: flex;
    flex-direction: column;
    background-color: ${blockBackgrounds[variant]};
    width: 100%;
    height: 100%;

    ${variant === "tile" && "box-shadow: 0 2px 3px 0 rgba(2, 18, 36, 0.2)"};

    ${noBorder
      ? "border: none"
      : `border: 1px solid var(--colorsUtilityMajor100)`};

    ${hasButtons && !(fullWidth || internalEditButton) && "width: auto;"};

    ${contentTriggersEdit && "cursor: pointer"};

    ${(isHovered || isFocused) &&
    css`
      background-color: var(--colorsUtilityMajor075);

      ${internalEditButton &&
      variant === "tile" &&
      "background-color: var(--colorsUtilityMajorTransparent);"}

      ${contentTriggersEdit &&
      css`
        background-color: var(--colorsActionMajor600);
        * {
          color: var(--colorsUtilityYang100);
        }
      `}
    `}

    ${(!internalEditButton || contentTriggersEdit) &&
    (isFocused
      ? css`
          outline: 3px solid var(--colorsSemanticFocus500);
          border: none;
          padding: ${noBorder ? 0 : 1}px;
        `
      : css`
          outline: none;
        `)}

      ${softDelete &&
    css`
      border: none;
      background-color: var(--colorsActionDisabled500);

      & > * {
        color: var(--colorsUtilityYin065);
      }
    `};
  `}
`;

const contentPaddings = {
  "extra-small": "8px",
  small: "8px",
  medium: "16px",
  large: "32px 24px",
  "extra-large": "40px",
};

const StyledContent = styled.div<{ size: PodSize }>`
  text-align: left;
  padding: ${({ size }) => contentPaddings[size]};
  flex-grow: 1;
`;

const footerPaddings = {
  "extra-small": "8px",
  small: "8px",
  medium: "8px 16px",
  large: "16px 24px",
  "extra-large": "24px 40px",
};

interface StyledFooterProps extends Pick<PodProps, "softDelete"> {
  variant: PodVariant;
  size: PodSize;
}
const StyledFooter = styled.div<StyledFooterProps>`
  ${({ variant, size, softDelete }) => css`
    background-color: var(--colorsUtilityMajor025);
    border-bottom-left-radius: var(--borderRadius100);
    border-bottom-right-radius: var(--borderRadius100);
    box-shadow: inset 0px 1px 1px 0 rgba(0, 0, 0, 0.1);
    color: var(--colorsUtilityYin090);
    padding: ${footerPaddings[size]};

    ${softDelete && `color: var(--colorsUtilityYin055)`};

    ${variant === "tile" &&
    `border-top: 1px solid var(--colorsUtilityMajor100)`};
  `}
`;

const StyledActionsContainer = styled.div<Pick<PodProps, "internalEditButton">>`
  display: flex;
  flex-direction: column;

  ${({ internalEditButton }) =>
    internalEditButton &&
    css`
      position: absolute;
      right: 2px;
      top: 2px;
      z-index: 10;
    `}
`;

const actionButtonSizes = {
  "extra-small": 34,
  small: 34,
  medium: 50,
  large: 50,
  "extra-large": 50,
};

const actionButtonBackgrounds = {
  primary: "var(--colorsActionMajorYang100)",
  secondary: "var(--colorsActionMinor050)",
  tertiary: "var(--colorsActionMinor100)",
  transparent: "var(--colorsActionMajorTransparent)",
  tile: "var(--colorsActionMajorYang100)",
};

interface CommonPodButtonProps extends Pick<PodProps, "internalEditButton"> {
  isHovered?: boolean;
  isFocused?: boolean;
  size: PodSize;
  noBorder: boolean;
  variant: PodVariant;
}

interface StyledEditActionProps extends CommonPodButtonProps {
  displayOnlyOnHover?: boolean;
}

const StyledEditAction = styled(IconButton)<StyledEditActionProps>`
  && {
    ${({
      displayOnlyOnHover,
      isHovered,
      isFocused,
      variant,
      size,
      internalEditButton,
      noBorder,
    }) => css`
      cursor: pointer;
      background-color: ${actionButtonBackgrounds[variant]};
      border: 1px solid var(--colorsActionMinor200);
      margin-left: 8px;
      margin-bottom: 8px;
      box-sizing: border-box;
      height: ${`${actionButtonSizes[size]}px`};
      width: ${`${actionButtonSizes[size]}px`};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--borderRadius100);

      ${StyledIcon} {
        top: -2px;
        height: 16px;
        width: 16px;
        color: var(--colorsActionMajor500);
      }

      ${displayOnlyOnHover && !(isHovered || isFocused) && "display: none"}

      ${noBorder && "border: none;"}

      ${internalEditButton &&
      css`
        border: none;
        background: var(--colorsActionMajorTransparent);
      `}

      ${(isHovered || isFocused) &&
      !internalEditButton &&
      css`
        background-color: var(--colorsActionMajor600);
        color: var(--colorsActionMajorYang100);

        ${StyledIcon} {
          color: var(--colorsActionMajorYang100);
        }
      `}

      ${isFocused &&
      css`
        outline: 3px solid var(--colorsSemanticFocus500);
        border: none;
      `};
    `};
  }

  [data-component="link-content"] {
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute;
  }
`;

const StyledDeleteButton = styled(IconButton)<CommonPodButtonProps>`
  && {
    ${({
      noBorder,
      internalEditButton,
      isHovered,
      isFocused,
      variant,
      size,
    }) => css`
      cursor: pointer;
      background-color: ${actionButtonBackgrounds[variant]};
      border: ${noBorder ? "none" : "1px solid var(--colorsActionMinor200)"};
      margin-left: 8px;
      margin-bottom: 8px;
      box-sizing: border-box;
      height: ${`${actionButtonSizes[size]}px`};
      width: ${`${actionButtonSizes[size]}px`};
      border-radius: var(--borderRadius100);

      ${StyledIcon} {
        top: -2px;
        height: 16px;
        width: 16px;
        color: var(--colorsSemanticNegative500);
      }

      ${internalEditButton &&
      css`
        border: none;
        background: var(--colorsActionMajorTransparent);
      `}

      ${(isHovered || isFocused) &&
      !internalEditButton &&
      css`
        background-color: var(--colorsSemanticNegative600);
        color: var(--colorsActionMajorYang100);

        ${StyledIcon} {
          color: var(--colorsActionMajorYang100);
        }
      `}

      ${isFocused &&
      css`
        outline: 3px solid var(--colorsSemanticFocus500);
        border: none;
      `};
    `}
  }
`;

const StyledUndoButton = styled(IconButton)<CommonPodButtonProps>`
  && {
    ${({
      isHovered,
      isFocused,
      variant,
      size,
      noBorder,
      internalEditButton,
    }) => css`
      cursor: pointer;
      background-color: ${actionButtonBackgrounds[variant]};
      border: 1px solid var(--colorsActionMinor200);
      margin-left: 8px;
      margin-bottom: 8px;
      box-sizing: border-box;
      height: ${`${actionButtonSizes[size]}px`};
      width: ${`${actionButtonSizes[size]}px`};
      border-radius: var(--borderRadius100);

      ${StyledIcon} {
        top: -2px;
        height: 16px;
        width: 16px;
        color: var(--colorsActionMajor500);
      }

      ${noBorder && "border: none;"}

      ${internalEditButton &&
      css`
        border: none;
        background: var(--colorsActionMajorTransparent);
      `}

    ${(isHovered || isFocused) &&
      !internalEditButton &&
      css`
        background-color: var(--colorsActionMajor600);
        color: var(--colorsActionMajorYang100);

        ${StyledIcon} {
          color: var(--colorsActionMajorYang100);
        }
      `}

    ${isFocused &&
      css`
        outline: 3px solid var(--colorsSemanticFocus500);
        border: none;
      `};
    `}
  }
`;

const headerRightAlignMargins = {
  "extra-small": 20,
  small: 25,
  medium: 30,
  large: 30,
  "extra-large": 30,
};

interface StyledHeaderProps
  extends Pick<PodProps, "alignTitle" | "internalEditButton"> {
  size: PodSize;
}
const StyledHeader = styled.div<StyledHeaderProps>`
  ${({ alignTitle, internalEditButton, size }) => css`
    margin-bottom: 24px;
    text-align: ${alignTitle};

    ${alignTitle === "right" &&
    internalEditButton &&
    css`
      margin-right: ${headerRightAlignMargins[size]}px;
    `};
  `}
`;

const StyledSubtitle = styled.h5`
  margin-top: 8px;
  font-size: 14px;
  font-weight: normal;
`;

const StyledTitle = styled.h4`
  display: inline;
  font-size: 18px;
  font-weight: 500;
`;

export {
  StyledBlock,
  StyledContent,
  StyledEditAction,
  StyledActionsContainer,
  StyledDeleteButton,
  StyledUndoButton,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
};

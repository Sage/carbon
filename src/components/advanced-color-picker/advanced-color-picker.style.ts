import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledAdvancedColorPickerCell from "./advanced-color-picker-cell.style";
import { StyledColorOptions } from "../simple-color-picker/simple-color-picker.style";
import { StyledSimpleColor } from "../simple-color-picker/simple-color/simple-color.style";
import { StyledDialogContent } from "../dialog/__internal__/__next__/dialog.style";
import Dialog from "../dialog/dialog.component";
import StyledIconButton from "../icon-button/icon-button.style";
import checkerBoardSvg from "../simple-color-picker/simple-color/checker-board.svg";
import visuallyHiddenStyles from "../../style/utils/visually-hidden";
import { Dl } from "../definition-list";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const StyledAdvancedColorPickerWrapper = styled.div.attrs(applyBaseTheme)`
  ${margin}
  display: inline-block;
`;

/** To be replaced by accessibly hidden class added in FE-5503 */
const HiddenCurrentColorList = styled(Dl)`
  ${visuallyHiddenStyles}
`;

const StyledAdvancedColorPickerPreview = styled.div`
  width: 25px;
  height: 25px;
  margin-bottom: 15px;
  border: 1px solid var(--colorsUtilityYin090);
  border-radius: var(--borderRadius050);

  ${({ color }) =>
    color !== "transparent" &&
    css`
      background-color: ${color};
    `}

  ${({ color }) =>
    color === "transparent" &&
    css`
      background-color: #eeeeee;
      background-image: url("${checkerBoardSvg}");
      background-size: 10px 10px;
    `}

  &:hover {
    cursor: initial;
  }
`;

const DialogStyle = styled(Dialog)`
  ${StyledDialogContent} {
    padding: var(--spacing200);
  }

  ${StyledColorOptions} {
    max-width: 285px;
    ${StyledSimpleColor} {
      border: 1px solid var(--colorsUtilityYin090);
      margin-right: -1px;
      margin-bottom: -1px;
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  ${StyledColorOptions} {
    border: none;
  }

  ${StyledIconButton} {
    top: 20px;
    right: 13px;
  }

  [data-component="icon"] {
    color: var(--colorsActionMinor500);
  }
`;

export {
  StyledAdvancedColorPickerWrapper,
  HiddenCurrentColorList,
  StyledAdvancedColorPickerCell,
  StyledAdvancedColorPickerPreview,
  DialogStyle,
};

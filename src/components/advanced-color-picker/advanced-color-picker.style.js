import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledAdvancedColorPickerCell from "./advanced-color-picker-cell.style";
import { StyledColorOptions } from "../simple-color-picker/simple-color-picker.style";
import StyledSimpleColor from "../simple-color-picker/simple-color/simple-color.style";
import {
  DialogContentStyle,
  DialogInnerContentStyle,
} from "../dialog/dialog.style";
import Dialog from "../dialog/dialog.component";
import StyledIconButton from "../icon-button/icon-button.style";
import checkerBoardSvg from "../simple-color-picker/color-sample-box/checker-board.svg";
import baseTheme from "../../style/themes/base";

const StyledAdvancedColorPickerWrapper = styled.div`
  ${margin}
  display: inline-block;
`;

StyledAdvancedColorPickerWrapper.defaultProps = {
  theme: baseTheme,
};

const StyledAdvancedColorPickerPreview = styled.div`
  width: 25px;
  height: 25px;
  margin-bottom: 15px;
  border: 1px solid var(--colorsUtilityYin090);

  ${({ color }) =>
    color !== "transparent" &&
    css`
      background-color: ${color};
    `}

  ${({ color }) =>
    color === "transparent" &&
    css`
      background-color: #eeeeee;
      background-image: url(${checkerBoardSvg});
      background-size: 10px 10px;
    `}

  &:hover {
    cursor: initial;
  }
`;

const DialogStyle = styled(Dialog)`
  ${DialogContentStyle} {
    padding: 18px 18px 18px 17px;
  }

  ${DialogInnerContentStyle} {
    padding: 0;
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
    color: var(--colorsActionMinorYin065);
  }
`;

export {
  StyledAdvancedColorPickerWrapper,
  StyledAdvancedColorPickerCell,
  StyledAdvancedColorPickerPreview,
  DialogStyle,
};

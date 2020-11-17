import styled, { css } from "styled-components";
import StyledAdvancedColorPickerCell from "./advanced-color-picker-cell.style";
import { StyledColorOptions } from "../../__experimental__/components/simple-color-picker/simple-color-picker.style";
import StyledSimpleColor from "../../__experimental__/components/simple-color-picker/simple-color/simple-color.style";
import {
  DialogContentStyle,
  DialogInnerContentStyle,
} from "../dialog/dialog.style";
import Dialog from "../dialog/dialog.component";
import StyledIconButton from "../icon-button/icon-button.style";
import checkerBoardSvg from "../../__experimental__/components/simple-color-picker/color-sample-box/checker-board.svg";

const StyledAdvancedColorPickerWrapper = styled.div`
  display: inline-block;
  margin: 15px auto auto 15px;
`;

const StyledAdvancedColorPickerPreview = styled.div`
  width: 25px;
  height: 25px;
  margin-bottom: 15px;
  border: 1px solid #516562;

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
      border: 1px solid #3c514e;
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
`;

export {
  StyledAdvancedColorPickerWrapper,
  StyledAdvancedColorPickerCell,
  StyledAdvancedColorPickerPreview,
  DialogStyle,
};

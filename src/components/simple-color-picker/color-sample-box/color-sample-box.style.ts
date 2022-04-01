import styled, { css } from "styled-components";
import checkerBoardSvg from "./checker-board.svg";
import { TickIconProps } from "../tick-icon/tick-icon.style";

const StyledColorSampleBox = styled.div<Pick<TickIconProps, "color">>`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;

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
      background-size: 14px 14px;
      background-position: -2px -2px;
    `}
`;

export default StyledColorSampleBox;

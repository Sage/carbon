import styled, { css } from "styled-components";

const StyledColumn = styled.div`
  box-sizing: border-box;
  float: left;
  min-height: 1px;
  width: 100%;
  ${({ columnAlign }) =>
    (columnAlign === "center" || columnAlign === "middle") &&
    "text-align: center"}

  ${({ columnAlign }) => columnAlign === "right" && "text-align: right"}
  ${({ columns }) => css`
    width: ${100 / columns}%;
  `}
  ${({ columns, columnSpan }) => css`
    width: ${(100 / columns) * +columnSpan}%;
  `}
  ${({ columns, columnOffset }) => css`
    margin-left: ${(100 / columns) * +columnOffset}%;
  `}
`;

export default StyledColumn;

import styled, { css } from "styled-components";

const transparentSvg =
  "%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%" +
  "2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20fill-opacity%3D%22." +
  "45%22%3E%3Crect%20x%3D%22200%22%20width%3D%22200%22%20height%3D%22200%22%20%2" +
  "F%3E%3Crect%20y%3D%22200%22%20width%3D%22200%22%20height%3D%22200%22%20%2F%3E%3C%2Fsvg%3E";

const StyledAdvancedColorPickerCell = styled.button`
  display: block;
  width: 25px;
  height: 25px;
  border: 1px solid #516562;
  ${({ color }) =>
    color &&
    css`
      background-color: ${color};
    `}

  ${({ color }) =>
    color === "transparent" &&
    css`
      background: #eee url("data:image/svg+xml,${transparentSvg}");
      background-size: 10px 10px;
    `}

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: solid 3px #ffb500;
  }

  &::-moz-focus-inner {
    border: none;
  }
`;

export default StyledAdvancedColorPickerCell;

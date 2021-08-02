import React from "react";
import styled from "styled-components";
import { toColor } from "../../../style/utils/color";
import { baseTheme } from "../../../style/themes";

const StyledPlaceHolder = styled.div`
  overflow: hidden;
  position: relative;
  height: 152px;
  min-width: 152px;
  background-color: ${({ theme }) => theme.editorLinkPreview.background};
`;

const Circle = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.editorLinkPreview.hoverBackground};
  position: absolute;
  left: 22px;
  top: 30px;
`;

const Square = styled.div`
  height: 200px;
  width: 200px;
  transform: rotate(45deg);
  background-color: ${({ color, theme }) => toColor(theme, color)};
  position: absolute;
  border-radius: 2%;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
`;

StyledPlaceHolder.defaultProps = {
  theme: baseTheme,
};

Circle.defaultProps = {
  theme: baseTheme,
};

Square.defaultProps = {
  theme: baseTheme,
};

const Placeholder = () => (
  <StyledPlaceHolder data-component="link preview image placeholder">
    <Circle />
    <Square color="slateTint90" top="120px" left="-64px" />
    <Square color="slateTint75" top="96px" left="16px" />
  </StyledPlaceHolder>
);

export default Placeholder;

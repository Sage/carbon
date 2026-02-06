import React from "react";
import styled from "styled-components";

const StyledPlaceHolder = styled.div`
  overflow: hidden;
  position: relative;
  height: 152px;
  min-width: 152px;
  background-color: var(--colorsUtilityMajor025);
  border-bottom-left-radius: var(--borderRadius100);
  border-top-left-radius: var(--borderRadius100);
`;

const Circle = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background-color: var(--colorsUtilityMajor100);
  position: absolute;
  left: 22px;
  top: 30px;
`;

const Square = styled.div<{ top: string; left: string }>`
  height: 200px;
  width: 200px;
  transform: rotate(45deg);
  background-color: ${({ color }) => color};
  position: absolute;
  border-radius: 2%;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
`;

const Placeholder = () => (
  <StyledPlaceHolder
    data-component="link preview image placeholder"
    data-role="link preview image placeholder"
  >
    <Circle />
    <Square color="var(--colorsUtilityMajor050)" top="120px" left="-64px" />
    <Square color="var(--colorsUtilityMajor150)" top="96px" left="16px" />
  </StyledPlaceHolder>
);

export default Placeholder;

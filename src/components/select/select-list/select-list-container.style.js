import styled from "styled-components";
import { baseTheme } from "../../../style/themes";

const overhang = 4;

const StyledSelectListContainer = styled.div`
  background-color: white;
  box-shadow: ${({ theme }) => `${theme.shadows.depth1}`};
  position: absolute;
  z-index: 1000;
  top: 100%;
  width: calc(100% + ${2 * overhang}px);
  left: -${overhang}px;
  transition: height 0.15s ease-out;
  height: ${({ height }) => height};
  overflow: hidden;
`;

StyledSelectListContainer.defaultProps = {
  maxHeight: "180px",
  theme: baseTheme,
};

export default StyledSelectListContainer;

import styled from "styled-components";
import { baseTheme } from "../../../style/themes";

const StyledSelectListContainer = styled.div`
  background-color: white;
  box-shadow: ${({ theme }) => `${theme.shadows.depth1}`};
  position: absolute;
  ${({ placement }) => placement === "top" && "bottom: 0"};
  width: 100%;
  transition: height 0.15s ease-out;
  height: ${({ height }) => height};
  overflow: hidden;
`;

StyledSelectListContainer.defaultProps = {
  theme: baseTheme,
};

export default StyledSelectListContainer;

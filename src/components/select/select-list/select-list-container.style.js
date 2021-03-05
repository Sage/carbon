import styled from "styled-components";
import { baseTheme } from "../../../style/themes";

const StyledSelectListContainer = styled.div`
  background-color: white;
  box-shadow: ${({ theme }) => `${theme.shadows.depth1}`};
  position: absolute;
  ${({ placement }) => placement === "top-start" && "bottom: 0"};
  min-width: 100%;
  max-width: 870px;
  transition: height 0.15s ease-out;
  height: ${({ height }) => height};
  overflow: hidden;
`;

StyledSelectListContainer.defaultProps = {
  theme: baseTheme,
};

export default StyledSelectListContainer;

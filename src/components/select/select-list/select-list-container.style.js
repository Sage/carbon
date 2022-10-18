import styled from "styled-components";
import { baseTheme } from "../../../style/themes";

const StyledSelectListContainer = styled.div`
  background-color: white;
  box-shadow: var(--boxShadow100);
  overflow: hidden;
  animation: fadeIn 250ms ease-out;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.popover};

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

StyledSelectListContainer.defaultProps = {
  theme: baseTheme,
};

export default StyledSelectListContainer;

import styled from "styled-components";
import { baseTheme } from "../../../style/themes";

const StyledSelectListContainer = styled.div`
  background-color: white;
  box-shadow: var(--boxShadow100);
<<<<<<< HEAD
=======
  border-radius: var(--borderRadius050);
  overflow: hidden;
>>>>>>> 5b5e3826e (style: select list and checkbox fixed)
  animation: fadeIn 250ms ease-out;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.popover};
  max-height: ${({ maxHeight }) => `${maxHeight}px`};
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  ${({ isLoading }) => isLoading && "min-height: 150px"};

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

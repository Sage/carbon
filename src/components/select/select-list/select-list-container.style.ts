import styled from "styled-components";
import { baseTheme } from "../../../style/themes";
import { SelectListProps } from ".";

interface StyledSelectListContainerProps
  extends Pick<SelectListProps, "isLoading"> {
  maxHeight: number;
}

const StyledSelectListContainer = styled.div<StyledSelectListContainerProps>`
  background-color: white;
  box-shadow: var(--boxShadow100);
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

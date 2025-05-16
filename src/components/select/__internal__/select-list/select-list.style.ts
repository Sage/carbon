import styled, { css } from "styled-components";
import { baseTheme } from "../../../../style/themes";

interface StyledSelectListProps {
  listHeight?: number;
}

const StyledSelectList = styled.ul<StyledSelectListProps>`
  ${({ listHeight }) => css`
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    list-style-type: none;
    margin: 0;
    outline: none;
    padding: 0;
    position: relative;
    width: 100%;
    ${listHeight === undefined ? "" : `height: ${listHeight}px;`}
  `}
`;

const StyledSelectLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
  flex-grow: 1;
`;

const StyledSelectListTable = styled.table`
  background-color: var(--colorsUtilityYang100);
  border-collapse: collapse;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  white-space: nowrap;
  height: 180px;
  overflow-y: auto;

  thead,
  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
`;

interface StyledSelectListTableHeaderProps {
  scrollbarWidth: number;
}

// TODO (design-tokens): to match current style for border bottom colorsUtilityMajor100
const StyledSelectListTableHeader = styled.thead<StyledSelectListTableHeaderProps>`
  border-bottom: 1px solid var(--colorsUtilityMajor050);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;

  tr {
    width: ${({ scrollbarWidth }) => `calc(100% - ${scrollbarWidth}px)`};
  }

  th {
    position: sticky;
    top: 0;
    padding: var(--spacing200);
    background-color: white;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    color: var(--colorsUtilityYin055);
    :after {
      content: "";
      display: block;
      position: absolute;
      bottom: -8px;
      left: 0px;
      background-image: linear-gradient(
        var(--colorsUtilityMajor800),
        var(--colorsUtilityYang100)
      );
      opacity: 0.03;
      height: 8px;
      width: 100%;
    }
  }
`;

const StyledSelectListTableBody = styled.tbody<StyledSelectListProps>`
  display: block;
  width: 100%;
  table-layout: fixed;
  width: 100%;
  height: ${({ listHeight }) => `${listHeight}px`};
`;

interface StyledSelectListContainerProps {
  isLoading?: boolean;
  placement?: string;
}

const StyledSelectListContainer = styled.div<StyledSelectListContainerProps>`
  --zindex-default-value: ${({ theme }) => theme.zIndex.popover};

  background-color: white;

  box-shadow: var(--boxShadow100);

  &[data-floating-placement^="top"] {
    box-shadow:
      0 -5px 5px 0 #00141e33,
      0 -10px 10px 0 #00141e1a;
  }

  animation: fadeIn 250ms ease-out;
  position: absolute;
  z-index: var(
    --adaptive-sidebar-modal-open-zindex-reduced,
    var(--zindex-default-value)
  );

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  border-radius: var(--borderRadius050);
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

const StyledScrollableContainer = styled.div<{
  maxHeight: number;
  hasActionButton: boolean;
}>`
  max-height: ${({ maxHeight }) => `${maxHeight}px`};
  width: 100%;
  border-top-left-radius: var(--borderRadius050);
  border-top-right-radius: var(--borderRadius050);
  overflow-y: auto;

  ${({ hasActionButton }) =>
    !hasActionButton &&
    css`
      border-bottom-left-radius: var(--borderRadius050);
      border-bottom-right-radius: var(--borderRadius050);
    `}
`;

StyledSelectListContainer.defaultProps = {
  theme: baseTheme,
};

export {
  StyledSelectList,
  StyledSelectLoaderContainer,
  StyledSelectListTable,
  StyledSelectListTableHeader,
  StyledSelectListTableBody,
  StyledSelectListContainer,
  StyledScrollableContainer,
};

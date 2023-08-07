import styled, { css } from "styled-components";

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
    font-weight: 900;
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

export {
  StyledSelectList,
  StyledSelectLoaderContainer,
  StyledSelectListTable,
  StyledSelectListTableHeader,
  StyledSelectListTableBody,
};

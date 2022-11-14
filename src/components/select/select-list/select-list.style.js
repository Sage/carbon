import styled, { css } from "styled-components";

const StyledSelectList = styled.ul`
  ${({ isLoading, multiColumn }) => css`
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    list-style-type: none;
    max-height: ${({ maxHeight }) => `${maxHeight}`}px;
    margin: 0;
    outline: none;
    overflow-x: hidden;
    overflow-y: ${multiColumn ? "hidden" : "auto"};
    padding: 0;

    ${
      isLoading &&
      css`
        min-height: 150px;
      `
    }}
  `}
`;

StyledSelectList.defaultProps = {
  maxHeight: "180px",
};

const StyledSelectLoaderContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
`;

const StyledSelectListTable = styled.table`
  background-color: var(--colorsUtilityYang100);
  border-collapse: collapse;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  white-space: nowrap;
  height: 180px;

  thead,
  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
`;

// TODO (design-tokens): to match current style for border bottom colorsUtilityMajor100
const StyledSelectListTableHeader = styled.thead`
  border-bottom: 1px solid var(--colorsUtilityMajor050);

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

const StyledSelectListTableBody = styled.tbody`
  display: block;
  overflow-y: auto;
  width: 100%;
  table-layout: fixed;
  max-height: 132px;
`;

export {
  StyledSelectList,
  StyledSelectLoaderContainer,
  StyledSelectListTable,
  StyledSelectListTableHeader,
  StyledSelectListTableBody,
};

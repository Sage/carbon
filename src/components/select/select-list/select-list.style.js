import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";

const overhang = 4;

const StyledPopoverContainer = styled.div`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.popover};
  height: ${({ height }) => height};
  width: calc(100% + ${2 * overhang}px);
  ${({ width }) =>
    css`
      width: ${width};
    `};
`;

StyledPopoverContainer.defaultProps = {
  theme: baseTheme,
};

const StyledSelectList = styled.ul`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  list-style-type: none;
  max-height: ${({ maxHeight }) => `${maxHeight}`};
  margin: 0;
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;

  ${({ isLoading }) =>
    isLoading &&
    css`
      min-height: 150px;
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
  background-color: ${({ theme }) => theme.colors.white};
  border-collapse: separate;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  white-space: nowrap;
`;

StyledSelectListTable.defaultProps = {
  theme: baseTheme,
};

const StyledSelectListTableHeader = styled.thead`
  th {
    position: sticky;
    top: 0px;
    padding: ${({ theme }) => 2 * theme.spacing}px;
    border-bottom: 1px solid ${({ theme }) => theme.select.tableHeaderBorder};
    background-color: white;
    text-align: left;
    font-weight: 900;
    font-size: 12px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.tileSelect.descriptionColor};
    :after {
      content: "";
      display: block;
      position: absolute;
      bottom: -8px;
      left: 0px;
      background-image: linear-gradient(
        ${({ theme }) => theme.colors.black},
        ${({ theme }) => theme.colors.white}
      );
      opacity: 0.03;
      height: 8px;
      width: 100%;
    }
  }
`;

StyledSelectListTableHeader.defaultProps = {
  theme: baseTheme,
};

export {
  StyledPopoverContainer,
  StyledSelectList,
  StyledSelectLoaderContainer,
  StyledSelectListTable,
  StyledSelectListTableHeader,
};

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
  align-items: center;
  flex-direction: column;
  list-style-type: none;
  max-height: ${(props) => `${props.maxHeight}`};
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

export {
  StyledSelectList,
  StyledSelectLoaderContainer,
  StyledPopoverContainer,
};

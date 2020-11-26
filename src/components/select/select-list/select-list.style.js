import styled, { css } from "styled-components";

const StyledSelectList = styled.ul`
  box-sizing: border-box;
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
      display: flex;
      align-items: center;
      min-height: 100px;
    `}
`;

StyledSelectList.defaultProps = {
  maxHeight: "180px",
};

const StyledSelectLoaderContainer = styled.li`
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
`;

export { StyledSelectList, StyledSelectLoaderContainer };

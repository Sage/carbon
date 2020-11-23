import styled, { css } from "styled-components";

const StyledSelectList = styled.ul`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
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

  height: ${({ height }) => height};
  transition: height 0.3s ease-in;
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

import styled from "styled-components";

const StyledSelectList = styled.ul`
  box-sizing: border-box;
  list-style-type: none;
  max-height: ${(props) => `${props.maxHeight}`};
  margin: 0;
  outline: none;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0;
`;

StyledSelectList.defaultProps = {
  maxHeight: "180px",
};

export default StyledSelectList;

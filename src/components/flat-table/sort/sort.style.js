import styled from "styled-components";
import StyledIcon from "../../icon/icon.style";

const StyledSort = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
  border-bottom: 1px solid transparent;
  position: relative;

  ${StyledIcon} {
    width: 16px;
    height: 16px;
    padding-left: 6px;
    color: var(--colorsUtilityMajor200);
  }

  :hover {
    border-bottom: 1px solid;
    cursor: pointer;
  }

  :focus {
    outline: 1px solid var(--colorsSemanticFocus500);
  }
`;

const StyledSpaceHolder = styled.div`
  display: inline-block;
  width: 22px;
`;

export { StyledSort, StyledSpaceHolder };

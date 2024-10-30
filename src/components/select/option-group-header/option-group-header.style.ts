import styled from "styled-components";
import StyledIcon from "../../icon/icon.style";

const StyledOptionGroupHeader = styled.div`
  box-sizing: border-box;
  height: 40px;
  padding-left: 16px;
  padding-top: 16px;
  display: flex;
  align-items: center;
  width: 100%;

  h4 {
    font-size: 12px;
    text-transform: uppercase;
    line-height: 18px;
    text-align: left;
    margin: 0;
    color: var(--colorsUtilityYin055);
  }

  ${StyledIcon} {
    margin-right: 4px;
    margin-left: -5px;
    color: var(--colorsUtilityYin055);

    &:hover {
      color: var(--colorsUtilityYin055);
    }
  }
`;

export default StyledOptionGroupHeader;

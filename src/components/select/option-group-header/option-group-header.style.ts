import styled from "styled-components";
import StyledIcon from "../../icon/icon.style";

const StyledOptionGroupHeader = styled.div`
  box-sizing: border-box;
  position: absolute;
  height: 40px;
  padding-left: var(--spacing200);
  padding-top: var(--spacing200);
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  ${StyledIcon} {
    margin-right: var(--spacing050);
    margin-left: -5px;
    color: var(--colorsUtilityYin055);

    &:hover {
      color: var(--colorsUtilityYin055);
    }
  }
`;

const StyledOptionGroupHeaderLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 18px;
  text-align: left;
  margin: var(--spacing000);
  color: var(--colorsUtilityYin055);
`;

export { StyledOptionGroupHeader, StyledOptionGroupHeaderLabel };

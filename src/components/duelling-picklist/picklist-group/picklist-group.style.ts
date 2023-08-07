import styled, { css } from "styled-components";
import Button from "../../button";
import { StyledButton } from "../picklist-item/picklist-item.style";
import { PicklistGroupProps } from "./picklist-group.component";

const StyledGroupWrapper = styled.li<{
  highlighted: boolean;
  type: PicklistGroupProps["type"];
}>`
  ${({ highlighted, type }) => css`
    &:not(:first-of-type) {
      margin-top: 16px;
    }

    ${highlighted &&
    css`
      ${StyledButton} {
        background: ${
          type === "add"
            ? "var(--colorsActionMajor600)"
            : "var(--colorsSemanticNegative600)"
        }
    `}
  `}
`;

const StyledPicklistGroupUl = styled.ul`
  padding: 0;
`;

const StyledPicklistGroup = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
`;

const StyledGroupButton = styled(Button)<{
  onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  iconType: PicklistGroupProps["type"];
}>`
  ${({ iconType }) => css`
    padding: 0;
    margin-right: 0;
    margin-left: auto;
    height: 40px;
    min-width: 40px;
    border: none;

    &:focus {
      > span {
        color: var(--colorsActionMajorYang100);
      }
      background: ${
        iconType === "add"
          ? "var(--colorsActionMajor600)"
          : "var(--colorsSemanticNegative600)"
      }
  `}
`;

export {
  StyledGroupWrapper,
  StyledPicklistGroupUl,
  StyledPicklistGroup,
  StyledGroupButton,
};

import styled, { css } from "styled-components";
import { ButtonWithForwardRef } from "../../button";
import { StyledButton } from "../picklist-item/picklist-item.style";

const StyledGroupWrapper = styled.li`
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

const StyledGroupButton = styled(ButtonWithForwardRef)`
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

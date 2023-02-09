import styled, { css } from "styled-components";

export interface StyledNavigationItemProps {
  isSelected?: boolean;
}

const StyledNavigationItem = styled.li<StyledNavigationItemProps>`
  width: 100%;

  a {
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: var(--colorsUtilityYin090);
    background-color: transparent;
    border-left: var(--sizing050) solid var(--colorsActionMinor100);
    font-weight: 700;
    padding: 12px 24px;

    &:focus {
      outline: var(--borderWidth300) solid var(--colorsSemanticFocus500);
    }

    &:hover {
      background-color: ${({ isSelected }) =>
        !isSelected && "var(--colorsActionMinor100)"};
    }

    ${({ isSelected }) =>
      isSelected &&
      css`
        background-color: var(--colorsActionMajorYang100);
        border-left-color: var(--colorsActionMajor500);
      `}
  }
`;

export default StyledNavigationItem;
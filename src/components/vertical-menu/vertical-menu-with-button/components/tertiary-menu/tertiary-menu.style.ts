import styled from "styled-components";

import addFocusStyling from "../../../../../style/utils/add-focus-styling";

const StyledTertiaryMenuItem = styled.a`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: var(--colorsUtilityYang100);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 400;
  justify-content: space-between;
  margin-left: 16px;
  margin-right: 16px;
  min-height: 40px;
  padding: 0 16px;
  text-decoration: none;

  &:hover {
    background-color: var(--colorsActionMajor500);
  }

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: 8px;
  }

  &:focus {
    ${addFocusStyling()}
  }
`;

export default StyledTertiaryMenuItem;

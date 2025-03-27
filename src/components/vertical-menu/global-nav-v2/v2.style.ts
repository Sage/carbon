import styled, { css } from "styled-components";

import Box from "../../box";
import Button from "../../button";

interface StyledButtonProps {
  active?: boolean;
}
interface StyledVerticalMenuProps {
  height?: string;
  reduceMotion?: boolean;
  top?: string;
}
interface StyledVerticalSubMenuProps {
  height?: string;
  left?: string;
  reduceMotion?: boolean;
  top?: string;
}

interface StyledParentMenuItemProps {
  active?: boolean;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 0;
  background-color: var(
    ${({ active }) =>
      active ? "--colorsActionMinorGray700" : "--colorsUtilityYin100"}
  );

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
  }
`;

const StyledVerticalMenu = styled(Box)<StyledVerticalMenuProps>`
  height: ${({ height }) => height || "auto"};
  position: fixed;
  top: ${({ top }) => top};
  z-index: 1000;

  ul {
    list-style-type: none;
    padding-left: 0;
    width: 100%;
  }
`;

const StyledVerticalMenuWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const StyledVerticalSubMenu = styled(Box)<StyledVerticalSubMenuProps>`
  height: ${({ height }) => height || "auto"};
  min-height: ${({ height }) => height || "auto"};
  position: fixed;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  z-index: 1000;
  border-left: 2px solid var(--colorsActionMajorYang030);

  ul {
    list-style-type: none;
    padding-left: 0;
    width: 100%;
  }
`;

const StyledVerticalMenuItem = styled.div`
  align-items: center;
  border-radius: 8px;
  color: var(--colorsUtilityYang100);
  display: flex;
  height: 40px;
  justify-content: center;

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
  }

  ::hover {
    background-color: var(--colorsActionMajor500);
  }
`;

const StyledParentMenuItem = styled.button<StyledParentMenuItemProps>`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: var(--colorsUtilityYang100);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 500;
  justify-content: space-between;
  min-height: 56px;
  padding: 0 16px;
  width: 100%;

  &:hover {
    background-color: var(--colorsActionMajor500);
  }

  ${({ active }) =>
    active &&
    `
    background-color: var(--colorsGray850);
  `}

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: 8px;
  }
`;

const StyledSubMenuParentMenuItem = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: var(--colorsUtilityYang100);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 500;
  justify-content: space-between;
  min-height: 56px;
  padding: 0 16px;
  width: 100%;

  &:hover {
    background-color: var(--colorsActionMajor500);
  }

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: 8px;
  }
`;

const StyledSubMenuMenuItem = styled.a`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: var(--colorsUtilityYang100);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 500;
  justify-content: space-between;
  min-height: 56px;
  padding: 0 16px;
  text-decoration: none;

  &:hover {
    background-color: var(--colorsActionMajor500);
  }

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: 8px;
  }
`;

const StyledSubMenuChildMenuItem = styled.a`
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
`;

const StyledDivider = styled.hr<{ nested?: boolean }>`
  color: #ffffff33;
  margin-left: 16px;
  margin-right: 16px;

  ${({ nested }) =>
    nested &&
    css`
      margin-left: 32px;
      margin-right: 32px;
    `}
`;

const StyledMenuItemContent = styled.span`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export {
  StyledButton,
  StyledDivider,
  StyledMenuItemContent,
  StyledParentMenuItem,
  StyledSubMenuChildMenuItem,
  StyledSubMenuMenuItem,
  StyledSubMenuParentMenuItem,
  StyledVerticalMenu,
  StyledVerticalMenuItem,
  StyledVerticalMenuWrapper,
  StyledVerticalSubMenu,
};

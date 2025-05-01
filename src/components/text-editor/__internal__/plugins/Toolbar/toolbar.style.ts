import styled, { css } from "styled-components";

import Button, { ButtonProps } from "../../../../button";

interface FormattingButtonProps extends ButtonProps {
  tabIndex?: number;
  isActive?: boolean;
}

const StyledToolbar = styled.div<{ hasHeader?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  background-color: var(--colorsActionMajorYang100);
  padding: 12px;
  border-top-left-radius: ${({ hasHeader }) =>
    hasHeader ? "0" : "var(--borderRadius100)"};
  border-top-right-radius: ${({ hasHeader }) =>
    hasHeader ? "0" : "var(--borderRadius100)"};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  justify-content: space-between;
  align-items: center;
  margin-left: 1px;
  margin-right: 1px;
`;

const FormattingButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const CommandButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const FormattingButton = styled(Button)<FormattingButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: var(--borderRadius100);
  border: medium;
  cursor: pointer;

  &:hover {
    > span {
      color: var(--colorsUtilityYang100) !important;
    }
  }

  ${({ isActive }) => css`
    background-color: ${isActive
      ? "var(--colorsActionMajor600)"
      : "transparent"};
  `}

  > span {
    ${({ isActive }) => css`
      color: ${isActive
        ? "var(--colorsUtilityYang100)"
        : "var(--colorsUtilityYin100) "} !important;
    `}
  }
`;

export { StyledToolbar, FormattingButtons, CommandButtons, FormattingButton };

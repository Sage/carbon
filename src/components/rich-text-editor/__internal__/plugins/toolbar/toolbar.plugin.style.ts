import styled, { css } from "styled-components";

import Button, { ButtonProps } from "../../../../../components/button";

interface FormattingButtonProps extends ButtonProps {
  isActive?: boolean;
}

const StyledToolbar = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  background-color: var(--colorsUtilityMajor025);
  outline: 1px solid var(--colorsUtilityMajor200);
  padding: 12px;
  border-radius: var(--borderRadius050);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  justify-content: space-between;
  align-items: center;
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
  ${({ isActive }) => css`
    background-color: ${isActive
      ? "var(--colorsActionMajor600)"
      : "transparent"};
  `}
`;

export { StyledToolbar, FormattingButtons, CommandButtons, FormattingButton };

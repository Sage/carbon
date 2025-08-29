import styled, { css } from "styled-components";

import Button, { ButtonProps } from "../../../../button";

interface FormattingButtonProps extends ButtonProps {
  tabIndex?: number;
  isActive?: boolean;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
}

export const getPaddingForSize = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "8px";
    case "medium":
      return "12px";
    case "large":
      return "16px";
    default:
      return "12px"; // Default to medium if size is not recognized
  }
};

const StyledToolbar = styled.div<{
  hasHeader?: boolean;
  size?: "small" | "medium" | "large";
}>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  background-color: var(--colorsActionMajorYang100);
  padding: ${(props) => getPaddingForSize(props.size || "medium")};
  border-top-left-radius: ${({ hasHeader }) =>
    hasHeader ? "0" : "var(--borderRadius100)"};
  border-top-right-radius: ${({ hasHeader }) =>
    hasHeader ? "0" : "var(--borderRadius100)"};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 1px solid var(--colorsUtilityMajor200);
  align-items: center;
  flex-wrap: wrap;
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

export { StyledToolbar, CommandButtons, FormattingButton };

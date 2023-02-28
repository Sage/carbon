import styled, { css } from "styled-components";
import { margin } from "styled-system";
import { baseTheme } from "../../../style/themes";
import {
  StyledButtonToggle,
  StyledButtonToggleWrapper,
} from "../button-toggle.style";

import { ButtonToggleGroupProps } from ".";

type StyledButtonToggleGroupProps = Pick<
  ButtonToggleGroupProps,
  "inputWidth" | "fullWidth"
>;

type StyledButtonToggleGroupWrapperProps = Pick<
  ButtonToggleGroupProps,
  "labelInline"
>;

export const StyledButtonToggleGroupWrapper = styled.div<StyledButtonToggleGroupWrapperProps>`
  ${({ labelInline }) =>
    labelInline &&
    css`
      display: flex;
    `}
`;

const StyledButtonToggleGroup = styled.div<StyledButtonToggleGroupProps>`
  ${margin}

  display: flex;

  ${StyledButtonToggle}:not(:first-of-type):not(:last-of-type) {
    border-radius: var(--borderRadius000);
  }

  ${StyledButtonToggle}:first-of-type ${StyledButtonToggle} {
    border-top-left-radius: var(--borderRadius400);
    border-bottom-left-radius: var(--borderRadius400);
    border-top-right-radius: var(--borderRadius000);
    border-bottom-right-radius: var(--borderRadius000);
  }

  ${StyledButtonToggle}:last-of-type ${StyledButtonToggle} {
    border-top-left-radius: var(--borderRadius000);
    border-bottom-left-radius: var(--borderRadius000);
    border-top-right-radius: var(--borderRadius400);
    border-bottom-right-radius: var(--borderRadius400);
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      ${StyledButtonToggle} {
        width: 100%;
      }
      ${StyledButtonToggleWrapper} {
        flex: auto;
      }
    `}

  ${({ inputWidth }) =>
    inputWidth &&
    css`
      width: ${`${inputWidth}%`};
    `}
`;

StyledButtonToggleGroup.defaultProps = {
  theme: baseTheme,
};

export default StyledButtonToggleGroup;

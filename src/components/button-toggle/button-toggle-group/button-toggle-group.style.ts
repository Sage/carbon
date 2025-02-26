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
  "inputWidth" | "fullWidth" | "disabled" | "labelInline"
>;

const StyledButtonToggleGroup = styled.div<StyledButtonToggleGroupProps>`
  ${margin}

  display: flex;
  box-shadow: inset 0px 0px 0px 1px var(--colorsActionMinor500);
  border-radius: var(--borderRadius100);
  padding: 4px;
  gap: 4px;
  width: fit-content;
  height: fit-content;
  flex-wrap: ${({ labelInline }) => (labelInline ? "nowrap" : "wrap")};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      box-shadow: inset 0px 0px 0px 1px var(--colorsActionDisabled600);
    `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
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

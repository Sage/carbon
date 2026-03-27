import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import {
  StyledButtonToggle,
  StyledButtonToggleWrapper,
} from "../button-toggle.style";

import { ButtonToggleGroupProps } from ".";

type StyledButtonToggleGroupProps = Pick<
  ButtonToggleGroupProps,
  "inputWidth" | "fullWidth" | "disabled" | "labelInline"
>;

const StyledButtonToggleGroup = styled.div
  .attrs(applyBaseTheme)
  .attrs({ type: "button" })<StyledButtonToggleGroupProps>`
  ${margin}

  display: flex;
  box-shadow: inset 0px 0px 0px 1px var(--button-typical-toggle-border-default);
  border-radius: var(--global-radius-container-xl);
  padding: var(--global-space-comp-xs);
  gap: var(--global-space-comp-s);
  width: fit-content;
  height: fit-content;
  flex-wrap: ${({ labelInline }) => (labelInline ? "nowrap" : "wrap")};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      box-shadow: inset 0px 0px 0px 1px
        var(--button-typical-toggle-border-disabled);
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

export default StyledButtonToggleGroup;

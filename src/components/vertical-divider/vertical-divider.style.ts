import styled, { css } from "styled-components";
import { space } from "styled-system";
import { VerticalDividerProps } from "./vertical-divider.component";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const StyledVerticalWrapper = styled.div.attrs(
  applyBaseTheme,
)<VerticalDividerProps>`
  ${space}
  ${({ height }) =>
    height &&
    css`
      height: ${typeof height === "string" ? `${height}` : `${height}px`};
    `}
  ${({ displayInline }) => (displayInline ? "display: inline;" : "")}
`;

const StyledDivider = styled.div.attrs(applyBaseTheme)<
  Pick<VerticalDividerProps, "tint">
>`
  height: 100%;
  border-left: 1px solid ${({ theme, tint }) => theme.palette.slateTint(tint)};
  display: inherit;
`;

export { StyledVerticalWrapper, StyledDivider };

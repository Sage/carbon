import styled, { css } from "styled-components";
import { DividerProps } from "./divider.component";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { margin, space } from "styled-system";

type ColorMapProps = {
  variant: DividerProps["variant"];
  inverse: DividerProps["inverse"];
};

type ColorMap = ({ variant, inverse }: ColorMapProps) => string;

const colorMap: ColorMap = ({ variant, inverse }) => {
  if (variant === "prominent") {
    if (inverse) {
      return "var(--container-standard-inverse-border-alt)";
    }

    return "var(--container-standard-border-alt)";
  }

  if (inverse) {
    return "var(--container-standard-inverse-border-default)";
  }
  return "var(--container-standard-border-default)";
};

const StyledVerticalDividerWrapper = styled.div.attrs(
  applyBaseTheme,
)<DividerProps>`
  ${space}
  ${({ height }) =>
    height &&
    css`
      height: ${typeof height === "string" ? `${height}` : `${height}px`};
    `}
  ${({ displayInline }) => (displayInline ? "display: inline;" : "")}
`;

const StyledVerticalDivider = styled.div.attrs(applyBaseTheme)<
  Pick<DividerProps, "variant" | "inverse">
>`
  height: 100%;
  border-left: var(--global-borderwidth-xs) solid
    ${({ variant, inverse }) => colorMap({ variant, inverse })};
  display: inherit;
`;

const StyledHorizontalDivider = styled.hr.attrs(applyBaseTheme)<DividerProps>`
  ${margin}
  width: 100%;
  border-width: var(--global-borderwidth-none);
  height: var(--global-borderwidth-xs);
  background-color: ${({ variant, inverse }) => colorMap({ variant, inverse })};
`;

export {
  StyledVerticalDividerWrapper,
  StyledVerticalDivider,
  StyledHorizontalDivider,
};

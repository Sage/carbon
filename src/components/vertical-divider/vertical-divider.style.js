import styled, { css } from "styled-components";
import { space } from "styled-system";
import { baseTheme } from "../../style/themes";

const StyledVerticalWrapper = styled.div`
  ${space}
  ${({ height }) =>
    height &&
    css`
      height: ${typeof height === "string" ? `${height};` : `${height}px;`};
    `}
  ${({ displayInline }) => (displayInline ? "display: inline;" : "")}
`;

const StyledDivider = styled.div`
  height: 100%;
  border-left: 1px solid ${({ theme, tint }) => theme.palette.slateTint(tint)};
  display: inherit;
`;

StyledVerticalWrapper.defaultProps = {
  theme: baseTheme,
};

StyledDivider.defaultProps = {
  theme: baseTheme,
};

export { StyledVerticalWrapper, StyledDivider };

import styled, { css } from "styled-components";
import { space } from "styled-system";
import { baseTheme } from "../../../style/themes";

const StyledTileFooter = styled.div`
  ${space}

  ${({ variant, theme }) => css`
    background: ${variant === "transparent"
      ? "transparent"
      : theme.tile.footerBackground};
    border-top: 1px solid ${theme.tile.border};
  `}
`;

StyledTileFooter.defaultProps = {
  theme: baseTheme,
};

export default StyledTileFooter;

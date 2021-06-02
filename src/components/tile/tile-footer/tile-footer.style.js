import styled, { css } from "styled-components";
import { padding } from "styled-system";
import { baseTheme } from "../../../style/themes";

const StyledTileFooter = styled.div`
  ${padding}

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

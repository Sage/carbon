import styled, { css } from "styled-components";
import { padding } from "styled-system";
import { baseTheme } from "../../../style/themes";

const getBackgroundColor = (variant) => {
  switch (variant) {
    case "transparent":
      return "transparent";
    case "black":
      return "var(--colorsUtilityYin100)";
    default:
      return "var(--colorsUtilityMajor100)";
  }
};

const StyledTileFooter = styled.div`
  ${padding}

  ${({ variant }) => css`
    background: ${getBackgroundColor(variant)};
    border-top: 1px solid var(--colorsUtilityMajor100);
  `}
`;

StyledTileFooter.defaultProps = {
  theme: baseTheme,
};

export default StyledTileFooter;

import styled from "styled-components";

import { baseTheme } from "../../../style/themes";

const StyledAnchorDivider = styled.div.attrs({
  "data-element": "anchor-navigation-divider",
})`
  background-color: ${({ theme }) => theme.anchorNavigation.divider};
  height: 1px;
`;

StyledAnchorDivider.defaultProps = {
  theme: baseTheme,
};

export default StyledAnchorDivider;

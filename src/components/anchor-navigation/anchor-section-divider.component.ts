import styled from "styled-components";

const AnchorSectionDivider = styled.div.attrs({
  "data-element": "anchor-navigation-divider",
})`
  background-color: var(--colorsActionMinor200);
  height: 1px;
`;

AnchorSectionDivider.displayName = "AnchorSectionDivider";
export default AnchorSectionDivider;

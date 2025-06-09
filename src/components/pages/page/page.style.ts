import styled from "styled-components";
import { padding } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";

const StyledPage = styled.div.attrs(applyBaseTheme)`
  width: 100%;
  position: absolute;
`;

const StyledPageContent = styled.div.attrs(applyBaseTheme)`
  ${padding}
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

export { StyledPage, StyledPageContent };

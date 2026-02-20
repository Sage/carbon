import styled from "styled-components";
import { DipsBoxProps } from "./dips-box.component";

import { flexboxCss, layoutCss, spacingCss } from "./utils/spacing";

const StyledDipsBox = styled.div<DipsBoxProps>`
  display: flex;

  ${(props) => spacingCss(props)}
  ${(props) => flexboxCss(props)}
  ${(props) => layoutCss(props)}
`;

const StyledDipsBoxContent = styled.div`
  display: flex;
`;

export { StyledDipsBox, StyledDipsBoxContent };

import styled from "styled-components";
import { DipsBoxProps } from "./dips-box.component";

import { spacingCss } from "./utils/spacing";

const StyledDipsBox = styled.div<DipsBoxProps>`
  display: flex;
  ${(props) => spacingCss(props)}
`;

const StyledDipsBoxContent = styled.div`
  display: flex;
`;

export { StyledDipsBox, StyledDipsBoxContent };

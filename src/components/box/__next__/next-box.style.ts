import styled from "styled-components";
import { NextBoxProps } from "./next-box.component";

import { flexboxCss, layoutCss, spacingCss } from "./utils/next-box.utils";

const StyledNextBox = styled.div<NextBoxProps>`
  display: flex;

  ${(props) => spacingCss(props)}
  ${(props) => flexboxCss(props)}
  ${(props) => layoutCss(props)}
`;

const StyledNextBoxContent = styled.div`
  display: flex;
`;

export { StyledNextBox, StyledNextBoxContent };

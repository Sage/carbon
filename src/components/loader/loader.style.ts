import { margin } from "../../style/utils/spacing";
import styled from "styled-components";

import applyBaseTheme from "../../style/themes/apply-base-theme";

const StyledLoader = styled.div.attrs(applyBaseTheme)`
  ${margin}
  text-align: center;
  white-space: nowrap;
`;

export default StyledLoader;

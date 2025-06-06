import styled from "styled-components";
import { space } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const StyledBreadcrumbs = styled.nav.attrs(applyBaseTheme)`
  ${space}

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
`;

export default StyledBreadcrumbs;

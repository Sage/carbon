import styled from "styled-components";
import { space } from "styled-system";
import baseTheme from "../../style/themes/base";

const StyledBreadcrumbs = styled.nav`
  ${space}

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
`;

StyledBreadcrumbs.defaultProps = { theme: baseTheme };

export default StyledBreadcrumbs;

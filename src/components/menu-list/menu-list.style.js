import styled from "styled-components";
import { baseTheme } from "../../style/themes";

const StyledMenuList = styled.div`
  ul {
    list-style: none;
    padding-left: 0;

    .carbon-menu-list__list {
      padding-left: 19px;

      .carbon-menu-list-item {
        font-size: 13px;
        font-weight: 300;

        .carbon-link__anchor {
          font-weight: 500;
        }
      }
    }
  }
`;

StyledMenuList.defaultProps = {
  theme: baseTheme,
};

export default StyledMenuList;

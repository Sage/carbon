import styled from "styled-components";
import { slideAnimation, fadeAnimation } from "./pages.config";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { StyledDivider, StyledHeading } from "../heading/heading.style";

const PagesContent = styled.div.attrs(applyBaseTheme)`
  border: none;

  ${StyledHeading} {
    padding-left: 45px;
    margin-bottom: 34px;
  }

  ${StyledDivider} {
    display: none;
  }
`;

const PagesWrapperStyle = styled.div`
  .carbon-carousel__content {
    position: relative;
  }
  ${slideAnimation}
  ${fadeAnimation}
`;

export { PagesWrapperStyle, PagesContent };

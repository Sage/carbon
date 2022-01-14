import styled from "styled-components";
import { slideAnimation, fadeAnimation } from "./pages.config";
import BaseTheme from "../../style/themes/base";
import { StyledDivider, StyledHeading } from "../heading/heading.style";

const PagesContent = styled.div`
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
    overflow: hidden;
    position: relative;
  }
  ${slideAnimation};
  ${fadeAnimation};
`;

PagesContent.defaultProps = {
  theme: BaseTheme,
};

export { PagesWrapperStyle, PagesContent };

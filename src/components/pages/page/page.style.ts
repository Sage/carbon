import styled from "styled-components";
import { padding } from "styled-system";
import BaseTheme from "../../../style/themes/base";

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledPageContent = styled.div`
  ${padding}
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

StyledPage.defaultProps = {
  theme: BaseTheme,
};

StyledPageContent.defaultProps = {
  theme: BaseTheme,
};

export { StyledPage, StyledPageContent };

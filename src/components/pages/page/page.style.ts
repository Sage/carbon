import styled from "styled-components";
import BaseTheme from "../../../style/themes/base";

const StyledPage = styled.article`
  width: 100%;
  height: 100%;
`;

const StyledPageContent = styled.div`
  box-sizing: border-box;
  padding: 30px 40px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

StyledPage.defaultProps = {
  theme: BaseTheme,
};

export { StyledPage, StyledPageContent };

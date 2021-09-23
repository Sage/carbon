import styled from "styled-components";
import {
  StyledAccordionContentContainer,
  StyledAccordionContent,
} from "../../../accordion/accordion.style";
import baseTheme from "../../../../style/themes/base";

const StyledContentContainer = styled(StyledAccordionContentContainer)`
  background-color: ${({ theme }) => theme.tileSelect.hoverBackground};
`;

const StyledContent = styled(StyledAccordionContent)`
  padding: 24px;
  position: relative;
  z-index: 200;
`;

StyledContentContainer.defaultProps = {
  theme: baseTheme,
};

export { StyledContentContainer, StyledContent };

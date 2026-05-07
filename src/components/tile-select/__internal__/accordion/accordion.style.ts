import styled from "styled-components";
import {
  StyledAccordionContentContainer,
  StyledAccordionContent,
} from "../../../accordion/accordion.style";

const StyledContentContainer = styled(StyledAccordionContentContainer)`
  background-color: var(--colorsActionMinor050);
  opacity: 1;
`;

const StyledContent = styled(StyledAccordionContent)`
  padding: 24px;
  position: relative;
  z-index: 200;
`;

export { StyledContentContainer, StyledContent };

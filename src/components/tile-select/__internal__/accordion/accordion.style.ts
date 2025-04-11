import styled, { css } from "styled-components";
import { StyledContent } from "../../../accordion/accordion.style";

export interface StyledAccordionContentContainerProps {
  isExpanded?: boolean;
  maxHeight?: string | number;
}

const StyledAccordionContentContainer = styled.div<StyledAccordionContentContainerProps>`
  flex-grow: 1;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.3s;
  ${({ maxHeight, isExpanded }) => css`
    ${isExpanded
      ? `
      max-height: ${maxHeight}px;
      height: ${maxHeight}px;
`
      : `
      max-height: 0px;
      height: 0px;
      visibility: hidden;
    `}
  `}
`;

const StyledContentContainer = styled(StyledAccordionContentContainer)`
  background-color: var(--colorsActionMinor050);
`;

const StyledAccordionContent = styled(StyledContent)`
  padding: 24px;
  position: relative;
  z-index: 200;
`;

export { StyledContentContainer, StyledAccordionContent };

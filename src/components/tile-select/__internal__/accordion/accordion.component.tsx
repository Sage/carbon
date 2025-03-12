import React, { useRef, useState } from "react";
import { SpaceProps } from "styled-system";

import {
  StyledContentContainer,
  StyledAccordionContent,
} from "./accordion.style";
import useResizeObserver from "../../../../hooks/__internal__/useResizeObserver";

export interface AccordionProps extends SpaceProps {
  children: React.ReactNode;
  expanded?: boolean;
  contentId?: string;
  controlId?: string;
}
const Accordion = ({
  children,
  expanded,
  contentId,
  controlId,
}: AccordionProps) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useResizeObserver(contentRef, () => {
    // istanbul ignore else
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  });

  return (
    <StyledContentContainer
      isExpanded={expanded}
      maxHeight={contentHeight}
      data-role="tile-select-accordion-content-container"
    >
      <StyledAccordionContent
        role="region"
        data-element="tile-select-accordion-content"
        data-role="tile-select-accordion-content"
        ref={contentRef}
        id={contentId}
        aria-labelledby={controlId}
      >
        {children}
      </StyledAccordionContent>
    </StyledContentContainer>
  );
};

export default Accordion;

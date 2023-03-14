import React, { useRef, useState } from "react";
import { SpaceProps } from "styled-system";

import { StyledContentContainer, StyledContent } from "./accordion.style";
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
      aria-expanded={expanded}
      isExpanded={expanded}
      maxHeight={contentHeight}
    >
      <StyledContent
        role="region"
        data-element="tile-select-accordion-content"
        ref={contentRef}
        id={contentId}
        aria-labelledby={controlId}
      >
        {children}
      </StyledContent>
    </StyledContentContainer>
  );
};

export default Accordion;

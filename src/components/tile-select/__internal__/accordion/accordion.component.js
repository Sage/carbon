import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { StyledContentContainer, StyledContent } from "./accordion.style";
import useResizeObserver from "../../../../hooks/__internal__/useResizeObserver";

const Accordion = ({ children, expanded, contentId, controlId }) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useResizeObserver(contentRef, () => {
    setContentHeight(contentRef.current.scrollHeight);
  });

  useEffect(() => {
    setContentHeight(contentRef.current.scrollHeight);
  }, [contentRef]);

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

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  contentId: PropTypes.string,
  controlId: PropTypes.string,
};

export default Accordion;

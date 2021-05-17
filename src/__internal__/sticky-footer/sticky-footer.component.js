import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import throttle from "lodash/throttle";

import StyledStickyFooter from "./sticky-footer.style";

const SCROLL_THROTTLE = 50;

const StickyFooter = ({ children, containerRef, disableSticky, ...rest }) => {
  const [isSticky, setIsSticky] = useState(true);
  const footerRef = useRef();

  const checkFooterPosition = useCallback(
    throttle(() => {
      const content = containerRef.current;
      const stickyOffset = footerRef.current.clientHeight / 2;

      const fullyScrolled =
        content.scrollHeight - content.scrollTop - stickyOffset <=
        content.clientHeight;

      setIsSticky(!fullyScrolled);
    }, SCROLL_THROTTLE),
    []
  );

  useEffect(() => {
    const content = containerRef.current;
    content.addEventListener("scroll", checkFooterPosition, false);

    return () => {
      content.removeEventListener("scroll", checkFooterPosition, false);
    };
  }, [checkFooterPosition, containerRef]);

  return (
    <StyledStickyFooter
      data-component="sticky-footer"
      sticky={disableSticky ? false : isSticky}
      ref={footerRef}
      {...rest}
    >
      {children}
    </StyledStickyFooter>
  );
};

StickyFooter.propTypes = {
  /** child elements */
  children: PropTypes.node.isRequired,
  /** Ref of the container the footer should be sticky on */
  containerRef: PropTypes.any.isRequired,
  /** Disable the sticky behaviour manually */
  disableSticky: PropTypes.bool,
};

export default StickyFooter;

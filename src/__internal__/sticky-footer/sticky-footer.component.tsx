import React, { useEffect, useRef, useState, useCallback } from "react";
import throttle from "lodash/throttle";

import StyledStickyFooter from "./sticky-footer.style";

export interface StickyFooterProps {
  /** child elements */
  children: React.ReactNode;
  /** Ref of the container the footer should be sticky on */
  containerRef: React.RefObject<HTMLElement>;
  /** Disable the sticky behaviour manually */
  disableSticky?: boolean;
}

const SCROLL_THROTTLE = 50;

const StickyFooter = ({
  children,
  containerRef,
  disableSticky,
  ...rest
}: StickyFooterProps) => {
  const [isSticky, setIsSticky] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);

  const checkFooterPosition = useCallback(
    throttle(() => {
      const content = containerRef.current;
      /* Fallback to 0 to satisfy the TypeScript compiler */
      /* footerRef will never be null in this method */
      /* istanbul ignore next */
      const stickyOffset = footerRef.current
        ? footerRef.current.clientHeight / 2
        : 0;
      let fullyScrolled;

      // istanbul ignore else
      if (content) {
        fullyScrolled =
          content.scrollHeight - content.scrollTop - stickyOffset <=
          content.clientHeight;
      }

      setIsSticky(!fullyScrolled);
    }, SCROLL_THROTTLE),
    [containerRef],
  );

  useEffect(() => {
    const content = containerRef.current;
    content?.addEventListener("scroll", checkFooterPosition, false);

    return () => {
      content?.removeEventListener("scroll", checkFooterPosition, false);
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

export default StickyFooter;

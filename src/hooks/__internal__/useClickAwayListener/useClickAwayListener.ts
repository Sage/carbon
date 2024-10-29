import { useEffect, useRef, useCallback } from "react";

// Needs to also take Portals into account (so can't just check DOM containment), but ideally without using
// event.stopPropagation() which could have unexpected and frustrating consequences for consumers.
// Simple approach taken from https://github.com/facebook/react/issues/10962#issuecomment-444622208

export default (
  handleClickAway: (ev: Event) => void,
  eventTypeId: "mousedown" | "click" = "click",
) => {
  const clickIsInside = useRef(false);

  const onDocumentClick = useCallback(
    (ev: Event) => {
      if (clickIsInside.current) {
        clickIsInside.current = false;
        return;
      }

      handleClickAway(ev);
    },
    [handleClickAway],
  );

  const onInsideClick = useCallback(() => {
    clickIsInside.current = true;
  }, []);

  useEffect(() => {
    document.addEventListener(eventTypeId, onDocumentClick);

    return function cleanup() {
      document.removeEventListener(eventTypeId, onDocumentClick);
    };
  }, [onDocumentClick, eventTypeId]);

  return onInsideClick;
};

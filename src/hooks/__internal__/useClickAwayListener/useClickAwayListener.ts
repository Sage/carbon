import React, { useEffect, useRef } from "react";

export default (
  targets: React.RefObject<HTMLElement>[],
  handleClickAway: (ev: Event) => void,
  eventTypeId: "mousedown" | "click" = "click"
) => {
  const targetsRef = useRef(targets);
  targetsRef.current = targets;

  useEffect(() => {
    const fnClickAway = (ev: Event) => {
      const clickedElements = targetsRef.current.filter(
        (targetRef: React.RefObject<HTMLElement>) =>
          targetRef.current?.contains(ev?.target as Node)
      );

      if (!clickedElements?.length) {
        handleClickAway(ev);
      }
    };

    document.addEventListener(eventTypeId, fnClickAway as EventListener);

    return function cleanup() {
      document.removeEventListener(eventTypeId, fnClickAway as EventListener);
    };
  }, [handleClickAway, eventTypeId]);
};

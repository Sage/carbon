import React, { useEffect } from "react";
import Events from "../utils/helpers/events";

export interface ClickAwayWrapperProps {
  children: React.ReactNode;
  handleClickAway: (ev: CustomEvent) => void;
  eventTypeId?: "mousedown" | "click";
  targets: React.RefObject<HTMLElement>[];
}

const ClickAwayWrapper = ({
  children,
  handleClickAway,
  eventTypeId = "click",
  targets,
}: ClickAwayWrapperProps) => {
  useEffect(() => {
    const fnClickAway = (ev: CustomEvent) => {
      const clickedElements = targets.filter(
        (ref: React.RefObject<HTMLElement>) =>
          ref?.current && Events.composedPath(ev).includes(ref.current)
      );

      if (!clickedElements || !clickedElements.length) {
        handleClickAway(ev);
      }
    };

    document.addEventListener(eventTypeId, fnClickAway as EventListener);

    return function cleanup() {
      document.removeEventListener(eventTypeId, fnClickAway as EventListener);
    };
  }, [handleClickAway, targets, eventTypeId]);

  return <>{children}</>;
};

ClickAwayWrapper.displayName = "ClickAwayWrapper";

export default ClickAwayWrapper;

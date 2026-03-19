import React, { useCallback, useEffect, useState } from "react";

import { IconButton } from "storybook/internal/components";
import { CheckIcon, CrossIcon } from "@storybook/icons";
import { INTERACTION_TOGGLE_TOOL_ID } from "./constants";

export const STORAGE_KEY = "storybook:reducedMotion";

export const allowInteractions = () => {
  const disableInteractions = window?.localStorage?.getItem(STORAGE_KEY);
  return disableInteractions === "false" || disableInteractions === null;
};

export const InteractionToggle = () => {
  const [disableInteractions, setDisableInteractions] = useState(
    window?.localStorage.getItem(STORAGE_KEY) === "true",
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (window?.localStorage.getItem(STORAGE_KEY) === null && reducedMotion) {
      window?.localStorage?.setItem(STORAGE_KEY, "true");
      setDisableInteractions(true);
    }
  }, []);

  const toggleInteractions = useCallback(() => {
    const newValue = !disableInteractions;
    window?.localStorage?.setItem(STORAGE_KEY, String(newValue));
    setDisableInteractions(newValue);
    window.location.reload();
  }, [disableInteractions]);

  return (
    <IconButton
      key={INTERACTION_TOGGLE_TOOL_ID}
      aria-label={`Turn interactions ${disableInteractions ? "on" : "off"}`}
      onClick={toggleInteractions}
      active={disableInteractions}
    >
      {disableInteractions ? <CrossIcon /> : <CheckIcon />}
      Interactions {disableInteractions ? "disabled" : "enabled"}
    </IconButton>
  );
};

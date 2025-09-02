import React from "react";
import { Decorator } from "@storybook/react";

// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
let originalMatchMedia: typeof window.matchMedia | undefined;

const withReducedMotion: Decorator = (Story, context) => {
  // Read the value of the `reducedMotion` parameter from the context
  const { reducedMotion } = context.parameters;

  // Before overriding `window.matchMedia, store the original
  if (!originalMatchMedia) {
    originalMatchMedia = window.matchMedia;
  }

  if (typeof reducedMotion !== "boolean") {
    // Restore the original matchMedia if no reducedMotion parameter is set
    window.matchMedia = originalMatchMedia ?? window.matchMedia;
    return <Story {...context} />;
  }

  window.matchMedia = (query) => {
    // Check if the query is for reduced motion
    const reducedMotionRegex = /prefers-reduced-motion:\s*([^)]+)/;
    const match = query.match(reducedMotionRegex);

    // If the query does not match the expected format, return a safe default
    if (!match) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      };
    }

    // Get the simulated value for reduced motion
    const preferredValue = match[1].trim();
    // Determine if the query is for reduced motion or not
    const isReduceQuery = preferredValue === "reduce";

    // Return a mock matchMedia object based on the reducedMotion parameter
    return {
      matches: reducedMotion ? isReduceQuery : !isReduceQuery,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  };

  // Render the story with the modified matchMedia
  return <Story {...context} />;
};

export default withReducedMotion;

/* istanbul ignore file */

/**
 * Utility function for setting up global mocks required when testing with `SimpleSelect`, `FilterableSelect` or `MultiSelect` in a non-browser environment like JSDOM.
 */
const setupSelectMocks = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (process.env.NODE_ENV !== "test") {
    return;
  }

  // react-virtual uses offsetHeight when measuring the height of the scrollable container in `SelectList`.
  // Mock as a non-zero value to ensure it renders the list options on initial render.
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetHeight: {
      get(this: HTMLElement) {
        return (
          parseFloat(this.style.height) ||
          (this.getAttribute("data-element") ===
          "select-list-scrollable-container"
            ? 100
            : 0)
        );
      },
    },
  });
};

export default setupSelectMocks;

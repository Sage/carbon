// TODO: This component can be refactored to remove redundant code
// once we can confirm that all Sage products use version 105.0.0^
import { getWindow } from "../../../__internal__/dom/globals";

class ScrollBlockManager {
  components: {
    [key: string]: boolean;
  };

  originalValues: string[];

  constructor() {
    const safeWindow = getWindow();
    if (!safeWindow) {
      this.components = {};
      this.originalValues = [];
      return;
    }
    // Due to possibility of multiple carbon versions using it
    // it is necessary to maintain same structure in this global variable
    if (!safeWindow.__CARBON_INTERNALS_SCROLL_BLOCKERS) {
      safeWindow.__CARBON_INTERNALS_SCROLL_BLOCKERS = {
        components: {},
        // originalValues can be removed
        originalValues: [],
        restoreValues: null,
      };
    }

    this.components = safeWindow.__CARBON_INTERNALS_SCROLL_BLOCKERS.components;
    // TODO: originalValues can be removed
    this.originalValues =
      safeWindow.__CARBON_INTERNALS_SCROLL_BLOCKERS.originalValues;
  }

  registerComponent(id: string) {
    this.components[id] = true;
  }

  unregisterComponent(id: string) {
    delete this.components[id];
  }

  saveRestoreValuesCallback(callback: (() => void) | null) {
    /* istanbul ignore else */
    if (window.__CARBON_INTERNALS_SCROLL_BLOCKERS) {
      window.__CARBON_INTERNALS_SCROLL_BLOCKERS.restoreValues = callback;
    }
  }

  getRestoreValuesCallback() {
    return window.__CARBON_INTERNALS_SCROLL_BLOCKERS?.restoreValues;
  }

  // TODO: saveOriginalValues can be removed
  saveOriginalValues(values: string[]) {
    this.originalValues.length = 0;
    this.originalValues.push(...values);
  }

  // TODO: getOriginalValues can be removed
  getOriginalValues() {
    return this.originalValues;
  }

  isBlocked() {
    return Object.entries(this.components).length !== 0;
  }
}

export default ScrollBlockManager;

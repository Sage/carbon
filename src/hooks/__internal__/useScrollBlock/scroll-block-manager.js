// TODO: This component can be refactored to remove redundant code after
// we can confirm that all Sage products use version 105.0.0^

class ScrollBlockManager {
  constructor() {
    // Due to possibility of multiple carbon versions using it
    // it is necessary to maintain same structure in this global variable
    if (!window.__CARBON_INTERNALS_SCROLL_BLOCKERS) {
      window.__CARBON_INTERNALS_SCROLL_BLOCKERS = {
        components: {},
        // originalValues can be removed
        originalValues: [],
      };
    }

    this.components = window.__CARBON_INTERNALS_SCROLL_BLOCKERS.components;
    // TODO: originalValues can be removed
    this.originalValues =
      window.__CARBON_INTERNALS_SCROLL_BLOCKERS.originalValues;
  }

  registerComponent(id) {
    this.components[id] = true;
  }

  unregisterComponent(id) {
    delete this.components[id];
  }

  // TODO: saveOriginalValues can be removed
  saveOriginalValues(values) {
    this.originalValues.length = 0;
    this.originalValues.push(...values);
  }

  saveRestoreValuesCallback(callback) {
    window.__CARBON_INTERNALS_SCROLL_BLOCKERS.restoreValues = callback;
  }

  getRestoreValuesCallback() {
    return window.__CARBON_INTERNALS_SCROLL_BLOCKERS.restoreValues;
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

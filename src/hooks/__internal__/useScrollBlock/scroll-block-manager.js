class ScrollBlockManager {
  constructor() {
    // Due to possibility of multiple carbon versions using it
    // it is necessary to maintain same structure in this global variable
    if (!window.__CARBON_INTERNALS_SCROLL_BLOCKERS) {
      window.__CARBON_INTERNALS_SCROLL_BLOCKERS = {
        components: {},
        originalValues: [],
      };
    }

    this.components = window.__CARBON_INTERNALS_SCROLL_BLOCKERS.components;
    this.originalValues =
      window.__CARBON_INTERNALS_SCROLL_BLOCKERS.originalValues;
  }

  registerComponent(id) {
    this.components[id] = true;
  }

  unregisterComponent(id) {
    delete this.components[id];
  }

  saveOriginalValues(values) {
    this.originalValues.length = 0;
    this.originalValues.push(...values);
  }

  getOriginalValues() {
    return this.originalValues;
  }

  isBlocked() {
    return Object.entries(this.components).length !== 0;
  }
}

export default ScrollBlockManager;

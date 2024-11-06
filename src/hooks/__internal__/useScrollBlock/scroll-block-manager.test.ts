import ScrollBlockManager from "./scroll-block-manager";

describe("ScrollBlockManager's registerComponent method behavior", () => {
  const scrollBlockManager = new ScrollBlockManager();
  const id1 = "id1";
  scrollBlockManager.registerComponent(id1);

  it("should set isBlocked to true after registering at least one component", () => {
    expect(scrollBlockManager.isBlocked()).toBe(true);
  });

  it("should add the registered component's ID to the global variable window.__CARBON_INTERNALS_SCROLL_BLOCKERS", () => {
    expect(window.__CARBON_INTERNALS_SCROLL_BLOCKERS?.components[id1]).toBe(
      true,
    );
  });
});

describe("ScrollBlockManager behavior with registerComponent and unregisterComponent", () => {
  it("isBlocked should still return true after unregisterComponent is called with only one of the registered IDs ('id1')", () => {
    const scrollBlockManager = new ScrollBlockManager();
    const id1 = "id1";
    const id2 = "id2";
    scrollBlockManager.registerComponent(id1);
    scrollBlockManager.registerComponent(id2);
    scrollBlockManager.unregisterComponent(id1);
    expect(scrollBlockManager.isBlocked()).toBe(true);
  });

  it("isBlocked should return false after unregisterComponent is called with both registered IDs ('id1' and 'id2')", () => {
    const scrollBlockManager = new ScrollBlockManager();
    const id1 = "id1";
    const id2 = "id2";
    scrollBlockManager.registerComponent(id1);
    scrollBlockManager.registerComponent(id2);
    scrollBlockManager.unregisterComponent(id1);
    scrollBlockManager.unregisterComponent(id2);
    expect(scrollBlockManager.isBlocked()).toBe(false);
  });
});

describe("ScrollBlockManager's saveOriginalValues and getOriginalValues methods interaction", () => {
  it("should accurately return the array of values previously saved using saveOriginalValues", () => {
    const scrollBlockManager = new ScrollBlockManager();
    const someValues = ["value1", "value2"];

    scrollBlockManager.saveOriginalValues(someValues);

    expect(scrollBlockManager.getOriginalValues()).toEqual(someValues);
  });
});

describe("ScrollBlockManager's interaction with an existing window.__CARBON_INTERNALS_SCROLL_BLOCKERS global variable", () => {
  it("should report blocking as active (isBlocked returns true) when window.__CARBON_INTERNALS_SCROLL_BLOCKERS already contains registered component IDs", () => {
    window.__CARBON_INTERNALS_SCROLL_BLOCKERS = {
      components: {
        id2: true,
      },
      originalValues: [],
      restoreValues: null,
    };

    const scrollBlockManager = new ScrollBlockManager();

    expect(scrollBlockManager.isBlocked()).toBe(true);
  });
});

describe("Initialization of ScrollBlockManager in an environment without pre-existing window.__CARBON_INTERNALS_SCROLL_BLOCKERS", () => {
  it("should create the window.__CARBON_INTERNALS_SCROLL_BLOCKERS global variable with default structure if it does not already exist", () => {
    delete window.__CARBON_INTERNALS_SCROLL_BLOCKERS;
    expect(window.__CARBON_INTERNALS_SCROLL_BLOCKERS).toBe(undefined);

    const scrollBlockManager = new ScrollBlockManager();

    expect(scrollBlockManager.isBlocked()).toBe(false);

    expect(window.__CARBON_INTERNALS_SCROLL_BLOCKERS).toEqual({
      components: {},
      originalValues: [],
      restoreValues: null,
    });
  });
});

describe("ScrollBlockManager's saveRestoreValuesCallback and getRestoreValuesCallback methods functionality", () => {
  it("should correctly save a provided callback function with saveRestoreValuesCallback and retrieve it with getRestoreValuesCallback", () => {
    const scrollBlockManager = new ScrollBlockManager();
    expect(window.__CARBON_INTERNALS_SCROLL_BLOCKERS).toEqual({
      components: {},
      originalValues: [],
      restoreValues: null,
    });

    const callback = jest.fn();

    scrollBlockManager.saveRestoreValuesCallback(callback);
    expect(window.__CARBON_INTERNALS_SCROLL_BLOCKERS?.restoreValues).toBe(
      callback,
    );

    expect(scrollBlockManager.getRestoreValuesCallback()).toBe(callback);
  });
});

import ScrollBlockManager from "./scroll-block-manager";

describe("ScrollBlockManager's registerComponent method behavior", () => {
  const scrollBlockManager = new ScrollBlockManager();
  const id1 = "id1";
  scrollBlockManager.registerComponent(id1);

  it("should set isBlocked to true after registering at least one component", () => {
    expect(scrollBlockManager.isBlocked()).toBe(true);
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

describe("Initialization of ScrollBlockManager in an environment without pre-existing window.__CARBON_INTERNALS_SCROLL_BLOCKERS", () => {
  it("should create the window.__CARBON_INTERNALS_SCROLL_BLOCKERS global variable with default structure if it does not already exist", () => {
    const scrollBlockManager = new ScrollBlockManager();
    expect(scrollBlockManager.isBlocked()).toBe(false);
  });
});

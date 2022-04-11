import ScrollBlockManager from "./scroll-block-manager";

describe("ScrollBlockManager", () => {
  describe("when the registerComponent method has been called at least once", () => {
    const scrollBlockManager = new ScrollBlockManager();

    const id1 = "id1";
    scrollBlockManager.registerComponent(id1);

    it("isBlocked should return true", () => {
      expect(scrollBlockManager.isBlocked()).toBe(true);
    });

    it("global variable window.__CARBON_INTERNALS_SCROLL_BLOCKERS should have this component added", () => {
      expect(window.__CARBON_INTERNALS_SCROLL_BLOCKERS?.components[id1]).toBe(
        true
      );
    });
  });

  describe("when the registerComponent method has been called with two different id's", () => {
    describe("and then unregisterComponent has been called with only one of these id's", () => {
      it("isBlocked should still return true", () => {
        const scrollBlockManager = new ScrollBlockManager();
        const id1 = "id1";
        const id2 = "id2";
        scrollBlockManager.registerComponent(id1);
        scrollBlockManager.registerComponent(id2);
        scrollBlockManager.unregisterComponent(id1);
        expect(scrollBlockManager.isBlocked()).toBe(true);
      });
    });

    describe("and then unregisterComponent has been called twice with both of these id's", () => {
      it("isBlocked should return false", () => {
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
  });

  describe("when saveOriginalValues method has been called", () => {
    it("getOriginalValues method return the saved values", () => {
      const scrollBlockManager = new ScrollBlockManager();

      const someValues = ["value1", "value2"];

      scrollBlockManager.saveOriginalValues(someValues);
      expect(scrollBlockManager.getOriginalValues()).toEqual(someValues);
    });
  });

  describe("when global variable window.__CARBON_INTERNALS_SCROLL_BLOCKERS already exists with some id's", () => {
    it("isBlocked should return true", () => {
      window.__CARBON_INTERNALS_SCROLL_BLOCKERS = {
        components: {
          id2: true,
        },
        originalValues: [],
      };
      const scrollBlockManager = new ScrollBlockManager();
      expect(scrollBlockManager.isBlocked()).toBe(true);
    });
  });

  describe("when global variable window.__CARBON_INTERNALS_SCROLL_BLOCKERS does not exist", () => {
    it("creates one", () => {
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

  describe("when saveRestoreValuesCallback is called with a callback", () => {
    it("creates one and returns it with getRestoreValuesCallback method", () => {
      const scrollBlockManager = new ScrollBlockManager();
      expect(window.__CARBON_INTERNALS_SCROLL_BLOCKERS).toEqual({
        components: {},
        originalValues: [],
        restoreValues: null,
      });

      const callback = jest.fn();

      scrollBlockManager.saveRestoreValuesCallback(callback);
      expect(window.__CARBON_INTERNALS_SCROLL_BLOCKERS?.restoreValues).toBe(
        callback
      );

      expect(scrollBlockManager.getRestoreValuesCallback()).toBe(callback);
    });
  });
});

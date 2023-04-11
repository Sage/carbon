import ModalManager, { ModalManagerInstance } from "./modal-manager";

describe("ModalManager", () => {
  describe("when the addModal method has been called", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    const mockModal1 = document.createElement("div");
    const mockModal2 = document.createElement("div");

    it("then the element passed in an attribute should be the topmost element", () => {
      ModalManager.addModal(mockModal1, cb1);
      expect(ModalManager.isTopmost(mockModal1)).toBe(true);
      expect(cb1).not.toHaveBeenCalled();

      ModalManager.addModal(mockModal2, cb2);
      expect(ModalManager.isTopmost(mockModal1)).toBe(false);
      expect(ModalManager.isTopmost(mockModal2)).toBe(true);
      expect(cb1).toHaveBeenCalledWith(false);
      expect(cb2).not.toHaveBeenCalled();
    });

    it("global variable window.__CARBON_INTERNALS_MODAL_LIST should have the Modals added", () => {
      expect(window.__CARBON_INTERNALS_MODAL_LIST?.length).toEqual(2);
      expect(window.__CARBON_INTERNALS_MODAL_LIST?.[0]).toEqual({
        modal: mockModal1,
        setTriggerRefocusFlag: cb1,
      });
      expect(window.__CARBON_INTERNALS_MODAL_LIST?.[1]).toEqual({
        modal: mockModal2,
        setTriggerRefocusFlag: cb2,
      });
    });

    describe("and modal does not exist yet", () => {
      it("does not throw", () => {
        expect(() => {
          ModalManager.addModal(null);
        }).not.toThrow();
      });
    });
  });

  describe("when the clearList method has been called", () => {
    const mockModal = document.createElement("div");

    beforeEach(() => {
      ModalManager.addModal(mockModal);
    });
    it("then the element passed in an attribute should not be the topmost element", () => {
      expect(ModalManager.isTopmost(mockModal)).toBe(true);
      ModalManager.clearList();
      expect(ModalManager.isTopmost(mockModal)).toBe(false);
    });

    it("global variable window.__CARBON_INTERNALS_MODAL_LIST should have no Modals added", () => {
      expect(window.__CARBON_INTERNALS_MODAL_LIST?.[0]).toEqual({
        modal: mockModal,
        setTriggerRefocusFlag: undefined,
      });
      ModalManager.clearList();
      expect(window.__CARBON_INTERNALS_MODAL_LIST?.length).toEqual(0);
    });
  });

  describe("when the removeModal method has been called", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    const mockModal1 = document.createElement("div");
    const mockModal2 = document.createElement("div");

    beforeEach(() => {
      ModalManager.clearList();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("and the param matches a Modal in the list", () => {
      it("should not be the topmost element", () => {
        ModalManager.addModal(mockModal1, cb1);
        ModalManager.addModal(mockModal2, cb2);
        ModalManager.removeModal(mockModal2);
        expect(ModalManager.isTopmost(mockModal2)).toBe(false);
        expect(cb1).toHaveBeenCalledWith(true);

        ModalManager.removeModal(mockModal1);

        expect(ModalManager.isTopmost(mockModal1)).toBe(false);
      });

      it("does not trigger refocus if no callback is found for passed modal", () => {
        ModalManager.addModal(mockModal1);
        ModalManager.addModal(mockModal2);
        ModalManager.removeModal(mockModal2);
      });

      it("does not trigger refocus if the triggerRefocusOnClose flag passed to removeModal is set to false", () => {
        ModalManager.addModal(mockModal1, cb1);
        ModalManager.addModal(mockModal2, cb2);
        ModalManager.removeModal(mockModal2, false);
        expect(cb1).not.toHaveBeenCalledWith(true);
      });

      it("triggers refocus if a callback is provided and the triggerRefocusOnClose flag is not passed to removeModal", () => {
        ModalManager.addModal(mockModal1, cb1);
        ModalManager.addModal(mockModal2, cb2);
        expect(cb1).not.toHaveBeenCalledWith(true);
        ModalManager.removeModal(mockModal2);
        expect(cb1).toHaveBeenCalledWith(true);
      });

      it("should no longer be in the global variable window.__CARBON_INTERNALS_MODAL_LIST", () => {
        ModalManager.addModal(mockModal1, cb1);
        ModalManager.addModal(mockModal2, cb2);
        expect(window.__CARBON_INTERNALS_MODAL_LIST?.length).toEqual(2);
        expect(window.__CARBON_INTERNALS_MODAL_LIST?.[0]).toEqual({
          modal: mockModal1,
          setTriggerRefocusFlag: cb1,
        });
        expect(window.__CARBON_INTERNALS_MODAL_LIST?.[1]).toEqual({
          modal: mockModal2,
          setTriggerRefocusFlag: cb2,
        });
        ModalManager.removeModal(mockModal2);
        expect(window.__CARBON_INTERNALS_MODAL_LIST?.length).toEqual(1);
        expect(window.__CARBON_INTERNALS_MODAL_LIST?.[0]).toEqual({
          modal: mockModal1,
          setTriggerRefocusFlag: cb1,
        });
        ModalManager.removeModal(mockModal1);
        expect(window.__CARBON_INTERNALS_MODAL_LIST?.length).toEqual(0);
      });
    });

    describe("and the param does not match a Modal in the list", () => {
      it("then nothing happens", () => {
        const mockModal = document.createElement("div");
        const otherModal = document.createElement("div");
        ModalManager.addModal(mockModal);
        ModalManager.removeModal(otherModal);
      });
    });
  });

  describe("when the global variable window.__CARBON_INTERNALS_MODAL_LIST already has modals", () => {
    it("the modalList should also contain them", () => {
      const mockModal1 = document.createElement("div");
      const mockModal2 = document.createElement("div");
      window.__CARBON_INTERNALS_MODAL_LIST = [
        { modal: mockModal1 },
        { modal: mockModal2 },
      ];
      const Manager = new ModalManagerInstance();

      expect(Manager.isTopmost(mockModal1)).not.toBe(true);
      expect(Manager.isTopmost(mockModal2)).toBe(true);
      Manager.removeModal(mockModal2);
      expect(Manager.isTopmost(mockModal1)).toBe(true);
    });
  });

  describe("when there are functions in the global top modal setter list", () => {
    let f: jest.Mock<(topModal: HTMLElement | null) => void>;
    let g: jest.Mock<(topModal: HTMLElement | null) => void>;

    beforeEach(() => {
      f = jest.fn();
      g = jest.fn();
      window.__CARBON_INTERNALS_MODAL_SETTER_LIST = [f, g];
    });

    it("when a modal is added, all functions are called with the new modal", () => {
      const mockModal = document.createElement("div");
      ModalManager.addModal(mockModal);
      expect(f).toHaveBeenCalledWith(mockModal);
      expect(g).toHaveBeenCalledWith(mockModal);
    });

    it("when a modal is removed, all functions are called with the new top modal", () => {
      const mockModal = document.createElement("div");
      const otherModal = document.createElement("div");
      ModalManager.addModal(mockModal);
      ModalManager.addModal(otherModal);
      ModalManager.removeModal(otherModal);
      expect(f).toHaveBeenCalledTimes(3);
      expect(g).toHaveBeenCalledTimes(3);
      expect(f.mock.calls[2][0]).toBe(mockModal);
      expect(g.mock.calls[2][0]).toBe(mockModal);
    });

    it("when the modal list is cleared, all functions are called with the null", () => {
      const mockModal = document.createElement("div");
      const otherModal = document.createElement("div");
      ModalManager.addModal(mockModal);
      ModalManager.addModal(otherModal);
      ModalManager.clearList();
      expect(f).toHaveBeenCalledTimes(3);
      expect(g).toHaveBeenCalledTimes(3);
      expect(f.mock.calls[2][0]).toBe(null);
      expect(g.mock.calls[2][0]).toBe(null);
    });
  });
});

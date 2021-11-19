import ModalManager from "./modal-manager";

describe("ModalManager", () => {
  describe("when the addModal method has been called", () => {
    it("then the element passed in an attribute should be the topmost element", () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();

      const mockModal1 = { foo: "foo" };
      const mockModal2 = { bar: "bar" };

      ModalManager.addModal(mockModal1, cb1);
      expect(ModalManager.isTopmost(mockModal1)).toBe(true);
      expect(cb1).not.toHaveBeenCalled();

      ModalManager.addModal(mockModal2, cb2);
      expect(ModalManager.isTopmost(mockModal1)).toBe(false);
      expect(ModalManager.isTopmost(mockModal2)).toBe(true);
      expect(cb1).toHaveBeenCalledWith(false);
      expect(cb2).not.toHaveBeenCalled();
    });
  });

  describe("when the clearList method has been called", () => {
    it("then the element passed in an attribute should not be the topmost element", () => {
      const mockModal = { foo: "bar" };

      ModalManager.addModal(mockModal);
      expect(ModalManager.isTopmost(mockModal)).toBe(true);
      ModalManager.clearList();
      expect(ModalManager.isTopmost(mockModal)).toBe(false);
    });
  });

  describe("when the removeModal method has been called", () => {
    it("then the element passed in an attribute should not be the topmost element", () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();

      const mockModal1 = { foo: "foo" };
      const mockModal2 = { bar: "bar" };

      ModalManager.clearList();
      ModalManager.addModal(mockModal1, cb1);
      ModalManager.addModal(mockModal2, cb2);
      ModalManager.removeModal(mockModal2);
      expect(ModalManager.isTopmost(mockModal2)).toBe(false);
      expect(cb1).toHaveBeenCalledWith(true);

      ModalManager.removeModal(mockModal1);

      expect(ModalManager.isTopmost(mockModal1)).toBe(false);
    });

    it("then nothing happens if removed modal is not found", () => {
      const mockModal = { foo: "bar" };

      ModalManager.clearList();
      ModalManager.addModal(mockModal);
      ModalManager.removeModal({ some: "value" });
    });

    it("does not trigger refocus if no callback is found for passed modal", () => {
      const mockModal1 = { foo: "foo" };
      const mockModal2 = { bar: "bar" };

      ModalManager.clearList();
      ModalManager.addModal(mockModal1);
      ModalManager.addModal(mockModal2);
      ModalManager.removeModal(mockModal2);
    });
  });
});

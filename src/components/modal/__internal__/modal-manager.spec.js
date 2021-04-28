import ModalManager from "./modal-manager";

describe("ModalManager", () => {
  describe("when the addModal method has been called", () => {
    it("then the element passed in an attribute should be the topmost element", () => {
      const mockModal = { foo: "bar" };

      ModalManager.addModal(mockModal);
      expect(ModalManager.isTopmost(mockModal)).toBe(true);
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
      const mockModal = { foo: "bar" };

      ModalManager.clearList();
      ModalManager.addModal(mockModal);
      ModalManager.removeModal(mockModal);

      expect(ModalManager.isTopmost(mockModal)).toBe(false);
    });

    it("then nothing happens if removed modal is not found", () => {
      const mockModal = { foo: "bar" };

      ModalManager.clearList();
      ModalManager.addModal(mockModal);
      ModalManager.removeModal({ some: "value" });
    });
  });
});

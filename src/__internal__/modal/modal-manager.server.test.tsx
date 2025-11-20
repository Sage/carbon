import ModalManager from "./modal-manager";

afterEach(() => {
  ModalManager.clearList();
});

test("when the addModal method has been called, then the element passed in an attribute should be the topmost element", () => {
  const cb1 = jest.fn();

  const mockModal1 = "div";

  ModalManager.addModal(mockModal1 as unknown as HTMLElement, cb1);

  expect(ModalManager.isTopmost(mockModal1 as unknown as HTMLElement)).toBe(
    true,
  );
});

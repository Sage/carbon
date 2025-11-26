import ModalManager, { ModalManagerInstance } from "./modal-manager";

beforeEach(() => {
  window.__CARBON_INTERNALS_MODAL_LIST?.splice(0);
});

afterEach(() => {
  ModalManager.clearList();
});

afterAll(() => {
  window.__CARBON_INTERNALS_MODAL_LIST?.splice(0);
});

test("when the addModal method has been called, then the element passed in an attribute should be the topmost element", () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();

  const mockModal1 = document.createElement("div");
  const mockModal2 = document.createElement("div");

  ModalManager.addModal(mockModal1, cb1);
  ModalManager.addModal(mockModal2, cb2);

  expect(ModalManager.isTopmost(mockModal1)).toBe(false);
  expect(ModalManager.isTopmost(mockModal2)).toBe(true);
  expect(cb1).toHaveBeenCalledWith(false);
  expect(cb2).not.toHaveBeenCalled();
});

test("when the addModal method has been called, it should add the Modals to the modal list", () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();

  const mockModal1 = document.createElement("div");
  const mockModal2 = document.createElement("div");

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
});

test("when the addModal method has been called and modal does not exist yet, it does not throw", () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();

  const mockModal1 = document.createElement("div");
  const mockModal2 = document.createElement("div");

  ModalManager.addModal(mockModal1, cb1);
  ModalManager.addModal(mockModal2, cb2);

  expect(() => {
    ModalManager.addModal(null);
  }).not.toThrow();
});

test("when the clearList method has been called, then the element passed in should not be the topmost element", () => {
  const mockModal = document.createElement("div");
  ModalManager.addModal(mockModal);

  expect(ModalManager.isTopmost(mockModal)).toBe(true);

  ModalManager.clearList();

  expect(ModalManager.isTopmost(mockModal)).toBe(false);
});

test("when the clearList method has been called, the modal list should have no Modals present", () => {
  const mockModal = document.createElement("div");
  ModalManager.addModal(mockModal);

  expect(window.__CARBON_INTERNALS_MODAL_LIST?.[0]).toEqual({
    modal: mockModal,
    setTriggerRefocusFlag: undefined,
    topModalOverride: undefined,
  });

  ModalManager.clearList();

  expect(window.__CARBON_INTERNALS_MODAL_LIST?.length).toEqual(0);
});

test("should not be the topmost element when the removeModal method has been called and the param matches a Modal in the list", () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();

  const mockModal1 = document.createElement("div");
  const mockModal2 = document.createElement("div");
  ModalManager.addModal(mockModal1, cb1);
  ModalManager.addModal(mockModal2, cb2);
  ModalManager.removeModal(mockModal2);

  expect(ModalManager.isTopmost(mockModal2)).toBe(false);
  expect(cb1).toHaveBeenCalledWith(true);

  ModalManager.removeModal(mockModal1);

  expect(ModalManager.isTopmost(mockModal1)).toBe(false);

  cb1?.mockClear();
  cb2?.mockClear();
});

test("does not trigger refocus if no callback is found for passed modal when the removeModal method has been called and the param matches a Modal in the list", () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();

  const mockModal1 = document.createElement("div");
  const mockModal2 = document.createElement("div");

  ModalManager.addModal(mockModal1);
  ModalManager.addModal(mockModal2);
  ModalManager.removeModal(mockModal2);

  expect(cb1).not.toHaveBeenCalledWith(true);

  cb1?.mockClear();
  cb2?.mockClear();
});

test("does not trigger refocus if the triggerRefocusOnClose flag passed to removeModal is set to false when the removeModal method has been called and the param matches a Modal in the list", () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();

  const mockModal1 = document.createElement("div");
  const mockModal2 = document.createElement("div");

  ModalManager.addModal(mockModal1, cb1);
  ModalManager.addModal(mockModal2, cb2);
  ModalManager.removeModal(mockModal2, false);

  expect(cb1).not.toHaveBeenCalledWith(true);

  cb1?.mockClear();
  cb2?.mockClear();
});

test("triggers refocus if a callback is provided and the triggerRefocusOnClose flag is not passed to removeModal when the removeModal method has been called and the param matches a Modal in the list", () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();

  const mockModal1 = document.createElement("div");
  const mockModal2 = document.createElement("div");

  ModalManager.addModal(mockModal1, cb1);
  ModalManager.addModal(mockModal2, cb2);

  expect(cb1).not.toHaveBeenCalledWith(true);

  ModalManager.removeModal(mockModal2);

  expect(cb1).toHaveBeenCalledWith(true);

  cb1?.mockClear();
  cb2?.mockClear();
});

test("should no longer be in the modal list when the removeModal method has been called and the param matches a Modal in the list", () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();

  const mockModal1 = document.createElement("div");
  const mockModal2 = document.createElement("div");

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

  cb1?.mockClear();
  cb2?.mockClear();
});

test("does nothing when attempting to remove a non-existent modal via removeModal method", () => {
  const mockModal = document.createElement("div");
  const otherModal = document.createElement("div");
  ModalManager.addModal(mockModal);
  ModalManager.removeModal(otherModal);

  expect(ModalManager.isTopmost(mockModal)).toBe(true);
});

test("ensures that the topmost modal is the last one in the array and if the topmost modal closes, the next in the array becomes the new topmost model", () => {
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

describe("when there are functions in the global top modal setter list", () => {
  let mockOne: jest.Mock,
    mockTwo: jest.Mock,
    mockModal: HTMLElement,
    otherModal: HTMLElement;

  beforeEach(() => {
    mockOne = jest.fn();
    mockTwo = jest.fn();
    window.__CARBON_INTERNALS_MODAL_SETTER_LIST = [mockOne, mockTwo];

    mockModal = document.createElement("div");
    otherModal = document.createElement("div");
  });

  it("calls all functions with the new modal when a modal is added", () => {
    ModalManager.addModal(mockModal);

    expect(mockOne).toHaveBeenCalledWith(mockModal);
    expect(mockTwo).toHaveBeenCalledWith(mockModal);
  });

  it("calls all functions with the new top modal when a modal is removed", () => {
    ModalManager.addModal(mockModal);
    ModalManager.addModal(otherModal);
    ModalManager.removeModal(otherModal);

    expect(mockOne).toHaveBeenCalledTimes(3);
    expect(mockTwo).toHaveBeenCalledTimes(3);
    expect(mockOne.mock.calls[2][0]).toBe(mockModal);
    expect(mockTwo.mock.calls[2][0]).toBe(mockModal);
  });

  it("calls all the functions with null when the modal list is cleared", () => {
    ModalManager.addModal(mockModal);
    ModalManager.addModal(otherModal);

    ModalManager.clearList();

    expect(mockOne).toHaveBeenCalledTimes(3);
    expect(mockTwo).toHaveBeenCalledTimes(3);
    expect(mockOne.mock.calls[2][0]).toBe(null);
    expect(mockTwo.mock.calls[2][0]).toBe(null);
  });
});

test("should override the stacking order when the top modal has been manually set", () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();

  const mockModal1 = document.createElement("div");
  const mockModal2 = document.createElement("div");

  ModalManager.addModal(mockModal1, cb1, true);
  ModalManager.addModal(mockModal2, cb2);

  expect(ModalManager.isTopmost(mockModal1)).toBe(true);
  expect(cb1).not.toHaveBeenCalled();
});

test("should treat multiple instances of overridden modals as a stack and the last one will be top when the top modal has been manually set", () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();
  const cb3 = jest.fn();

  const mockModal1 = document.createElement("div");
  const mockModal2 = document.createElement("div");
  const mockModal3 = document.createElement("div");

  ModalManager.addModal(mockModal1, cb1, true);
  ModalManager.addModal(mockModal2, cb2, true);
  ModalManager.addModal(mockModal3, cb3);

  expect(ModalManager.isTopmost(mockModal2)).toBe(true);
  expect(cb2).not.toHaveBeenCalled();

  ModalManager.removeModal(mockModal2);

  expect(ModalManager.isTopmost(mockModal1)).toBe(true);
});

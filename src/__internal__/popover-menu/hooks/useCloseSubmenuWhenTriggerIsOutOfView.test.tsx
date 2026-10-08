import { fireEvent, renderHook } from "@testing-library/react";

import useCloseSubmenuWhenTriggerIsOutOfView from "./useCloseSubmenuWhenTriggerIsOutOfView";

const rect = (top: number, bottom: number) =>
  ({ top, bottom, height: bottom - top }) as DOMRect;

const setupScrollport = () => {
  const scrollport = document.createElement("ul");
  scrollport.setAttribute("role", "list");
  const trigger = document.createElement("li");
  scrollport.appendChild(trigger);

  return {
    scrollport,
    trigger,
    triggerRef: { current: trigger },
  };
};

test("closes an open submenu when more than half of its trigger leaves the scrollport, restores focus without scrolling, and cleans up its listener", () => {
  const { scrollport, trigger, triggerRef } = setupScrollport();
  const onClose = jest.fn();
  const focusTrigger = jest.fn();
  const triggerBox = jest.spyOn(trigger, "getBoundingClientRect");
  jest.spyOn(scrollport, "getBoundingClientRect").mockReturnValue(rect(0, 100));
  document.body.appendChild(scrollport);

  const { unmount } = renderHook(() =>
    useCloseSubmenuWhenTriggerIsOutOfView(
      true,
      true,
      triggerRef,
      onClose,
      focusTrigger,
    ),
  );

  triggerBox.mockReturnValue(rect(20, 40));
  fireEvent.scroll(scrollport);
  expect(onClose).not.toHaveBeenCalled();

  triggerBox.mockReturnValue(rect(91, 111));
  fireEvent.scroll(scrollport);
  expect(onClose).toHaveBeenCalledTimes(1);
  expect(focusTrigger).toHaveBeenCalledWith({ preventScroll: true });

  triggerBox.mockReturnValue(rect(-20, -1));
  fireEvent.scroll(scrollport);
  expect(onClose).toHaveBeenCalledTimes(2);

  unmount();
  fireEvent.scroll(scrollport);
  expect(onClose).toHaveBeenCalledTimes(2);
  scrollport.remove();
});

test("does not take focus from another item in the parent list when the submenu closes", () => {
  const { scrollport, trigger, triggerRef } = setupScrollport();
  const otherItem = document.createElement("li");
  const otherButton = document.createElement("button");
  otherItem.appendChild(otherButton);
  scrollport.appendChild(otherItem);
  const onClose = jest.fn();
  const focusTrigger = jest.fn();
  jest.spyOn(trigger, "getBoundingClientRect").mockReturnValue(rect(120, 140));
  jest.spyOn(scrollport, "getBoundingClientRect").mockReturnValue(rect(0, 100));
  document.body.appendChild(scrollport);
  otherButton.focus();

  renderHook(() =>
    useCloseSubmenuWhenTriggerIsOutOfView(
      true,
      true,
      triggerRef,
      onClose,
      focusTrigger,
    ),
  );

  fireEvent.scroll(scrollport);

  expect(onClose).toHaveBeenCalledTimes(1);
  expect(otherButton).toHaveFocus();
  expect(focusTrigger).not.toHaveBeenCalled();
  scrollport.remove();
});

test("does not listen when the menu is not an open submenu", () => {
  const { scrollport, trigger, triggerRef } = setupScrollport();
  const onClose = jest.fn();
  jest.spyOn(trigger, "getBoundingClientRect").mockReturnValue(rect(120, 140));
  jest.spyOn(scrollport, "getBoundingClientRect").mockReturnValue(rect(0, 100));

  const { rerender } = renderHook(
    ({ isSubmenu, open }) =>
      useCloseSubmenuWhenTriggerIsOutOfView(
        isSubmenu,
        open,
        triggerRef,
        onClose,
        jest.fn(),
      ),
    { initialProps: { isSubmenu: false, open: true } },
  );

  fireEvent.scroll(scrollport);
  expect(onClose).not.toHaveBeenCalled();

  rerender({ isSubmenu: true, open: false });
  fireEvent.scroll(scrollport);
  expect(onClose).not.toHaveBeenCalled();
});

test("does not listen without a trigger or scrollport", () => {
  const onClose = jest.fn();
  const trigger = document.createElement("li");

  renderHook(() =>
    useCloseSubmenuWhenTriggerIsOutOfView(
      true,
      true,
      undefined,
      onClose,
      jest.fn(),
    ),
  );
  renderHook(() =>
    useCloseSubmenuWhenTriggerIsOutOfView(
      true,
      true,
      { current: trigger },
      onClose,
      jest.fn(),
    ),
  );

  fireEvent.scroll(trigger);
  expect(onClose).not.toHaveBeenCalled();
});

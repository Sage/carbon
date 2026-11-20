import { renderHook } from "@testing-library/react";

import ModalManager from "../../../__internal__/modal/modal-manager";
import useModalManager from "./useModalManager";

afterEach(() => ModalManager.clearList());

test.each([false, true])(
  "unregisters a late-populated modal ref when closing or unmounting (%s)",
  (closeBeforeUnmount) => {
    const modal = document.createElement("div");
    const modalRef = { current: null as HTMLElement | null };
    const { rerender, unmount } = renderHook(
      ({ open }) =>
        useModalManager({
          open,
          modalRef,
          closeModal: jest.fn(),
        }),
      { initialProps: { open: false } },
    );
    modalRef.current = modal;
    rerender({ open: true });
    expect(ModalManager.isTopmost(modal)).toBe(true);
    modalRef.current = null;
    if (closeBeforeUnmount) rerender({ open: false });
    unmount();
    expect(ModalManager.isTopmost(modal)).toBe(false);
  },
);

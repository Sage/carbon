import { renderHook } from "@testing-library/react";

import useSubmenuPortalTarget from "./useSubmenuPortalTarget";

test("returns the closest popover-menu ancestor for a submenu trigger", () => {
  const popoverMenu = document.createElement("div");
  popoverMenu.setAttribute("data-component", "popover-menu");
  const trigger = document.createElement("li");
  popoverMenu.appendChild(trigger);
  const controlReference = { current: trigger };

  const { result, rerender } = renderHook(
    ({ isSubmenu }) => useSubmenuPortalTarget(isSubmenu, controlReference),
    { initialProps: { isSubmenu: false } },
  );

  expect(result.current).toBeNull();

  rerender({ isSubmenu: true });

  expect(result.current).toBe(popoverMenu);
});

test("returns null when the trigger has no popover-menu ancestor", () => {
  const controlReference = { current: document.createElement("li") };

  const { result } = renderHook(() =>
    useSubmenuPortalTarget(true, controlReference),
  );

  expect(result.current).toBeNull();
});

import React from "react";
import type { Page } from "@playwright/test";
import { test, expect } from "../../../playwright/helpers/base-test";
import PopoverMenuFocusExample from "./popover-menu-focus.test-pw";

const holdAnimationFrames = (page: Page) =>
  page.evaluateHandle(() => {
    const originalRequest = window.requestAnimationFrame;
    const originalCancel = window.cancelAnimationFrame;
    const queued = new Map<number, FrameRequestCallback>();
    let nextId = 1000000;
    window.requestAnimationFrame = (callback) => {
      nextId += 1;
      queued.set(nextId, callback);
      return nextId;
    };
    window.cancelAnimationFrame = (id) => {
      if (!queued.delete(id)) originalCancel.call(window, id);
    };
    return {
      runFrame: () => {
        for (const [id, callback] of Array.from(queued)) {
          if (queued.delete(id)) callback(performance.now());
        }
      },
      restore: () => {
        window.requestAnimationFrame = originalRequest;
        window.cancelAnimationFrame = originalCancel;
        queued.clear();
      },
    };
  });

const activateSubmenu = {
  pointer: (page: Page) =>
    page.getByRole("button", { name: /^More actions/ }).dispatchEvent("click"),
  keyboard: async (page: Page) => {
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowRight");
  },
};

for (const disablePortal of [true, false]) {
  for (const interaction of ["pointer", "keyboard"] as const) {
    test(`keeps ${interaction}-opened submenu focus when the initial frame runs (disablePortal=${disablePortal})`, async ({
      mount,
      page,
    }) => {
      await mount(<PopoverMenuFocusExample disablePortal={disablePortal} />);
      const trigger = page.getByRole("button", {
        name: "Open focus menu",
        exact: true,
      });
      await trigger.focus();
      const frames = await holdAnimationFrames(page);
      try {
        // Dispatch without waiting for actionability animation frames: this
        // deliberately exercises input before initial menu focus has run.
        await trigger.dispatchEvent("click");
        await activateSubmenu[interaction](page);
        const nested = page.getByRole("button", {
          name: "Nested first action",
          exact: true,
        });
        await expect(nested).toBeFocused();
        await frames.evaluate((queue) => queue.runFrame());
        expect(
          await nested.evaluate(
            (element) => element.ownerDocument.activeElement === element,
          ),
        ).toBe(true);
      } finally {
        await frames.evaluate((queue) => queue.restore());
        await frames.dispose();
      }
      // Keyboard exit must continue to return focus to the submenu trigger.
      await page.keyboard.press("ArrowLeft");
      await expect(
        page.getByRole("button", { name: /^More actions/ }),
      ).toBeFocused();
    });
  }
}

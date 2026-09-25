import React from "react";
import type { Locator } from "@playwright/test";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  PopoverMenuComponent,
  PopoverMenuWithPreselection,
  PopoverButtonMenuComponent,
  OverflowingPopoverButtonMenuComponent,
} from "./components.test-pw";

const isVisibleInScrollport = (element: Element) => {
  const scrollport = element.closest("[role='list']");
  const elementBox = element.getBoundingClientRect();
  const scrollportBox = scrollport?.getBoundingClientRect();

  return (
    !!scrollportBox &&
    elementBox.top >= scrollportBox.top &&
    elementBox.bottom <= scrollportBox.bottom
  );
};

const getBoundingBox = async (locator: Locator) => {
  const boundingBox = await locator.boundingBox();

  expect(boundingBox).not.toBeNull();

  return boundingBox as Exclude<typeof boundingBox, null>;
};

test.describe("Accessibility tests", () => {
  test("passes accessibility tests when open", async ({ mount, page }) => {
    await mount(<PopoverMenuComponent openByDefault />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with isButtonMenu and when open", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverButtonMenuComponent openByDefault />);
    await checkAccessibility(page);
  });

  (["small", "medium", "large"] as const).forEach((size) => {
    test(`passes accessibility tests with size ${size} and menu open`, async ({
      mount,
      page,
    }) => {
      await mount(<PopoverMenuComponent size={size} openByDefault />);
      await checkAccessibility(page);
    });
  });

  test("passes accessibility tests with a custom width", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent width="400px" openByDefault />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with disabled items", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent withDisabledItems openByDefault />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with first item keyboard-highlighted via ArrowDown", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent openByDefault />);
    await page.keyboard.press("ArrowDown");
    await checkAccessibility(page);
  });

  test("passes accessibility tests with isButtonMenu first item focused via ArrowDown", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverButtonMenuComponent openByDefault />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with middle item keyboard-highlighted via ArrowDown", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent openByDefault />);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await checkAccessibility(page);
  });

  test("passes accessibility tests with isButtonMenu and middle item focused via ArrowDown", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverButtonMenuComponent openByDefault />);
    await page.keyboard.press("ArrowDown");
    await checkAccessibility(page);
  });

  test("passes accessibility tests with last item keyboard-highlighted via ArrowUp", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent openByDefault />);
    await page.keyboard.press("ArrowUp");
    await checkAccessibility(page);
  });

  test("passes accessibility tests with disabled item skipped via ArrowDown", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent withDisabledItems openByDefault />);
    // ArrowDown twice: first item highlighted, then disabled item skipped to third
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await checkAccessibility(page);
  });

  test("passes accessibility tests with isButtonMenu passed and disabled item skipped via ArrowDown", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverButtonMenuComponent withDisabledItems openByDefault />);
    // ArrowDown once: first item is skipped as disabled, second item is auto-focused then arrow down to third
    await page.keyboard.press("ArrowDown");
    await checkAccessibility(page);
  });

  test("passes accessibility tests with selected item and tick icon visible", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuWithPreselection />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with selected item keyboard-highlighted", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuWithPreselection />);
    // ArrowDown from no highlight jumps to selected item ("Two" at index 1)
    await page.keyboard.press("ArrowDown");
    await checkAccessibility(page);
  });

  (["small", "medium", "large"] as const).forEach((size) => {
    test(`passes accessibility tests with size ${size} and selected item with icon`, async ({
      mount,
      page,
    }) => {
      await mount(<PopoverMenuWithPreselection size={size} />);
      await checkAccessibility(page);
    });
  });
});

test("closes the main and sub menus when the user tabs forward from an item", async ({
  mount,
  page,
}) => {
  await mount(<PopoverButtonMenuComponent openByDefault />);

  await page.getByRole("button", { name: "Subaction 1" }).focus();
  await page.keyboard.press("Tab");

  await expect(page.getByRole("list")).toHaveCount(0);
});

test("closes the main and sub menus and focuses the control when the user Shift+Tabs from an item", async ({
  mount,
  page,
}) => {
  await mount(<PopoverButtonMenuComponent openByDefault />);

  await page.getByRole("button", { name: "Subaction 1" }).focus();

  await page.keyboard.down("Shift");
  await page.keyboard.press("Tab");
  await page.keyboard.up("Shift");

  await expect(page.getByRole("button", { name: "Control" })).toBeFocused();
  await expect(page.getByRole("list")).toHaveCount(0);
});

test("renders a button-menu submenu outside its scrollable parent menu", async ({
  mount,
  page,
}) => {
  await mount(<PopoverButtonMenuComponent openByDefault />);

  const menu = page.getByRole("list").first();

  await page.getByRole("button", { name: "Action 3" }).click();

  const subaction = page.getByRole("button", { name: "Subaction 1" });
  await expect(subaction).toBeVisible();
  await expect(menu.getByRole("button", { name: "Subaction 1" })).toHaveCount(
    0,
  );

  await expect
    .poll(() =>
      subaction.evaluate(
        (element) =>
          element
            .closest("[data-component='popover-menu']")
            ?.contains(document.querySelector("[role='list']")) ?? false,
      ),
    )
    .toBe(true);
  await subaction.click();
  await expect(page.getByRole("list")).toHaveCount(2);
});

test("contains and reaches overflowing button-menu actions with pointer scrolling", async ({
  mount,
  page,
}) => {
  await mount(<OverflowingPopoverButtonMenuComponent />);

  const menu = page.getByRole("list");
  const finalAction = menu.getByRole("button", { name: "Overflow action 8" });

  expect(
    await menu.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);

  const menuBoxBeforePointerScroll = await menu.boundingBox();

  expect(menuBoxBeforePointerScroll).not.toBeNull();
  await page.mouse.move(
    (menuBoxBeforePointerScroll?.x ?? 0) +
      (menuBoxBeforePointerScroll?.width ?? 0) / 2,
    (menuBoxBeforePointerScroll?.y ?? 0) +
      (menuBoxBeforePointerScroll?.height ?? 0) / 2,
  );
  await page.mouse.wheel(0, 1000);

  await expect
    .poll(() => menu.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  expect(await finalAction.evaluate(isVisibleInScrollport)).toBe(true);
  await expect(finalAction).toBeVisible();
  await finalAction.click();

  const [menuBox, finalActionBox] = await Promise.all([
    getBoundingBox(menu),
    getBoundingBox(finalAction),
  ]);

  expect(finalActionBox.y).toBeGreaterThanOrEqual(menuBox.y);
  expect(finalActionBox.y + finalActionBox.height).toBeLessThanOrEqual(
    menuBox.y + menuBox.height,
  );
});

test("keeps keyboard focus in an overflowing button menu and scrolls the focused action into view", async ({
  mount,
  page,
}) => {
  await mount(<OverflowingPopoverButtonMenuComponent />);

  const menu = page.getByRole("list");
  const finalAction = menu.getByRole("button", { name: "Overflow action 8" });

  expect(
    await menu.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);
  expect(await finalAction.evaluate(isVisibleInScrollport)).toBe(false);
  await expect(
    menu.getByRole("button", { name: "Overflow action 1" }),
  ).toBeFocused();

  for (let index = 0; index < 7; index += 1) {
    await page.keyboard.press("ArrowDown");
  }

  await expect(finalAction).toBeFocused();
  expect(await menu.evaluate((element) => element.scrollTop > 0)).toBe(true);
  expect(await finalAction.evaluate(isVisibleInScrollport)).toBe(true);
  await expect(finalAction).toBeVisible();
  await checkAccessibility(page);
});

test("retains a supplied maximum height while keeping overflowing button-menu actions reachable", async ({
  mount,
  page,
}) => {
  await mount(<OverflowingPopoverButtonMenuComponent maxHeight="120px" />);

  const menu = page.getByRole("list");
  const finalAction = menu.getByRole("button", { name: "Overflow action 8" });

  await expect(menu).toHaveCSS("max-height", "120px");
  expect(
    await menu.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);

  const menuBoxBeforePointerScroll = await menu.boundingBox();

  expect(menuBoxBeforePointerScroll).not.toBeNull();
  await page.mouse.move(
    (menuBoxBeforePointerScroll?.x ?? 0) +
      (menuBoxBeforePointerScroll?.width ?? 0) / 2,
    (menuBoxBeforePointerScroll?.y ?? 0) +
      (menuBoxBeforePointerScroll?.height ?? 0) / 2,
  );
  await page.mouse.wheel(0, 1000);

  await expect
    .poll(() => finalAction.evaluate(isVisibleInScrollport))
    .toBe(true);
  await expect(finalAction).toBeVisible();
  await finalAction.click();
});

test("does not add scrolling to a non-overflowing button menu", async ({
  mount,
  page,
}) => {
  await mount(<OverflowingPopoverButtonMenuComponent actionCount={3} />);

  const menu = page.getByRole("list");

  expect(
    await menu.evaluate(
      (element) => element.scrollHeight === element.clientHeight,
    ),
  ).toBe(true);
});

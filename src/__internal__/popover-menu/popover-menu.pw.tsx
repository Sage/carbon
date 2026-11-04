import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import { PopoverMenuButtonMedium } from "./popover-menu-test.stories";
import {
  PopoverMenuComponent,
  PopoverMenuWithPreselection,
  PopoverButtonMenuComponent,
} from "./components.test-pw";

test("keeps the medium button-menu story's submenu width and icon spacing", async ({
  mount,
  page,
}) => {
  await mount(<PopoverMenuButtonMedium />);
  await page.getByRole("button", { name: "Medium Button" }).click();
  const regularItemGap = await page
    .getByRole("button", { name: /Action 1/ })
    .locator('[data-role="button-child-container"]')
    .evaluate((content) => parseFloat(getComputedStyle(content).columnGap));

  const submenuParent = page.getByRole("button", { name: /Action 2/ });
  const spacing = await submenuParent
    .locator('[data-element="submenu-parent-wrapper"]')
    .evaluate((wrapper) => {
      const icon = wrapper.querySelector('[data-component="icon"]');
      const text = Array.from(wrapper.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      );
      if (!icon || !text?.textContent) {
        throw new Error("Expected an icon and label in the submenu trigger");
      }
      const { textContent } = text;
      const range = document.createRange();
      const start = textContent.indexOf(textContent.trim());
      range.setStart(text, start);
      range.setEnd(text, start + textContent.trim().length);
      const caret = wrapper.querySelector('[data-element="submenu-icon"]');
      const button = wrapper.closest("button");
      if (!caret || !button) {
        throw new Error("Expected a caret inside the submenu button");
      }
      return {
        gap:
          range.getBoundingClientRect().left -
          icon.getBoundingClientRect().right,
        caretInset:
          button.getBoundingClientRect().right -
          caret.getBoundingClientRect().right,
        expectedInset: parseFloat(getComputedStyle(button).paddingRight),
      };
    });
  expect(Math.abs(spacing.gap - regularItemGap)).toBeLessThan(1);
  expect(Math.abs(spacing.caretInset - spacing.expectedInset)).toBeLessThan(1);

  await submenuParent.click();

  await expect(page.getByTestId("menu-wrapper")).toHaveCount(2);
  await expect(page.getByTestId("menu-wrapper").nth(0)).toHaveCSS(
    "width",
    "200px",
  );
  await expect(page.getByTestId("menu-wrapper").nth(1)).toHaveCSS(
    "width",
    "200px",
  );
  await expect(
    page
      .getByRole("button", { name: /Subaction 1/ })
      .locator('[data-role="button-child-container"]'),
  ).toHaveCSS("justify-content", "center");
});

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

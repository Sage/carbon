import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import { ToastProps } from ".";
import {
  ToastComponent,
  ToastWhenOtherModalRenders,
  ToastWithConditionalContent,
  ToastAllAlign,
} from "./components.test-pw";
import {
  toastComponent,
  toastContent,
} from "../../../playwright/components/toast/index";
import { dialogWithRole } from "../../../playwright/components/dialog";
import { TOAST_COLORS } from "./toast.config";

import { button, closeIconButton } from "../../../playwright/components";
import { checkAccessibility } from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";
import { PORTAL } from "../../../playwright/components/locators";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = CHARACTERS.STANDARD;
const colorTypes = [
  "rgb(203, 55, 74)",
  "rgb(0, 96, 167)",
  "rgb(0, 138, 33)",
  "rgb(239, 103, 0)",
  "rgb(51, 91, 112)",
];

test.describe("Toast component", () => {
  specialCharacters.forEach((children) => {
    test(`should render with ${children} as children`, async ({
      mount,
      page,
    }) => {
      await mount(<ToastComponent>{children}</ToastComponent>);

      await expect(toastContent(page)).toHaveText(children);
    });
  });

  test("should close by pressing ESC key", async ({ mount, page }) => {
    await mount(<ToastComponent />);

    await page.keyboard.press("Escape");

    await expect(toastComponent(page)).toBeHidden();
  });

  test("should render with focus", async ({ mount, page }) => {
    await mount(<ToastComponent />);

    await expect(toastComponent(page)).toBeFocused();
  });

  test("should render without focus with disableAutoFocus prop", async ({
    mount,
    page,
  }) => {
    await mount(<ToastComponent disableAutoFocus />);

    await expect(toastComponent(page)).not.toBeFocused();
  });

  test("should render with id prop", async ({ mount, page }) => {
    await mount(<ToastComponent id={testData} />);

    await expect(toastComponent(page)).toHaveId(testData);
  });

  (
    [
      [TOAST_COLORS[0], colorTypes[0]],
      [TOAST_COLORS[1], colorTypes[1]],
      [TOAST_COLORS[2], colorTypes[2]],
      [TOAST_COLORS[3], colorTypes[3]],
      [TOAST_COLORS[4], colorTypes[4]],
      [TOAST_COLORS[5], colorTypes[1]],
    ] as [ToastProps["variant"], string][]
  ).forEach(([variant, color]) => {
    test(`should render with ${variant} variant`, async ({ mount, page }) => {
      await mount(<ToastComponent variant={variant} />);

      await expect(toastComponent(page)).toHaveCSS("border-color", color);
    });
  });

  test("should render with notice variant", async ({ mount, page }) => {
    await mount(<ToastComponent variant="notice" />);

    const toast = toastComponent(page);

    await expect(toast).toBeVisible();
    await expect(toast).toHaveCSS("background-color", "rgb(51, 91, 112)");
    await expect(toast).toHaveCSS(
      "box-shadow",
      "rgba(0, 20, 29, 0.1) 0px 10px 30px 0px, rgba(0, 20, 29, 0.1) 0px 30px 60px 0px",
    );
  });

  [true, false].forEach((boolVal) => {
    test(`should render with open prop set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<ToastComponent open={boolVal} />);
      if (boolVal) {
        await expect(toastComponent(page)).toBeVisible();
      } else {
        await expect(toastComponent(page)).toBeHidden();
      }
    });
  });

  test(`disappears after 1ms, when timeout prop is set to 1`, async ({
    mount,
    page,
  }) => {
    await mount(<ToastComponent timeout={1} />);

    await expect(toastComponent(page)).toBeHidden();
  });

  test("should render with targetPortalId prop", async ({ mount, page }) => {
    await mount(<ToastComponent targetPortalId={testData} />);

    await expect(page.locator(PORTAL)).toHaveId(testData);
  });

  test("should render with maxWidth prop", async ({ mount, page }) => {
    await mount(<ToastComponent maxWidth="250px" />);

    await expect(toastComponent(page)).toHaveCSS("max-width", "250px");
  });

  test("should render with focused close icon and correct style", async ({
    mount,
    page,
  }) => {
    await mount(<ToastComponent />);
    const icon = closeIconButton(page);
    await icon.focus();

    await expect(icon).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(icon).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
  });

  (["left", "center", "right"] as const).forEach((align) => {
    test(`should render with align prop set to ${align}`, async ({
      mount,
      page,
    }) => {
      await mount(<ToastComponent align={align} />);

      await expect(toastComponent(page).locator("..").locator("..")).toHaveCSS(
        "justify-content",
        align,
      );
    });
  });

  (["top", "bottom"] as const).forEach((alignY) => {
    test(`should render with alignY prop set to ${alignY}`, async ({
      mount,
      page,
    }) => {
      await mount(<ToastComponent alignY={alignY} />);

      await expect(toastComponent(page)).toHaveCSS(alignY, "0px");
    });
  });

  test("check clicking close icon should close toast when a new modal has opened on top of it", async ({
    mount,
    page,
  }) => {
    await mount(<ToastWhenOtherModalRenders />);

    await button(page).nth(0).click();
    await expect(toastComponent(page)).toBeVisible();

    await button(page).nth(1).click();
    await expect(dialogWithRole(page, "dialog")).toBeVisible();

    const closeIconToast = closeIconButton(page).nth(0);
    await closeIconToast.click();

    await expect(toastComponent(page)).toBeHidden();
  });

  test("should render with expected border radius", async ({ mount, page }) => {
    await mount(<ToastComponent />);

    await expect(toastComponent(page)).toHaveCSS("border-radius", "8px");
  });
});

test.describe("check events for Toast component", () => {
  test("should call onDismiss callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ToastComponent
        onDismiss={() => {
          callbackCount += 1;
        }}
      />,
    );
    await closeIconButton(page).click();
    expect(callbackCount).toBe(1);
  });

  test("should call onDismiss callback when a ESC event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ToastComponent
        onDismiss={() => {
          callbackCount += 1;
        }}
      />,
    );
    await page.keyboard.press("Escape");

    await expect(page.getByText("Toast")).toBeHidden();
    expect(callbackCount).toBe(1);
  });
});

test.describe("Accessibility tests for Toast component", () => {
  (
    [
      TOAST_COLORS[0],
      TOAST_COLORS[1],
      TOAST_COLORS[2],
      TOAST_COLORS[3],
    ] as ToastProps["variant"][]
  ).forEach((variant) => {
    test(`should render with ${variant} variant and check accessibility`, async ({
      mount,
      page,
    }) => {
      await mount(<ToastComponent variant={variant} />);

      await checkAccessibility(page);
    });
  });

  test("should render with notice variant and check accessibility", async ({
    mount,
    page,
  }) => {
    await mount(<ToastComponent variant="notice" />);

    await checkAccessibility(page);
  });

  test("should render with maxWidth prop and check accessibility", async ({
    mount,
    page,
  }) => {
    await mount(<ToastComponent maxWidth="250px" />);

    await checkAccessibility(page);
  });

  test("should render with all align combinations and check accessibility", async ({
    mount,
    page,
  }) => {
    await mount(<ToastAllAlign />);

    await checkAccessibility(page);
  });

  test("passes accessibility checks when multiple Toasts only have content when opened", async ({
    mount,
    page,
  }) => {
    await mount(<ToastWithConditionalContent />);

    // check accessibility when both toasts are closed and have undefined content
    await checkAccessibility(page);

    await button(page).nth(0).click();

    // check accessibility when first toast is open and has defined content
    await checkAccessibility(page, toastComponent(page));
  });
});

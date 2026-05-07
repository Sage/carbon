import React from "react";
import { MultiActionButtonProps } from "../multi-action-button";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  MultiActionButtonList,
  MultiActionButtonWithOneChild,
  MultiActionNestedInDialog,
  MultiActionTwoButtons,
  InOverflowHiddenContainer,
  ChildButtonTypes,
} from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";
import { SIZE, CHARACTERS } from "../../../playwright/support/constants";
import { getDataElementByValue } from "../../../playwright/components";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS] as const;

test.describe("Functional tests", () => {
  test(`does not close parent dialog when Escape key is pressed and child button list is visible`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionNestedInDialog />);

    const dialog = page.getByRole("dialog");
    await dialog.waitFor();

    const actionButton = page.getByRole("button", { name: "default text " });
    await actionButton.click();

    const buttonList = page.getByRole("list");
    await buttonList.waitFor();

    await page.keyboard.press("Escape");

    await buttonList.waitFor({ state: "hidden" });
    await expect(dialog).toBeVisible();
  });

  test(`should verify pressing Shift+Tab moves focus to previous child button, then the main button and closes the list`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = page.getByRole("button", {
      name: "Multi Action Button",
    });
    await actionButton.click();
    const listButton1 = page.getByRole("button", {
      name: "Example Button",
      exact: true,
    });
    const listButton2 = page.getByRole("button", {
      name: "Example Button with long text",
      exact: true,
    });

    await listButton2.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(listButton1).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(actionButton).toBeFocused();
    await expect(listButton1).toBeHidden();
    await expect(listButton2).toBeHidden();
  });

  test(`should verify pressing Tab moves focus to next child button, then closes the list and focuses the next element on the page`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionTwoButtons />);

    const actionButton1 = page.getByRole("button", {
      name: "Multi Action Button 1",
    });
    await actionButton1.click();

    const listButton1 = page.getByRole("button", {
      name: "Example Button",
      exact: true,
    });
    const listButton2 = page.getByRole("button", {
      name: "Example Button with long text",
      exact: true,
    });
    const listButton3 = page.getByRole("button", { name: "Short" });

    await page.keyboard.press("Tab");
    await expect(listButton1).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(listButton2).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(listButton3).toBeFocused();
    await page.keyboard.press("Tab");

    const actionButton2 = page.getByRole("button", {
      name: "Multi Action Button 2",
    });
    await expect(actionButton2).toBeFocused();
    await expect(listButton1).toBeHidden();
    await expect(listButton2).toBeHidden();
    await expect(listButton3).toBeHidden();
  });
});

test.describe("Accessibility tests", () => {
  test(`should pass tests for default component`, async ({ mount, page }) => {
    await mount(<MultiActionButtonList />);

    await checkAccessibility(page);
  });

  test(`should pass tests when open`, async ({ mount, page }) => {
    await mount(<MultiActionButtonList />);

    await page.getByRole("button").focus();
    await page.keyboard.press("Enter");

    await checkAccessibility(page);
  });

  test(`should pass tests with disabled prop set`, async ({ mount, page }) => {
    await mount(<MultiActionButtonList disabled />);

    await checkAccessibility(page);
  });

  (
    [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] as MultiActionButtonProps["size"][]
  ).forEach((size) => {
    test(`should pass tests with size prop set to ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList size={size} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass tests with width prop set`, async ({ mount, page }) => {
    await mount(<MultiActionButtonList width="70%" />);

    await checkAccessibility(page);
  });

  (
    [
      "primary",
      "secondary",
      "tertiary",
    ] as MultiActionButtonProps["buttonType"][]
  ).forEach((type) => {
    test(`should pass tests with buttonType prop set as ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList buttonType={type} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass tests for ChildButtonTypes example`, async ({
    mount,
    page,
  }) => {
    await mount(<ChildButtonTypes />);

    await page.getByRole("button").click();
    await checkAccessibility(page);
  });

  (["left", "right"] as MultiActionButtonProps["align"][]).forEach(
    (alignment) => {
      test(`should pass tests with align prop set to ${alignment}`, async ({
        mount,
        page,
      }) => {
        await mount(<MultiActionButtonList align={alignment} />);

        await page.getByRole("button").click();
        await checkAccessibility(page);
      });
    },
  );

  testData.forEach((subtext) => {
    test(`should pass tests with subtext prop set as ${subtext}`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList size="large" subtext={subtext} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass tests with InOverflowHiddenContainer story`, async ({
    mount,
    page,
  }) => {
    await mount(<InOverflowHiddenContainer />);

    await page.getByRole("button", { name: "Heading" }).click();
    await page.getByRole("button", { name: "Multi Action Button" }).click();
    await checkAccessibility(page);
  });
});

test.describe("Focus outline and border radius tests for MultiActionButton", () => {
  test(`should render with the expected border radius when there is only on one child button`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonWithOneChild />);

    const actionButton = page.getByRole("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    await expect(listButton1).toHaveCSS("border-radius", "8px");
  });
});

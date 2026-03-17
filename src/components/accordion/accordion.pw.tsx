import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";

import {
  AccordionComponent,
  AccordionWithSplitButton,
} from "./components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Standard Variant", () => {
  test("should expand Accordion using click", async ({ mount, page }) => {
    await mount(<AccordionComponent />);

    const accordionButton = page.getByRole("button", { name: "Title" });

    await accordionButton.click();

    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");

    const content = page.getByText("Content").first();
    await expect(content).toBeVisible();
  });

  test("should expand Accordion using Enter key", async ({ mount, page }) => {
    await mount(<AccordionComponent />);

    const accordionButton = page.getByRole("button", { name: "Title" });

    await accordionButton.press("Enter");

    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");

    const content = page.getByText("Content").first();
    await expect(content).toBeVisible();
  });

  test("should expand Accordion using Space key and does not trigger scroll", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent />);

    const accordionButton = page.getByRole("button", { name: "Title" });

    await accordionButton.press("Space");

    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");

    const content = page.getByText("Content").first();
    await expect(content).toBeVisible();

    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBe(0);
  });

  test("should expand Accordion with error by clicking on validation icon", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent error="error message" />);

    const validationIcon = page.getByTestId("icon-error");
    const accordionButton = page.getByRole("button", { name: "Title" });

    await validationIcon.click();

    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");

    const content = page.getByText("Content").first();
    await expect(content).toBeVisible();
  });

  testData.forEach((titleValue) => {
    test(`should render Accordion component with ${titleValue} as a title`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent title={titleValue} />);

      await expect(
        page.getByRole("button", { name: titleValue }),
      ).toBeVisible();
    });
  });

  testData.forEach((subtitleValue) => {
    test(`should render Accordion component with ${subtitleValue} as a subtitle`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent subTitle={subtitleValue} />);

      await expect(page.getByText(subtitleValue)).toBeVisible();
    });
  });

  test("should not hide the children container of SplitButton when it opens", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionWithSplitButton />);

    const splitButtonDropdown = page.getByRole("button", { name: "Show More" });

    await splitButtonDropdown.click();

    await expect(page.getByRole("button", { name: "Button 1" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Button 2" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Button 3" })).toBeVisible();
  });
});

test.describe("Simple Variant", () => {
  test("should expand Accordion using click", async ({ mount, page }) => {
    await mount(<AccordionComponent variant="simple" />);

    const accordionButton = page.getByRole("button", { name: "Title" });

    await accordionButton.click();

    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");

    const content = page.getByText("Content").first();
    await expect(content).toBeVisible();
  });

  test("should expand Accordion using Enter key", async ({ mount, page }) => {
    await mount(<AccordionComponent variant="simple" />);

    const accordionButton = page.getByRole("button", { name: "Title" });

    await accordionButton.press("Enter");

    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");

    const content = page.getByText("Content").first();
    await expect(content).toBeVisible();
  });

  test("should expand Accordion using Space key and does not trigger scroll", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent variant="simple" />);

    const accordionButton = page.getByRole("button", { name: "Title" });

    await accordionButton.press("Space");

    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");

    const content = page.getByText("Content").first();
    await expect(content).toBeVisible();

    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBe(0);
  });
});

test.describe("Accessibility tests for Accordion", () => {
  test("should pass accessibility tests", async ({ mount, page }) => {
    await mount(<AccordionComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when expanded", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent expanded />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with 'subTitle'", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent subTitle="Sub title" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when 'variant' is simple", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent variant="simple" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when expanded and 'variant' is simple", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent variant="simple" expanded />);

    await checkAccessibility(page);
  });
});

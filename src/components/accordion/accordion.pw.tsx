import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  accordion,
  accordionIcon,
  accordionTitleContainer,
  accordionContent,
} from "../../../playwright/components/accordion";
import {
  getStyle,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { getDataElementByValue } from "../../../playwright/components";
import { SIZE, CHARACTERS } from "../../../playwright/support/constants";

import {
  AccordionComponent,
  AccordionWithIcon,
  AccordionDefault,
  AccordionGroupValidation,
  AccordionWithDefinitionList,
  AccordionWithSplit,
} from "./components.test-pw";

import { additionalButton as splitAdditionalButtons } from "../../../playwright/components/split-button";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("should render Accordion component", () => {
  test("should expand AccordionRow using click", async ({ mount, page }) => {
    await mount(<AccordionComponent />);

    await accordionTitleContainer(page).click();

    await expect(accordionTitleContainer(page)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(accordionTitleContainer(page)).toBeVisible();

    await expect(accordionContent(page)).toHaveAttribute(
      "data-element",
      "accordion-content",
    );
    await expect(accordionContent(page)).toBeVisible();
  });

  test("should expand AccordionRow using Enter key", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent />);

    await accordionTitleContainer(page).press("Enter");

    await expect(accordionTitleContainer(page)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(accordionTitleContainer(page)).toBeVisible();

    await expect(accordionContent(page)).toHaveAttribute(
      "data-element",
      "accordion-content",
    );
    await expect(accordionContent(page)).toBeVisible();
  });

  test("should expand Accordion using Space key and does not trigger scroll", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionComponent />);

    await accordionTitleContainer(page).press("Space");

    await expect(accordionTitleContainer(page)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(accordionTitleContainer(page)).toBeVisible();

    await expect(accordionContent(page)).toHaveAttribute(
      "data-element",
      "accordion-content",
    );
    await expect(accordionContent(page)).toBeVisible();

    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBe(0);
  });

  test("should expand AccordionRow by clicking on validation icon", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionWithIcon />);

    await accordionIcon(page).nth(0).click();

    await expect(accordionTitleContainer(page)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(accordionTitleContainer(page)).toBeVisible();

    await expect(accordionContent(page)).toHaveAttribute(
      "data-element",
      "accordion-content",
    );
    await expect(accordionContent(page)).toBeVisible();
  });

  testData.forEach((titleValue) => {
    test(`should render Accordion component with ${titleValue} as a title`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent title={titleValue} />);

      await expect(accordionTitleContainer(page)).toContainText(titleValue);
    });
  });

  testData.forEach((titleValue) => {
    test(`should render Accordion component with ${titleValue} as a subtitle`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent subTitle={titleValue} />);

      await expect(accordionTitleContainer(page)).toContainText(titleValue);
    });
  });

  (
    [
      [SIZE.SMALL, 24],
      [SIZE.LARGE, 45],
    ] as const
  ).forEach(([size, height]) => {
    test(`should render Accordion component with ${size} as a size and has height property set to ${height}`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent size={size} />);

      const cssHeight = await getStyle(accordionTitleContainer(page), "height");
      expect(parseInt(cssHeight)).toBeLessThanOrEqual(height + 1);
      expect(parseInt(cssHeight)).toBeGreaterThanOrEqual(height - 1);
    });
  });

  (
    [
      ["full", "solid", "rgb(204, 214, 219)"],
      ["none", "none", "rgba(0, 0, 0, 0.9)"],
    ] as const
  ).forEach(([borderProp, borderStyle, colour]) => {
    test(`should render Accordion component with border type '${borderProp}'`, async ({
      mount,
      page,
    }) => {
      await mount(<AccordionComponent borders={borderProp} />);

      await expect(accordion(page)).toHaveCSS(
        "border-bottom-style",
        borderStyle,
      );
      await expect(accordion(page)).toHaveCSS("border-bottom-color", colour);
    });
  });

  test("should not hide the children container of SplitButton when it opens", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionWithSplit />);

    await getDataElementByValue(page, "dropdown").click();

    await expect(splitAdditionalButtons(page, 0)).toBeVisible();
    await expect(splitAdditionalButtons(page, 1)).toBeVisible();
    await expect(splitAdditionalButtons(page, 2)).toBeVisible();
    await expect(splitAdditionalButtons(page, 3)).toBeVisible();
    await expect(splitAdditionalButtons(page, 4)).toBeVisible();
  });
});

test.describe("Accessibility tests for Accordion", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for expanded example", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault expanded />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for small size example", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault size="small" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for example with subTitle", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault subTitle="Sub title" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for full border example", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault borders="full" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for group validation example", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionGroupValidation />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for example with Definition List", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionWithDefinitionList />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when variant is subtle", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionDefault variant="subtle" />);

    await checkAccessibility(page);
  });
});

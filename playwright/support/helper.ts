import type { Locator, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/experimental-ct-react17";

const OPEN_MODAL = '[data-state="open"]';
const CLOSED_MODAL = '[data-state="closed"]';

/**
 * Retrieve a computed style for an element.
 * @param locator The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
 * @param cssProp The CSS property for the style to retrieve
 * @returns a Promise for the style value
 * @example await getStyle(locator, "width");
 */
export const getStyle = async (
  locator: Locator,
  cssProp: string
): Promise<string> => {
  return locator.evaluate(
    (el, property) => window.getComputedStyle(el).getPropertyValue(property),
    cssProp
  );
};

/**
 * Check the accessibility rules for an element.
 * @param {Page} page
 * @example await checkAccessibility(page);
 */
export const checkAccessibility = async (page: Page) => {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags([
      "wcag2a", // WCAG 2.0 & WCAG 2.1 Level A
      "wcag2aa", // WCAG 2.0 & WCAG 2.1 Level AA
      "wcag21a", // WCAG 2.1 Level A
      "wcag21aa", // WCAG 2.1 Level AA
      "best-practice", // Best practices endorsed by Deque
    ])
    .disableRules(["landmark-one-main", "page-has-heading-one", "region"])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
};

type OutlineType =
  | "outline"
  | "border"
  | "border-top"
  | "border-bottom"
  | "border-left"
  | "border-right";

/**
 * Asserts if an element has the correct golden outline used as a focus indicator
 * @param element Target element as a Playwright locator
 * @param outlinePixelWidth
 * @param outline
 * @example await checkGoldenOutline(locator);
 */
export const checkGoldenOutline = async (
  element: Locator,
  outlinePixelWidth = "3px",
  outline: OutlineType = "outline"
) => {
  const outlineWidth = await getStyle(element, `${outline}-width`);
  const outlineColor = await getStyle(element, `${outline}-color`);
  const outlineStyle = await getStyle(element, `${outline}-style`);

  expect(outlineWidth).toEqual(outlinePixelWidth);
  expect(outlineColor).toEqual("rgb(255, 188, 25)");
  expect(outlineStyle).toEqual("solid");
};

export const checkElementIsInDOM = async (page: Page, locatorStr: string) => {
  expect(await page.$$(locatorStr)).toHaveLength(1);
};

export const checkElementIsNotInDOM = async (
  page: Page,
  locatorStr: string
) => {
  expect(await page.$$(locatorStr)).toHaveLength(0);
};

export const checkDialogIsInDOM = async (page: Page) => {
  await checkElementIsInDOM(page, OPEN_MODAL);
  await checkElementIsNotInDOM(page, CLOSED_MODAL);
};

export const checkDialogIsNotInDOM = async (page: Page) => {
  await checkElementIsNotInDOM(page, OPEN_MODAL);
  await checkElementIsInDOM(page, CLOSED_MODAL);
};

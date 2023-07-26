import type { Locator, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/experimental-ct-react17";

/**
 * Retrieve a computed style for an element.
 *
 * @function getStyle
 * @async
 * @param locator {Locator} The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
 * @param property {string} The CSS property for the style to retrieve
 * @returns Promise<string> The style value
 */
export const getStyle = async (
  locator: Locator,
  property: string
): Promise<string> => {
  return locator.evaluate(
    (el, property) => window.getComputedStyle(el).getPropertyValue(property),
    property
  );
};

/**
 * Check the accessibility rules for an element.
 *
 * @function checkAccessibility
 * @async
 * @param page {Page}
 * @returns void
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

/**
 * Retrieve a designToken from an element by css.
 *
 * @function getDesignTokensByCssProperty
 * @async
 * @param locator {Locator} The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
 * @param cssProperty The CSS property for the style to retrieve
 * @param page {Page} The Playwright page (see https://playwright.dev/docs/pages)
 * @returns Promise<string>[] The designToken value
 */
export const getDesignTokensByCssProperty = async (
  selector: string,
  cssProperty: string,
  page: Page
): Promise<string[]> => {
  const tokenNames: string[] = [];

  try {
    await page.waitForSelector(selector);
    const cssPropertyValue = await page.$eval(
      selector,
      (elem, property) => {
        const styles = window.getComputedStyle(elem);
        return styles.getPropertyValue(property);
      },
      cssProperty
    );
    const regex = /var\((--[^)]+)\)/g;

    const matches = cssPropertyValue.match(regex);
    if (matches) {
      matches.forEach((match: string) => {
        const tokenName = match.replace(/var\(|\)/g, "").trim();
        if (tokenName && !tokenNames.includes(tokenName)) {
          tokenNames.push(tokenName);
        }
      });
    }
  } catch (error) {
    console.error(error);
  }

  if (tokenNames.length === 0) {
    console.error(`Design token for property ${cssProperty} not found`);
  }

  return tokenNames;
};

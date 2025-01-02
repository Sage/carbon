import type { Locator, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/experimental-ct-react17";
import { label, legendSpan } from "../components/index";

/**
 * Retrieve a computed style for an element.
 * @param locator The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
 * @param cssProp The CSS property for the style to retrieve
 * @returns a Promise for the style value
 * @example await getStyle(locator, "width");
 */
export const getStyle = async (
  locator: Locator,
  cssProp: string,
  pseudoElement?: string,
): Promise<string> => {
  return locator.evaluate(
    (el, [property, pseudo]) =>
      window.getComputedStyle(el, pseudo).getPropertyValue(property as string),
    [cssProp, pseudoElement],
  );
};

export const waitForAnimationEnd = (locator: Locator) =>
  locator.evaluate((element) =>
    Promise.all(element.getAnimations().map((animation) => animation.finished)),
  );

/**
 * Check the accessibility rules for an element.
 * @param {Page} page
 * @param disableRules list of rule descriptions can be found here https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
 * @example await checkAccessibility(page);
 * @example await checkAccessibility(page, "color-contrast", "form-field-multiple-labels");
 */
export const checkAccessibility = async (
  page: Page,
  locator?: Locator,
  ...disableRules: string[]
) => {
  const preDisabledRules = [
    "landmark-one-main",
    "page-has-heading-one",
    "region",
  ];

  if (locator) {
    await locator.waitFor();
    await waitForAnimationEnd(locator);
  }

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags([
      "wcag2a", // WCAG 2.0 & WCAG 2.1 Level A
      "wcag2aa", // WCAG 2.0 & WCAG 2.1 Level AA
      "wcag21a", // WCAG 2.1 Level A
      "wcag21aa", // WCAG 2.1 Level AA
      "best-practice", // Best practices endorsed by Deque
    ])
    .disableRules([...preDisabledRules, ...disableRules])
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
 * Asserts if an element has the correct css border/outline
 * @param element Target element as a Playwright locator
 * @param outlinePixelWidth
 * @param cssProp
 * @param color
 * @example await checkCSSOutline(locator);
 */
export const checkCSSOutline = async (
  element: Locator,
  outlinePixelWidth = "2px",
  cssProp: OutlineType = "outline",
  style = "solid",
  color = "",
) => {
  const outlineWidth = await getStyle(element, `${cssProp}-width`);
  const outlineColor = await getStyle(element, `${cssProp}-color`);
  const outlineStyle = await getStyle(element, `${cssProp}-style`);

  expect(outlineWidth).toEqual(outlinePixelWidth);
  expect(outlineColor).toEqual(color);
  expect(outlineStyle).toEqual(style);
};

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
  outline: OutlineType = "outline",
) => {
  await checkCSSOutline(
    element,
    outlinePixelWidth,
    outline,
    "solid",
    "rgb(255, 188, 25)",
  );
};

/**
 * Asserts if an element has event was calledOnce
 * @param callbackData an array with callback data
 * @param eventName {string} event name
 * @example await expectEventWasCalledOnce(messages, "onClick");
 */
export const expectEventWasCalledOnce = async (
  callbackData: string[],
  eventName: string,
) => {
  const count = JSON.stringify(callbackData.length);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const callbackName = JSON.stringify(callbackData[0]._reactName);
  expect(count).toBe("1");
  expect(callbackName).toBe(`"${eventName}"`);
};

/**
 * Asserts that event was NOT called
 * @param callbackData an array with callback data
 * @example await expectEventWasNotCalled(messages);
 */
export const expectEventWasNotCalled = async (callbackData: string[]) => {
  const count = JSON.stringify(callbackData.length);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(count).toBe("0");
  expect(callbackData).toEqual([]);
};

/**
 * Creates a safe regExp and uses the .toHaveClass() assertion
 * As there is not a "contains" assertion for the .toHaveClass() assertion
 * @param locatorFunc the locator you'd like to use
 * @param className a className string you'd like to assert against
 * @example await containsClass(exampleLocator(page), "foo");
 */
export const containsClass = async (
  locatorFunc: Locator,
  className: string,
) => {
  const escapedClassName = className.replace(
    /[-[\]{}()*+?.,\\^$|#\s]/g,
    "\\$&",
  );

  const classNameRegEx = new RegExp(escapedClassName);

  await expect(locatorFunc).toHaveClass(classNameRegEx);
};

const positions = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
  sixth: 5,
  seventh: 6,
  eighth: 7,
  ninth: 8,
  tenth: 9,
  eleventh: 10,
  thirteenth: 12,
};

export function positionOfElement(type: keyof typeof positions): number {
  return positions[type];
}

/**
 * Converts from a "matrix(a, b, c, d, e, f)" string output from a CSS transform: rotate
 * to the actual rotation angle, while accounting for rounding errors in the calculation.
 * Adapted from https://css-tricks.com/get-value-of-css-rotation-through-javascript/ */
export function getRotationAngle(cssTransformString: string) {
  const matrixValues = cssTransformString
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map(Number);
  const [a, b] = matrixValues;
  const angleInRadians = Math.atan2(b, a);
  const angleInDegrees = angleInRadians * (180 / Math.PI);
  return Math.round(angleInDegrees);
}

export const assertCssValueIsApproximately = async (
  element: Locator,
  cssProp: string,
  value: number,
) => {
  const val = await getStyle(element, cssProp);
  expect(parseInt(val)).toBeGreaterThanOrEqual(value - 2);
  expect(parseInt(val)).toBeLessThanOrEqual(value + 2);
};

const keys = {
  downarrow: { key: "ArrowDown", keyCode: 40, which: 40 },
  uparrow: { key: "ArrowUp", keyCode: 38, which: 38 },
  leftarrow: { key: "ArrowLeft", keyCode: 37, which: 37 },
  rightarrow: { key: "ArrowRight", keyCode: 39, which: 39 },
  Enter: { key: "Enter", keyCode: 13, which: 13 },
  EnterForce: { key: "Enter", keyCode: 13, which: 13, force: true },
  Space: { key: " ", keyCode: 32, which: 32 },
  Tab: { key: "Tab", keyCode: 9, which: 9 },
  Home: { key: "Home", keyCode: 36, which: 36 },
  End: { key: "End", keyCode: 35, which: 35 },
  Esc: { key: "Escape", keyCode: 27, which: 27 },
  ShiftHold: { key: "Shift", keyCode: 16, which: 16, release: false },
  pagedown: { key: "PageDown", keyCode: 34, which: 34 },
  pageup: { key: "PageUp", keyCode: 33, which: 33 },
};

export function keyCode(type: keyof typeof keys): {
  key: string;
  keyCode: number;
  which: number;
  force?: boolean;
  release?: boolean;
} {
  return keys[type];
}

const verifyRequiredAsterisk = async (locator: Locator) => {
  // use getComputedStyle to read the pseudo selector
  // and read the value of the `content` CSS property
  const contentValue = await locator.evaluate((el) =>
    window.getComputedStyle(el, "after").getPropertyValue("content"),
  );
  await expect(contentValue).toBe('"*"');
};

export const verifyRequiredAsteriskForLabel = (
  page: Page,
  locator?: Locator,
) => {
  if (locator) {
    return verifyRequiredAsterisk(locator);
  }
  return verifyRequiredAsterisk(label(page));
};

export const verifyRequiredAsteriskForLegend = (page: Page) =>
  verifyRequiredAsterisk(legendSpan(page));

/**
 * Verifies whether an object exists while not visible to the user. */
export const isInViewport = async (page: Page, locator: Locator) => {
  const rect = await locator.evaluate((element) =>
    element.getBoundingClientRect(),
  );
  const bottom = await page.evaluate(async () => {
    const { documentElement } = window.document;
    return documentElement.clientHeight;
  });
  return rect.top <= bottom;
};

// adapted from Igor's code for Cypress util: https://www.npmjs.com/package/@dlgshi/cypress-plugin-designtokens?activeTab=code
export const getDesignTokensByCssProperty = async (
  page: Page,
  locator: Locator,
  cssProperty: string,
) => {
  const element = await locator.elementHandle();
  const tokens: string[] = await page.evaluate(
    ([elem, cssProp]) => {
      const tokenNames: string[] = [];
      // Iterate over the stylesheets
      for (let i = 0; i < document.styleSheets.length; i++) {
        const styleSheet = document.styleSheets[i];
        // Iterate over the CSS rules in the stylesheet
        for (let k = 0; k < styleSheet.cssRules.length; k++) {
          const newRule = styleSheet.cssRules[k];
          // Check if the rule matches the cssProperty and the element
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (newRule.style[cssProp] && elem.matches(newRule.selectorText)) {
            // Get all matches of the design token using a regular expression
            const regex = /var\((--[^)]+)\)/g;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const matches = newRule.style[cssProp].match(regex);
            if (matches) {
              // Iterate over the matches and push to tokenNames array
              matches.forEach((match: string) => {
                const tokenName = match.replace(/var\(|\)/g, "").trim();
                if (tokenName) {
                  tokenNames.push(tokenName);
                }
              });
            }
          }
        }
      }
      return tokenNames;
    },
    [element, cssProperty],
  );
  if (tokens.length === 0) {
    // eslint-disable-next-line no-console
    console.error(`Design token for property ${cssProperty} not found`);
  }
  return tokens;
};

export const continuePressingTAB = async (page: Page, count: number) => {
  const promises = [];

  for (let i = 0; i < count; i++) {
    promises.push(page.keyboard.press(`Tab`));
  }

  await Promise.all(promises);
};

export const continuePressingSHIFTTAB = async (page: Page, count: number) => {
  const promises = [];

  for (let i = 0; i < count; i++) {
    promises.push(page.keyboard.press(`Shift+Tab`));
  }

  await Promise.all(promises);
};

export const checkElementBorderColours = async (
  page: Page,
  element: Locator,
  color: string,
) => {
  await expect(element).toHaveCSS("border-bottom-color", color);
  await expect(element).toHaveCSS("border-left-color", color);
  await expect(element).toHaveCSS("border-right-color", color);
  await expect(element).toHaveCSS("border-top-color", color);
};

/* Util to ensure that a particular element is focused before proceeding.
 * Useful for avoiding race conditions when the component code auto-focuses some element in an effect.
 * @param page Returns the value of the `pageFunction` invocation. (see: https://playwright.dev/docs/api/class-page)
 * @param locator The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
 */
export const waitForElementFocus = async (page: Page, locator: Locator) => {
  const focusedElement = await locator.elementHandle();
  await page.waitForFunction(
    (element) => document.activeElement === element,
    focusedElement,
  );
};

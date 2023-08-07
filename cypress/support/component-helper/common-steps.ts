/* eslint-disable jest/valid-expect */
import { label, legendSpan } from "../../locators/index";

const verifyRequiredAsterisk = (
  element: Cypress.Chainable<JQuery<HTMLElement>>
) =>
  element.then(($els) => {
    const window = $els[0].ownerDocument.defaultView;
    if (!window) return;

    // use getComputedStyle to read the pseudo selector
    const after = window.getComputedStyle($els[0], "after");
    // read the value of the `content` CSS property
    const contentValue = after.getPropertyValue("content");
    expect(contentValue).to.eq('"*"');
  });

export const verifyRequiredAsteriskForLabel = () =>
  verifyRequiredAsterisk(label());
export const verifyRequiredAsteriskForLegend = () =>
  verifyRequiredAsterisk(legendSpan());

type CSSProperty =
  | "outline"
  | "border"
  | `border-${"top" | "right" | "bottom" | "left"}`;

export const checkGoldenOutline = (
  element: JQuery<HTMLElement>,
  outlinePixelWidth = 3,
  outline: CSSProperty = "outline"
) => {
  const outlineWidth = parseInt(element.css(`${outline}-width`));
  expect(element.css(`${outline}-color`)).to.equals("rgb(255, 188, 25)");
  expect(element.css(`${outline}-style`)).to.equals("solid");
  expect(outlineWidth).to.be.approximately(outlinePixelWidth, 1);
};

export const checkOutlineCss = (
  element: JQuery<HTMLElement>,
  outlinePixelWidth = 2,
  cssProp: CSSProperty = "outline",
  style = "solid",
  color = ""
) => {
  const outlineWidth = parseInt(element.css(`${cssProp}-width`));
  expect(element.css(`${cssProp}-color`)).to.equals(color);
  expect(element.css(`${cssProp}-style`)).to.equals(style);
  expect(outlineWidth).to.be.approximately(outlinePixelWidth, 1);
};

export const assertCssValueIsApproximately = (
  element: JQuery<HTMLElement>,
  cssProp: string,
  value: number
) => {
  const val = element.css(cssProp);
  return expect(parseInt(val)).to.be.approximately(value, 2);
};

export const disableTheAnimationAndTransitions = () => {
  cy.get("body").invoke(
    "append",
    Cypress.$(`
      <style id="__cypress-animation-disabler">
        *, *:before, *:after {
          transition-property: none !important;
          animation: none !important;
        }
      </style>
    `)
  );
};

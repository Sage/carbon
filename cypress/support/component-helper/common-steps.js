/* eslint-disable import/prefer-default-export */
import { label, legendSpan } from "../../locators/index";

const verifyRequiredAsterisk = (element) =>
  element.then(($els) => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView;
    // use getComputedStyle to read the pseudo selector
    const after = win.getComputedStyle($els[0], "after");
    // read the value of the `content` CSS property
    const contentValue = after.getPropertyValue("content");
    // the returned value will have double quotes around it, but this is correct
    expect(contentValue).to.eq('"*"');
  });

export const verifyRequiredAsteriskForLabel = () =>
  verifyRequiredAsterisk(label());
export const verifyRequiredAsteriskForLegend = () =>
  verifyRequiredAsterisk(legendSpan());

export const parseToIntElement = (elem) => {
  const inputString = elem.split(" ", 3);
  return parseInt(inputString);
};

export const checkGoldenOutline = (
  elem,
  outlineWidthPx = 3,
  outline = "outline"
) => {
  const outlineWidth = parseToIntElement(elem.css(`${outline}-width`));
  expect(elem.css(`${outline}-color`)).to.equals("rgb(255, 188, 25)");
  expect(elem.css(`${outline}-style`)).to.equals("solid");
  expect(outlineWidth).to.be.within(outlineWidthPx - 1, outlineWidthPx + 1);
};

export const checkOutlineCss = (
  elem,
  outlineWidthPx = 2,
  outline = "outline",
  style = "solid",
  color = ""
) => {
  const outlineWidth = parseInt(elem.css(`${outline}-width`));
  expect(elem.css(`${outline}-color`)).to.equals(color);
  expect(elem.css(`${outline}-style`)).to.equals(style);
  expect(outlineWidth).to.be.within(outlineWidthPx - 1, outlineWidthPx + 1);
};

export const checkDoubleFocusBorder = (
  elem,
  focusWidthPx = 4,
  outline = "none"
) => {
  cy.get(elem).then(($el) => {
    expect($el.css("outline")).toEqual(outline);
    expect($el.css("box-shadow")).toEqual(
      `0 0 0 ${focusWidthPx}px var(--colorsSemanticFocus500), 0 0 0 ${focusWidthPx}px * 2 var(--colorsUtilityYin090)`
    );
  });
};

export const splitByDotAndParseToIntElement = (elem) => {
  const inputString = elem.split(".");
  return parseInt(inputString);
};

export const useJQueryCssValueAndAssert = (elem, cssProp, valueToAssert) => {
  const val = elem.css(cssProp);
  return expect(splitByDotAndParseToIntElement(val)).to.be.within(
    valueToAssert - 1,
    valueToAssert + 2
  );
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

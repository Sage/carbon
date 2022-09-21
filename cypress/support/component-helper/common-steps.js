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

export const checkGoldenOutline = (elem, outlineWidthPx) => {
  const outlineWidth = parseToIntElement(elem.css("outline-width"));
  expect(elem.css("outline-color")).to.equals("rgb(255, 181, 0)");
  expect(elem.css("outline-style")).to.equals("solid");
  expect(outlineWidth).to.be.within(outlineWidthPx - 1, outlineWidth + 1);
};

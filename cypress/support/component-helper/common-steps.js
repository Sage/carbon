/* eslint-disable import/prefer-default-export */
import { getDataElementByValue } from "../../locators/index";

export const verifyRequiredAsterisk = () =>
  getDataElementByValue("label").then(($els) => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView;
    // use getComputedStyle to read the pseudo selector
    const after = win.getComputedStyle($els[0], "after");
    // read the value of the `content` CSS property
    const contentValue = after.getPropertyValue("content");
    // the returned value will have double quotes around it, but this is correct
    expect(contentValue).to.eq('"*"');
  });

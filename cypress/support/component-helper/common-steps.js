/* eslint-disable import/prefer-default-export */

// Pass the string which is appended with * as the element
export const verifyRequiredAsterisk = (element) =>
  cy.contains(element).then(($els) => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView;
    // use getComputedStyle to read the pseudo selector
    const after = win.getComputedStyle($els[0], "after");
    // read the value of the `content` CSS property
    const contentValue = after.getPropertyValue("content");
    // the returned value will have double quotes around it, but this is correct
    expect(contentValue).to.eq('"*"');
  });

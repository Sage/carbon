import INLINE_INPUT from "./locators";

// component preview locators
const inlineInput = (index) =>
  cy.get(INLINE_INPUT).find(`div:nth-child(${index})`).find("input");

export default inlineInput;

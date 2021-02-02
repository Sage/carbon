import LABEL_PREVIEW from "./locators";
import { LABEL } from "../locators";

// component preview locators
const labelPreview = (index) =>
  cy.get(LABEL_PREVIEW).find(`:nth-child(${index})`).find(LABEL);

export default labelPreview;

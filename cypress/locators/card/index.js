import CARD from "./locators";

// component preview locators
const card = () => cy.get(CARD).eq(0);

export default card;

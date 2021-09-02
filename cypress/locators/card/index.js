import CARD from "./locators";

// component preview locators
export const card = () => cy.get(CARD).eq(0);

export const draggableCard = (index) =>
  cy
    .get(`[data-element="draggable-card-${index}"]`)
    .find('[data-element="drag"]');
export const draggableContainer = (index) =>
  cy.get(`[data-element="draggable-container-${index}"]`);

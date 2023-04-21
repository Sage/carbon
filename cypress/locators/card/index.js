import CARD from "./locators";

// component preview locators
export const card = () => cy.get(CARD).eq(0);

export const draggableCard = (index) =>
  cy
    .get(`[data-element="draggable-card-${index}"]`)
    .find('[data-element="drag"]');

export const draggableContainer = (index) =>
  cy.get(`[data-element="draggable-container-${index}"]`);

export const columnCard = () =>
  cy.get(`[data-element="card-column"]`).find("div:nth-child(2)");

export const footerCard = () => cy.get(`[data-element="card-footer"]`);

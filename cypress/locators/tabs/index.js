// component preview locators
export const tabById = (id) => cy.get(`[data-tabid="tab-${id}"]`);
export const tabContentById = (id) =>
  cy.get(`[aria-labelledby="tab-${id}-tab"]`);
export const tabTitleById = (id) => cy.get(`#tab-${id}-tab`);

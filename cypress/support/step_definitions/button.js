import { buttonSubtextPreview, subtextInput, sizeSelect, childrenTextArea, asSelect, disabledCheckbox, themeSelect, knobsTab, buttonPreview } from "../../locators/buttonLocators";

Given('I open Button component page', () => {
  cy.visit(Cypress.env('button_component_url'));
  knobsTab().click();
});

When('I set as property to {string}', (asProperty) => {
  asSelect().select(asProperty);
});

When('I type {string} to as property', (asProperty) => {
  asSelect().type(asProperty);
});


// this step do not apply storybook
// Then('I see {string} {string} for results', (text, asProperty) => {
//   noResultsDropdown().should('have.text', `${text} "${asProperty}"`)
// });

When('I disable Component', () => {
  disabledCheckbox().check();
});

//todo
// Then('Component is disabled', () => {
//   buttonPreview().should('be.disabled')
// });

When('I enable Component', () => {
  disabledCheckbox().uncheck();
});

//todo
// Then('Component is enabled', () => {
//   buttonPreview().should('be.enabled')
// });

When('I set Component theme property to {string}', (theme) => {
  themeSelect().select(theme)
});




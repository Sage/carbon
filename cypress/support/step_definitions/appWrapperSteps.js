import { appWrapperPreview } from "../../locators/appWrapperLocators";

Given('I open App Wrapper component page', () => {
  cy.visit(Cypress.env('app_wrapper_componenet_url'));
});

Then('App Wrapper children on preview is {string}', (text) => {
  appWrapperPreview().should('have.text', text)
})

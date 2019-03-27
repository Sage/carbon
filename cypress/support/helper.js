import { knobsTab } from "../locators/commonLocators";

export function visitComponentUrl(url) {
    // cy.server()
    // cy.route('/?path=/story/*').as('getAccount')
    cy.visit(Cypress.env(url))
    knobsTab().click()
}
import { knobsTab } from "../locators/commonLocators";

export function visitComponentUrl(url) {
    cy.visit(Cypress.env(url))
    knobsTab().click()
}
import {
  animatedMenuButtonLabelPreview, animatedMenuButtonPreview,
  animatedMenuButtonDirectionSelect
} from "../../locators/animatedMenuButtonLocators";

const CLASS_PREFIX = 'carbon-animated-menu-button--';

Given('I open Animated Menu Button component page', () => {
  cy.visit(Cypress.env('animated_menu_button'));
})

When('I set direction to {string}', (direction) => {
  animatedMenuButtonDirectionSelect().select(direction)
})

When('I trigger Animated Menu Button preview', () => {
  animatedMenuButtonPreview().trigger('mouseover')
})

Then('Animated Menu Button label on preview is {string}', (text) => {
  animatedMenuButtonLabelPreview().should('have.text', text)
})

Then('Animated Menu Button direction on preview is {string}', (direction) => {
  animatedMenuButtonPreview().should('have.class', CLASS_PREFIX + direction)
})

Then('Animated Menu Button size property on preview is {string}', (size) => {
  animatedMenuButtonPreview().should('have.class', CLASS_PREFIX + size)
})

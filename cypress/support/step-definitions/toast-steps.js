import { toastPreview, toastComponent, toastTogglePreview } from '../../locators/toast';
import { getDataElementByValueIframe } from '../../locators';

When('I click on {string} Toggle Preview', (e) => {
  toastTogglePreview(e).scrollIntoView();
  toastTogglePreview(e).click();
});

Then('Toast icon is set to {string}', (val) => {
  toastPreview().children().first().should('have.attr', 'data-element', val);
});

Then('Toast children is set to {string}', (text) => {
  toastComponent().children().should('have.text', text);
});

Then('Toast component is visible', () => {
  toastPreview().should('be.visible');
});

Then('Toast component is not visible', () => {
  toastComponent().should('not.exist');
});

Then('Toast component has a close icon', () => {
  getDataElementByValueIframe('close').should('be.visible');
});

Then('Toast component has no close icon', () => {
  getDataElementByValueIframe('close').should('not.exist');
});

Then('Toast has background-color {string} and border {string} color', (color) => {
  toastComponent().children().first().should('have.css', 'background-color', color);
  toastComponent().should('have.css', 'border-color', color);
});

Then('Toast is centred', () => {
  toastComponent().should('have.css', 'margin-right', '0px');
});

Then('Toast is not centred', () => {
  toastComponent().should('have.css', 'margin-right', '30px');
});

Then('Toast component is stacked', () => {
  toastComponent().parent().parent().as('toastParent');
  cy.get('@toastParent').should('have.length', 2);
  cy.get('@toastParent').children().eq(0).find('div')
    .should('have.attr', 'data-component', 'toast');
  cy.get('@toastParent').children().eq(1).find('div')
    .should('have.attr', 'data-component', 'toast');
});

Then('Toast component is stacked delayed', () => {
  toastComponent().parent().parent().as('toastParent');
  cy.get('@toastParent').should('have.length', 1);
  cy.get('@toastParent').children().eq(0).find('div')
    .should('have.attr', 'data-component', 'toast');
  cy.wait(1500);
  toastComponent().parent().parent()
    .as('toastParentDelayed');
  cy.get('@toastParentDelayed').children().eq(1)
    .find('div')
    .should('have.attr', 'data-component', 'toast');
  cy.get('@toastParentDelayed').should('have.length', 2);
});

import { toastPreview, toastComponent } from '../../locators/toast';
import { getDataElementByValue } from '../../locators';

Then('Toast icon is set to {string}', (icon) => {
  toastPreview().children().should('have.attr', 'type', `${icon}`)
    .and('have.attr', 'data-element', `${icon}`)
    .and('be.visible');
});

Then('Toast children is set to {string}', (text) => {
  toastPreview().invoke('text').should('contain', text);
});

Then('Toast component is visible', () => {
  toastPreview().should('be.visible');
});

Then('Toast component is not visible', () => {
  toastPreview().should('not.exist');
});

Then('Toast component has a close icon', () => {
  getDataElementByValue('close').should('be.visible');
});

Then('Toast component has no close icon', () => {
  getDataElementByValue('close').should('not.exist');
});

Then('Toast has background-color {string} and border {string} color', (color) => {
  toastPreview().should('have.css', 'background-color', color);
  toastComponent().should('have.css', 'border-bottom-color', color)
    .and('have.css', 'border-left-color', color)
    .and('have.css', 'border-right-color', color)
    .and('have.css', 'border-top-color', color);
});

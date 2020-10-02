
import { loader, loaderInsideButton } from '../../locators/loader';

Then('Loader width is set to {int} px and height is set to {int} px', (width, height) => {
  loader().should('have.css', 'height', `${height}px`)
    .and('have.css', 'width', `${width}px`);
});

Then('button with loader width is set to {int} px and height is set to {int} px', (width, height) => {
  loaderInsideButton().should('have.css', 'height', `${height}px`)
    .and('have.css', 'width', `${width}px`);
});

Then('Loader isInsideButton and backgroundColor is {string}', (color) => {
  loaderInsideButton().should('be.visible')
    .and('have.css', 'background-color', color);
});

Then('Loader button is disabled', () => {
  loaderInsideButton().should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('Loader button is enabled', () => {
  loaderInsideButton().should('be.enabled');
});

Then('I focus loader button', () => {
  loaderInsideButton().focus();
});

Then('loader button has golden border outline', () => {
  loaderInsideButton().should('have.css', 'outline-color', 'rgb(255, 181, 0)');
});

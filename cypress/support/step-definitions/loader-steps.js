import { spinner } from '../../locators/spinner';
import { loader, loaderInsideButton } from '../../locators/loader';

const SPINNER_CLASS_PREFIX = 'carbon-spinner--';

Then('Loader {word} is set to {string}', (word, value) => {
  spinner().should('have.class', `${SPINNER_CLASS_PREFIX}${value}`);
});

Then('Loader Legacy Spinner width and height is set to {string}', (value) => {
  spinner($element => expect($element).to.have.css('height', `${value}px`));
  spinner($element => expect($element).to.have.css('width', `${value}px`));
});

Then('Loader width is set to {string} and height is set to {string}', (width, height) => {
  loader().should('have.css', 'height', `${height}px`);
  loader().should('have.css', 'width', width);
});

Then('button with loader width is set to {string} and height is set to {string}', (width, height) => {
  loaderInsideButton().should('have.css', 'height', height);
  loaderInsideButton().should('have.css', 'width', `${width}px`);
});

Then('Loader {string} color is set to {string}', (parameter, color) => {
  spinner().should('have.css', `${parameter}`, `${color}`);
});

Then('Loader {string} color is set to {string} gradient of {string} base color', (parameter, gradient, baseColor) => {
  const color = baseColor.replace('rgb', 'rgba').replace(')', `, ${gradient})`);
  spinner().should('have.css', `${parameter}`, `${color}`);
});

Then('Loader isInsideButton and backgroundColor is {string}', (color) => {
  loaderInsideButton().should('be.visible')
    .and('have.css', 'background-color', color);
});

Then('Loader button is disabled', () => {
  loaderInsideButton().should('have.attr', 'disabled');
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

import { spinner } from '../../locators/spinner';

const SPINNER_CLASS_PREFIX = 'carbon-spinner--';

Then('Loader {word} is set to {string}', (word, value) => {
  spinner().should('have.class', `${SPINNER_CLASS_PREFIX}${value}`);
});

Then('Loader width and height is set to {string}', (value) => {
  spinner().should('have.css', 'height', `${value}px`);
  spinner().should('have.css', 'height', `${value}px`);
});

Then('Loader {string} color is set to {string}', (parameter, color) => {
  spinner().should('have.css', `${parameter}`, `${color}`);
});

Then('Loader {string} color is set to {string} gradient of {string} base color', (parameter, gradient, baseColor) => {
  const color = baseColor.replace('rgb', 'rgba').replace(')', `, ${gradient})`);
  spinner().should('have.css', `${parameter}`, `${color}`);
});

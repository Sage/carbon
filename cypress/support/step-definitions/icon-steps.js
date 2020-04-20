import { icon } from '../../locators';

Then('background color is set to {string}', (color) => {
  icon().should('have.css', 'background-color', color);
});

Then('Icon height is set to {string}', (height) => {
  icon().should('have.css', 'height', height);
});

Then('radius is set to {string}', (radius) => {
  icon().should('have.css', 'border-bottom-left-radius', radius)
    .and('have.css', 'border-bottom-right-radius', radius)
    .and('have.css', 'border-top-left-radius', radius)
    .and('have.css', 'border-top-right-radius', radius);
});

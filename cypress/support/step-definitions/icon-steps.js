import { iconIFrame } from '../../locators';

Then('background color is set to {string}', (color) => {
  iconIFrame().should('have.css', 'background-color', color);
});

Then('Icon height is set to {string}', (height) => {
  iconIFrame().should('have.css', 'height', height);
});

Then('radius is set to {string}', (radius) => {
  iconIFrame().should('have.css', 'border-bottom-left-radius', radius)
    .and('have.css', 'border-bottom-right-radius', radius)
    .and('have.css', 'border-top-left-radius', radius)
    .and('have.css', 'border-top-right-radius', radius);
});

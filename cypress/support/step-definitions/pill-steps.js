import { pillPreview, pillCloseIcon } from '../../locators/pill';

const PILL_ON_DELETE_PROPERTY = 'carbon-pill--is-deletable';
const BORDER_SOLID_VALUE = '1px solid ';

Then('Pill children on preview is set to {string}', (text) => {
  pillPreview().should('have.text', text);
});

Then('Pill on preview has {string}', (pillColor) => {
  pillPreview().should('have.css', 'border', `${BORDER_SOLID_VALUE}${pillColor}`)
    .and('have.css', 'color', `${pillColor}`);
});

Then('Pill component has {string} fill color', (backgroundColor) => {
  pillPreview().should('have.css', 'background-color', backgroundColor);
});

Then('Pill component has no backgroundColor {string}', (backgroundColor) => {
  pillPreview().should('not.have.css', 'background-color', backgroundColor);
});

Then('Pill borderColor has {string} color', (borderColor) => {
  pillPreview().should('have.css', 'border-bottom-color', borderColor)
    .and('have.css', 'border-left-color', borderColor)
    .and('have.css', 'border-right-color', borderColor)
    .and('have.css', 'border-top-color', borderColor);
});

Then('Pill component has onDelete property', () => {
  pillCloseIcon().should('be.visible');
});

Then('Pill component has no onDelete property', () => {
  pillPreview().should('not.have.class', `${PILL_ON_DELETE_PROPERTY}`);
  pillCloseIcon().should('not.exist');
});

When('I click cross icon', () => {
  pillCloseIcon().click();
});

Then('Pill height is {string}', (height) => {
  pillPreview().should('have.css', 'height', `${height}px`);
});

Then('I click on Pill close icon button', () => {
  pillCloseIcon().click();
});

When('I focus Pill close icon', () => {
  pillCloseIcon().focus();
});

Then('Pill close icon has golden border outline', () => {
  pillCloseIcon().should('have.css', 'box-shadow', 'rgb(255, 181, 0) 0px 0px 0px 3px');
});

Then('I hover mouse on Pill close icon', () => {
  pillCloseIcon().trigger('mouseover');
});

Then('Pill close icon has {string} backgroundColor', (backgroundColor) => {
  pillCloseIcon().should('have.css', 'background-color', backgroundColor);
});

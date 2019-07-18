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

Then('Pill component has fill property', () => {
  pillPreview().should('have.css', 'background-color', 'rgb(51, 91, 109)');
});

Then('Pill component has no fill property', () => {
  pillPreview().should('not.have.css', 'background-color', 'rgb(51, 91, 109)')
    .and('have.css', 'color', 'rgb(51, 91, 109)');
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

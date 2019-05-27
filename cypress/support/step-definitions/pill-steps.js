import { pillPreview, pillCloseIcon } from '../../locators/pill';

const PILL_AS_PROPERTY = 'carbon-pill--';
const PILL_EMPTY_PROPERTY = '--empty';
const PILL_FILL_PROPERTY = 'default--fill';
const PILL_ON_DELETE_PROPERTY = 'carbon-pill--is-deletable';

Then('Pill children on preview is set to {string}', (text) => {
  pillPreview().should('have.text', text);
});

Then('Pill as on preview is {string}', (asProperty) => {
  pillPreview().should('have.class', `${PILL_AS_PROPERTY}${asProperty}${PILL_EMPTY_PROPERTY}`);
});

Then('Pill component has fill property', () => {
  pillPreview().should('have.class', `${PILL_AS_PROPERTY}${PILL_FILL_PROPERTY}`);
});

Then('Pill component has no fill property', () => {
  pillPreview().should('not.have.class', `${PILL_AS_PROPERTY}${PILL_FILL_PROPERTY}`);
  pillPreview().should('have.class', `${PILL_AS_PROPERTY}default${PILL_EMPTY_PROPERTY}`);
});

Then('Pill component has onDelete property', () => {
  pillPreview().should('have.class', `${PILL_ON_DELETE_PROPERTY}`);
  pillCloseIcon().should('be.visible');
});

Then('Pill component has no onDelete property', () => {
  pillPreview().should('not.have.class', `${PILL_ON_DELETE_PROPERTY}`);
  pillCloseIcon().should('not.exist');
});

When('I click cross icon', () => {
  pillCloseIcon().click();
});

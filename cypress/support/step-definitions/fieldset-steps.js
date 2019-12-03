import { legendPreview, fieldsetFieldName } from '../../locators/fieldset';

const FIRST_ELEMENT = 1;
const SECOND_ELEMENT = 2;
const THIRD_ELEMENT = 3;
const FOURTH_ELEMENT = 4;
const FIFTH_ELEMENT = 5;
const SIXTH_ELEMENT = 6;

Then('legend on preview is {string}', (legend) => {
  legendPreview().should('have.text', legend);
});

Then('legend on preview not exists', () => {
  legendPreview().should('not.exist');
});

Then('Fieldset component has proper field names', () => {
  fieldsetFieldName(FIRST_ELEMENT).should('have.text', 'First Name');
  fieldsetFieldName(SECOND_ELEMENT).should('have.text', 'Last Name');
  fieldsetFieldName(THIRD_ELEMENT).should('have.text', 'Address');
  fieldsetFieldName(FOURTH_ELEMENT).should('have.text', 'City');
  fieldsetFieldName(FIFTH_ELEMENT).should('have.text', 'Country');
  fieldsetFieldName(SIXTH_ELEMENT).should('have.text', 'Telephone');
});

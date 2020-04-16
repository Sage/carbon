import { legendPreview, fieldsetFieldName } from '../../locators/fieldset';
import { positionOfElement } from '../helper';

Then('legend on preview is {string}', (legend) => {
  legendPreview().should('have.text', legend);
});

Then('legend on preview not exists', () => {
  legendPreview().should('not.exist');
});

Then('Fieldset component has proper field names', () => {
  fieldsetFieldName(positionOfElement('second')).should('have.text', 'First Name');
  fieldsetFieldName(positionOfElement('third')).should('have.text', 'Last Name');
  fieldsetFieldName(positionOfElement('fourth')).should('have.text', 'Address');
  fieldsetFieldName(positionOfElement('fifth')).should('have.text', 'City');
  fieldsetFieldName(positionOfElement('second')).should('have.text', 'Country');
  fieldsetFieldName(positionOfElement('seventh')).should('have.text', 'Telephone');
});

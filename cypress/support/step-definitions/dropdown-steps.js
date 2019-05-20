import { dropdownComponentPreview, dropdownLabelPreview } from '../../locators/dropdown';
import { commonDataElementInputPreview } from '../../locators';

Then('Dropdown is disabled', () => {
  commonDataElementInputPreview().should('be.disabled');
});

Then('Dropdown is enabled', () => {
  commonDataElementInputPreview().should('not.be.disabled');
});

Then('Dropdown is readOnly', () => {
  dropdownComponentPreview().should('have.class', 'common-input--readonly');
});

Then('Dropdown is not readOnly', () => {
  dropdownComponentPreview().should('not.have.class', 'common-input--readonly');
});

Then('Dropdown label is set to {string}', (label) => {
  dropdownLabelPreview().should('have.text', label);
});

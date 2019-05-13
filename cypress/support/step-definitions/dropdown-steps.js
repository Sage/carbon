import { dropdownInputPreview, dropdownComponentPreview, dropdownLabelPreview } from '../../locators/dropdown';

Then('Dropdown is disabled', () => {
  dropdownInputPreview().should('be.disabled');
});

Then('Dropdown is enabled', () => {
  dropdownInputPreview().should('not.be.disabled');
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

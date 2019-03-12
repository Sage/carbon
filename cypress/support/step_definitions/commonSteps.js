import { childrenTextArea, asSelect, disabledCheckbox, themeSelect, knobsTab, buttonPreview } from "../../locators/buttonLocators";

const CARBON_BUTTON_PREFIX = 'carbon-button--';


When('I set children to {string}', (text) => {
  childrenTextArea().clear().type(text);
});

When('I set as property to {string}', (asProperty) => {
  asSelect().select(asProperty);
});

When('I type {string} to as property', (asProperty) => {
  asSelect().type(asProperty);
});


When('I disable Button', () => {
  disabledCheckbox().check();
});

Then('Button is disabled', () => {
  buttonPreview().should('be.disabled')
});

When('I enable Button', () => {
  disabledCheckbox().uncheck();
});

Then('Button is enabled', () => {
  buttonPreview().should('be.enabled')
});

When('I set Button theme property to {string}', (theme) => {
  themeSelect().select(theme)
});

When('I type {string} to Button theme property', (theme) => {
  themeSelect().type(theme)
});

Then('Button theme property on preview is {string}', (theme) => {
  buttonPreview().should('have.class', CARBON_BUTTON_PREFIX + theme)
});

Then('Button size property on preview is {string}', (size) => {
  buttonPreview().should('have.class', CARBON_BUTTON_PREFIX + size)
});




// this step do not apply storybook
// Then('I see {string} {string} for results', (text, asProperty) => {
//   noResultsDropdown().should('have.text', `${text} "${asProperty}"`)
// });
import { disabledCheckbox, themeSelect, buttonSubtextPreview } from "../../locators/buttonLocators";
import { commonButtonPreview } from "../../locators/commonLocators";

const CARBON_BUTTON_PREFIX = 'carbon-button--';

Then('Button label on preview is {string}', (label) => {
  commonButtonPreview().should('have.text', label)
});

When('I disable Button', () => {
  disabledCheckbox().check();
});

Then('Button is disabled', () => {
  commonButtonPreview().should('be.disabled')
});

When('I enable Button', () => {
  disabledCheckbox().uncheck();
});

Then('Button is enabled', () => {
  commonButtonPreview().should('be.enabled')
});

When('I set Button theme property to {string}', (theme) => {
  themeSelect().select(theme)
});

When('I type {string} to Button theme property', (theme) => {
  themeSelect().type(theme)
});

Then('Button theme property on preview is {string}', (theme) => {
  commonButtonPreview().should('have.class', CARBON_BUTTON_PREFIX + theme)
});

Then('Button size property on preview is {string}', (size) => {
  commonButtonPreview().should('have.class', CARBON_BUTTON_PREFIX + size)
});

Then('Button subtext on preview is {string}', (subtext) => {
  buttonSubtextPreview().should('have.text', subtext)
});

Then('Button subtext on preview is not visible', () => {
  buttonSubtextPreview().should('not.exist')
});

Then('Button as property on preview is {string}', (as) => {
  commonButtonPreview().should('have.class', CARBON_BUTTON_PREFIX + as)
});

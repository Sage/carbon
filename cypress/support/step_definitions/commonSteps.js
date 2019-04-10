import { visitComponentUrl } from "../helper";
import {
  asSelect, themeSelect, sizeSelect, subtextInput, dialogSubtitle, titleInput,
  heightInput, childrenTextArea, labelInput, dialogTitle, commonButtonPreview, alignSelect
} from "../../locators/commonLocators";

import { dialogTitle, dialogSubtitle } from "../../locators/alertDialogLocators";

Given('I open {string} component page', (component) => {
  visitComponentUrl(component)
})

Given('I open {string} component page with button', (component) => {
  visitComponentUrl(component, 'with_button')
})

Given('I open {string} component iframe', (component) => {
  visitComponentUrl(component, 'default', true)
})

When('I set children to {string}', (text) => {
  childrenTextArea().clear().type(text);
});

When('I set as property to {string}', (asProperty) => {
  asSelect().select(asProperty);
})

When('I type {string} to as property', (asProperty) => {
  asSelect().type(asProperty);
})

When('I set component size to {string}', (size) => {
  sizeSelect().select(size)
})

When('I set component subtext to {string}', (subtext) => {
  subtextInput().type(subtext)
})

When('I set component theme property to {string}', (theme) => {
  themeSelect().select(theme)
});

When('I set height to {string}', (height) => {
  heightInput().clear().type(height)
});

When('I check open checkbox', () => {
  openCheckbox().check();
})

When('I set label to {string}', (label) => {
  labelInput().clear().type(label)
})

When('I open component preview', () => {
  commonButtonPreview().click()
})

When('I set title to {string}', (title) => {
  titleInput().clear().type(title)
})

Then('component title on preview is {string}', (title) => {
  dialogTitle().should('have.text', title)
})

Then('component subtitle on preview is {string}', (subtitle) => {
  dialogSubtitle().should('have.text', subtitle)
})

When('I open component preview', () => {
  commonButtonPreview().click()
})

When('I set align property to {string}', (asProperty) => {
  alignSelect().select(asProperty);
});

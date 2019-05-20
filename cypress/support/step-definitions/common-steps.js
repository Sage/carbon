import {
  visitComponentUrl, setSlidebar, pressESCKey,
  pressTABKey,
} from '../helper';
import {
  sizeSelect, commonButtonPreview, labelPreview, helpIcon, inputWidthSlider,
  fieldHelpPreview, labelWidthSlider, labelAlignSelect, alignSelect, backgroundUILocator,
  closeIconButton, tooltipPreview, getKnobsInput, icon, inputWidthPreview,
} from '../../locators';

import { dialogTitle, dialogSubtitle } from '../../locators/dialog';
import { themeSelect } from '../../locators/button';

Given('I open {string} component page', (component) => {
  visitComponentUrl(component);
});

Given('I open {string} component page with button', (component) => {
  visitComponentUrl(component, 'with_button');
});

Given('I open {string} component iframe', (component) => {
  visitComponentUrl(component, 'default', true);
});

When('I set {word} to {string}', (propertyName, text) => {
  getKnobsInput(propertyName).clear().type(text);
});

When('I set {word} to empty', (propertyName) => {
  getKnobsInput(propertyName).clear();
});

When('I select {word} to {string}', (propertyName, selection) => {
  getKnobsInput(propertyName).select(selection);
});

When('I set component size to {string}', (size) => {
  sizeSelect().select(size);
});

When('I set component theme property to {string}', (theme) => {
  themeSelect().select(theme);
});

When('I open component preview', () => {
  commonButtonPreview().click();
});

Then('component title on preview is {string}', (title) => {
  dialogTitle().should('have.text', title);
});

Then('component subtitle on preview is {string}', (subtitle) => {
  dialogSubtitle().should('have.text', subtitle);
});

Then('label on preview is {string}', (label) => {
  labelPreview().should('have.text', label);
});

When('I hover mouse onto help icon', () => {
  helpIcon().trigger('mouseover');
});

When('I hover mouse onto icon', () => {
  cy.wait(100); // required becasue element might be reloaded
  icon().trigger('mouseover');
});

Then('tooltipPreview on preview is set to {string}', (text) => {
  tooltipPreview().should('have.text', text);
});

When('I set inputWidth slider to {int}', (width) => {
  setSlidebar(inputWidthSlider(), width);
});

Then('fieldHelp on preview is set to {string}', (text) => {
  fieldHelpPreview().should('have.text', text);
});

When('I set label width slider to {int}', (width) => {
  setSlidebar(labelWidthSlider(), width);
});

When('I set label align {string}', (direction) => {
  labelAlignSelect().select(direction);
});

Then('(labelAlign )direction on preview is {string}', (direction) => {
  if (direction === 'left') {
    // left is default property that's why it's absent inside class
    labelPreview().should('not.have.class', `common-input__label--align-${direction}`);
  } else {
    labelPreview().should('have.class', `common-input__label--align-${direction}`);
  }
});

When('I set align property to {string}', (asProperty) => {
  alignSelect().select(asProperty);
});

Then('Background UI is enabled', () => {
  backgroundUILocator().should('not.exist');
});

Then('Background UI is disabled', () => {
  backgroundUILocator().should('exist');
});

Then('closeIcon is visible', () => {
  closeIconButton().should('be.visible');
});

Then('I click closeIcon', () => {
  closeIconButton().click();
});

Then('closeIcon is not visible', () => {
  closeIconButton().should('not.exist');
});

When('I hit ESC key', () => {
  pressESCKey();
});

When('I hit Tab key', () => {
  pressTABKey();
});

When('I disable {word} component', () => {
  getKnobsInput('disabled').check();
});

When('I enable {word} component', () => {
  getKnobsInput('disabled').uncheck();
});

When('I check {word} checkbox', (checkboxName) => {
  getKnobsInput(checkboxName).check();
});

When('I uncheck {word} checkbox', (checkboxName) => {
  getKnobsInput(checkboxName).uncheck();
});

Then('inputWidth is set to {string}', (width) => {
  inputWidthPreview().should('have.attr', 'style').should('contain', `width: ${width}%`);
});

Then('inputWidth is not set', () => {
  inputWidthPreview().should('not.have.attr', 'style');
});

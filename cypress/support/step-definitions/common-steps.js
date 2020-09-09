import {
  visitComponentUrl, setSlidebar, pressESCKey, pressTABKey, asyncWaitForKnobs,
  visitFlatTableComponentNoiFrame, positionOfElement, keyCode,
  visitDocsUrl,
  visitComponentUrlWithParameters,
  clickActionsTab,
  clickClear,
} from '../helper';
import {
  commonButtonPreview, labelPreview, helpIconByPosition, inputWidthSlider,
  fieldHelpPreview, labelWidthSlider, backgroundUILocator,
  closeIconButtonIFrame, tooltipPreviewIFrame, getKnobsInput, getKnobsInputWithName,
  getKnobsInputByGroup,
  iconIFrame, inputWidthPreview, label, eventInAction, getDataElementByNameAndValue, storyRoot,
  precisionSlider, storyRootNoIframe, tooltipPreview, getDataElementByValue,
  knobsNameTab, dlsRoot,
  commonButtonPreviewNoIFrameRoot,
  getDataElementByValueIframe,
  commonButtonPreviewNoIframe,
  closeIconButton,
  fieldHelpPreviewNoIFrame,
  commonDataElementInputPreviewNoIframe,
  helpIconIframe,
  helpIconByPositionNoIFrame,
  getElementNoIframe,
  labelByPosition,
  helpIcon,
} from '../../locators';
import { dialogTitle } from '../../locators/dialog';
import { DEBUG_FLAG } from '..';
import { pagerSummary } from '../../locators/pager';

const TEXT_ALIGN = 'justify-content';
const TEXT_ALIGN_START = 'flex-start';
const TEXT_ALIGN_END = 'flex-end';

Given('I open design systems {word} {string} component page', (type, component) => {
  visitComponentUrl(component, type, false, 'design-system-');
});

Given('I open Design Systems {word} {string} component docs page', (type, component) => {
  visitDocsUrl(component, type, false, 'design-system-');
});

Given('I open design systems {word} {string} component in no iframe', (type, component) => {
  visitComponentUrl(component, type, true, 'design-system-');
});

Given('I open Test {word} {string} component in noIFrame with {string} json from {string} using {string} object name', (type, component, json, path, nameOfObject) => {
  visitComponentUrlWithParameters(component, type, true, 'design-system-', json, path, nameOfObject);
});

Given('I open {word} {string} component in noIFrame with {string} json from {string} using {string} object name', (type, component, json, path, nameOfObject) => {
  visitComponentUrlWithParameters(component, type, true, '', json, path, nameOfObject);
});

Given('I open {string} component page', (component) => {
  visitComponentUrl(component);
});

Given('I open Test {string} component page knobs in noIFrame', (component) => {
  visitComponentUrl(component, 'knobs', true, 'test-');
});

Given('I open {string} component page {string}', (component, story) => {
  visitComponentUrl(component, story, false);
});

Given('I open {string} component page {string} in no iframe', (component, story) => {
  visitComponentUrl(component, story, true);
});

Given('I open {string} component page in noIFrame', (component) => {
  visitComponentUrl(component, 'default', true);
});

Given('I open Experimental {string} component page in noIFrame', (component) => {
  visitComponentUrl(component, 'default', true, 'experimental-');
});

Given('I open {string} component page basic', (component) => {
  visitComponentUrl(component, 'basic');
});

Given('I open in full screen Test {string} component page in noIframe', (component) => {
  visitComponentUrl(component, 'in_full_screen_dialog', true, 'test-');
});

Given('I open {string} component page with button', (component) => {
  visitComponentUrl(component, 'with_button');
});

Given('I open {string} component page with button in noIFrame', (component) => {
  visitComponentUrl(component, 'with_button', true);
});

Given('I open dark theme {string} component page in noIFrame', (component) => {
  visitComponentUrl(component, 'dark_theme', true);
});

Given('I open {string} component in noiFrame', (component) => {
  visitComponentUrl(component, 'default', true);
});

Given('I open {string} component with button page in iframe', (component) => {
  visitComponentUrl(component, 'with_button', true);
});

Given('I open {string} component page multiple', (component) => {
  visitComponentUrl(component, 'multiple');
});

Given('I open {string} component page multiple in NoIFrame', (component) => {
  visitComponentUrl(component, 'multiple', true);
});

Given('I open {string} component page full-width in no iframe', (component) => {
  visitComponentUrl(component, 'full_width');
});

Given('I open Experimental {string} component page validations in noIframe', (component) => {
  visitComponentUrl(component, 'validations', true, 'experimental-');
});

Given('I open {word} Test {string} component page', (type, component) => {
  visitComponentUrl(component, type, false, 'test-');
});

Given('I open {word} Test {string} component page in noIframe', (type, component) => {
  visitComponentUrl(component, type, true, 'test-');
});

When('I open Design System Flat Table Test component basic page with prop value', () => {
  visitFlatTableComponentNoiFrame('Design System Flat Table Test', 'basic', true);
});

Given('I open {string} component page autoFocus in iframe', (component) => {
  visitComponentUrl(component, 'autofocus', true);
});

Given('I open {string} component page autoFocus multiple in iframe', (component) => {
  visitComponentUrl(component, 'autofocus_multiple', true);
});

Given('I open {string} component page with sticky footer', (component) => {
  visitComponentUrl(component, 'with_sticky_footer');
});

Given('I open {string} component page customFilter', (component) => {
  visitComponentUrl(component, 'customFilter');
});

When('I open {word} tab', (text) => {
  cy.wait(500, { log: DEBUG_FLAG }); // required because element needs to be loaded
  knobsNameTab(text).click();
});

When('I set {word} to {word} word', (propertyName, text) => {
  getKnobsInput(propertyName).clear().type(text);
});

When('I set {word} to {string}', (propertyName, text) => {
  getKnobsInput(propertyName).clear().type(text);
});

When('I set group {word} {word} to {word}', (groupName, propertyName, text) => {
  getKnobsInputByGroup(groupName, propertyName).clear().type(text);
});

When('I set {string} {string} to {string}', (propertyName, fieldName, text) => {
  asyncWaitForKnobs(propertyName, fieldName);
  getKnobsInputWithName(propertyName, fieldName).clear().type(text);
});

When('I set {word}-{word} to {string}', (word1, word2, text) => {
  getKnobsInput(`${word1}-${word2}`).clear().type(text);
});

When('I set {word} to empty', (propertyName) => {
  getKnobsInput(propertyName).clear();
});

When('I select {word} to {string}', (propertyName, selection) => {
  getKnobsInput(propertyName).select(selection);
});

When('I select {word} {word} to {string}', (propertyName, text, selection) => {
  getKnobsInputWithName(propertyName, text).select(selection);
});

When('I select group {word} {word} to {string}', (groupName, propertyName, selection) => {
  getKnobsInputByGroup(groupName, propertyName).select(selection);
});

When('I open component preview', () => {
  commonButtonPreview().click();
});

When('I open component preview in noIFrame', () => {
  commonButtonPreviewNoIFrameRoot().click();
});

When('I {string} button on preview', (text) => {
  getDataElementByValueIframe('main-text').contains(text).click();
});

Then('component title on preview is {word}', (title) => {
  dialogTitle().should('have.text', title);
});

Then('label on preview is {word}', (text) => {
  labelPreview().should('have.text', text);
});

Then('label on preview is {word} in NoIFrame', (text) => {
  getDataElementByValue('label').should('have.text', text);
});

Then('label is set to {word}', (text) => {
  getDataElementByValue('label').should('have.text', text);
});

When('I hover mouse onto help icon in IFrame', () => {
  helpIconIframe().trigger('mouseover');
});

When('I hover mouse onto help icon', () => {
  helpIcon().trigger('mouseover');
});

When('I hover mouse onto {string} help icon', (position) => {
  helpIconByPosition(positionOfElement(position)).trigger('mouseover');
});

When('I hover mouse onto {string} help icon in NoIFrame', (position) => {
  helpIconByPositionNoIFrame(positionOfElement(position)).trigger('mouseover');
});

When('I hover mouse onto icon', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // delayed in case the element need to be reloaded
  iconIFrame().trigger('mouseover');
});

Then('I hover mouse onto {string} icon in no iFrame', (name) => {
  getDataElementByValue(name).trigger('mouseover');
});

Then('I hover mouse onto {string} icon in iFrame', (name) => {
  getDataElementByValueIframe(name).trigger('mouseover');
});

Then('tooltipPreview on preview is set to {word}', (text) => {
  tooltipPreview().should('have.text', text);
});

Then('tooltipPreview on preview is set to {word} in IFrame', (text) => {
  tooltipPreviewIFrame().should('have.text', text);
});

When('I set inputWidth slider to {int}', (width) => {
  setSlidebar(inputWidthSlider(), width);
});

Then('fieldHelp on preview is set to {word}', (text) => {
  fieldHelpPreview().should('have.text', text);
});

Then('fieldHelp on preview is set to {word} in NoIFrame', (text) => {
  fieldHelpPreviewNoIFrame().should('have.text', text);
});

Then('{word} is set to fieldHelpInline and has marginLeft set to {string}', (componentName, marginLeft) => {
  fieldHelpPreviewNoIFrame().should('have.css', 'margin-left', marginLeft)
    .and('have.css', 'margin-top', '0px')
    .and('have.css', 'padding-left', '0px');
});

Then('{word} is not set to fieldHelpInline and has marginTop set to {string}', (componentName, marginTop) => {
  fieldHelpPreviewNoIFrame().should('have.css', 'margin-left', '0px')
    .and('have.css', 'margin-top', marginTop);
});

Then('{string} fieldHelp on preview is set to {word}', (position, text) => {
  fieldHelpPreviewNoIFrame(positionOfElement(position)).should('have.text', text);
});

When('I set label width slider to {int}', (width) => {
  setSlidebar(labelWidthSlider(), width);
});

When('I set group {word} {word} slider to {int}', (groupName, propertyName, width) => {
  setSlidebar(getKnobsInputByGroup(groupName, propertyName), width);
});

When('I set precision slider to {int}', (width) => {
  setSlidebar(precisionSlider(), width);
});

Then('{string} label Align on preview is {string}', (position, direction) => {
  if (direction === 'left') {
    labelByPosition(positionOfElement(position)).parent().should('have.css', TEXT_ALIGN, TEXT_ALIGN_START);
  } else {
    labelByPosition(positionOfElement(position)).parent().should('have.css', TEXT_ALIGN, TEXT_ALIGN_END);
  }
});

Then('label Align on preview is {string}', (direction) => {
  if (direction === 'left') {
    label().parent().should($element => expect($element).to.have.css(TEXT_ALIGN, TEXT_ALIGN_START));
  } else {
    label().parent().should($element => expect($element).to.have.css(TEXT_ALIGN, TEXT_ALIGN_END));
  }
});

Then('Background UI is enabled', () => {
  backgroundUILocator().should('not.exist');
});

Then('Background UI is disabled', () => {
  backgroundUILocator().should('exist');
});

Then('closeIcon is visible', () => {
  closeIconButtonIFrame().should('be.visible');
});

Then('I click closeIcon in IFrame', () => {
  closeIconButtonIFrame().click();
});

Then('I click closeIcon', () => {
  closeIconButton().click();
});

When('I click {string} button into iFrame', (text) => {
  commonButtonPreviewNoIframe().contains(text).click();
});

Then('closeIcon is not visible in IFrame', () => {
  closeIconButtonIFrame().should('not.exist');
});

Then('closeIcon is not visible', () => {
  closeIconButton().should('not.exist');
});

Then('closeIcon has the border outline color {string} and width {string} in IFrame', (color, width) => {
  closeIconButtonIFrame().should('have.css', 'outline-color', color)
    .and('have.css', 'outline-width', width);
});

Then('closeIcon has the border outline color {string} and width {string}', (color, width) => {
  closeIconButton().should('have.css', 'outline-color', color)
    .and('have.css', 'outline-width', width);
});

Then('closeIcon is focused', () => {
  closeIconButtonIFrame().focus();
});

When('I hit ESC key', () => {
  pressESCKey();
});

When('I hit Tab key {int} time(s)', (times) => {
  pressTABKey(times);
});

When('I disable {word} component', () => {
  getKnobsInput('disabled').check();
});

When('I enable {word} component', () => {
  getKnobsInput('disabled').uncheck();
});

When('I check {word} checkbox', (checkboxName) => {
  getKnobsInput(checkboxName).scrollIntoView();
  getKnobsInput(checkboxName).check();
});

When('I check group {word} {word} checkbox', (groupName, checkboxName) => {
  getKnobsInputByGroup(groupName, checkboxName).scrollIntoView();
  getKnobsInputByGroup(groupName, checkboxName).check();
});

When('I check {word} {word} checkbox', (checkboxName, text) => {
  getKnobsInputWithName(checkboxName, text).scrollIntoView();
  getKnobsInputWithName(checkboxName, text).check();
});

When('I check group {word} {word} {word} checkbox', (groupName, checkboxName, text) => {
  getKnobsInputByGroup(groupName, checkboxName, text).scrollIntoView();
  getKnobsInputByGroup(groupName, checkboxName, text).check();
});

When('I uncheck {word} checkbox', (checkboxName) => {
  getKnobsInput(checkboxName).scrollIntoView();
  getKnobsInput(checkboxName).uncheck();
});

When('I uncheck group {word} {word} checkbox', (groupName, checkboxName) => {
  getKnobsInputByGroup(groupName, checkboxName).scrollIntoView();
  getKnobsInputByGroup(groupName, checkboxName).uncheck();
});

When('I uncheck {word} {word} checkbox', (checkboxName, text) => {
  getKnobsInputWithName(checkboxName, text).scrollIntoView();
  getKnobsInputWithName(checkboxName, text).uncheck();
});

When('I uncheck group {word} {word} {word} checkbox', (groupName, checkboxName, text) => {
  getKnobsInputByGroup(groupName, checkboxName, text).scrollIntoView();
  getKnobsInputByGroup(groupName, checkboxName, text).uncheck();
});

Then('inputWidth is set to {string}', (width) => {
  inputWidthPreview().should('have.attr', 'style').should('contain', `width: ${width}%`);
});

Then('inputWidth is not set', () => {
  inputWidthPreview().should('not.have.attr', 'style');
});

Then('{word} labelWidth is set to {string}', (componentName, width) => {
  label().should('contain', `width: ${width}%;`);
});

Then('{word} action was called in Actions Tab', (event) => {
  eventInAction(event);
});

When('I close Sidebar', () => {
  closeIconButtonIFrame().click();
});

Then('data-{word} {string} is present', (element, value) => {
  getDataElementByNameAndValue(element, value).should('be.visible');
});

Then('text {string} color is set to {string}', (text, color) => {
  storyRootNoIframe().contains(text).should('have.css', 'color', color);
});

When('I click outside of the component', () => {
  storyRoot().click();
});

When('I click outside of the component in DLS directory', () => {
  dlsRoot().click();
});

When('I click above of the component in no iFrame', () => {
  storyRootNoIframe().click('top');
});

Then('{string} tab in {string} tab list is visible', (knobsName, position) => {
  cy.wait(2500, { log: DEBUG_FLAG }); // required because element needs to be loaded
  knobsNameTab(knobsName, positionOfElement(position)).should('be.visible')
    .and('have.css', 'visibility', 'visible');
});

When('I press keyboard {string} key times {int}', (key, times) => {
  for (let i = 0; i < times; i++) {
    cy.focused().trigger('keydown', keyCode(key));
  }
});

When('I press {string} onto focused element', (key) => {
  cy.focused().trigger('keydown', keyCode(key));
});

When('I press ESC onto focused element', () => {
  cy.focused().trigger('keydown', { keyCode: 16, which: 16, release: false });
  cy.focused().trigger('keydown', { keyCode: 27, which: 27 });
});

When('I press ShiftTab onto focused element', () => {
  cy.focused().trigger('keydown', { keyCode: 16, which: 16, release: false });
  cy.focused().trigger('keydown', { keyCode: 9, which: 9 });
});

Then('focused element inner content is set to {string}', (text) => {
  cy.focused().should('contain', text);
});

Then('focused element has golden border outline {string}', (color) => {
  cy.focused().should('have.css', 'outline', color);
});

When('I press {string} key times {int}', (key, times) => {
  for (let i = 0; i < times; i++) {
    cy.focused().type(`${key}`);
  }
});

When('I click on outside dialog in iFrame', () => {
  cy.get('#story-root').click({ force: true });
});

When('I click onto root in Test directory in iFrame', () => {
  cy.get('#root').click({ force: true });
});

Then('totalRecords is set to {string} {word}', (totalRecords, element) => {
  pagerSummary().invoke('text').should('contain', `${totalRecords} ${element}`);
});

When('I open component preview no iframe', () => {
  commonButtonPreviewNoIframe().click();
});

Then('input direction is {string}', (direction) => {
  commonDataElementInputPreviewNoIframe().should('have.css', 'text-align', `${direction}`);
});

Then('label width on preview is {int}', (width) => {
  getDataElementByValue('label').parent().should('have.attr', 'width').should('contain', `${width}`);
});

Then('label width on preview is {int} in IFrame', (width) => {
  label().should('have.attr', 'width').should('contain', `${width}`);
});

Then('inputWidth on preview is {int}', (width) => {
  commonDataElementInputPreviewNoIframe().parent().should('have.css', 'flex').should('contain', `${width}%`);
});

Then('label align on preview is set to {string}', (labelAlign) => {
  getDataElementByValue('label').should('have.css', TEXT_ALIGN, `${labelAlign}`);
});

Then('label align on preview is set to {string} in IFrame', (labelAlign) => {
  label().should('have.css', TEXT_ALIGN, `${labelAlign}`);
});

Then('label is inline', () => {
  getDataElementByValue('label').parent().should('have.css', TEXT_ALIGN, TEXT_ALIGN_END);
});

Then('label is not inline', () => {
  getDataElementByValue('label').parent().should('not.have.css', TEXT_ALIGN, TEXT_ALIGN_END);
});

Then('label is inline in IFrame', () => {
  label().should('have.css', TEXT_ALIGN, 'left');
});

Then('label width is set to {string} in NoIFrame', (width) => {
  getDataElementByValue('label').parent().should('have.attr', 'width', `${width}`);
});

Then('label Align on preview is {string}', (direction) => {
  label().should($element => expect($element).to.have.css(TEXT_ALIGN, `${direction}`));
});

Then('label Align on preview is {string} in NoIFrame', (direction) => {
  if (direction === 'left') {
    getDataElementByValue('label').parent().should($element => expect($element).to.have.css(TEXT_ALIGN, TEXT_ALIGN_START));
  } else {
    getDataElementByValue('label').parent().should($element => expect($element).to.have.css(TEXT_ALIGN, TEXT_ALIGN_END));
  }
});

Then('icon name in noIframe on preview is {string}', (iconName) => {
  getElementNoIframe(iconName);
});

When('I click {string} icon in iFrame', (iconName) => {
  getDataElementByValueIframe(iconName).click();
});

When('clear all actions in Actions Tab', () => {
  clickActionsTab();
  clickClear();
});
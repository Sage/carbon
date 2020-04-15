import {
  visitComponentUrl, setSlidebar, pressESCKey, pressTABKey, asyncWaitForKnobs,
  visitFlatTableComponentNoiFrame, positionOfElement, keyCode,
} from '../helper';
import {
  commonButtonPreview, labelPreview, helpIcon, helpIconByPosition, inputWidthSlider,
  fieldHelpPreview, labelWidthSlider, backgroundUILocator,
  closeIconButton, tooltipPreview, getKnobsInput, getKnobsInputWithName, getKnobsInputByGroup,
  icon, inputWidthPreview, label, eventInAction, getDataElementByNameAndValue, storyRoot,
  precisionSlider, storyRootNoIframe, tooltipPreviewNoIframe, getDataElementByValueNoIframe,
  knobsNameTab, fieldHelpPreviewByPosition, labelByPosition, dlsRoot,
  commonButtonPreviewNoIFrameRoot,
} from '../../locators';
import { dialogTitle, dialogSubtitle } from '../../locators/dialog';
import { DEBUG_FLAG } from '..';
import { getElementNoIframe, commonButtonPreviewNoIframe } from '../../locators/build';
import { pagerSummary } from '../../locators/pager';

const LABEL_INPUT_INLINE_CLASS = 'common-input__label--inline';
const TEXT_ALIGN = 'text-align';

Given('I open {string} component page', (component) => {
  visitComponentUrl(component);
});

Given('I open {string} component page knobs', (component) => {
  visitComponentUrl(component, 'knobs');
});

Given('I open {string} component page knobs in noIFrame', (component) => {
  visitComponentUrl(component, 'knobs', true);
});

Given('I open {string} component page basic', (component) => {
  visitComponentUrl(component, 'basic');
});

Given('I open {string} component page basic in iframe', (component) => {
  visitComponentUrl(component, 'basic', true);
});

Given('I open in full screen Test {string} component page in noIframe', (component) => {
  visitComponentUrl(component, 'in_full_screen_dialog', true, 'test-');
});

Given('I open {string} component page buttonToogleGroup validation in iframe', (component) => {
  visitComponentUrl(component, 'buttonToogleGroup', true);
});

Given('I open {string} component page with button', (component) => {
  visitComponentUrl(component, 'with_button');
});

Given('I open {string} component page with inputs', (component) => {
  visitComponentUrl(component, 'default_with_inputs');
});

Given('I open {string} component page legacy spinner', (component) => {
  visitComponentUrl(component, 'legacy_spinner');
});

Given('I open {string} component page legacy spinner in iframe', (component) => {
  visitComponentUrl(component, 'legacy_spinner', true);
});

Given('I open {string} component in iframe', (component) => {
  visitComponentUrl(component, 'default', true);
});

// the step above should be refactored and changed to in noiFrame
Given('I open {string} component in noiFrame', (component) => {
  visitComponentUrl(component, 'default', true);
});

Given('I open deprecated {string} component in iframe', (component) => {
  visitComponentUrl(component, 'classic', true, 'deprecated-');
});

Given('I open deprecated {string} component page', (component) => {
  visitComponentUrl(component, 'classic', false, 'deprecated-');
});

Given('I open {string} textbox based component page in iframe', (component) => {
  visitComponentUrl(component, 'textbox_based', true);
});

Given('I open {string} component with button page in iframe', (component) => {
  visitComponentUrl(component, 'with_button', true);
});

Given('I open {string} component page multiple', (component) => {
  visitComponentUrl(component, 'multiple');
});

Given('I open {string} component page multiple in iframe', (component) => {
  visitComponentUrl(component, 'multiple', true);
});

Given('I open {string} component page as sibling in iframe', (component) => {
  visitComponentUrl(component, 'as_a_sibling', true);
});

Given('I open {string} component page as sibling in no iframe', (component) => {
  visitComponentUrl(component, 'as_a_sibling');
});

Given('I open {string} component page validations in iframe', (component) => {
  visitComponentUrl(component, 'validations', true);
});

Given('I open basic Test {string} component page', (component) => {
  visitComponentUrl(component, 'basic', false, 'test-');
});

Given('I open basic Test {string} component page in noIframe', (component) => {
  visitComponentUrl(component, 'basic', true, 'test-');
});

Given('I open style override Test {string} component page in noIframe', (component) => {
  visitComponentUrl(component, 'style_override', true, 'test-');
});

When('I open Test {string} component basic page with prop value', (componentName) => {
  visitFlatTableComponentNoiFrame(componentName, 'basic', true, 'test-');
});

Given('I open grouped Test {string} component page in noIframe', (component) => {
  visitComponentUrl(component, 'grouped', true, 'test-');
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

When('I set {word} to {string}', (propertyName, text) => {
  getKnobsInput(propertyName).clear().type(text);
});

When('I set group {word} {word} to {string}', (groupName, propertyName, text) => {
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

Then('component title on preview is {string}', (title) => {
  dialogTitle().should('have.text', title);
});

Then('component subtitle on preview is {string}', (subtitle) => {
  dialogSubtitle().should('have.text', subtitle);
});

Then('label on preview is {string}', (text) => {
  labelPreview().should('have.text', text);
});

Then('label is set to {string}', (text) => {
  label().should('have.text', text);
});

When('I hover mouse onto help icon', () => {
  helpIcon().trigger('mouseover');
});

When('I hover mouse onto {string} help icon', (position) => {
  helpIconByPosition(positionOfElement(position)).trigger('mouseover');
});

When('I hover mouse onto icon', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // delayed in case the element need to be reloaded
  icon().trigger('mouseover');
});

Then('I hover mouse onto {string} icon in iFrame', (name) => {
  getElementNoIframe(name).trigger('mouseover');
});

Then('I hover mouse onto {string} icon in no iFrame', (name) => {
  getDataElementByValueNoIframe(name).trigger('mouseover');
});

Then('I hover mouse onto {string} {string} icon for validations component into iFrame', (position, name) => {
  getDataElementByValueNoIframe(name).eq(positionOfElement(position)).trigger('mouseover');
});

Then('tooltipPreview on preview is set to {string}', (text) => {
  tooltipPreview().should('have.text', text);
});

Then('tooltipPreview on preview into iFrame is set to {string}', (text) => {
  tooltipPreviewNoIframe().should('have.text', text);
});

When('I set inputWidth slider to {int}', (width) => {
  setSlidebar(inputWidthSlider(), width);
});

Then('fieldHelp on preview is set to {string}', (text) => {
  fieldHelpPreview().should('have.text', text);
});

Then('{string} fieldHelp on preview is set to {string}', (position, text) => {
  cy.wait(1500, { log: DEBUG_FLAG }); // delayed to ensure it to run on CI
  fieldHelpPreviewByPosition(positionOfElement(position)).should('have.text', text);
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

Then('labelAlign on preview is {string}', (direction) => {
  if (direction === 'left') {
    // left is default property that's why it's absent inside class
    labelPreview().should('not.have.class', `common-input__label--align-${direction}`);
  } else {
    labelPreview().should('have.class', `common-input__label--align-${direction}`);
  }
});

Then('{string} label Align on preview is {string}', (position, direction) => {
  labelByPosition(positionOfElement(position)).should('have.css', TEXT_ALIGN, direction);
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

When('I click {string} button into iFrame', (text) => {
  commonButtonPreviewNoIframe().contains(text).click();
});

Then('closeIcon is not visible', () => {
  closeIconButton().should('not.exist');
});

Then('closeIcon has the border outline color {string} and width {string}', (color, width) => {
  closeIconButton().should('have.css', 'outline-color', color)
    .and('have.css', 'outline-width', width);
});

Then('closeIcon is focused', () => {
  closeIconButton().focus();
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

Then('{word} labelInline is enabled', () => {
  label().should('have.class', LABEL_INPUT_INLINE_CLASS);
});

Then('{word} labelInline is disabled', () => {
  label().should('not.have.class', LABEL_INPUT_INLINE_CLASS);
});

Then('{word} labelWidth is set to {string}', (componentName, width) => {
  label().should('have.attr', 'style', `width: ${width}%;`);
});

Then('{word} action was called in Actions Tab', (event) => {
  eventInAction(event);
});

When('I close Sidebar', () => {
  closeIconButton().click();
});

Then('data-{word} {string} is present', (element, value) => {
  getDataElementByNameAndValue(element, value).should('be.visible');
});

Then('text {string} color is set to {string}', (text, color) => {
  storyRoot().contains(text).should('have.css', 'color', color);
});

When('I click outside of the component', () => {
  storyRoot().click();
});

When('I click outside of the component in DLS directory', () => {
  dlsRoot().click();
});

When('I click above of the component into iFrame', () => {
  storyRootNoIframe().click('top');
});

Then('{string} tab in {string} tab list is visible', (knobsName, position) => {
  cy.wait(1500, { log: DEBUG_FLAG }); // required because element needs to be loaded
  knobsNameTab(knobsName, positionOfElement(position)).should('be.visible')
    .and('have.css', 'visibility', 'visible');
});

When('I press keyboard {string} key times {int}', (key, times) => {
  for (let i = 0; i < times; i++) {
    cy.focused().trigger('keydown', keyCode(key));
  }
});

When('I press {string} onto focused element', (arrow) => {
  cy.focused().trigger('keydown', keyCode(arrow));
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

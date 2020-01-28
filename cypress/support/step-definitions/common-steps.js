import {
  visitComponentUrl, setSlidebar, pressESCKey, pressTABKey, asyncWaitForKnobs,
} from '../helper';
import {
  commonButtonPreview, labelPreview, helpIcon, helpIconByPosition, inputWidthSlider,
  fieldHelpPreview, labelWidthSlider, labelWidthSliderByGroup, backgroundUILocator,
  closeIconButton, tooltipPreview, getKnobsInput, getKnobsInputWithName, getKnobsInputByGroup,
  icon, inputWidthPreview, label, eventInAction, getDataElementByNameAndValue, storyRoot,
  precisionSlider, storyRootNoIframe, tooltipPreviewNoIframe, getDataElementByValueNoIframe,
  knobsNameTab, fieldHelpPreviewByPosition, labelByPosition,
} from '../../locators';
import { dialogTitle, dialogSubtitle } from '../../locators/dialog';
import { DEBUG_FLAG } from '..';
import { getElementNoIframe, commonButtonPreviewNoIframe } from '../../locators/build';

const LABEL_INPUT_INLINE_CLASS = 'common-input__label--inline';
const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;
const THIRD_ELEMENT = 2;
const FOURTH_ELEMENT = 3;
const FIFTH_ELEMENT = 4;
const SIXTH_ELEMENT = 5;
const SEVENTH_ELEMENT = 6;
const TEXT_ALIGN = 'text-align';

Given('I open {string} component page', (component) => {
  visitComponentUrl(component);
});

Given('I open {string} component page classic', (component) => {
  visitComponentUrl(component, 'classic');
});

Given('I open {string} component page basic', (component) => {
  visitComponentUrl(component, 'basic');
});

Given('I open {string} component page basic in iframe', (component) => {
  visitComponentUrl(component, 'basic', true);
});

Given('I open {string} component page buttonToogleGroup validation in iframe', (component) => {
  visitComponentUrl(component, 'buttonToogleGroup', true);
});

Given('I open {string} component buttonToogleGroup classic page validation in iframe', (component) => {
  visitComponentUrl(component, 'buttonToogleGroup_classic', true);
});

Given('I open {string} basic classic component page in iframe', (component) => {
  visitComponentUrl(component, 'basic_classic', true);
});

Given('I open {string} component page with button', (component) => {
  visitComponentUrl(component, 'with_button');
});

Given('I open {string} component with button classic page', (component) => {
  visitComponentUrl(component, 'with_button_classic');
});

Given('I open {string} component page legacy spinner', (component) => {
  visitComponentUrl(component, 'legacy_spinner');
});

Given('I open {string} component page legacy spinner in iframe', (component) => {
  visitComponentUrl(component, 'legacy_spinner', true);
});

Given('I open {string} component page legacy spinner', (component) => {
  visitComponentUrl(component, 'legacy_spinner_classic');
});

Given('I open {string} component legacy spinner classic page in iframe', (component) => {
  visitComponentUrl(component, 'legacy_spinner_classic', true);
});

Given('I open {string} component in iframe', (component) => {
  visitComponentUrl(component, 'default', true);
});

Given('I open {string} component for classic story in iframe', (component) => {
  visitComponentUrl(component, 'classic', true);
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

Given('I open {string} textbox based classic component page in iframe', (component) => {
  visitComponentUrl(component, 'textbox_based_classic', true);
});

Given('I open {string} component with button page in iframe', (component) => {
  visitComponentUrl(component, 'with_button', true);
});

Given('I open {string} component for classic story with button page in iframe', (component) => {
  visitComponentUrl(component, 'with_button_classic', true);
});

Given('I open {string} component page multiple', (component) => {
  visitComponentUrl(component, 'multiple');
});

Given('I open {string} component for classic story page multiple', (component) => {
  visitComponentUrl(component, 'multiple_classic');
});

Given('I open {string} component page multiple in iframe', (component) => {
  visitComponentUrl(component, 'multiple', true);
});

Given('I open {string} component for classic story page multiple in iframe', (component) => {
  visitComponentUrl(component, 'multiple_classic', true);
});

Given('I open {string} component page as sibling in iframe', (component) => {
  visitComponentUrl(component, 'as_a_sibling', true);
});

Given('I open {string} component page as sibling in no iframe', (component) => {
  visitComponentUrl(component, 'as_a_sibling');
});

Given('I open {string} component for classic story as sibling in iframe', (component) => {
  visitComponentUrl(component, 'as_a_sibling_classic', true);
});

Given('I open {string} classic component for classic story as sibling in no iframe', (component) => {
  visitComponentUrl(component, 'as_a_sibling_classic');
});

Given('I open {string} component page validations in iframe', (component) => {
  visitComponentUrl(component, 'validations', true);
});

Given('I open {string} component page validations classic in iframe', (component) => {
  visitComponentUrl(component, 'validations_classic', true);
});

Given('I open {string} component page autoFocus in iframe', (component) => {
  visitComponentUrl(component, 'autofocus', true);
});

Given('I open {string} component page autoFocus multiple in iframe', (component) => {
  visitComponentUrl(component, 'autofocus_multiple', true);
});

When('I open {word} tab', (text) => {
  cy.wait(1000, { log: DEBUG_FLAG }); // required because element needs to be loaded
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
  switch (position) {
    case 'first':
      helpIconByPosition(FIRST_ELEMENT).trigger('mouseover');
      break;
    case 'second':
      helpIconByPosition(SECOND_ELEMENT).trigger('mouseover');
      break;
    case 'third':
      helpIconByPosition(THIRD_ELEMENT).trigger('mouseover');
      break;
    default: throw new Error('There are only three help icons on the page');
  }
});

When('I hover mouse onto icon', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // delayed in case the element need to be reloaded
  icon().trigger('mouseover');
});

Then('I hover mouse onto {string} icon in iFrame', (name) => {
  getElementNoIframe(name).trigger('mouseover');
});

Then('I hover mouse onto {string} {string} icon for validations component into iFrame', (position, name) => {
  switch (position) {
    case 'first':
      getDataElementByValueNoIframe(name).eq(FIRST_ELEMENT).trigger('mouseover');
      break;
    case 'second':
      getDataElementByValueNoIframe(name).eq(SECOND_ELEMENT).trigger('mouseover');
      break;
    case 'third':
      getDataElementByValueNoIframe(name).eq(THIRD_ELEMENT).trigger('mouseover');
      break;
    case 'fourth':
      getDataElementByValueNoIframe(name).eq(FOURTH_ELEMENT).trigger('mouseover');
      break;
    case 'fifth':
      getDataElementByValueNoIframe(name).eq(FIFTH_ELEMENT).trigger('mouseover');
      break;
    case 'sixth':
      getDataElementByValueNoIframe(name).eq(SIXTH_ELEMENT).trigger('mouseover');
      break;
    case 'seventh':
      getDataElementByValueNoIframe(name).eq(SEVENTH_ELEMENT).trigger('mouseover');
      break;
    default: throw new Error('There are only seven validation icon elements on the page');
  }
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
  switch (position) {
    case 'First':
      fieldHelpPreviewByPosition(FIRST_ELEMENT).should('have.text', text);
      break;
    case 'Second':
      fieldHelpPreviewByPosition(SECOND_ELEMENT).should('have.text', text);
      break;
    case 'Third':
      fieldHelpPreviewByPosition(THIRD_ELEMENT).should('have.text', text);
      break;
    default: throw new Error('There are only three field help elements on the page');
  }
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
  switch (position) {
    case 'First':
      labelByPosition(FIRST_ELEMENT).should('have.css', TEXT_ALIGN, direction);
      break;
    case 'Second':
      labelByPosition(SECOND_ELEMENT).should('have.css', TEXT_ALIGN, direction);
      break;
    case 'Third':
      labelByPosition(THIRD_ELEMENT).should('have.css', TEXT_ALIGN, direction);
      break;
    default: throw new Error('There are only three label elements on the page');
  }
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

// needs to be refactored when golden color will be fixed for Close icon - FE-2508
Then('closeIcon has the border outline', () => {
  closeIconButton().rightclick();
  closeIconButton().should('have.css', 'outline-color', 'rgba(0, 103, 244, 0.247)')
    .and('have.css', 'outline-width', '5px');
});

Then('closeIcon has no border outline for classic story', () => {
  closeIconButton().rightclick();
  closeIconButton().should('not.have.css', 'outline-color', 'rgba(0, 103, 244, 0.247)')
    .and('not.have.css', 'outline-width', '5px');
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
  getKnobsInpuByGroup(groupName, checkboxName, text).scrollIntoView();
  getKnobsInpuByGroup(groupName, checkboxName, text).uncheck();
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

When('I click above of the component into iFrame', () => {
  storyRootNoIframe().click('top');
});

Then('{string} tab in {string} tab list is visible', (knobsName, position) => {
  cy.wait(3000, { log: DEBUG_FLAG }); // required because element needs to be loaded
  switch (position) {
    case 'first':
      knobsNameTab(knobsName, FIRST_ELEMENT).should('be.visible')
        .and('have.css', 'visibility', 'visible');
      break;
    case 'second':
      knobsNameTab(knobsName, SECOND_ELEMENT).should('be.visible')
        .and('have.css', 'visibility', 'visible');
      break;
    default: throw new Error('There are only two tab list elements on the page');
  }
});

When('I press ESC on focused element', () => {
  cy.focused().trigger('keydown', { keyCode: 16, which: 16, release: false });
  cy.focused().trigger('keydown', { keyCode: 27, which: 27 });
});

When('I press Tab on focused element', () => {
  cy.focused().trigger('keydown', { keyCode: 9, which: 9 });
});

When('I press Home on focused element', () => {
  cy.focused().trigger('keydown', { keyCode: 36, which: 36 });
});

When('I press uparrow on focused element', () => {
  cy.focused().trigger('keydown', { keyCode: 38, which: 38 });
});

When('I press End on focused element', () => {
  cy.focused().trigger('keydown', { keyCode: 35, which: 35 });
});

When('I press ShiftTab on focused element', () => {
  cy.focused().trigger('keydown', { keyCode: 16, which: 16, release: false });
  cy.focused().trigger('keydown', { keyCode: 9, which: 9 });
});

Then('focused element inner content is set to {string}', (text) => {
  cy.focused().should('contain', text);
});

When('I press keyboard {string} key times {int}', (key, times) => {
  for (let i = 0; i < times; i++) {
    cy.focused().type(`${key}`);
  }
});

When('I click on outside dialog in iFrame', () => {
  cy.get('#story-root').click({ force: true });
});

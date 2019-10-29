import {
  visitComponentUrl, setSlidebar, pressESCKey, pressTABKey,
} from '../helper';
import {
  commonButtonPreview, labelPreview, helpIcon, inputWidthSlider, fieldHelpPreview,
  labelWidthSlider, backgroundUILocator, closeIconButton, tooltipPreview, getKnobsInput,
  icon, inputWidthPreview, label, eventInAction, getDataElementByNameAndValue, storyRoot,
  precisionSlider, storyRootNoIframe, tooltipPreviewNoIframe, getDataElementByValueNoIframe,
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

Given('I open {string} basic classic component page in iframe', (component) => {
  visitComponentUrl(component, 'basic_classic', true);
});

Given('I open {string} component page with button', (component) => {
  visitComponentUrl(component, 'with_button');
});

Given('I open {string} component page legacy spinner', (component) => {
  visitComponentUrl(component, 'legacy_spinner');
});

Given('I open {string} component page legacy spinner', (component) => {
  visitComponentUrl(component, 'legacy_spinner_classic');
});

Given('I open {string} component iframe', (component) => {
  visitComponentUrl(component, 'default', true);
});

Given('I open {string} component for classic story in iframe', (component) => {
  visitComponentUrl(component, 'classic', true);
});

Given('I open deprecated {string} component iframe', (component) => {
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

Given('I open {string} component page as sibling in iframe', (component) => {
  visitComponentUrl(component, 'as_a_sibling', true);
});

Given('I open {string} component for classic story as sibling in iframe', (component) => {
  visitComponentUrl(component, 'as_a_sibling_classic', true);
});

Given('I open {string} component page validations in iframe', (component) => {
  visitComponentUrl(component, 'validations', true);
});

Given('I open {string} component page validations classic in iframe', (component) => {
  visitComponentUrl(component, 'validations_classic', true);
});

When('I set {word} to {string}', (propertyName, text) => {
  getKnobsInput(propertyName).clear().type(text);
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

When('I hover mouse onto help icon', () => {
  helpIcon().trigger('mouseover');
});

When('I hover mouse onto icon', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // required becasue element might be reloaded
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

When('I set label width slider to {int}', (width) => {
  setSlidebar(labelWidthSlider(), width);
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

When('I uncheck {word} checkbox', (checkboxName) => {
  getKnobsInput(checkboxName).scrollIntoView();
  getKnobsInput(checkboxName).uncheck();
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

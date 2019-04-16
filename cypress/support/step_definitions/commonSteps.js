import { visitComponentUrl, setSlidebar } from "../helper";
import {
  asSelect, sizeSelect, subtextInput, titleInput,
  heightInput, childrenTextArea, labelInput, commonButtonPreview,
  labelPreview, helpIcon, labelHelpInput, inputWidthSlider, fieldHelpInput,
  fieldHelpPreview, labelWidthSlider, lableInlineCheckbox, labelAlignSelect
} from "../../locators/commonLocators";

import { dialogTitle, dialogSubtitle } from "../../locators/alertDialogLocators";
import { themeSelect } from "../../locators/ButtonLocators";

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

Then('label on preview is {string}', (label) => {
  labelPreview().should('have.text', label)
});

When('I set label help to {string}', (labelHelp) => {
  labelHelpInput().clear().type(labelHelp)
})

When('I hover mouse on help icon', () => {
  helpIcon().trigger('mouseover')
});

When('I set input width slider to {int}', (width) => {
  setSlidebar(inputWidthSlider(), width)
})

When('I set field help to {string}', (width) => {
  fieldHelpInput().clear().type(width)
})

Then('Field help on preview is set to {string}', (text) => {
  fieldHelpPreview().should('have.text', text)
})

When('I set label width slider to {int}', (width) => {
  setSlidebar(labelWidthSlider(), width)
})

When('I check label inline checkbox', () => {
  lableInlineCheckbox().check()
})

When('I set label align {string}', (direction) => {
  labelAlignSelect().select(direction)
})

Then('direction on preview is {string}', (direction) => {
  if (direction == 'left') {
    //left is default property that's why it's absent inside class
    labelPreview().should('not.have.class', 'common-input__label--align-' + direction)
  } else {
    labelPreview().should('have.class', 'common-input__label--align-' + direction)
  }
})

When('I set align property to {string}', (asProperty) => {
  alignSelect().select(asProperty);
});


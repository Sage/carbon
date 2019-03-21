import {
  asSelect, themeSelect, sizeSelect, subtextInput,
  heightInput, childrenTextArea, labelInput
} from "../../locators/commonLocators";

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
  heightInput().type(height)
});

When('I check open checkbox', () => {
  openCheckbox().check();
})

When('I set label to {string}', (label) => {
  labelInput().clear().type(label)
})

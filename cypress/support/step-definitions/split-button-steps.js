import { commonButtonPreview } from '../../locators';
import {
  splitToggleButton, additionalButton, splitMainButton, splitMainButtonDataComponent,
} from '../../locators/split-button';

const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;
const THIRD_ELEMENT = 2;

Then('Split Button is expanded', () => {
  commonButtonPreview().should('have.length', 5); // 3 expanded buttons, 1 icon button and 1 main button
  splitToggleButton().should('have.attr', 'aria-expanded', 'true');
});

Then('Split Button is set to {string} size and has {int} px height', (size, height) => {
  commonButtonPreview().should('have.css', 'height', `${height}px`);
  splitToggleButton().should('have.css', 'height', `${height}px`);
  splitToggleButton().click();
  additionalButton(FIRST_ELEMENT).should('have.css', 'height', `${height}px`);
  additionalButton(SECOND_ELEMENT).should('have.css', 'height', `${height}px`);
  additionalButton(THIRD_ELEMENT).should('have.css', 'height', `${height}px`);
});

Then('Split Button component additional buttons text align is set to {string} align', (align) => {
  splitToggleButton().click();
  additionalButton(FIRST_ELEMENT).should('have.css', 'text-align', align);
  additionalButton(SECOND_ELEMENT).should('have.css', 'text-align', align);
  additionalButton(THIRD_ELEMENT).should('have.css', 'text-align', align);
});

Then('Split Button iconPosition is set to {string} and has {string} icon', (iconPosition, icon) => {
  if (iconPosition === 'before') {
    splitMainButton(SECOND_ELEMENT).should('have.attr', 'data-component', 'icon')
      .and('have.attr', 'data-element', icon)
      .and('be.visible');
  } else {
    splitMainButton(THIRD_ELEMENT).should('have.attr', 'data-component', 'icon')
      .and('have.attr', 'data-element', icon)
      .and('be.visible');
  }
});

Then('Split Button first element has proper background-color {string} and border {string} color and has border-width {int} px', (color, borderColor, px) => {
  splitMainButtonDataComponent(SECOND_ELEMENT).should('have.css', 'background-color', color)
    .and('have.css', 'border-bottom-color', borderColor)
    .and('have.css', 'border-left-color', borderColor)
    .and('have.css', 'border-right-color', borderColor)
    .and('have.css', 'border-top-color', borderColor)
    .and('have.css', 'border-bottom-style', 'solid')
    .and('have.css', 'border-left-style', 'solid')
    .and('have.css', 'border-right-style', 'solid')
    .and('have.css', 'border-top-style', 'solid')
    .and('have.css', 'border-bottom-width', `${px}px`)
    .and('have.css', 'border-left-width', `${px}px`)
    .and('have.css', 'border-right-width', `${px}px`)
    .and('have.css', 'border-top-width', `${px}px`);
});

Then('Split Button second element has proper background-color {string} and border {string} color and has border-width {int} px', (color, borderColor, px) => {
  splitMainButtonDataComponent(THIRD_ELEMENT).should('have.css', 'background-color', color)
    .and('have.css', 'border-bottom-color', borderColor)
    .and('have.css', 'border-left-color', borderColor)
    .and('have.css', 'border-right-color', borderColor)
    .and('have.css', 'border-top-color', borderColor)
    .and('have.css', 'border-bottom-style', 'solid')
    .and('have.css', 'border-left-style', 'solid')
    .and('have.css', 'border-right-style', 'solid')
    .and('have.css', 'border-top-style', 'solid')
    .and('have.css', 'border-bottom-width', `${px}px`)
    .and('have.css', 'border-left-width', '0px')
    .and('have.css', 'border-right-width', `${px}px`)
    .and('have.css', 'border-top-width', `${px}px`);
});

Then('Split Button additional buttons have proper background-color {string} and border {string} color and has border-width {int} px', (color, borderColor, px) => {
  additionalButton(FIRST_ELEMENT).should('have.css', 'background-color', color)
    .and('have.css', 'border-bottom-color', borderColor)
    .and('have.css', 'border-left-color', borderColor)
    .and('have.css', 'border-right-color', borderColor)
    .and('have.css', 'border-top-color', borderColor)
    .and('have.css', 'border-bottom-style', 'solid')
    .and('have.css', 'border-left-style', 'solid')
    .and('have.css', 'border-right-style', 'solid')
    .and('have.css', 'border-top-style', 'solid')
    .and('have.css', 'border-bottom-width', `${px}px`)
    .and('have.css', 'border-left-width', `${px}px`)
    .and('have.css', 'border-right-width', `${px}px`)
    .and('have.css', 'border-top-width', `${px}px`);
  additionalButton(SECOND_ELEMENT).should('have.css', 'background-color', color)
    .and('have.css', 'border-bottom-color', borderColor)
    .and('have.css', 'border-left-color', borderColor)
    .and('have.css', 'border-right-color', borderColor)
    .and('have.css', 'border-top-color', borderColor)
    .and('have.css', 'border-bottom-style', 'solid')
    .and('have.css', 'border-left-style', 'solid')
    .and('have.css', 'border-right-style', 'solid')
    .and('have.css', 'border-top-style', 'solid')
    .and('have.css', 'border-bottom-width', `${px}px`)
    .and('have.css', 'border-left-width', `${px}px`)
    .and('have.css', 'border-right-width', `${px}px`)
    .and('have.css', 'border-top-width', `${px}px`);
  additionalButton(THIRD_ELEMENT).should('have.css', 'background-color', color)
    .and('have.css', 'border-bottom-color', borderColor)
    .and('have.css', 'border-left-color', borderColor)
    .and('have.css', 'border-right-color', borderColor)
    .and('have.css', 'border-top-color', borderColor)
    .and('have.css', 'border-bottom-style', 'solid')
    .and('have.css', 'border-left-style', 'solid')
    .and('have.css', 'border-right-style', 'solid')
    .and('have.css', 'border-top-style', 'solid')
    .and('have.css', 'border-bottom-width', `${px}px`)
    .and('have.css', 'border-left-width', `${px}px`)
    .and('have.css', 'border-right-width', `${px}px`)
    .and('have.css', 'border-top-width', `${px}px`);
});

When('I hover mouse onto split button', () => {
  splitMainButtonDataComponent(FIRST_ELEMENT).invoke('show').trigger('mouseover');
});

When('I click {string} element of Split Button component', (element) => {
  switch (element) {
    case 'first':
      splitMainButtonDataComponent(SECOND_ELEMENT).first().click();
      break;
    case 'third':
      additionalButton(FIRST_ELEMENT).click();
      break;
    case 'fourth':
      additionalButton(SECOND_ELEMENT).click();
      break;
    case 'fifth':
      additionalButton(THIRD_ELEMENT).click();
      break;
    default: throw new Error('There are only five elements in Split Button component');
  }
});

Then('Split Button expandable {string} element has golden border on focus', (element) => {
  switch (element) {
    case 'third':
      additionalButton(FIRST_ELEMENT).should('have.css', 'background-color', 'rgb(0, 63, 46)')
        .and('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
      break;
    case 'fourth':
      additionalButton(SECOND_ELEMENT).should('have.css', 'background-color', 'rgb(0, 63, 46)')
        .and('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
      break;
    case 'fifth':
      additionalButton(THIRD_ELEMENT).should('have.css', 'background-color', 'rgb(0, 63, 46)')
        .and('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
      break;
    default: throw new Error('There are only three expandable elements in Split Button component');
  }
});

Then('Split Button expandable {string} element has no golden border on focus for classic story', (element) => {
  switch (element) {
    case 'third':
      additionalButton(FIRST_ELEMENT).should('have.css', 'background-color', 'rgb(22, 55, 119)')
        .and('have.css', 'box-shadow', 'rgba(25, 99, 246, 0.6) 0px 0px 6px 0px');
      break;
    case 'fourth':
      additionalButton(SECOND_ELEMENT).should('have.css', 'background-color', 'rgb(22, 55, 119)')
        .and('have.css', 'box-shadow', 'rgba(25, 99, 246, 0.6) 0px 0px 6px 0px');
      break;
    case 'fifth':
      additionalButton(THIRD_ELEMENT).should('have.css', 'background-color', 'rgb(22, 55, 119)')
        .and('have.css', 'box-shadow', 'rgba(25, 99, 246, 0.6) 0px 0px 6px 0px');
      break;
    default: throw new Error('There are only three expandable elements in Split Button component');
  }
});

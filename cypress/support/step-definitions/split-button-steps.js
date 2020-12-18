import { commonButtonPreviewNoIFrameRoot } from '../../locators';
import {
  splitToggleButton,
  additionalButton,
  splitMainButtonDataComponent,
  additionalButtonIFrame,
  splitMainButtonDataComponentIFrame,
} from '../../locators/split-button';
import { positionOfElement } from '../helper';

Then('Split Button is expanded', () => {
  commonButtonPreviewNoIFrameRoot().should('have.length', 5); // 3 expanded buttons, 1 icon button and 1 main button
  splitToggleButton().should('have.attr', 'aria-expanded', 'true');
});

Then('Split Button first element has proper background-color {string} and border {string} color and has border-width {int} px', (color, borderColor, px) => {
  splitMainButtonDataComponent(positionOfElement('first')).should('have.css', 'background-color', color)
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
  splitMainButtonDataComponent(positionOfElement('second')).should('have.css', 'background-color', color)
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
  additionalButton(positionOfElement('first')).should('have.css', 'background-color', color)
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
  additionalButton(positionOfElement('second')).should('have.css', 'background-color', color)
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
  additionalButton(positionOfElement('third')).should('have.css', 'background-color', color)
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
  splitMainButtonDataComponent(positionOfElement('first')).invoke('show').trigger('mouseover');
});

When('I click {string} element of Split Button component', (element) => {
  if (element === 'first' || element === 'second' || element === 'third') {
    additionalButton(positionOfElement(element)).click();
  } else {
    splitMainButtonDataComponent(positionOfElement('second')).first().click();
  }
});

When('I click {string} element of Split Button component in IFrame', (element) => {
  if (element === 'first' || element === 'second' || element === 'third') {
    additionalButtonIFrame(positionOfElement(element)).click();
  } else if (element === 'main-button') {
    splitMainButtonDataComponentIFrame(positionOfElement('first')).click();
  } else {
    throw new Error('There is no such split button element');
  }
});

Then('Split Button expandable {string} element has golden border on focus', (element) => {
  additionalButton(positionOfElement(element)).should('have.css', 'background-color', 'rgb(0, 64, 46)')
    .and('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});

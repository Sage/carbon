import { commonButtonPreview } from '../../locators';
import {
  splitToggleButton, additionalButton, splitMainButton, splitMainButtonDataComponent,
} from '../../locators/split-button';
import { positionOfElement } from '../helper';

Then('Split Button is expanded', () => {
  commonButtonPreview().should('have.length', 5); // 3 expanded buttons, 1 icon button and 1 main button
  splitToggleButton().should('have.attr', 'aria-expanded', 'true');
});

Then('Split Button is set to {string} size and has {int} px height', (size, height) => {
  commonButtonPreview().should('have.css', 'height', `${height}px`);
  splitToggleButton().should('have.css', 'height', `${height}px`);
  splitToggleButton().click();
  additionalButton(positionOfElement('first')).should('have.css', 'height', `${height}px`);
  additionalButton(positionOfElement('second')).should('have.css', 'height', `${height}px`);
  additionalButton(positionOfElement('third')).should('have.css', 'height', `${height}px`);
});

Then('Split Button component additional buttons text align is set to {string} align', (align) => {
  splitToggleButton().click();
  additionalButton(positionOfElement('first')).should('have.css', 'text-align', align);
  additionalButton(positionOfElement('second')).should('have.css', 'text-align', align);
  additionalButton(positionOfElement('third')).should('have.css', 'text-align', align);
});

Then('Split Button iconPosition is set to {string} and has {string} icon', (iconPosition, icon) => {
  if (iconPosition === 'before') {
    splitMainButton(positionOfElement('second')).should('have.attr', 'data-component', 'icon')
      .and('have.attr', 'data-element', icon)
      .and('be.visible');
  } else {
    splitMainButton(positionOfElement('third')).should('have.attr', 'data-component', 'icon')
      .and('have.attr', 'data-element', icon)
      .and('be.visible');
  }
});

Then('Split Button first element has proper background-color {string} and border {string} color and has border-width {int} px', (color, borderColor, px) => {
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
    .and('have.css', 'border-left-width', `${px}px`)
    .and('have.css', 'border-right-width', `${px}px`)
    .and('have.css', 'border-top-width', `${px}px`);
});

Then('Split Button second element has proper background-color {string} and border {string} color and has border-width {int} px', (color, borderColor, px) => {
  splitMainButtonDataComponent(positionOfElement('third')).should('have.css', 'background-color', color)
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
  // switch (element) {
  //   case 'main':
  //     splitMainButtonDataComponent(positionOfElement('second')).first().click();
  //     break;
  //   case 'first':
  //   case 'second':
  //   case 'third':
  //     additionalButton(positionOfElement(element)).click();
  //     break;
  //   default: throw new Error('There are only five elements in Split Button component');
  // }
});

Then('Split Button expandable {string} element has golden border on focus', (element) => {
  additionalButton(positionOfElement(element)).should('have.css', 'background-color', 'rgb(0, 63, 46)')
    .and('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});

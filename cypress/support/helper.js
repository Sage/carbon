import { knobsTab } from '../locators';
import { DEBUG_FLAG } from '.';

const dialogSizes = Object.freeze({
  extraSmall: { name: 'extra-small', width: '300px' },
  small: { name: 'small', width: '380px' },
  mediumSmall: { name: 'medium-small', width: '540px' },
  medium: { name: 'medium', width: '750px' },
  mediumLarge: { name: 'medium-large', width: '850px' },
  large: { name: 'large', width: '960px' },
  extraLarge: { name: 'extra-large', width: '1080px' },
});

function prepareUrl(component, suffix, iFrameOnly) {
  let url = Cypress.env('localhost');
  // eslint-disable-next-line no-unused-expressions
  iFrameOnly ? url += Cypress.env('iframe') : url += Cypress.env('story');
  return url + component.toLowerCase().replace(/ /g, '-') + Cypress.env(suffix);
}

export function visitComponentUrl(component, suffix = 'default', iFrameOnly = false) {
  cy.visit(prepareUrl(component, suffix, iFrameOnly));
  if (!iFrameOnly) knobsTab().click();
}

export function dragAndDrop(draggableElement, destinationPosition, startFromHight) {
  const ROW_HIGHT = 35;
  const TEN_PIXEL_MOVE = 10;

  draggableElement
    .trigger('mousedown', { force: true })
    .wait(500) // required for correct drag&drop headless browser (500ms)
    .trigger('mousemove', { force: true })
    .wait(100); // required for correct drag&drop headless browser (100ms)

  // put row record on top of page, then move down every TEN_PIXEL_MOVE
  for (let i = 0; i < startFromHight + (destinationPosition * ROW_HIGHT); i += TEN_PIXEL_MOVE) {
    draggableElement
      .trigger('mousemove', { clientY: i, force: true, log: DEBUG_FLAG })
      .wait(100, { log: DEBUG_FLAG });
  }
  draggableElement
    .trigger('mouseup', { force: true });
}

export function setSlidebar(selector, value) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  selector.then(($range) => {
    const range = $range[0];
    nativeInputValueSetter.call(range, value);
    range.dispatchEvent(new Event('change', { value, bubbles: true }));
  });
}

function shouldHaveCssElementWidth(size) {
  return cy.should('have.css', 'width', size);
}

export function checkTheSizeOfTheElement(element, size) {
  switch (size) {
    case dialogSizes.extraSmall.name:
      shouldHaveCssElementWidth(dialogSizes.extraSmall.width);
      break;
    case dialogSizes.small.name:
      shouldHaveCssElementWidth(dialogSizes.small.width);
      break;
    case dialogSizes.mediumSmall.name:
      shouldHaveCssElementWidth(dialogSizes.mediumSmall.width);
      break;
    case dialogSizes.medium.name:
      shouldHaveCssElementWidth(dialogSizes.medium.width);
      break;
    case dialogSizes.mediumLarge.name:
      shouldHaveCssElementWidth(dialogSizes.mediumLarge.width);
      break;
    case dialogSizes.large.name:
      shouldHaveCssElementWidth(dialogSizes.large.width);
      break;
    case dialogSizes.extraLarge.name:
      shouldHaveCssElementWidth(dialogSizes.extraLarge.width);
      break;
    default: throw new Error(`Size: ${size} is not defined`);
  }
}

export function clickOntoESCKey() {
  // using Shift+Esc - because of storybook shortcuts overeride
  cy.iFrame('body').type('{shift}{esc}');
}

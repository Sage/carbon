import {
  knobsTab, actionsTab, clearButton, accessibilityTab, getKnobsInputWithName,
} from '../locators';
import { DEBUG_FLAG } from '.';
import { getElementNoIframe } from '../locators/build';

function prepareUrl(component, suffix, iFrameOnly, prefix) {
  let url = Cypress.config().baseUrl;
  const iFrame = Cypress.env('iframe') + prefix;
  const story = Cypress.env('story') + prefix;
  // eslint-disable-next-line no-unused-expressions
  iFrameOnly ? url += iFrame : url += story;
  return url + component.toLowerCase().replace(/ /g, '-') + Cypress.env(suffix);
}

export function visitComponentUrl(component, suffix = 'default', iFrameOnly = false, prefix = '') {
  cy.visit(prepareUrl(component, suffix, iFrameOnly, prefix));
  if (!iFrameOnly) knobsTab().click();
}

export function visitComponentUrlByTheme(component, theme, sufix = '') {
  cy.visit(`${prepareUrl(component, 'default', true, '')}&theme=${theme}${sufix}`);
}

export function visitFlatTableComponentNoiFrame(component, suffix = 'default', iFrameOnly = false, prefix = '', stickyRow = true, stickyHead = true, clickableRow = true) {
  cy.visit(`${prepareUrl(component, suffix, iFrameOnly, prefix, stickyRow, stickyHead, clickableRow)}&knob-hasHeaderRow=${stickyRow}&knob-hasStickyHead=${stickyHead}&knob-hasClickableRows=${clickableRow}`);
}

export function clickActionsTab(iFrameOnly = false) {
  if (!iFrameOnly) actionsTab().click();
}

export function clickAccessebilityTab(iFrameOnly = false) {
  if (!iFrameOnly) accessibilityTab().click();
}

export function clickClear() {
  clearButton().click();
}

export function dragAndDrop(draggableElement, destinationPosition, startFromHight) {
  const ROW_HIGHT = 45;
  const TEN_PIXEL_MOVE = 15;

  console.log(startFromHight);
  draggableElement
    .trigger('mousedown', { force: true, release: false })
    .wait(500) // required for correct drag&drop headless browser (500ms)
    .trigger('mousemove', { force: true, release: false })
    .wait(100); // required for correct drag&drop headless browser (100ms)
  console.log('Dragging item');
  // put row record on top of page, then move down every TEN_PIXEL_MOVE
  for (let i = 0; i < startFromHight + (destinationPosition * ROW_HIGHT); i += TEN_PIXEL_MOVE) {
    draggableElement
      .trigger('mousemove', {
        clientY: i, force: true, log: DEBUG_FLAG, release: false,
      })
      .trigger('mousemove', 'topRight', { force: true, release: false })
      .trigger('mousemove', 'topLeft', { force: true, release: false })
      .wait(100, { log: DEBUG_FLAG });
    console.log(`Dragging item in for loop to position ${i}`);
  }
  draggableElement
    .trigger('mouseup', { force: true, release: true });
  console.log('Dropped item');
}

export function setSlidebar(selector, value) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  selector.then(($range) => {
    const range = $range[0];
    nativeInputValueSetter.call(range, value);
    range.dispatchEvent(new Event('change', { value, bubbles: true }));
  });
}

export function pressESCKey() {
  // using Shift+Esc - because of storybook shortcuts override
  cy.iFrame('body').type('{shift}{esc}');
}

export function pressTABKey(count) {
  // cy.iFrame('body').tab(); uncomment when this function will be implemented by Cypress team
  for (let i = 0; i < count; i++) {
    cy.iFrame('body').trigger('tab', { force: true });
  }
}

export async function asyncWaitForIcon(name) {
  await getElementNoIframe(name);
}

export async function asyncWaitForKnobs(propertyName, fieldName) {
  await getKnobsInputWithName(propertyName, fieldName);
}

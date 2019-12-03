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

export function pressESCKey() {
  // using Shift+Esc - because of storybook shortcuts overeride
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

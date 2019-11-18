import {
  ENABLE_ON_CHANGE_DEFERRED_ACTION, ENABLE_ON_KEY_DOWN_ACTION,
} from './locators';

// component preview locators
export const enableOnChangeDeferredAction = () => cy.get(ENABLE_ON_CHANGE_DEFERRED_ACTION);
export const enableKeyDownAction = () => cy.get(ENABLE_ON_KEY_DOWN_ACTION);

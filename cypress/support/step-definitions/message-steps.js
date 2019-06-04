import {
  messageTitle, messageType, messagePreview, messageChildren, messageDismissIcon,
} from '../../locators/message';
import { clickActionsTab, clickClear } from '../helper';
import { eventInAction } from '../../locators';

Then('Message title on preview is set to {string}', (text) => {
  messageTitle().should('have.text', text);
});

Then('Message type on preview is {string}', (type) => {
  messageType().should('have.attr', 'data-element', type);
});

Then('Message component is visible', () => {
  messagePreview().should('be.visible');
});

Then('Message component is not visible', () => {
  messagePreview().should('not.exist');
});

When('clear all actions in Actions Tab', () => {
  clickActionsTab();
  clickClear();
});

Then('Message component is transparent', () => {
  messagePreview().should('have.css', 'background-color', 'rgb(255, 255, 255)');
});

Then('Message component is not transparent', () => {
  messagePreview().should('not.have.css', 'background-color', 'rgb(255, 255, 255)');
});

Then('Message children on preview is set to {string}', (text) => {
  messageChildren().should('have.text', text);
});

Then('Message has cross icon', () => {
  messageDismissIcon().should('be.visible');
});

Then('Message has no cross icon', () => {
  messageDismissIcon().should('not.exist');
});

Then('I click dismiss icon', () => {
  messageDismissIcon().click();
});

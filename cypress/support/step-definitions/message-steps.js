import {
  messageType, messagePreview, messageChildren, messageDismissIcon,
} from '../../locators/message';
import { getDataElementByValue } from '../../locators';

Then('Message title on preview is set to {word}', (text) => {
  getDataElementByValue('content-title').should('have.text', text);
});

Then('Message type on preview is {string}', (type) => {
  messageType().should('have.attr', 'data-element', type);
});

Then('Message component is not visible', () => {
  messagePreview().should('not.exist');
});

Then('Message component is transparent', () => {
  messagePreview().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
});

Then('Message component is not transparent', () => {
  messagePreview().should('not.have.css', 'background-color', 'rgba(0, 0, 0, 0)');
});

Then('Message children on preview is set to {word}', (text) => {
  messageChildren().should('have.text', text);
});

Then('Message has no cross icon', () => {
  messageDismissIcon().should('not.exist');
});

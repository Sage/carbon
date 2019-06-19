import { toastPreview } from '../../locators/toast';
import { getDataElementByValue } from '../../locators';

const TOAST_PREFIX = 'icon-';

Then('Toast as is set to {string} and icon is set to {string}', (as, icon) => {
  if (as === !('maintenance' || 'help' || 'new' || 'success')) {
    toastPreview().children().should('have.class', `${TOAST_PREFIX}${as}`);
    toastPreview().children().should('have.attr', 'data-element', `${icon}`);
  } else {
    toastPreview().children().should('have.class', `${TOAST_PREFIX}${icon}`);
    toastPreview().children().should('have.attr', 'data-element', `${icon}`);
  }
  getDataElementByValue(icon).should('exist');
});

Then('Toast children is set to {string}', (text) => {
  toastPreview().invoke('text').should('contain', text);
});

Then('Toast component is visible', () => {
  toastPreview().should('be.visible');
});

Then('Toast component is not visible', () => {
  toastPreview().should('not.exist');
});

Then('Toast component has a close icon', () => {
  getDataElementByValue('close').should('be.visible');
});

Then('Toast component has no close icon', () => {
  getDataElementByValue('close').should('not.exist');
});

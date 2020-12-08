import { preview } from '../../locators/preview';
import { dlsRootNoIframe } from '../../locators';

Then('Preview component is loading', () => {
  preview().should('be.visible');
});

Then('Preview component is not loading', () => {
  preview().should('not.exist');
});

Then('Preview children is set to {word}', (text) => {
  dlsRootNoIframe().should('have.text', text);
});

Then('Preview {word} is set to {string}', (parameter, text) => {
  preview().should('have.attr', 'style', `${parameter}: ${text};`);
});

Then('Preview {word} is not set to {word}', (parameter, text) => {
  if (parameter === 'lines') {
    dlsRootNoIframe().children().should('have.length', 0);
    preview().should('not.exist');
  // eslint-disable-next-line no-restricted-globals
  } else if (isNaN(parameter)) {
    preview().should('not.have.attr', 'style', `${parameter}${text}px`);
  }
});

Then('Preview has {int} lines', (value) => {
  if (value === 0) {
    dlsRootNoIframe().children().should('have.length', `${value}`);
    preview().should('not.exist');
  } else {
    dlsRootNoIframe().children().should('have.length', `${value}`);
    preview().should('be.visible');
  }
});

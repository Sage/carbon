import { preview } from '../../locators/preview';
import { storyRootNoIframe } from '../../locators';

Then('Preview component is loading', () => {
  preview().should('be.visible');
});

Then('Preview component is not loading', () => {
  preview().should('not.exist');
});

Then('Preview children is set to {word}', (text) => {
  storyRootNoIframe().should('have.text', text);
});

Then('Preview {word} is set to {string}', (parameter, text) => {
  preview().should('have.attr', 'style', `${parameter}: ${text};`);
});

Then('Preview {word} is not set to {word}', (parameter, text) => {
  if (parameter === 'lines') {
    storyRootNoIframe().children().should('have.length', 0);
    preview().should('not.exist');
  // eslint-disable-next-line no-restricted-globals
  } else if (isNaN(parameter)) {
    preview().should('not.have.attr', 'style', `${parameter}${text}px`);
  }
});

Then('Preview has {int} lines', (value) => {
  if (value === 0) {
    storyRootNoIframe().children().should('have.length', `${value}`);
    preview().should('not.exist');
  } else {
    storyRootNoIframe().children().should('have.length', `${value}`);
    preview().should('be.visible');
  }
});

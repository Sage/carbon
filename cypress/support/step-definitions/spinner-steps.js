import { spinner } from '../../locators/spinner';

const SPINNER_CLASS_PREFIX = 'carbon-spinner--';

Then('Spinner {word} is set to {string}', (word, value) => {
  spinner().should('have.class', `${SPINNER_CLASS_PREFIX}${value}`);
});

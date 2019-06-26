import { icon } from '../../locators';

const ICON_PREFIX = 'carbon-icon--';

Then('bg{word} is set to {string}', (word, bg) => {
  icon().should('have.class', `${ICON_PREFIX}${bg}`);
});

import { filterPreview } from '../../locators/filter';

const ALIGN_PREFIX = 'carbon-filter--align-';

Then('Filter label align property is set to {string}', (align) => {
  filterPreview().should('have.class', `${ALIGN_PREFIX}${align}`);
});

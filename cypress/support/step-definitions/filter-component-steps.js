import { filterPreview } from '../../locators/filter';

Then('Filter label align property is set to {string}', (align) => {
  filterPreview().should('have.class', `carbon-filter--align-${align}`);
});

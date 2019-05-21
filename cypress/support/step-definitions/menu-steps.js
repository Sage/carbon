import { menuPreview } from '../../locators/menu';

const CARBON_BUTTON_PREFIX = 'carbon-menu carbon-menu--';

Then('Menu as property on preview is {string}', (as) => {
  menuPreview().should('have.class', `${CARBON_BUTTON_PREFIX}${as}`);
});

Then('Menu elements are visible', () => {
  menuPreview().should('be.visible');
});

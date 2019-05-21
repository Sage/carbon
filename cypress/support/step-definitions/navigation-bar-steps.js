import { navigationBarPreview, navigationBarChildren } from '../../locators/navigation-bar';

const NAVIGATION_BAR_AS_CLASS = 'carbon-navigation-bar--';

Then('Navigation Bar children on preview is set to {string}', (text) => {
  navigationBarChildren()
    .should('have.text', text);
});

Then('Navigation Bar as on preview is {string}', (asProperty) => {
  navigationBarPreview()
    .should('have.class', `${NAVIGATION_BAR_AS_CLASS}${asProperty}`);
});

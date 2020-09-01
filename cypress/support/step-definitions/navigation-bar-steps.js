import { navigationBarChildren } from '../../locators/navigation-bar';

Then('Navigation Bar children on preview is set to {word}', (text) => {
  navigationBarChildren().should('have.text', text);
});

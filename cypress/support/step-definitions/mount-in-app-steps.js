import { mountInAppPreview } from '../../locators/mount-in-app';

Then('Mount in App component is visible', () => {
  mountInAppPreview().should('be.visible');
});

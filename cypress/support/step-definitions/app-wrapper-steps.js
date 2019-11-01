import { appWrapperPreview } from '../../locators/app-wrapper';

Then('App Wrapper children on preview is {string}', (text) => {
  appWrapperPreview().should('have.text', text);
});

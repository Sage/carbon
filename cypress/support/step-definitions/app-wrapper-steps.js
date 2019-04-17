import { appWrapperPreview } from '../../locators/app-wrapper-locators';

Then('App Wrapper children on preview is {string}', (text) => {
  appWrapperPreview().should('have.text', text);
});

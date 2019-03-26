import { appWrapperPreview } from "../../locators/appWrapperLocators";

Then('App Wrapper children on preview is {string}', (text) => {
  appWrapperPreview().should('have.text', text)
})

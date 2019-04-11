import { className, contentPreview } from '../../locators/createLocators';

When('I set className to {string}', (title) => {
  className().clear().type(title);
});

Then('create children on preview is {string}', (children) => {
  contentPreview().should('have.text', children);
});

Then('create className on preview is {string}', (classNameParameter) => {
  className().should('have.text', classNameParameter);
});

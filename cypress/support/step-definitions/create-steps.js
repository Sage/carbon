import { className, contentPreview, link } from '../../locators/create';

const LINK_CLASS_NAME = 'carbon-create ';

When('I set className to {string}', (title) => {
  className().clear().type(title);
});

Then('create children on preview is {string}', (children) => {
  contentPreview().should('have.text', children);
});

Then('create className on preview is {string}', (classNameParameter) => {
  link().should('have.class', `${LINK_CLASS_NAME}${classNameParameter}`);
});

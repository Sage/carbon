import { contentPreview } from '../../locators/create';
import { link } from '../../locators';

Then('create children on preview is {string}', (children) => {
  contentPreview().should('have.text', children);
});

Then('create className on preview is {string}', (classNameParameter) => {
  link().should('have.class', `${classNameParameter}`);
});

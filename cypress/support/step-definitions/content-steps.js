import { contentBody, contentTitle, contentPreview } from '../../locators/content';

Then('content children on preview is {word}', (children) => {
  contentBody().should('have.text', children);
});

Then('content title context children on preview is {word}', (title) => {
  contentTitle().should('have.text', title);
});

Then('content preview has no bodyFullWidth parameter', () => {
  contentPreview().should('not.have.class', 'carbon-content--body-full-width');
});

Then('content preview has inline parameter enabled', () => {
  contentTitle().should('have.css', 'display', 'inline-block');
});

Then('content preview width is {string}', (width) => {
  contentTitle().should('have.css', 'width')
    .and('contains', width);
});

import {
  contentBody, contentTitle, contentPreview, titleWidth,
} from '../../locators/content';

const CONTENT_AS_LABEL = 'carbon-content--';
const CONTENT_ALIGN_LABEL = `${CONTENT_AS_LABEL}align-`;
const BODY_FULL_WIDTH_PARAMETR = `${CONTENT_AS_LABEL}body-full-width`;
const INLINE = `${CONTENT_AS_LABEL}inline`;

Then('content children on preview is {string}', (children) => {
  contentBody().should('have.text', children);
});

Then('content title context children on preview is {string}', (title) => {
  contentTitle().should('have.text', title);
});

Then('content as property is set to {string}', (sourseButton) => {
  contentPreview().should('have.class', CONTENT_AS_LABEL + sourseButton);
});

Then('content align property is set to {string}', (as) => {
  contentPreview().should('have.class', CONTENT_ALIGN_LABEL + as);
});

Then('content preview has bodyFullWidth parameter enabled', () => {
  contentPreview().should('have.class', BODY_FULL_WIDTH_PARAMETR);
});

Then('content preview has no bodyFullWidth parameter', () => {
  contentPreview().should('not.have.class', BODY_FULL_WIDTH_PARAMETR);
});

Then('content preview has inline parameter enabled', () => {
  contentPreview().should('have.class', INLINE);
});

Then('content preview has no inline parameter', () => {
  contentPreview().should('not.have.class', INLINE);
});

Then('content preview width is {string}', (width) => {
  contentTitle().should('have.attr', 'style').should('contain', `width: calc(${width}% - 30px);`);
});

When('I set titleWidth parameter to {string}', (width) => {
  titleWidth().clear().type(width);
});

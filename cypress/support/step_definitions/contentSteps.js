import {
 contentBody, contentTitle, inlineCheckbox, bodyFullWidthCheckbox, contentPreview, titleWidth,
} from '../../locators/contentLocators';

// import { visitComponentUrl } from '../helper.js';

// visitComponentUrl();

const CONTENT_AS_LABEL = 'carbon-content--';
const CONTENT_ALIGN_LABEL = `${CONTENT_AS_LABEL}align-`;
const BODY_FULL_WIDTH_PARAMETR = `${CONTENT_AS_LABEL}body-full-width`;
const INLINE = `${CONTENT_AS_LABEL}inline`;


Then('Content children on preview is {string}', (children) => {
  contentBody().should('have.text', children);
});

Then('Content title context children on preview is {string}', (title) => {
  contentTitle().should('have.text', title);
});

Then('Content as property is set to {string}', (sourseButton) => {
  contentPreview().should('have.class', CONTENT_AS_LABEL + sourseButton);
});

Then('Content align property is set to {string}', (as) => {
  contentPreview().should('have.class', CONTENT_ALIGN_LABEL + as);
});

When('I check inline checkbox', () => {
  inlineCheckbox().check();
});

When('I uncheck inline checkbox', () => {
  inlineCheckbox().uncheck({ force: true });
});

When('I check bodyFullWidth checkbox', () => {
  bodyFullWidthCheckbox().check();
});

When('I uncheck bodyFullWidth checkbox', () => {
  bodyFullWidthCheckbox().uncheck({ force: true });
});

Then('Content preview has bodyFullWidth parameter enabled', () => {
  contentPreview().should('have.class', BODY_FULL_WIDTH_PARAMETR);
});

Then('Content preview has no bodyFullWidth parameter', () => {
  contentPreview().should('not.have.class', BODY_FULL_WIDTH_PARAMETR);
});

Then('Content preview has inline parameter enabled', () => {
  contentPreview().should('have.class', INLINE);
});

Then('Content preview has no inline parameter', () => {
  contentPreview().should('not.have.class', INLINE);
});

Then('Content preview height is {string}', (height) => {
  contentTitle().should('have.attr', 'style').should('contain', `width: calc(${height}% - 30px);`);
});

When('I set titleWidth parameter to {string}', (width) => {
  titleWidth().clear().type(width);
});

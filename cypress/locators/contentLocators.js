// knobs locators
const INLINE = '#inline';
const BODY_FULL_WIDTH = '#bodyFullWidth';
const TITLE_WIDTH = '#titleWidth';
export const inlineCheckbox = () => cy.get(INLINE);
export const bodyFullWidthCheckbox = () => cy.get(BODY_FULL_WIDTH);
export const titleWidth = () => cy.get(TITLE_WIDTH);


// component preview locators
const CONTENT_PREVIEW = '.carbon-content';
const CONTENT_TITLE = '.carbon-content__title';
const CONTENT_BODY = '.carbon-content__body';
export const contentPreview = () => cy.iFrame(CONTENT_PREVIEW);
export const contentTitle = () => cy.iFrame(CONTENT_TITLE);
export const contentBody = () => cy.iFrame(CONTENT_BODY);

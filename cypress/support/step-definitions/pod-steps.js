import {
  podPreview, podPreviewBorder, podChildren,
  podTitle, podSubTitle, podDescription, podFooter, podEdit,
} from '../../locators/pod';

const POD_BLOCK_PROPERTY = 'carbon-pod__block';
const POD_DIV_PROPERTY = 'carbon-pod';
const PADDING = '--padding-';
const CONTENT = '__content';
const HEADER = '__header';

Then('Pod children on preview is set to {string}', (text) => {
  podChildren().should('have.text', text);
});

Then('Pod title on preview is set to {string}', (text) => {
  podTitle().should('have.text', text);
});

Then('Pod subtitle on preview is set to {string}', (text) => {
  podSubTitle().should('have.text', text);
});

Then('Pod description on preview is set to {string}', (text) => {
  podDescription().should('have.text', text);
});

Then('Pod footer on preview is set to {string}', (text) => {
  podFooter().should('have.text', text);
  podPreview().children()
    .should('have.class', `${POD_BLOCK_PROPERTY}--footer`);
});

Then('Pod padding on preview is {string}', (paddingProperty) => {
  podPreview().children()
    .should('have.class', `${POD_BLOCK_PROPERTY}${PADDING}${paddingProperty}`);
  podPreview().children().children()
    .should('have.class', `${POD_DIV_PROPERTY}${CONTENT}${PADDING}${paddingProperty}`);
});

Then('Pod as on preview is {string}', (asProperty) => {
  podPreview().children()
    .should('have.class', `${POD_BLOCK_PROPERTY}--${asProperty}`);
  podPreview().children().children()
    .should('have.class', `${POD_DIV_PROPERTY}${CONTENT}--${asProperty}`);
});

Then('Pod component has border', () => {
  podPreviewBorder()
    .should('not.have.class', `${POD_BLOCK_PROPERTY}--no-border`);
  podPreviewBorder().children()
    .should('not.have.class', `${POD_DIV_PROPERTY}--no-border`);
});

Then('Pod component has no border', () => {
  cy.wait(500);
  podPreviewBorder()
    .should('have.class', `${POD_BLOCK_PROPERTY}--no-border`);
  podPreviewBorder().children()
    .should('have.class', `${POD_DIV_PROPERTY}--no-border`);
});

Then('Pod alignTitle on preview is {string}', (alignTitle) => {
  podPreview()
    .should('have.class', `${POD_DIV_PROPERTY}--${alignTitle}`);
  podTitle().parent()
    .should('have.class', `${POD_DIV_PROPERTY}${HEADER}--${alignTitle}`);
  podTitle().parent($element => expect($element).to.have.css('text-align', `${alignTitle}`));
});

Then('Pod component has onEdit property', () => {
  podPreview()
    .should('have.class', `${POD_DIV_PROPERTY}--editable`);
  podEdit()
    .should('be.visible');
});

Then('Pod component has no onEdit property', () => {
  podPreview()
    .should('not.have.class', `${POD_DIV_PROPERTY}--editable`);
  podEdit()
    .should('not.exist');
});

Then('I click onEdit icon', () => {
  podEdit().click();
});

Then('Pod component has editContentFullWidth property', () => {
  podPreview().children()
    .should('have.class', `${POD_BLOCK_PROPERTY}--full-width`);
  podPreview().children()
    .should('have.css', 'max-width', 'calc(-51px + 100%)');
});

Then('Pod component has displayEditButtonOnHover property', () => {
  podPreview()
    .should('have.class', `${POD_DIV_PROPERTY}--content-triggers-edit`)
    .should('have.class', `${POD_DIV_PROPERTY}--is-hovered`);
  podEdit().should('be.visible');
});

Then('Pod component has triggerEditOnContent property', () => {
  podPreview()
    .should('have.class', `${POD_DIV_PROPERTY}--content-triggers-edit`);
  podEdit().should('be.visible');
});

Then('Pod component has internalEditButton property', () => {
  podPreview()
    .should('have.class', `${POD_DIV_PROPERTY}--internal-edit-button`);
  podEdit().should('be.visible');
});

When('I hover mouse onto Pod content', () => {
  podTitle().trigger('mouseover');
});

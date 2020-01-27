import {
  showEditPodEdit, showEditPodCancelButton, showEditPodSaveButton, showEditPodDeleteButton,
  showEditPodTitle, showEditPodPreview, showEditPodSecondaryBlock,
  showEditPodCollapsibleInnerContent, showEditPodFooter,
} from '../../locators/show-edit-pod';
import { icon } from '../../locators';

const SHOW_EDIT_POD_BLOCK_CONTENT = 'carbon-pod__block--';
const SHOW_EDIT_POD_CONTENT = 'carbon-pod__content--';
const SHOW_EDIT_POD_NO_BORDER_CONTENT = 'carbon-pod--no-border';
const FIRST_DIV = 1;
const SECOND_DIV = 2;
const THIRD_DIV = 3;
const INNER_CONTENT_TITLE = 'title';
const INNER_CONTENT_BODY = 'body';

Then('Show Edit Pod saveText on preview is set to {string}', (text) => {
  showEditPodSaveButton().should('have.text', text);
});

Then('Show Edit Pod cancelText on preview is set to {string}', (text) => {
  showEditPodCancelButton().should('have.text', text);
});

Then('Show Edit Pod deleteText on preview is set to {string}', (text) => {
  showEditPodDeleteButton().should('have.text', text);
});

Then('Show Edit Pod title on preview is set to {string}', (text) => {
  showEditPodTitle().should('have.text', text);
});

When('I click edit Show Edit Pod component', () => {
  showEditPodEdit().first().click();
});

When('Edit icon has color {string}', (color) => {
  icon().should('have.css', 'color', color);
});

Then('Show Edit Pod component has border property', () => {
  showEditPodPreview()
    .should('not.have.class', `${SHOW_EDIT_POD_BLOCK_CONTENT}no-border`)
    .and('have.css', 'border', '1px solid rgb(204, 214, 219)');
  showEditPodPreview().children()
    .should('not.have.class', SHOW_EDIT_POD_NO_BORDER_CONTENT);
});

Then('Show Edit Pod component has no border property', () => {
  showEditPodPreview()
    .should('have.class', `${SHOW_EDIT_POD_BLOCK_CONTENT}no-border`)
    .and('have.css', 'border', '0px none rgba(0, 0, 0, 0.85)');
  showEditPodPreview().children()
    .should('have.class', SHOW_EDIT_POD_NO_BORDER_CONTENT);
});

Then('Show Edit Pod component on a secondary block has border property', () => {
  showEditPodSecondaryBlock().should('have.css', 'border', '1px solid rgb(204, 214, 219)');
});

Then('Show Edit Pod component on a secondary block has no border property', () => {
  showEditPodSecondaryBlock().should('have.css', 'border', '0px none rgba(0, 0, 0, 0.85)');
});

Then('Show Edit Pod component cancel button has color {string} and borderColor {string}', (color, borderColor) => {
  showEditPodCancelButton()
    .should('be.visible')
    .and('have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border-color', borderColor)
    .and('have.css', 'color', color);
});

Then('Show Edit Pod component hasn\'t a cancel button', () => {
  showEditPodCancelButton().should('not.exist');
});

Then('Show Edit Pod classic component has saving property', () => {
  showEditPodSaveButton().should('be.disabled');
  showEditPodSaveButton().should('have.attr', 'disabled');
  showEditPodSaveButton()
    .should('have.css', 'background', 'rgb(230, 235, 237) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border', '1px solid rgba(0, 0, 0, 0)')
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.2)');
});

Then('Show Edit Pod component has saving property', () => {
  showEditPodSaveButton().should('be.disabled');
  showEditPodSaveButton().should('have.attr', 'disabled');
  showEditPodSaveButton()
    .should('have.css', 'background', 'rgb(229, 234, 236) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border', '2px solid rgba(0, 0, 0, 0)')
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.3)');
});

Then('Show Edit Pod component has no saving property', () => {
  showEditPodSaveButton().should('not.have.attr', 'disabled');
});

Then('Show Edit Pod as value is set to {string}', (property) => {
  showEditPodPreview()
    .should('have.class', `${SHOW_EDIT_POD_BLOCK_CONTENT}${property}`);
  showEditPodPreview().children()
    .should('have.class', `${SHOW_EDIT_POD_CONTENT}${property}`);
});

Then('Show Edit Pod buttons are aligned to {string}', (position) => {
  if (position === 'left') {
    showEditPodFooter().first().should('have.text', 'Save');
  } else {
    showEditPodFooter().first().should('have.text', 'Cancel');
  }
});

When('I click delete button', () => {
  showEditPodDeleteButton().click();
});

When('I click cancel button', () => {
  showEditPodCancelButton().click();
});

Then('Show Edit Pod component has proper content inside itself', () => {
  showEditPodTitle()
    .should('have.text', 'Person');
  showEditPodCollapsibleInnerContent(FIRST_DIV, INNER_CONTENT_TITLE)
    .should('have.text', 'First Name');
  showEditPodCollapsibleInnerContent(FIRST_DIV, INNER_CONTENT_BODY)
    .should('have.text', 'Alan');
  showEditPodCollapsibleInnerContent(SECOND_DIV, INNER_CONTENT_TITLE)
    .should('have.text', 'Last Name');
  showEditPodCollapsibleInnerContent(SECOND_DIV, INNER_CONTENT_BODY)
    .should('have.text', 'Smith');
  showEditPodCollapsibleInnerContent(THIRD_DIV, INNER_CONTENT_TITLE)
    .should('have.text', 'Telephone');
  showEditPodCollapsibleInnerContent(THIRD_DIV, INNER_CONTENT_BODY)
    .should('have.text', '000 000 0000');
});

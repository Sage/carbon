import {
  showEditPodEdit, showEditPodCancelButton, showEditPodSaveButton, showEditPodDeleteButton,
  showEditPodTitle, showEditPodSecondaryBlock,
  showEditPodCollapsibleInnerContent, showEditPodFooter, showEditPodComponent,
} from '../../locators/show-edit-pod';
import { icon } from '../../locators';

const FIRST_DIV = 0;
const SECOND_DIV = 1;
const THIRD_DIV = 2;
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

Then('Show Edit Pod component has border {string} color', (color) => {
  showEditPodComponent().find('div').eq(FIRST_DIV).should('have.css', 'border-bottom-color', color);
  showEditPodComponent().find('div').eq(FIRST_DIV).should('have.css', 'border-left-color', color);
  showEditPodComponent().find('div').eq(FIRST_DIV).should('have.css', 'border-right-color', color);
  showEditPodComponent().find('div').eq(FIRST_DIV).should('have.css', 'border-top-color', color);
});

Then('Show Edit Pod component on a secondary block has border property', () => {
  showEditPodSecondaryBlock().should('have.css', 'border', '1px solid rgb(204, 214, 219)');
});

Then('Show Edit Pod component on a secondary block has no border property', () => {
  showEditPodSecondaryBlock().should('have.css', 'border', '0px none rgba(0, 0, 0, 0.85)');
});

Then('Show Edit Pod component cancel button has color {string} and borderColor {string}', (color, borderColor) => {
  showEditPodCancelButton().should('be.visible')
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
  showEditPodSaveButton().should('have.css', 'background', 'rgb(230, 235, 237) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border', '1px solid rgba(0, 0, 0, 0)')
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.2)');
});

Then('Show Edit Pod component has saving property', () => {
  showEditPodSaveButton().should('be.disabled');
  showEditPodSaveButton().should('have.attr', 'disabled');
  showEditPodSaveButton().should('have.css', 'background', 'rgb(229, 234, 236) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border', '2px solid rgba(0, 0, 0, 0)')
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.3)');
});

Then('Show Edit Pod component has no saving property', () => {
  showEditPodSaveButton().should('not.have.attr', 'disabled');
});

Then('Show Edit Pod background-color is set to {string}', (color) => {
  showEditPodComponent().find('div').eq(FIRST_DIV).should('have.css', 'background-color', color);
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
  showEditPodTitle().should('have.text', 'Person');
  showEditPodCollapsibleInnerContent(INNER_CONTENT_TITLE, FIRST_DIV).should('have.text', 'First Name');
  showEditPodCollapsibleInnerContent(INNER_CONTENT_BODY, FIRST_DIV).should('have.text', 'Alan');
  showEditPodCollapsibleInnerContent(INNER_CONTENT_TITLE, SECOND_DIV).should('have.text', 'Last Name');
  showEditPodCollapsibleInnerContent(INNER_CONTENT_BODY, SECOND_DIV).should('have.text', 'Smith');
  showEditPodCollapsibleInnerContent(INNER_CONTENT_TITLE, THIRD_DIV).should('have.text', 'Telephone');
  showEditPodCollapsibleInnerContent(INNER_CONTENT_BODY, THIRD_DIV).should('have.text', '000 000 0000');
});

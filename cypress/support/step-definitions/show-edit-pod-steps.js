import {
  showEditPodEdit, showEditPodCancelButton, showEditPodSaveButton, showEditPodDeleteButton,
  showEditPodTitle, showEditPodPreview, showEditPodSecondaryBlock, showEditPodSecondaryWrapper,
  showEditPodCollapsibleInnerContent,
} from '../../locators/show-edit-pod';

const SHOW_EDIT_POD_BLOCK_CONTENT = 'carbon-pod__block--';
const SHOW_EDIT_POD_CONTENT = 'carbon-pod__content--';
const SHOW_EDIT_POD_NO_BORDER_CONTENT = 'carbon-pod--no-border';
const SHOW_EDIT_POD_WRAPPER = 'carbon-form__buttons--';
const FIRST_DIV = 1;
const SECOND_DIV = 2;
const THIRD_DIV = 3;
const INNER_CONTENT_TITLE = 'title';
const INNER_CONTENT_BODY = 'body';


Then('Show Edit Pod {word} on preview is set to {string}', (parameter, text) => {
  switch (parameter) {
    case 'saveText':
      showEditPodSaveButton().should('have.text', text);
      break;
    case 'cancelText':
      showEditPodCancelButton().should('have.text', text);
      break;
    case 'deleteText':
      showEditPodDeleteButton().should('have.text', text);
      break;
    case 'title':
      showEditPodTitle().should('have.text', text);
      break;
    default:
      throw new Error('Not a Show Edit Pod component property');
  }
});

When('I click onto edit button', () => {
  showEditPodEdit().click();
});

Then('Show Edit Pod component has border property', () => {
  showEditPodPreview().children()
    .should('not.have.class', `${SHOW_EDIT_POD_BLOCK_CONTENT}no-border`)
    .and('have.css', 'border', '1px solid rgb(204, 214, 219)');
  showEditPodPreview().children().children()
    .should('not.have.class', SHOW_EDIT_POD_NO_BORDER_CONTENT);
});

Then('Show Edit Pod component has no border property', () => {
  showEditPodPreview().children()
    .should('have.class', `${SHOW_EDIT_POD_BLOCK_CONTENT}no-border`)
    .and('have.css', 'border', '0px none rgba(0, 0, 0, 0.85)');
  showEditPodPreview().children().children()
    .should('have.class', SHOW_EDIT_POD_NO_BORDER_CONTENT);
});

Then('Show Edit Pod component on a secondary block has border property', () => {
  showEditPodSecondaryBlock()
    .should('have.css', 'border', '1px solid rgb(204, 214, 219)');
});

Then('Show Edit Pod component on a secondary block has no border property', () => {
  showEditPodSecondaryBlock()
    .should('have.css', 'border', '0px none rgba(0, 0, 0, 0.85)');
});

Then('Show Edit Pod component has a cancel button', () => {
  showEditPodCancelButton()
    .should('be.visible')
    .and('have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border-color', 'rgb(37, 91, 199)')
    .and('have.css', 'color', 'rgb(37, 91, 199)');
});

Then('Show Edit Pod component hasn\'t a cancel button', () => {
  showEditPodCancelButton().should('not.exist');
});

Then('Show Edit Pod component has saving property', () => {
  showEditPodSaveButton()
    .should('be.disabled');
  showEditPodSaveButton()
    .should('have.attr', 'disabled');
  showEditPodSaveButton()
    .should('have.css', 'background', 'rgb(230, 235, 237) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border', '1px solid rgba(0, 0, 0, 0)')
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.2)');
});

Then('Show Edit Pod component has no saving property and should be saved manualy', () => {
  showEditPodSaveButton()
    .should('not.have.attr', 'disabled');
  showEditPodSaveButton()
    .should('have.css', 'background', 'rgb(37, 91, 199) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border-color', 'rgba(0, 0, 0, 0)');
});

Then('Show Edit Pod {word} value is set to {string}', (word, property) => {
  switch (word) {
    case 'as':
      showEditPodPreview().children()
        .should('have.class', `${SHOW_EDIT_POD_BLOCK_CONTENT}${property}`);
      showEditPodPreview().children().children()
        .should('have.class', `${SHOW_EDIT_POD_CONTENT}${property}`);
      break;
    case 'buttonAlign':
      showEditPodSecondaryWrapper()
        .should('have.class', `${SHOW_EDIT_POD_WRAPPER}${property}`);
      break;
    default:
      throw new Error('Not a Show Edit Pod component selectable property');
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

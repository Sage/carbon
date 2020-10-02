import {
  showEditPodEdit, showEditPodCancelButton, showEditPodSaveButton, showEditPodDeleteButton,
  showEditPodTitle, showEditPodFooter, showEditPodComponent,
  showEditPodEditIFrame, showEditPodCancelButtonIFrame, showEditPodDeleteButtonIFrame,
} from '../../locators/show-edit-pod';
import { positionOfElement } from '../helper';

Then('Show Edit Pod saveText on preview is set to {word}', (text) => {
  showEditPodSaveButton().should('have.text', text);
});

Then('Show Edit Pod cancelText on preview is set to {word}', (text) => {
  showEditPodCancelButton().should('have.text', text);
});

Then('Show Edit Pod deleteText on preview is set to {word}', (text) => {
  showEditPodDeleteButton().should('have.text', text);
});

Then('Show Edit Pod title on preview is set to {word}', (text) => {
  showEditPodTitle().should('have.text', text);
});

When('I click edit Show Edit Pod component', () => {
  showEditPodEdit().first().click();
});

When('I click edit Show Edit Pod component in Iframe', () => {
  showEditPodEditIFrame().first().click();
});

Then('Show Edit Pod component has border {string} color', (color) => {
  showEditPodComponent().find('div').eq(positionOfElement('first')).should('have.css', 'border-bottom-color', color)
    .and('have.css', 'border-left-color', color)
    .and('have.css', 'border-right-color', color)
    .and('have.css', 'border-top-color', color);
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

Then('Show Edit Pod component has saving property', () => {
  showEditPodSaveButton().should('be.disabled')
    .and('have.css', 'background', 'rgb(230, 235, 237) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border', '2px solid rgba(0, 0, 0, 0)')
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.3)')
    .and('have.attr', 'disabled');
});

Then('Show Edit Pod component has no saving property', () => {
  showEditPodSaveButton().should('not.have.attr', 'disabled');
});

Then('Show Edit Pod background-color is set to {string}', (color) => {
  showEditPodComponent().find('div').eq(positionOfElement('first')).should('have.css', 'background-color', color);
});

Then('Show Edit Pod buttons are aligned to {string}', (position) => {
  if (position === 'left') {
    showEditPodFooter().parent().should('not.have.css', '-webkit-box-pack', 'end');
  } else if (position === 'right') {
    showEditPodFooter().parent().should('have.css', '-webkit-box-pack', 'end');
  }
});

When('I click delete button', () => {
  showEditPodDeleteButtonIFrame().click();
});

When('I click cancel button', () => {
  showEditPodCancelButtonIFrame().click();
});

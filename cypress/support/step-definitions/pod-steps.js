import {
  podPreview, podContent,
  podSubTitle, podDescription, podFooter, 
  podEditIframe,
} from '../../locators/pod';
import { getDataElementByValue } from '../../locators';

Then('Pod children on preview is set to {word}', (text) => {
  podContent().should('have.text', text);
});

Then('Pod title on preview is set to {word}', (text) => {
  getDataElementByValue('title').should('have.text', text);
});

Then('Pod subtitle on preview is set to {word}', (text) => {
  podSubTitle().should('have.text', text);
});

Then('Pod description on preview is set to {word}', (text) => {
  podDescription().should('have.text', text);
});

Then('Pod footer on preview is set to {word}', (text) => {
  podFooter().should('have.text', text);
});

Then('I click onEdit icon in Iframe', () => {
  podEditIframe().first().click();
});

Then('Pod component has triggerEditOnContent property', () => {
  podPreview().should('have.css', 'cursor', 'pointer');
});

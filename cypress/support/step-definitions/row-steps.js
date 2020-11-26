import { column } from '../../locators/row';

Then('column text is {word}', (text) => {
  column().first().should('have.text', text);
});

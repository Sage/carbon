import { legendInput, legendPreview } from '../../locators/legend';

When('I set legend to {string}', (legend) => {
  legendInput().clear().type(legend);
});

When('I set legend to empty', () => {
  legendInput().clear();
});

Then('legend on preview is {string}', (legend) => {
  legendPreview().should('have.text', legend);
});

Then('legend on preview not exists', () => {
  legendPreview().should('not.exist');
});

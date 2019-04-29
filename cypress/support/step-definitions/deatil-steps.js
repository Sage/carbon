import {
  childrenPreview, footnotePreview, footnoteInput, iconSelect, iconPreview,
} from '../../locators/detail';

Then('detail children on preview is {string}', (children) => {
  childrenPreview().should('have.text', children);
});

When('I set footnote to {string}', (footnote) => {
  footnoteInput().clear().type(footnote);
});

Then('detail footnote on preview is {string}', (footnote) => {
  footnotePreview().should('have.text', footnote);
});

When('I set detail icon to {string}', (iconName) => {
  iconSelect().select(iconName);
});

Then('icon not exists on preview', () => {
  iconPreview().should('not.exist');
});

Then('icon on preview is {string}', (iconName) => {
  iconPreview().should('have.attr', 'data-element', iconName);
});

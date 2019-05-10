import { childrenPreview, footnotePreview, iconSelect } from '../../locators/detail';
import { icon } from '../../locators';

Then('detail children on preview is {string}', (children) => {
  childrenPreview().should('have.text', children);
});

Then('detail footnote on preview is {string}', (footnote) => {
  footnotePreview().should('have.text', footnote);
});

When('I set detail icon to {string}', (iconName) => {
  iconSelect().select(iconName);
});

Then('icon not exists on preview', () => {
  icon().should('not.exist');
});

Then('icon on preview is {string}', (iconName) => {
  icon().should('have.attr', 'data-element', iconName);
});

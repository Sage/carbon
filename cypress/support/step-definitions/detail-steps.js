import {
  childrenPreview,
  footnotePreview,
} from '../../locators/detail';
import {
  icon,
} from '../../locators';

Then('detail children on preview is {word}', (children) => {
  childrenPreview().should('have.text', children);
});

Then('detail footnote on preview is {word}', (footnote) => {
  footnotePreview().should('have.text', footnote);
});

Then('icon on preview is {string}', (iconName) => {
  icon().should('have.attr', 'data-element', iconName)
    .and('be.visible');
});

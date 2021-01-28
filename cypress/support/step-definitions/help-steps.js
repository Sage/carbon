import { helpHref } from '../../locators/help';

Then('Help href on preview is set to {word}', (href) => {
  helpHref().should('have.attr', 'href', href);
});

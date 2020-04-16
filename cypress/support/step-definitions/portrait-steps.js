import { portraitPreview, portraitInitials, portraitUserImage } from '../../locators/portrait';

const INITIALS_FOLDER = 'initials/';
const DATA_IMAGE_PREFIX = 'data:image/png;base64,';

Then('Portrait alt on preview is set to {string}', (text) => {
  portraitPreview().should('have.attr', 'alt', `${text}`);
  portraitInitials().children().should('have.attr', 'alt', `${text}`);
});

Then('Portrait source is set to {string}', (sourceProperty) => {
  if (sourceProperty === 'src') {
    portraitUserImage().should('not.have.attr', 'src');
  } else {
    portraitUserImage().should('have.attr', 'src', `${sourceProperty}`);
  }
});

Then('Portrait size has {string}', (property) => {
  portraitPreview().should('have.css', 'width', `${property}px`)
    .and('have.css', 'height', `${property}px`);
});

Then('Portrait {word} value is set to {string}', (word, property) => {
  switch (word) {
    case 'src':
      portraitUserImage().should('have.attr', 'src', `${property}`);
      portraitInitials().should('not.exist');
      break;
    case 'gravatar':
      portraitInitials().should('be.visible');
      portraitUserImage().should('have.attr', 'src', `${property}`);
      break;
    case 'initials':
      portraitInitials().find('img').should('be.visible');
      cy.fixture(`${INITIALS_FOLDER}${property}.jpg`, 'base64').then(($property) => {
        portraitInitials().find('img').should('have.attr', 'src', `${DATA_IMAGE_PREFIX}${$property}`);
      });
      break;
    case 'shape':
      portraitPreview().should('have.attr', 'shape', `${property}`);
      break;
    default:
      throw new Error('Not a Portrait component property');
  }
});

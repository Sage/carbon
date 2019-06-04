import { portraitPreview, portraitInitials, portraitUserImage } from '../../locators/portrait';

const PORTRAIT_CLASS = 'carbon-portrait--';
const DARK_BACKGROUND = 'dark-background';

Then('Portrait alt on preview is set to {string}', (text) => {
  portraitInitials()
    .should('have.attr', 'alt', `${text}`);
  portraitUserImage()
    .should('have.attr', 'alt', `${text}`);
});

Then('Portrait component has darkBackground property', () => {
  portraitPreview()
    .should('have.class', `${PORTRAIT_CLASS}${DARK_BACKGROUND}`);
});

Then('Portrait component has no darkBackground property', () => {
  portraitPreview()
    .should('not.have.class', `${PORTRAIT_CLASS}${DARK_BACKGROUND}`);
});

Then('Portrait source is set to {string}', (sourceProperty) => {
  if (sourceProperty === 'src') {
    portraitUserImage()
      .should('not.have.attr', 'src');
  } else {
    portraitUserImage()
      .should('have.attr', 'src', `${sourceProperty}`);
  }
});

Then('Portrait {word} value is set to {string}', (word, property) => {
  switch (word) {
    case 'src':
      portraitUserImage()
        .should('have.attr', 'src', `${property}`);
      portraitInitials()
        .should('not.exist');
      break;
    case 'gravatar':
      portraitInitials()
        .should('be.visible');
      portraitUserImage()
        .should('have.attr', 'src', `${property}`);
      break;
    case 'initials':
      portraitInitials()
        .should('be.visible');
      portraitInitials()
        .should('have.attr', 'src', `${property}`);
      portraitUserImage()
        .should('not.have.attr', 'src');
      break;
    case 'shape':
      portraitPreview()
        .should('have.class', `${PORTRAIT_CLASS}${property}`);
      break;
    case 'size':
      portraitPreview()
        .should('have.class', `${PORTRAIT_CLASS}${property}`);
      break;
    default:
      throw new Error('Not a Portrait component property');
  }
});

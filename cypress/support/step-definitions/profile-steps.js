import {
  emailPreview, avatarPreview, initialsPreview, profile, namePreview,
} from '../../locators/profile';

const INITIALS_FOLDER = 'initials/';
const PROFILE_LARGE = 'carbon-profile--large';
const DATA_IMAGE_PREFIX = 'data:image/png;base64,';

Then('email is set to {word}', (email) => {
  emailPreview().should('have.text', email);
});

Then('avatar is taken from {string}', (avatarUrl) => {
  avatarPreview().should('have.attr', 'src', avatarUrl);
});

Then('Profile is set to large', () => {
  profile().should('have.class', PROFILE_LARGE);
});

Then('name is set to {word}', (name) => {
  namePreview().should('have.text', name);
});

Then('Profile size has {int}', (property) => {
  initialsPreview().should('have.css', 'height', `${property}px`);
});

Then('initials is set to {word}', (initials) => {
  initials = initials.substring(0, 3);
  cy.fixture(`${INITIALS_FOLDER}${initials}.jpg`, 'base64').then(($initials) => {
    initialsPreview().children()
      .should('have.attr', 'src', `${DATA_IMAGE_PREFIX}${$initials}`);
  });
});

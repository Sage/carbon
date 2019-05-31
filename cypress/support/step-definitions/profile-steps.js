import {
  emailPreview, avatarPreview, initialsPreview, profile, namePreview,
} from '../../locators/profile';

const INITIALS_FOLDER = 'initials/';
const PROFILE_LARGE = 'carbon-profile--large';
const DATA_IMAGE_PREFIX = 'data:image/png;base64,';

Then('email is set to {string}', (email) => {
  emailPreview().should('have.text', email);
});

Then('avatar is taken from {string}', (avatarUrl) => {
  avatarPreview().should('have.attr', 'src', avatarUrl);
});

Then('initials is set to {string}', (initials) => {
  // eslint-disable-next-line no-param-reassign
  initials = initials.substring(0, 3);
  cy.fixture(`${INITIALS_FOLDER}${initials}`).then(($initials) => {
    initialsPreview().should('have.attr', 'src', `${DATA_IMAGE_PREFIX}${$initials}`);
  });
});

Then('Profile is set to large', () => {
  profile().should('have.class', PROFILE_LARGE);
});

Then('name is set to {string}', (name) => {
  namePreview().should('have.text', name);
});

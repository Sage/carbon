import {
  emailPreview, avatarPreview, initialsPreview, profile, namePreview,
} from '../../locators/profile';

const PROFILE_LARGE = 'carbon-profile--large';
Then('email is set to {string}', (email) => {
  emailPreview().should('have.text', email);
});

Then('avatar is taken from {string}', (avatarUrl) => {
  avatarPreview().should('have.attr', 'src', avatarUrl);
});

Then('initials is set to {string}', (src) => {
  initialsPreview().should('have.attr', 'src', src);
});

Then('profile is set to large', () => {
  profile().should('have.class', PROFILE_LARGE);
});

Then('name is set to {string}', (name) => {
  namePreview().should('have.text', name);
});

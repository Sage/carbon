import {
  settingsRowTitle, settingsRowChildren, settingsRowDescription,
  settingsRowPreview,
} from '../../locators/settings-row';

const DIVIDER_CLASS = 'carbon-settings-row--has-divider';

Then('Settings Row title on preview is set to {string}', (text) => {
  settingsRowTitle().should('have.text', `${text}`);
});

Then('Settings Row children on preview is set to {string}', (text) => {
  settingsRowChildren().should('have.text', `${text}`);
});

Then('Settings Row description on preview is set to {string}', (text) => {
  settingsRowDescription().should('have.text', `${text}`);
});

Then('Settings Row component has divider property', () => {
  settingsRowPreview().should('have.class', DIVIDER_CLASS)
    .and('have.css', 'border-bottom', '1px solid rgb(230, 235, 237)')
    .and('have.css', 'padding-bottom', '30px');
});

Then('Settings Row component has no divider property', () => {
  settingsRowPreview().should('not.have.class', DIVIDER_CLASS)
    .and('not.have.css', 'border-bottom', '1px solid rgb(230, 235, 237)')
    .and('not.have.css', 'padding-bottom', '30px');
});

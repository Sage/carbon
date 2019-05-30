import {
  settingsRowTitle, settingsRowChildren, settingsRowDescription,
  settingsRowPreview,
} from '../../locators/settings-row';

const DIVIDER_CLASS = 'carbon-settings-row--has-divider';

Then('Settings Row {word} on preview is set to {string}', (parameter, text) => {
  switch (parameter) {
    case 'title':
      settingsRowTitle()
        .should('have.text', `${text}`);
      break;
    case 'children':
      settingsRowChildren()
        .should('have.text', `${text}`);
      break;
    case 'description':
      settingsRowDescription()
        .should('have.text', `${text}`);
      break;
    default:
      throw new Error('Not a Settings Row component input property');
  }
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

import { visitComponentUrlByTheme } from '../helper';
import { getComponentNoIframe, getElementNoIframe } from '../../locators/build';
import { buttonToggleComponent, linkComponent, loaderComponent } from '../../locators/themes';

const COLOR = 'color';
const BACKGROUND_COLOR = 'background-color';
const BUSINESS_BGTHEME = '&knob-bgTheme=business';

When('I open {string} component with theme {string}', (componentName, themeName) => {
  visitComponentUrlByTheme(componentName, themeName);
});

When('I open Icon component with theme {string}', (themeName) => {
  visitComponentUrlByTheme('icon', themeName, BUSINESS_BGTHEME);
});

Then('{string} component css {string} is set to {string} common', (componentName, css, themeName) => {
  cy.fixture('themes/themes.json').then((json) => {
    getComponentNoIframe(componentName).should('have.css', css, json.common[themeName]);
  });
});

Then('{string} component css {string} is set to {string}', (componentName, css, themeName) => {
  cy.fixture('themes/themes.json').then((json) => {
    getComponentNoIframe(componentName).should('have.css', css, json[componentName][themeName]);
  });
});

Then('Button Toggle component css background color is set to {string}', (themeName) => {
  cy.fixture('themes/themes.json').then((json) => {
    buttonToggleComponent().should('have.css', BACKGROUND_COLOR, json['button-toggle'][themeName]);
  });
});

Then('{string} element css {string} is set to {string} common', (componentName, css, themeName) => {
  cy.fixture('themes/themes.json').then((json) => {
    getElementNoIframe(componentName).should('have.css', css, json.common[themeName]);
  });
});

When('I click {string} component', (componentName) => {
  getComponentNoIframe(componentName).first().click();
});

Then('Link component css color is set to {string}', (themeName) => {
  cy.fixture('themes/themes.json').then((json) => {
    linkComponent().children().should('have.css', COLOR, json.common[themeName]);
  });
});

Then('Loader component css background color is set to {string}', (themeName) => {
  cy.fixture('themes/themes.json').then((json) => {
    loaderComponent().should('have.css', BACKGROUND_COLOR, json.common[themeName]);
  });
});

import {
  searchInput, searchIcon, searchInputNoiFrame,
  searchDefaultInputDS, searchCrossIconDS, searchButtonDS, 
  searchWitchButtonInputDS, searchDefaultInnerIconDS, searchInnerIconDS,
} from '../../locators/search';

Then('Search component placeholder is set to {word}', (placeholder) => {
  searchInputNoiFrame().should('have.attr', 'placeholder', placeholder);
});

When('I clear default search input', () => {
  searchDefaultInputDS().clear();
});

When('Type {string} text into default search input', (text) => {
  searchDefaultInputDS().clear().type(text);
});

When('Type {string} text into search with button input', (text) => {
  searchWitchButtonInputDS().clear().type(text);
});

When('Type {string} text into search input', (text) => {
  searchInput().clear().type(text);
});

Then('Search component has input and {string} as icon', (iconType) => {
  searchDefaultInputDS().should('have.attr', 'data-element', 'input').and('be.visible');
  searchDefaultInnerIconDS().should('have.attr', 'data-element', iconType)
    .and('be.visible');
});

Then('I click on cross icon', () => {
  searchCrossIconDS().click();
});

When('search input is empty', () => {
  searchDefaultInputDS().should('be.empty');
});

Then('Search component input has golden border', () => {
  searchInput().parent().should('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});

When('I click on search icon', () => {
  searchButtonDS().click({ force: true });
});

When('I click onto search icon', () => {
  searchIcon().click({ force: true });
});

When('I click inside input', () => {
  searchInput().click();
});

Then('search icon has golden border', () => {
  searchButtonDS().should('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});

Then('search icon has proper inner color', () => {
  const mintColor = 'rgb(0, 129, 93)';
  searchIcon().should('have.css', 'background-color', mintColor)
    .and('have.css', 'border-color', mintColor);
});

Then('search icon as button is visible', () => {
  searchButtonDS().should('exist').and('be.visible');
});

Then('search icon as button is not visible', () => {
  searchInnerIconDS().should('not.exist');
});

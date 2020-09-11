import {
  singleTileSelectInput, tileSelectDataComponent, deselectButton,
} from '../../locators/tileSelect';

When('I click on single tile component', () => {
  singleTileSelectInput().click();
});

When('I click deselect button', () => {
  deselectButton().click();
});

Then('Single tile is checked', () => {
  singleTileSelectInput().should('have.attr', 'aria-checked', 'true');
});

Then('Single tile is not check', () => {
  singleTileSelectInput().should('have.attr', 'aria-checked', 'false');
});

Then('Single tile has golden focus', () => {
  tileSelectDataComponent().find('div').should('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});

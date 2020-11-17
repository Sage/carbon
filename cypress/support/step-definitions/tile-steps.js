import { tile } from '../../locators/tile';

Then('Tile component as property is set to {string}', (value) => {
  tile().should('have.css', 'background-color', value);
});

Then('Tile width is set to {int}', (width) => {
  tile().should('have.attr', 'width', width);
});

Then('Tile pixel width is set to {int}', (width) => {
  tile().should('have.css', 'width', `${width}px`);
});

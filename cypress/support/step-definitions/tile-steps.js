import { tile, pixelWidthSlider, widthSlider } from '../../locators/tile';
import { setSlidebar } from '../helper';

Then('Tile component as property is set to {string}', (value) => {
  tile().should('have.css', 'background-color', value);
});

Then('Tile component orientation property is set to {string}', (value) => {
  tile().should('have.attr', 'orientation', value);
});

Then('Tile component padding property is set to {string}', (value) => {
  tile().should('have.css', 'padding', `${value}px`);
});

Then('Tile {word} is set to {string}', (sliderName, width) => {
  tile().should('have.attr', 'width', width);
});

When('I set pixelWidth slider to {int}', (width) => {
  setSlidebar(pixelWidthSlider(), width);
});

When('I set width slider to {int}', (width) => {
  setSlidebar(widthSlider(), width);
});

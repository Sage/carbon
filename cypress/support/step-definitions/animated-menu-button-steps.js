import { animatedMenuButtonPreview } from '../../locators/animated-menu-button';
import { DEBUG_FLAG } from '..';
import { label } from '../../locators';

const CLASS_PREFIX = 'carbon-animated-menu-button--';

When('I trigger Animated Menu Button preview', () => {
  animatedMenuButtonPreview().trigger('mouseover');
});

Then('Animated Menu Button label on preview is {string}', (text) => {
  label().should('have.text', text);
});

Then('Animated Menu Button direction on preview is {string}', (direction) => {
  cy.wait(300, { log: DEBUG_FLAG }); // required because of storybook slow detach attach
  animatedMenuButtonPreview().should('have.class', CLASS_PREFIX + direction);
});

Then('Animated Menu Button size property on preview is {string}', (size) => {
  animatedMenuButtonPreview().should('have.class', CLASS_PREFIX + size);
});

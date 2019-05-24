import { animatedMenuButtonPreview, animatedMenuButtonLabel } from '../../locators/animated-menu-button';

const CLASS_PREFIX = 'carbon-animated-menu-button--';

When('I trigger Animated Menu Button preview', () => {
  animatedMenuButtonPreview().trigger('mouseover');
});

Then('Animated Menu Button label on preview is {string}', (text) => {
  animatedMenuButtonLabel().should('have.text', text);
});

Then('Animated Menu Button direction on preview is {string}', (direction) => {
  cy.wait(300); // required because of storybook slow detach attach
  animatedMenuButtonPreview().should('have.class', CLASS_PREFIX + direction);
});

Then('Animated Menu Button size property on preview is {string}', (size) => {
  animatedMenuButtonPreview().should('have.class', CLASS_PREFIX + size);
});

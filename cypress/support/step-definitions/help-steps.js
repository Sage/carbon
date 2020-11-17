import { icon } from '../../locators';
import { tooltipPreview, tooltipPointer, helpHref } from '../../locators/help';

Then('tooltipPosition is set to {string}', (tooltipPosition) => {
  tooltipPreview().should('be.visible');
  icon().trigger('mouseover');
  tooltipPointer().invoke('show');
  switch (tooltipPosition) {
    case 'top':
      tooltipPointer().should('have.css', 'position', 'absolute')
        .and('have.css', 'bottom', '0px');
      break;
    case 'bottom':
      tooltipPointer().should('have.css', 'position', 'absolute')
        .and('have.css', 'top', '-7.5px');
      break;
    case 'left':
      tooltipPointer().should('have.css', 'position', 'absolute')
        .and('have.css', 'right', '124.703px');
      break;
    case 'right':
      tooltipPointer().should('have.css', 'position', 'absolute')
        .and('have.css', 'left', '-7.5px');
      break;
    default: throw new Error(`No such position as ${tooltipPosition}`);
  }
});

Then('tooltipAlign is set to {string}', (tooltipAlign) => {
  tooltipPreview().should('be.visible');
  icon().trigger('mouseover');
  tooltipPointer().invoke('show');
  switch (tooltipAlign) {
    case 'bottom':
      tooltipPointer().should('have.css', 'position', 'absolute');
      break;
    case 'center':
      tooltipPointer().should('have.css', 'position', 'absolute')
        .and('have.css', 'top', '-7.5px');
      break;
    case 'left':
      tooltipPointer().should('have.css', 'position', 'absolute')
        .and('have.css', 'top', '-7.5px')
        .and('have.css', 'left', '8px');
      break;
    case 'right':
      tooltipPointer().should('have.css', 'position', 'absolute')
        .and('have.css', 'top', '-7.5px')
        .and('have.css', 'right', '124.703px');
      break;
    case 'top':
      tooltipPointer().should('have.css', 'position', 'absolute');
      break;
    default: throw new Error(`No such position as ${tooltipAlign}`);
  }
});

Then('Help href on preview is set to {word}', (href) => {
  helpHref().should('have.attr', 'href', href);
});

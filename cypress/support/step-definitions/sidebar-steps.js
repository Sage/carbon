import { sidebarPreview, sidebarHeader } from '../../locators/sidebar';
import { backgroundUILocator } from '../../locators';

Then('Sidebar {word} value is set to {string}', (parameter, value) => {
  switch (parameter) {
    case 'position':
      sidebarPreview().should('have.css', `${value}`);
      break;
    case 'size':
      sidebarPreview().should('have.css', 'width', `${value}px`);
      break;
    default:
      throw new Error('Not a Sidebar component selectable property');
  }
});

Then('Sidebar component has enabled background UI', () => {
  backgroundUILocator().should('not.exist');
});

Then('Sidebar component has disabled background UI', () => {
  backgroundUILocator().should('be.visible');
  backgroundUILocator()
    .should('have.css', 'background-color', 'rgb(0, 20, 29)')
    .and('have.css', 'bottom', '0px')
    .and('have.css', 'left', '0px')
    .and('have.css', 'opacity', '0.6')
    .and('have.css', 'position', 'fixed')
    .and('have.css', 'right', '0px')
    .and('have.css', 'top', '0px');
});

Then('Sidebar component is visible', () => {
  sidebarPreview().should('be.visible');
  sidebarPreview()
    .should('have.css', 'border-radius', '1px')
    .and('have.css', 'bottom', '0px')
    .and('have.css', 'top', '0px')
    .and('have.css', 'z-index', '1002')
    .and('have.css', 'background-color', 'rgb(230, 235, 237)')
    .and('have.css', 'padding', '20px')
    .and('have.css', 'border-left', '1px solid rgb(204, 214, 219)')
    .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.05) -10px 0px 15px 0px')
    .and('have.css', 'right', '0px');
  sidebarHeader()
    .should('have.css', 'background-color', 'rgb(255, 255, 255)')
    .and('have.css', 'box-sizing', 'content-box')
    .and('have.css', 'border-bottom', '4px solid rgb(228, 233, 236)')
    .and('have.css', 'padding', '20px')
    .and('have.css', 'position', 'relative')
    .and('have.css', 'font-size', '14px')
    .and('have.css', 'font-weight', '400')
    .and('have.css', 'box-shadow', 'none')
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.85)')
    .and('have.css', 'width', '450px')
    .and('have.css', 'top', '-20px')
    .and('have.css', 'margin-left', '-20px');
});

Then('Sidebar component is not visible', () => {
  backgroundUILocator().should('not.exist');
});

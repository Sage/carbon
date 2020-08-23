import { sidebarPreview } from '../../locators/sidebar';
import { backgroundUILocatorIFrame } from '../../locators';

Then('Sidebar position value is set to {string}', (value) => {
  sidebarPreview().should('have.css', `${value}`);
});

Then('Sidebar size value is set to {string}', (value) => {
  sidebarPreview().should('have.css', 'width', `${value}px`);
});

Then('Sidebar component has enabled background UI', () => {
  backgroundUILocatorIFrame().should('not.exist');
});

Then('Sidebar component has disabled background UI', () => {
  backgroundUILocatorIFrame().should('be.visible');
});

Then('Sidebar component is visible', () => {
  sidebarPreview().should('be.visible');
});

Then('Sidebar component is not visible', () => {
  backgroundUILocatorIFrame().should('not.exist');
});

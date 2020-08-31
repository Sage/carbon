import { sidebarPreview } from '../../locators/sidebar';
import { backgroundUILocator } from '../../locators';

Then('Sidebar position value is set to {string}', (value) => {
  sidebarPreview().should('have.css', `${value}`);
});

Then('Sidebar size value is set to {string}', (value) => {
  sidebarPreview().should('have.css', 'width', `${value}px`);
});

Then('Sidebar component has enabled background UI', () => {
  backgroundUILocator().should('not.exist');
});

Then('Sidebar component has disabled background UI', () => {
  backgroundUILocator().should('be.visible');
});

Then('Sidebar component is visible', () => {
  sidebarPreview().should('be.visible');
});

Then('Sidebar component is not visible', () => {
  backgroundUILocator().should('not.exist');
});

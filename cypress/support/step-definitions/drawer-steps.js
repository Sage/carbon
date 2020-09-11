import {
  drawerToggle,
  drawerSidebar,
  drawerSidebarContentInnerElement,
} from '../../locators/drawer';
import { positionOfElement } from '../helper';

When('I click on {word} Drawers arrow {int} time(s)', (drawer, count) => {
  for (let i = 0; i < count; i++) {
    drawerToggle(drawer).first().click();
  }
});

Then('Drawers {word} sidebar should have class {word}', (drawer, className) => {
  drawerSidebar(drawer).should('have.class', className);
});

Then('Drawer {word} sidebar text is visible', (drawer) => {
  drawerSidebarContentInnerElement(drawer, positionOfElement('second')).should('have.text', 'link a')
    .and('be.visible');
  drawerSidebarContentInnerElement(drawer, positionOfElement('third')).should('have.text', 'link b')
    .and('be.visible');
  drawerSidebarContentInnerElement(drawer, positionOfElement('fourth')).should('have.text', 'link c')
    .and('be.visible');
});

Then('Drawer {word} sidebar text is not visible', (drawer) => {
  drawerSidebarContentInnerElement(drawer, positionOfElement('second')).should('have.text', 'link a')
    .and('not.be.visible');
  drawerSidebarContentInnerElement(drawer, positionOfElement('third')).should('have.text', 'link b')
    .and('not.be.visible');
  drawerSidebarContentInnerElement(drawer, positionOfElement('fourth')).should('have.text', 'link c')
    .and('not.be.visible');
});

Then('toggle {word} Drawers icon switched orientation to open', (drawer) => {
  drawerToggle(drawer).should('have.css', 'transform', 'matrix(-1, 0, 0, 1, 0, 0)');
});

Then('toggle {word} Drawers icon switched orientation to closed', (drawer) => {
  drawerToggle(drawer).should('have.css', 'transform', 'none');
});

Then('Drawer {word} animationDuration is set to {string}', (drawer, animationDuration) => {
  drawerSidebar(drawer).should('have.css', 'animation-duration', animationDuration);
});

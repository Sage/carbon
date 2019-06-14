import { getComponent } from '../../locators/build';

Then('{string} component is visible', (component) => {
  getComponent(component).should('exist');
});

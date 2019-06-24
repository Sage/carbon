import { commonButtonPreviewNoIframe, getComponentNoIframe } from '../../locators/build';

Then('{string} component is visible', (component) => {
  getComponentNoIframe(component).should('exist');
});

When('I open component preview no iframe', () => {
  commonButtonPreviewNoIframe().click();
});

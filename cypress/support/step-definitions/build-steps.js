import { commonButtonPreviewNoIFrame, getComponentNoIframe } from '../../locators/build';

Then('{string} component is visible', (component) => {
  getComponentNoIframe(component).should('exist');
});

When('I open component preview no iFrame', () => {
  commonButtonPreviewNoIFrame().click();
});

import {
  commonButtonPreviewNoIframe, getComponentNoIframe, getElementNoIframe, getElementNoIframeByName,
} from '../../locators/build';

Then('{string} component is visible', (component) => {
  getComponentNoIframe(component).should('exist');
});

Then('{string} element is visible', (element) => {
  getElementNoIframe(element).should('exist');
});

Then('{string} element is visible by name', (element) => {
  getElementNoIframeByName(element).should('exist');
});

When('I open component preview no iframe', () => {
  commonButtonPreviewNoIframe().click();
});

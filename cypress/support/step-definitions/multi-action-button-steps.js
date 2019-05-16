import { multiActionButtonPreview } from '../../locators/multi-action-button';

const MULTI_ACTION_BUTTON_AS_PROPERTY = 'carbon-multi-action-button__toggle--';
const MULTI_ACTION_BUTTON_ALIGN_RIGHT = 'carbon-multi-action-button--align-right';

Then('Multi Action Button text on preview is set to {string}', (text) => {
  multiActionButtonPreview()
    .children().children().first()
    .should('have.text', text);
});

Then('Multi Action Button is disabled', () => {
  multiActionButtonPreview()
    .children()
    .should('have.attr', 'disabled');
});

Then('Multi Action Button is not disabled', () => {
  multiActionButtonPreview()
    .children()
    .should('not.have.attr', 'disabled');
});

Then('Multi Action Button as on preview is {string}', (asProperty) => {
  multiActionButtonPreview()
    .children()
    .should('have.class', `${MULTI_ACTION_BUTTON_AS_PROPERTY}${asProperty}`);
});

Then('Multi Action Button align on preview is left', () => {
  multiActionButtonPreview()
    .should('not.have.class', `${MULTI_ACTION_BUTTON_ALIGN_RIGHT}`);
});

Then('Multi Action Button align on preview is right', () => {
  multiActionButtonPreview()
    .should('have.class', `${MULTI_ACTION_BUTTON_ALIGN_RIGHT}`);
});

import { multiActionButtonPreview, multiActionButtonList } from '../../locators/multi-action-button';

const MULTI_ACTION_BUTTON_AS_PROPERTY = 'carbon-multi-action-button__toggle--';
const MULTI_ACTION_BUTTON_ALIGN = 'carbon-multi-action-button--align-';
const MULTI_ACTION_BUTTON_INNER_TEXT = 'Example Button 1Example Button 2Example Button 3';

Then('Multi Action Button text on preview is set to {string}', (text) => {
  multiActionButtonPreview()
    .children().children().first()
    .should('have.text', text);
});

Then('Multi Action Button state is disabled', () => {
  multiActionButtonPreview()
    .children()
    .should('have.attr', 'disabled');
});

Then('Multi Action Button state is not disabled', () => {
  multiActionButtonPreview()
    .children()
    .should('not.have.attr', 'disabled');
});

Then('Multi Action Button as on preview is {string}', (asProperty) => {
  multiActionButtonPreview()
    .children()
    .should('have.class', `${MULTI_ACTION_BUTTON_AS_PROPERTY}${asProperty}`);
});

Then('Multi Action Button align on preview is {string}', (align) => {
  // left is default align value -> that's why it's absent inside class
  if (align === 'left') {
    multiActionButtonPreview()
      .should('not.have.class', `${MULTI_ACTION_BUTTON_ALIGN}${align}`);
  } else {
    multiActionButtonPreview()
      .should('have.class', `${MULTI_ACTION_BUTTON_ALIGN}${align}`);
  }
});

When('I invoke Multi Action Button component', () => {
  multiActionButtonPreview().trigger('mouseover');
});

Then('Multi Action Button is expanded and contains three items', () => {
  multiActionButtonList()
    .should('have.length', 3);
  multiActionButtonList()
    .invoke('text').should('contain', MULTI_ACTION_BUTTON_INNER_TEXT);
});

import { multiActionButtonPreview, multiActionButtonList } from '../../locators/multi-action-button';

const MULTI_ACTION_BUTTON_INNER_TEXT = 'Example ButtonExample Button with long textShort';
const TEXT_ALIGN = 'text-align';

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
  switch (asProperty) {
    case 'primary':
      multiActionButtonPreview().children()
        .should('have.css', 'background-color', 'rgb(37, 91, 199)')
        .and('have.css', 'border-bottom-color', 'rgba(0, 0, 0, 0)');
      break;
    case 'secondary':
      multiActionButtonPreview().children()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-bottom-color', 'rgb(37, 91, 199)')
        .and('have.css', 'border-top-color', 'rgb(37, 91, 199)')
        .and('have.css', 'border-right-color', 'rgb(37, 91, 199)')
        .and('have.css', 'border-left-color', 'rgb(37, 91, 199)');
      break;
    case 'transparent':
      multiActionButtonPreview().children()
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-bottom-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-top-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-right-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-left-color', 'rgba(0, 0, 0, 0)');
      break;
    default: throw new Error('Not a valid as property');
  }
});

Then('Multi Action Button align on preview is {string}', (align) => {
  multiActionButtonList().children()
    .should('have.css', TEXT_ALIGN, `${align}`);
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

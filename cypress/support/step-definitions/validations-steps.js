import { getDataElementByValueNoIframe, commonDataElementInputPreviewNoIframe } from '../../locators';
import { asyncWaitForIcon } from '../helper';
import { errorMessageNoIframe, inputValidationNoIframe } from '../../locators/validations';

const FIRST_ELEMENT = '0';
const SECOND_ELEMENT = '1';
const THIRD_ELEMENT = '2';
const FOURTH_ELEMENT = '3';
const FIFTH_ELEMENT = '4';
const SIXTH_ELEMENT = '5';
const SEVENTH_ELEMENT = '6';

Then('I hover mouse onto {string} {string} icon for validations component into iFrame', (position, name) => {
  switch (position) {
    case 'first':
      getDataElementByValueNoIframe(name).eq(FIRST_ELEMENT).trigger('mouseover');
      break;
    case 'second':
      getDataElementByValueNoIframe(name).eq(SECOND_ELEMENT).trigger('mouseover');
      break;
    case 'third':
      getDataElementByValueNoIframe(name).eq(THIRD_ELEMENT).trigger('mouseover');
      break;
    case 'fourth':
      getDataElementByValueNoIframe(name).eq(FOURTH_ELEMENT).trigger('mouseover');
      break;
    case 'fifth':
      getDataElementByValueNoIframe(name).eq(FIFTH_ELEMENT).trigger('mouseover');
      break;
    case 'sixth':
      getDataElementByValueNoIframe(name).eq(SIXTH_ELEMENT).trigger('mouseover');
      break;
    case 'seventh':
      getDataElementByValueNoIframe(name).eq(SEVENTH_ELEMENT).trigger('mouseover');
      break;
    default: throw new Error('There are only three validation icons elements on the page');
  }
});

Then('I click onto {string} input for validations component into iFrame', (position) => {
  switch (position) {
    case 'first':
      commonDataElementInputPreviewNoIframe().eq(FIRST_ELEMENT).click();
      break;
    case 'second':
      commonDataElementInputPreviewNoIframe().eq(SECOND_ELEMENT).click();
      break;
    case 'third':
      commonDataElementInputPreviewNoIframe().eq(THIRD_ELEMENT).click();
      break;
    case 'fourth':
      commonDataElementInputPreviewNoIframe().eq(FOURTH_ELEMENT).click();
      break;
    case 'fifth':
      commonDataElementInputPreviewNoIframe().eq(FIFTH_ELEMENT).click();
      break;
    case 'sixth':
      commonDataElementInputPreviewNoIframe().eq(SIXTH_ELEMENT).click();
      break;
    case 'seventh':
      commonDataElementInputPreviewNoIframe().eq(SEVENTH_ELEMENT).click();
      break;
    default: throw new Error('There are only three validation icons elements on the page');
  }
});

Then('I wait on async {string} icon', (name) => {
  asyncWaitForIcon(name);
});

Then('I hover mouse onto validated input into iFrame', () => {
  inputValidationNoIframe().trigger('mouseover');
});

Then('Error message for deprecated input is {string}', (text) => {
  errorMessageNoIframe().should('have.text', text);
});

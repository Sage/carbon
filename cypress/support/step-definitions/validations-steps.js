import { getDataElementByValueNoIframe } from '../../locators';

const FIRST_SWITCH = '0';
const SECOND_SWITCH = '1';
const THIRD_SWITCH = '2';

Then('I hover mouse onto {string} {string} icon for validations component into iFrame', (position, name) => {
  switch (position) {
    case 'first':
      getDataElementByValueNoIframe(name).eq(FIRST_SWITCH).trigger('mouseover');
      break;
    case 'second':
      getDataElementByValueNoIframe(name).eq(SECOND_SWITCH).trigger('mouseover');
      break;
    case 'third':
      getDataElementByValueNoIframe(name).eq(THIRD_SWITCH).trigger('mouseover');
      break;
    default: throw new Error('There are only three validation icons elements on the page');
  }
});

import {
  labelPreview,
} from '../../locators/date-range/index';

const TEXT_ALIGN = 'text-align';
const START_LABEL_INDEX = 1;
const END_LABEL_INDEX = 2;

Then('startLabel on preview is {word}', (label) => {
  labelPreview(START_LABEL_INDEX).should('have.text', label);
});

Then('endLabel on preview is {word}', (label) => {
  labelPreview(END_LABEL_INDEX).should('have.text', label);
});

Then('labels are set to inline', () => {
  labelPreview(START_LABEL_INDEX).should('have.css', TEXT_ALIGN, 'right');
  labelPreview(END_LABEL_INDEX).should('have.css', TEXT_ALIGN, 'right');
});

Then('labels are not set to inline', () => {
  labelPreview(START_LABEL_INDEX).should('not.have.css', TEXT_ALIGN, 'left');
  labelPreview(END_LABEL_INDEX).should('not.have.css', TEXT_ALIGN, 'left');
});

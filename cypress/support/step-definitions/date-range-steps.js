import {
  labelPreview,
} from '../../locators/date-range/index';

const TEXT_ALIGN = 'justify-content';
const TEXT_ALIGN_START = 'flex-start';
const TEXT_ALIGN_END = 'flex-end';
const START_LABEL_INDEX = 1;
const END_LABEL_INDEX = 2;

Then('startLabel on preview is {word}', (label) => {
  labelPreview(START_LABEL_INDEX).should('have.text', label);
});

Then('endLabel on preview is {word}', (label) => {
  labelPreview(END_LABEL_INDEX).should('have.text', label);
});

Then('labels are set to inline', () => {
  labelPreview(START_LABEL_INDEX).parent().should('have.css', TEXT_ALIGN, TEXT_ALIGN_END);
  labelPreview(END_LABEL_INDEX).parent().should('have.css', TEXT_ALIGN, TEXT_ALIGN_END);
});

Then('labels are not set to inline', () => {
  labelPreview(START_LABEL_INDEX).parent().should('not.have.css', TEXT_ALIGN, TEXT_ALIGN_START);
  labelPreview(END_LABEL_INDEX).parent().should('not.have.css', TEXT_ALIGN, TEXT_ALIGN_START);
});

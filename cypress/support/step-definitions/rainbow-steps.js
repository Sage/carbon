import {
  titlePreview, nameAndLabelPreview, firstBitPreview, tooltip,
} from '../../locators/rainbow';
import { getKnobsInput } from '../../locators';

When('I put {string} json to {string} input field', (json, inputFieldName) => {
  cy.fixture(json).then(($json) => {
    getKnobsInput(inputFieldName).clear()
      .then($selector => $selector.val(JSON.stringify($json))).type(' ');
  });
});
Then('Rainbow title is {string}', (title) => {
  cy.wait(500); // required because element exists before change
  titlePreview().should('have.text', title);
});

Then('name and label is set from {string} json', (json) => {
  cy.fixture(json).then(($json) => {
    const nameAndLabel = $json[0].name + $json[0].label;
    nameAndLabelPreview(nameAndLabel).should('contain', nameAndLabel);
  });
});

Then('color is set from {string} json', (json) => {
  cy.fixture(json).then(($json) => {
    firstBitPreview().should('have.attr', 'fill', $json[0].color);
  });
});

Then('tooltip is set from {string} json', (json) => {
  firstBitPreview().invoke('mouseover');
  cy.fixture(json).then(($json) => {
    tooltip().should('have.text', $json[0].tooltip);
  });
});

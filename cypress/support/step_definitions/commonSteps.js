import { asSelect, themeSelect, sizeSelect, subtextInput } from "../../locators/commonLocators";

When('I set as property to {string}', (asProperty) => {
  asSelect().select(asProperty);
})

When('I type {string} to as property', (asProperty) => {
  asSelect().type(asProperty);
})

When('I set Component size to {string}', (size) => {
sizeSelect().select(size)
})

When('I set Component subtext to {string}', (subtext) => {
  subtextInput().type(subtext)
  })

When('I set Component theme property to {string}', (theme) => {
  themeSelect().select(theme)
});

// this step do not apply storybook
// Then('I see {string} {string} for results', (text, asProperty) => {
//   noResultsDropdown().should('have.text', `${text} "${asProperty}"`)
// });



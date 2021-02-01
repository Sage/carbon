import {
  anchorNavigationStickyNavigation,
  anchorNavigationStickyMainPage,
} from "../../locators/anchor-navigation";

When("I click onto {string} tab", (anchorNaviIndex) => {
  anchorNavigationStickyNavigation(anchorNaviIndex).click();
});

Then("{string} anchor navigation section is visible", (anchorName) => {
  anchorNavigationStickyMainPage(anchorName).parent().should("be.visible");
});

When("I scroll window to the {string} position", (anchorName) => {
  anchorNavigationStickyMainPage(anchorName).scrollIntoView();
});

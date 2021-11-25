import { commonButtonPreviewRoot, getDataElementByValue } from "../../locators";
import { accordionDefaultTitle } from "../../locators/accordion";
import {
  actionPopoverButton,
  actionPopoverWrapper,
} from "../../locators/action-popover";
import { popoverSettingsIcon } from "../../locators/popover-container";
import { visitComponentUrl } from "../helper";
import storiesJSON from "../../../storybook-static/stories.json";

const A11YOptions = {
  runOnly: {
    type: "tag",
    values: [
      // "wcag2a", // WCAG 2.0 & WCAG 2.1 Level A
      // "wcag2aa", // WCAG 2.0 & WCAG 2.1 Level AA
      "wcag21a", // WCAG 2.1 Level A
      "wcag21aa", // WCAG 2.1 Level AA
      // "best-practice", // Best practices endorsed by Deque
    ],
  },
};

const terminalLog = (violations) => {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task("table", violationData);
};

export default (from, end) => {
  let urlList = [];
  for (const story in storiesJSON.stories) {
    const prepareUrl = story.split("--");
    if (
      !prepareUrl[0].startsWith("welcome") &&
      !prepareUrl[0].startsWith("documentation") &&
      !prepareUrl[0].endsWith("test")
    ) {
      urlList.push([prepareUrl[0], prepareUrl[1]]);
    }
  }

  // add start and end points for indexes of components
  urlList = urlList.slice(from, end);

  context("Accessibility tests", () => {
    describe("Should render storybook component", () => {
      it.each(urlList)(
        "should render %s component with %s story and have no accessibility violations",
        (componentName, storyName) => {
          visitComponentUrl(componentName, storyName);
          // open the accordion component
          if (componentName.startsWith("accordion")) {
            accordionDefaultTitle().click({ multiple: true });
          }

          // open the action-popover component
          if (
            componentName.startsWith("action-popover") &&
            !storyName.startsWith("with-custom-menu-button")
          ) {
            actionPopoverButton().eq(0).click({ force: true });
          }

          // open the action-popover component with-custom-menu-button story
          if (storyName.startsWith("with-custom-menu-button")) {
            actionPopoverWrapper().eq(0).click({ force: true });
          }

          // open the pages component
          if (componentName.startsWith("pages")) {
            commonButtonPreviewRoot().click();
          }

          // open the popover-container component
          if (componentName.startsWith("popover-container")) {
            popoverSettingsIcon().click({ multiple: true });
          }
          // expand the select component
          if (componentName.startsWith("select")) {
            getDataElementByValue("input").click({
              multiple: true,
              force: true,
            });
          }
          cy.injectAxe()
            .wait(250)
            .then(() => {
              cy.checkA11y(null, A11YOptions, terminalLog);
            });
        }
      );
    });
  });
};

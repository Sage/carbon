import { getDataElementByValue } from "../../locators";
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
      !prepareUrl[0].startsWith("contributing") &&
      !prepareUrl[0].startsWith("documentation") &&
      !prepareUrl[0].startsWith("accordion") &&
      !prepareUrl[0].startsWith("confirm") &&
      !prepareUrl[0].startsWith("content") &&
      !prepareUrl[0].startsWith("alert") &&
      !prepareUrl[0].startsWith("action-popover") &&
      !prepareUrl[0].startsWith("anchor-navigation") &&
      !prepareUrl[0].startsWith("loader") &&
      !prepareUrl[0].startsWith("loader-bar") &&
      !prepareUrl[0].startsWith("link") &&
      !prepareUrl[0].startsWith("link-preview") &&
      !prepareUrl[0].startsWith("verticaldivider") &&
      !prepareUrl[0].startsWith("button-bar") &&
      !prepareUrl[0].startsWith("button-minor") &&
      !prepareUrl[0].startsWith("batch-selection") &&
      !prepareUrl[0].startsWith("carousel") &&
      !prepareUrl[0].startsWith("badge") &&
      !prepareUrl[0].startsWith("advanced-color-picker") &&
      !prepareUrl[0].startsWith("preview") &&
      !prepareUrl[0].startsWith("detail") &&
      !prepareUrl[0].startsWith("help") &&
      !prepareUrl[0].startsWith("heading") &&
      !prepareUrl[0].startsWith("toast") &&
      !prepareUrl[0].startsWith("sidebar") &&
      !prepareUrl[0].startsWith("search") &&
      !prepareUrl[0].startsWith("switch") &&
      !prepareUrl[0].startsWith("dialog-full-screen") &&
      !prepareUrl[0].startsWith("verticalmenu") &&
      !prepareUrl[0].startsWith("message") &&
      !prepareUrl[0].startsWith("card") &&
      !prepareUrl[0].startsWith("date-input") &&
      !prepareUrl[0].startsWith("step-sequence") &&
      !prepareUrl[0].startsWith("button-toggle") &&
      !prepareUrl[0].startsWith("profile") &&
      !prepareUrl[0].startsWith("date-range") &&
      !prepareUrl[0].startsWith("pages") &&
      !prepareUrl[0].startsWith("pod") &&
      !prepareUrl[0].startsWith("button-toggle-group") &&
      !prepareUrl[0].startsWith("progress-tracker") &&
      !prepareUrl[0].startsWith("portrait") &&
      !prepareUrl[0].startsWith("draggable") &&
      !prepareUrl[0].startsWith("definition-list") &&
      !prepareUrl[0].startsWith("decimal") &&
      !prepareUrl[0].startsWith("box") &&
      !prepareUrl[0].startsWith("carbon-provider") &&
      !prepareUrl[0].startsWith("pill") &&
      !prepareUrl[0].startsWith("checkbox") &&
      !prepareUrl[0].startsWith("note") &&
      !prepareUrl[0].startsWith("textbox") &&
      !prepareUrl[0].startsWith("textarea") &&
      !prepareUrl[0].startsWith("dismissible-box") &&
      !prepareUrl[0].startsWith("dialog") &&
      !prepareUrl[0].startsWith("number-input") &&
      !prepareUrl[0].startsWith("button") &&
      !prepareUrl[0].startsWith("icon") &&
      !prepareUrl[0].startsWith("pager") &&
      !prepareUrl[0].startsWith("fieldset") &&
      !prepareUrl[0].startsWith("form") &&
      !prepareUrl[0].startsWith("drawer") &&
      !prepareUrl[0].startsWith("group-character") &&
      !prepareUrl[0].startsWith("duelling-picklist") &&
      !prepareUrl[0].startsWith("multi-action-button") &&
      !prepareUrl[0].startsWith("settings-row") &&
      !prepareUrl[0].startsWith("numeral-date") &&
      !prepareUrl[0].startsWith("global-header") &&
      !prepareUrl[0].startsWith("grid") &&
      !prepareUrl[0].startsWith("image") &&
      !prepareUrl[0].startsWith("navigation-bar") &&
      !prepareUrl[0].startsWith("popover-container") &&
      !prepareUrl[0].startsWith("menu") &&
      !prepareUrl[0].startsWith("inline-inputs") &&
      !prepareUrl[0].startsWith("radiobutton") &&
      !prepareUrl[0].startsWith("tile") &&
      !prepareUrl[0].startsWith("text-editor") &&
      !prepareUrl[0].endsWith("test")
    ) {
      urlList.push([prepareUrl[0], prepareUrl[1]]);
    }
  }

  // add start and end points for indexes of components
  urlList = urlList.slice(from, end);

  context("Accessibility tests", () => {
    describe("should render storybook component", () => {
      it.each(urlList)(
        "should render %s component with %s story and have no accessibility violations",
        (componentName, storyName) => {
          visitComponentUrl(componentName, storyName);

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

const {
  commonButtonPreviewRoot,
  getDataElementByValue,
} = require("../../locators");
const { accordionDefaultTitle } = require("../../locators/accordion");
const { actionPopoverButton } = require("../../locators/action-popover");
const { popoverSettingsIcon } = require("../../locators/popover-container");
const { visitComponentUrl } = require("../helper");

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

const componentList = [
  "welcome",
  "documentation-colors",
  "documentation-development-roadmap",
  "documentation-getting-started",
  "documentation-i18n",
  "documentation-usage-with-routing",
  "documentation-using-draftjs",
  "documentation-validations",
  "accordion-test",
  "accordion",
  "action-popover-test",
  "action-popover",
  "advanced-color-picker-test",
  "advanced-color-picker",
  "alert-test",
  "alert",
  "test-anchornavigation",
  "anchor-navigation",
  "appwrapper-test",
  "appwrapper",
  "badge-test",
  "badge",
  "batch-selection-test",
  "batch-selection",
  "box",
  "button-bar-test",
  "button-bar",
  "button-toggle-group-validations",
  "button-toggle-group",
  "button-toggle-test",
  "button-toggle",
  "button-test",
  "button",
  "carbon-provider",
  "card-test",
  "card",
  "carousel-test",
  "carousel",
  "checkbox-test",
  "checkbox-validations",
  "checkbox",
  "confirm-test",
  "confirm",
  "content-test",
  "content",
  "date-range-test",
  "date-range",
  "date-input-test",
  "date-input",
  "decimal-input-test",
  "decimal-input",
  "test-definition-list",
  "definition-list",
  "detail-test",
  "detail",
  "dialog-full-screen-test",
  "dialog-full-screen",
  "dialog-test",
  "dialog",
  "dismissible-box",
  "draggable-test",
  "draggable",
  "drawer-test",
  "drawer",
  "duellingpicklist-test",
  "duellingpicklist",
  "fieldset-address-fieldset-examples",
  "fieldset-test",
  "fieldset",
  "flat-table-expandable",
  "flat-table-test",
  "flat-table-color-themes",
  "flat-table",
  "form",
  "grid-test",
  "grid",
  "groupedcharacter-test",
  "groupedcharacter",
  "heading-test",
  "heading",
  "help-test",
  "help",
  "hr",
  "icon-button",
  "icon-test",
  "icon",
  "image",
  "inline-inputs",
  "link-preview-test",
  "link-preview",
  "link-test",
  "link",
  "loader-bar-test",
  "loader-bar",
  "loader-test",
  "loader",
  "menu-test",
  "menu",
  "message-test",
  "message",
  "mount-in-app-test",
  "mount-in-app",
  "multi-action-button-test",
  "multi-action-button",
  "test-multi-step-wizard",
  "navigation-bar-test",
  "navigation-bar",
  "note",
  "number-input-test",
  "number-input",
  "numeral-date-test",
  "numeral-date",
  "pager-test",
  "pager",
  "pages-test",
  "pages",
  "pill-test",
  "pill",
  "pod-test",
  "pod",
  "popover-container-test",
  "popover-container",
  "portrait-test",
  "portrait",
  "preview-test",
  "preview",
  "profile-test",
  "profile",
  "radiobutton",
  "row-test",
  "row",
  "search-test",
  "search",
  "select-filterable",
  "select-multiselect",
  "select-sizes",
  "select-test",
  "select",
  "setting-row-test",
  "setting-row",
  "showeditpod-test",
  "showeditpod",
  "sidebar-test",
  "sidebar",
  "simple-color-picker-test",
  "simple-color-picker",
  "split-button-test",
  "split-button",
  "step-sequence-test",
  "step-sequence",
  "switch-test",
  "switch",
  "tabs-test",
  "tabs",
  "text-editor",
  "textarea-test",
  "textarea",
  "textbox-test",
  "textbox",
  "tile-select",
  "tile-test",
  "tile",
  "toast-test",
  "toast",
  "tooltip-test",
  "tooltip",
  "typography",
  "verticaldivider",
];

function unifyComponents(array) {
  return [...new Set(array)];
}

When(
  "I generate {string} component with all stories and check A11y",
  (component) => {
    const compListToCompare = [];
    cy.fixture("stories/stories.json").then(($json) => {
      let componentName, story;
      for (const element in $json.stories) {
        const prepareUrl = element.split("--");
        componentName = prepareUrl[0];
        story = prepareUrl[1];
        compListToCompare.push(componentName);

        if (
          !componentName.startsWith("welcome") &&
          !componentName.startsWith("documentation") &&
          !componentName.endsWith("test")
        ) {
          if (componentName === component) {
            cy.log(`open the ${componentName} with ${story}`);
            visitComponentUrl(componentName, story);

            // open the accordion component
            if (componentName.startsWith("accordion")) {
              accordionDefaultTitle().click({ multiple: true });
            }

            // open the action-popover component
            if (componentName.startsWith("action-popover")) {
              actionPopoverButton().eq(0).click({ force: true });
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
        }
      }
      cy.log("Checking the list of generated components");
      cy.wrap(unifyComponents(compListToCompare)).should(
        "deep.equal",
        componentList
      );
    });
  }
);

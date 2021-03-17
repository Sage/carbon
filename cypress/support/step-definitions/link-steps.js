import {
  linkPreview,
  linkChildren,
  linkIcon,
  skipLink,
  relLink,
} from "../../locators/link";

Then("children on preview is {word}", (children) => {
  linkChildren().should("have.text", children);
});

Then("Link is disabled", () => {
  linkPreview().should("have.attr", "disabled");
});

Then("Link is enabled", () => {
  linkPreview().should("not.have.attr", "disabled");
});

Then("Link on preview target is set to {word}", (target) => {
  linkPreview().children().should("have.attr", "target", `${target}`);
});

Then("Link on preview href is set to {word}", (href) => {
  linkPreview().children().should("have.attr", "href", `${href}`);
});

Then("icon on link component preview is {string}", (iconName) => {
  linkIcon().should("have.attr", "data-element", iconName).and("be.visible");
});

Then("icon align is set to {string}", (iconAlign) => {
  if (iconAlign === "left") {
    linkIcon().should("have.css", "margin-right", "5px");
  } else {
    linkIcon()
      .should("have.css", "margin-right", "0px")
      .and("have.css", "margin-left", "5px");
  }
});

Then("Link is tabbable", () => {
  linkPreview().children().should("have.attr", "tabindex", "0");
});

Then("Link is not tabbable", () => {
  linkPreview().children().should("have.attr", "tabindex", "-1");
});

Then("Skip link is visible", () => {
  skipLink()
    .should("be.visible")
    .and("have.css", "background-color", "rgb(255, 255, 255)")
    .and("have.css", "font-size", "16px")
    .and("have.css", "padding-left", "24px")
    .and("have.css", "padding-right", "24px");
});

Then("Skip link is not visible", () => {
  skipLink().should("not.have.css", "background-color", "rgb(255, 255, 255)");
});

Then("link has a rel attribute", () => {
  relLink().should("have.attr", "rel", "noreferrer noopener");
});

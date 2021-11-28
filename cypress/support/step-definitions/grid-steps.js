import { pod, gridPod, gridComponent } from "../../locators/grid";

Then("pod {int} is {string}", (index, title) => {
  pod(index).should("have.text", title);
});

When("I resize grid viewport to {string}", (sizeOfViewport) => {
  switch (sizeOfViewport) {
    case "default":
      cy.viewport(1958, 900);
      break;
    case "extra small":
      cy.viewport(599, 900);
      break;
    case "small":
      cy.viewport(959, 900);
      break;
    case "medium":
      cy.viewport(1259, 900);
      break;
    case "large":
      cy.viewport(1920, 900);
      break;
    case "extra large":
      cy.viewport(1922, 900);
      break;
    default:
      throw new Error(
        `${sizeOfViewport} is not defined in a scope. We want to resize to only for types of viewport`
      );
  }
});

Then(
  "pod {int} has height from row {string} to row {string}",
  (index, rowStart, rowEnd) => {
    if (index === 1) {
      gridPod(index).should("have.css", "grid-row", "auto / auto");
    } else {
      gridPod(index).should("have.css", "grid-row", `${rowStart} / ${rowEnd}`);
    }
  }
);

Then(
  "pod {int} has width from column {int} to column {int}",
  (index, colStart, colEnd) => {
    if (index === 1) {
      gridPod(index).should("have.css", "grid-column", "auto / auto");
    } else {
      gridPod(index).should(
        "have.css",
        "grid-column",
        `${colStart} / ${colEnd}`
      );
    }
  }
);

Then("grid has {string} set to {int}", (property, value) => {
  switch (property) {
    case "padding":
      gridComponent().should("have.css", property, `${value}px`);
      break;
    case "grid-gap":
      gridComponent().should("have.css", property, `${value}px ${value}px`);
      break;
    default:
      throw new Error(`${property} is not defined in a scope.`);
  }
});

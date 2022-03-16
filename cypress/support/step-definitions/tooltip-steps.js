import { tooltipPreview, tooltipPointer } from "../../locators/tooltip";

Then("tooltipPosition is set to {string}", (tooltipPosition) => {
  tooltipPreview()
    .should("be.visible")
    .and("have.attr", "data-placement", tooltipPosition)
    .and("have.css", tooltipPosition, "1px");
  tooltipPointer().should("have.attr", "data-placement", tooltipPosition);
});

Then("tooltip text is set to {word}", (text) => {
  tooltipPreview().should("have.text", text);
});

Then(
  "tooltip type is set to {string} and has color {string}",
  (type, color) => {
    tooltipPreview()
      .should("have.attr", "type", type)
      .and("have.css", "background-color", color);
  }
);

Then("tooltip size is set to {string} and has font-size {int}", (size, px) => {
  tooltipPreview().should("have.css", "font-size", `${px}px`);
});

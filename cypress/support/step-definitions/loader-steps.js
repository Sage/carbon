import { loader, loaderInsideButton } from "../../locators/loader";

Then(
  "Loader width and height is set to {int} px and margin is set to {int} px",
  (widthAndHeight, margin) => {
    loader(0)
      .should("have.css", "height", `${widthAndHeight}px`)
      .and("have.css", "width", `${widthAndHeight}px`)
      .and("have.css", "animation-delay", "0s")
      .and("have.css", "margin-right", `${margin}px`);
    loader(1)
      .should("have.css", "height", `${widthAndHeight}px`)
      .and("have.css", "width", `${widthAndHeight}px`)
      .and("have.css", "animation-delay", "0.2s")
      .and("have.css", "margin-right", `${margin}px`);
    loader(2)
      .should("have.css", "height", `${widthAndHeight}px`)
      .and("have.css", "width", `${widthAndHeight}px`)
      .and("have.css", "animation-delay", "0.4s")
      .and("have.css", "margin-right", "0px");
  }
);

Then(
  "button with loader width is set to {int} px and height is set to {int} px",
  (width, height) => {
    loaderInsideButton()
      .should("have.css", "height", `${height}px`)
      .and("have.css", "width", `${width}px`);
  }
);

Then("Loader isInsideButton and backgroundColor is {string}", (color) => {
  loaderInsideButton()
    .should("be.visible")
    .and("have.css", "background-color", color);
});

Then("Loader button is disabled", () => {
  loaderInsideButton().should("be.disabled").and("have.attr", "disabled");
});

Then("Loader button is enabled", () => {
  loaderInsideButton().should("be.enabled");
});

Then("I focus loader button", () => {
  loaderInsideButton().focus();
});

Then("loader button has golden border outline", () => {
  loaderInsideButton().should("have.css", "outline-color", "rgb(255, 181, 0)");
});

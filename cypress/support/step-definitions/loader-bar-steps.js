import loaderBar from "../../locators/loader-bar";

Then("Loader Bar height is set to {int} px", (height) => {
  loaderBar().children().should("have.css", "height", `${height}px`);
  loaderBar()
    .children()
    .children()
    .should("have.css", "height", `${height}px`)
    .and("have.css", "animation-duration", "2s")
    .and("have.css", "animation-play-state", "running");
});

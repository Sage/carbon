import labelPreview from "../../locators/date-range/index";

const START_LABEL_INDEX = 1;
const END_LABEL_INDEX = 2;

Then("startLabel on preview is {word}", (label) => {
  labelPreview(START_LABEL_INDEX).should("have.text", label);
});

Then("endLabel on preview is {word}", (label) => {
  labelPreview(END_LABEL_INDEX).should("have.text", label);
});

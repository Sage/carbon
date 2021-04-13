import React from "react";
import TestRenderer from "react-test-renderer";
import StepSequence from "./step-sequence.component";
import StepSequenceItem from "./step-sequence-item/step-sequence-item.component";
import mintTheme from "../../style/themes/mint";
import { testStyledSystemMargin } from "../../__spec_helper__/test-utils";

describe("StepSequence", () => {
  const wrapper = (props) =>
    TestRenderer.create(
      <StepSequence {...props}>
        <StepSequenceItem
          aria-label="Step 1 of 5"
          indicator="2"
          hiddenCompleteLabel="Complete text for non visual users"
          hiddenCurrentLabel="Current text for non visual users"
          theme={props.theme}
        >
          Item
        </StepSequenceItem>
      </StepSequence>
    );

  it("renders correctly", () => {
    expect(wrapper({ theme: mintTheme })).toMatchSnapshot();
  });

  it("renders correctly with vertical orientation", () => {
    expect(
      wrapper({ theme: mintTheme, orientation: "vertical" })
    ).toMatchSnapshot();
  });

  describe("styled system", () => {
    testStyledSystemMargin((props) => (
      <StepSequence {...props}>
        <div>test</div>
      </StepSequence>
    ));
  });
});

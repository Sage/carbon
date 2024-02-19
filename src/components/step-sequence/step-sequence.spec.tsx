import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import Logger from "../../__internal__/utils/logger";

import StepSequence, { StepSequenceProps } from "./step-sequence.component";
import StepSequenceItem from "./step-sequence-item/step-sequence-item.component";
import { testStyledSystemSpacing } from "../../__spec_helper__/test-utils";

describe("StepSequence", () => {
  it("should display a deprecation warning once when the component is used for the first time", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    mount(
      <>
        <StepSequence>
          <StepSequenceItem
            aria-label="Step 1 of 5"
            indicator="2"
            hiddenCompleteLabel="Complete text for non visual users"
            hiddenCurrentLabel="Current text for non visual users"
          >
            Item
          </StepSequenceItem>
        </StepSequence>
        <StepSequence>
          <StepSequenceItem
            aria-label="Step 1 of 5"
            indicator="2"
            hiddenCompleteLabel="Complete text for non visual users"
            hiddenCurrentLabel="Current text for non visual users"
          >
            Item
          </StepSequenceItem>
        </StepSequence>
      </>
    );

    expect(loggerSpy).toHaveBeenCalledTimes(1);
    expect(loggerSpy).toHaveBeenCalledWith(
      "The `StepSequence` component is deprecated and will soon be removed, please use the `StepFlow` component instead."
    );

    loggerSpy.mockRestore();
  });

  const wrapper = (props?: Partial<StepSequenceProps>) =>
    TestRenderer.create(
      <StepSequence {...props}>
        <StepSequenceItem
          aria-label="Step 1 of 5"
          indicator="2"
          hiddenCompleteLabel="Complete text for non visual users"
          hiddenCurrentLabel="Current text for non visual users"
        >
          Item
        </StepSequenceItem>
      </StepSequence>
    );

  it("renders correctly", () => {
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly with vertical orientation", () => {
    expect(wrapper({ orientation: "vertical" })).toMatchSnapshot();
  });

  describe("styled system", () => {
    testStyledSystemSpacing((props) => (
      <StepSequence {...props}>
        <div>test</div>
      </StepSequence>
    ));
  });
});

import React from "react";
import { shallow } from "enzyme";
import Label from "../../../../__experimental__/components/label";
import LabelWrapper from "./label-wrapper.component";

describe("LabelWrapper", () => {
  let wrapper;
  let clickFn;

  beforeEach(() => {
    clickFn = jest.fn();
    wrapper = shallow(
      <LabelWrapper onClick={clickFn}>
        <Label>Test Children</Label>
      </LabelWrapper>
    );
  });

  it("should render children correctly", () => {
    expect(wrapper.find(Label).exists()).toBe(true);
  });

  it("should run onClick handler correctly", () => {
    wrapper.props().onClick();
    expect(clickFn).toHaveBeenCalled();
  });
});

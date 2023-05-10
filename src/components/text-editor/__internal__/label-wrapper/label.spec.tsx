import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Label from "../../../../__internal__/label";
import LabelWrapper, { LabelWrapperProps } from "./label-wrapper.component";

describe("LabelWrapper", () => {
  let wrapper: ShallowWrapper<LabelWrapperProps>;
  let clickFn: jest.Mock;

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
    wrapper.props().onClick({} as React.MouseEvent<HTMLSpanElement>);
    expect(clickFn).toHaveBeenCalled();
  });
});

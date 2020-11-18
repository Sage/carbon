import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow } from "enzyme";
import OptionGroupHeader from "./option-group-header.component";

function renderOption(props, renderer = shallow) {
  return renderer(<OptionGroupHeader {...props} />);
}

describe("OptionGroupHeader", () => {
  it("renders properly", () => {
    const props = { label: "Heading" };
    expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
  });

  describe("when icon prop is set", () => {
    it("then it should display the icon", () => {
      const props = { label: "Heading", icon: "individual" };
      expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
    });
  });
});

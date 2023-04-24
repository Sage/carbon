import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow } from "enzyme";
import OptionGroupHeader, { OptionGroupHeaderProps } from ".";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderOption(props: OptionGroupHeaderProps, renderer: any = shallow) {
  return renderer(<OptionGroupHeader {...props} />);
}

describe("OptionGroupHeader", () => {
  it("renders properly", () => {
    const props = { label: "Heading" };
    expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
  });

  describe("when icon prop is set", () => {
    it("then it should display the icon", () => {
      const props = { label: "Heading", icon: "individual" as const };
      expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
    });
  });
});

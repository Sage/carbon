import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow } from "enzyme";

import TypeIcon, { TypeIconProps } from "./type-icon.component";
import TypeIconStyle from "./type-icon.style";

function render(props?: TypeIconProps) {
  return TestRenderer.create(<TypeIcon {...props} />);
}

const messages = ["info", "error", "success", "warning"] as const;

describe("TypeIcon", () => {
  describe("default props", () => {
    it("should render with proper default props", () => {
      const wrapper = shallow(<TypeIcon />);
      expect(wrapper.find(TypeIconStyle).prop("variant")).toBe("info");
      expect(wrapper.find(TypeIconStyle).prop("transparent")).toBe(false);
    });
  });
  describe("when rendered", () => {
    describe.each(messages)("with no additional props", (variant) => {
      it(`should match the snapshot for ${variant}`, () => {
        const wrapper = render({ variant });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe.each(messages)("when transparent prop is set to true", (variant) => {
    it("applies white background and the type icon with the proper style applied", () => {
      const wrapper = render({ transparent: true, variant });
      expect(wrapper).toMatchSnapshot();
    });
  });
});

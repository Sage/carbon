import React from "react";
import TestRenderer from "react-test-renderer";
import TypeIconStyle from "./type-icon.style";
import OptionsHelper from "../../../utils/helpers/options-helper";

function render(props) {
  return TestRenderer.create(<TypeIconStyle {...props} />);
}

describe("TypeIcon", () => {
  describe("when rendered", () => {
    describe("with no additional props", () => {
      OptionsHelper.messages.forEach((variant) => {
        it(`should match the snapshot for ${variant}`, () => {
          const wrapper = render({ variant });
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });

  describe("when transparent prop is set to true", () => {
    it("applies white background and the type icon with the proper style applied", () => {
      OptionsHelper.messages.forEach((variant) => {
        const wrapper = render({ transparent: true, variant });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});

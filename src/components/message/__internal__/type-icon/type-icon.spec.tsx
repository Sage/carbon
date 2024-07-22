import React from "react";
import TestRenderer from "react-test-renderer";

import TypeIcon, { TypeIconProps } from "./type-icon.component";

function render(props?: TypeIconProps) {
  return TestRenderer.create(<TypeIcon variant="info" {...props} />);
}

const messages = ["info", "error", "success", "warning", "neutral"] as const;

describe("TypeIcon", () => {
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

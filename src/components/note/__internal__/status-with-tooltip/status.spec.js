import React from "react";
import { mount } from "enzyme";
import StatusWithTooltip from "./status.component";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";

const render = (props = {}) => {
  const defaultProps = {
    tooltipMessage: "foo",
  };
  return mount(
    <StatusWithTooltip {...defaultProps} {...props}>
      foo
    </StatusWithTooltip>
  );
};

describe("ContentWithTooltip", () => {
  describe("Styling", () => {
    it("matches the expected", () => {
      const wrapper = render();
      assertStyleMatch(
        {
          left: "-4px",
          position: "relative",
        },
        wrapper
      );

      assertStyleMatch(
        {
          content: '""',
          marginRight: "-6px",
        },
        wrapper,
        { modifier: ":before" }
      );
    });
  });
});

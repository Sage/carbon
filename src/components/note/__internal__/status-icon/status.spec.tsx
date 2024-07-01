import React from "react";
import { mount } from "enzyme";
import StatusWithTooltip from "./status-icon.component";
import StyledStatusIconWrapper from "./status-icon.style";
import { assertStyleMatch } from "../../../../__spec_helper__/__internal__/test-utils";

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
        wrapper.find(StyledStatusIconWrapper)
      );

      assertStyleMatch(
        {
          content: '""',
          marginRight: "-6px",
        },
        wrapper.find(StyledStatusIconWrapper),
        { modifier: ":before" }
      );
    });
  });
});

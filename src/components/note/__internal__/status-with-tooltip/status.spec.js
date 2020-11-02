import React from "react";
import { mount } from "enzyme";
import StatusWithTooltip from "./status.component";
import Tooltip from "../../../tooltip";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";

const onMouseOver = jest.fn();
const onMouseLeave = jest.fn();

const render = (props = {}) => {
  const defaultProps = {
    onMouseOver,
    onMouseLeave,
    tooltipMessage: "foo",
    tooltipPosition: "top",
    tooltipAlign: "center",
    tooltipVisible: false,
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

  describe("Tooltip", () => {
    it("is displayed when `tooltipVisible` is true", () => {
      expect(
        render({ tooltipVisible: true }).find(Tooltip).exists()
      ).toBeTruthy();
    });

    it("is hidden when `tooltipVisible` is false", () => {
      expect(render().find(Tooltip).exists()).toBeFalsy();
    });
  });
});

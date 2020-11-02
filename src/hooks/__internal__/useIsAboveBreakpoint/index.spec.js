import * as React from "react";
import { mount } from "enzyme";

import useIsAboveBreakpoint from ".";
import { mockMatchMedia } from "../../../__spec_helper__/test-utils";

describe("useIsAboveBreakpoint custom hook", () => {
  describe("when query does not match", () => {
    beforeEach(() => {
      mockMatchMedia(false);
    });

    it("should return false", () => {
      const TestComponent = () => {
        const aboveBreakpoint = useIsAboveBreakpoint(1000);
        return <span>{`${aboveBreakpoint}`}</span>;
      };
      const wrapper = mount(<TestComponent />);

      expect(wrapper.find("span").text()).toEqual("false");
    });
  });

  describe("when query matches", () => {
    beforeEach(() => {
      mockMatchMedia(true);
    });

    it("should return true", () => {
      const TestComponent = () => {
        const aboveBreakpoint = useIsAboveBreakpoint(1000);
        return <span>{`${aboveBreakpoint}`}</span>;
      };
      const wrapper = mount(<TestComponent />);

      expect(wrapper.find("span").text()).toEqual("true");
    });
  });
});

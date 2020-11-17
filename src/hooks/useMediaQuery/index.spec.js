import * as React from "react";
import { mount } from "enzyme";

import useMediaQuery from ".";
import { mockMatchMedia } from "../../__spec_helper__/test-utils";

describe("useMediaQuery custom hook", () => {
  describe("when query does not match", () => {
    beforeEach(() => {
      mockMatchMedia(false);
    });

    it("should return false", () => {
      const TestComponent = () => {
        const matchQuery = useMediaQuery("(min-width:960px)");
        return <span>{`${matchQuery}`}</span>;
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
        const matchQuery = useMediaQuery("(min-width:960px)");
        return <span>{`${matchQuery}`}</span>;
      };
      const wrapper = mount(<TestComponent />);

      expect(wrapper.find("span").text()).toEqual("true");
    });
  });

  describe("on component unmount", () => {
    let removeListenerFn;
    beforeEach(() => {
      const { removeListener } = mockMatchMedia(true);
      removeListenerFn = removeListener;
    });

    it("should remove the event listener", () => {
      const TestComponent = () => {
        const matchQuery = useMediaQuery("(min-width:960px)");
        return <span>{`${matchQuery}`}</span>;
      };
      const wrapper = mount(<TestComponent />);

      expect(wrapper.find("span").text()).toEqual("true");
      wrapper.unmount();
      expect(removeListenerFn.mock.calls.length).toEqual(1);
    });
  });
});

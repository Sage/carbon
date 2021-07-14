import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import StickyFooter from "./sticky-footer.component";
import StyledStickyFooter from "./sticky-footer.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

const mockRef = React.createRef();

describe("StickyFooter component", () => {
  let wrapper;

  describe("scroll behaviour", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      wrapper = mount(
        <div id="container" ref={mockRef}>
          <StickyFooter containerRef={mockRef}>Some content</StickyFooter>
        </div>
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    describe("when not scrolled to the bottom of containing element", () => {
      it("should be sticky", () => {
        const footerNode = wrapper.find(StyledStickyFooter).getDOMNode();
        jest
          .spyOn(footerNode, "clientHeight", "get")
          .mockImplementation(() => 40);

        const containerNode = wrapper.find("#container").getDOMNode();

        jest
          .spyOn(containerNode, "clientHeight", "get")
          .mockImplementation(() => 1000);
        jest
          .spyOn(containerNode, "scrollHeight", "get")
          .mockImplementation(() => 1500);
        jest
          .spyOn(containerNode, "scrollTop", "get")
          .mockImplementation(() => 0);

        act(() => {
          jest.runAllTimers();
          containerNode.dispatchEvent(new Event("scroll"));
        });
        wrapper.update();

        assertStyleMatch(
          {
            position: "sticky",
            width: "100%",
            bottom: "0",
            left: "0",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 -4px 12px rgba(153,173,182,0.05)",
            zIndex: "1000",
          },
          wrapper.find(StyledStickyFooter)
        );
      });
    });

    describe("when scrolled to the bottom of containing element", () => {
      it("should not be sticky", () => {
        const footerNode = wrapper.find(StyledStickyFooter).getDOMNode();
        jest
          .spyOn(footerNode, "clientHeight", "get")
          .mockImplementation(() => 40);

        const containerNode = wrapper.find("#container").getDOMNode();

        jest
          .spyOn(containerNode, "clientHeight", "get")
          .mockImplementation(() => 1000);
        jest
          .spyOn(containerNode, "scrollHeight", "get")
          .mockImplementation(() => 1500);
        jest
          .spyOn(containerNode, "scrollTop", "get")
          .mockImplementation(() => 500);

        act(() => {
          jest.runAllTimers();
          containerNode.dispatchEvent(new Event("scroll"));
        });
        wrapper.update();

        expect(wrapper.find(StyledStickyFooter).props().sticky).toEqual(false);
      });
    });
  });

  describe("when disableSticky prop set", () => {
    it("should disable the sticky behaviour", () => {
      wrapper = mount(
        <div id="container" ref={mockRef}>
          <StickyFooter containerRef={mockRef} disableSticky>
            Some content
          </StickyFooter>
        </div>
      );
      expect(wrapper.find(StyledStickyFooter).props().sticky).toEqual(false);
    });
  });
});

import React, { useRef } from "react";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper } from "enzyme";

import StickyFooter, { StickyFooterProps } from "./sticky-footer.component";
import StyledStickyFooter from "./sticky-footer.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

function renderStickyFooter(props: Partial<StickyFooterProps> = {}) {
  const MockFooterContainer = () => {
    const mockRef = useRef(null);

    return (
      <div id="container" ref={mockRef}>
        <StickyFooter containerRef={mockRef} {...props}>
          Some content
        </StickyFooter>
      </div>
    );
  };

  return mount(<MockFooterContainer />);
}

describe("StickyFooter component", () => {
  let wrapper: ReactWrapper;

  describe("styling", () => {
    const assertPaddingMatch = (footer: ReactWrapper) => {
      assertStyleMatch(
        {
          padding: "var(--spacing200) var(--spacing400)",
          boxSizing: "border-box",
        },
        footer
      );
    };

    it("should have correct padding when sticky", () => {
      wrapper = renderStickyFooter();
      assertPaddingMatch(wrapper.find(StyledStickyFooter));
    });

    it("should have correct padding when not sticky", () => {
      wrapper = renderStickyFooter({ disableSticky: true });
      assertPaddingMatch(wrapper.find(StyledStickyFooter));
    });
  });

  describe("scroll behaviour", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      wrapper = renderStickyFooter();
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
            backgroundColor: "var(--colorsActionMinorYang100)",
            boxShadow: "var(--boxShadow150)",
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
      wrapper = renderStickyFooter({ disableSticky: true });

      expect(wrapper.find(StyledStickyFooter).props().sticky).toEqual(false);
    });
  });
});

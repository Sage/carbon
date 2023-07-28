import React from "react";
import { mount, shallow } from "enzyme";

import TabsHeader, { TabHeaderProps } from "./tabs-header.component";
import {
  StyledTabsHeaderWrapper,
  StyledTabsHeaderList,
  StyledTabsHeaderListProps,
  StyledTabsBottomBorder,
} from "./tabs-header.style";
import TabTitle from "../tab-title/tab-title.component";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: Partial<TabHeaderProps> = {}, renderer: any = shallow) {
  return renderer(
    <TabsHeader {...props}>
      <TabTitle title="title-1" onClick={() => {}} onKeyDown={() => {}} />
      <TabTitle title="title-2" onClick={() => {}} onKeyDown={() => {}} />
    </TabsHeader>
  );
}

function renderStyles(props: Partial<StyledTabsHeaderListProps> = {}) {
  return mount(<StyledTabsHeaderList {...props} />);
}

describe("TabsHeader", () => {
  it("renders as expected", () => {
    assertStyleMatch(
      {
        display: "flex",
        cursor: "default",
        listStyle: "none",
        margin: "-3px",
        padding: "3px",
      },
      renderStyles()
    );
  });

  it("renders children correctly", () => {
    expect(render().find(TabTitle)).toHaveLength(2);
  });

  it("has the role of a role prop value", () => {
    expect(
      render({ role: "tablist" }).find(StyledTabsHeaderList).props().role
    ).toEqual("tablist");
  });

  describe("when position prop is set to left", () => {
    it("applies proper styles", () => {
      const wrapper = render({ position: "left" }, mount);

      assertStyleMatch(
        {
          flexDirection: "column",
          boxShadow: `none`,
        },
        wrapper.find(StyledTabsHeaderList)
      );

      assertStyleMatch(
        {
          minWidth: "20%",
          overflowY: "auto",
          padding: "3px",
        },
        wrapper.find(StyledTabsHeaderWrapper)
      );
    });

    it("applies proper styles when noRightBorder true", () => {
      assertStyleMatch(
        {
          boxShadow: "none",
        },
        renderStyles({ position: "left", noRightBorder: true })
      );
    });

    it("does not render the bottom border element", () => {
      const wrapper = render({ position: "left" }, mount);
      expect(wrapper.find(StyledTabsBottomBorder)).toHaveLength(0);
    });
  });

  describe("when position prop is set to top", () => {
    it("renders the bottom border element", () => {
      const wrapper = render({ position: "top" }, mount);
      expect(wrapper.find(StyledTabsBottomBorder)).toHaveLength(1);
    });
  });

  describe("when align prop is set to right", () => {
    it("applies proper styles", () => {
      assertStyleMatch(
        {
          justifyContent: "flex-end",
          textAlign: "right",
        },
        renderStyles({ align: "right" })
      );
    });

    it("applies proper styles when positioned left", () => {
      assertStyleMatch(
        {
          justifyContent: "flex-start",
        },
        renderStyles({ position: "left", align: "right" })
      );
    });
  });

  describe("when extendedLine is false", () => {
    it("applies proper styles", () => {
      assertStyleMatch(
        {
          width: "fit-content",
        },
        renderStyles({ extendedLine: false })
      );
    });
  });

  describe("custom target styling", () => {
    const wrapper = render({ isInSidebar: true, position: "left" }, mount);
    assertStyleMatch(
      {
        margin: "-3px",
      },
      wrapper.find(StyledTabsHeaderList)
    );
    assertStyleMatch(
      {
        minWidth: "100%",
      },
      wrapper.find(StyledTabsHeaderWrapper)
    );
  });

  describe("horizontal scroll", () => {
    const mockScroll = ({
      element,
      ...values
    }: {
      element: HTMLElement;
      scrollWidth?: number;
      clientWidth?: number;
      scrollLeft?: number;
    }) => {
      Object.entries(values).forEach(([key, value]) => {
        Object.defineProperty(element, key, {
          configurable: true,
          value,
        });
      });
    };

    describe("when is scrollable", () => {
      it("renders before and after pseudoelements", () => {
        const wrapper = render({}, mount);

        const list = wrapper.find(StyledTabsHeaderList).getDOMNode();
        mockScroll({
          element: list,
          scrollWidth: 512,
          clientWidth: 256,
        });

        wrapper.setProps({});

        assertStyleMatch(
          {
            pointerEvents: "none",
            content: '""',
            backgroundRepeat: "no-repeat",
            backgroundSize: "16px 48px",
            backgroundAttachment: "scroll",
            zIndex: "1000",
            position: "sticky",
            minWidth: "16px",
            transition: "opacity 0.1s ease-in-out",
            background:
              "radial-gradient( farthest-side at 0 50%, rgba(0,0,0,0.2), rgba(0,0,0,0) )",
            backgroundPosition: "left calc(50% - 4px)",
            left: "-3px",
            marginRight: "-16px",
          },
          list,
          { modifier: ":before" }
        );

        assertStyleMatch(
          {
            pointerEvents: "none",
            content: '""',
            backgroundRepeat: "no-repeat",
            backgroundSize: "16px 48px",
            backgroundAttachment: "scroll",
            zIndex: "1000",
            position: "sticky",
            minWidth: "16px",
            transition: "opacity 0.1s ease-in-out",
            background:
              "radial-gradient( farthest-side at 100% 50%, rgba(0,0,0,0.2), rgba(0,0,0,0) )",
            backgroundPosition: "right calc(50% - 4px)",
            right: "-3px",
            marginLeft: "-16px",
          },
          list,
          { modifier: ":after" }
        );
      });

      it.each([
        [0, "0"],
        [64, "0.5"],
        [128, "1"],
        [256, "1"],
      ])(
        "renders before element with correct opacity",
        (scrollLeft, opacity) => {
          const wrapper = render({}, mount);
          const list = wrapper.find(StyledTabsHeaderList).getDOMNode();

          mockScroll({
            element: list,
            scrollWidth: 768,
            clientWidth: 256,
            scrollLeft,
          });

          wrapper.setProps({});

          wrapper.find(StyledTabsHeaderList).simulate("scroll");

          assertStyleMatch(
            {
              opacity,
            },
            list,
            { modifier: ":before" }
          );
        }
      );

      it.each([
        [256, "1"],
        [384, "1"],
        [448, "0.5"],
        [512, "0"],
      ])(
        "renders after element with correct opacity",
        (scrollLeft, opacity) => {
          const wrapper = render({}, mount);
          const list = wrapper.find(StyledTabsHeaderList).getDOMNode();

          mockScroll({
            element: list,
            scrollWidth: 768,
            clientWidth: 256,
            scrollLeft,
          });

          wrapper.setProps({});

          wrapper.find(StyledTabsHeaderList).simulate("scroll");

          assertStyleMatch(
            {
              opacity,
            },
            list,
            { modifier: ":after" }
          );
        }
      );
    });

    describe("when is not scrollable", () => {
      it("does not render before and after pseudoelements", () => {
        const wrapper = render({}, mount);
        const list = wrapper.find(StyledTabsHeaderList).getDOMNode();

        mockScroll({
          element: list,
          scrollWidth: 256,
          clientWidth: 256,
        });

        wrapper.setProps({});

        expect(list).not.toHaveStyleRule("min-width", "16px", {
          modifier: ":after",
        });
        expect(list).not.toHaveStyleRule("min-width", "16px", {
          modifier: ":before",
        });
      });
    });
  });
});

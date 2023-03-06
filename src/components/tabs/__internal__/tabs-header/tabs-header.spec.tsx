import React from "react";
import { mount, shallow } from "enzyme";
import TabsHeader, { TabHeaderProps } from "./tabs-header.component";
import {
  StyledTabsHeaderWrapper,
  StyledTabsHeaderList,
  StyledTabsHeaderListProps,
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
        boxShadow: "inset 0px -2px 0px 0px var(--colorsActionMinor100)",
        cursor: "default",
        listStyle: "none",
        margin: "0",
        padding: "0",
      },
      renderStyles()
    );
  });

  it("renders children correctly", () => {
    expect(render().find(StyledTabsHeaderList).children()).toHaveLength(2);
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

  describe("when alternateStyling is true", () => {
    it("applies proper styles", () => {
      assertStyleMatch(
        {
          boxShadow: "inset 0px -1px 0px 0px var(--colorsActionMinor100)",
        },
        renderStyles({ alternateStyling: true })
      );
    });

    it("applies proper styles when position left", () => {
      assertStyleMatch(
        {
          boxShadow: "none",
        },
        renderStyles({ alternateStyling: true, position: "left" })
      );
    });
  });

  describe("custom target styling", () => {
    const wrapper = render({ isInSidebar: true, position: "left" }, mount);
    assertStyleMatch(
      {
        margin: "0",
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
});

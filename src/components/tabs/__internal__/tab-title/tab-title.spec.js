import React from "react";
import { mount, shallow } from "enzyme";
import { css } from "styled-components";
import TabTitle from "./tab-title.component";
import {
  StyledTabTitle,
  StyledTitleContent,
  StyledLayoutWrapper,
  StyledSelectedIndicator,
} from "./tab-title.style";
import { aegeanTheme, baseTheme } from "../../../../style/themes";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";
import ValidationIcon from "../../../validations/validation-icon.component";
import StyledValidationIcon from "../../../validations/validation-icon.style";
import StyledIcon from "../../../icon/icon.style";

function render(props, renderer = shallow) {
  return renderer(
    <TabTitle title="Tab Title 1" dataTabId="uniqueid1" {...props} />
  );
}

describe("TabTitle", () => {
  let wrapper;
  it("renders as expected", () => {
    assertStyleMatch(
      {
        backgroundColor: "transparent",
        display: "inline-block",
        fontWeight: "bold",
        height: "100%",
      },
      render({}, mount).find(StyledTabTitle)
    );
  });

  it("renders a title as its child with a text passed as a prop", () => {
    const firstTabTitle = "Tab Title 1";
    wrapper = render();
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.children().text()).toEqual(firstTabTitle);
  });

  it("contains custom className if passed as a prop", () => {
    wrapper = render({ className: "class" });
    expect(wrapper.find(".class").exists()).toEqual(true);
  });

  describe("attributes", () => {
    wrapper = render();
    it('role equals "tab"', () => {
      expect(wrapper.find("[role='tab']").exists()).toEqual(true);
    });
    it('data-element equals "select-tab"', () => {
      expect(wrapper.find("[data-element='select-tab']").exists()).toEqual(
        true
      );
    });
    it("data-tabid equals tabId", () => {
      expect(wrapper.find("[data-tabid='uniqueid1']").exists()).toEqual(true);
    });
  });

  describe('when size is set to "large"', () => {
    it("applies proper styling", () => {
      wrapper = render({ size: "large" }, mount);
      assertStyleMatch(
        { padding: "10px 24px" },
        wrapper.find(StyledTitleContent)
      );
    });
  });

  describe("when `href` provided", () => {
    it("should trigger open in new tab if pressed with Enter or Space", () => {
      wrapper = render({ href: "randomUrl" });
      global.open = jest.fn();

      wrapper.props().onKeyDown({ which: 32, stopPropagation: () => {} });
      expect(global.open).toHaveBeenCalledWith("randomUrl", "_blank");
      jest.clearAllMocks();
    });

    it("should trigger open in new tab if clicked", () => {
      wrapper = mount(
        <TabTitle
          href="randomUrl"
          title="Tab Title 1"
          dataTabId="uniqueid1"
          onClick={() => {}}
        >
          <StyledTitleContent />
        </TabTitle>
      );
      global.open = jest.fn();
      wrapper
        .find(StyledTitleContent)
        .props()
        .onClick({ stopPropagation: () => {}, preventDefault: () => {} });
      expect(global.open).toHaveBeenCalledWith("randomUrl", "_blank");
      jest.clearAllMocks();
    });
  });

  describe("when `href` is not provided", () => {
    it("should not trigger open in new tab if pressed with Enter or Space", () => {
      wrapper = render({ onKeyDown: () => {} });
      global.open = jest.fn();

      wrapper.props().onKeyDown({ which: 32, stopPropagation: () => {} });
      expect(global.open).not.toHaveBeenCalled();
    });
  });

  describe('when position is "top', () => {
    describe("with borders", () => {
      it("applies proper styling", () => {
        wrapper = render({ size: "large", borders: true }, mount);

        assertStyleMatch(
          {
            borderTop: `1px solid ${baseTheme.tab.background}`,
            borderLeft: `1px solid ${baseTheme.tab.background}`,
            borderRight: `1px solid ${baseTheme.tab.background}`,
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            marginLeft: "-1px",
          },
          wrapper.find(StyledTabTitle),
          { modifier: ":not(:first-of-type)" }
        );
      });

      it('applies proper styling when size is "large" and isTabSelected is true', () => {
        wrapper = render(
          { size: "large", borders: true, isTabSelected: true },
          mount
        );
        wrapper.simulate("focus");
        assertStyleMatch(
          { outline: `2px solid ${baseTheme.colors.focus}` },
          wrapper.find(StyledTabTitle),
          { modifier: ":focus" }
        );

        assertStyleMatch(
          { paddingBottom: "6px" },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            bottom: "0px",
            left: "0px",
            boxShadow: `inset 0px -4px 0px ${baseTheme.colors.primary}`,
            width: "100%",
            height: "4px",
          },
          wrapper.find(StyledSelectedIndicator)
        );
      });

      it('applies proper styling when size is not "large" and isTabSelected is true', () => {
        wrapper = render(
          { borders: true, isTabSelected: true, size: "default" },
          mount
        );
        wrapper.simulate("focus");
        assertStyleMatch(
          { outline: `2px solid ${baseTheme.colors.focus}` },
          wrapper.find(StyledTabTitle),
          { modifier: ":focus" }
        );

        assertStyleMatch(
          { padding: "10px 16px" },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            bottom: "0px",
            left: "0px",
            boxShadow: `inset 0px -2px 0px ${baseTheme.colors.primary}`,
            width: "100%",
            height: "2px",
          },
          wrapper.find(StyledSelectedIndicator)
        );
      });
    });
  });

  describe('when position prop is set to "left"', () => {
    it("applies proper styles", () => {
      wrapper = render({ position: "left" }, mount);
      assertStyleMatch(
        {
          backgroundColor: "transparent",
          borderBottom: "0px",
          borderRight: `2px solid ${baseTheme.tab.background}`,
          display: "block",
          height: "auto",
          marginLeft: "0px",
        },
        wrapper.find(StyledTabTitle)
      );

      assertStyleMatch(
        {
          background: "#CCD6DB",
        },
        wrapper.find(StyledTabTitle),
        { modifier: ":hover" }
      );

      assertStyleMatch(
        {
          marginTop: "0",
        },
        wrapper.find(StyledTabTitle),
        { modifier: ":first-child" }
      );
    });

    it('applies proper styling when size is "large"', () => {
      wrapper = render({ position: "left", size: "large" }, mount);

      assertStyleMatch(
        {
          padding: "22px 24px",
        },
        wrapper.find(StyledTitleContent)
      );
    });

    describe("with borders", () => {
      it.each(["default", "large"])(
        "applies proper styling when isTabSelected and size is %s",
        (size) => {
          wrapper = render(
            { borders: true, isTabSelected: true, position: "left", size },
            mount
          );

          assertStyleMatch(
            {
              borderTop: `1px solid ${baseTheme.tab.background}`,
              borderLeft: `1px solid ${baseTheme.tab.background}`,
              borderBottom: `1px solid ${baseTheme.tab.background}`,
            },
            wrapper.find(StyledTitleContent)
          );

          assertStyleMatch(
            {
              marginTop: "-1px",
            },
            wrapper.find(StyledTabTitle),
            { modifier: ":not(:first-of-type)" }
          );

          assertStyleMatch(
            {
              top: "0px",
              right: "0px",
              boxShadow: `inset ${
                size === "large" ? "-4px" : "-2px"
              } 0px 0px 0px ${baseTheme.colors.primary}`,
              height: "100%",
              width: size === "large" ? "4px" : "2px",
            },
            wrapper.find(StyledSelectedIndicator)
          );
        }
      );
    });
  });

  describe("when tab is selected", () => {
    it("has aria-selected attribute set to true", () => {
      wrapper = render({ isTabSelected: true });
      expect(wrapper.find("[aria-selected=true]").exists()).toEqual(true);
    });

    it("applies proper styling", () => {
      wrapper = render({ isTabSelected: true }, mount);
      assertStyleMatch(
        {
          color: baseTheme.text.color,
          backgroundColor: baseTheme.colors.white,
        },
        wrapper.find(StyledTabTitle)
      );

      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.white,
          borderBottomColor: baseTheme.colors.primary,
          color: baseTheme.text.color,
        },
        wrapper.find(StyledTabTitle),
        { modifier: ":hover" }
      );
    });

    it("applies proper styling when size is large", () => {
      wrapper = render({ isTabSelected: true, size: "large" }, mount);

      assertStyleMatch(
        { paddingBottom: "6px" },
        wrapper.find(StyledTitleContent)
      );
    });

    it("does not apply selected styling", () => {
      wrapper = render({ isTabSelected: true, error: true }, mount);

      expect(wrapper.find(StyledSelectedIndicator).exists()).toBeFalsy();
    });

    it("does not apply selected styling when it has error or warning when size is large", () => {
      wrapper = render(
        { isTabSelected: true, error: true, size: "large" },
        mount
      );

      expect(wrapper.find(StyledSelectedIndicator).exists()).toBeFalsy();
    });

    describe("when position prop is set to left", () => {
      it("applies proper styling", () => {
        wrapper = render({ position: "left", isTabSelected: true }, mount);

        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.white,
          },
          wrapper.find(StyledTabTitle)
        );

        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.white,
          },
          wrapper.find(StyledTabTitle),
          { modifier: ":hover" }
        );
      });

      it("does not apply selected styling when it has error or warning", () => {
        wrapper = render(
          { isTabSelected: true, error: true, position: "left" },
          mount
        );

        expect(wrapper.find(StyledSelectedIndicator).exists()).toBeFalsy();
      });

      it("does not apply selected styling when it has error or warning and size is large", () => {
        wrapper = render(
          { isTabSelected: true, error: true, position: "left", size: "large" },
          mount
        );

        expect(wrapper.find(StyledSelectedIndicator).exists()).toBeFalsy();
      });
    });
  });

  describe("when tab is not selected", () => {
    it("has aria-selected attribute set to false", () => {
      wrapper = render({ isTabSelected: false });
      expect(wrapper.find("[aria-selected=false]").exists()).toEqual(true);
    });
  });

  describe("when title has siblings", () => {
    it('renders them as expected when titlePosition is "before"', () => {
      wrapper = render(
        {
          title: "Tab 1",
          siblings: [<span>foo</span>, <span>bar</span>],
          titlePosition: "before",
        },
        mount
      );

      expect(wrapper.find(StyledTitleContent).props().hasSiblings).toEqual(
        true
      );
      expect(
        wrapper.find(StyledTitleContent).props().children[0][0].props.children
      ).toEqual("Tab 1");
      assertStyleMatch(
        { paddingBottom: "10px" },
        wrapper.find(StyledTitleContent)
      );
    });

    it('renders them as expected when titlePosition is "after"', () => {
      wrapper = render(
        {
          title: "Tab 1",
          siblings: [<span>foo</span>, <span>bar</span>],
          titlePosition: "after",
        },
        mount
      );

      expect(
        wrapper.find(StyledTitleContent).props().children[0][1].props.children
      ).toEqual("Tab 1");
      assertStyleMatch(
        {
          paddingTop: "10px",
          paddingBottom: "10px",
        },
        wrapper.find(StyledTitleContent)
      );
    });

    it('adjusts padding when isTabSelected is true and position is "top"', () => {
      wrapper = render(
        {
          title: "Tab 1",
          siblings: [<span>foo</span>, <span>bar</span>],
          titlePosition: "before",
          isTabSelected: true,
        },
        mount
      );

      expect(wrapper.find(StyledTitleContent).props().hasSiblings).toEqual(
        true
      );
      expect(
        wrapper.find(StyledTitleContent).props().children[0][0].props.children
      ).toEqual("Tab 1");
      assertStyleMatch(
        { paddingBottom: "8px" },
        wrapper.find(StyledTitleContent)
      );
    });

    it('does not adjust padding when isTabSelected is true and position is "left"', () => {
      wrapper = render(
        {
          title: "Tab 1",
          siblings: [<span>foo</span>, <span>bar</span>],
          titlePosition: "before",
          isTabSelected: true,
          position: "left",
        },
        mount
      );

      expect(wrapper.find(StyledTitleContent).props().hasSiblings).toEqual(
        true
      );
      expect(
        wrapper.find(StyledTitleContent).props().children[0][0].props.children
      ).toEqual("Tab 1");
      assertStyleMatch(
        { padding: "10px 16px" },
        wrapper.find(StyledTitleContent)
      );
    });

    it('renders as expected when size is "large"', () => {
      wrapper = render(
        {
          title: "Tab 1",
          siblings: [<span>foo</span>, <span>bar</span>],
          titlePosition: "before",
          size: "large",
        },
        mount
      );

      expect(
        wrapper.find(StyledTitleContent).props().children[0][0].props.children
      ).toEqual("Tab 1");
      assertStyleMatch(
        {
          paddingTop: "10px",
          paddingBottom: "10px",
        },
        wrapper.find(StyledTitleContent)
      );
    });

    it('adjusts padding when isTabSelected is true and size is "large"', () => {
      wrapper = render(
        {
          title: "Tab 1",
          siblings: [<span>foo</span>, <span>bar</span>],
          titlePosition: "before",
          isTabSelected: true,
          size: "large",
        },
        mount
      );

      expect(wrapper.find(StyledTitleContent).props().hasSiblings).toEqual(
        true
      );
      expect(
        wrapper.find(StyledTitleContent).props().children[0][0].props.children
      ).toEqual("Tab 1");
      assertStyleMatch(
        { paddingBottom: "6px" },
        wrapper.find(StyledTitleContent)
      );
    });

    it('renders as expected when size is "large" and position is "left"', () => {
      wrapper = render(
        {
          title: "Tab 1",
          siblings: [<span>foo</span>, <span>bar</span>],
          titlePosition: "before",
          size: "large",
          position: "left",
        },
        mount
      );

      expect(
        wrapper.find(StyledTitleContent).props().children[0][0].props.children
      ).toEqual("Tab 1");
      assertStyleMatch(
        {
          padding: "22px 24px",
        },
        wrapper.find(StyledTitleContent)
      );
    });
  });

  describe("when tab has info", () => {
    describe('when positioned "top"', () => {
      it("applies proper styling", () => {
        wrapper = render({ info: true }, mount);
        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.info,
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.info,
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      it('applies proper styling when size is "large"', () => {
        wrapper = render({ info: true, size: "large" }, mount);
        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.info,
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.info,
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      it("renders the ValidationIcon", () => {
        wrapper = render({ info: true, infoMessage: "foo" }, mount);
        const icon = wrapper.find(ValidationIcon);

        expect(icon.exists()).toBeTruthy();
        expect(icon.props().info).toEqual("foo");

        assertStyleMatch({ zIndex: "10" }, wrapper.find(StyledLayoutWrapper), {
          modifier: `${StyledValidationIcon}`,
        });

        assertStyleMatch(
          {
            height: "16px",
            top: "3px",
            left: "-2px",
          },
          wrapper.find(StyledLayoutWrapper),
          {
            modifier: css`
              ${StyledValidationIcon} ${StyledIcon}
            `,
          }
        );
      });
    });

    describe('when positioned "left"', () => {
      it('applies proper styling when position is "left"', () => {
        wrapper = render({ position: "left", info: true }, mount);
        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.info,
            paddingRight: "18px",
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.info,
            paddingRight: "18px",
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      it('applies proper styling when size is "large"', () => {
        wrapper = render(
          { position: "left", info: true, size: "large" },
          mount
        );
        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.info,
            paddingRight: "26px",
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.info,
            paddingRight: "26px",
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });
    });
  });

  describe("when tab has warning", () => {
    describe('when positioned "top"', () => {
      it("applies proper styling", () => {
        wrapper = render({ warning: true }, mount);
        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.warning,
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.warning,
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      it('applies proper styling when size is "large"', () => {
        wrapper = render({ warning: true, size: "large" }, mount);
        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.warning,
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.warning,
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      it("renders the ValidationIcon", () => {
        wrapper = render({ warning: true, warningMessage: "foo" }, mount);
        const icon = wrapper.find(ValidationIcon);

        expect(icon.exists()).toBeTruthy();
        expect(icon.props().warning).toEqual("foo");

        assertStyleMatch({ zIndex: "10" }, wrapper.find(StyledLayoutWrapper), {
          modifier: `${StyledValidationIcon}`,
        });

        assertStyleMatch(
          {
            height: "16px",
            top: "3px",
            left: "-2px",
          },
          wrapper.find(StyledLayoutWrapper),
          {
            modifier: css`
              ${StyledValidationIcon} ${StyledIcon}
            `,
          }
        );
      });
    });

    describe('when positioned "left"', () => {
      it('applies proper styling when position is "left"', () => {
        wrapper = render({ position: "left", warning: true }, mount);
        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.warning,
            paddingRight: "18px",
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.warning,
            paddingRight: "18px",
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      it('applies proper styling when size is "large"', () => {
        wrapper = render(
          { position: "left", warning: true, size: "large" },
          mount
        );
        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.warning,
            paddingRight: "26px",
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: "1px solid",
            outlineOffset: "-1px",
            outlineColor: baseTheme.colors.warning,
            paddingRight: "26px",
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });
    });
  });

  describe("when tab has error", () => {
    describe('when positioned "top"', () => {
      it("applies proper styling", () => {
        wrapper = render({ error: true }, mount);
        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: `2px solid ${baseTheme.colors.error}`,
            outlineOffset: "-2px",
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: `2px solid ${baseTheme.colors.error}`,
            outlineOffset: "-2px",
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      it('applies proper styling when size is "large"', () => {
        wrapper = render({ error: true, size: "large" }, mount);
        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: `2px solid ${baseTheme.colors.error}`,
            outlineOffset: "-2px",
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderBottomColor: "transparent",
            outline: `2px solid ${baseTheme.colors.error}`,
            outlineOffset: "-2px",
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      it("renders the ValidationIcon", () => {
        wrapper = render({ error: true, errorMessage: "foo" }, mount);
        const icon = wrapper.find(ValidationIcon);
        expect(icon.exists()).toBeTruthy();
        expect(icon.props().error).toEqual("foo");

        assertStyleMatch({ zIndex: "10" }, wrapper.find(StyledLayoutWrapper), {
          modifier: `${StyledValidationIcon}`,
        });

        assertStyleMatch(
          {
            height: "16px",
            top: "3px",
            left: "-2px",
          },
          wrapper.find(StyledLayoutWrapper),
          {
            modifier: css`
              ${StyledValidationIcon} ${StyledIcon}
            `,
          }
        );
      });
    });

    describe('when positioned "left"', () => {
      it("applies proper styling", () => {
        wrapper = render({ position: "left", error: true }, mount);
        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: `2px solid ${baseTheme.colors.error}`,
            outlineOffset: "-2px",
            paddingRight: "18px",
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: `2px solid ${baseTheme.colors.error}`,
            outlineOffset: "-2px",
            paddingRight: "18px",
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      it('applies proper styling when size is "large"', () => {
        wrapper = render(
          { position: "left", error: true, size: "large" },
          mount
        );
        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: `2px solid ${baseTheme.colors.error}`,
            outlineOffset: "-2px",
            paddingRight: "26px",
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            borderRightColor: "transparent",
            outline: `2px solid ${baseTheme.colors.error}`,
            outlineOffset: "-2px",
            paddingRight: "26px",
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });
    });
  });

  describe("noLeftBorder", () => {
    it('sets border-left to "none"', () => {
      wrapper = render(
        {
          theme: aegeanTheme,
          size: "default",
          borders: true,
          noLeftBorder: true,
        },
        mount
      );

      assertStyleMatch(
        { borderLeft: "none" },
        wrapper.find(StyledTitleContent)
      );
    });
  });

  describe("noRightBorder", () => {
    it('sets border-right to "none"', () => {
      wrapper = render(
        {
          theme: aegeanTheme,
          size: "default",
          borders: true,
          noRightBorder: true,
        },
        mount
      );

      assertStyleMatch(
        { borderRight: "none" },
        wrapper.find(StyledTitleContent)
      );
    });
  });

  describe("setting alternateStyling prop", () => {
    describe("when TabTitle is selected, focused or hovered", () => {
      it.each(["default", "large"])(
        "applies the correct background-color when size is %s",
        (size) => {
          wrapper = render({ alternateStyling: true, size }, mount);
          assertStyleMatch(
            {
              backgroundColor: "#CCD6DB",
            },
            wrapper.find(StyledTabTitle),
            { modifier: ":focus" }
          );

          assertStyleMatch(
            {
              backgroundColor: "#D9E0E4",
            },
            wrapper.find(StyledTabTitle),
            { modifier: ":hover" }
          );

          assertStyleMatch(
            {
              backgroundColor: "#CCD6DB",
            },
            render(
              { alternateStyling: true, isTabSelected: true, size },
              mount
            ).find(StyledTabTitle)
          );
        }
      );

      it('overrides the border-right-color when position is "left"', () => {
        wrapper = render({ alternateStyling: true, position: "left" }, mount);

        assertStyleMatch(
          {
            borderRightColor: "#CCD6DB",
          },
          wrapper.find(StyledTabTitle),
          { modifier: ":hover" }
        );
      });

      it("applies proper styling when borders prop is true", () => {
        wrapper = render(
          {
            borders: true,
            isTabSelected: true,
            position: "left",
            alternateStyling: true,
          },
          mount
        );

        assertStyleMatch(
          {
            borderTop: `1px solid ${baseTheme.tab.background}`,
            borderLeft: `1px solid ${baseTheme.tab.background}`,
            borderBottom: `1px solid ${baseTheme.tab.background}`,
          },
          wrapper.find(StyledTitleContent)
        );
      });

      it('overrides the border-right-color when position is "left" and isTabSelected is true', () => {
        wrapper = render(
          { alternateStyling: true, position: "left", isTabSelected: true },
          mount
        );

        assertStyleMatch(
          {
            borderRightColor: "#CCD6DB",
          },
          wrapper.find(StyledTabTitle)
        );

        assertStyleMatch(
          {
            borderRightColor: "#CCD6DB",
          },
          wrapper.find(StyledTabTitle),
          { modifier: ":hover" }
        );
      });
    });
  });

  describe("Click event on title content", () => {
    it("calls the handler", () => {
      const onClick = jest.fn();
      const stopPropagation = jest.fn();
      const preventDefault = jest.fn();
      const customEvent = {
        preventDefault,
        stopPropagation,
        target: { dataset: { tabid: "uniqueid1" } },
      };
      wrapper = render({ onClick }, mount);

      wrapper
        .find(StyledTitleContent)
        .props()
        .onClick({ stopPropagation, target: {}, preventDefault });
      expect(onClick).toHaveBeenCalledWith(customEvent);
    });
  });

  describe("customLayout", () => {
    describe('when position is "top"', () => {
      it("renders the correct styles when size is default", () => {
        wrapper = render({ customLayout: <div>foo</div> }, mount);

        expect(
          wrapper.find(StyledTitleContent).props().hasCustomLayout
        ).toEqual(true);

        assertStyleMatch(
          {
            display: "flex",
            padding: "0px",
          },
          wrapper.find(StyledTitleContent)
        );
      });

      it('renders the correct styles when size is "default" and isTabSelected is true', () => {
        wrapper = render(
          { customLayout: <div>foo</div>, isTabSelected: true },
          mount
        );

        expect(
          wrapper.find(StyledTitleContent).props().hasCustomLayout
        ).toEqual(true);

        assertStyleMatch(
          {
            paddingBottom: "0px",
          },
          wrapper.find(StyledTitleContent)
        );
      });

      it('renders the correct styles when size is "default" and has error', () => {
        wrapper = render({ customLayout: <div>foo</div>, error: true }, mount);

        expect(
          wrapper.find(StyledTitleContent).props().hasCustomLayout
        ).toEqual(true);

        assertStyleMatch(
          {
            paddingBottom: "2px",
            paddingRight: "14px",
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            paddingBottom: "2px",
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      it('renders the correct styles when size is "large"', () => {
        wrapper = render(
          { customLayout: <div>foo</div>, size: "large" },
          mount
        );

        expect(
          wrapper.find(StyledTitleContent).props().hasCustomLayout
        ).toEqual(true);

        assertStyleMatch(
          {
            display: "flex",
            padding: "2px",
          },
          wrapper.find(StyledTitleContent)
        );
      });

      it('renders the correct styles when size is "large" and has warning', () => {
        wrapper = render(
          { customLayout: <div>foo</div>, size: "large", warning: true },
          mount
        );

        expect(
          wrapper.find(StyledTitleContent).props().hasCustomLayout
        ).toEqual(true);

        assertStyleMatch(
          {
            paddingBottom: "4px",
            paddingRight: "18px",
          },
          wrapper.find(StyledTitleContent)
        );

        assertStyleMatch(
          {
            paddingBottom: "4px",
          },
          wrapper.find(StyledTitleContent),
          { modifier: ":hover" }
        );
      });

      describe('when position is "left"', () => {
        it('renders the correct styles when size is "default"', () => {
          wrapper = render(
            { customLayout: <div>foo</div>, position: "left" },
            mount
          );

          expect(
            wrapper.find(StyledTitleContent).props().hasCustomLayout
          ).toEqual(true);

          assertStyleMatch(
            {
              display: "flex",
              padding: "0px",
            },
            wrapper.find(StyledTitleContent)
          );
        });

        it('renders the correct styles when size is "default" and isTabSelected is true', () => {
          wrapper = render(
            {
              customLayout: <div>foo</div>,
              position: "left",
              isTabSelected: true,
            },
            mount
          );

          expect(
            wrapper.find(StyledTitleContent).props().hasCustomLayout
          ).toEqual(true);

          assertStyleMatch(
            {
              paddingRight: "0px",
            },
            wrapper.find(StyledTitleContent)
          );
        });

        it('renders the correct styles when size is "default" and has error', () => {
          wrapper = render(
            { customLayout: <div>foo</div>, error: true, position: "left" },
            mount
          );

          expect(
            wrapper.find(StyledTitleContent).props().hasCustomLayout
          ).toEqual(true);

          assertStyleMatch(
            {
              paddingRight: "18px",
            },
            wrapper.find(StyledTitleContent)
          );
        });

        it('renders the correct styles when size is "large"', () => {
          wrapper = render(
            { customLayout: <div>foo</div>, position: "left", size: "large" },
            mount
          );

          expect(
            wrapper.find(StyledTitleContent).props().hasCustomLayout
          ).toEqual(true);

          assertStyleMatch(
            {
              display: "flex",
              padding: "2px",
            },
            wrapper.find(StyledTitleContent)
          );
        });

        it('renders the correct styles when size is "large" and has warning', () => {
          wrapper = render(
            {
              customLayout: <div>foo</div>,
              position: "left",
              size: "large",
              warning: true,
            },
            mount
          );

          expect(
            wrapper.find(StyledTitleContent).props().hasCustomLayout
          ).toEqual(true);

          assertStyleMatch(
            {
              paddingRight: "26px",
            },
            wrapper.find(StyledTitleContent)
          );
        });
      });
    });
  });
});

/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from "react";
import { mount, shallow, MountRendererProps, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import TabTitle from "./__internal__/tab-title/tab-title.component";
import { Tabs, Tab, TabsProps } from ".";
import { TabContext } from "./tab/index";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import StyledTabs, { StyledTabsProps } from "./tabs.style";
import StyledTab from "./tab/tab.style";
import { StyledTabTitleButton } from "./__internal__/tab-title/tab-title.style";
import {
  assertStyleMatch,
  simulate,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import { StyledTabsHeaderWrapper } from "./__internal__/tabs-header/tabs-header.style";
import { DrawerSidebarContext } from "../drawer";
import Textbox from "../textbox";
import NumeralDate from "../numeral-date";
import ValidationIcon, {
  ValidationProps,
} from "../../__internal__/validations";

const mockTarget = (tabid: string) =>
  (({ dataset: { tabid } } as unknown) as HTMLElement);
const mockEvent = (type: string, tabId: string) =>
  (({ type, target: mockTarget(tabId) } as unknown) as React.MouseEvent<
    HTMLButtonElement | HTMLAnchorElement
  >);

function render(
  props: Partial<TabsProps> = {},
  mountOptions: MountRendererProps = {}
) {
  return mount(
    <Tabs {...props}>
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 1"
        tabId="uniqueid1"
      >
        TabContent
      </Tab>
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 2"
        tabId="uniqueid2"
      >
        TabContent
      </Tab>
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 3"
        tabId="uniqueid3"
      >
        TabContent
      </Tab>
    </Tabs>,
    mountOptions
  );
}

function renderStyles(props: StyledTabsProps) {
  return mount(<StyledTabs {...props} />);
}

interface MockValidationProps {
  one?: string | boolean;
  two?: string | boolean;
  three?: string | boolean;
  four?: string | boolean;
}

interface TabChildrenProps extends ValidationProps {
  id: string;
  text?: string | boolean;
}

const TabChildren = ({ id, error, warning, info, text }: TabChildrenProps) => {
  const context = useContext(TabContext);

  useEffect(() => {
    context.setError?.(id, !!error);
    context.setWarning?.(id, !!warning);
    context.setInfo?.(id, !!info);
  }, [id, context, error, warning, info]);

  return (
    <div style={{ height: "28px", width: "50px", backgroundColor: "pink" }}>
      {text}
    </div>
  );
};

type MockWrapperProps = Partial<TabsProps> & {
  errors?: MockValidationProps;
  warnings?: MockValidationProps;
  infos?: MockValidationProps;
};

const MockWrapper = ({
  errors = {},
  warnings = {},
  infos = {},
  validationStatusOverride = undefined,
  renderHiddenTabs = true,
}: MockWrapperProps) => {
  return (
    <Tabs
      validationStatusOverride={validationStatusOverride}
      renderHiddenTabs={renderHiddenTabs}
    >
      <Tab
        title="Tab Title 1"
        tabId="uniqueid1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <TabChildren
          error={errors.one}
          warning={warnings.one}
          info={infos.one}
          id="foo"
        />
        <TabChildren
          error={errors.two}
          warning={warnings.two}
          info={infos.two}
          id="bar"
        />
      </Tab>
      <Tab
        title="Tab Title 2"
        tabId="uniqueid2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <TabChildren
          error={errors.three}
          warning={warnings.three}
          info={infos.three}
          id="baz"
        />
        <TabChildren
          error={errors.four}
          warning={warnings.four}
          info={infos.four}
          id="bax"
        />
      </Tab>
    </Tabs>
  );
};

describe("Tabs", () => {
  testStyledSystemMargin((props) => (
    <Tabs {...props}>
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 1"
        tabId="uniqueid1"
      >
        TabContent
      </Tab>
    </Tabs>
  ));

  testStyledSystemMargin((props) => (
    <Tabs {...props} position="left">
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 1"
        tabId="uniqueid1"
      >
        TabContent
      </Tab>
    </Tabs>
  ));

  // TODO move this test into cypress when FE-4580 is merged
  describe("when children of a Tab update", () => {
    it("does not update the selected tab", () => {
      const MockComponent = ({
        selectedTabId,
        updateChild,
      }: {
        selectedTabId?: string;
        updateChild: boolean;
      }) => {
        return (
          <Tabs selectedTabId={selectedTabId}>
            <Tab title="Tab Title 1" tabId="uniqueid1">
              TabContent
            </Tab>
            <Tab title="Tab Title 2" tabId="uniqueid2">
              {updateChild ? "Foo" : "Bar"}
            </Tab>
          </Tabs>
        );
      };
      const wrapper = mount(
        <MockComponent selectedTabId="uniqueid2" updateChild={false} />
      );

      expect(wrapper.find(StyledTab).last().prop("isTabSelected")).toBe(true);

      wrapper.setProps({ updateChild: true });

      expect(
        wrapper.update().find(StyledTab).last().prop("isTabSelected")
      ).toBe(true);
    });
  });

  describe("when used with NumeralDate as a child", () => {
    it("should not throw", () => {
      expect(() => {
        mount(
          <Tabs align="left" position="top">
            <Tab tabId="tab-1" title="Tab 1" key="tab-1">
              <NumeralDate
                dateFormat={["dd", "mm", "yyyy"]}
                error="Tooltip position set to top"
                label="As string"
                tooltipPosition="top"
              />
              <Textbox error="error" />
            </Tab>
          </Tabs>
        );
      }).not.toThrow();
    });
  });

  describe("when `headerWidth` is provided", () => {
    describe.each(["35%", "100px", "5em"])(
      "and value of %s is provided",
      (headerWidth) => {
        it("should render correct `width` in `TabsHeader` component, and `Tab` `width` should be `auto`", () => {
          const wrapper = mount(
            <Tabs position="left" headerWidth={headerWidth}>
              <Tab title="Tab Title 1" tabId="uniqueid1">
                TabContent
              </Tab>
            </Tabs>
          );

          assertStyleMatch(
            {
              width: headerWidth,
            },
            wrapper,
            {
              modifier: `${StyledTabsHeaderWrapper}`,
            }
          );

          assertStyleMatch(
            {
              width: "auto",
            },
            wrapper,
            {
              modifier: `${StyledTab}`,
            }
          );
        });
      }
    );
  });

  describe('when `headerWidth` is provided, and `position="top"`', () => {
    it("should render console error", () => {
      const consoleSpy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => {});

      mount(
        <Tabs position="top" headerWidth="500px">
          <Tab title="Tab Title 1" tabId="uniqueid1">
            TabContent
          </Tab>
        </Tabs>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        "Invalid usage of prop headerWidth in Tabs. The headerWidth can be used only if position is set to left"
      );

      consoleSpy.mockRestore();
    });
  });

  describe("when passing custom className as a prop", () => {
    it("adds it to the classList", () => {
      const wrapper = render({ className: "class" });
      expect(wrapper.exists(".class")).toEqual(true);
    });
  });

  describe('When position is "left"', () => {
    it("applies proper styling", () => {
      const wrapper = renderStyles({ position: "left" });
      assertStyleMatch(
        {
          display: "flex",
          width: "100%",
        },
        wrapper
      );
    });
  });

  describe('When "selectedTabId" is passed a valid "tabId"', () => {
    it("displays the specified Tab", () => {
      const wrapper = render({ selectedTabId: "uniqueid2" });

      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(true);
    });
  });

  describe("When renderHiddenTabs", () => {
    describe("is false", () => {
      it("renders only the currently visible tab", () => {
        const tab = mount(
          <Tabs renderHiddenTabs={false}>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 1"
              tabId="uniqueid1"
            >
              <div id="foo" />
              <div id="bar" />
            </Tab>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 2"
              tabId="uniqueid2"
            >
              <div id="baz" />
              <div id="bax" />
            </Tab>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 3"
              tabId="uniqueid3"
            >
              <div id="baz" />
              <div id="bax" />
            </Tab>
          </Tabs>
        ).find(Tab);

        expect(tab).toHaveLength(1);
        expect(tab.props().isTabSelected).toEqual(true);
        expect(tab.props().title).toEqual("Tab Title 1");
        expect(tab.props().tabId).toEqual("uniqueid1");
      });

      it.each(["error", "warning", "info"] as const)(
        "adds the correct %s state to the tab header",
        (validation) => {
          const validationProp = {
            [`${validation}s`]: { one: true },
          };
          const tabTitle = mount(
            <MockWrapper {...validationProp} renderHiddenTabs={false} />
          ).find(TabTitle);

          expect(tabTitle.at(0).props()[validation]).toEqual(true);
          expect(tabTitle.at(1).props()[validation]).toEqual(false);
        }
      );
    });

    describe("is true", () => {
      it("returns an array of all Tab components with the first selected", () => {
        const tabs = mount(
          <Tabs renderHiddenTabs>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 1"
              tabId="uniqueid1"
            >
              <div id="foo" />
              <div id="bar" />
            </Tab>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 2"
              tabId="uniqueid2"
            >
              <div id="baz" />
              <div id="bax" />
            </Tab>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 3"
              tabId="uniqueid3"
            >
              <div id="baz" />
              <div id="bax" />
            </Tab>
          </Tabs>
        ).find(Tab);

        expect(tabs).toHaveLength(3);
        expect(tabs.at(0).props().isTabSelected).toEqual(true);
        expect(tabs.at(1).props().isTabSelected).toEqual(false);
        expect(tabs.at(2).props().isTabSelected).toEqual(false);
      });
    });
  });

  describe("When a TabTitle has click event", () => {
    it("does nothing if triggered by keydown", () => {
      const wrapper = render();
      act(() => {
        wrapper
          .find(TabTitle)
          .at(1)
          .props()
          .onClick(mockEvent("keydown", "uniqueid2"));
      });
      wrapper.update();
      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(false);
    });

    it("updates to make the associated Tab visible", () => {
      const wrapper = render();
      act(() => {
        wrapper
          .find(TabTitle)
          .at(1)
          .props()
          .onClick(mockEvent("click", "uniqueid2"));
      });
      wrapper.update();
      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(true);
    });

    it('calls the "onTabChange" callback if one is passed on click of a TabTitle', () => {
      const onTabChange = jest.fn();
      const wrapper = render({ onTabChange });
      act(() => {
        wrapper
          .find(TabTitle)
          .at(1)
          .props()
          .onClick(mockEvent("click", "uniqueid2"));
      });
      wrapper.update();
      expect(onTabChange).toHaveBeenCalledTimes(1);
      expect(onTabChange).toHaveBeenCalledWith("uniqueid2");
    });

    it("updates the selected tab when a new id is passed via the 'selectedTabId' prop", () => {
      const wrapper = render({ selectedTabId: "uniqueid1" });
      wrapper.setProps({ selectedTabId: "uniqueid2" });
      wrapper.update();
      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(true);
      wrapper.setProps({ selectedTabId: "uniqueid1" });
      wrapper.update();
      expect(wrapper.find(Tab).at(0).props().isTabSelected).toEqual(true);
    });

    it("blurs the selected TabTitle when a new id is passed via the selectedTabId prop", () => {
      const container = document.createElement("div");
      container.id = "container";
      document.body.appendChild(container);

      const wrapper = render(
        { selectedTabId: "uniqueid1" },
        {
          attachTo: document.querySelector("#container") as HTMLElement,
        }
      );

      act(() => {
        (wrapper
          .find(StyledTabTitleButton)
          .at(0)
          .getDOMNode() as HTMLElement).focus();
      });

      expect(document.activeElement).toBe(
        wrapper.find(StyledTabTitleButton).at(0).getDOMNode()
      );

      wrapper.setProps({ selectedTabId: "uniqueid2" });
      wrapper.update();

      expect(document.activeElement).not.toBe(
        wrapper.find(StyledTabTitleButton).at(0).getDOMNode()
      );

      wrapper.detach();
      document.body.removeChild(container);
    });

    it('only calls the "onTabChange" callback when visible tabId does not match new tabId', () => {
      const onTabChange = jest.fn();
      const wrapper = render({ onTabChange, selectedTabId: "uniqueid1" });
      act(() => {
        wrapper
          .find(TabTitle)
          .at(1)
          .props()
          .onClick(mockEvent("click", "uniqueid2"));
      });
      wrapper.update();
      wrapper.setProps({ selectedTabId: "uniqueid2" });
      wrapper.update();
      expect(onTabChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("When a key is pressed on TabTitle", () => {
    let container: HTMLDivElement | null;
    let wrapper: ReactWrapper;

    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
    });

    afterEach(() => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
    });

    const getTabNode = (index: number): HTMLButtonElement =>
      wrapper
        .find(StyledTabTitleButton)
        .at(index)
        .getDOMNode() as HTMLButtonElement;

    describe('and the component has position "top" (default)', () => {
      it.each([0, 1, 2])(
        "focuses the next TabTitle when the right key is pressed",
        (index) => {
          wrapper = render({}, { attachTo: container });
          act(() => {
            simulate.keydown.pressArrowRight(wrapper.find(TabTitle).at(index));
          });
          wrapper.update();
          const newIndex = index === 2 ? 0 : index + 1;
          expect(getTabNode(newIndex)).toEqual(document.activeElement);
        }
      );

      it.each([0, 2, 1])(
        "focuses the previous TabTitle when the left key is pressed",
        (index) => {
          wrapper = render({}, { attachTo: container });
          act(() => {
            simulate.keydown.pressArrowLeft(wrapper.find(TabTitle).at(index));
          });
          wrapper.update();
          const newIndex = index === 0 ? 2 : index - 1;
          expect(getTabNode(newIndex)).toEqual(document.activeElement);
        }
      );
    });

    describe('and the component has position "left"', () => {
      it.each([0, 1, 2])(
        "focuses the next TabTitle when the down key is pressed",
        (index) => {
          wrapper = render({ position: "left" }, { attachTo: container });
          act(() => {
            simulate.keydown.pressArrowDown(wrapper.find(TabTitle).at(index));
          });
          wrapper.update();
          const newIndex = index === 2 ? 0 : index + 1;
          expect(getTabNode(newIndex)).toEqual(document.activeElement);
        }
      );

      it.each([0, 2, 1])(
        "focuses the previous TabTitle when the up key is pressed",
        (index) => {
          wrapper = render({ position: "left" }, { attachTo: container });
          act(() => {
            simulate.keydown.pressArrowUp(wrapper.find(TabTitle).at(index));
          });
          wrapper.update();
          const newIndex = index === 0 ? 2 : index - 1;
          expect(getTabNode(newIndex)).toEqual(document.activeElement);
        }
      );
    });

    it.each([0, 1, 2])(
      "activates the Tab when the enter key is pressed",
      (index) => {
        wrapper = render({}, { attachTo: container });
        act(() => {
          // Click event is used because thats the event handler that is used in the component
          // In the browser the click event is fired when the enter key is pressed
          // Enzyme does not simulate this behaviour correctly
          wrapper.find(StyledTabTitleButton).at(index).simulate("click");
        });
        wrapper.update();
        expect(wrapper.find(Tab).at(index).props().isTabSelected).toEqual(true);
      }
    );

    it.each([0, 1, 2])("does nothing if key is not an arrow key", (index) => {
      wrapper = render({}, { attachTo: container });
      getTabNode(0).focus();
      act(() => {
        simulate.keydown.pressD(wrapper.find(TabTitle).at(index));
      });
      wrapper.update();
      expect(getTabNode(0)).toEqual(document.activeElement);
    });
  });

  describe("when in Drawer sidebar", () => {
    let container: HTMLElement | null;
    let wrapper: ReactWrapper;

    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);

      wrapper = mount(
        <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
          <Tabs>
            <Tab
              title="Tab Title 1"
              tabId="uniqueid1"
              errorMessage=""
              warningMessage=""
              infoMessage=""
            />
            <Tab
              title="Tab Title 2"
              tabId="uniqueid2"
              errorMessage=""
              warningMessage=""
              infoMessage=""
            />
            <Tab
              title="Tab Title 3"
              tabId="uniqueid3"
              errorMessage=""
              warningMessage=""
              infoMessage=""
            />
          </Tabs>
        </DrawerSidebarContext.Provider>,
        {
          attachTo: document.getElementById("enzymeContainer"),
        }
      );
    });

    afterEach(() => {
      if (container?.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;

      wrapper?.unmount();
    });

    it.each([0, 1, 2])(
      "updates to make the next Tab visible when the down key is pressed",
      (index) => {
        act(() => {
          simulate.keydown.pressArrowDown(wrapper.find(TabTitle).at(index));
        });
        wrapper.update();
        const newIndex = index === 2 ? 0 : index + 1;

        expect(
          wrapper.find(StyledTabTitleButton).at(newIndex).getDOMNode()
        ).toBeFocused();
      }
    );

    it.each([0, 1, 2])(
      "updates to make the next Tab visible when the up key is pressed",
      (index) => {
        act(() => {
          simulate.keydown.pressArrowUp(wrapper.find(TabTitle).at(index));
        });
        wrapper.update();
        const newIndex = index === 0 ? 2 : index - 1;

        expect(
          wrapper.find(StyledTabTitleButton).at(newIndex).getDOMNode()
        ).toBeFocused();
      }
    );
  });
});

describe("With one Tab", () => {
  it("renders as the visible tab", () => {
    const tab = mount(
      <Tabs renderHiddenTabs={false}>
        <Tab
          errorMessage=""
          warningMessage=""
          infoMessage=""
          title="Tab Title 1"
          tabId="uniqueid1"
        >
          <div />
        </Tab>
      </Tabs>
    ).find(Tab);

    expect(tab.props().isTabSelected).toEqual(true);
    expect(tab.props().title).toEqual("Tab Title 1");
    expect(tab.props().tabId).toEqual("uniqueid1");
  });
});

describe("Validation", () => {
  const updateProps = (
    wrapper: ReactWrapper<MockWrapperProps>,
    props: MockWrapperProps
  ) => {
    wrapper.setProps({
      errors: { ...wrapper.props().errors, ...props.errors },
      warnings: { ...wrapper.props().warnings, ...props.warnings },
      infos: { ...wrapper.props().infos, ...props.infos },
    });
    wrapper.update();
  };

  describe("When a Tab child has an error", () => {
    it('sets "tabHasError" to false when a Tab has no errors', () => {
      const tabTitle = mount(<MockWrapper />).find(TabTitle);

      expect(tabTitle.at(0).props().error).toEqual(false);
      expect(tabTitle.at(1).props().error).toEqual(false);
    });

    it('sets "tabHasError" to true when a Tab has errors', () => {
      const tabTitle = mount(<MockWrapper errors={{ one: true }} />).find(
        TabTitle
      );

      expect(tabTitle.at(0).props().error).toEqual(true);
      expect(tabTitle.at(1).props().error).toEqual(false);
    });

    it('sets "tabHasError" to true for any Tab that has an error', () => {
      const tabTitle = mount(
        <MockWrapper errors={{ one: true, three: true }} />
      ).find(TabTitle);

      expect(tabTitle.at(0).props().error).toEqual(true);
      expect(tabTitle.at(1).props().error).toEqual(true);
    });

    it('maintains "tabHasError" status when Tab children update', () => {
      const wrapper = mount(
        <MockWrapper errors={{ one: true, three: true }} />
      );
      updateProps(wrapper, { errors: { two: true, three: false } });
      let tabTitle = wrapper.find(TabTitle);
      expect(tabTitle.at(0).props().error).toEqual(true);
      expect(tabTitle.at(1).props().error).toEqual(false);
      updateProps(wrapper, { errors: { one: false, two: false } });
      tabTitle = wrapper.find(TabTitle);
      expect(tabTitle.at(0).props().error).toEqual(false);
    });

    it('does not set warnings and infos if "tabHasErrors" is true', () => {
      const tabTitle = mount(
        <MockWrapper
          errors={{ one: true, three: true }}
          warnings={{ one: true, three: true }}
          infos={{ one: true, three: true }}
        />
      ).find(TabTitle);

      expect(tabTitle.at(0).props().error).toEqual(true);
      expect(tabTitle.at(1).props().error).toEqual(true);
      expect(tabTitle.at(0).props().warning).toEqual(false);
      expect(tabTitle.at(1).props().warning).toEqual(false);
      expect(tabTitle.at(0).props().info).toEqual(false);
      expect(tabTitle.at(1).props().info).toEqual(false);
    });
  });

  describe("When a Tab child has an error and a warning", () => {
    it('sets "tabHasWarning" to false when a Tab has no warnings', () => {
      const tabTitle = mount(<MockWrapper />).find(TabTitle);

      expect(tabTitle.at(0).props().warning).toEqual(false);
      expect(tabTitle.at(1).props().warning).toEqual(false);
    });

    it('does not set "tabHasWarning" when "tabHasError" is true', () => {
      const tabTitle = mount(
        <MockWrapper errors={{ one: true }} warnings={{ one: true }} />
      ).find(TabTitle);

      expect(tabTitle.at(0).props().error).toEqual(true);
      expect(tabTitle.at(0).props().warning).toEqual(false);
    });
  });

  describe("When a Tab child has a warning and no errors", () => {
    it('sets "tabHasWarning" is true and "tabHasError" is falsy', () => {
      const tabTitle = mount(<MockWrapper warnings={{ one: true }} />).find(
        TabTitle
      );

      expect(tabTitle.at(0).props().warning).toEqual(true);
      expect(tabTitle.at(1).props().warning).toEqual(false);
    });

    it('sets "tabHasWarning" for each Tab that has warning and "tabHasError" is falsy', () => {
      const tabTitle = mount(
        <MockWrapper warnings={{ one: true, three: true }} />
      ).find(TabTitle);

      expect(tabTitle.at(0).props().warning).toEqual(true);
      expect(tabTitle.at(1).props().warning).toEqual(true);
    });

    it('maintains "tabHasWarning" status when Tab children update', () => {
      const wrapper = mount(
        <MockWrapper warnings={{ one: true, three: true }} />
      );
      updateProps(wrapper, { warnings: { two: true, three: false } });
      let tabTitle = wrapper.find(TabTitle);
      expect(tabTitle.at(0).props().warning).toEqual(true);
      expect(tabTitle.at(1).props().warning).toEqual(false);
      updateProps(wrapper, { warnings: { one: false, two: false } });
      tabTitle = wrapper.find(TabTitle);
      expect(tabTitle.at(0).props().warning).toEqual(false);
    });
  });

  describe("When a Tab child has an info and no errors or warnings", () => {
    it('sets "tabHasWarning" is true and "tabHasError" is falsy', () => {
      const tabTitle = mount(<MockWrapper infos={{ one: true }} />).find(
        TabTitle
      );

      expect(tabTitle.at(0).props().info).toEqual(true);
      expect(tabTitle.at(1).props().info).toEqual(false);
    });

    it('sets "tabHasInfo" for each Tab that has info and "tabHasError" and "tabHasWarning" are falsy', () => {
      const tabTitle = mount(
        <MockWrapper infos={{ one: true, three: true }} />
      ).find(TabTitle);

      expect(tabTitle.at(0).props().info).toEqual(true);
      expect(tabTitle.at(1).props().info).toEqual(true);
    });

    it('maintains "tabHasInfo" status when Tab children update', () => {
      const wrapper = mount(<MockWrapper infos={{ one: true, three: true }} />);
      updateProps(wrapper, { infos: { two: true, three: false } });
      let tabTitle = wrapper.find(TabTitle);
      expect(tabTitle.at(0).props().info).toEqual(true);
      expect(tabTitle.at(1).props().info).toEqual(false);
      updateProps(wrapper, { infos: { one: false, two: false } });
      tabTitle = wrapper.find(TabTitle);
      expect(tabTitle.at(0).props().info).toEqual(false);
    });
  });

  describe("custom targeting", () => {
    it("supports overriding the targeted content", () => {
      const wrapper = mount(
        <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
          <Tabs>
            <Tab
              title="Tab Title 1"
              tabId="uniqueid1"
              errorMessage=""
              warningMessage=""
              infoMessage=""
            >
              TabContent
            </Tab>
          </Tabs>
        </DrawerSidebarContext.Provider>
      );
      act(() => {
        wrapper.find(TabTitle).props().onClick(mockEvent("click", "uniqueid1"));
      });
      expect(wrapper.find(Tab).exists()).toEqual(false);
    });
  });

  describe("validation status overrides", () => {
    it('sets "tabHasError" to true when override is set', () => {
      const tabTitle = mount(
        <MockWrapper
          errors={{ one: false, three: true }}
          validationStatusOverride={{
            uniqueid1: { error: true },
            uniqueid2: { error: false },
          }}
        />
      ).find(TabTitle);

      expect(tabTitle.at(0).props().error).toEqual(true);
      expect(tabTitle.at(1).props().error).toEqual(false);
    });

    it('sets "tabHasWarning" to true when override is set', () => {
      const tabTitle = mount(
        <MockWrapper
          warnings={{ one: false, three: true }}
          validationStatusOverride={{
            uniqueid1: { warning: true },
            uniqueid2: { warning: false },
          }}
        />
      ).find(TabTitle);

      expect(tabTitle.at(0).props().warning).toEqual(true);
      expect(tabTitle.at(1).props().warning).toEqual(false);
    });

    it('sets "tabHasInfo" to true when override is set', () => {
      const tabTitle = mount(
        <MockWrapper
          infos={{ one: false, three: true }}
          validationStatusOverride={{
            uniqueid1: { info: true },
            uniqueid2: { info: false },
          }}
        />
      ).find(TabTitle);

      expect(tabTitle.at(0).props().info).toEqual(true);
      expect(tabTitle.at(1).props().info).toEqual(false);
    });
  });

  describe("Keyboard behaviour", () => {
    let container: HTMLElement | null;
    let wrapper: ReactWrapper;
    const tabTitles = ["tab-1", "tab-2", "tab-3"];

    const ConditionalChildrenMock = () => {
      const [showAllTabs, setShowAllTabs] = React.useState(true);

      const generateTab = (tabTitle: string) => (
        <Tab title={tabTitle} tabId={tabTitle} key={tabTitle}>
          {tabTitle}
        </Tab>
      );

      return (
        <>
          <button
            id="foo"
            type="button"
            onClick={() => setShowAllTabs((prev) => !prev)}
          >
            Toggle children
          </button>
          <Tabs>
            {!showAllTabs && generateTab(tabTitles[0])}
            {showAllTabs && tabTitles.map((tabTitle) => generateTab(tabTitle))}
          </Tabs>
        </>
      );
    };

    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);

      wrapper = mount(<ConditionalChildrenMock />, {
        attachTo: document.getElementById("enzymeContainer"),
      });
    });

    afterEach(() => {
      if (container?.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
    });

    const runFocusExpectations = (keyDown: string, array: number[]) =>
      array.forEach((index) => {
        const child = wrapper.update().find(StyledTabTitleButton).at(index);
        expect(child.getDOMNode()).toBeFocused();
        simulate.keydown[keyDown](child);
      });

    const toggleChildren = () => {
      act(() => {
        wrapper.find("#foo").simulate("click");
      });

      expect(wrapper.update().find(StyledTabTitleButton).length).toEqual(1);

      act(() => {
        wrapper.find("#foo").simulate("click");
      });

      expect(wrapper.update().find(StyledTabTitleButton).length).toEqual(3);
    };

    it("is consistent when navigating with the arrow keys and the composition of the children changes", () => {
      (wrapper
        .find(StyledTabTitleButton)
        .first()
        .getDOMNode() as HTMLElement).focus();

      runFocusExpectations("pressArrowLeft", [0, 2, 1, 0, 2]);

      toggleChildren();

      (wrapper
        .find(StyledTabTitleButton)
        .first()
        .getDOMNode() as HTMLElement).focus();

      runFocusExpectations("pressArrowLeft", [0, 2, 1, 0, 2]);

      toggleChildren();

      (wrapper
        .find(StyledTabTitleButton)
        .first()
        .getDOMNode() as HTMLElement).focus();

      runFocusExpectations("pressArrowRight", [0, 1, 2, 0]);
    });
  });
});

describe("tags", () => {
  describe("on component", () => {
    const wrapper = shallow(
      <Tabs data-element="bar" data-role="baz">
        <Tab
          tabId="1"
          title="Test"
          errorMessage=""
          warningMessage=""
          infoMessage=""
        />
      </Tabs>
    ).find(StyledTabs);

    it("include correct component, element and role data tags", () => {
      rootTagTest(wrapper, "tabs", "bar", "baz");
    });
  });

  it("when child Tab has `data-role` prop set, renders corresponding tab title with that `data-role`", () => {
    const dataRole = "foobar";
    const wrapper = mount(
      <Tabs>
        <Tab
          titleProps={{
            "data-role": dataRole,
          }}
          title="Tab Title 1"
          tabId="uniqueid"
        >
          Content for Tab 1
        </Tab>
      </Tabs>
    );
    expect(wrapper.find(TabTitle).prop("data-role")).toEqual(dataRole);
  });

  describe("when children of Tab have validation failures", () => {
    const MockComponent = ({
      show = true,
      error,
      warning,
      info,
    }: ValidationProps & { show?: boolean }) => (
      <Tabs data-element="bar" data-role="baz">
        <Tab
          tabId="1"
          title="Test"
          errorMessage=""
          warningMessage=""
          infoMessage=""
        >
          {show && (
            <Textbox
              value="foo"
              onChange={() => {}}
              error={error}
              warning={warning}
              info={info}
            />
          )}
        </Tab>
      </Tabs>
    );

    it.each(["error", "warning", "info"])(
      "any %s failure in a child component is correctly reported in the TabTitle",
      (validation) => {
        const validationProp = { [validation]: true };
        const wrapper = mount(<MockComponent {...validationProp} />);

        expect(wrapper.find(ValidationIcon).exists()).toBe(true);

        wrapper.setProps({ show: false });
        wrapper.update();
        expect(wrapper.update().find(ValidationIcon).exists()).toBe(false);
      }
    );
  });

  describe.each(["error", "warning", "info"])(
    "showValidationsSummary",
    (validation) => {
      it(`passes the ${validation} validation failures from the child inputs to the Tab's title when they are strings`, () => {
        const message = mount(
          <Tabs data-element="bar" data-role="baz" showValidationsSummary>
            <Tab tabId="1" title="Test">
              <Textbox
                value="foo"
                onChange={() => {}}
                {...{ [validation]: validation }}
              />
              <Textbox
                value="foo"
                onChange={() => {}}
                {...{ [validation]: validation }}
              />
              <Textbox
                value="foo"
                onChange={() => {}}
                {...{ [validation]: validation }}
              />
            </Tab>
          </Tabs>
        )
          .find(TabTitle)
          .prop(`${validation}Message`);

        expect(message).toEqual(
          `• ${validation}\n• ${validation}\n• ${validation}`
        );
      });

      it(`does not pass the ${validation} validation failures from the child inputs to the Tab's title when they are not strings`, () => {
        const message = mount(
          <Tabs data-element="bar" data-role="baz" showValidationsSummary>
            <Tab tabId="1" title="Test">
              <Textbox
                value="foo"
                onChange={() => {}}
                {...{ [validation]: validation }}
              />
              <Textbox
                value="foo"
                onChange={() => {}}
                {...{ [validation]: validation }}
              />
              <Textbox
                value="foo"
                onChange={() => {}}
                {...{ [validation]: true }}
              />
            </Tab>
          </Tabs>
        )
          .find(TabTitle)
          .prop(`${validation}Message`);

        expect(message).toEqual(`• ${validation}\n• ${validation}`);
      });

      it(`does not add a "•" when there is only one string ${validation} validation failure`, () => {
        const message = mount(
          <Tabs data-element="bar" data-role="baz" showValidationsSummary>
            <Tab tabId="1" title="Test">
              <Textbox
                value="foo"
                onChange={() => {}}
                {...{ [validation]: validation }}
              />
            </Tab>
          </Tabs>
        )
          .find(TabTitle)
          .prop(`${validation}Message`);

        expect(message).toEqual(validation);
      });

      it(`passes the ${validation}Message if there is only boolean ${validation} validation failures`, () => {
        const message = mount(
          <Tabs data-element="bar" data-role="baz" showValidationsSummary>
            <Tab
              tabId="1"
              title="Test"
              {...{ [`${validation}Message`]: `${validation} message` }}
            >
              <Textbox
                value="foo"
                onChange={() => {}}
                {...{ [validation]: true }}
              />
              <Textbox
                value="foo"
                onChange={() => {}}
                {...{ [validation]: true }}
              />
              <Textbox
                value="foo"
                onChange={() => {}}
                {...{ [validation]: true }}
              />
            </Tab>
          </Tabs>
        )
          .find(TabTitle)
          .prop(`${validation}Message`);

        expect(message).toEqual(`${validation} message`);
      });
    }
  );
});

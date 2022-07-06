/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { Transition } from "react-transition-group";
import {
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerOpenIcon,
  PopoverContainerWrapperStyle,
  PopoverContainerTitleStyle,
} from "./popover-container.style";
import StyledIcon from "../icon/icon.style";
import PopoverContainer, {
  PopoverContainerProps,
  RenderOpenProps,
  RenderCloseProps,
} from "./popover-container.component";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../__spec_helper__/test-utils";
import Icon from "../icon";
import guid from "../../__internal__/utils/helpers/guid";

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => "guid-123");

const render = (props?: PopoverContainerProps, renderMethod = mount) => {
  return renderMethod(
    <PopoverContainer title="PopoverContainerSettings" {...props} />
  );
};

const renderAttached = (
  props?: PopoverContainerProps,
  renderMethod = mount
) => {
  return renderMethod(
    <PopoverContainer title="PopoverContainerSettings" {...props} />,
    { attachTo: document.getElementById("enzymeContainer") }
  );
};

describe("PopoverContainer", () => {
  testStyledSystemPadding(
    (props) => (
      <PopoverContainer open title="PopoverContainerSettings" {...props}>
        <div id="myChildren">children</div>
      </PopoverContainer>
    ),
    { p: "16px 24px" },
    (wrapper) => wrapper.find(PopoverContainerContentStyle)
  );

  jest.useFakeTimers();
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = render();
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  it("should render correct", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render correct title", () => {
    wrapper = render({ open: true });
    expect(wrapper.find(PopoverContainerTitleStyle).text()).toBe(
      "PopoverContainerSettings"
    );
  });

  it("should render correct `aria-describedby", () => {
    wrapper = render({ open: true, ariaDescribedBy: "myAriaDescribedBy" });
    expect(
      wrapper.find(PopoverContainerContentStyle).prop("aria-describedby")
    ).toBe("myAriaDescribedBy");
  });

  it("should render correct children", () => {
    wrapper = mount(
      <PopoverContainer title="foo" open>
        <div id="myChildren">children</div>
      </PopoverContainer>
    );

    expect(wrapper.find("#myChildren").exists()).toBe(true);
  });

  it("should appear and mount when the component opens", () => {
    expect(wrapper.find(Transition).props().appear).toBe(true);
    expect(wrapper.find(Transition).props().mountOnEnter).toBe(true);
  });

  it("should unmount after 300ms when the component closes", () => {
    expect(wrapper.find(Transition).props().timeout).toEqual({ exit: 300 });
    expect(wrapper.find(Transition).props().unmountOnExit).toBe(true);
  });

  it("should transition when the component opens and closes", () => {
    expect(wrapper.find(Transition).props().in).toBe(false);

    act(() => {
      wrapper.find(PopoverContainerOpenIcon).props().onAction();
    });

    wrapper.update();

    expect(wrapper.find(Transition).props().in).toBe(true);
  });

  it("should render correct `id` based on `guid()`", () => {
    wrapper = render({ open: true });
    expect(wrapper.find(PopoverContainerTitleStyle).props().id).toBe(
      "PopoverContainer_guid-123"
    );
  });

  it("should render correct `data-element` related to the component", () => {
    wrapper = render({ open: true });
    expect(wrapper.find(PopoverContainerTitleStyle).prop("data-element")).toBe(
      "popover-container-title"
    );
  });

  it("should render correct `data-component` related to the component", () => {
    expect(
      wrapper.find(PopoverContainerWrapperStyle).prop("data-component")
    ).toBe("popover-container");
  });

  it("should set the id for `PopoverContainerTitleStyle` when title has a value", () => {
    wrapper = render({ open: true });
    expect(wrapper.find(PopoverContainerTitleStyle).props().id).toBe(
      "PopoverContainer_guid-123"
    );
    expect(
      wrapper.find(PopoverContainerWrapperStyle).prop("aria-labelledby")
    ).toBe("PopoverContainer_guid-123");
  });

  it("should not set the id for `PopoverContainerTitleStyle` when title has no value", () => {
    wrapper = render({
      open: true,
      title: undefined,
      openButtonAriaLabel: "foo",
      containerAriaLabel: "bar",
    });
    expect(wrapper.find(PopoverContainerTitleStyle).props().id).toBe(undefined);
  });

  it("should let opening button to be focusable if popover is closed", () => {
    wrapper = render({ open: false });

    expect(wrapper.find("button").props().tabIndex).toBe(0);
  });

  it("`position` should be right by default", () => {
    act(() => {
      wrapper.find(PopoverContainerOpenIcon).props().onAction();
    });

    wrapper.update();

    expect(wrapper.find(PopoverContainerContentStyle).props().position).toBe(
      "right"
    );
  });

  it("`shouldCoverButton` should be false by default", () => {
    act(() => {
      wrapper.find(PopoverContainerOpenIcon).props().onAction();
    });

    wrapper.update();

    expect(
      wrapper.find(PopoverContainerContentStyle).props().shouldCoverButton
    ).toBe(false);
  });

  describe("if is controlled", () => {
    describe("and is opened", () => {
      describe("and `onClose` prop do not exists", () => {
        it("should not error when open button is clicked and no `onClose` callback is provided", () => {
          expect(() => {
            wrapper = render({
              open: true,
            });

            wrapper.find(PopoverContainerOpenIcon).props().onAction();
          }).not.toThrow();
        });
      });

      describe("and `onClose` prop is provided", () => {
        it("should fire `onClose` callback if open button is clicked", () => {
          const onCloseFn = jest.fn();
          wrapper = render({
            open: true,
            onClose: onCloseFn,
          });

          wrapper.find(PopoverContainerOpenIcon).props().onAction();
          expect(onCloseFn).toHaveBeenCalled();
        });

        it("should fire `onClose` callback if close button is clicked", () => {
          const onCloseFn = jest.fn();
          wrapper = render({
            open: true,
            onClose: onCloseFn,
          });

          wrapper.find(PopoverContainerCloseIcon).props().onAction();
          expect(onCloseFn).toHaveBeenCalled();
        });
      });
    });

    describe("and is closed", () => {
      describe("and `onOpen` prop is provided", () => {
        it("should fire `onOpen` callback if open button is clicked", () => {
          const onOpenFn = jest.fn();
          wrapper = render({
            open: false,
            onOpen: onOpenFn,
          });

          wrapper.find(PopoverContainerOpenIcon).props().onAction();
          expect(onOpenFn).toHaveBeenCalled();
        });
      });

      describe("and `onOpen` prop is not provided", () => {
        it("should not error when open button is clicked if no `onOpen` callback is provided", () => {
          expect(() => {
            wrapper = render({
              open: false,
            });

            wrapper.find(PopoverContainerOpenIcon).props().onAction();
          }).not.toThrow();
        });
      });
    });
  });

  describe("if is not controlled", () => {
    it("should render default open button with the expected prop values", () => {
      wrapper = render();
      const openIcon = wrapper.find(PopoverContainerOpenIcon);

      expect(openIcon.exists()).toBe(true);
      expect(openIcon.find(Icon).props()).toEqual({ type: "settings" });
      expect(openIcon.prop("aria-haspopup")).toEqual(true);
      expect(openIcon.prop("tabIndex")).toEqual(0);
      expect(openIcon.prop("aria-label")).toEqual("PopoverContainerSettings");
    });

    it("should render default close button", () => {
      wrapper = render();

      act(() => {
        wrapper.find(PopoverContainerOpenIcon).props().onAction();
      });

      wrapper.update();
      expect(wrapper.find(PopoverContainerCloseIcon).exists()).toBe(true);
    });

    it("should open popover if open button is clicked", () => {
      wrapper = render();

      act(() => {
        wrapper.find(PopoverContainerOpenIcon).props().onAction();
      });

      wrapper.update();
      expect(wrapper.find(PopoverContainerOpenIcon).props().tabIndex).toBe(-1);
      expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(true);
    });

    describe("and custom component is provided as an opening button", () => {
      interface MyOpenButtonProps extends RenderOpenProps {
        children: React.ReactNode;
      }

      const MyOpenButton = React.forwardRef<
        HTMLButtonElement,
        MyOpenButtonProps
      >((props: MyOpenButtonProps, ref) => (
        <button type="button" {...props} ref={ref} />
      ));

      MyOpenButton.displayName = "MyOpenButton";

      let container: HTMLDivElement | null;

      beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
        wrapper = renderAttached({
          title: "render props",
          // eslint-disable-next-line react/display-name
          renderOpenComponent: ({
            tabIndex,
            "data-element": dataElement,
            "aria-label": ariaLabel,
            ref,
            onClick,
            id,
          }) => (
            <MyOpenButton
              tabIndex={tabIndex}
              data-element={dataElement}
              aria-label={ariaLabel}
              ref={ref}
              onClick={onClick}
              id={id}
            >
              button
            </MyOpenButton>
          ),
        });
      });

      afterEach(() => {
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }

        container = null;
      });

      it("should be focused when user clicks the close icon", () => {
        act(() => {
          wrapper
            .find(MyOpenButton)
            .props()
            .onClick({} as React.MouseEvent<HTMLElement>);
        });

        wrapper.update();

        act(() => {
          wrapper.find(PopoverContainerCloseIcon).props().onAction();
        });

        wrapper.update();

        expect(wrapper.find(MyOpenButton)).toBeFocused();
      });

      it("should render correct props", () => {
        expect(wrapper.find(MyOpenButton).props().tabIndex).toBe(0);
        expect(wrapper.find(MyOpenButton).prop("data-element")).toBe(
          "popover-container-open-component"
        );
        expect(wrapper.find(MyOpenButton).prop("aria-label")).toBe(
          "render props"
        );
      });

      it("should not be focused if `ref` is not provided", () => {
        wrapper = render({
          title: "render props",
          // eslint-disable-next-line react/display-name
          renderOpenComponent: ({
            tabIndex,
            "data-element": dataElement,
            "aria-label": ariaLabel,
            onClick,
            isOpen,
          }) => (
            <MyOpenButton
              tabIndex={tabIndex}
              data-element={dataElement}
              aria-label={ariaLabel}
              onClick={onClick}
            >
              {isOpen ? "isOpen is true" : "isOpen is false"}
            </MyOpenButton>
          ),
        });

        act(() => {
          wrapper
            .find(MyOpenButton)
            .props()
            .onClick({} as React.MouseEvent<HTMLElement>);
        });

        wrapper.update();

        expect(wrapper.find(MyOpenButton).text()).toBe("isOpen is true");

        act(() => {
          wrapper.find(PopoverContainerCloseIcon).props().onAction();
        });

        wrapper.update();

        expect(wrapper.find(MyOpenButton).text()).toBe("isOpen is false");
        expect(wrapper.find(MyOpenButton)).not.toBeFocused();
      });

      it("should set the id on the control when popover is closed", () => {
        expect(wrapper.find(MyOpenButton).prop("id")).toBe(
          "PopoverContainer_guid-123"
        );
      });

      it("should not set the id on the control when popover is open", () => {
        act(() => {
          wrapper
            .find(MyOpenButton)
            .props()
            .onClick({} as React.MouseEvent<HTMLElement>);
        });
        expect(wrapper.update().find(MyOpenButton).prop("id")).toBe(undefined);
      });
    });

    describe("and custom component is provided as a closing button", () => {
      interface MyCloseButtonProps extends RenderCloseProps {
        children: React.ReactNode;
      }

      const MyCloseButton = forwardRef<HTMLButtonElement, MyCloseButtonProps>(
        (props: MyCloseButtonProps, ref) => (
          <button type="button" {...props} ref={ref} />
        )
      );

      MyCloseButton.displayName = "MyCloseButton";

      let container: HTMLDivElement | null;

      beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
        wrapper = renderAttached({
          open: true,
          // eslint-disable-next-line react/display-name
          renderCloseComponent: ({
            tabIndex,
            "data-element": dataElement,
            "aria-label": ariaLabel,
            ref,
            onClick,
          }) => (
            <MyCloseButton
              tabIndex={tabIndex}
              ref={ref}
              data-element={dataElement}
              aria-label={ariaLabel}
              onClick={onClick}
            >
              Close
            </MyCloseButton>
          ),
        });
      });

      afterEach(() => {
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }

        container = null;
      });

      it("should be focused if `ref` is provided", () => {
        expect(wrapper.find(MyCloseButton)).toBeFocused();
      });

      it("should render correct props", () => {
        expect(wrapper.find(MyCloseButton).props().tabIndex).toBe(0);
        expect(wrapper.find(MyCloseButton).prop("data-element")).toBe(
          "popover-container-close-component"
        );
        expect(wrapper.find(MyCloseButton).prop("aria-label")).toBe("close");
      });
    });
  });

  describe("if close button is clicked", () => {
    describe("and `ref` of opening button exists", () => {
      let container: HTMLDivElement | null;
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

      it("should set focus to the opening button", () => {
        wrapper = renderAttached();

        act(() => {
          wrapper.find(PopoverContainerOpenIcon).props().onAction();
        });

        wrapper.update();

        act(() => {
          wrapper.find(PopoverContainerCloseIcon).props().onAction();
        });

        wrapper.update();

        expect(wrapper.find(PopoverContainerOpenIcon)).toBeFocused();
      });
    });
  });
});

describe("PopoverContainerOpenIcon", () => {
  it("should render correct style", () => {
    const wrapper = mount(
      <PopoverContainerOpenIcon onAction={() => {}}>
        <Icon type="settings" />
      </PopoverContainerOpenIcon>
    );

    assertStyleMatch(
      {
        color: "var(--colorsActionMinor500)",
      },
      wrapper,
      {
        modifier: `${StyledIcon}`,
      }
    );
  });
});

describe("PopoverContainerContentStyle", () => {
  it("should render correct props by default", () => {
    const wrapper = render({ open: true });

    expect(
      wrapper.find(PopoverContainerContentStyle).prop("data-element")
    ).toBe("popover-container-content");
    expect(wrapper.find(PopoverContainerContentStyle).props().role).toBe(
      "dialog"
    );
    expect(wrapper.find(PopoverContainerContentStyle).props().position).toBe(
      "right"
    );
    expect(
      wrapper.find(PopoverContainerContentStyle).props().shouldCoverButton
    ).toBe(false);
    expect(
      wrapper.find(PopoverContainerContentStyle).prop("aria-labelledby")
    ).toContain("PopoverContainer_guid-123");
    expect(
      wrapper.find(PopoverContainerContentStyle).props().ariaDescribedBy
    ).toBe(undefined);
    expect(
      wrapper.find(PopoverContainerContentStyle).props().animationState
    ).toBe("entering");
  });

  it("should set the correct aria attributes when no title is passed", () => {
    const wrapper = render({
      open: true,
      title: undefined,
      openButtonAriaLabel: "foo",
      containerAriaLabel: "bar",
    });

    expect(
      wrapper.find(PopoverContainerContentStyle).prop("aria-labelledby")
    ).toBe(undefined);
    expect(wrapper.find(PopoverContainerContentStyle).prop("aria-label")).toBe(
      "bar"
    );
  });

  it("should render to the right by default", () => {
    const wrapper = mount(<PopoverContainerContentStyle />);

    assertStyleMatch(
      {
        left: "0",
      },
      wrapper
    );
  });

  it("should render to the left if position is set to `left`", () => {
    const wrapper = mount(<PopoverContainerContentStyle position="left" />);

    assertStyleMatch(
      {
        right: "0",
      },
      wrapper
    );
  });

  it("should render correct style if `shouldCoverButton` prop is provided", () => {
    const wrapper = mount(<PopoverContainerContentStyle shouldCoverButton />);

    assertStyleMatch(
      {
        top: "0",
      },
      wrapper
    );
  });

  describe("should render correct style of animation", () => {
    it("if the animation has state `entered`", () => {
      const wrapper = mount(
        <PopoverContainerContentStyle animationState="entered" />
      );

      assertStyleMatch(
        {
          opacity: "1",
          transform: "translateY(0)",
          transition: "all 0.3s cubic-bezier(0.25,0.25,0,1.5)",
        },
        wrapper
      );
    });

    it("if the animation has state `exiting`", () => {
      const wrapper = mount(
        <PopoverContainerContentStyle animationState="exiting" />
      );

      assertStyleMatch(
        {
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "all 0.3s cubic-bezier(0.25,0.25,0,1.5)",
        },
        wrapper
      );
    });
  });
});

describe("open state when click event triggered", () => {
  it("should close the container when uncontrolled and target is outside wrapper element", () => {
    const wrapper = render({});
    act(() => {
      wrapper.find(PopoverContainerOpenIcon).props().onAction();
    });
    expect(wrapper.update().find(PopoverContainerOpenIcon).prop("id")).toBe(
      undefined
    );
    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(wrapper.update().find(PopoverContainerOpenIcon).prop("id")).toBe(
      "PopoverContainer_guid-123"
    );
  });

  it("should not close the container when uncontrolled and target is inside wrapper element", () => {
    const wrapper = render({});
    act(() => {
      wrapper.find(PopoverContainerOpenIcon).props().onAction();
    });
    expect(wrapper.update().find(PopoverContainerOpenIcon).prop("id")).toBe(
      undefined
    );
    act(() => {
      wrapper?.find(PopoverContainer).simulate("click");
    });
    expect(wrapper.update().find(PopoverContainerOpenIcon).prop("id")).toBe(
      undefined
    );
  });

  it("should close the container when controlled and target is outside wrapper element", () => {
    const onCloseFn = jest.fn();
    const MockWrapper = () => {
      const [open, setOpen] = React.useState(true);

      return (
        <PopoverContainer
          title="PopoverContainerSettings"
          open={open}
          onClose={(e) => {
            setOpen(false);
            onCloseFn(e);
          }}
        />
      );
    };
    const wrapper = mount(<MockWrapper />);

    expect(wrapper.update().find(PopoverContainer).prop("open")).toBe(true);
    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(wrapper.update().find(PopoverContainer).prop("open")).toBe(false);
    expect(onCloseFn).toHaveBeenCalled();
  });

  it("should not close the container when controlled and target is inside wrapper element", () => {
    const onCloseFn = jest.fn();
    const MockWrapper = () => {
      const [open, setOpen] = React.useState(true);

      return (
        <PopoverContainer
          title="PopoverContainerSettings"
          open={open}
          onClose={(e) => {
            setOpen(false);
            onCloseFn(e);
          }}
        />
      );
    };
    const wrapper = mount(<MockWrapper />);

    expect(wrapper.update().find(PopoverContainer).prop("open")).toBe(true);
    document.dispatchEvent(
      new CustomEvent("click", {
        detail: {
          enzymeTestingTarget: wrapper?.find(PopoverContainer).getDOMNode(),
        },
      })
    );
    expect(wrapper.update().find(PopoverContainer).prop("open")).toBe(true);
    expect(onCloseFn).not.toHaveBeenCalled();
  });
});
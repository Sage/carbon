/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import { mount } from "enzyme";
import { css } from "styled-components";
import { act } from "react-dom/test-utils";
import { Transition } from "react-transition-group";
import {
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerIcon,
  PopoverContainerOpenIcon,
  PopoverContainerWrapperStyle,
  PopoverContainerTitleStyle,
} from "./popover-container.style";
import StyledIcon from "../icon/icon.style";
import PopoverContainer from "./popover-container.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { baseTheme } from "../../style/themes";
import Icon from "../icon";
import guid from "../../utils/helpers/guid";

jest.mock("../../utils/helpers/guid");
guid.mockImplementation(() => "guid-123");

const render = (props, renderMethod = mount) => {
  return renderMethod(
    <PopoverContainer title="PopoverContainerSettings" {...props} />
  );
};

const renderAttached = (props, renderMethod = mount) => {
  return renderMethod(
    <PopoverContainer title="PopoverContainerSettings" {...props} />,
    { attachTo: document.getElementById("enzymeContainer") }
  );
};

describe("PopoverContainer", () => {
  jest.useFakeTimers();
  let wrapper;

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
      <PopoverContainer open>
        <div id="myChildren">children</div>
      </PopoverContainer>
    );

    expect(wrapper.find("#myChildren").exists()).toBe(true);
  });

  it("should appear and mount when the component opens", () => {
    expect(wrapper.find(Transition).props().appear).toBe(true);
    expect(wrapper.find(Transition).props().mountOnEnter).toBe(true);
  });

  it("should unount after 300ms when the component closes", () => {
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

  it("should render the same id for `aria-labelledby` and `PopoverContainerTitleStyle`", () => {
    wrapper = render({ open: true });
    expect(wrapper.find(PopoverContainerTitleStyle).props().id).toBe(
      "PopoverContainer_guid-123"
    );
    expect(
      wrapper.find(PopoverContainerWrapperStyle).prop("aria-labelledby")
    ).toBe("PopoverContainer_guid-123");
  });

  it("should let opening button to be focusable if popover is closed", () => {
    wrapper = render({ open: false });

    expect(wrapper.find("button").props().tabIndex).toBe(0);
  });

  it("`position` should be right by default", () => {
    expect(wrapper.props().position).toBe("right");
  });

  it("`shouldCoverButton` should be false by default", () => {
    expect(wrapper.props().shouldCoverButton).toBe(false);
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
      expect(openIcon.find(Icon).props()).toEqual({
        bgSize: "small",
        disabled: false,
        fontSize: "small",
        type: "settings",
      });
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
      const MyOpenButton = forwardRef((props, ref) => (
        <button type="button" {...props} ref={ref} />
      ));
      let container;

      beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
        wrapper = renderAttached({
          title: "render props",
          renderOpenComponent: ({
            tabIndex,
            dataElement,
            ariaLabel,
            ref,
            onClick,
          }) => (
            <MyOpenButton
              tabIndex={tabIndex}
              data-element={dataElement}
              aria-label={ariaLabel}
              ref={ref}
              onClick={onClick}
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
          wrapper.find(MyOpenButton).props().onClick();
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
          renderOpenComponent: ({
            tabIndex,
            dataElement,
            ariaLabel,
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
          wrapper.find(MyOpenButton).props().onClick();
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
    });

    describe("and custom component is provided as a closing button", () => {
      const MyCloseButton = forwardRef((props, ref) => (
        <button type="button" {...props} ref={ref} />
      ));
      let container;

      beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
        wrapper = renderAttached({
          open: true,
          renderCloseComponent: ({ tabIndex, dataElement, ariaLabel, ref }) => (
            <MyCloseButton
              type="button"
              tabIndex={tabIndex}
              ref={ref}
              data-element={dataElement}
              aria-label={ariaLabel}
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

  describe("if close button is clicked ", () => {
    describe("and `ref` of opening button exists", () => {
      let container;
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

describe("PopoverContainerIcon", () => {
  it("should render correct style", () => {
    const wrapper = mount(
      <PopoverContainerIcon onAction={() => {}} theme={baseTheme}>
        <Icon type="settings" />
      </PopoverContainerIcon>
    );

    assertStyleMatch(
      {
        color: baseTheme.popoverContainer.iconColor,
      },
      wrapper,
      {
        modifier: css`
          ${StyledIcon}
        `,
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

  it("should render to the right by default", () => {
    const wrapper = mount(<PopoverContainerContentStyle />);
    assertStyleMatch(
      {
        left: "0",
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

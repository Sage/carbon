import React, { useEffect, useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import FocusTrap from "./focus-trap.component";
import { RadioButton, RadioButtonGroup } from "../../components/radio-button";
import { ModalContext } from "../../components/modal/modal.component";

jest.useFakeTimers();

// eslint-disable-next-line
const MockComponent = ({ children, triggerRefocusFlag, ...rest }) => {
  const ref = useRef();
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <ModalContext.Provider
      value={{ isAnimationComplete: true, triggerRefocusFlag }}
    >
      <FocusTrap wrapperRef={ref} {...rest}>
        <div ref={ref} id="myComponent">
          {React.Children.map(children, (child) => {
            if (child?.props?.id === "disable-on-focus") {
              return React.cloneElement(child, {
                onFocus: () => setIsDisabled(true),
                disabled: isDisabled,
              });
            }

            return child;
          })}
        </div>
      </FocusTrap>
    </ModalContext.Provider>
  );
};

describe("FocusTrap", () => {
  let wrapper;
  const element = document.createElement("div");
  const htmlElement = document.body.appendChild(element);
  const tabKey = new KeyboardEvent("keydown", { key: "Tab" });
  const shiftKey = new KeyboardEvent("keydown", { shiftKey: true });
  const shiftTabKey = new KeyboardEvent("keydown", {
    key: "Tab",
    shiftKey: true,
  });
  const otherKey = new KeyboardEvent("keydown", { keyCode: 32 });

  describe("triggerRefocusFlag", () => {
    afterEach(() => {
      wrapper.unmount();
    });

    it("refocuses the last element that had focus within the trap when flag is set", () => {
      wrapper = mount(
        <MockComponent autoFocus={false} triggerRefocusFlag={false}>
          <button type="button">Test button One</button>
          <input type="text" />
        </MockComponent>,
        { attachTo: htmlElement }
      );
      act(() => {
        document.querySelectorAll("input")[0].focus();
      });
      expect(wrapper.update().find("input").at(0)).toBeFocused();
      act(() => {
        document.querySelectorAll("input")[0].blur();
      });
      expect(wrapper.update().find("input").at(0)).not.toBeFocused();
      act(() => {
        wrapper.setProps({ triggerRefocusFlag: true });
      });
      wrapper.update();
      expect(wrapper.update().find("input").at(0)).toBeFocused();
    });

    it("refocuses the first element within the trap when flag is set", () => {
      wrapper = mount(
        <MockComponent autoFocus={false} triggerRefocusFlag={false}>
          <button type="button">Test button One</button>
          <input type="text" />
        </MockComponent>,
        { attachTo: htmlElement }
      );
      act(() => {
        wrapper.setProps({ triggerRefocusFlag: true });
      });
      wrapper.update();
      expect(wrapper.update().find("button").at(0)).toBeFocused();
    });

    it("refocuses the first element if last element that had focus becomes disabled", () => {
      wrapper = mount(
        <MockComponent autoFocus={false} triggerRefocusFlag={false}>
          <button type="button">Test button One</button>
          <input type="text" id="disable-on-focus" />
        </MockComponent>,
        { attachTo: htmlElement }
      );
      act(() => {
        document.querySelectorAll("input")[0].focus();
      });
      expect(wrapper.update().find("input").at(0)).toBeFocused();
      act(() => {
        wrapper.setProps({ triggerRefocusFlag: true });
      });
      wrapper.update();
      expect(wrapper.update().find("button").at(0)).toBeFocused();
    });
  });

  describe("when autoFocus is false", () => {
    it("should not focus the first focusable element by default", () => {
      wrapper = mount(
        <MockComponent autoFocus={false}>
          <button type="button">Test button One</button>
          <input type="text" />
        </MockComponent>,
        { attachTo: htmlElement }
      );

      expect(document.activeElement).toMatchObject(
        document.querySelectorAll("body")[0]
      );
    });
  });

  describe("when a focusFirstElement callback is provided", () => {
    let onFocus;

    beforeEach(() => {
      onFocus = jest
        .fn()
        .mockImplementation(() =>
          document.querySelectorAll("button")[0].focus()
        );
      wrapper = mount(
        <MockComponent focusFirstElement={onFocus}>
          <button type="button">Test button One</button>
          <button type="button">Test button Two</button>
        </MockComponent>,
        { attachTo: htmlElement }
      );
    });

    it("should call the function and focus first element", () => {
      expect(onFocus).toHaveBeenCalled();
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(0)
      );
      act(() => {
        document.dispatchEvent(shiftTabKey);
        document.dispatchEvent(shiftTabKey);
      });
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(0)
      );
    });

    it("should focus second focusable item", () => {
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(0)
      );
      act(() => {
        document.dispatchEvent(shiftTabKey);
      });
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(1)
      );
    });

    it("should go to the second item when use TAB", () => {
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(0)
      );
      act(() => {
        document.dispatchEvent(shiftTabKey);
      });
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(1)
      );
    });

    it("should move to the first focusable item if TAB pressed on last focusable item", () => {
      act(() => {
        document.querySelectorAll("button")[1].focus();
      });
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(1)
      );
      act(() => {
        document.dispatchEvent(tabKey);
      });
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(0)
      );
    });
  });

  describe("when a bespokeTrap is provided", () => {
    let bespokeFn;

    beforeEach(() => {
      bespokeFn = jest.fn();
      mount(
        <MockComponent bespokeTrap={bespokeFn}>
          <button type="button">Test button One</button>
          <button type="button">Test button Two</button>
        </MockComponent>,
        { attachTo: htmlElement }
      );
    });

    it("calls the function with expected arguments on TAB press", () => {
      act(() => {
        document.dispatchEvent(tabKey);
      });
      expect(bespokeFn).toHaveBeenCalledWith(
        tabKey,
        document.querySelectorAll("button")[0],
        document.querySelectorAll("button")[1]
      );
    });

    it("calls the function with expected arguments on SHIFT + TAB press", () => {
      act(() => {
        document.dispatchEvent(shiftTabKey);
      });
      expect(bespokeFn).toHaveBeenCalledWith(
        shiftTabKey,
        document.querySelectorAll("button")[0],
        document.querySelectorAll("button")[1]
      );
    });
  });

  describe("when FocusTrap wraps an element", () => {
    describe("and element has focusable items inside", () => {
      beforeEach(() => {
        wrapper = mount(
          <MockComponent>
            <button type="button">Test button One</button>
            <button type="button">Test button Two</button>
          </MockComponent>,
          { attachTo: htmlElement }
        );
      });

      it("should focus first focusable item", () => {
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
      });

      it("should not move if different key than TAB is pressed", () => {
        act(() => {
          document.querySelectorAll("button")[1].focus();
        });
        document.dispatchEvent(otherKey);
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(1)
        );
      });

      it("should back to the last item when use `shift + tab` on first focusable item", () => {
        act(() => {
          document.querySelectorAll("button")[0].focus();
        });
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
        act(() => {
          document.dispatchEvent(shiftTabKey);
        });
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(1)
        );
      });

      it("should back to the first item when use `shift + tab`", () => {
        act(() => {
          document.querySelectorAll("button")[1].focus();
        });
        act(() => {
          document.dispatchEvent(shiftTabKey);
        });
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
      });

      it("should go to the second item when use TAB", () => {
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
        act(() => {
          document.dispatchEvent(tabKey);
        });
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(1)
        );
      });

      it("should move to the first focusable item if TAB pressed on last focusable item", () => {
        act(() => {
          document.querySelectorAll("button")[1].focus();
        });
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(1)
        );
        act(() => {
          document.dispatchEvent(tabKey);
        });
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
      });
    });

    describe("and element does not have focusable items", () => {
      beforeEach(() => {
        wrapper = mount(
          <MockComponent>
            <p>Test content</p>
          </MockComponent>,
          { attachTo: htmlElement }
        );
      });

      it("should block tabbing if `tab` pressed", () => {
        document.getElementById("myComponent").focus();
        act(() => {
          document.dispatchEvent(tabKey);
        });
        expect(document.activeElement).toMatchObject(wrapper);
      });

      it("should block shift tabbing if `shift + tab` is pressed", () => {
        document.getElementById("myComponent").focus();
        document.dispatchEvent(shiftKey);
        expect(document.activeElement).toMatchObject(wrapper);
      });
    });

    describe("and some children elements are disabled", () => {
      beforeEach(() => {
        wrapper = mount(
          <MockComponent>
            <button type="button">Test button One</button>
            <button type="button" disabled>
              Disabled button One
            </button>
            <button type="button">Test button Two</button>
            <button type="button" disabled>
              Disabled button two
            </button>
          </MockComponent>,
          { attachTo: htmlElement }
        );
      });

      it("only focuses those that are not", () => {
        act(() => {
          document.querySelectorAll("button")[0].focus();
        });
        act(() => {
          document.dispatchEvent(tabKey);
        });
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(2)
        );
        act(() => {
          document.dispatchEvent(tabKey);
        });
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
      });
    });
  });

  describe("when first focusable elements are radio buttons", () => {
    beforeEach(() => {
      wrapper = mount(
        <MockComponent>
          <RadioButtonGroup
            name="mybuttongroup"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value="1"
            legendWidth={40}
          >
            <RadioButton value="1" label="Create a new Address" size="large" />
            <RadioButton
              value="2"
              label="Select an Existing address"
              size="large"
            />
          </RadioButtonGroup>
          <button type="button">Test button One</button>
          <button type="button">Test button Two</button>
        </MockComponent>,
        { attachTo: htmlElement }
      );
    });

    describe("when focus on the first button and shift-tab pressed", () => {
      it("should loop focus to the last focusable element", () => {
        act(() => {
          document.dispatchEvent(tabKey);
        });

        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );

        act(() => {
          document.dispatchEvent(shiftTabKey);
        });

        expect(document.activeElement).toMatchObject(
          wrapper.find('input[type="radio"]').at(0)
        );
      });
    });

    describe("when focus on first radio button shift-tab pressed", () => {
      it("should loop focus to the last focusable element", () => {
        expect(document.activeElement).toMatchObject(
          wrapper.find('input[type="radio"]').at(0)
        );

        act(() => {
          document.dispatchEvent(shiftTabKey);
        });

        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(1)
        );
      });
    });

    describe("when focus on second radio button shift-tab pressed", () => {
      it("should loop focus to the last focusable element", () => {
        act(() => {
          document.querySelectorAll('input[type="radio"]')[1].focus();
        });
        expect(document.activeElement).toMatchObject(
          wrapper.find('input[type="radio"]').at(1)
        );

        act(() => {
          document.dispatchEvent(shiftTabKey);
        });

        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(1)
        );
      });
    });
  });

  describe("when trap contains radio buttons", () => {
    beforeEach(() => {
      wrapper = mount(
        <MockComponent>
          <button type="button">Test button One</button>
          <RadioButtonGroup
            name="mybuttongroup"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value="1"
            legendWidth={40}
          >
            <RadioButton value="1" label="Create a new Address" size="large" />
            <RadioButton
              value="2"
              label="Select an Existing address"
              size="large"
            />
          </RadioButtonGroup>
          <button type="button">Test button Two</button>
        </MockComponent>,
        { attachTo: htmlElement }
      );
    });

    describe("when focus on first radio button shift-tab pressed", () => {
      it("should loop focus to the last focusable element", () => {
        act(() => {
          document.dispatchEvent(tabKey);
        });

        expect(document.activeElement).toMatchObject(
          wrapper.find('input[type="radio"]').at(0)
        );

        act(() => {
          document.dispatchEvent(shiftTabKey);
        });

        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
      });
    });

    describe("when focus on second radio button shift-tab pressed", () => {
      it("should loop focus to the last focusable element", () => {
        act(() => {
          document.querySelectorAll('input[type="radio"]')[1].focus();
        });
        expect(document.activeElement).toMatchObject(
          wrapper.find('input[type="radio"]').at(1)
        );

        act(() => {
          document.dispatchEvent(shiftTabKey);
        });

        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
      });
    });
  });

  describe("wrapperRef", () => {
    it("renders without wrapperRef provided", () => {
      expect(() => {
        mount(
          <ModalContext.Provider value={{ isAnimationComplete: true }}>
            <FocusTrap>
              <div id="myComponent">Content</div>
            </FocusTrap>
          </ModalContext.Provider>
        );
      }).not.toThrow();
    });

    it("should not update focusable elements if wrapper ref isn't found", () => {
      const wrapperRef = { current: null };
      expect(() => {
        mount(
          <ModalContext.Provider value={{ isAnimationComplete: true }}>
            <FocusTrap wrapperRef={wrapperRef}>
              <div id="myComponent">Content</div>
            </FocusTrap>
          </ModalContext.Provider>
        );
      }).not.toThrow();
    });
  });

  describe("when content in the children tree changes", () => {
    it("should trigger the MutationObserver", () => {
      const mutationObserverMock = jest.fn(function MutationObserver(callback) {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.trigger = () => {
          callback();
        };
      });
      jest
        .spyOn(global, "MutationObserver")
        .mockImplementation(mutationObserverMock);

      const ChangingChild = () => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }, []);

        if (loading) {
          return <input type="text" />;
        }

        return (
          <>
            <button type="button">Test button One</button>
          </>
        );
      };

      wrapper = mount(
        <MockComponent>
          <ChangingChild />
        </MockComponent>,
        { attachTo: htmlElement }
      );

      const [observerInstance] = mutationObserverMock.mock.instances;
      expect(observerInstance.observe).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toMatchObject(wrapper.find("input").at(0));

      act(() => {
        jest.runAllTimers();
      });
      act(() => {
        observerInstance.trigger();
      });

      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(0)
      );

      jest.restoreAllMocks();
    });
  });
});

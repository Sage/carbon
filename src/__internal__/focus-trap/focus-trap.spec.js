import React from "react";
import { mount } from "enzyme";
import FocusTrap from "./focus-trap.component";

jest.useFakeTimers();

describe("FocusTrap", () => {
  const element = document.createElement("div");
  const htmlElement = document.body.appendChild(element);
  const tabKey = new KeyboardEvent("keydown", { key: "Tab" });
  const shiftKey = new KeyboardEvent("keydown", { shiftKey: true });
  const shiftTabKey = new KeyboardEvent("keydown", {
    key: "Tab",
    shiftKey: true,
  });
  const otherKey = new KeyboardEvent("keydown", { keyCode: 32 });

  describe("when autoFocus is false", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <FocusTrap autoFocus={false}>
          <div id="myComponent">
            <button type="button">Test button One</button>
            <input type="text" />
          </div>
        </FocusTrap>,
        { attachTo: htmlElement }
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should not focus the first focusable element by default", () => {
      expect(document.activeElement).toMatchObject(
        document.querySelectorAll("body")[0]
      );
    });
  });

  describe("when a focusFirstElement callback is provided", () => {
    let wrapper, onFocus;

    beforeEach(() => {
      onFocus = jest
        .fn()
        .mockImplementation(() =>
          document.querySelectorAll("button")[0].focus()
        );
      wrapper = mount(
        <FocusTrap focusFirstElement={onFocus}>
          <div id="myComponent">
            <button type="button">Test button One</button>
            <button type="button">Test button Two</button>
          </div>
        </FocusTrap>,
        { attachTo: htmlElement }
      );
    });

    it("should call the function and focus first element", () => {
      expect(onFocus).toHaveBeenCalled();
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(0)
      );
      document.dispatchEvent(shiftTabKey);
      document.dispatchEvent(shiftTabKey);
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(0)
      );
    });

    it("should focus second focusable item", () => {
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(0)
      );
      document.dispatchEvent(shiftTabKey);
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(1)
      );
    });

    it("should go to the second item when use TAB", () => {
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(0)
      );
      document.dispatchEvent(shiftTabKey);
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(1)
      );
    });

    it("should move to the first focusable item if TAB pressed on last focusable item", () => {
      document.querySelectorAll("button")[1].focus();
      expect(document.activeElement).toMatchObject(
        wrapper.find("button").at(1)
      );
      document.dispatchEvent(tabKey);
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
        <FocusTrap bespokeTrap={bespokeFn}>
          <div id="myComponent">
            <button type="button">Test button One</button>
            <button type="button">Test button Two</button>
          </div>
        </FocusTrap>,
        { attachTo: htmlElement }
      );
    });

    it("calls the function with expected arguments on TAB press", () => {
      document.dispatchEvent(tabKey);
      expect(bespokeFn).toHaveBeenCalledWith(
        tabKey,
        document.querySelectorAll("button")[0],
        document.querySelectorAll("button")[1]
      );
    });

    it("calls the function with expected arguments on SHIFT + TAB press", () => {
      document.dispatchEvent(shiftTabKey);
      expect(bespokeFn).toHaveBeenCalledWith(
        shiftTabKey,
        document.querySelectorAll("button")[0],
        document.querySelectorAll("button")[1]
      );
    });
  });

  describe("when FocusTrap wraps an element", () => {
    describe("and element has focusable items inside", () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(
          <FocusTrap>
            <div id="myComponent">
              <button type="button">Test button One</button>
              <button type="button">Test button Two</button>
            </div>
          </FocusTrap>,
          { attachTo: htmlElement }
        );
      });

      it("should focus first focusable item", () => {
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
      });

      it("should not move if different key than TAB is pressed", () => {
        document.querySelectorAll("button")[1].focus();
        document.dispatchEvent(otherKey);
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(1)
        );
      });

      it("should back to the last item when use `shift + tab` on first focusable item", () => {
        document.querySelectorAll("button")[0].focus();
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
        document.dispatchEvent(shiftTabKey);
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(1)
        );
      });

      it("should back to the first item when use `shift + tab`", () => {
        document.querySelectorAll("button")[1].focus();
        document.dispatchEvent(shiftTabKey);
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
      });

      it("should go to the second item when use TAB", () => {
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
        document.dispatchEvent(tabKey);
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(1)
        );
      });

      it("should move to the first focusable item if TAB pressed on last focusable item", () => {
        document.querySelectorAll("button")[1].focus();
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(1)
        );
        document.dispatchEvent(tabKey);
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
      });
    });

    describe("and element does not have focusable items", () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(
          <FocusTrap>
            <div id="myComponent">
              <p>Test content</p>
            </div>
          </FocusTrap>,
          { attachTo: htmlElement }
        );
      });

      it("should block tabbing if `tab` pressed", () => {
        document.getElementById("myComponent").focus();
        document.dispatchEvent(tabKey);
        expect(document.activeElement).toMatchObject(wrapper);
      });

      it("should block shift tabbing if `shift + tab` is pressed", () => {
        document.getElementById("myComponent").focus();
        document.dispatchEvent(shiftKey);
        expect(document.activeElement).toMatchObject(wrapper);
      });
    });

    describe("and some children elements are disabled", () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(
          <FocusTrap>
            <div id="myComponent">
              <button type="button">Test button One</button>
              <button type="button" disabled>
                Disabled button One
              </button>
              <button type="button">Test button Two</button>
              <button type="button" disabled>
                Disabled button two
              </button>
            </div>
          </FocusTrap>,
          { attachTo: htmlElement }
        );
      });

      it("only focuses those that are not", () => {
        document.querySelectorAll("button")[0].focus();
        document.dispatchEvent(tabKey);
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(2)
        );
        document.dispatchEvent(tabKey);
        expect(document.activeElement).toMatchObject(
          wrapper.find("button").at(0)
        );
      });
    });
  });
});

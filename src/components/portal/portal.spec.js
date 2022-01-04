import React from "react";
import { mount, shallow } from "enzyme";
import { ThemeProvider } from "styled-components";
import ReactDOM from "react-dom";
import Portal from "./portal";
import Icon from "../icon";
import Browser from "../../__internal__/utils/helpers/browser";
import * as TokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import { mintTheme } from "../../style/themes";

jest.mock("../../__internal__/utils/helpers/guid", () => () => "guid-12345");

describe("Portal", () => {
  let wrapper;

  describe("when an element with id 'root' exists", () => {
    let rootWrapper;

    beforeEach(() => {
      const rootDiv = global.document.createElement("div");
      rootDiv.setAttribute("id", "root");
      const body = global.document.querySelector("body");
      body.appendChild(rootDiv);
    });

    afterEach(() => {
      if (rootWrapper) {
        rootWrapper.unmount();
        rootWrapper = null;
      }
    });

    it("will mount on that element", () => {
      rootWrapper = mount(
        <Portal>
          <p>Test</p>
        </Portal>
      );

      expect(document.body.innerHTML).toMatchSnapshot();
    });
  });

  describe("when using default node", () => {
    beforeEach(() => {
      wrapper = mount(
        <Portal>
          <Icon tooltipMessage="Test" tooltipPosition="top" type="tick" />
        </Portal>
      );
    });

    afterEach(() => {
      if (wrapper.length) wrapper.unmount();

      document.body.innerHTML = "";
    });

    describe("when an element with id 'root' does not exist", () => {
      it("will mount on body", () => {
        expect(document.body.innerHTML).toMatchSnapshot();
      });
    });

    it("can be able to access Icon", () => {
      expect(wrapper.find(Icon).length).toBe(1);
    });

    it("will mount second portal", () => {
      const wrapper2 = mount(
        <Portal>
          <Icon tooltipMessage="Test" tooltipPosition="top" type="tick" />
        </Portal>
      );

      expect(
        document.body.getElementsByClassName("carbon-portal").length
      ).toEqual(2);
      wrapper2.unmount();
    });

    it("will unmount two portals", () => {
      wrapper.unmount();
      const wrapper2 = mount(
        <Portal>
          <Icon tooltipMessage="Test" tooltipPosition="top" type="tick" />
        </Portal>
      );
      wrapper2.unmount();
      expect(document.body.innerHTML).toEqual("");
    });

    it("to match snapshot ", () => {
      const wrapper2 = shallow(
        <Portal>
          <Icon tooltipMessage="Test" tooltipPosition="top" type="tick" />
        </Portal>
      );
      expect(wrapper2).toMatchSnapshot();
    });
  });

  describe("will manage listeners", () => {
    describe("when NOT given reposition prop", () => {
      let parentDiv;
      beforeEach(() => {
        spyOn(window, "addEventListener");
        spyOn(window, "removeEventListener");
        spyOn(ReactDOM, "findDOMNode").and.returnValue(parentDiv);

        parentDiv = document.createElement("div");
        spyOn(parentDiv, "addEventListener");
        spyOn(parentDiv, "removeEventListener");

        wrapper = mount(
          <Portal>
            <Icon tooltipMessage="Test" tooltipPosition="top" type="tick" />
          </Portal>
        );
      });

      afterEach(() => {
        if (wrapper.length) wrapper.unmount();
      });

      it('will NOT add window "resize" listener ', () => {
        expect(window.addEventListener).not.toHaveBeenCalledWith("resize");
      });

      it('will NOT remove window "resize" listener on unnmount', () => {
        wrapper.unmount();
        expect(window.removeEventListener).not.toHaveBeenCalledWith("resize");
      });

      it('will NOT window "scroll" listener ', () => {
        expect(parentDiv.addEventListener).not.toHaveBeenCalled();
      });

      it('will NOT remove "scroll" listener on unnmount', () => {
        wrapper.unmount();
        expect(parentDiv.removeEventListener).not.toHaveBeenCalled();
      });
    });

    describe("when given reposition prop", () => {
      let repositionCb;
      let parentDiv;

      beforeEach(() => {
        repositionCb = jasmine.createSpy("onReposition");
        parentDiv = document.createElement("div");
        parentDiv.style.overflow = "auto";

        spyOn(window, "addEventListener");
        spyOn(window, "removeEventListener");
        spyOn(ReactDOM, "findDOMNode").and.returnValue(parentDiv);
        spyOn(parentDiv, "addEventListener");
        spyOn(parentDiv, "removeEventListener");
        wrapper = mount(
          <Portal onReposition={repositionCb}>
            <Icon tooltipMessage="Test" tooltipPosition="top" type="tick" />
          </Portal>
        );
      });

      afterEach(() => {
        if (wrapper.length) wrapper.unmount();
      });

      it('will add window "resize" listener ', () => {
        expect(window.addEventListener).toHaveBeenCalledWith(
          "resize",
          repositionCb
        );
      });

      it('will remove "resize" listener on unnmount', () => {
        wrapper.unmount();
        expect(window.removeEventListener).toHaveBeenCalledWith(
          "resize",
          repositionCb
        );
      });

      it('will call window "reposition" callback ', () => {
        expect(repositionCb).toHaveBeenCalled();
      });
    });
  });

  it("mount a <p/> tag as child", () => {
    mount(
      <Portal>
        <p>john</p>
      </Portal>
    );

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it("will NOT mount with no DOM", () => {
    spyOn(Browser, "getWindow").and.returnValue(undefined);
    const noDOMWrapper = mount(
      <Portal>
        <Icon tooltipMessage="Test" tooltipPosition="top" type="tick" />
      </Portal>
    );
    expect(noDOMWrapper.html()).toBe(null);
  });

  describe("when reposition prop is updated", () => {
    let repositionCb;
    let repositionCbNew;

    beforeEach(() => {
      repositionCb = jasmine.createSpy("onReposition");
      repositionCbNew = jasmine.createSpy("onRepositionNew");

      spyOn(window, "addEventListener");
      spyOn(window, "removeEventListener");

      wrapper = mount(
        <Portal onReposition={repositionCb}>
          <Icon tooltipMessage="Test" tooltipPosition="top" type="tick" />
        </Portal>
      );
    });

    afterEach(() => {
      if (wrapper.length) wrapper.unmount();
    });

    it('will remove the old listener and add a new window "resize" listener', () => {
      wrapper.setProps({ onReposition: repositionCbNew });
      expect(window.removeEventListener).toHaveBeenCalledWith(
        "resize",
        repositionCb
      );
      expect(window.addEventListener).toHaveBeenCalledWith(
        "resize",
        repositionCbNew
      );
    });
  });

  describe("when id prop is given", () => {
    const id = "abc";

    beforeEach(() => {
      document.body.innerHTML = "";

      wrapper = mount(
        <div>
          <Portal id={id}>
            <span>a1</span>
          </Portal>
          <Portal id={id}>
            <span>a2</span>
          </Portal>
        </div>
      );
    });

    afterEach(() => {
      if (wrapper.length) wrapper.unmount();
    });

    it("matches snapshot", () => {
      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("created one portal", () => {
      expect(document.body.querySelectorAll("div").length).toBe(1);
    });

    it("created two spans", () => {
      expect(document.body.querySelectorAll("span").length).toBe(2);
    });
  });

  describe("Design tokens", () => {
    const tokenClass = "tokenClass";
    let spy;

    beforeEach(() => {
      spy = spyOn(TokensProvider, "tokensClassName").and.returnValue(
        tokenClass
      );
    });

    it("will have proper tokens className", () => {
      mount(
        <Portal>
          <span>Hello there</span>
        </Portal>
      );
      const portalElement = document.body.querySelector(`.carbon-portal`);

      expect(portalElement.classList.contains(tokenClass)).toBe(true);
    });

    it("will use theme name if theme is set", () => {
      mount(
        <ThemeProvider theme={mintTheme}>
          <Portal>
            <span>Hello there</span>
          </Portal>
        </ThemeProvider>
      );

      expect(spy).toBeCalledWith("mint");
    });

    it("will not use empty string if theme is not set", () => {
      mount(
        <Portal>
          <span>Hello there</span>
        </Portal>
      );

      expect(spy).toBeCalledWith("");
    });
  });
});

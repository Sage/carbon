import React from "react";
import { mount, shallow, ReactWrapper } from "enzyme";
import ReactDOM from "react-dom";
import Portal, { PortalContext } from "./portal";
import Icon from "../icon";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";

jest.mock("../../__internal__/utils/helpers/guid", () => () => "guid-12345");

describe("Portal", () => {
  let wrapper: ReactWrapper;

  describe("when an element with id 'root' exists, and renderInRoot is set to true in Portal Context", () => {
    let rootWrapper: ReactWrapper | null;
    const rootDiv = document.createElement("div");
    rootDiv.setAttribute("id", "root");
    const body = document.querySelector("body") as HTMLBodyElement;

    beforeEach(() => {
      body.appendChild(rootDiv);
    });

    afterEach(() => {
      if (rootWrapper) {
        rootWrapper.unmount();
        rootWrapper = null;
      }
      body.removeChild(rootDiv);
    });

    it("then the portal will mount inside the root element", () => {
      const childContent = "Test";

      rootWrapper = mount(
        <PortalContext.Provider value={{ renderInRoot: true }}>
          <Portal>{childContent}</Portal>
        </PortalContext.Provider>
      );

      expect(
        rootDiv.getElementsByClassName("carbon-portal")[0].childNodes[0]
      ).toHaveTextContent(childContent);
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

    it("then the portal will mount on body", () => {
      expect(document.body.innerHTML).toMatchSnapshot();
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
      expect(document.body).toBeEmptyDOMElement();
    });

    it("to match snapshot", () => {
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
      let parentDiv: HTMLDivElement;
      beforeEach(() => {
        jest.spyOn(window, "addEventListener");
        jest.spyOn(window, "removeEventListener");
        jest.spyOn(ReactDOM, "findDOMNode").mockReturnValue(parentDiv);

        parentDiv = document.createElement("div");
        jest.spyOn(parentDiv, "addEventListener");
        jest.spyOn(parentDiv, "removeEventListener");

        wrapper = mount(
          <Portal>
            <Icon tooltipMessage="Test" tooltipPosition="top" type="tick" />
          </Portal>
        );
      });

      afterEach(() => {
        if (wrapper.length) wrapper.unmount();
      });

      it('will NOT add window "resize" listener', () => {
        expect(window.addEventListener).not.toHaveBeenCalledWith("resize");
      });

      it('will NOT remove window "resize" listener on unnmount', () => {
        wrapper.unmount();
        expect(window.removeEventListener).not.toHaveBeenCalledWith("resize");
      });

      it('will NOT window "scroll" listener', () => {
        expect(parentDiv.addEventListener).not.toHaveBeenCalled();
      });

      it('will NOT remove "scroll" listener on unnmount', () => {
        wrapper.unmount();
        expect(parentDiv.removeEventListener).not.toHaveBeenCalled();
      });
    });

    describe("when given reposition prop", () => {
      let repositionCb: jest.Mock;
      let parentDiv: HTMLDivElement;

      beforeEach(() => {
        repositionCb = jest.fn();
        parentDiv = document.createElement("div");
        parentDiv.style.overflow = "auto";

        jest.spyOn(window, "addEventListener");
        jest.spyOn(window, "removeEventListener");
        jest.spyOn(ReactDOM, "findDOMNode").mockReturnValue(parentDiv);
        jest.spyOn(parentDiv, "addEventListener");
        jest.spyOn(parentDiv, "removeEventListener");
        wrapper = mount(
          <Portal onReposition={repositionCb}>
            <Icon tooltipMessage="Test" tooltipPosition="top" type="tick" />
          </Portal>
        );
      });

      afterEach(() => {
        if (wrapper.length) wrapper.unmount();
      });

      it('will add window "resize" listener', () => {
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

      it('will call window "reposition" callback', () => {
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

  describe("when reposition prop is updated", () => {
    let repositionCb: jest.Mock;
    let repositionCbNew: jest.Mock;

    beforeEach(() => {
      repositionCb = jest.fn();
      repositionCbNew = jest.fn();

      jest.spyOn(window, "addEventListener");
      jest.spyOn(window, "removeEventListener");

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
      expect(document.body.querySelectorAll("div#abc").length).toBe(1);
    });

    it("created two spans", () => {
      expect(document.body.querySelectorAll("span").length).toBe(2);
    });
  });

  describe("Design tokens", () => {
    it("wraps content with CarbonScopedTokensProvider", () => {
      wrapper = mount(
        <Portal>
          <div id="test" />
        </Portal>
      );

      const carbonScopedTokensProvider = wrapper.find(
        CarbonScopedTokensProvider
      );

      expect(carbonScopedTokensProvider.find("#test").exists()).toBe(true);
    });
  });
});

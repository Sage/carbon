import React from "react";
import { mount, shallow } from "enzyme";
import ReactDOM from "react-dom";
import Portal from "./portal";
import Icon from "./../icon";
import guid from "../../utils/helpers/guid";
import Browser from "../../utils/helpers/browser";

jest.mock("../../utils/helpers/guid");

describe("Portal", () => {
  guid.mockImplementation(() => "guid-12345");

  let wrapper;

  describe("when using default node", () => {
    beforeEach(() => {
      wrapper = mount(
        <Portal>
          <Icon
            tooltipMessage="Test"
            tooltipAlign="left"
            tooltipPosition="top"
            type="tick"
          />
        </Portal>
      );
    });

    afterEach(() => {
      if (wrapper.length) wrapper.unmount();

      document.body.innerHTML = "";
    });

    it("will mount correctly on document", () => {
      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("can be able to access Icon", () => {
      expect(wrapper.find(Icon).length).toBe(1);
    });

    it("will mount second portal", () => {
      const wrapper2 = mount(
        <Portal>
          <Icon
            tooltipMessage="Test"
            tooltipAlign="left"
            tooltipPosition="top"
            type="tick"
          />
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
          <Icon
            tooltipMessage="Test"
            tooltipAlign="left"
            tooltipPosition="top"
            type="tick"
          />
        </Portal>
      );
      wrapper2.unmount();
      expect(document.body.innerHTML).toEqual("");
    });

    it("to match snapshot ", () => {
      const wrapper2 = shallow(
        <Portal>
          <Icon
            tooltipMessage="Test"
            tooltipAlign="left"
            tooltipPosition="top"
            type="tick"
          />
        </Portal>
      );
      expect(wrapper2).toMatchSnapshot();
    });
  });

  describe("will manage listeners", () => {
    describe("when NOT given reposition prop", () => {
      let parentDiv;
      beforeEach(() => {
        spyOn(Browser.getWindow(), "addEventListener");
        spyOn(Browser.getWindow(), "removeEventListener");
        spyOn(ReactDOM, "findDOMNode").and.returnValue(parentDiv);

        parentDiv = Browser.getDocument().createElement("div");
        spyOn(parentDiv, "addEventListener");
        spyOn(parentDiv, "removeEventListener");

        wrapper = mount(
          <Portal>
            <Icon
              tooltipMessage="Test"
              tooltipAlign="left"
              tooltipPosition="top"
              type="tick"
            />
          </Portal>
        );
      });

      afterEach(() => {
        if (wrapper.length) wrapper.unmount();
      });

      it('will NOT add window "resize" listener ', () => {
        expect(Browser.getWindow().addEventListener).not.toHaveBeenCalledWith(
          "resize"
        );
      });

      it('will NOT remove window "resize" listener on unnmount', () => {
        wrapper.unmount();
        expect(
          Browser.getWindow().removeEventListener
        ).not.toHaveBeenCalledWith("resize");
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
        parentDiv = Browser.getDocument().createElement("div");
        parentDiv.style.overflow = "auto";

        spyOn(Browser.getWindow(), "addEventListener");
        spyOn(Browser.getWindow(), "removeEventListener");
        spyOn(ReactDOM, "findDOMNode").and.returnValue(parentDiv);
        spyOn(parentDiv, "addEventListener");
        spyOn(parentDiv, "removeEventListener");
        wrapper = mount(
          <Portal onReposition={repositionCb}>
            <Icon
              tooltipMessage="Test"
              tooltipAlign="left"
              tooltipPosition="top"
              type="tick"
            />
          </Portal>
        );
      });

      afterEach(() => {
        if (wrapper.length) wrapper.unmount();
      });

      it('will add window "resize" listener ', () => {
        expect(Browser.getWindow().addEventListener).toHaveBeenCalledWith(
          "resize",
          repositionCb
        );
      });

      it('will remove "resize" listener on unnmount', () => {
        wrapper.unmount();
        expect(Browser.getWindow().removeEventListener).toHaveBeenCalledWith(
          "resize",
          repositionCb
        );
      });

      it('will call window "reposition" callback ', () => {
        expect(repositionCb).toHaveBeenCalled();
      });

      it('will add window "scroll" listener ', () => {
        expect(parentDiv.addEventListener).toHaveBeenCalledWith(
          "scroll",
          repositionCb
        );
      });

      it('will remove "scroll" listener on unnmount', () => {
        wrapper.unmount();
        expect(parentDiv.removeEventListener).toHaveBeenCalledWith(
          "scroll",
          repositionCb
        );
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
        <Icon
          tooltipMessage="Test"
          tooltipAlign="left"
          tooltipPosition="top"
          type="tick"
        />
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

      spyOn(Browser.getWindow(), "addEventListener");
      spyOn(Browser.getWindow(), "removeEventListener");

      wrapper = mount(
        <Portal onReposition={repositionCb}>
          <Icon
            tooltipMessage="Test"
            tooltipAlign="left"
            tooltipPosition="top"
            type="tick"
          />
        </Portal>
      );
    });

    afterEach(() => {
      if (wrapper.length) wrapper.unmount();
    });

    it('will remove the old listener and add a new window "resize" listener', () => {
      wrapper.setProps({ onReposition: repositionCbNew });
      expect(Browser.getWindow().removeEventListener).toHaveBeenCalledWith(
        "resize",
        repositionCb
      );
      expect(Browser.getWindow().addEventListener).toHaveBeenCalledWith(
        "resize",
        repositionCbNew
      );
    });

    it('will remove the old listener and add a new window "resize" listener also to scrollParent ', () => {
      wrapper.instance().scrollParent = {
        removeEventListener: () => jest.fn(),
        addEventListener: () => jest.fn(),
      };
      spyOn(wrapper.instance().scrollParent, "removeEventListener");
      spyOn(wrapper.instance().scrollParent, "addEventListener");
      wrapper.setProps({ onReposition: repositionCbNew });
      expect(
        wrapper.instance().scrollParent.removeEventListener
      ).toHaveBeenCalled();
      expect(Browser.getWindow().removeEventListener).toHaveBeenCalledWith(
        "resize",
        repositionCb
      );
      expect(Browser.getWindow().addEventListener).toHaveBeenCalledWith(
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
});

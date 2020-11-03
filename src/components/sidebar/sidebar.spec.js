import React from "react";
import { mount } from "enzyme";
import Sidebar from "./sidebar.component";
import Textbox from "../../__experimental__/components/textbox";
import SidebarStyle from "./sidebar.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import IconButton from "../icon-button";

describe("Sidebar", () => {
  let wrapper, spy;

  beforeEach(() => {
    spy = jasmine.createSpy();
    wrapper = mount(
      <Sidebar
        open
        title="Test"
        className="custom-class"
        data-role="baz"
        data-element="bar"
        onCancel={spy}
      >
        <Textbox />
        <Textbox />
        <Textbox />
      </Sidebar>
    );
  });

  describe("render", () => {
    describe("when sidebar is closed", () => {
      it("sets all the correct classes", () => {
        wrapper = mount(<Sidebar onCancel={spy} />);
        expect(wrapper.find('div[data-component="sidebar"]').text()).toEqual(
          ""
        );
      });
    });

    describe("when onCancel is fired", () => {
      it("should remove focus", () => {
        jest.useFakeTimers();
        const tempDiv = document.createElement("div");
        const element = document.body.appendChild(tempDiv);

        wrapper = mount(
          <Sidebar open onCancel={jest.fn}>
            <button type="button">test content</button>
          </Sidebar>,
          { attachTo: element }
        );

        jest.runAllTimers();

        expect(document.activeElement).toMatchObject(wrapper.find("button"));
        wrapper.setProps({ open: false });
        expect(document.activeElement).toMatchObject(document.body);

        jest.clearAllTimers();
      });
    });

    describe("when enableBackgroundUI is enabled", () => {
      it("sets all the correct classes", () => {
        wrapper = mount(
          <Sidebar
            open
            enableBackgroundUI
            size="small"
            position="left"
            onCancel={spy}
          />
        );
        expect(
          wrapper.find('[data-element="modal-background"]').length
        ).toEqual(0);
      });
    });

    describe("when there is no onCancel prop", () => {
      it("should not have a close button", () => {
        wrapper = mount(<Sidebar open />);
        expect(wrapper.find(".carbon-sidebar__close").length).toEqual(0);
      });
    });
  });

  describe("cancel icon", () => {
    it("closes when the close icon is click", () => {
      wrapper.find(IconButton).first().simulate("click");
      expect(spy).toHaveBeenCalled();
    });

    it("closes when close icon is focused and Enter key is pressed", () => {
      const icon = wrapper.find(IconButton).first();
      icon.simulate("keyDown", { which: 13, key: "Enter" });
      expect(spy).toHaveBeenCalled();
    });

    it("does not close when close icon is focused any other key is pressed", () => {
      const icon = wrapper.find(IconButton).first();
      icon.simulate("keyDown", { which: 65, key: "a" });
      expect(spy).not.toHaveBeenCalled();
    });
  });
});

describe("SidebarStyle", () => {
  describe("when prop size is passed to the component and position is set to right", () => {
    const wrapper = mount(
      <SidebarStyle open size="extra-small" position="right" />
    );

    it("should render correct style", () => {
      assertStyleMatch(
        {
          width: "150px",
          boxShadow:
            "0 10px 30px 0 rgba(0,20,29,0.1),0 30px 60px 0 rgba(0,20,29,0.1)",
          right: "0",
        },
        wrapper
      );
    });
  });

  describe("when prop left is passed to the component", () => {
    const wrapper = mount(
      <SidebarStyle open size="extra-small" position="left" />
    );

    it("should render correct style", () => {
      assertStyleMatch(
        {
          boxShadow:
            "0 10px 30px 0 rgba(0,20,29,0.1),0 30px 60px 0 rgba(0,20,29,0.1)",
          left: "0",
        },
        wrapper
      );
    });
  });
});

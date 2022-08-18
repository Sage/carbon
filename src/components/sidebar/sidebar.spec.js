import { mount } from "enzyme";
import React, { useRef } from "react";
import Sidebar from "./sidebar.component";
import Textbox from "../textbox";
import StyledSidebar from "./sidebar.style";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../__spec_helper__/test-utils";
import IconButton from "../icon-button";
import StyledIconButton from "../icon-button/icon-button.style";
import SidebarHeader from "./__internal__/sidebar-header/sidebar-header.component";
import guid from "../../__internal__/utils/helpers/guid";

jest.mock("../../__internal__/utils/helpers/guid");

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
        wrapper = mount(<Sidebar open={false} onCancel={spy} />);
        expect(wrapper.find('div[data-component="sidebar"]').text()).toEqual(
          ""
        );
      });

      describe("when onCancel prop is set", () => {
        it("should add the correct styles to the icon button", () => {
          assertStyleMatch(
            {
              position: "absolute",
              zIndex: "1",
              right: "25px",
              top: "25px",
            },
            wrapper.find(StyledSidebar),
            { modifier: `> ${StyledIconButton}:first-of-type` }
          );
        });
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

    describe("header", () => {
      it("does not render header if not provided", () => {
        wrapper = mount(<Sidebar open />);
        expect(wrapper.find(SidebarHeader).exists()).toBe(false);
      });

      it("does render header if provided", () => {
        wrapper = mount(<Sidebar open header="test header" />);
        expect(wrapper.find(SidebarHeader).contains("test header")).toBe(true);
      });

      it("when a header is provided, the container has an aria-labeledby attribute set to it's header's id", () => {
        guid.mockImplementation(() => "guid-12345");

        wrapper = mount(<Sidebar open header="test header" />);
        expect(
          wrapper.find(StyledSidebar).first().prop("aria-labelledby")
        ).toBe("guid-12345");
      });

      it("when no header is provided, the container has an aria-labeledby attribute set to the prop provided", () => {
        wrapper = mount(<Sidebar open aria-labelledby="my-id" />);
        expect(
          wrapper.find(StyledSidebar).first().prop("aria-labelledby")
        ).toBe("my-id");
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
      icon.simulate("keyDown", { key: "Enter" });
      expect(spy).toHaveBeenCalled();
    });

    it("does not close when close icon is focused any other key is pressed", () => {
      const icon = wrapper.find(IconButton).first();
      icon.simulate("keyDown", { key: "a" });
      expect(spy).not.toHaveBeenCalled();
    });
  });
});

describe("StyledSidebar", () => {
  describe("when prop size is passed to the component and position is set to right", () => {
    const wrapper = mount(
      <StyledSidebar open size="extra-small" position="right" />
    );

    it("should render correct style", () => {
      assertStyleMatch(
        {
          width: "214px",
          boxShadow: "var(--boxShadow300)",
          right: "0",
          display: "flex",
          flexDirection: "column",
        },
        wrapper
      );
    });
  });

  describe("when prop left is passed to the component", () => {
    const wrapper = mount(
      <StyledSidebar open size="extra-small" position="left" />
    );

    it("should render correct style", () => {
      assertStyleMatch(
        {
          boxShadow: "var(--boxShadow300)",
          left: "0",
        },
        wrapper
      );
    });
  });

  it("the sidebar ref should be forwarded", () => {
    let mockRef;

    const WrapperComponent = () => {
      mockRef = useRef();

      return (
        <Sidebar open ref={mockRef}>
          test content
        </Sidebar>
      );
    };

    const wrapper = mount(<WrapperComponent />);

    expect(mockRef.current).toBe(wrapper.find(StyledSidebar).getDOMNode());
  });
});

describe("Sidebar content", () => {
  testStyledSystemPadding(
    (props) => (
      <Sidebar open {...props}>
        Content
      </Sidebar>
    ),
    {
      pt: "var(--spacing300)",
      pb: "var(--spacing400)",
      px: "var(--spacing400)",
    },
    (component) => component.find("[data-element='sidebar-content']")
  );
});

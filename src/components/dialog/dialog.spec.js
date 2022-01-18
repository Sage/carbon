import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import Dialog from "./dialog.component";
import { DialogStyle, DialogTitleStyle } from "./dialog.style";
import Button from "../button";
import Heading from "../heading";
import { Row, Column } from "../row";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import Form from "../form";
import { StyledFormFooter } from "../form/form.style";
import IconButton from "../icon-button";
import Help from "../help";

jest.mock("../../hooks/__internal__/useResizeObserver");

describe("Dialog", () => {
  let onCancel;
  let addEventListenerSpy;
  let removeEventListenerSpy;

  let wrapper;
  beforeEach(() => {
    onCancel = jasmine.createSpy("cancel");
  });

  describe("event listeners", () => {
    beforeEach(() => {
      addEventListenerSpy = jest.spyOn(window, "addEventListener");
      removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("binds the key event listener to the document on mount", () => {
      wrapper = mount(
        <Dialog open>
          <div />
        </Dialog>
      );

      expect(
        addEventListenerSpy.mock.calls.filter((call) => call[0] === "resize")
      ).toHaveLength(1);
    });

    it("does not bind if component is not open on mount", () => {
      wrapper = mount(
        <Dialog open={false}>
          <div />
        </Dialog>
      );

      expect(
        addEventListenerSpy.mock.calls.filter((call) => call[0] === "resize")
      ).toHaveLength(0);
    });

    it("removes the event listener if modal was open on unmount", () => {
      wrapper = mount(
        <Dialog open>
          <div />
        </Dialog>
      );
      wrapper.unmount();

      expect(
        removeEventListenerSpy.mock.calls.filter((call) => call[0] === "resize")
      ).toHaveLength(1);
    });

    it("does not remove the event listener if it was not in use on unmount", () => {
      wrapper = mount(
        <Dialog open={false}>
          <div />
        </Dialog>
      );
      wrapper.unmount();

      expect(
        removeEventListenerSpy.mock.calls.filter((call) => call[0] === "resize")
      ).toHaveLength(0);
    });

    it("adds event listeners on modal open", () => {
      wrapper = mount(
        <Dialog open={false}>
          <div />
        </Dialog>
      );

      wrapper.setProps({ open: true });

      expect(
        addEventListenerSpy.mock.calls.filter((call) => call[0] === "resize")
      ).toHaveLength(1);
    });

    it("removes event listeners on modal close", () => {
      wrapper = mount(
        <Dialog open>
          <div />
        </Dialog>
      );

      wrapper.setProps({ open: false });
      expect(
        removeEventListenerSpy.mock.calls.filter((call) => call[0] === "resize")
      ).toHaveLength(1);
    });
  });

  it("renders when a child is undefined", () => {
    expect(() => {
      mount(
        <Dialog
          onCancel={() => {}}
          onConfirm={() => {}}
          open
          subtitle="Test"
          title="Test"
          role="dialog"
        >
          {undefined}
          Hello world
        </Dialog>
      );
    }).not.toThrow();
  });

  describe("dialog is centered", () => {
    beforeEach(() => {
      window.innerHeight = 300;
      window.innerWidth = 100;
    });

    afterEach(() => {
      window.innerHeight = 768;
      window.innerWidth = 1024;
      jest.clearAllMocks();
    });

    describe("when dialog is lower than 20px", () => {
      it("sets top position to the correct value on open", () => {
        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );
        expect(wrapper.find(DialogStyle).getDOMNode().style.top).toEqual(
          "150px"
        );
      });

      it("sets top position to the correct value on resize", () => {
        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );

        jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(() => ({
            height: 100,
          }));

        act(() => {
          useResizeObserver.mock.calls[
            useResizeObserver.mock.calls.length - 1
          ][1]();
        });

        expect(wrapper.find(DialogStyle).getDOMNode().style.top).toEqual(
          "100px"
        );
      });
    });

    describe("when dialog is higher than 20px", () => {
      it("sets top position to 20px on open", () => {
        jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(() => ({
            height: 261,
          }));

        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );

        expect(wrapper.find(DialogStyle).getDOMNode().style.top).toEqual(
          "20px"
        );
      });

      it("sets top position to 20px on resize", () => {
        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );

        jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(() => ({
            height: 261,
          }));

        act(() => {
          useResizeObserver.mock.calls[
            useResizeObserver.mock.calls.length - 1
          ][1]();
        });

        expect(wrapper.find(DialogStyle).getDOMNode().style.top).toEqual(
          "20px"
        );
      });
    });

    describe("when dialog is less than 20px from the side", () => {
      it("sets left position to 20px on open", () => {
        jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(() => ({
            width: 361,
          }));

        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );

        expect(wrapper.find(DialogStyle).getDOMNode().style.left).toEqual(
          "20px"
        );
      });

      it("sets left position to 20px on resize", () => {
        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );

        jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(() => ({
            width: 361,
          }));

        act(() => {
          useResizeObserver.mock.calls[
            useResizeObserver.mock.calls.length - 1
          ][1]();
        });

        expect(wrapper.find(DialogStyle).getDOMNode().style.left).toEqual(
          "20px"
        );
      });
    });
  });

  describe("form styles", () => {
    it("applies proper styles to sticky form footer", () => {
      wrapper = mount(
        <Dialog open>
          <Form />
        </Dialog>
      );

      assertStyleMatch(
        {
          marginLeft: "-35px",
          bottom: "-30px",
          marginBottom: "-30px",
          width: "calc(100% + 70px)",
          paddingLeft: "35px",
          paddingRight: "35px",
        },
        wrapper.find(DialogStyle),
        { modifier: `${StyledFormFooter}.sticky` }
      );
    });

    it("passes Dialog ref to the Form component when it is a children", () => {
      wrapper = mount(
        <Dialog open>
          <Form />
        </Dialog>
      );

      expect(wrapper.find(Form).props().dialogRef.current).toEqual(
        wrapper.find(DialogStyle).getDOMNode()
      );
    });
  });

  describe("dialog headers", () => {
    describe("when a props title or subtitle is passed", () => {
      it("sets a dialog headers", () => {
        wrapper = mount(
          <Dialog
            onCancel={onCancel}
            open
            title="Dialog title"
            subtitle="Dialog subtitle"
          />
        );
        expect(wrapper.find(Heading).prop("subheader")).toEqual(
          "Dialog subtitle"
        );
        expect(wrapper.find(Heading).prop("title")).toEqual("Dialog title");
      });
    });

    describe("when jsx is passed as title prop value", () => {
      it("Heading component is not used", () => {
        const TitleComponent = () => (
          <Row>
            <Column>Row1</Column>
            <Column>Row2</Column>
          </Row>
        );

        wrapper = mount(
          <Dialog onCancel={onCancel} open title={<TitleComponent />} />
        );

        expect(
          wrapper.find(DialogTitleStyle).find(TitleComponent).exists()
        ).toBe(true);
        expect(wrapper.find(Heading).exists()).toBe(false);
      });
    });

    describe("when a props title is not passed", () => {
      it("title is not rendered", () => {
        wrapper = mount(<Dialog onCancel={onCancel} open />);
        expect(wrapper.find(DialogTitleStyle).exists()).toBe(false);
        expect(wrapper.find(Heading).exists()).toBe(false);
      });
    });

    describe("when prop help is passed", () => {
      it("should render Help component", () => {
        wrapper = mount(
          <Dialog open title="This is test title" help="this is help text" />
        );

        expect(wrapper.find(Help).exists()).toBe(true);
      });
    });
  });

  describe("render", () => {
    describe("when dialog is open", () => {
      beforeEach(() => {
        wrapper = mount(
          <Dialog
            open
            title="Test"
            subtitle="Test"
            size="small"
            className="foo"
            onCancel={onCancel}
            onConfirm={() => {}}
            height="500"
            role="dialog"
            data-element="bar"
            data-role="baz"
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </Dialog>
        );
      });

      it("has the correct content, tags, elements etc", () => {
        expect(wrapper.props()["data-element"]).toEqual("bar");
        expect(wrapper.props()["data-role"]).toEqual("baz");
        expect(wrapper.props().showCloseIcon).toEqual(true);
        expect(wrapper.props().children.length).toEqual(2);
      });

      it("closes when the exit icon is click", () => {
        wrapper.find(IconButton).first().simulate("click");
        expect(onCancel).toHaveBeenCalled();
      });

      it("closes when exit icon is focused and Enter key is pressed", () => {
        const icon = wrapper.find(IconButton).first();
        icon.simulate("keyDown", { which: 13, key: "Enter" });
        expect(onCancel).toHaveBeenCalled();
      });

      it("does not close when exit icon is focused any other key is pressed", () => {
        const icon = wrapper.find(IconButton).first();
        icon.simulate("keyDown", { which: 65, key: "a" });
        expect(onCancel).not.toHaveBeenCalled();
      });
    });

    describe("when dialog is closed", () => {
      it("only renders a parent div with mainClasses attached", () => {
        wrapper = mount(<Dialog open={false} onCancel={onCancel} />);

        expect(wrapper.find(".carbon-dialog").at(0).length).toEqual(1);
        expect(wrapper.find(".carbon-dialog__dialog").length).toEqual(0);
      });
    });
  });

  describe("a11y", () => {
    beforeEach(() => {
      wrapper = mount(
        <Dialog
          onCancel={() => {}}
          onConfirm={() => {}}
          open
          subtitle="Test"
          title="Test"
          role="dialog"
        />
      );
    });

    describe("when title or subtitle are not set", () => {
      it(`does not render aria-labelledby pointing at the title element or
      an aria-describedby attribute pointing at the subtitle element`, () => {
        wrapper = mount(
          <Dialog onCancel={() => {}} onConfirm={() => {}} open />
        );

        expect(
          wrapper.find('[aria-describedby="carbon-dialog-subtitle"]').length
        ).toEqual(0);
        expect(
          wrapper.find('[aria-labelledby="carbon-dialog-title"]').length
        ).toEqual(0);
      });
    });
  });

  describe("when topMargin is passed to the DialogStyle", () => {
    it("should set correct max-height on DialogStyle", () => {
      assertStyleMatch(
        {
          maxHeight: "calc(100vh - 30px)",
        },
        mount(<DialogStyle topMargin={30} />)
      );
    });
  });

  describe.each(["400", "400px"])(
    "when height is passed to the Dialog",
    (height) => {
      it("have proper value passed as height css rule", () => {
        wrapper = mount(<Dialog open height={height} />);

        assertStyleMatch(
          {
            height: "400px",
          },
          wrapper.find(DialogStyle)
        );
      });
    }
  );

  describe("when showCloseIcon prop is true", () => {
    it("DialogTitleStyle should have padding-right: 85px", () => {
      wrapper = mount(<Dialog title="Heading" open />);

      const DialogTitle = wrapper.find(DialogTitleStyle);

      assertStyleMatch({ paddingRight: "85px" }, DialogTitle);
    });
  });

  describe("when auto focus disabled", () => {
    it("should not focus the first element by default", () => {
      mount(
        <Dialog open disableAutoFocus>
          <input type="text" />
        </Dialog>
      );

      const firstFocusableElement = document.querySelector("input");
      expect(document.activeElement).not.toBe(firstFocusableElement);
    });
  });

  describe("ARIA attributes", () => {
    describe("when a title is specified as string", () => {
      it("then the container should have aria-labeledby attribute set to it's title id", () => {
        wrapper = mount(<Dialog open title="Test" />);

        expect(
          wrapper
            .find("[data-element='dialog']")
            .first()
            .prop("aria-labelledby")
        ).toBe("carbon-dialog-title");
      });
    });

    describe("when the aria-labelledby prop is specified", () => {
      it("then the container should have the same aria-labeledby attribute", () => {
        const titleId = "foo";

        wrapper = mount(
          <Dialog
            aria-labelledby={titleId}
            open
            title={<div id={titleId}>Foo</div>}
          />
        );

        expect(
          wrapper
            .find("[data-element='dialog']")
            .first()
            .prop("aria-labelledby")
        ).toBe(titleId);
      });
    });

    describe("when the role prop is specified", () => {
      it("then the container should have the same role attribute", () => {
        const dialogRole = "foo";
        wrapper = mount(<Dialog open role={dialogRole} />);
        expect(
          wrapper.find("[data-element='dialog']").first().prop("role")
        ).toBe(dialogRole);
      });
    });

    describe("when the aria-label prop is specified", () => {
      it("then the container should have the same aria-label attribute", () => {
        const label = "foo";
        wrapper = mount(<Dialog open aria-label={label} />);
        expect(
          wrapper.find("[data-element='dialog']").first().prop("aria-label")
        ).toBe(label);
      });
    });
  });
});

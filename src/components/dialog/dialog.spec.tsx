import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";

import { space } from "style/themes/base/base-theme.config";
import guid from "../../__internal__/utils/helpers/guid";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import Dialog, { DialogProps } from "./dialog.component";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogInnerContent,
} from "./dialog.style";
import {
  HORIZONTAL_PADDING,
  CONTENT_TOP_PADDING,
  CONTENT_BOTTOM_PADDING,
} from "./dialog.config";
import Button from "../button";
import Heading from "../heading";
import {
  assertStyleMatch,
  getDefaultValue,
} from "../../__spec_helper__/test-utils";
import Form from "../form";
import { StyledFormContent, StyledFormFooter } from "../form/form.style";
import IconButton from "../icon-button";
import Help from "../help";

jest.mock("../../hooks/__internal__/useResizeObserver");
jest.mock("../../__internal__/utils/helpers/guid");

const useResizeObserverMock = useResizeObserver as jest.MockedFunction<
  typeof useResizeObserver
>;

describe("Dialog", () => {
  let onCancel: jest.Mock;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  let wrapper: ReactWrapper<DialogProps>;
  beforeEach(() => {
    onCancel = jest.fn();
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
        expect(
          (wrapper.find(StyledDialog).getDOMNode() as HTMLElement).style.top
        ).toEqual("150px");
      });

      it("sets top position to the correct value on resize", () => {
        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );

        jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(
            () =>
              ({
                height: 100,
              } as DOMRect)
          );

        act(() => {
          useResizeObserverMock.mock.calls[
            useResizeObserverMock.mock.calls.length - 1
          ][1]();
        });

        expect(
          (wrapper.find(StyledDialog).getDOMNode() as HTMLElement).style.top
        ).toEqual("100px");
      });
    });

    describe("when dialog is higher than 20px", () => {
      it("sets top position to 20px on open", () => {
        jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(
            () =>
              ({
                height: 261,
              } as DOMRect)
          );

        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );

        expect(
          (wrapper.find(StyledDialog).getDOMNode() as HTMLElement).style.top
        ).toEqual("20px");
      });

      it("sets top position to 20px on resize", () => {
        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );

        jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(
            () =>
              ({
                height: 261,
              } as DOMRect)
          );

        act(() => {
          useResizeObserverMock.mock.calls[
            useResizeObserverMock.mock.calls.length - 1
          ][1]();
        });

        expect(
          (wrapper.find(StyledDialog).getDOMNode() as HTMLElement).style.top
        ).toEqual("20px");
      });
    });

    describe("when dialog is less than 20px from the side", () => {
      it("sets left position to 20px on open", () => {
        jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(
            () =>
              ({
                width: 361,
              } as DOMRect)
          );

        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );

        expect(
          (wrapper.find(StyledDialog).getDOMNode() as HTMLElement).style.left
        ).toEqual("20px");
      });

      it("sets left position to 20px on resize", () => {
        wrapper = mount(
          <Dialog open>
            <div />
          </Dialog>
        );

        jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(
            () =>
              ({
                width: 361,
              } as DOMRect)
          );

        act(() => {
          useResizeObserverMock.mock.calls[
            useResizeObserverMock.mock.calls.length - 1
          ][1]();
        });

        expect(
          (wrapper.find(StyledDialog).getDOMNode() as HTMLElement).style.left
        ).toEqual("20px");
      });
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
          <div>
            <span>Row1</span>
            <span>Row2</span>
          </div>
        );

        wrapper = mount(
          <Dialog onCancel={onCancel} open title={<TitleComponent />} />
        );

        expect(
          wrapper.find(StyledDialogTitle).find(TitleComponent).exists()
        ).toBe(true);
        expect(wrapper.find(Heading).exists()).toBe(false);
      });
    });

    describe("when a props title is not passed", () => {
      it("title is not rendered", () => {
        wrapper = mount(<Dialog onCancel={onCancel} open />);
        expect(wrapper.find(StyledDialogTitle).exists()).toBe(false);
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
        expect((wrapper.props().children as JSX.Element[]).length).toEqual(2);
      });

      it("closes when the exit icon is click", () => {
        wrapper.find(IconButton).first().simulate("click");
        expect(onCancel).toHaveBeenCalled();
      });

      it("closes when exit icon is focused and Enter key is pressed", () => {
        const icon = wrapper.find(IconButton).first();
        icon.simulate("keyDown", { key: "Enter" });
        expect(onCancel).toHaveBeenCalled();
      });

      it("does not close when exit icon is focused any other key is pressed", () => {
        const icon = wrapper.find(IconButton).first();
        icon.simulate("keyDown", { key: "a" });
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

  describe("when topMargin is passed to the StyledDialog", () => {
    it("should set correct max-height on StyledDialog", () => {
      assertStyleMatch(
        {
          maxHeight: "calc(100vh - 30px)",
        },
        mount(<StyledDialog topMargin={30} />)
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
          wrapper.find(StyledDialog)
        );
      });
    }
  );

  describe("when showCloseIcon prop is true", () => {
    it("StyledDialogTitle should have padding-right: 85px", () => {
      wrapper = mount(<Dialog title="Heading" open />);

      const DialogTitle = wrapper.find(StyledDialogTitle);

      assertStyleMatch({ paddingRight: "85px" }, DialogTitle);
    });
  });

  describe("when the Form child has a sticky footer", () => {
    it("does not set overflow styling", () => {
      wrapper = mount(
        <Dialog open>
          <Form stickyFooter />
        </Dialog>
      );

      expect(wrapper.find(StyledDialogContent)).not.toHaveStyleRule(
        "overflow-y"
      );
    });
  });

  describe("when the Form child does not have a sticky footer", () => {
    it("sets overflow styling", () => {
      wrapper = mount(
        <Dialog open>
          <Form />
        </Dialog>
      );

      expect(wrapper.find(StyledDialogContent)).toHaveStyleRule(
        "overflow-y",
        "auto"
      );
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
      it("then the container should have aria-labelledby attribute set to it's title id", () => {
        (guid as jest.MockedFunction<typeof guid>).mockImplementation(
          () => "foo"
        );
        wrapper = mount(<Dialog open title="Test" />);

        expect(
          wrapper
            .find("[data-element='dialog']")
            .first()
            .prop("aria-labelledby")
        ).toBe("foo");
      });
    });

    describe("when a subtitle is specified", () => {
      it("then the container should have aria-describedby attribute set to it's subtitle id", () => {
        (guid as jest.MockedFunction<typeof guid>).mockImplementation(
          () => "baz"
        );

        wrapper = mount(<Dialog open subtitle="Test" />);

        expect(
          wrapper
            .find("[data-element='dialog']")
            .first()
            .prop("aria-describedby")
        ).toBe("baz");
      });
    });

    describe("when the aria-labelledby prop is specified", () => {
      it("then the container should have the same aria-labelledby attribute", () => {
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

  describe("contentPadding", () => {
    const defaultPaddingValues = {
      left: HORIZONTAL_PADDING,
      right: HORIZONTAL_PADDING,
      top: CONTENT_TOP_PADDING,
      bottom: CONTENT_BOTTOM_PADDING,
    };

    const setNegativeValue = (tokenValue?: string | number) =>
      `calc(-1px * ${tokenValue})`;

    const getValue = (value: number | undefined, isMargin?: boolean) => {
      const defaultValue = getDefaultValue(value);

      return isMargin ? setNegativeValue(defaultValue) : defaultValue;
    };

    const getFormSpacing = (
      value: number | undefined,
      position: "top" | "bottom" | "left" | "right",
      prop: "py" | "px" | "p",
      isMargin?: boolean
    ) => {
      if (
        value === undefined ||
        (["top", "bottom"].includes(position) && !["p", "py"].includes(prop)) ||
        (["left", "right"].includes(position) && !["p", "px"].includes(prop))
      ) {
        return isMargin
          ? setNegativeValue(defaultPaddingValues[position])
          : `${defaultPaddingValues[position]}px`;
      }

      return getValue(value, isMargin);
    };

    const getDialogContentPadding = (
      value: number | undefined,
      isMatch: boolean,
      allSides?: boolean
    ) => {
      if (value === undefined || !isMatch) {
        return allSides
          ? `0px ${HORIZONTAL_PADDING}px ${CONTENT_BOTTOM_PADDING}px`
          : undefined;
      }

      return getValue(value);
    };

    describe.each([undefined, 0, 1, 2, 3, 4, 5, 6, 7, 8])(
      "when `%s` is passed",
      (value) => {
        describe.each(["p", "py", "px"] as const)(
          "to the `%s` property",
          (prop) => {
            beforeEach(() => {
              wrapper = mount(
                <Dialog open contentPadding={{ [prop]: value }}>
                  <Form />
                </Dialog>
              );
            });

            it("applies the expected values to the DialogStyle and Form elements", () => {
              assertStyleMatch(
                {
                  marginLeft: getFormSpacing(value, "left", prop, true),
                  marginRight: getFormSpacing(value, "right", prop, true),
                  marginTop: getFormSpacing(value, "top", prop, true),
                  paddingTop: getFormSpacing(value, "top", prop),
                  paddingBottom: getFormSpacing(value, "bottom", prop),
                  paddingLeft: getFormSpacing(value, "left", prop),
                  paddingRight: getFormSpacing(value, "right", prop),
                },
                wrapper.find(StyledDialog),
                { modifier: `${StyledFormContent}.sticky` }
              );

              const width =
                value === undefined || !["p", "px"].includes(prop)
                  ? HORIZONTAL_PADDING
                  : space[value];

              assertStyleMatch(
                {
                  marginLeft: getFormSpacing(value, "left", prop, true),
                  marginRight: getFormSpacing(value, "right", prop, true),
                  marginBottom: getFormSpacing(value, "bottom", prop, true),
                  bottom: getFormSpacing(value, "bottom", prop, true),
                  width: `calc(100% + (2px * ${width}))`,
                },
                wrapper.find(StyledDialog),
                { modifier: `${StyledFormFooter}.sticky` }
              );
            });

            it("applies the expected values to the DialogContentStyle and DialogInnerContentStyle elements", () => {
              assertStyleMatch(
                {
                  padding: getDialogContentPadding(value, prop === "p", true),
                  paddingLeft: getDialogContentPadding(value, prop === "px"),
                  paddingRight: getDialogContentPadding(value, prop === "px"),
                  paddingTop: getDialogContentPadding(value, prop === "py"),
                  paddingBottom: getDialogContentPadding(value, prop === "py"),
                },
                wrapper.find(StyledDialogContent)
              );

              assertStyleMatch(
                {
                  paddingTop:
                    ["py", "p"].includes(prop) && value !== undefined
                      ? "0"
                      : `${CONTENT_TOP_PADDING}px`,
                },
                wrapper.find(StyledDialogInnerContent)
              );
            });
          }
        );
      }
    );
  });
});

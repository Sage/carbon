import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { render as rtlRender, screen } from "@testing-library/react";
import type { RenderOptions as RTLRenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Dialog from ".";
import type { DialogHandle } from ".";

import { space } from "../../style/themes/base/base-theme.config";
import guid from "../../__internal__/utils/helpers/guid";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
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
import Help from "../help";
import CarbonProvider from "../carbon-provider";
import Logger from "../../__internal__/utils/logger";

// mock Logger.deprecate so that no console warnings occur while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

jest.mock("../../hooks/__internal__/useResizeObserver");
jest.mock("../../__internal__/utils/helpers/guid");

const useResizeObserverMock = useResizeObserver as jest.MockedFunction<
  typeof useResizeObserver
>;

function enzymeMount(ui: React.ReactElement, document = globalThis.document) {
  if (document.body.innerHTML.length >= 1) {
    throw new Error(
      "Found DOM to be non-empty before mounting. Please make sure to call cleanup() after each test."
    );
  }

  const container = document.createElement("div");
  container.setAttribute("id", "enzymeContainer");
  document.body.appendChild(container);
  return mount(ui, { attachTo: container });
}

function render(
  ui: React.ReactElement,
  options?: RTLRenderOptions,
  document = globalThis.document
) {
  if (document.body.innerHTML.length >= 1) {
    throw new Error(
      "Found DOM to be non-empty before rendering. Please make sure to call cleanup() after each test."
    );
  }

  return rtlRender(ui, options);
}
function cleanup(document = globalThis.document) {
  document.body.innerHTML = "";
}

describe("Dialog", () => {
  let onCancel: jest.Mock;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  beforeEach(() => {
    onCancel = jest.fn();
  });

  afterEach(() => {
    onCancel.mockClear();
    cleanup();
  });

  describe("event listeners", () => {
    beforeEach(() => {
      addEventListenerSpy = jest.spyOn(window, "addEventListener");
      removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    });

    afterEach(() => {
      addEventListenerSpy.mockClear();
      removeEventListenerSpy.mockClear();
    });

    it("binds the key event listener to the document on mount", () => {
      enzymeMount(
        <Dialog open>
          <div />
        </Dialog>
      );

      expect(
        addEventListenerSpy.mock.calls.filter((call) => call[0] === "resize")
      ).toHaveLength(1);
    });

    it("does not bind if component is not open on mount", () => {
      enzymeMount(
        <Dialog open={false}>
          <div />
        </Dialog>
      );

      expect(
        addEventListenerSpy.mock.calls.filter((call) => call[0] === "resize")
      ).toHaveLength(0);
    });

    it("removes the event listener if modal was open on unmount", () => {
      const wrapper = enzymeMount(
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
      const wrapper = enzymeMount(
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
      const wrapper = enzymeMount(
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
      const wrapper = enzymeMount(
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
      enzymeMount(
        <Dialog
          onCancel={() => {}}
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
    let getBoundingClientRectMock: jest.SpyInstance<DOMRect> | undefined;

    beforeEach(() => {
      window.innerHeight = 300;
      window.innerWidth = 100;
    });

    afterEach(() => {
      window.innerHeight = 768;
      window.innerWidth = 1024;
      getBoundingClientRectMock?.mockClear();
    });

    describe("when dialog is lower than 20px", () => {
      it("sets top position to the correct value on open", () => {
        const wrapper = enzymeMount(
          <Dialog open>
            <div />
          </Dialog>
        );
        expect(
          (wrapper.find(StyledDialog).getDOMNode() as HTMLElement).style.top
        ).toEqual("150px");
      });

      it("sets top position to the correct value on resize", () => {
        const wrapper = enzymeMount(
          <Dialog open>
            <div />
          </Dialog>
        );

        getBoundingClientRectMock = jest
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
        getBoundingClientRectMock = jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(
            () =>
              ({
                height: 261,
              } as DOMRect)
          );

        const wrapper = enzymeMount(
          <Dialog open>
            <div />
          </Dialog>
        );

        expect(
          (wrapper.find(StyledDialog).getDOMNode() as HTMLElement).style.top
        ).toEqual("20px");
      });

      it("sets top position to 20px on resize", () => {
        const wrapper = enzymeMount(
          <Dialog open>
            <div />
          </Dialog>
        );

        getBoundingClientRectMock = jest
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

    describe("when dialog is less than 0px from the side", () => {
      it("sets left position to 0px on open", () => {
        getBoundingClientRectMock = jest
          .spyOn(Element.prototype, "getBoundingClientRect")
          .mockImplementation(
            () =>
              ({
                width: 361,
              } as DOMRect)
          );

        const wrapper = enzymeMount(
          <Dialog open>
            <div />
          </Dialog>
        );

        expect(
          (wrapper.find(StyledDialog).getDOMNode() as HTMLElement).style.left
        ).toEqual("0px");
      });

      it("sets left position to 0px on resize", () => {
        const wrapper = enzymeMount(
          <Dialog open>
            <div />
          </Dialog>
        );

        getBoundingClientRectMock = jest
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
        ).toEqual("0px");
      });
    });
  });

  describe("dialog headers", () => {
    describe("when title and subtitle props are passed", () => {
      it("sets a dialog headers", () => {
        const wrapper = enzymeMount(
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

    describe("when jsx is passed to title prop", () => {
      it("Heading component is not used", () => {
        const TitleComponent = () => (
          <div>
            <span>Row1</span>
            <span>Row2</span>
          </div>
        );

        const wrapper = enzymeMount(
          <Dialog onCancel={onCancel} open title={<TitleComponent />} />
        );

        expect(
          wrapper.find(StyledDialogTitle).find(TitleComponent).exists()
        ).toBe(true);
        expect(wrapper.find(Heading).exists()).toBe(false);
      });
    });

    describe("when title prop is not passed", () => {
      it("title is not rendered", () => {
        const wrapper = enzymeMount(<Dialog onCancel={onCancel} open />);
        expect(wrapper.find(StyledDialogTitle).exists()).toBe(false);
        expect(wrapper.find(Heading).exists()).toBe(false);
      });
    });

    describe("when help prop is passed", () => {
      it("should render Help component", () => {
        const wrapper = enzymeMount(
          <Dialog open title="This is test title" help="this is help text" />
        );

        expect(wrapper.find(Help).exists()).toBe(true);
      });
    });
  });

  describe("render", () => {
    describe("when dialog is open", () => {
      const TestDialog = () => (
        <Dialog
          open
          title="Test"
          subtitle="Test"
          size="small"
          className="foo"
          onCancel={onCancel}
          height="500"
          role="dialog"
        >
          <Button>Button</Button>
          <Button>Button</Button>
        </Dialog>
      );

      it("closes when the close button is clicked", () => {
        const wrapper = enzymeMount(<TestDialog />);
        wrapper.find("button[data-element='close']").simulate("click");
        expect(onCancel).toHaveBeenCalled();
      });

      it("closes when close button is focused and Enter key is pressed", () => {
        const wrapper = enzymeMount(<TestDialog />);
        const icon = wrapper.find("button[data-element='close']");
        icon.simulate("keyDown", { key: "Enter" });
        expect(onCancel).toHaveBeenCalled();
      });

      it("does not close when close button is focused Enter key is not pressed", () => {
        const wrapper = enzymeMount(<TestDialog />);

        const icon = wrapper.find("button[data-element='close']");
        icon.simulate("keyDown", { key: "a" });
        expect(onCancel).not.toHaveBeenCalled();
      });
    });

    describe("when dialog is closed", () => {
      it("only renders a parent div with mainClasses attached", () => {
        const wrapper = enzymeMount(
          <Dialog open={false} onCancel={onCancel} />
        );

        expect(wrapper.find(".carbon-dialog").at(0).length).toEqual(1);
        expect(wrapper.find(".carbon-dialog__dialog").length).toEqual(0);
      });
    });
  });

  describe("when title or subtitle are not passed", () => {
    it(`does not render aria-labelledby pointing at the title element or
      an aria-describedby attribute pointing at the subtitle element`, () => {
      const wrapper = enzymeMount(<Dialog onCancel={() => {}} open />);

      expect(
        wrapper.find('[aria-describedby="carbon-dialog-subtitle"]').length
      ).toEqual(0);
      expect(
        wrapper.find('[aria-labelledby="carbon-dialog-title"]').length
      ).toEqual(0);
    });
  });

  it("should have aria-modal attribute on the dialog container", () => {
    onCancel = jest.fn();

    const wrapper = enzymeMount(
      <CarbonProvider>
        <Dialog
          onCancel={onCancel}
          className="foo"
          open
          title="my title"
          subtitle="my subtitle"
        >
          <Button>Button</Button>
          <Button>Button</Button>
        </Dialog>
      </CarbonProvider>
    );

    expect(
      wrapper.find(StyledDialog).getDOMNode().getAttribute("aria-modal")
    ).toBe("true");
  });

  it("should have correct max-height", () => {
    const wrapper = enzymeMount(
      <Dialog open title="My dialog" subtitle="subtitle">
        Content
      </Dialog>
    );
    assertStyleMatch(
      {
        maxHeight: "calc(100vh - 20px)",
      },
      wrapper.find(StyledDialog)
    );
  });

  describe.each(["400", "400px"])(
    "when height is passed to the Dialog",
    (height) => {
      it("have proper value passed as height css rule", () => {
        const wrapper = enzymeMount(<Dialog open height={height} />);

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
    it("dialog title should have padding-right: 85px", () => {
      const wrapper = enzymeMount(<Dialog title="Heading" open />);

      assertStyleMatch(
        { paddingRight: "85px" },
        wrapper.find(StyledDialogTitle)
      );
    });
  });

  describe("when the Form child has a sticky footer", () => {
    it("does not set overflow styling", () => {
      const wrapper = enzymeMount(
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
      const wrapper = enzymeMount(
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
      const wrapper = enzymeMount(
        <Dialog open disableAutoFocus>
          <input data-role="test-input" type="text" />
        </Dialog>
      );

      const firstFocusableElement = wrapper
        .find("input[data-role='test-input']")
        .getDOMNode();
      expect(document.activeElement).not.toBe(firstFocusableElement);
    });
  });

  describe("ARIA attributes", () => {
    describe("when a title is specified as string", () => {
      it("then the container should have aria-labelledby attribute set to it's title id", () => {
        (guid as jest.MockedFunction<typeof guid>).mockImplementation(
          () => "foo"
        );
        const wrapper = enzymeMount(<Dialog open title="Test" />);

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

        const wrapper = enzymeMount(<Dialog open subtitle="Test" />);

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

        const wrapper = enzymeMount(
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
        const wrapper = enzymeMount(<Dialog open role={dialogRole} />);
        expect(
          wrapper.find("[data-element='dialog']").first().prop("role")
        ).toBe(dialogRole);
      });
    });

    describe("when the aria-label prop is specified", () => {
      it("then the container should have the same aria-label attribute", () => {
        const label = "foo";
        const wrapper = enzymeMount(<Dialog open aria-label={label} />);
        expect(
          wrapper.find("[data-element='dialog']").first().prop("aria-label")
        ).toBe(label);
      });
    });
  });

  describe("contentPadding", () => {
    const defaultPaddingValues = {
      left: `${HORIZONTAL_PADDING}px`,
      right: `${HORIZONTAL_PADDING}px`,
      top: `${CONTENT_TOP_PADDING}px`,
      bottom: `${CONTENT_BOTTOM_PADDING}px`,
    };

    const setNegativeValue = (tokenValue?: string | number) => {
      const stringValue =
        typeof tokenValue === "number" ? `${tokenValue}px` : tokenValue;
      return `calc(-1 * ${stringValue})`;
    };

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
          : defaultPaddingValues[position];
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
            const TestDialog = () => (
              <Dialog open contentPadding={{ [prop]: value }}>
                <Form />
              </Dialog>
            );

            it("applies the expected values to the DialogStyle and Form elements", () => {
              const wrapper = enzymeMount(<TestDialog />);

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
                  ? `${HORIZONTAL_PADDING}px`
                  : space[value];

              assertStyleMatch(
                {
                  marginLeft: getFormSpacing(value, "left", prop, true),
                  marginRight: getFormSpacing(value, "right", prop, true),
                  marginBottom: getFormSpacing(value, "bottom", prop, true),
                  width: `calc(100% + (${width} + ${width}))`,
                },
                wrapper.find(StyledDialog),
                { modifier: `${StyledFormFooter}.sticky` }
              );
            });

            it("applies the expected values to the DialogContentStyle and DialogInnerContentStyle elements", () => {
              const wrapper = enzymeMount(<TestDialog />);

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

  it("applies the expected border radius to the main container and footer elements", () => {
    const wrapper = enzymeMount(
      <Dialog open title="My dialog" subtitle="subtitle">
        Content
      </Dialog>
    );

    assertStyleMatch(
      {
        borderRadius: "var(--borderRadius200)",
      },
      wrapper.find(StyledDialog)
    );

    assertStyleMatch(
      {
        borderBottomRightRadius: "var(--borderRadius200)",
        borderBottomLeftRadius: "var(--borderRadius200)",
      },
      wrapper.find(StyledDialog),
      { modifier: `${StyledFormFooter}.sticky` }
    );
  });
});

describe("when ref handle is passed to Dialog", () => {
  it("calling exposed focus method refocuses on Dialog's root container", async () => {
    const MockComponent = () => {
      const dialogHandle = React.useRef<DialogHandle>(null);

      return (
        <Dialog open title="My dialog" ref={dialogHandle}>
          <Button onClick={() => dialogHandle.current?.focus()}>
            Press me to refocus on Dialog
          </Button>
        </Dialog>
      );
    };
    const user = userEvent.setup();
    render(<MockComponent />);
    const button = screen.getByRole("button");
    button.focus();

    await user.click(button);

    expect(screen.getByRole("dialog")).toHaveFocus();
  });
});

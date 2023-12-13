import React from "react";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import TypeIconStyle from "components/message/type-icon/type-icon.style";
import Icon from "components/icon";
import Logger from "../../__internal__/utils/logger";
import guid from "../../__internal__/utils/helpers/guid";
import Toast, { ToastProps } from "./toast.component";
import {
  StyledToast,
  StyledToastContent,
  ToastWrapper,
  StyledPortal,
  TypeIcon,
} from "./toast.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import IconButton from "../icon-button";
import Button from "../button";
import ModalManager from "../modal/__internal__/modal-manager";
import {
  elementsTagTest,
  rootTagTest,
} from "../../__internal__/utils/helpers/tags/tags-specs";

jest.mock("../../__internal__/utils/helpers/guid");
jest.mock("../../__internal__/utils/logger");

describe("Toast", () => {
  (guid as jest.MockedFunction<typeof guid>).mockImplementation(
    () => "guid-12345"
  );

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("modal manager", () => {
    jest.spyOn(ModalManager, "addModal");
    const removeModalSpy = jest.spyOn(ModalManager, "removeModal");
    let wrapper: ReactWrapper;

    describe("when component mounts", () => {
      beforeEach(() => {
        wrapper = mount(
          <Toast isCenter onDismiss={() => {}}>
            foobar
          </Toast>
        );
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it("is added to modal manager", () => {
        const toast = wrapper.find(ToastWrapper).getDOMNode();
        expect(ModalManager.addModal).toHaveBeenCalledWith(
          toast,
          undefined,
          true
        );
      });
    });

    describe("when component unmounts", () => {
      it("is removed from modal manager", () => {
        removeModalSpy.mockClear();
        wrapper = mount(<Toast onDismiss={() => {}}>foobar</Toast>);
        const toast = wrapper.find(ToastWrapper).getDOMNode();
        wrapper.unmount();
        expect(ModalManager.removeModal).toHaveBeenCalledWith(toast, true);
      });
    });
  });

  describe("when toast is closed", () => {
    let wrapper: ReactWrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it("should exists anyway", () => {
      wrapper = mount(
        <Toast
          open={false}
          variant="info"
          className="custom"
          onDismiss={() => {}}
        >
          foobar
        </Toast>
      );
      expect(wrapper).toBeTruthy();
      expect(wrapper.prop("open")).toEqual(false);
    });

    it("is removed from modal manager", () => {
      wrapper = mount(<Toast onDismiss={() => {}}>foobar</Toast>);
      const toast = wrapper.find(ToastWrapper).getDOMNode();
      wrapper.setProps({ open: false });
      expect(ModalManager.removeModal).toHaveBeenCalledWith(toast, true);
    });

    describe("and escape key is released", () => {
      it("stopImmediatePropagation function should not have been called on the event", () => {
        wrapper = mount(<Toast onDismiss={() => {}}>foobar</Toast>);
        wrapper.setProps({ open: false });
        const escapeKeyEvent = new KeyboardEvent("keyup", {
          key: "Escape",
          bubbles: true,
        });
        jest.spyOn(escapeKeyEvent, "stopImmediatePropagation");
        document.dispatchEvent(escapeKeyEvent);
        expect(escapeKeyEvent.stopImmediatePropagation).not.toHaveBeenCalled();
      });
    });
  });

  describe("when toast is open", () => {
    let wrapper: ShallowWrapper | ReactWrapper;

    describe("with prop isCenter", () => {
      afterEach(() => {
        wrapper.unmount();
      });

      it("should render Toast in the center of the document", () => {
        wrapper = mount(<ToastWrapper isCenter />);

        assertStyleMatch(
          {
            position: "relative",
            width: "auto",
            height: "auto",
            justifyContent: "center",
            display: "flex",
          },
          wrapper
        );
      });
    });

    it("does not render close icon", () => {
      wrapper = mount(
        <Toast open variant="info" className="custom">
          foobar
        </Toast>
      );
      const icon = wrapper.find("[data-element='close']");

      expect(icon.exists()).toBe(false);

      wrapper.unmount();
    });

    it("renders the component with correct classes", () => {
      wrapper = shallow(
        <Toast open className="exampleClass">
          Child
        </Toast>
      );
      expect(wrapper.find(".exampleClass")).toHaveLength(1);
    });

    it("renders the component with correct id", () => {
      const toastId = "toast-id";
      wrapper = shallow(
        <Toast open id={toastId}>
          Child
        </Toast>
      );
      expect(wrapper.find('[data-component="toast"]').prop("id")).toBe(toastId);
    });

    it("renders child content", () => {
      wrapper = shallow(<Toast>children</Toast>);
      expect(wrapper.contains("children")).toBe(true);
    });

    describe("with onDismiss prop", () => {
      let onDismiss: jest.Mock;

      beforeEach(() => {
        onDismiss = jest.fn();
        wrapper = mount(
          <Toast open onDismiss={onDismiss}>
            Child
          </Toast>
        );
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it("renders close icon", () => {
        const icon = wrapper.find("[data-element='close']");

        expect(icon.exists()).toBe(true);
      });

      it("auto focuses the toast component", () => {
        const toast = wrapper.find(StyledToast);
        jest.runAllTimers();

        expect(toast).toBeFocused();
      });

      it("sets a tabIndex on the toast component and removes onBlur", () => {
        const toast = wrapper.find(StyledToast);

        expect(toast.getDOMNode().hasAttribute("tabIndex")).toBe(true);

        act(() => {
          toast.simulate("blur");
        });
        wrapper.update();

        expect(toast.getDOMNode().hasAttribute("tabIndex")).toBe(false);
      });

      it("when the toast closes, focus is returned to the element it was on before the toast opened", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);
        const WrapperComponent = (toastProps: Partial<ToastProps>) => (
          <>
            <Button id="buttonId">A button</Button>
            <Toast {...toastProps}>Child</Toast>
          </>
        );

        wrapper.unmount();
        wrapper = mount(
          <WrapperComponent onDismiss={onDismiss} open={false} />,
          { attachTo: htmlElement }
        );
        const button = wrapper.find("#buttonId").first();
        (button.getDOMNode() as HTMLButtonElement).focus();

        wrapper.setProps({ open: true });
        const toast = wrapper.find("[data-component='toast']").first();
        jest.runAllTimers();
        expect(toast).toBeFocused();

        wrapper.setProps({ open: false });
        wrapper.update();
        expect(button).toBeFocused();
      });

      it("when the toast closes and then re-opens the wrapper is focused again", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);
        const WrapperComponent = (toastProps: Partial<ToastProps>) => (
          <>
            <Button id="buttonId">A button</Button>
            <Toast {...toastProps}>Child</Toast>
          </>
        );

        wrapper.unmount();
        wrapper = mount(
          <WrapperComponent onDismiss={onDismiss} open={false} />,
          { attachTo: htmlElement }
        );

        wrapper.setProps({ open: true });
        const toast = wrapper.find("[data-component='toast']").first();
        jest.runAllTimers();
        expect(toast).toBeFocused();

        wrapper.setProps({ open: false });
        wrapper.update();

        wrapper.setProps({ open: true });
        expect(toast).toBeFocused();
      });

      describe("calls onDismiss method when", () => {
        it("dismiss icon is clicked", () => {
          wrapper.find(IconButton).first().simulate("click");
          expect(onDismiss).toHaveBeenCalled();
        });

        it("dismiss icon is focused and Enter key is pressed", () => {
          const icon = wrapper.find(IconButton).first();
          icon.simulate("keyDown", { key: "Enter" });
          expect(onDismiss).toHaveBeenCalled();
        });

        it("timeout is provided", () => {
          jest.useFakeTimers();
          const mockFn = jest.fn();
          wrapper.setProps({ timeout: 2000, onDismiss: mockFn });
          jest.advanceTimersByTime(2000);
          expect(mockFn).toHaveBeenCalledTimes(1);
        });
      });

      describe("does not call onDismiss method when", () => {
        it("dismiss icon is focused any other key is pressed", () => {
          const icon = wrapper.find(IconButton).first();
          icon.simulate("keyDown", { key: "a" });
          expect(onDismiss).not.toHaveBeenCalled();
        });

        it("timeout is provided but toast is not open", () => {
          jest.useFakeTimers();
          const mockFn = jest.fn();
          wrapper.setProps({ timeout: 2000, open: false, onDismiss: mockFn });
          jest.advanceTimersByTime(2000);
          expect(mockFn).not.toHaveBeenCalled();
        });
      });

      describe("with disableAutoFocus prop", () => {
        it("does not auto focus the Toast wrapper", () => {
          wrapper.unmount();
          wrapper = mount(
            <Toast open onDismiss={onDismiss} disableAutoFocus>
              Child
            </Toast>
          );
          const toast = wrapper.find(StyledToast);
          expect(toast.getDOMNode().hasAttribute("tabIndex")).toBe(false);
          jest.runAllTimers();
          expect(toast).not.toBeFocused();
        });

        it("when the toast closes, focus is not returned to the element it was on before the toast opened", () => {
          const element = document.createElement("div");
          const htmlElement = document.body.appendChild(element);
          const WrapperComponent = (toastProps: Partial<ToastProps>) => (
            <>
              <Button id="buttonId">A button</Button>
              <Toast {...toastProps}>Child</Toast>
            </>
          );

          wrapper.unmount();
          wrapper = mount(
            <WrapperComponent
              onDismiss={onDismiss}
              open={false}
              disableAutoFocus
            />,
            { attachTo: htmlElement }
          );

          wrapper.setProps({ open: true });
          const icon = wrapper.find("[data-element='close']").first();
          (icon.getDOMNode() as HTMLElement).focus();

          wrapper.setProps({ open: false });
          const button = wrapper.find("#buttonId").first();
          expect(button).not.toBeFocused();
        });
      });
    });
  });

  describe("tags", () => {
    let wrapper;

    describe("on component", () => {
      it("include correct component, element and role data tags", () => {
        wrapper = shallow(
          <Toast data-element="bar" data-role="baz">
            Child
          </Toast>
        );

        rootTagTest(
          wrapper.find('[data-component="toast"]'),
          "toast",
          "bar",
          "baz"
        );
      });
    });

    describe("on internal elements", () => {
      wrapper = mount(
        <Toast open onDismiss={() => {}}>
          Child
        </Toast>
      );
      elementsTagTest(wrapper.find(IconButton).first().find("span"), ["close"]);
      wrapper.unmount();
    });
  });

  describe("when toast has specified maximum width", () => {
    let wrapper: ReactWrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render StyledToast with correct maxWidth", () => {
      wrapper = mount(<Toast maxWidth="200px">Child</Toast>);
      assertStyleMatch({ maxWidth: "200px" }, wrapper.find(StyledToast));
    });
  });

  describe("when isNotice prop is set", () => {
    const onDismissFn = jest.fn();
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = mount(
        <Toast onDismiss={onDismissFn} open variant="notice">
          foo
        </Toast>
      );
    });

    it("then the prop should be passed to StyledToast", () => {
      expect(wrapper.find(StyledToast).props().isNotice).toBe(true);
    });

    it("then the prop should be passed to StyledPortal", () => {
      expect(wrapper.find(StyledPortal).props().isNotice).toBe(true);
    });

    it("then the prop should be passed to ToastWrapper", () => {
      expect(wrapper.find(ToastWrapper).props().isNotice).toBe(true);
    });

    it("then the prop should be passed to StyledToastContent", () => {
      expect(wrapper.find(StyledToastContent).props().isNotice).toBe(true);
    });

    it("then the TypeIcon should not be rendered", () => {
      expect(wrapper.find(TypeIcon).exists()).toBe(false);
    });
  });

  describe("Correct icon is rendered", () => {
    it.each([
      ["info", "neutral"],
      ["tick_circle", "success"],
      ["warning", "warning"],
    ] as const)(`should render %s when variant is %s`, (icon, variant) => {
      const wrapper = mount(
        <Toast open variant={variant}>
          foo
        </Toast>
      );
      expect(wrapper.find(TypeIcon).exists()).toBe(true);
      expect(wrapper.find(Icon).prop("type")).toBe(icon);
    });
  });

  it("does not throw when ref is a function", () => {
    expect(() => {
      mount(
        <Toast isCenter onDismiss={() => {}} ref={(ref) => ref}>
          foobar
        </Toast>
      );
    }).not.toThrow();
  });

  it("passes ref to component", () => {
    const ref = { current: null };

    const wrapper = mount(
      <Toast isCenter onDismiss={() => {}} ref={ref}>
        foobar
      </Toast>
    );

    expect(ref.current).toBe(wrapper.find(ToastWrapper).getDOMNode());
  });
});

describe("StyledToast", () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render with correct style based on default theme", () => {
    wrapper = mount(<StyledToast variant="success" />);

    assertStyleMatch(
      {
        boxShadow:
          "0 10px 30px 0 rgba(0,20,29,0.1),0 30px 60px 0 rgba(0,20,29,0.1)",
        lineHeight: "22px",
        marginTop: "30px",
        maxWidth: "300px",
        position: "relative",
        marginRight: "30px",
      },
      wrapper
    );

    assertStyleMatch(
      {
        borderRadius: "var(--borderRadius100)",
      },
      wrapper.find(StyledToast)
    );
  });

  describe("when the toast is displayed", () => {
    let escapeKeyEvent: KeyboardEvent;
    let onDismissFn: jest.Mock;

    beforeEach(() => {
      escapeKeyEvent = new KeyboardEvent("keyup", {
        key: "Escape",
        bubbles: true,
      });
      onDismissFn = jest.fn();
      wrapper = mount(
        <Toast open onDismiss={onDismissFn}>
          Child
        </Toast>
      );
    });

    describe("and the esc key is released", () => {
      it("stopImmediatePropagation function should have been called on the event", () => {
        jest.spyOn(escapeKeyEvent, "stopImmediatePropagation");
        document.dispatchEvent(escapeKeyEvent);
        expect(escapeKeyEvent.stopImmediatePropagation).toHaveBeenCalled();
      });

      it("then the onDismiss method should have been called", () => {
        onDismissFn.mockReset();
        document.dispatchEvent(escapeKeyEvent);
        expect(onDismissFn).toHaveBeenCalled();
      });
    });

    it("when a key other than escape is released, onDismiss and stopImmediatePropagation are not called", () => {
      const otherKeyEvent = new KeyboardEvent("keyup", {
        key: "a",
        bubbles: true,
      });
      jest.spyOn(otherKeyEvent, "stopImmediatePropagation");
      onDismissFn.mockReset();
      document.dispatchEvent(otherKeyEvent);
      expect(otherKeyEvent.stopImmediatePropagation).not.toHaveBeenCalled();
      expect(onDismissFn).not.toHaveBeenCalled();
    });
  });
});

describe("TestContentStyle", () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render with correct style based on default theme", () => {
    wrapper = mount(<StyledToastContent />);

    assertStyleMatch(
      {
        padding: "8px 16px 8px 16px",
        whiteSpace: "pre-wrap",
      },
      wrapper
    );
  });
});

describe("Align horizontal", () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it.each(["left", "center", "right"] as const)(
    "should then pass the prop to Styled Portal and ToastWrapper",
    (alignValue) => {
      wrapper = mount(
        <Toast align={alignValue} open>
          FooBar
        </Toast>
      );

      expect(wrapper.find(StyledPortal).props().align).toBe(alignValue);
      expect(wrapper.find(ToastWrapper).props().align).toBe(alignValue);
    }
  );
});

describe("Align vertical", () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it.each(["top", "center", "bottom"] as const)(
    "when align prop is %s, Portal is correctly positioned",
    (alignYValue) => {
      wrapper = mount(
        <Toast alignY={alignYValue} open>
          FooBar
        </Toast>
      );
      expect(wrapper.find(StyledPortal).props().alignY).toBe(alignYValue);
    }
  );

  it("when isNotice is set and alignY is set to top, should render with the correct style", () => {
    wrapper = mount(
      <Toast variant="notice" alignY="top" open>
        Foo
      </Toast>
    );
    assertStyleMatch({ marginTop: "0" }, wrapper.find(StyledToast));
  });
});

describe("Align vertical and horizontal", () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it("should pass align set to left and alignY set to center to StyledPortal", () => {
    wrapper = mount(
      <Toast align="left" alignY="center" open>
        FooBar
      </Toast>
    );
    expect(wrapper.find(StyledPortal).props().align).toBe("left");
    expect(wrapper.find(StyledPortal).props().alignY).toBe("center");
  });
});

describe("Notification variant", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Toast variant="notification" open>
        FooBar
      </Toast>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render with correct icon type", () => {
    expect(wrapper.find(Icon).prop("type")).toBe("alert");
  });

  it("should render with correct variant type", () => {
    expect(wrapper.find(TypeIconStyle).prop("variant")).toBe("info");
  });
});

describe("Deprecation warning", () => {
  let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;

  beforeEach(() => {
    loggerSpy = jest.spyOn(Logger, "deprecate");
  });

  afterEach(() => {
    loggerSpy.mockRestore();
  });

  afterAll(() => {
    loggerSpy.mockClear();
  });

  it("should render correct deprecation message only once", () => {
    mount(
      <>
        <Toast variant="success" isCenter>
          Toast 1
        </Toast>
        <Toast variant="error" isCenter>
          Toast 2
        </Toast>
      </>
    );

    expect(loggerSpy).toHaveBeenCalledWith(
      "isCenter prop in Toast is being deprecated in favour of the align prop."
    );

    expect(loggerSpy).toHaveBeenCalledTimes(1);
  });
});

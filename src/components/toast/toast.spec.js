import React from "react";
import { shallow, mount } from "enzyme";
import guid from "../../__internal__/utils/helpers/guid";
import Toast from "./toast.component";
import {
  ToastStyle,
  ToastContentStyle,
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

describe("Toast", () => {
  guid.mockImplementation(() => "guid-12345");

  describe("modal manager", () => {
    jest.spyOn(ModalManager, "addModal");
    const removeModalSpy = jest.spyOn(ModalManager, "removeModal");
    let wrapper;

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

      it("it is added to modal manager", () => {
        const toast = wrapper.find(ToastWrapper).getDOMNode();
        expect(ModalManager.addModal).toHaveBeenCalledWith(toast, undefined);
      });
    });

    describe("when component unmounts", () => {
      it("it is removed from modal manager", () => {
        removeModalSpy.mockClear();
        wrapper = mount(<Toast onDismiss={() => {}}>foobar</Toast>);
        const toast = wrapper.find(ToastWrapper).getDOMNode();
        wrapper.unmount();
        expect(ModalManager.removeModal).toHaveBeenCalledWith(toast);
      });
    });
  });

  describe("when toast is closed", () => {
    let wrapper;

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

    it("it is removed from modal manager", () => {
      wrapper = mount(<Toast onDismiss={() => {}}>foobar</Toast>);
      const toast = wrapper.find(ToastWrapper).getDOMNode();
      wrapper.setProps({ open: false });
      expect(ModalManager.removeModal).toHaveBeenCalledWith(toast);
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
    let wrapper;

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
      wrapper = shallow(<Toast open className="exampleClass" />);
      expect(wrapper.find(".exampleClass")).toHaveLength(1);
    });

    it("renders the component with correct id", () => {
      const toastId = "toast-id";
      wrapper = shallow(<Toast open id={toastId} />);
      expect(wrapper.find('[data-component="toast"]').prop("id")).toBe(toastId);
    });

    it("renders child content", () => {
      wrapper = shallow(<Toast>children</Toast>);
      expect(wrapper.contains("children")).toBe(true);
    });

    describe("with onDismiss prop", () => {
      let onDismiss;

      beforeEach(() => {
        onDismiss = jest.fn();
        wrapper = mount(<Toast open onDismiss={onDismiss} />);
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it("renders close icon", () => {
        const icon = wrapper.find("[data-element='close']");

        expect(icon.exists()).toBe(true);
      });

      it("auto focuses the close icon", () => {
        const icon = wrapper.find("[data-element='close']").first();

        expect(icon).toBeFocused();
      });

      it("when the toast closes, focus is returned to the element it was on before the toast opened", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);
        const WrapperComponent = (toastProps) => (
          <>
            <Button id="buttonId">A button</Button>
            <Toast {...toastProps} />
          </>
        );

        wrapper.unmount();
        wrapper = mount(
          <WrapperComponent onDismiss={onDismiss} open={false} />,
          { attachTo: htmlElement }
        );
        const button = wrapper.find("#buttonId").first();
        button.getDOMNode().focus();

        wrapper.setProps({ open: true });
        const icon = wrapper.find("[data-element='close']").first();
        expect(icon).toBeFocused();

        wrapper.setProps({ open: false });
        expect(button).toBeFocused();
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
          jest.runTimersToTime(2000);
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
          jest.runTimersToTime(2000);
          expect(mockFn).not.toHaveBeenCalled();
        });
      });

      describe("with disableAutoFocus prop", () => {
        it("does not auto focus the close icon", () => {
          wrapper.unmount();
          wrapper = mount(
            <Toast open onDismiss={onDismiss} disableAutoFocus />
          );
          const icon = wrapper.find("[data-element='close']").first();

          expect(icon).not.toBeFocused();
        });

        it("when the toast closes, focus is not returned to the element it was on before the toast opened", () => {
          const element = document.createElement("div");
          const htmlElement = document.body.appendChild(element);
          const WrapperComponent = (toastProps) => (
            <>
              <Button id="buttonId">A button</Button>
              <Toast {...toastProps} />
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
          icon.getDOMNode().focus();

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
        wrapper = shallow(<Toast data-element="bar" data-role="baz" />);

        rootTagTest(
          wrapper.find('[data-component="toast"]'),
          "toast",
          "bar",
          "baz"
        );
      });
    });

    describe("on internal elements", () => {
      wrapper = mount(<Toast open onDismiss={() => {}} />);
      elementsTagTest(wrapper.find(IconButton).first().find("span"), ["close"]);
      wrapper.unmount();
    });
  });

  describe("when toast has specified maximum width", () => {
    let wrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render ToastStyle with correct maxWidth", () => {
      wrapper = mount(<Toast maxWidth="200px" />);
      assertStyleMatch({ maxWidth: "200px" }, wrapper.find(ToastStyle));
    });
  });

  describe("when isNotice prop is set", () => {
    const onDismissFn = jest.fn();
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Toast onDismiss={onDismissFn} open variant="notice">
          foo
        </Toast>
      );
    });

    it("then the prop should be passed to ToastStyle", () => {
      expect(wrapper.find(ToastStyle).props().isNotice).toBe(true);
    });

    it("then the prop should be passed to StyledPortal", () => {
      expect(wrapper.find(StyledPortal).props().isNotice).toBe(true);
    });

    it("then the prop should be passed to ToastWrapper", () => {
      expect(wrapper.find(ToastWrapper).props().isNotice).toBe(true);
    });

    it("then the prop should be passed to ToastContentStyle", () => {
      expect(wrapper.find(ToastContentStyle).props().isNotice).toBe(true);
    });

    it("then the TypeIcon should not be rendered", () => {
      expect(wrapper.find(TypeIcon).exists()).toBe(false);
    });
  });
});

describe("ToastStyle", () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render with correct style based on default theme", () => {
    wrapper = mount(<ToastStyle variant="help" open />);

    assertStyleMatch(
      {
        boxShadow:
          "0 10px 30px 0 rgba(0,20,29,0.1), 0 30px 60px 0 rgba(0,20,29,0.1)",
        lineHeight: "22px",
        marginTop: "30px",
        maxWidth: "300px",
        position: "relative",
        marginRight: "30px",
      },
      wrapper
    );
  });

  describe("when the toast is displayed", () => {
    let escapeKeyEvent;
    let onDismissFn;

    beforeEach(() => {
      escapeKeyEvent = new KeyboardEvent("keyup", {
        key: "Escape",
        bubbles: true,
      });
      onDismissFn = jest.fn();
      wrapper = mount(<Toast open onDismiss={onDismissFn} />);
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
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render with correct style based on default theme", () => {
    wrapper = mount(<ToastContentStyle variant="help" open />);

    assertStyleMatch(
      {
        padding: "8px 16px 8px 16px",
        whiteSpace: "pre-wrap",
      },
      wrapper
    );
  });
});

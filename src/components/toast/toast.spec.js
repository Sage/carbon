import React from "react";
import TestUtils from "react-dom/test-utils";
import "jest-styled-components";
import { shallow, mount } from "enzyme";
import guid from "../../utils/helpers/guid/guid";
import Toast from "./toast.component";
import { ToastStyle, ToastContentStyle, ToastWrapper } from "./toast.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import IconButton from "../icon-button";
import ModalManager from "../modal/__internal__/modal-manager";
import {
  elementsTagTest,
  rootTagTest,
} from "../../utils/helpers/tags/tags-specs/tags-specs";

jest.mock("../../utils/helpers/guid");

describe("Toast", () => {
  guid.mockImplementation(() => "guid-12345");

  let instance, onDismissSpy;

  describe("modal manager", () => {
    jest.spyOn(ModalManager, "addModal");
    jest.spyOn(ModalManager, "removeModal");

    describe("when component mounts", () => {
      it("it is added to modal manager", () => {
        const wrapper = mount(
          <Toast isCenter onDismiss={() => {}}>
            foobar
          </Toast>
        );
        const toast = wrapper.instance().toastRef.current;
        expect(ModalManager.addModal).toHaveBeenCalledWith(toast);
      });
    });

    describe("when component unmounts", () => {
      it("it is removed from modal manager", () => {
        const wrapper = mount(<Toast onDismiss={() => {}}>foobar</Toast>);
        const toast = wrapper.instance().toastRef.current;
        wrapper.unmount();
        expect(ModalManager.removeModal).toHaveBeenCalledWith(toast);
      });
    });
  });

  describe("when toast is closed", () => {
    it("should exists anyway", () => {
      const wrapper = mount(
        <Toast open={false} as="info" className="custom" onDismiss={() => {}}>
          foobar
        </Toast>
      );
      expect(wrapper).toBeTruthy();
      expect(wrapper.prop("open")).toEqual(false);
    });
  });

  describe("when toast is open with onDismiss prop", () => {
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <Toast open as="info" className="custom" onDismiss={onDismissSpy}>
          foobar
        </Toast>
      );
    });

    describe("with prop isCenter", () => {
      it("should render Toast in the center of the document", () => {
        assertStyleMatch(
          {
            position: "relative",
            width: "auto",
            height: "auto",
            justifyContent: "center",
            display: "flex",
          },
          mount(<ToastWrapper isCenter />)
        );
      });
    });

    it("renders the component with correct classes", () => {
      const wrapper = shallow(<Toast open className="exampleClass" />);
      expect(wrapper.find(".exampleClass")).toHaveLength(1);
    });

    it("renders the component with correct id", () => {
      const toastId = "toast-id";
      const wrapper = shallow(<Toast open id={toastId} />);
      expect(wrapper.find('[data-component="toast"]').prop("id")).toBe(toastId);
    });

    it("renders child content", () => {
      const wrapper = shallow(<Toast>children</Toast>);
      expect(wrapper.contains("children")).toBeTruthy();
    });

    it("renders close icon", () => {
      const wrapper = shallow(<Toast open onDismiss={() => {}} />);
      expect(wrapper.find(IconButton).exists).toBeTruthy();
    });

    describe("onDismiss", () => {
      let wrapper, onDismiss;

      beforeEach(() => {
        onDismiss = jest.fn();
        wrapper = mount(<Toast open onDismiss={onDismiss} />);
      });

      describe("calls onDismiss method when", () => {
        it("dismiss icon is clicked", () => {
          wrapper.find(IconButton).first().simulate("click");
          expect(onDismiss).toHaveBeenCalled();
        });

        it("dismiss icon is focused and Enter key is pressed", () => {
          const icon = wrapper.find(IconButton).first();
          icon.simulate("keyDown", { which: 13, key: "Enter" });
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
          icon.simulate("keyDown", { which: 65, key: "a" });
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
    });
  });

  describe("when toast is open without onDismiss prop", () => {
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <Toast open as="info" className="custom">
          foobar
        </Toast>
      );
    });

    it("does not renders close icon", () => {
      const icon = TestUtils.scryRenderedDOMComponentsWithClass(
        instance,
        "carbon-toast__close"
      );
      expect(icon.length).toEqual(0);
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = shallow(<Toast data-element="bar" data-role="baz" />);

      it("include correct component, element and role data tags", () => {
        rootTagTest(
          wrapper.find('[data-component="toast"]'),
          "toast",
          "bar",
          "baz"
        );
      });
    });

    describe("on internal elements", () => {
      const wrapper = mount(<Toast open onDismiss={() => {}} />);
      elementsTagTest(wrapper.find(IconButton).first().find("span"), ["close"]);
    });
  });
});

describe("ToastStyle", () => {
  it("should render with correct style based on default theme", () => {
    assertStyleMatch(
      {
        boxShadow:
          "0 10px 30px 0 rgba(0,20,29,.1),0 30px 60px 0 rgba(0,20,29,.1)",
        lineHeight: "22px",
        marginTop: "30px",
        maxWidth: "300px",
        position: "relative",
        marginRight: "30px",
      },
      mount(<ToastStyle variant="help" open />)
    );
  });

  describe("when the toast is displayed", () => {
    let domNode;
    let escapeKeyEvent;
    let wrapper;
    let onDismissFn;

    beforeEach(() => {
      escapeKeyEvent = new KeyboardEvent("keyup", {
        key: "Escape",
        which: 27,
        bubbles: true,
      });
      onDismissFn = jest.fn();
      wrapper = mount(<Toast open onDismiss={onDismissFn} />);
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });

    describe("and the esc key is released", () => {
      it("stopImmediatePropagation function should have been called on the event", () => {
        jest.spyOn(escapeKeyEvent, "stopImmediatePropagation");
        domNode.dispatchEvent(escapeKeyEvent);
        expect(escapeKeyEvent.stopImmediatePropagation).toHaveBeenCalled();
      });

      it("then the onDismiss method should have been called", () => {
        onDismissFn.mockReset();
        domNode.dispatchEvent(escapeKeyEvent);
        expect(onDismissFn).toHaveBeenCalled();
      });
    });
  });
});

describe("TestContentStyle", () => {
  it("should render with correct style based on default theme", () => {
    assertStyleMatch(
      {
        padding: "8px 16px 8px 16px",
        whiteSpace: "pre-wrap",
      },
      mount(<ToastContentStyle variant="help" open />)
    );
  });
});

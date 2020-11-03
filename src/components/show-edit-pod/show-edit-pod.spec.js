import React from "react";
import { mount } from "enzyme";
import "jest-styled-components";
import ShowEditPod from "./show-edit-pod.component";
import Form from "../form";
import Pod from "../pod";
import Button from "../button";
import {
  elementsTagTest,
  rootTagTest,
} from "../../utils/helpers/tags/tags-specs";
import StyledDeleteButton from "./delete-button.style";

describe("ShowEditPod", () => {
  describe('when the "editing" prop is set on mount', () => {
    let wrapper;
    let container;

    beforeEach(() => {
      jest.useFakeTimers();
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
      wrapper = renderShowEditPod({ editing: true });
    });

    it("sets focus on the pod DOM node", () => {
      const focusedElement = document.activeElement;

      expect(focusedElement.dataset.component).toBe("pod");
    });

    it("displays the Edit Form", () => {
      expect(wrapper.find(Form).exists()).toBe(true);
    });

    describe("and when the editing prop is changed to false", () => {
      it("does not display the Edit Form", () => {
        wrapper.setProps({ editing: false });
        jest.runAllTimers();

        expect(wrapper.update().find(Form).exists()).toBe(false);
      });
    });

    afterEach(() => {
      wrapper.unmount();
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
      jest.useRealTimers();
    });
  });

  describe('when the "editing" prop is not set on mount', () => {
    let wrapper;

    it("does not set focus on the pod DOM node", () => {
      wrapper = renderShowEditPod();
      const focusedElement = document.activeElement;
      expect(focusedElement.dataset.component).not.toBe("pod");
    });

    describe("and onEdit prop is called on Pod Component", () => {
      beforeEach(() => {
        jest.useFakeTimers();
        wrapper = renderShowEditPod({ onEdit: jest.fn() });
        wrapper.find(Pod).props().onEdit();
      });

      it("displays the Edit Form", () => {
        expect(
          wrapper.update().find('[data-element="edit-form"]').exists()
        ).toBe(true);
      });

      describe("and then the onCancel prop is called on the Edit Form", () => {
        it("does not display the Edit Form", () => {
          wrapper.update().find(Form).find(Button).at(0).props().onClick();
          jest.runAllTimers();

          expect(
            wrapper.update().find('[data-element="edit-form"]').exists()
          ).toBe(false);
        });
      });
    });

    afterEach(() => {
      wrapper.unmount();
      jest.useRealTimers();
    });
  });

  describe('when the "onEdit" prop is passed', () => {
    let wrapper;
    let wrapperAttached;
    let container;

    describe('and "onEdit" prop is called on Pod Component', () => {
      let onEditSpy;

      beforeEach(() => {
        onEditSpy = jest.fn();
        wrapper = renderShowEditPod({
          onEdit: onEditSpy,
        });
        wrapper.find(Pod).props().onEdit();
      });

      it("calls the onEdit callback", () => {
        expect(onEditSpy).toHaveBeenCalled();
      });

      it("displays the Edit Form", () => {
        expect(wrapper.update().find(Form).exists()).toBe(true);
      });

      describe("and focus is set", () => {
        beforeEach(() => {
          container = document.createElement("div");
          container.id = "enzymeContainer";
          document.body.appendChild(container);
          onEditSpy = jest.fn();
          wrapperAttached = renderShowEditPod({
            onEdit: onEditSpy,
          });
          wrapperAttached.find(Pod).props().onEdit();
        });

        afterEach(() => {
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }

          container = null;
        });

        it("sets focus on the pod DOM node", () => {
          const focusedElement = document.activeElement;

          expect(focusedElement.dataset.component).toBe("pod");
        });
      });
    });

    describe('with the "editing" prop not set', () => {
      let onSave;

      beforeEach(() => {
        jest.useFakeTimers();
        onSave = jest.fn();
        wrapper = renderShowEditPod({
          onSave,
          onEdit: jest.fn(),
        });
        wrapper.find(Pod).props().onEdit();
        jest.runAllTimers();
      });

      describe("after the Edit Form saving", () => {
        it("does not display the Edit Form", () => {
          const ev = { preventDefault: jest.fn() };

          wrapper.update().find(Form).props().onSubmit(ev);
          jest.runAllTimers();

          expect(wrapper.update().find(Form).exists()).toBe(false);

          jest.useRealTimers();
        });
      });
    });

    describe('with the "editing" prop set to true on mount', () => {
      describe("and onEdit prop is called on Pod Component", () => {
        beforeEach(() => {
          jest.useFakeTimers();
          wrapper = renderShowEditPod({
            onEdit: jest.fn(),
            editing: true,
          });
          wrapper.setProps({ editing: false });
          jest.runAllTimers();
        });

        it("does not display the Edit Form", () => {
          expect(wrapper.update().find(Form).exists()).toBe(false);

          jest.useRealTimers();
        });
      });
    });

    describe('with the "editing" prop set to false on mount', () => {
      describe("and onEdit prop is called on Pod Component", () => {
        beforeEach(() => {
          wrapper = renderShowEditPod({
            onEdit: jest.fn(),
            editing: false,
          });
          wrapper.find(Pod).props().onEdit();
        });

        it("does not display the Edit Form", () => {
          expect(wrapper.update().find(Form).exists()).toBe(false);
        });
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  describe("after the Edit Form saving", () => {
    let wrapper, onSave;
    const mockEvent = { preventDefault: () => {} };

    beforeEach(() => {
      onSave = jest.fn();
      wrapper = renderShowEditPod({
        onSave,
        editing: true,
      });
    });

    it("prevents default on passed event", () => {
      const preventSpy = jasmine.createSpy("prevent");
      const ev = { preventDefault: preventSpy };

      wrapper.find(Form).props().onSubmit(ev);
      expect(preventSpy).toHaveBeenCalled();
    });

    it("calls the onSave callback", () => {
      wrapper.find(Form).props().onSubmit(mockEvent);
      expect(onSave).toHaveBeenCalled();
    });
  });

  describe('when the "onCancel" prop is set', () => {
    let wrapper, onCancel;
    const mockEvent = { preventDefault: () => {} };

    beforeEach(() => {
      onCancel = jest.fn();
      wrapper = renderShowEditPod({
        onCancel,
        editing: true,
      });
    });

    describe("and the cancel is triggered on Edit Form", () => {
      it("calls the onCancel function", () => {
        wrapper.find(Form).find(Button).at(0).props().onClick(mockEvent);
        expect(onCancel).toHaveBeenCalledWith(mockEvent);
      });
    });

    describe("and the escape key is hit", () => {
      it("calls the onCancel function", () => {
        wrapper.find(Pod).simulate("keydown", { which: 27 });
        expect(onCancel).toHaveBeenCalled();
      });
    });

    describe("when the event is not the escape key", () => {
      it("does not call onCancelEditForm", () => {
        wrapper.find(Form).simulate("keydown", { which: 33 });
        expect(onCancel).not.toHaveBeenCalled();
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  describe('when the "onDelete" prop is set', () => {
    let wrapper, additionalComponent, onDelete;
    const mockText = "mock text";

    beforeEach(() => {
      onDelete = jest.fn();
    });

    it('passes the Delete Button to the "additionalActions" prop', () => {
      wrapper = renderShowEditPod({
        onDelete,
        editing: true,
      });
      additionalComponent = mount(wrapper.find(Form).props().rightSideButtons);

      expect(additionalComponent.type()).toBe(StyledDeleteButton);
    });

    describe('with the "deleteText" prop', () => {
      it("then the text of the Delete Button should match the prop", () => {
        wrapper = renderShowEditPod({
          onDelete,
          editing: true,
          deleteText: mockText,
        });
        additionalComponent = mount(
          wrapper.find(Form).props().rightSideButtons
        );

        expect(additionalComponent.text()).toBe(mockText);
      });
    });

    describe('without the "deleteText" prop set', () => {
      it('then the text of the Delete Button should be "Delete"', () => {
        wrapper = renderShowEditPod({
          onDelete,
          editing: true,
        });
        additionalComponent = mount(
          wrapper.find(Form).props().rightSideButtons
        );

        expect(additionalComponent.text()).toBe("Delete");
      });
    });

    afterEach(() => {
      additionalComponent.unmount();
    });
  });

  describe('when the "editFields" prop is set', () => {
    let wrapper;
    const mockText = "mock text";

    beforeEach(() => {
      wrapper = renderShowEditPod({
        editFields: mockText,
        editing: true,
      });
    });

    it("the the prop content should be rendered in the Edit Form", () => {
      expect(wrapper.find(Form).props().children).toBe(mockText);
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = mount(<ShowEditPod data-element="bar" data-role="baz" />);

      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper.find(Pod), "show-edit-pod", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      const wrapper = mount(<ShowEditPod editing onEdit={() => {}} />);
      const form = wrapper.find('[data-component="form"]').hostNodes();
      expect(form.type()).toEqual("form");
      elementsTagTest(form, ["edit-form"]);
    });
  });
});

function renderShowEditPod(props, renderer = mount) {
  return renderer(<ShowEditPod {...props} />, {
    attachTo: document.getElementById("enzymeContainer"),
  });
}

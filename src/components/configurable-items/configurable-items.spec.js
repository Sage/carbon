import React from "react";
import { mount } from "enzyme";
import { ConfigurableItems } from ".";
import { DraggableContext } from "../drag-and-drop";
import Form from "../form";

describe("ConfigurableItems", () => {
  let wrapper;
  const onCancel = () => {};
  const onClick = () => {};
  const onDrag = () => {};
  const onSave = () => {};

  describe("children", () => {
    beforeEach(() => {
      wrapper = mount(
        <ConfigurableItems
          onCancel={onCancel}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
        >
          <p className="child-node">Foo</p>
        </ConfigurableItems>
      );
    });
    it("renders child nodes", () => {
      const childNode = wrapper.find(".child-node");
      expect(childNode.length).toEqual(1);
    });
  });

  describe("onDrag", () => {
    beforeEach(() => {
      wrapper = mount(
        <ConfigurableItems
          onCancel={onCancel}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
        />
      );
    });
    it("passes the onDrag prop through to the DraggableContext", () => {
      expect(wrapper.find(DraggableContext).props().onDrag).toEqual(onDrag);
    });
  });

  describe("onSave", () => {
    beforeEach(() => {
      wrapper = mount(
        <ConfigurableItems
          onCancel={onCancel}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
        />
      );
    });
    it("passes the onSave prop through to the Form onSubmit prop", () => {
      expect(wrapper.find(Form).props().onSubmit).toEqual(onSave);
    });
  });

  describe("onReset", () => {
    let form, resetButton;
    const onResetSpy = jasmine.createSpy("onResetSpy");
    const onReset = () => {
      onResetSpy();
    };

    describe("when the onReset prop is provided", () => {
      beforeEach(() => {
        wrapper = mount(
          <ConfigurableItems
            onCancel={onCancel}
            onClick={onClick}
            onDrag={onDrag}
            onReset={onReset}
            onSave={onSave}
          />
        );
      });

      it("passes a reset button, with an onClick prop, as leftAlignedActions to the form", () => {
        resetButton = wrapper.find(
          'button[data-element="configurable-items-reset-button"]'
        );
        expect(resetButton.length).toEqual(1);
        resetButton.simulate("click", { preventDefault: () => {} });
        expect(onResetSpy).toHaveBeenCalled();
      });
    });

    describe("when the onReset prop is not provided", () => {
      beforeEach(() => {
        wrapper = mount(
          <ConfigurableItems
            onCancel={onCancel}
            onClick={onClick}
            onDrag={onDrag}
            onSave={onSave}
          />
        );
        form = wrapper.find(Form);
      });

      it("does not pass leftAlignedActions to the form", () => {
        expect(form.props().leftSideButtons).toBeNull();
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      wrapper = mount(
        <ConfigurableItems
          data-element="bar"
          data-role="baz"
          onCancel={onCancel}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
        />
      );

      it("includes the correct component, element and role data tags", () => {
        expect(
          wrapper.find('div[data-component="configurable-items"]')
        ).toBeTruthy();
        expect(wrapper.find('div[data-element="bar"]')).toBeTruthy();
        expect(wrapper.find('div[data-role="baz"]')).toBeTruthy();
      });
    });
  });
});

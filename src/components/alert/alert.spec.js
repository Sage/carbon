import React from "react";
import { mount } from "enzyme";
import IconButton from "../icon-button";
import Alert from ".";

describe("Alert", () => {
  let wrapper, onCancel;

  beforeEach(() => {
    onCancel = jasmine.createSpy("cancel");
    wrapper = mount(
      <Alert
        open
        onCancel={onCancel}
        title="Alert title"
        subtitle="Alert Subtitle"
        data-element="bar"
        data-role="baz"
      />
    );
  });

  it("include correct component, element and role data tags", () => {
    const alert = wrapper.find(Alert).first();
    expect(alert.prop("data-element")).toEqual("bar");
    expect(alert.prop("data-role")).toEqual("baz");
  });

  describe("keyboard focus", () => {
    let mockEvent;

    beforeEach(() => {
      wrapper = mount(
        <Alert open title="Test" subtitle="Test" showCloseIcon={false} />
      );

      mockEvent = {
        preventDefault() {},
      };

      jest.useFakeTimers();
    });

    it("does not remain on the dialog if close icon is shown", () => {
      wrapper.setProps({
        showCloseIcon: true,
      });

      spyOn(mockEvent, "preventDefault");

      wrapper.instance().onDialogBlur(mockEvent);
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe("close icon", () => {
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
});

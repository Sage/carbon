import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import "jest-styled-components";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import Confirm from "./confirm.component";
import { StyledConfirmButtons, StyledConfirmHeading } from "./confirm.style";
import Button from "../button/button.component";
import { baseTheme, mintTheme } from "../../style/themes";
import StyledIcon from "../icon/icon.style";
import Icon from "../icon";

describe("Confirm", () => {
  let wrapper, onCancel, onConfirm;

  beforeEach(() => {
    onCancel = jasmine.createSpy("cancel");
    onConfirm = jasmine.createSpy("confirm");

    wrapper = mount(
      <Confirm
        open
        onCancel={onCancel}
        onConfirm={onConfirm}
        title="Confirm title"
        subtitle="Confirm Subtitle"
        data-element="bar"
        data-role="baz"
      />
    );
  });

  describe("default snapshot", () => {
    it("renders as expected", () => {
      expect(wrapper.instance().props.open).toBeTruthy();
      expect(wrapper.instance().props.title).toEqual("Confirm title");
      expect(wrapper.instance().props.subtitle).toEqual("Confirm Subtitle");
      expect(wrapper.instance().props["data-element"]).toEqual("bar");
      expect(wrapper.instance().props["data-role"]).toEqual("baz");
      expect(wrapper.instance().props.destructive).toBeFalsy();
    });
  });

  describe("confirmButtons", () => {
    beforeEach(() => {
      onCancel = jasmine.createSpy("cancel");
      onConfirm = jasmine.createSpy("confirm");

      wrapper = mount(
        <Confirm
          open
          onCancel={onCancel}
          onConfirm={onConfirm}
          title="Confirm title"
          subtitle="Confirm Subtitle"
          data-element="bar"
          data-role="baz"
        />
      );
    });

    describe("yes button", () => {
      it("triggers the onConfirm when the yes button is clicked", () => {
        const button = wrapper.find('[data-element="confirm"]').hostNodes();
        expect(button.type()).toEqual("button");
        button.simulate("click");
        expect(onConfirm).toHaveBeenCalled();
      });
    });

    describe("yes button destructive", () => {
      it("check confirmButton is destructive", () => {
        wrapper = mount(
          <Confirm
            open
            onCancel={onCancel}
            onConfirm={onConfirm}
            confirmLabel="Delete"
            cancelLabel="Cancel"
            destructive
          />
        );
        expect(wrapper.instance().props.destructive).toBeTruthy();
        const button = wrapper
          .find(Button)
          .find('[data-element="confirm"]')
          .at(0);
        expect(button.props().destructive).toBeTruthy();
      });
    });

    describe("no button", () => {
      it("triggers the onCancel when the no button is clicked", () => {
        const button = wrapper.find('[data-element="cancel"]').hostNodes();
        expect(button.type()).toEqual("button");
        button.simulate("click");
        expect(onCancel).toHaveBeenCalled();
      });
    });

    describe("when custom labels are not defined", () => {
      wrapper = mount(<Confirm />);

      it("returns default values", () => {
        expect(
          wrapper.find("[data-element='cancel']").hostNodes().text()
        ).toEqual("No");
        expect(
          wrapper.find("[data-element='confirm']").hostNodes().text()
        ).toEqual("Yes");
      });
    });

    describe("when custom labels are defined", () => {
      beforeEach(() => {
        wrapper = mount(
          <Confirm
            open
            onCancel={onCancel}
            onConfirm={onConfirm}
            confirmLabel="Delete"
            cancelLabel="Cancel"
          />
        );
      });

      it("returns a custom labels", () => {
        const deleteButton = wrapper.find('[data-element="confirm"]');
        const cancelButton = wrapper.find('[data-element="cancel"]');

        expect(deleteButton.hostNodes().text()).toEqual("Delete");
        expect(cancelButton.hostNodes().text()).toEqual("Cancel");
      });
    });
  });

  describe("Validation styling", () => {
    it("confirm buttons should match snapshot", () => {
      wrapper = TestRenderer.create(<StyledConfirmButtons theme={mintTheme} />);
      assertStyleMatch(
        {
          marginTop: "48px",
        },
        wrapper.toJSON()
      );
    });

    it("confirm icon error should match snapshot", () => {
      wrapper = mount(
        <Confirm
          open
          onCancel={onCancel}
          onConfirm={onConfirm}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          title="Confirm title"
          iconType="error"
          showCloseIcon={false}
        />
      );
      const iconError = wrapper.find(StyledConfirmHeading).at(0);
      expect(iconError.find(Icon).props().type).toBe("error");

      assertStyleMatch(
        {
          marginRight: "16px",
          marginBottom: "20px",
          color: baseTheme.colors.error,
        },
        mount(<StyledConfirmHeading type="error" />),
        { modifier: `${StyledIcon}` }
      );
    });

    it("confirm icon warning should match snapshot", () => {
      wrapper = mount(
        <Confirm
          open
          onCancel={onCancel}
          onConfirm={onConfirm}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          title="Confirm title"
          iconType="warning"
          showCloseIcon={false}
        />
      );
      const iconError = wrapper.find(StyledConfirmHeading).at(0);
      expect(iconError.find(Icon).props().type).toBe("warning");

      assertStyleMatch(
        {
          marginRight: "16px",
          marginBottom: "20px",
          color: baseTheme.colors.warning,
        },
        mount(<StyledConfirmHeading type="warning" />),
        { modifier: `${StyledIcon}` }
      );
    });
  });
});

import React from "react";
import { mount } from "enzyme";
import "jest-styled-components";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import Confirm from "./confirm.component";
import { StyledConfirmButtons, StyledConfirmHeading } from "./confirm.style";
import Button from "../button/button.component";
import { baseTheme, mintTheme } from "../../style/themes";
import StyledIcon from "../icon/icon.style";
import Icon from "../icon";
import Loader from "../loader";
import IconButton from "../icon-button";
import StyledIconButton from "../icon-button/icon-button.style";

const buttonTypes = [
  "primary",
  "secondary",
  "tertiary",
  "dashed",
  "darkBackground",
];
const buttonIconPositions = ["before", "after"];

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
      expect(wrapper.props().open).toBeTruthy();
      expect(wrapper.props().title).toEqual("Confirm title");
      expect(wrapper.props().subtitle).toEqual("Confirm Subtitle");
      expect(wrapper.props()["data-element"]).toEqual("bar");
      expect(wrapper.props()["data-role"]).toEqual("baz");
      expect(wrapper.props().destructive).toBeFalsy();
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

    describe("no button", () => {
      it("triggers the onCancel when the no button is clicked", () => {
        const button = wrapper.find('[data-element="cancel"]').hostNodes();
        expect(button.type()).toEqual("button");
        button.simulate("click");
        expect(onCancel).toHaveBeenCalled();
      });
    });

    describe("when `disableCancel` prop is provided", () => {
      let domNode;
      let escapeKeyEvent;
      const onCancelFn = jest.fn();

      beforeEach(() => {
        escapeKeyEvent = new KeyboardEvent("keyup", {
          key: "Escape",
          which: 27,
          bubbles: true,
        });
        wrapper = mount(
          <Confirm
            disableCancel
            onConfirm={() => {}}
            open
            onCancel={onCancelFn}
          />
        );
        domNode = wrapper.getDOMNode();
        document.body.appendChild(domNode);
      });

      afterEach(() => {
        document.body.removeChild(domNode);
        onCancelFn.mockReset();
      });

      it("should not close the modal if ESC key is pressed", () => {
        domNode.dispatchEvent(escapeKeyEvent);
        expect(onCancelFn).not.toHaveBeenCalled();
      });

      it("should change color of the close Icon", () => {
        wrapper = mount(
          <Confirm
            disableCancel
            showCloseIcon
            onConfirm={() => {}}
            open
            onCancel={onCancelFn}
          />
        );

        assertStyleMatch(
          {
            color: baseTheme.icon.disabled,
          },
          wrapper.find(StyledIconButton),
          { modifier: `${StyledIcon}` }
        );
      });
    });

    describe("if `isLoadingConfirm` button is provided", () => {
      it("should not render confirm button", () => {
        wrapper = mount(<Confirm onConfirm={() => {}} isLoadingConfirm open />);

        expect(wrapper.find(Loader).exists()).toBe(true);
      });
    });

    describe("if `cancelButtonType` is tertiary", () => {
      it("should render confirm button with left margin 3px", () => {
        wrapper = mount(
          <Confirm cancelButtonType="tertiary" onConfirm={() => {}} open />
        );

        assertStyleMatch(
          {
            marginLeft: "3px",
          },
          wrapper.find('[data-element="confirm"]')
        );
      });
    });

    it("should not render IconButton if `disableCancel` is provided", () => {
      wrapper = mount(
        <Confirm
          shlowCloseIcon
          onClose={() => {}}
          onConfirm={() => {}}
          open
          disableCancel
        />
      );

      expect(wrapper.find(IconButton).exists()).toBe(false);
    });

    it("should not render IconButton if `disableCancel` is provided", () => {
      wrapper = mount(
        <Confirm
          shlowCloseIcon
          onClose={() => {}}
          onConfirm={() => {}}
          open
          disableCancel
        />
      );

      expect(wrapper.find(IconButton).exists()).toBe(false);
    });

    describe("when custom labels are not defined", () => {
      wrapper = mount(<Confirm open onConfirm={() => {}} />);

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
      wrapper = mount(<StyledConfirmButtons theme={mintTheme} />);
      assertStyleMatch(
        {
          marginTop: "48px",
        },
        wrapper
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

    it("confirm and cancel buttons should be `destructive`", () => {
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

      const confirmButton = wrapper
        .find(Button)
        .find('[data-element="confirm"]')
        .at(0);
      const cancelButton = wrapper
        .find(Button)
        .find('[data-element="cancel"]')
        .at(0);

      expect(confirmButton.props().destructive).toBeTruthy();
      expect(cancelButton.props().destructive).toBeTruthy();
    });

    it("confirm button should be `destructive`", () => {
      wrapper = mount(
        <Confirm
          open
          onCancel={onCancel}
          onConfirm={onConfirm}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmButtonDestructive
        />
      );

      const confirmButton = wrapper
        .find(Button)
        .find('[data-element="confirm"]')
        .at(0);

      expect(confirmButton.props().destructive).toBeTruthy();
    });

    it("cancel button should be `destructive`", () => {
      wrapper = mount(
        <Confirm
          open
          onCancel={onCancel}
          onConfirm={onConfirm}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          cancelButtonDestructive
        />
      );

      const cancelButton = wrapper
        .find(Button)
        .find('[data-element="cancel"]')
        .at(0);

      expect(cancelButton.props().destructive).toBeTruthy();
    });

    it.each(buttonTypes)("cancel button type should be `%s`", (buttonType) => {
      wrapper = mount(
        <Confirm
          cancelButtonType={buttonType}
          onCancel={() => {}}
          onConfirm={() => {}}
          open
        />
      );
      const button = wrapper.find(Button).find('[data-element="cancel"]').at(0);

      expect(button.props().buttonType).toBe(buttonType);
    });

    it.each(buttonTypes)("confirm button type should be `%s`", (buttonType) => {
      wrapper = mount(
        <Confirm
          confirmButtonType={buttonType}
          onCancel={() => {}}
          onConfirm={() => {}}
          open
        />
      );
      const button = wrapper
        .find(Button)
        .find('[data-element="confirm"]')
        .at(0);

      expect(button.props().buttonType).toBe(buttonType);
    });

    it("confirm button icon type should be passed to the button", () => {
      wrapper = mount(
        <Confirm
          confirmButtonIconType="bin"
          onCancel={() => {}}
          onConfirm={() => {}}
          open
        />
      );
      const button = wrapper
        .find(Button)
        .find('[data-element="confirm"]')
        .at(0);

      expect(button.props().iconType).toBe("bin");
    });

    it("cancel button icon type should be passed to the button", () => {
      wrapper = mount(
        <Confirm
          cancelButtonIconType="bin"
          onCancel={() => {}}
          onConfirm={() => {}}
          open
        />
      );
      const button = wrapper.find(Button).find('[data-element="cancel"]').at(0);

      expect(button.props().iconType).toBe("bin");
    });

    it.each(buttonIconPositions)(
      "cancel button icon position should be `%s`",
      (position) => {
        wrapper = mount(
          <Confirm
            cancelButtonIconPosition={position}
            cancelButtonIconType="bin"
            onCancel={() => {}}
            onConfirm={() => {}}
            open
          />
        );
        const button = wrapper
          .find(Button)
          .find('[data-element="cancel"]')
          .at(0);

        expect(button.props().iconPosition).toBe(position);
      }
    );

    it.each(buttonIconPositions)(
      "confirm button icon position should be `%s`",
      (position) => {
        wrapper = mount(
          <Confirm
            confirmButtonIconPosition={position}
            confirmButtonIconType="bin"
            onCancel={() => {}}
            onConfirm={() => {}}
            open
          />
        );
        const button = wrapper
          .find(Button)
          .find('[data-element="confirm"]')
          .at(0);

        expect(button.props().iconPosition).toBe(position);
      }
    );
  });
});

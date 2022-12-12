import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import guid from "../../__internal__/utils/helpers/guid";
import Confirm, { ConfirmProps } from ".";
import { StyledConfirmButtons, StyledConfirmHeading } from "./confirm.style";
import Button from "../button/button.component";
import { mintTheme } from "../../style/themes";
import StyledIcon from "../icon/icon.style";
import Icon from "../icon";
import Heading from "../heading";
import Loader from "../loader";
import IconButton from "../icon-button";
import StyledIconButton from "../icon-button/icon-button.style";

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => "guid-123");

const buttonTypes = [
  "primary",
  "secondary",
  "tertiary",
  "dashed",
  "darkBackground",
] as const;
const buttonIconPositions = ["before", "after"] as const;

describe("Confirm", () => {
  let wrapper: ReactWrapper<ConfirmProps>;
  let onCancel: jest.Mock;
  let onConfirm: jest.Mock;

  beforeEach(() => {
    onCancel = jest.fn();
    onConfirm = jest.fn();

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

  afterEach(() => {
    wrapper.unmount();
  });

  describe("default snapshot", () => {
    it("renders as expected", () => {
      expect(wrapper.props().open).toBeTruthy();
      expect(wrapper.props().title).toEqual("Confirm title");
      expect(wrapper.props().subtitle).toEqual("Confirm Subtitle");
      expect(wrapper.props()["data-element"]).toEqual("bar");
      expect(wrapper.props()["data-role"]).toEqual("baz");
    });
  });

  describe("confirmButtons", () => {
    beforeEach(() => {
      onCancel = jest.fn();
      onConfirm = jest.fn();

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
      let escapeKeyEvent: KeyboardEvent;
      const onCancelFn = jest.fn();

      beforeEach(() => {
        escapeKeyEvent = new KeyboardEvent("keyup", {
          key: "Escape",
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
      });

      afterEach(() => {
        onCancelFn.mockReset();
      });

      it("onCancel callback should not be called if ESC key is pressed", () => {
        document.dispatchEvent(escapeKeyEvent);
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
            color: "var(--colorsActionMinorYin030)",
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

    it("should render disabled IconButton if `disableCancel` is provided", () => {
      wrapper = mount(
        <Confirm
          showCloseIcon
          onCancel={() => {}}
          onConfirm={() => {}}
          open
          disableCancel
        />
      );

      expect(wrapper.find(IconButton).props().disabled).toBe(true);
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

  describe("when iconType is supplied", () => {
    describe("when title is supplied", () => {
      it("then container's aria-labelledby attribute is set with title's id", () => {
        wrapper = mount(
          <Confirm
            open
            onConfirm={onConfirm}
            onCancel={onCancel}
            iconType="warning"
            title="foo"
          />
        );

        const titleId = wrapper.find(Heading).prop("titleId");
        expect(titleId).toBe("guid-123");

        expect(
          wrapper
            .find("[data-element='dialog']")
            .first()
            .prop("aria-labelledby")
        ).toBe("guid-123");
      });
    });

    describe("when subtitle is supplied", () => {
      it("then container's aria-describedby attribute is set with subtitle's id", () => {
        wrapper = mount(
          <Confirm
            open
            onConfirm={onConfirm}
            onCancel={onCancel}
            iconType="warning"
            subtitle="baz"
          />
        );

        const subtitleId = wrapper.find(Heading).prop("subtitleId");
        expect(subtitleId).toBe("guid-123");

        expect(
          wrapper
            .find("[data-element='dialog']")
            .first()
            .prop("aria-describedby")
        ).toBe("guid-123");
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
          color: "var(--colorsSemanticNegative500)",
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
          color: "var(--colorsSemanticCaution500)",
        },
        mount(<StyledConfirmHeading type="warning" />),
        { modifier: `${StyledIcon}` }
      );
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
        .filter('[data-element="confirm"]')
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
        .filter('[data-element="cancel"]')
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
      const button = wrapper
        .find(Button)
        .filter('[data-element="cancel"]')
        .at(0);

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
        .filter('[data-element="confirm"]')
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
        .filter('[data-element="confirm"]')
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
      const button = wrapper
        .find(Button)
        .filter('[data-element="cancel"]')
        .at(0);

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
          .filter('[data-element="cancel"]')
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
          .filter('[data-element="confirm"]')
          .at(0);

        expect(button.props().iconPosition).toBe(position);
      }
    );
  });
});

import React from "react";
import { mount } from "enzyme";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import guid from "../../__internal__/utils/helpers/guid";
import Confirm from "./confirm.component";
import { StyledConfirmButtons, StyledConfirmHeading } from "./confirm.style";
import Button from "../button/button.component";
import StyledIcon from "../icon/icon.style";
import Icon from "../icon";
import Loader from "../loader";
import IconButton from "../icon-button";
import StyledIconButton from "../icon-button/icon-button.style";

jest.mock("../../__internal__/utils/helpers/guid");
const mockGuid = "guid-123";
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockGuid);

const buttonTypes = [
  "primary",
  "secondary",
  "tertiary",
  "dashed",
  "darkBackground",
] as const;

const buttonTypeStyles = {
  primary: {
    background: "var(--colorsActionMajor500)",
    borderColor: "transparent",
    color: "var(--colorsActionMajorYang100)",
  },
  secondary: {
    background: "transparent",
    borderColor: "var(--colorsActionMajor500)",
    color: "var(--colorsActionMajor500)",
  },
  tertiary: {
    background: "transparent",
    borderColor: "transparent",
    color: "var(--colorsActionMajor500)",
  },
  dashed: {
    background: "transparent",
    border: "2px dashed var(--colorsActionMinor500)",
    color: "var(--colorsActionMinor500)",
  },
  darkBackground: {
    background: "var(--colorsActionMajorYang100)",
    borderColor: "transparent",
    color: "var(--colorsActionMajor500)",
  },
};

const buttonIconPositions = ["before", "after"] as const;

describe("Confirm", () => {
  it("renders title and subtitle correctly when passed", () => {
    const [title, subtitle] = ["Are you sure?", "subtitle"];
    const wrapper = mount(
      <Confirm open onConfirm={() => {}} title={title} subtitle={subtitle} />
    );

    expect(wrapper.find("h1[data-element='title']").text()).toBe(title);
    expect(wrapper.find("div[data-element='subtitle']").text()).toBe(subtitle);
  });

  it("when data-element prop is passed, pass it to the root element", () => {
    const dataElement = "foo";
    const wrapper = mount(
      <Confirm open onConfirm={() => {}} data-element={dataElement} />
    );
    expect(
      wrapper.find(`[data-element='${dataElement}']`).exists()
    ).toBeTruthy();
  });

  it("when data-role prop is passed, pass it to the root element", () => {
    const dataRole = "bar";
    const wrapper = mount(
      <Confirm open onConfirm={() => {}} data-role={dataRole} />
    );
    expect(wrapper.find(`[data-role='${dataRole}']`).exists()).toBeTruthy();
  });

  describe("confirm and cancel buttons", () => {
    it("triggers onConfirm event handler when the yes button is clicked", () => {
      const onConfirm = jest.fn();
      const wrapper = mount(
        <Confirm open onConfirm={onConfirm} onCancel={() => {}} />
      );

      const button = wrapper.find('[data-element="confirm"]').hostNodes();
      expect(button.type()).toEqual("button");
      button.simulate("click");
      expect(onConfirm).toHaveBeenCalled();
    });

    it("triggers onCancel event handler when the no button is clicked", () => {
      const onCancel = jest.fn();
      const wrapper = mount(
        <Confirm open onConfirm={() => {}} onCancel={onCancel} />
      );
      const button = wrapper.find('[data-element="cancel"]').hostNodes();

      expect(button.type()).toEqual("button");
      button.simulate("click");
      expect(onCancel).toHaveBeenCalled();
    });

    describe("when disableCancel prop is provided", () => {
      it("onCancel event handler should not be called if ESC key is pressed", () => {
        const onCancel = jest.fn();
        mount(
          <Confirm
            disableCancel
            open
            onConfirm={() => {}}
            onCancel={onCancel}
          />
        );

        document.dispatchEvent(
          new KeyboardEvent("keyup", {
            key: "Escape",
            bubbles: true,
          })
        );

        expect(onCancel).not.toHaveBeenCalled();
      });

      it("should change color of the close Icon", () => {
        const onCancel = jest.fn();
        const wrapper = mount(
          <Confirm
            disableCancel
            showCloseIcon
            open
            onConfirm={() => {}}
            onCancel={onCancel}
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

    it("when isLoadingConfirm prop is provided, render loader inside confirm button", () => {
      const wrapper = mount(
        <Confirm open isLoadingConfirm onConfirm={() => {}} />
      );
      expect(wrapper.find(Button).find(Loader).exists()).toBeTruthy();
    });

    it("when disableCancel prop is provided, do not render IconButton", () => {
      const wrapper = mount(
        <Confirm
          disableCancel
          showCloseIcon
          open
          onClose={() => {}}
          onConfirm={() => {}}
        />
      );

      expect(wrapper.find(IconButton).exists()).toBeFalsy();
    });

    it("render `No` and `Yes` labels on cancel and confirm buttons if no custom ones are provided", () => {
      const wrapper = mount(
        <Confirm open onCancel={() => {}} onConfirm={() => {}} />
      );

      expect(wrapper.find("[data-element='cancel']").hostNodes().text()).toBe(
        "No"
      );
      expect(wrapper.find("[data-element='confirm']").hostNodes().text()).toBe(
        "Yes"
      );
    });

    it("use custom labels on cancel and confirm buttons when provided", () => {
      const [confirmLabel, cancelLabel] = ["Delete", "Cancel"];
      const wrapper = mount(
        <Confirm
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
        />
      );

      expect(
        wrapper.find('[data-element="confirm"]').hostNodes().text()
      ).toEqual(confirmLabel);
      expect(
        wrapper.find('[data-element="cancel"]').hostNodes().text()
      ).toEqual(cancelLabel);
    });
  });

  describe("when iconType is supplied", () => {
    it("when title is provided, aria-labelledby attribute of dialog element is set with title's id", () => {
      const wrapper = mount(
        <Confirm
          open
          onConfirm={() => {}}
          onCancel={() => {}}
          iconType="warning"
          title="foo"
        />
      );

      expect(
        wrapper.find("[data-element='dialog']").first().prop("aria-labelledby")
      ).toBe(mockGuid);
    });

    it("when subtitle is provided, aria-describedby attribute of dialog element is set with subtitle's id", () => {
      const wrapper = mount(
        <Confirm
          open
          onConfirm={() => {}}
          onCancel={() => {}}
          iconType="warning"
          subtitle="baz"
        />
      );

      expect(
        wrapper.find("[data-element='dialog']").first().prop("aria-describedby")
      ).toBe(mockGuid);
    });
  });

  describe("validation styling", () => {
    it("container of cancel and confirm buttons has correct top margin", () => {
      const wrapper = mount(
        <Confirm open onConfirm={() => {}} onCancel={() => {}} />
      );
      assertStyleMatch(
        {
          marginTop: "48px",
        },
        wrapper.find(StyledConfirmButtons)
      );
    });

    it("confirm icon error should have correct styles", () => {
      const wrapper = mount(
        <Confirm
          open
          onCancel={() => {}}
          onConfirm={() => {}}
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
        wrapper.find(StyledConfirmHeading),
        { modifier: `${StyledIcon}` }
      );
    });

    it("confirm icon warning should have correct styles", () => {
      const wrapper = mount(
        <Confirm
          open
          onCancel={() => {}}
          onConfirm={() => {}}
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
        wrapper.find(StyledConfirmHeading),
        { modifier: `${StyledIcon}` }
      );
    });

    it("when confirmButtonDestructive prop is passed, confirm button should be rendered with destructive prop", () => {
      const wrapper = mount(
        <Confirm
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          confirmButtonDestructive
        />
      );

      assertStyleMatch(
        {
          background: "var(--colorsSemanticNegative500)",
          borderColor: "transparent",
          color: "var(--colorsSemanticNegativeYang100)",
        },
        wrapper.find('button[data-element="confirm"]').at(0)
      );
    });

    it("when cancelButtonDestructive prop is passed, cancel button should be rendered with destructive prop", () => {
      const wrapper = mount(
        <Confirm
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          cancelButtonDestructive
        />
      );

      assertStyleMatch(
        {
          background: "transparent",
          borderColor: "var(--colorsSemanticNegative500)",
          color: "var(--colorsSemanticNegative500)",
        },
        wrapper.find('button[data-element="cancel"]').at(0)
      );
    });

    it.each(buttonTypes)(
      "when cancelButtonType is `%s`, cancel button should be rendered of that type",
      (buttonType) => {
        const wrapper = mount(
          <Confirm
            cancelButtonType={buttonType}
            onCancel={() => {}}
            onConfirm={() => {}}
            open
          />
        );

        assertStyleMatch(
          buttonTypeStyles[buttonType],
          wrapper.find("button[data-element='cancel']").at(0)
        );
      }
    );

    it.each(buttonTypes)(
      "when confirmButtonType is `%s`, confirm button should be rendered of that type",
      (buttonType) => {
        const wrapper = mount(
          <Confirm
            confirmButtonType={buttonType}
            onCancel={() => {}}
            onConfirm={() => {}}
            open
          />
        );

        assertStyleMatch(
          buttonTypeStyles[buttonType],
          wrapper.find("button[data-element='confirm']").at(0)
        );
      }
    );

    it("when confirmButtonIconType is provided, confirm button should be rendered with the named icon", () => {
      const confirmButtonIconType = "bin";
      const wrapper = mount(
        <Confirm
          confirmButtonIconType={confirmButtonIconType}
          onCancel={() => {}}
          onConfirm={() => {}}
          open
        />
      );

      expect(
        wrapper
          .find(Button)
          .find('[data-element="confirm"]')
          .at(0)
          .prop("iconType")
      ).toBe(confirmButtonIconType);
    });

    it("when cancelButtonIconType is provided, cancel button should be rendered with the named icon", () => {
      const cancelButtonIconType = "bin";
      const wrapper = mount(
        <Confirm
          cancelButtonIconType={cancelButtonIconType}
          onCancel={() => {}}
          onConfirm={() => {}}
          open
        />
      );

      expect(
        wrapper.find('[data-element="cancel"]').at(0).prop("iconType")
      ).toBe(cancelButtonIconType);
    });

    it.each(buttonIconPositions)(
      "when cancelButtonIconPostion is passed, cancel button should render icon in the expected position",
      (position) => {
        const wrapper = mount(
          <Confirm
            cancelButtonIconPosition={position}
            cancelButtonIconType="bin"
            onCancel={() => {}}
            onConfirm={() => {}}
            open
          />
        );

        expect(
          wrapper.find('[data-element="cancel"]').at(0).prop("iconPosition")
        ).toBe(position);
      }
    );

    it.each(buttonIconPositions)(
      "when confirmButtonIconPostion is passed, cancel button should render icon in the expected position",
      (position) => {
        const wrapper = mount(
          <Confirm
            confirmButtonIconPosition={position}
            confirmButtonIconType="bin"
            onCancel={() => {}}
            onConfirm={() => {}}
            open
          />
        );

        expect(
          wrapper.find('[data-element="confirm"]').at(0).prop("iconPosition")
        ).toBe(position);
      }
    );
  });
});

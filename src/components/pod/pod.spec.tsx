import React from "react";
import { mount, ReactWrapper } from "enzyme";

import Pod, { PodProps } from "./pod.component";
import {
  StyledBlock,
  StyledEditAction,
  StyledActionsContainer,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledDeleteButton,
  StyledUndoButton,
  StyledTitle,
  StyledSubtitle,
} from "./pod.style";
import StyledIcon from "../icon/icon.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import Logger from "../../__internal__/utils/logger";

const variantColors = {
  primary: {
    pod: "var(--colorsUtilityYang100)",
    button: "var(--colorsActionMajorYang100)",
  },
  secondary: {
    pod: "var(--colorsUtilityMajor025)",
    button: "var(--colorsActionMinor050)",
  },
  tertiary: {
    pod: "var(--colorsUtilityMajor040)",
    button: "var(--colorsActionMinor100)",
  },
  transparent: {
    pod: "var(--colorsUtilityMajorTransparent)",
    button: "var(--colorsActionMajorTransparent)",
  },
  tile: {
    pod: "var(--colorsUtilityYang100)",
    button: "var(--colorsActionMajorYang100)",
  },
};

function render(props: PodProps = {}) {
  return mount(<Pod {...props}>Content</Pod>);
}

function assertAbsolutePositioning(
  target: ReactWrapper,
  parent: ReactWrapper,
  offsets: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  }
) {
  assertStyleMatch({ position: "absolute", ...offsets }, target);
  assertStyleMatch({ position: "relative" }, parent);
}

describe("Pod", () => {
  testStyledSystemMargin((props) => <Pod {...props} />);

  describe("deprecation warnings", () => {
    let mockConsole: jest.SpyInstance;
    let loggerSpy: jest.SpyInstance;

    beforeEach(() => {
      // Mock console.warn to prevent warning from appearing in console while tests are running
      mockConsole = jest
        .spyOn(global.console, "warn")
        .mockImplementation(() => undefined);
    });

    afterEach(() => {
      mockConsole.mockRestore();
    });

    it("when onEdit prop is a string, raise deprecation warning once in the console", () => {
      loggerSpy = jest.spyOn(Logger, "deprecate");
      mount(<Pod onEdit="foobar.com">Example Pod</Pod>);

      expect(loggerSpy).toHaveBeenCalledWith(
        "Support for passing strings to the `onEdit` prop of the `Pod` component is now deprecated. Please only pass event handlers to `onEdit`."
      );
      expect(loggerSpy).toHaveBeenCalledTimes(1);

      loggerSpy.mockClear();
    });

    it("when onEdit prop is an object, raise deprecation warning once in the console", () => {
      loggerSpy = jest.spyOn(Logger, "deprecate");
      mount(<Pod onEdit={{ href: "foobar.com" }}>Example Pod</Pod>);

      expect(loggerSpy).toHaveBeenCalledWith(
        "Support for passing objects to the `onEdit` prop of the `Pod` component is now deprecated. Please only pass event handlers to `onEdit`."
      );
      expect(loggerSpy).toHaveBeenCalledTimes(1);

      loggerSpy.mockClear();
    });
  });

  it("renders children correctly when text %s is passed as a child", () => {
    const text = "Pod content";
    const wrapper = mount(<Pod>{text}</Pod>);
    expect(wrapper.find("div[data-element='content']").text()).toBe(text);
  });

  it("when editContentFullWidth prop is set, render with 100% width", () => {
    const wrapper = render({ editContentFullWidth: true });
    assertStyleMatch({ width: "100%" }, wrapper.find(StyledPod));
  });

  it("when internalEditButton prop is set, render with 100% width", () => {
    const wrapper = render({ editContentFullWidth: true });
    assertStyleMatch({ width: "100%" }, wrapper.find(StyledPod));
  });

  describe("when height prop is set", () => {
    it("sets correct height when height prop is a number", () => {
      const wrapper = render({ height: 400 });

      assertStyleMatch({ height: "400px" }, wrapper.find(StyledPod));
    });

    it("sets correct height when height prop is a string", () => {
      const wrapper = render({ height: "100%" });

      assertStyleMatch({ height: "100%" }, wrapper.find(StyledPod));
    });
  });

  describe("when title prop is set", () => {
    const title = "title";

    it("renders header with correct styles", () => {
      const wrapper = render({ title });
      assertStyleMatch({ marginBottom: "24px" }, wrapper.find(StyledHeader));
    });

    it("renders title", () => {
      const wrapper = render({ title });
      expect(wrapper.find(StyledTitle).text()).toBe(title);
    });

    it("renders subtitle when subtitle prop is also passed", () => {
      const subtitle = "subtitle";
      const wrapper = render({ title, subtitle });
      expect(wrapper.find(StyledSubtitle).text()).toBe(subtitle);
    });

    it("renders header with correct right margin, when internalEditButton prop is passed and alignTitle is `right`", () => {
      const wrapper = render({
        title,
        internalEditButton: true,
        alignTitle: "right",
      });

      assertStyleMatch({ marginRight: "30px" }, wrapper.find(StyledHeader));
    });
  });

  describe("when footer prop is passed", () => {
    const footer = "footer";

    it("render footer", () => {
      const wrapper = render({ footer });
      expect(wrapper.find(StyledFooter).text()).toBe(footer);
    });

    it("when variant is tile, render footer with top border", () => {
      const wrapper = render({ footer, variant: "tile" });
      assertStyleMatch(
        { borderTop: `1px solid var(--colorsUtilityMajor100)` },
        wrapper.find(StyledFooter)
      );
    });

    it("when size is medium, render with correct padding", () => {
      const wrapper = render({ footer, size: "medium" });
      assertStyleMatch({ padding: "8px 16px" }, wrapper.find(StyledFooter));
    });

    it("when softDelete is true, render with correct text colour", () => {
      const wrapper = render({ footer, softDelete: true });
      assertStyleMatch(
        { color: "var(--colorsUtilityYin055)" },
        wrapper.find(StyledFooter)
      );
    });
  });

  describe.each<Exclude<PodProps["variant"], undefined>>([
    "primary",
    "secondary",
    "tertiary",
    "transparent",
    "tile",
  ])("when variant prop is '%s'", (variant) => {
    it("render pod with correct background colour", () => {
      const wrapper = render({ variant });
      assertStyleMatch(
        { backgroundColor: variantColors[variant].pod },
        wrapper.find(StyledBlock)
      );
    });

    it("and onDelete prop is passed, render button with correct background colour", () => {
      const wrapper = render({ variant, onDelete: () => {} });
      assertStyleMatch(
        { backgroundColor: variantColors[variant].button },
        wrapper.find(StyledDeleteButton),
        { modifier: "&&" }
      );
    });

    it("and onEdit prop is passed, render button with background correct colour", () => {
      const wrapper = render({ variant, onEdit: () => {} });
      assertStyleMatch(
        { backgroundColor: variantColors[variant].button },
        wrapper.find(StyledEditAction),
        { modifier: `&&` }
      );
    });

    it("and props onUndo and softDelete are passed, render button with correct background colour", () => {
      const wrapper = render({ variant, onUndo: () => {}, softDelete: true });
      assertStyleMatch(
        { backgroundColor: variantColors[variant].button },
        wrapper.find(StyledUndoButton),
        { modifier: "&&" }
      );
    });
  });

  it("when variant prop is 'tile', render with box shadow", () => {
    const wrapper = render({ variant: "tile" });
    assertStyleMatch(
      { boxShadow: "0 2px 3px 0 rgba(2,18,36,0.2)" },
      wrapper.find(StyledBlock)
    );
  });

  it.each([
    [false, "none"],
    [true, "1px solid var(--colorsUtilityMajor100)"],
  ])(
    "when border prop is %s, render pod with correct border style",
    (border, value) => {
      const wrapper = render({ border });
      assertStyleMatch({ border: value }, wrapper.find(StyledBlock));
    }
  );

  it("when softDelete prop is set, renders correct styles", () => {
    const wrapper = render({ softDelete: true });
    assertStyleMatch(
      { backgroundColor: "var(--colorsActionDisabled500)" },
      wrapper.find(StyledBlock)
    );
    assertStyleMatch(
      { color: "var(--colorsUtilityYin065)" },
      wrapper.find(StyledBlock),
      { modifier: "& > *" }
    );
  });

  describe("when onDelete prop is passed", () => {
    it("render delete button icon with correct colour", () => {
      const wrapper = render({ onDelete: () => {} });
      assertStyleMatch(
        { color: "var(--colorsSemanticNegative500)" },
        wrapper.find(StyledDeleteButton),
        { modifier: `&& ${StyledIcon}` }
      );
    });

    it("renders button without borders when border prop is false", () => {
      const wrapper = render({ onDelete: () => {}, border: false });
      assertStyleMatch({ border: "none" }, wrapper.find(StyledDeleteButton), {
        modifier: "&&",
      });
    });

    it("renders delete button inside pod when internalEditButton is true", () => {
      const wrapper = render({ onDelete: () => {}, internalEditButton: true });
      assertAbsolutePositioning(
        wrapper.find(StyledActionsContainer),
        wrapper.find(StyledPod),
        { top: "2px", right: "2px" }
      );
      assertStyleMatch(
        {
          border: "none",
          background: "var(--colorsActionMajorTransparent)",
        },
        wrapper.find(StyledDeleteButton),
        { modifier: "&&" }
      );
    });

    it.each([
      ["hovered over", "mouseenter"],
      ["focused", "focus"],
    ])(
      "when button is %s, render button and pod with correct colours",
      (_, event) => {
        const wrapper = render({ onDelete: () => {} });
        wrapper.find(StyledDeleteButton).simulate(event);

        assertStyleMatch(
          { backgroundColor: "var(--colorsSemanticNegative600)" },
          wrapper.find(StyledDeleteButton),
          { modifier: "&&" }
        );
        assertStyleMatch(
          { color: "var(--colorsActionMajorYang100)" },
          wrapper.find(StyledDeleteButton),
          { modifier: `&& ${StyledIcon}` }
        );
        assertStyleMatch(
          { backgroundColor: "var(--colorsUtilityMajor075)" },
          wrapper.find(StyledBlock)
        );
      }
    );

    it("when button is focused, render focus border around button and pod", () => {
      const wrapper = render({ onDelete: () => {} });
      wrapper.find(StyledDeleteButton).simulate("focus");

      assertStyleMatch(
        { outline: "3px solid var(--colorsSemanticFocus500)" },
        wrapper.find(StyledDeleteButton),
        { modifier: "&&" }
      );
      assertStyleMatch(
        { outline: "3px solid var(--colorsSemanticFocus500)" },
        wrapper.find(StyledBlock)
      );
    });

    it.each([
      ["focus", "blur"],
      ["hover", "mouseleave"],
    ])(
      "when button loses %s, render pod and button with correct colors",
      (_, event) => {
        const variant = "primary";
        const wrapper = render({ variant, onDelete: () => {} });
        const deleteButton = wrapper.find(StyledDeleteButton);
        deleteButton.simulate(event);

        assertStyleMatch(
          { backgroundColor: variantColors[variant].button },
          deleteButton,
          { modifier: "&&" }
        );
        assertStyleMatch(
          { color: "var(--colorsSemanticNegative500)" },
          deleteButton,
          { modifier: `&& ${StyledIcon}` }
        );
        assertStyleMatch(
          { backgroundColor: variantColors[variant].pod },
          wrapper.find(StyledBlock)
        );
      }
    );

    it("clicking on delete button invokes onDelete event handler", () => {
      const onDelete = jest.fn();
      const wrapper = render({ onDelete });
      wrapper.find("button").simulate("click");
      expect(onDelete).toHaveBeenCalled();
    });

    it("pressing enter key on the delete button invokes onDelete", () => {
      const onDelete = jest.fn();
      const wrapper = render({ onDelete });
      wrapper.find("button").simulate("keydown", { key: "Enter" });
      expect(onDelete).toHaveBeenCalled();
    });

    it("pressing a non-enter key on the delete button does not invoke onDelete", () => {
      const onDelete = jest.fn();
      const wrapper = render({ onDelete });
      wrapper.find("button").simulate("keydown", { key: "a" });
      expect(onDelete).not.toHaveBeenCalled();
    });
  });

  describe("when onEdit prop is passed", () => {
    it("renders edit button icon with correct colour", () => {
      const wrapper = render({ onEdit: () => {} });
      assertStyleMatch(
        { color: "var(--colorsActionMajor500)" },
        wrapper.find(StyledEditAction),
        { modifier: `&& ${StyledIcon}` }
      );
    });

    it.each([
      ["hovered over", "mouseenter"],
      ["focused", "focus"],
    ])(
      "when edit button is %s, render edit button and pod with correct colours",
      (_, event) => {
        const wrapper = render({ onEdit: () => {} });
        wrapper.find("a[data-element='edit']").simulate(event);

        assertStyleMatch(
          { backgroundColor: "var(--colorsActionMajor600)" },
          wrapper.find(StyledEditAction),
          { modifier: "&&" }
        );
        assertStyleMatch(
          { color: "var(--colorsActionMajorYang100)" },
          wrapper.find(StyledEditAction),
          { modifier: `&& ${StyledIcon}` }
        );
        assertStyleMatch(
          { backgroundColor: "var(--colorsUtilityMajor075)" },
          wrapper.find(StyledBlock)
        );
      }
    );

    it.each([
      ["focus", "blur"],
      ["hover", "mouseleave"],
    ])(
      "when button loses %s, render pod and button with correct colors",
      (_, event) => {
        const variant = "primary";
        const wrapper = render({ variant, onEdit: () => {} });
        const editButton = wrapper.find(StyledEditAction);
        editButton.simulate(event);

        assertStyleMatch(
          { backgroundColor: variantColors[variant].button },
          editButton,
          { modifier: "&&" }
        );
        assertStyleMatch({ color: "var(--colorsActionMajor500)" }, editButton, {
          modifier: `&& ${StyledIcon}`,
        });
        assertStyleMatch(
          { backgroundColor: variantColors[variant].pod },
          wrapper.find(StyledBlock)
        );
      }
    );

    it("and border prop is false, render button without borders", () => {
      const wrapper = render({ onEdit: () => {}, border: false });
      assertStyleMatch({ border: "none" }, wrapper.find(StyledEditAction), {
        modifier: "&&",
      });
    });

    it("and internalEditButton prop is true, render edit button inside pod", () => {
      const wrapper = render({
        internalEditButton: true,
        onEdit: jest.fn(),
      });

      assertAbsolutePositioning(
        wrapper.find(StyledActionsContainer),
        wrapper.find(StyledPod),
        { top: "2px", right: "2px" }
      );
      assertStyleMatch(
        {
          border: "none",
          background: "var(--colorsActionMajorTransparent)",
        },
        wrapper.find(StyledEditAction),
        { modifier: "&&" }
      );
    });

    it("clicking on the edit button invokes onEdit event handler", () => {
      const onEdit = jest.fn();
      const wrapper = render({ onEdit });
      wrapper.find('a[data-element="edit"]').simulate("click");
      expect(onEdit).toHaveBeenCalled();
    });

    it("pressing enter key on the edit button invokes onEdit", () => {
      const onEdit = jest.fn();
      const wrapper = render({ onEdit });
      wrapper
        .find('a[data-element="edit"]')
        .simulate("keydown", { key: "Enter" });
      expect(onEdit).toHaveBeenCalled();
    });

    it("pressing a non-enter key on the edit button does not invoke onEdit", () => {
      const onEdit = jest.fn();
      const wrapper = render({ onEdit });
      wrapper.find('a[data-element="edit"]').simulate("keydown", { key: "a" });
      expect(onEdit).not.toHaveBeenCalled();
    });

    describe.each([
      [false, true],
      [true, false],
      [true, true],
    ])(
      "and triggerEditOnContent prop is %s and displayEditButtonOnHover prop is %s",
      (triggerEditOnContent, displayEditButtonOnHover) => {
        it.each([
          ["hovered over", "mouseenter"],
          ["focused", "focus"],
        ])(
          "renders pod with correct background colour when it is %s",
          (_, event) => {
            const wrapper = render({
              onEdit: () => {},
              displayEditButtonOnHover,
              triggerEditOnContent,
            });
            wrapper.find('a[data-element="edit"]').simulate(event);
            assertStyleMatch(
              { backgroundColor: "var(--colorsActionMajor600)" },
              wrapper.find(StyledBlock)
            );
          }
        );

        it.each([
          ["focus", "blur"],
          ["hover", "mouseleave"],
        ])(
          "renders pod with correct background colour when it loses %s",
          (_, event) => {
            const variant = "primary";
            const wrapper = render({
              variant,
              onEdit: () => {},
              displayEditButtonOnHover,
              triggerEditOnContent,
            });
            wrapper.find('a[data-element="edit"]').simulate(event);
            assertStyleMatch(
              { backgroundColor: variantColors[variant].pod },
              wrapper.find(StyledBlock)
            );
          }
        );

        it("clicking on the pod invokes onEdit when it is an event handler", () => {
          const onEdit = jest.fn();
          const wrapper = render({
            onEdit,
            displayEditButtonOnHover,
            triggerEditOnContent,
          });
          wrapper.find(StyledBlock).simulate("click");
          expect(onEdit).toHaveBeenCalled();
        });

        it("pressing enter key on the pod invokes onEdit when it is an event handler", () => {
          const onEdit = jest.fn();
          const wrapper = render({
            onEdit,
            displayEditButtonOnHover,
            triggerEditOnContent,
          });
          wrapper.find(StyledBlock).simulate("keydown", { key: "Enter" });
          expect(onEdit).toHaveBeenCalled();
        });

        it("pressing a non-enter key on the pod invokes onEdit when it is an event handler", () => {
          const onEdit = jest.fn();
          const wrapper = render({
            onEdit,
            displayEditButtonOnHover,
            triggerEditOnContent,
          });
          wrapper.find(StyledBlock).simulate("keydown", { key: "a" });
          expect(onEdit).not.toHaveBeenCalled();
        });
      }
    );
  });

  describe("when onUndo and softDelete are both passed", () => {
    it("renders undo button icon with correct colour", () => {
      const wrapper = render({ softDelete: true, onUndo: () => {} });
      assertStyleMatch(
        { color: "var(--colorsActionMajor500)" },
        wrapper.find(StyledUndoButton),
        { modifier: `&& ${StyledIcon}` }
      );
    });

    it.each([
      ["hovered over", "mouseenter"],
      ["focused", "focus"],
    ])(
      "when button is %s, render button and pod with correct colours",
      (_, event) => {
        const wrapper = render({ onUndo: () => {}, softDelete: true });
        wrapper.find(StyledUndoButton).simulate(event);

        assertStyleMatch(
          { backgroundColor: "var(--colorsActionMajor600)" },
          wrapper.find(StyledUndoButton),
          { modifier: "&&" }
        );
        assertStyleMatch(
          { color: "var(--colorsActionMajorYang100)" },
          wrapper.find(StyledUndoButton),
          { modifier: `&& ${StyledIcon}` }
        );
        assertStyleMatch(
          { backgroundColor: "var(--colorsActionDisabled500)" },
          wrapper.find(StyledBlock)
        );
      }
    );

    it("when button is focused, render focus border around button", () => {
      const wrapper = render({ onUndo: () => {}, softDelete: true });
      wrapper.find(StyledUndoButton).simulate("focus");

      assertStyleMatch(
        { outline: "3px solid var(--colorsSemanticFocus500)" },
        wrapper.find(StyledUndoButton),
        { modifier: "&&" }
      );
    });

    it.each([
      ["focus", "blur"],
      ["hover", "mouseleave"],
    ])(
      "when button loses %s, render button with correct colors",
      (_, event) => {
        const variant = "primary";
        const wrapper = render({ variant, softDelete: true, onUndo: () => {} });
        const undoButton = wrapper.find(StyledUndoButton);
        undoButton.simulate(event);

        assertStyleMatch(
          { backgroundColor: variantColors[variant].button },
          undoButton,
          { modifier: "&&" }
        );
        assertStyleMatch({ color: "var(--colorsActionMajor500)" }, undoButton, {
          modifier: `&& ${StyledIcon}`,
        });
      }
    );

    it("and border prop is false, render button without borders", () => {
      const wrapper = render({
        onUndo: () => {},
        softDelete: true,
        border: false,
      });
      assertStyleMatch({ border: "none" }, wrapper.find(StyledUndoButton), {
        modifier: "&&",
      });
    });

    it("and internalEditButton prop is true, render undo button inside pod", () => {
      const wrapper = render({
        onUndo: () => {},
        softDelete: true,
        internalEditButton: true,
      });

      assertAbsolutePositioning(
        wrapper.find(StyledActionsContainer),
        wrapper.find(StyledPod),
        { top: "2px", right: "2px" }
      );
    });

    it("clicking on undo button invokes onUndo event handler", () => {
      const onUndo = jest.fn();
      const wrapper = render({ onUndo, softDelete: true });
      wrapper.find("button").simulate("click");
      expect(onUndo).toHaveBeenCalled();
    });

    it("pressing enter key on the undo button invokes onUndo", () => {
      const onUndo = jest.fn();
      const wrapper = render({ onUndo, softDelete: true });
      wrapper.find("button").simulate("keydown", { key: "Enter" });
      expect(onUndo).toHaveBeenCalled();
    });

    it("pressing a non-enter key on the undo button does not invoke onUndo", () => {
      const onUndo = jest.fn();
      const wrapper = render({ onUndo, softDelete: true });
      wrapper.find("button").simulate("keydown", { key: "a" });
      expect(onUndo).not.toHaveBeenCalled();
    });
  });

  describe("special cases", () => {
    it("when edit button is internal, variant is `tile` and button is focused, render pod with transparent background", () => {
      const wrapper = render({
        onEdit: () => {},
        internalEditButton: true,
        variant: "tile",
      });
      wrapper.find(StyledEditAction).simulate("focus");
      assertStyleMatch(
        { backgroundColor: "var(--colorsUtilityMajorTransparent)" },
        wrapper.find(StyledBlock)
      );
    });

    it("when border is false and edit button is not internal, render pod with no padding", () => {
      const wrapper = render({
        onEdit: () => {},
        internalEditButton: false,
        border: false,
      });
      wrapper.find(StyledEditAction).simulate("focus");
      assertStyleMatch({ padding: "0px" }, wrapper.find(StyledBlock));
    });
  });

  describe("rounded corners", () => {
    it("has the expected border radius styling for the main container and edit and delete buttons", () => {
      const wrapper = render({ onEdit: () => {}, onDelete: () => {} });

      assertStyleMatch(
        {
          borderRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledBlock)
      );

      assertStyleMatch(
        {
          borderRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledEditAction),
        { modifier: "&&" }
      );

      assertStyleMatch(
        {
          borderRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledDeleteButton),
        { modifier: "&&" }
      );
    });

    it("has the expected border radius styling for the soft/undo delete button", () => {
      const wrapper = render({ onUndo: () => {}, softDelete: true });

      assertStyleMatch(
        {
          borderRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledUndoButton),
        { modifier: "&&" }
      );
    });
  });
});

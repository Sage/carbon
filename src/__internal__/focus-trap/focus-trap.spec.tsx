import React, { useEffect, useRef, useState } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { act } from "react-dom/test-utils";

import FocusTrap, { FocusTrapProps } from "./focus-trap.component";
import { RadioButton, RadioButtonGroup } from "../../components/radio-button";
import { ModalContext } from "../../components/modal/modal.component";
import TopModalContext from "../../components/carbon-provider/top-modal-context";

jest.useFakeTimers();

interface MockComponentProps extends Omit<FocusTrapProps, "wrapperRef"> {
  isAnimationComplete?: boolean;
  triggerRefocusFlag?: boolean;
  tabIndex?: number;
  children: React.ReactNode;
  shouldFocusFirstElement?: boolean;
  dataTestId?: string;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
}

const WRAPPER_ID = "test wrapper";
const FIRST_ELEMENT = "first element";
const BUTTON_ONE = "Test button One";
const BUTTON_TWO = "Test button Two";
const BUTTON_THREE = "Test button Three";
const BUTTON_FOUR = "Test button Four";
const BUTTON_FIVE = "Test button Five";
const BUTTON_SIX = "Test button Six";
const RADIO_LABEL_ONE = "Radio one";
const RADIO_LABEL_TWO = "Radio two";
const RADIO_GROUP_ONE = "Radio group one";
const RADIO_GROUP_TWO = "Radio group two";
const BUTTON_IN_WRAPPER = "Button in wrapper";
const BUTTON_IN_ADDITIONAL_WRAPPER_ONE = "Button in additional wrapper one";
const BUTTON_IN_ADDITIONAL_WRAPPER_TWO = "Button in additional wrapper two";
const BUTTON_IN_CONDITIONAL_WRAPPER = "Button in conditional wrapper";

const user = userEvent.setup({ delay: null });

const tabPress = async () => user.tab();

const shiftTabPress = () => user.tab({ shift: true });

const focusElement = (target: HTMLElement) => {
  target.focus();
  expect(target).toHaveFocus();
};

const MockComponent = ({
  children,
  triggerRefocusFlag,
  isAnimationComplete,
  tabIndex,
  shouldFocusFirstElement,
  dataTestId = WRAPPER_ID,
  onKeyDown,
  ...rest
}: MockComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const firstRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalContext.Provider value={{ isAnimationComplete, triggerRefocusFlag }}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div onKeyDown={onKeyDown}>
        <FocusTrap
          wrapperRef={ref}
          {...rest}
          isOpen
          focusFirstElement={shouldFocusFirstElement ? firstRef : undefined}
        >
          <div ref={ref} data-testid={dataTestId} tabIndex={tabIndex}>
            {React.Children.map(children, (child) => {
              const focusableChild = child as React.ReactElement;

              if (focusableChild?.props?.id === "disable-on-focus") {
                return React.cloneElement(focusableChild, {
                  onFocus: () => setIsDisabled(true),
                  disabled: isDisabled,
                });
              }

              return child;
            })}
            {shouldFocusFirstElement && (
              <button type="button" ref={firstRef}>
                {FIRST_ELEMENT}
              </button>
            )}
          </div>
        </FocusTrap>
      </div>
    </ModalContext.Provider>
  );
};

const MockComponentWithCustomSelector = (
  props: Partial<MockComponentProps>
) => (
  <MockComponent {...props} focusableSelectors="button.focusable-button">
    <button type="button" className="focusable-button">
      {BUTTON_ONE}
    </button>
    <button type="button" className="not-focusable-button">
      {BUTTON_TWO}
    </button>
    <button type="button" className="focusable-button">
      {BUTTON_THREE}
    </button>
  </MockComponent>
);

const defaultChildren = (
  <>
    <button type="button">{BUTTON_ONE}</button>
    <button type="button">{BUTTON_TWO}</button>
  </>
);

const mockComponentToRender = ({
  children = defaultChildren,
  ...rest
}: Partial<MockComponentProps> = {}) => (
  <MockComponent {...rest}>{children}</MockComponent>
);

const WithAdditionalWrapperRefs = () => {
  const wrapperRef = useRef(null);
  const otherContentRef1 = useRef(null);
  const otherContentRef2 = useRef(null);
  const additionalRef = useRef(null);
  const [useAdditionalWrapper, setUseAdditionalWrapper] = useState(false);
  const additionalRefs = [
    otherContentRef1,
    otherContentRef2,
    ...(useAdditionalWrapper ? [additionalRef] : []),
  ];

  return (
    <div data-testid={WRAPPER_ID}>
      <button type="button" id="outside1">
        outside focus trap
      </button>
      <ModalContext.Provider value={{ isAnimationComplete: true }}>
        <FocusTrap
          wrapperRef={wrapperRef}
          additionalWrapperRefs={additionalRefs}
          isOpen
        >
          <div ref={wrapperRef}>
            <button
              type="button"
              id="insidewrapper"
              onClick={() => setUseAdditionalWrapper(true)}
            >
              {BUTTON_IN_WRAPPER}
            </button>
          </div>
        </FocusTrap>
      </ModalContext.Provider>
      <button type="button" id="outside2">
        outside focus trap
      </button>
      <div ref={otherContentRef1}>
        <button type="button" id="insideother1">
          {BUTTON_IN_ADDITIONAL_WRAPPER_ONE}
        </button>
      </div>
      <button type="button" id="outside3">
        outside focus trap
      </button>
      <div ref={otherContentRef2}>
        <button type="button" id="insideother2">
          {BUTTON_IN_ADDITIONAL_WRAPPER_TWO}
        </button>
      </div>
      <div ref={additionalRef}>
        <button type="button" id="insideconditional">
          {BUTTON_IN_CONDITIONAL_WRAPPER}
        </button>
      </div>
      <button type="button" id="outside4">
        outside focus trap
      </button>
    </div>
  );
};

const ClosedFocusTrap = () => {
  const wrapperRef = useRef(null);
  return (
    <>
      <FocusTrap isOpen={false} wrapperRef={wrapperRef}>
        <div ref={wrapperRef} style={{ visibility: "hidden" }}>
          <button type="button">{BUTTON_ONE}</button>
          <button type="button">{BUTTON_TWO}</button>
          <button type="button">{BUTTON_THREE}</button>
        </div>
      </FocusTrap>
      <button type="button">{BUTTON_FOUR}</button>
      <button type="button">{BUTTON_FIVE}</button>
      <button type="button">{BUTTON_SIX}</button>
    </>
  );
};

describe("FocusTrap", () => {
  describe("triggerRefocusFlag", () => {
    it("refocuses the last element that had focus within the trap when flag is set", () => {
      const { rerender } = render(
        mockComponentToRender({ autoFocus: false, triggerRefocusFlag: false })
      );
      focusElement(screen.getByText(BUTTON_TWO));
      screen.getByText(BUTTON_TWO).blur();
      expect(screen.getByText(BUTTON_TWO)).not.toHaveFocus();
      rerender(
        mockComponentToRender({ autoFocus: false, triggerRefocusFlag: true })
      );
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
    });

    it("refocuses the wrapper element when flag is set, if the wrapper has a tabindex", () => {
      const { rerender } = render(
        mockComponentToRender({
          autoFocus: false,
          triggerRefocusFlag: false,
          tabIndex: -1,
        })
      );
      rerender(
        mockComponentToRender({
          autoFocus: false,
          triggerRefocusFlag: true,
          tabIndex: -1,
        })
      );
      expect(screen.getByTestId(WRAPPER_ID)).toHaveFocus();
    });

    it("refocuses the container within the trap when flag is set, if the wrapper has no tabindex", () => {
      const { rerender } = render(
        mockComponentToRender({ autoFocus: false, triggerRefocusFlag: false })
      );
      // need to blur the wrapper to remove the tabindex
      fireEvent.blur(screen.getByTestId(WRAPPER_ID));

      rerender(
        mockComponentToRender({ autoFocus: false, triggerRefocusFlag: true })
      );
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
    });

    it("refocuses the container if last element that had focus becomes disabled", () => {
      const { rerender } = render(
        <MockComponent autoFocus={false} triggerRefocusFlag={false}>
          <button type="button">{BUTTON_ONE}</button>
          <button type="button" id="disable-on-focus">
            {BUTTON_TWO}
          </button>
        </MockComponent>
      );
      focusElement(screen.getByText(BUTTON_TWO));
      rerender(
        <MockComponent autoFocus={false} triggerRefocusFlag>
          <button type="button">{BUTTON_ONE}</button>
          <button type="button" id="disable-on-focus">
            {BUTTON_TWO}
          </button>
        </MockComponent>
      );
      expect(screen.getByTestId(WRAPPER_ID)).toHaveFocus();
    });
  });

  describe("when autoFocus is false", () => {
    it("should not focus the first focusable element by default", () => {
      render(mockComponentToRender({ autoFocus: false }));
      expect(document.querySelectorAll("body")[0]).toHaveFocus();
      expect(screen.getByTestId(WRAPPER_ID)).not.toHaveFocus();
    });
  });

  describe("when isAnimationComplete is false", () => {
    it("should not focus the first focusable element by default", () => {
      render(mockComponentToRender({ isAnimationComplete: false }));
      expect(document.querySelectorAll("body")[0]).toHaveFocus();
      expect(screen.getByTestId(WRAPPER_ID)).not.toHaveFocus();
    });
  });

  describe("when a focusFirstElement is provided", () => {
    beforeEach(() => {
      render(mockComponentToRender({ shouldFocusFirstElement: true }));
    });

    it("should focus the element that ref passed to focusFirstElement and loop round when back tabbing", async () => {
      expect(screen.getByText(FIRST_ELEMENT)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(FIRST_ELEMENT)).toHaveFocus();
    });

    it("should focus the element that ref passed to focusFirstElement and loop round when tabbing", async () => {
      expect(screen.getByText(FIRST_ELEMENT)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(FIRST_ELEMENT)).toHaveFocus();
    });
  });

  describe("when a bespokeTrap is provided", () => {
    let bespokeFn: jest.Mock;

    beforeEach(() => {
      bespokeFn = jest.fn();
      render(mockComponentToRender({ bespokeTrap: bespokeFn }));
    });

    it("calls the function with expected arguments on TAB press", async () => {
      await tabPress();
      expect(bespokeFn).toHaveBeenCalledWith(
        expect.objectContaining({ key: "Tab", type: "keydown" }),
        screen.getByRole("button", { name: BUTTON_ONE }),
        screen.getByRole("button", { name: BUTTON_TWO })
      );
    });

    it("calls the function with expected arguments on SHIFT + TAB press", async () => {
      await shiftTabPress();
      expect(bespokeFn).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "Tab",
          shiftKey: true,
          type: "keydown",
        }),
        screen.getByRole("button", { name: BUTTON_ONE }),
        screen.getByRole("button", { name: BUTTON_TWO })
      );
    });
  });

  describe("when FocusTrap wraps an element", () => {
    describe("and element has focusable items inside", () => {
      beforeEach(() => {
        render(mockComponentToRender());
      });

      it("should focus the wrapper", () => {
        expect(screen.getByTestId(WRAPPER_ID)).toHaveFocus();
      });

      it("should not move focus if different key than TAB is pressed", () => {
        focusElement(screen.getByText(BUTTON_TWO));
        fireEvent.keyDown(screen.getByTestId(WRAPPER_ID), { key: "ArrowDown" });
        expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      });

      it("should move focus back to the last item when `shift + tab` pressed and first focusable item is activeElement", async () => {
        focusElement(screen.getByText(BUTTON_ONE));
        await shiftTabPress();
        expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      });

      it("should back to the first item when use `shift + tab`", async () => {
        focusElement(screen.getByText(BUTTON_TWO));
        await shiftTabPress();
        expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      });

      it("should go to the second item when use TAB", async () => {
        focusElement(screen.getByText(BUTTON_ONE));
        await tabPress();
        expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      });

      it("should move to the first focusable item if TAB pressed on last focusable item", async () => {
        focusElement(screen.getByText(BUTTON_TWO));
        await tabPress();
        expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      });
    });

    describe("and element does not have focusable items", () => {
      beforeEach(() => {
        render(mockComponentToRender({ children: <p>Test content</p> }));
      });

      it("should block tabbing if `tab` pressed", async () => {
        expect(screen.getByTestId(WRAPPER_ID)).toHaveFocus();
        await tabPress();
        expect(screen.getByTestId(WRAPPER_ID)).toHaveFocus();
      });

      it("should block shift tabbing if `shift + tab` is pressed", async () => {
        expect(screen.getByTestId(WRAPPER_ID)).toHaveFocus();
        await shiftTabPress();
        expect(screen.getByTestId(WRAPPER_ID)).toHaveFocus();
      });
    });

    describe("and some children elements are disabled", () => {
      beforeEach(() => {
        render(
          <MockComponent>
            <button type="button">{BUTTON_ONE}</button>
            <button type="button" disabled>
              Disabled button One
            </button>
            <button type="button">{BUTTON_TWO}</button>
            <button type="button" disabled>
              Disabled button two
            </button>
          </MockComponent>
        );
      });

      it("only focuses those that are not", async () => {
        focusElement(screen.getByText(BUTTON_ONE));
        await tabPress();
        expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
        await tabPress();
        expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      });
    });
  });

  describe("when first focusable elements are radio buttons", () => {
    beforeEach(() => {
      render(
        <MockComponent>
          <RadioButtonGroup
            name="mybuttongroup"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value="1"
            legendWidth={40}
          >
            <RadioButton value="1" label={RADIO_LABEL_ONE} size="large" />
            <RadioButton value="2" label={RADIO_LABEL_TWO} size="large" />
          </RadioButtonGroup>
          <button type="button">{BUTTON_ONE}</button>
          <button type="button">{BUTTON_TWO}</button>
        </MockComponent>
      );
    });

    describe("when focus on first radio button shift-tab pressed", () => {
      it("should loop focus to the last focusable element", async () => {
        focusElement(screen.getByLabelText(RADIO_LABEL_ONE));
        await shiftTabPress();
        expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      });
    });

    describe("when focus on second radio button shift-tab pressed", () => {
      it("should loop focus to the last focusable element", async () => {
        focusElement(screen.getByLabelText(RADIO_LABEL_TWO));
        await shiftTabPress();
        expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      });
    });
  });

  describe("with 2 different radio groups", () => {
    beforeEach(() => {
      render(
        <MockComponent>
          <RadioButtonGroup
            name="radiogroup1"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value="1"
            legendWidth={40}
          >
            <RadioButton
              value="1"
              label={`${RADIO_LABEL_ONE}-${RADIO_GROUP_ONE}`}
              size="large"
            />
            <RadioButton
              value="2"
              label={`${RADIO_LABEL_TWO}-${RADIO_GROUP_ONE}`}
              size="large"
            />
          </RadioButtonGroup>
          <RadioButtonGroup
            name="radiogroup2"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value="1"
            legendWidth={40}
          >
            <RadioButton
              value="1"
              label={`${RADIO_LABEL_ONE}-${RADIO_GROUP_TWO}`}
              size="large"
            />
            <RadioButton
              value="2"
              label={`${RADIO_LABEL_TWO}-${RADIO_GROUP_TWO}`}
              size="large"
            />
          </RadioButtonGroup>
          <button type="button">{BUTTON_ONE}</button>
          <button type="button">{BUTTON_TWO}</button>
        </MockComponent>
      );
    });

    describe("when focus on first radio button of second group shift-tab pressed", () => {
      it("should focus the selected button of the first group", async () => {
        focusElement(
          screen.getByLabelText(`${RADIO_LABEL_ONE}-${RADIO_GROUP_TWO}`)
        );
        await shiftTabPress();
        expect(
          screen.getByLabelText(`${RADIO_LABEL_ONE}-${RADIO_GROUP_ONE}`)
        ).toHaveFocus();
      });
    });

    describe("when focus on second radio button of second group shift-tab pressed", () => {
      it("should focus the selected button of the first group", async () => {
        focusElement(
          screen.getByLabelText(`${RADIO_LABEL_TWO}-${RADIO_GROUP_TWO}`)
        );
        await shiftTabPress();
        expect(
          screen.getByLabelText(`${RADIO_LABEL_ONE}-${RADIO_GROUP_ONE}`)
        ).toHaveFocus();
      });
    });
  });

  describe("with 2 different focusable radio groups and a custom selector", () => {
    beforeEach(() => {
      render(
        <MockComponent focusableSelectors="input[type=radio]">
          <RadioButtonGroup
            name="radiogroup1"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value="1"
            legendWidth={40}
          >
            <RadioButton
              value="1"
              label={`${RADIO_LABEL_ONE}-${RADIO_GROUP_ONE}`}
              size="large"
            />
            <RadioButton
              value="2"
              label={`${RADIO_LABEL_TWO}-${RADIO_GROUP_ONE}`}
              size="large"
            />
          </RadioButtonGroup>
          <RadioButtonGroup
            name="radiogroup2"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value="1"
            legendWidth={40}
          >
            <RadioButton
              value="1"
              label={`${RADIO_LABEL_ONE}-${RADIO_GROUP_TWO}`}
              size="large"
            />
            <RadioButton
              value="2"
              label={`${RADIO_LABEL_TWO}-${RADIO_GROUP_TWO}`}
              size="large"
            />
          </RadioButtonGroup>
          <button type="button">{BUTTON_ONE}</button>
          <button type="button">{BUTTON_TWO}</button>
        </MockComponent>
      );
    });

    describe("when focus on first radio button of second group shift-tab pressed", () => {
      it("should focus the selected button of the first group", async () => {
        focusElement(
          screen.getByLabelText(`${RADIO_LABEL_ONE}-${RADIO_GROUP_TWO}`)
        );
        await shiftTabPress();
        expect(
          screen.getByLabelText(`${RADIO_LABEL_ONE}-${RADIO_GROUP_ONE}`)
        ).toHaveFocus();
      });
    });

    describe("when focus on second radio button of second group shift-tab pressed", () => {
      it("should focus the selected button of the first group", async () => {
        focusElement(
          screen.getByLabelText(`${RADIO_LABEL_TWO}-${RADIO_GROUP_TWO}`)
        );
        await shiftTabPress();
        expect(
          screen.getByLabelText(`${RADIO_LABEL_ONE}-${RADIO_GROUP_ONE}`)
        ).toHaveFocus();
      });
    });
  });

  describe("when last focusable elements are radio buttons", () => {
    beforeEach(() => {
      render(
        <MockComponent>
          <button type="button">{BUTTON_ONE}</button>
          <button type="button">{BUTTON_TWO}</button>
          <RadioButtonGroup
            name="mybuttongroup"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value="1"
            legendWidth={40}
          >
            <RadioButton value="1" label={RADIO_LABEL_ONE} size="large" />
            <RadioButton value="2" label={RADIO_LABEL_TWO} size="large" />
          </RadioButtonGroup>
        </MockComponent>
      );
    });

    describe("when focus on second radio button tab pressed", () => {
      it("should loop focus to the first focusable element", async () => {
        focusElement(screen.getByLabelText(RADIO_LABEL_TWO));
        await tabPress();
        expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      });
    });

    describe("when focus on first radio button tab pressed", () => {
      it("should loop focus to the first focusable element", async () => {
        focusElement(screen.getByLabelText(RADIO_LABEL_ONE));
        await tabPress();
        expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      });
    });
  });

  describe("when trap contains radio buttons", () => {
    beforeEach(() => {
      render(
        <MockComponent>
          <button type="button">{BUTTON_ONE}</button>
          <RadioButtonGroup
            name="mybuttongroup"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value={undefined}
            legendWidth={40}
          >
            <RadioButton value="1" label={RADIO_LABEL_ONE} size="large" />
            <RadioButton value="2" label={RADIO_LABEL_TWO} size="large" />
          </RadioButtonGroup>
          <button type="button">{BUTTON_TWO}</button>
        </MockComponent>
      );
    });

    describe("when focus on first radio button shift-tab pressed", () => {
      it("should move focus to the previous focusable element", async () => {
        focusElement(screen.getByLabelText(RADIO_LABEL_ONE));
        await shiftTabPress();
        expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      });
    });

    describe("when focus on second radio button shift-tab pressed", () => {
      it("should move focus to the previous focusable element", async () => {
        focusElement(screen.getByLabelText(RADIO_LABEL_TWO));
        await shiftTabPress();
        expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      });
    });

    describe("when tabbing into the radio group", () => {
      it("should move focus to the first radio button when none was previously selected", async () => {
        focusElement(screen.getByText(BUTTON_ONE));
        await tabPress();
        expect(screen.getByLabelText(RADIO_LABEL_ONE)).toHaveFocus();
      });

      it("should move focus to the selected radio button if one is selected", async () => {
        fireEvent.click(screen.getByLabelText(RADIO_LABEL_TWO));
        focusElement(screen.getByText(BUTTON_ONE));
        await tabPress();
        expect(screen.getByLabelText(RADIO_LABEL_TWO)).toHaveFocus();
      });
    });

    describe("when shift tabbing into the radio group", () => {
      it("should move focus to the last radio button when none was previously selected", async () => {
        focusElement(screen.getByText(BUTTON_TWO));
        await shiftTabPress();
        expect(screen.getByLabelText(RADIO_LABEL_TWO)).toHaveFocus();
      });

      it("should move focus to the selected radio button if one is selected", async () => {
        fireEvent.click(screen.getByLabelText(RADIO_LABEL_TWO));
        focusElement(screen.getByText(BUTTON_ONE));
        await shiftTabPress();
        await shiftTabPress();
        expect(screen.getByLabelText(RADIO_LABEL_TWO)).toHaveFocus();
      });
    });
  });

  describe("when trap contains radio buttons when using a custom selector", () => {
    beforeEach(() => {
      render(
        <MockComponent focusableSelectors="input[type=radio]">
          <button type="button">{BUTTON_ONE}</button>
          <RadioButtonGroup
            name="mybuttongroup"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value={undefined}
            legendWidth={40}
          >
            <RadioButton value="1" label={RADIO_LABEL_ONE} size="large" />
            <RadioButton value="2" label={RADIO_LABEL_TWO} size="large" />
          </RadioButtonGroup>
          <button type="button">{BUTTON_TWO}</button>
        </MockComponent>
      );
    });

    describe("when tabbing into the radio group", () => {
      it("should move focus to the first radio button when none was previously selected", async () => {
        focusElement(screen.getByText(BUTTON_ONE));
        await tabPress();
        expect(screen.getByLabelText(RADIO_LABEL_ONE)).toHaveFocus();
      });

      it("should move focus to the selected radio button if one is selected", async () => {
        fireEvent.click(screen.getByLabelText(RADIO_LABEL_TWO));
        focusElement(screen.getByText(BUTTON_ONE));
        await tabPress();
        expect(screen.getByLabelText(RADIO_LABEL_TWO)).toHaveFocus();
      });
    });

    describe("when shift tabbing into the radio group", () => {
      it("should move focus to the last radio button when none was previously selected", async () => {
        focusElement(screen.getByText(BUTTON_TWO));
        await shiftTabPress();
        expect(screen.getByLabelText(RADIO_LABEL_TWO)).toHaveFocus();
      });

      it("should move focus to the selected radio button if one is selected", async () => {
        fireEvent.click(screen.getByLabelText(RADIO_LABEL_TWO));
        focusElement(screen.getByText(BUTTON_ONE));
        await shiftTabPress();
        await shiftTabPress();
        expect(screen.getByLabelText(RADIO_LABEL_TWO)).toHaveFocus();
      });
    });
  });

  describe("when trap contains only one focusable element", () => {
    beforeEach(() => {
      render(
        mockComponentToRender({
          children: <button type="button">{BUTTON_ONE}</button>,
        })
      );
      focusElement(screen.getByText(BUTTON_ONE));
    });

    it("pressing tab does not move focus", async () => {
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
    });

    it("pressing shift tab does not move focus", async () => {
      await shiftTabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
    });
  });

  describe("when trap contains only one focusable element according to a custom selector", () => {
    beforeEach(() => {
      render(
        mockComponentToRender({
          children: (
            <>
              <button type="button">{BUTTON_ONE}</button>
              <button type="button" className="focusable-button">
                {BUTTON_TWO}
              </button>
            </>
          ),
          focusableSelectors: "button.focusable-button",
        })
      );
      focusElement(screen.getByText(BUTTON_TWO));
    });

    it("pressing tab does not move focus", async () => {
      await tabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
    });

    it("pressing shift tab does not move focus", async () => {
      await shiftTabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
    });
  });

  describe("when trap contains one radio button group and no other focusable elements", () => {
    beforeEach(() => {
      render(
        <MockComponent>
          <RadioButtonGroup
            name="mybuttongroup"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value="1"
            legendWidth={40}
          >
            <RadioButton value="1" label={RADIO_LABEL_ONE} size="large" />
            <RadioButton value="2" label={RADIO_LABEL_TWO} size="large" />
          </RadioButtonGroup>
        </MockComponent>
      );
      focusElement(screen.getByLabelText(RADIO_LABEL_ONE));
    });

    it("pressing tab does not move focus", async () => {
      await tabPress();
      expect(screen.getByLabelText(RADIO_LABEL_ONE)).toHaveFocus();
    });

    it("pressing shift tab does not move focus", async () => {
      await shiftTabPress();
      expect(screen.getByLabelText(RADIO_LABEL_ONE)).toHaveFocus();
    });
  });

  describe("when trap contains one radio button group and no other focusable elements according to a custom selector", () => {
    beforeEach(() => {
      render(
        <MockComponent focusableSelectors="input[type=radio]">
          <RadioButtonGroup
            name="mybuttongroup"
            legend="How do you want to create this address?"
            legendInline
            onChange={() => jest.fn()}
            value="1"
            legendWidth={40}
          >
            <RadioButton value="1" label={RADIO_LABEL_ONE} size="large" />
            <RadioButton value="2" label={RADIO_LABEL_TWO} size="large" />
          </RadioButtonGroup>
          <button type="button">{BUTTON_ONE}</button>
        </MockComponent>
      );
    });

    it("pressing tab does not move focus", async () => {
      await tabPress();
      expect(screen.getByLabelText(RADIO_LABEL_ONE)).toHaveFocus();
    });

    it("pressing shift tab does not move focus", async () => {
      await shiftTabPress();
      expect(screen.getByLabelText(RADIO_LABEL_ONE)).toHaveFocus();
    });
  });

  describe("wrapperRef", () => {
    it("should not update focusable elements if wrapper ref isn't found", () => {
      const wrapperRef = { current: null };
      expect(() => {
        render(
          <ModalContext.Provider value={{ isAnimationComplete: true }}>
            <FocusTrap wrapperRef={wrapperRef}>
              <div id="myComponent">Content</div>
            </FocusTrap>
          </ModalContext.Provider>
        );
      }).not.toThrow();
    });
  });

  describe("additionalWrapperRefs", () => {
    beforeEach(() => {
      render(<WithAdditionalWrapperRefs />);
    });

    it("tab should cycle through focusable elements inside the provided container refs and ignore all others", async () => {
      focusElement(screen.getByText(BUTTON_IN_WRAPPER));
      await tabPress();
      expect(screen.getByText(BUTTON_IN_ADDITIONAL_WRAPPER_ONE)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_IN_ADDITIONAL_WRAPPER_TWO)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_IN_WRAPPER)).toHaveFocus();
    });

    it("shift-tab should cycle through focusable elements inside the provided container refs and ignore all others", async () => {
      focusElement(screen.getByText(BUTTON_IN_WRAPPER));
      await shiftTabPress();
      expect(screen.getByText(BUTTON_IN_ADDITIONAL_WRAPPER_TWO)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(BUTTON_IN_ADDITIONAL_WRAPPER_ONE)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(BUTTON_IN_WRAPPER)).toHaveFocus();
    });

    it("continues to work both forwards and backwards after the wrapper refs are dynamically altered", async () => {
      fireEvent.click(screen.getByText(BUTTON_IN_WRAPPER));
      focusElement(screen.getByText(BUTTON_IN_WRAPPER));
      await tabPress();
      expect(screen.getByText(BUTTON_IN_ADDITIONAL_WRAPPER_ONE)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_IN_ADDITIONAL_WRAPPER_TWO)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_IN_CONDITIONAL_WRAPPER)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_IN_WRAPPER)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(BUTTON_IN_CONDITIONAL_WRAPPER)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(BUTTON_IN_ADDITIONAL_WRAPPER_TWO)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(BUTTON_IN_ADDITIONAL_WRAPPER_ONE)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(BUTTON_IN_WRAPPER)).toHaveFocus();
    });
  });

  describe("when content in the children tree changes", () => {
    it("should detect any new focusable elements and focus them when they are tabbed to", async () => {
      const ChangingChild = () => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }, []);

        if (loading) {
          return <input aria-label="input" type="text" />;
        }

        return (
          <>
            <button type="button">{BUTTON_ONE}</button>
          </>
        );
      };

      render(mockComponentToRender({ children: <ChangingChild /> }));
      expect(screen.getByTestId(WRAPPER_ID)).toHaveFocus();
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(screen.getByText(BUTTON_ONE)).toBeInTheDocument();
      });
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
    });

    it("should detect any new focusable elements and focus them when they are tabbed to when using a custom selector", async () => {
      const ChangingChild = () => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }, []);

        if (loading) {
          return <input aria-label="input" type="text" className="focusable" />;
        }

        return (
          <>
            <button type="button">{BUTTON_ONE}</button>
          </>
        );
      };

      render(
        mockComponentToRender({
          children: (
            <>
              <ChangingChild />
              <button type="button" className="focusable">
                {BUTTON_TWO}
              </button>
            </>
          ),
          focusableSelectors: ".focusable",
        })
      );
      expect(screen.getByTestId(WRAPPER_ID)).toHaveFocus();
      await tabPress();
      expect(screen.getByLabelText("input")).toHaveFocus();
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(screen.getByText(BUTTON_ONE)).toBeInTheDocument();
      });
      await tabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
    });

    it("should detect when additionalWrappers update and remove any elements no longer visible from focusableElements", async () => {
      const additionalRef = { current: null };
      const wrapperRef = { current: null };
      const ADDITIONAL_BUTTON = "Additional button";

      const ChangingChild = () => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }, []);

        const children = loading ? (
          <button type="button">{ADDITIONAL_BUTTON}</button>
        ) : null;

        return <div ref={additionalRef}>{children}</div>;
      };

      render(
        <ModalContext.Provider value={{ isAnimationComplete: true }}>
          <FocusTrap
            wrapperRef={wrapperRef}
            additionalWrapperRefs={[additionalRef]}
            isOpen
          >
            <div data-testid={WRAPPER_ID} ref={wrapperRef}>
              <button type="button" id="insidewrapper1">
                {BUTTON_ONE}
              </button>
              <button type="button" id="insidewrapper2">
                {BUTTON_TWO}
              </button>
            </div>
          </FocusTrap>
          <ChangingChild />
        </ModalContext.Provider>
      );
      const additionalButton = screen.getByText(ADDITIONAL_BUTTON);

      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      await tabPress();
      expect(additionalButton).toHaveFocus();

      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(additionalButton).not.toBeInTheDocument();
      });

      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
    });
  });

  describe("when using a custom focusable element selector", () => {
    it("should only focus elements which meet the custom selector, when tabbing both forwards and backwards", async () => {
      render(<MockComponentWithCustomSelector />);

      focusElement(screen.getByText(BUTTON_ONE));
      await tabPress();
      expect(screen.getByText(BUTTON_THREE)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      await shiftTabPress();
      expect(screen.getByText(BUTTON_THREE)).toHaveFocus();
    });
  });

  describe("when multiple focus traps are open at once", () => {
    it("focus moves correctly between the elements of the currently-focused trap", async () => {
      render(
        <>
          <MockComponent>
            <button type="button">{BUTTON_ONE}</button>
            <button type="button">{BUTTON_TWO}</button>
          </MockComponent>
          <MockComponent>
            <button type="button">{BUTTON_THREE}</button>
            <button type="button">{BUTTON_FOUR}</button>
          </MockComponent>
        </>
      );

      focusElement(screen.getByText(BUTTON_ONE));
      await tabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();

      focusElement(screen.getByText(BUTTON_THREE));
      await tabPress();
      expect(screen.getByText(BUTTON_FOUR)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_THREE)).toHaveFocus();
    });

    it("focus moves correctly between the elements of the currently-focused trap when using a custom selector", async () => {
      render(
        <>
          <MockComponent>
            <button type="button">{BUTTON_ONE}</button>
            <button type="button">{BUTTON_TWO}</button>
            <button type="button">{BUTTON_THREE}</button>
          </MockComponent>
          <MockComponent focusableSelectors="button.focusable-button">
            <button className="focusable-button" type="button">
              {BUTTON_FOUR}
            </button>
            <button type="button">{BUTTON_FIVE}</button>
            <button className="focusable-button" type="button">
              {BUTTON_SIX}
            </button>
          </MockComponent>
        </>
      );

      focusElement(screen.getByText(BUTTON_ONE));
      await tabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_THREE)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();

      focusElement(screen.getByText(BUTTON_FOUR));
      await tabPress();
      expect(screen.getByText(BUTTON_SIX)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_FOUR)).toHaveFocus();
    });
  });

  describe("when focuses an element that programatically focuses another nonfocusable element", () => {
    it("should allow focusing out from the focused element", async () => {
      const ProgramaticallyFocusesNextElement = () => {
        const buttonRef = useRef<HTMLButtonElement | null>(null);

        return (
          <button
            type="button"
            ref={buttonRef}
            onFocus={() => {
              (buttonRef.current
                ?.nextElementSibling as HTMLButtonElement)?.focus();
            }}
          >
            Click to focus next element
          </button>
        );
      };

      render(
        <MockComponent>
          <button type="button">{BUTTON_ONE}</button>
          <button type="button">{BUTTON_TWO}</button>
          <ProgramaticallyFocusesNextElement />
          <button type="button" tabIndex={-1}>
            {BUTTON_THREE}
          </button>
          <button type="button">{BUTTON_FOUR}</button>
        </MockComponent>
      );

      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();

      await tabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();

      await tabPress();
      expect(screen.getByText(BUTTON_THREE)).toHaveFocus();

      await tabPress();
      expect(screen.getByText(BUTTON_FOUR)).toHaveFocus();

      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
    });
  });

  describe("when the the focus is on a non focusable element that is the last element", () => {
    it("should focus the first focusable element", async () => {
      render(
        <MockComponent>
          <button type="button">{BUTTON_ONE}</button>
          <button type="button">{BUTTON_TWO}</button>
          <button type="button" tabIndex={-1}>
            {BUTTON_THREE}
          </button>
        </MockComponent>
      );

      focusElement(screen.getByText(BUTTON_THREE));
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
    });
  });

  describe("when the the focus is on a non focusable element that is the first element", () => {
    it("should focus the last focusable element", async () => {
      render(
        <MockComponent>
          <button type="button" tabIndex={-1}>
            {BUTTON_ONE}
          </button>
          <button type="button">{BUTTON_TWO}</button>
          <button type="button">{BUTTON_THREE}</button>
        </MockComponent>
      );

      focusElement(screen.getByText(BUTTON_ONE));
      await shiftTabPress();
      expect(screen.getByText(BUTTON_THREE)).toHaveFocus();
    });
  });

  describe("preventDefault", () => {
    const callIfDefaultPrevented = jest.fn();
    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.defaultPrevented) {
        callIfDefaultPrevented();
      }
    };

    beforeEach(() => {
      callIfDefaultPrevented.mockClear();
    });

    it("when focusableSelectors is not used, preventDefault is not called at all while tabbing through the trap", async () => {
      render(mockComponentToRender({ onKeyDown }));
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_TWO)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      expect(callIfDefaultPrevented).not.toHaveBeenCalled();
    });

    it("when focusableSelectors is used, preventDefault is only called when needed to prevent undesired elements being focused", async () => {
      render(<MockComponentWithCustomSelector onKeyDown={onKeyDown} />);
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      expect(callIfDefaultPrevented).not.toHaveBeenCalled();
      await tabPress();
      expect(screen.getByText(BUTTON_THREE)).toHaveFocus();
      expect(callIfDefaultPrevented).toHaveBeenCalledTimes(1);
      await tabPress();
      expect(screen.getByText(BUTTON_ONE)).toHaveFocus();
      expect(callIfDefaultPrevented).toHaveBeenCalledTimes(1);
    });
  });

  describe("topModalContext", () => {
    const PLAIN_TEXT_CONTENT = "I am some irrelevant text";
    const OUTSIDE_BUTTON = "Outside button";
    describe("when focus is lost to the document body", () => {
      const ComponentWithTopModalContext = ({
        trapIsTopModal,
      }: {
        trapIsTopModal: boolean;
      }) => {
        const [topModal, setTopModal] = useState<HTMLElement | null>(null);
        const trapModalRef = (element: HTMLElement | null) => {
          if (trapIsTopModal) {
            setTopModal(element);
          }
        };
        const otherModalRef = (element: HTMLElement | null) => {
          if (!trapIsTopModal) {
            setTopModal(element);
          }
        };
        const trapWrapper = useRef(null);
        return (
          <TopModalContext.Provider value={{ topModal }}>
            <p>{PLAIN_TEXT_CONTENT}</p>
            <button type="button">{OUTSIDE_BUTTON}</button>
            <div ref={trapModalRef}>
              <FocusTrap wrapperRef={trapWrapper} isOpen>
                <div ref={trapWrapper}>
                  <button type="button">{BUTTON_ONE}</button>
                  <button type="button">{BUTTON_TWO}</button>
                </div>
              </FocusTrap>
            </div>
            <div ref={otherModalRef}>
              <button type="button">{BUTTON_THREE}</button>
            </div>
          </TopModalContext.Provider>
        );
      };

      it("when the focus trap is in the top modal, tabbing puts focus on the first focusable element", async () => {
        render(<ComponentWithTopModalContext trapIsTopModal />);
        await user.click(screen.getByText(PLAIN_TEXT_CONTENT));
        expect(document.body).toBeFocused();
        await tabPress();
        expect(screen.getByText(BUTTON_ONE)).toBeFocused();
      });

      it("when the focus trap is not in the top modal, tabbing does not do anything", async () => {
        render(<ComponentWithTopModalContext trapIsTopModal={false} />);
        await user.click(screen.getByText(PLAIN_TEXT_CONTENT));
        expect(document.body).toBeFocused();
        await tabPress();
        expect(screen.getByText(OUTSIDE_BUTTON)).toBeFocused();
      });
    });
  });

  describe("when FocusTrap is closed", () => {
    it("focus should move normally through focusable elements outside the trap", async () => {
      render(<ClosedFocusTrap />);
      await tabPress();
      expect(screen.getByText(BUTTON_FOUR)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_FIVE)).toHaveFocus();
      await tabPress();
      expect(screen.getByText(BUTTON_SIX)).toHaveFocus();
    });
  });
});

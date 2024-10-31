import React, { useEffect, useRef, useState } from "react";
import {
  render,
  screen,
  fireEvent,
  createEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { act } from "react-dom/test-utils";

import FocusTrap, { FocusTrapProps } from "./focus-trap.component";
import { RadioButton, RadioButtonGroup } from "../../components/radio-button";
import ModalContext from "../../components/modal/__internal__/modal.context";
import TopModalContext from "../../components/carbon-provider/__internal__/top-modal.context";
import { Option, Select } from "../../components/select";
import { Checkbox } from "../../components/checkbox";

interface MockComponentProps extends Omit<FocusTrapProps, "wrapperRef"> {
  isAnimationComplete?: boolean;
  triggerRefocusFlag?: boolean;
  tabIndex?: number;
  children: React.ReactNode;
  shouldFocusFirstElement?: boolean;
}

const BUTTON_IN_WRAPPER = "Button in wrapper";
const BUTTON_IN_ADDITIONAL_WRAPPER_ONE = "Button in additional wrapper one";
const BUTTON_IN_ADDITIONAL_WRAPPER_TWO = "Button in additional wrapper two";
const BUTTON_IN_CONDITIONAL_WRAPPER = "Button in conditional wrapper";

const MockComponent = ({
  children,
  triggerRefocusFlag,
  isAnimationComplete,
  tabIndex,
  shouldFocusFirstElement,
  ...rest
}: MockComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalContext.Provider value={{ isAnimationComplete, triggerRefocusFlag }}>
      <FocusTrap
        wrapperRef={ref}
        isOpen
        focusFirstElement={shouldFocusFirstElement ? firstRef : undefined}
        {...rest}
      >
        <div
          aria-modal
          role="dialog"
          ref={ref}
          tabIndex={tabIndex}
          aria-label="focus-trap-dialog"
        >
          {children}
          {shouldFocusFirstElement && (
            <button type="button" ref={firstRef}>
              first
            </button>
          )}
        </div>
      </FocusTrap>
    </ModalContext.Provider>
  );
};

const mockComponentToRender = ({
  children,
  ...rest
}: Partial<MockComponentProps> = {}) => (
  <MockComponent {...rest}>
    {children || (
      <>
        <button type="button">One</button>
        <button type="button">Two</button>
      </>
    )}
  </MockComponent>
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
    <>
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
    </>
  );
};

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test("refocuses the last element that had focus within the trap when `triggerRefocusFlag` is set", () => {
  const { rerender } = render(
    mockComponentToRender({
      autoFocus: false,
      triggerRefocusFlag: false,
      tabIndex: undefined,
    }),
  );
  const buttonTwo = screen.getByRole("button", { name: "Two" });
  buttonTwo.focus();
  buttonTwo.blur();

  rerender(
    mockComponentToRender({ autoFocus: false, triggerRefocusFlag: true }),
  );

  expect(buttonTwo).toHaveFocus();
});

test("refocuses the wrapper element when the `triggerRefocusFlag` is set, if the wrapper has a tabindex", () => {
  const { rerender } = render(
    mockComponentToRender({
      autoFocus: false,
      triggerRefocusFlag: false,
      tabIndex: -1,
    }),
  );

  rerender(
    mockComponentToRender({
      autoFocus: false,
      triggerRefocusFlag: true,
      tabIndex: -1,
    }),
  );

  expect(screen.getByRole("dialog")).toHaveFocus();
});

// FIXME FE-6427: Assertion does not match the test description. Currently, the refocused element will differ depending on if the wrapper is blurred or not
test("refocuses the container within the trap when the `triggerRefocusFlag` is set, if the wrapper has no tabindex", () => {
  const { rerender } = render(
    mockComponentToRender({ autoFocus: false, triggerRefocusFlag: false }),
  );
  // need to blur the wrapper to remove the tabindex
  fireEvent.blur(screen.getByRole("dialog"));

  rerender(
    mockComponentToRender({ autoFocus: false, triggerRefocusFlag: true }),
  );

  expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
});

test("when `triggerRefocusFlag` is set, the container is refocused if last element that had focus becomes disabled", () => {
  const { rerender } = render(
    <MockComponent autoFocus={false} triggerRefocusFlag={false}>
      <button type="button">One</button>
      <button type="button">Two</button>
    </MockComponent>,
  );

  screen.getByRole("button", { name: "Two" }).focus();

  rerender(
    <MockComponent autoFocus={false} triggerRefocusFlag>
      <button type="button">One</button>
      <button type="button" disabled>
        Two
      </button>
    </MockComponent>,
  );

  expect(screen.getByRole("dialog")).toHaveFocus();
});

test("does not focus the first focusable element by default when autoFocus is false", () => {
  render(mockComponentToRender({ autoFocus: false }));

  expect(screen.getByRole("dialog")).not.toHaveFocus();
});

test("does not focus the first focusable element by default when isAnimationComplete is false", () => {
  render(mockComponentToRender({ isAnimationComplete: false }));

  expect(screen.getByRole("dialog")).not.toHaveFocus();
});

describe("when a focusFirstElement is provided", () => {
  it("should focus the element that ref passed to focusFirstElement and loop round when back tabbing", async () => {
    const user = userEvent.setup({ delay: null });
    render(mockComponentToRender({ shouldFocusFirstElement: true }));

    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();
  });

  it("should focus the element that ref passed to focusFirstElement and loop round when tabbing", async () => {
    const user = userEvent.setup({ delay: null });
    render(mockComponentToRender({ shouldFocusFirstElement: true }));

    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();
  });
});

test("when a bespokeTrap is provided, it calls the function with expected arguments on TAB press", async () => {
  const trapFunction = jest.fn();
  const user = userEvent.setup({ delay: null });
  render(mockComponentToRender({ bespokeTrap: trapFunction }));

  await user.tab();

  expect(trapFunction).toHaveBeenCalledWith(
    expect.objectContaining({ key: "Tab", type: "keydown" }),
    screen.getByRole("button", { name: "One" }),
    screen.getByRole("button", { name: "Two" }),
  );
});

test("when a bespokeTrap is provided, it calls the function with expected arguments on SHIFT + TAB press", async () => {
  const trapFunction = jest.fn();
  const user = userEvent.setup({ delay: null });
  render(mockComponentToRender({ bespokeTrap: trapFunction }));

  await user.tab({ shift: true });

  expect(trapFunction).toHaveBeenCalledWith(
    expect.objectContaining({
      key: "Tab",
      shiftKey: true,
      type: "keydown",
    }),
    screen.getByRole("button", { name: "One" }),
    screen.getByRole("button", { name: "Two" }),
  );
});

describe("when FocusTrap wraps an element and element has focusable items inside", () => {
  it("should focus the wrapper", () => {
    render(mockComponentToRender());

    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  it("should not move focus if different key than TAB is pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(mockComponentToRender());

    const buttonTwo = screen.getByRole("button", { name: "Two" });
    buttonTwo.focus();
    await user.keyboard("{ArrowDown}");

    expect(buttonTwo).toHaveFocus();
  });

  it("should move focus back to the last item when `shift + tab` pressed and first focusable item is activeElement", async () => {
    const user = userEvent.setup({ delay: null });
    render(mockComponentToRender());

    const buttonOne = screen.getByRole("button", { name: "One" });
    buttonOne.focus();
    await user.tab({ shift: true });

    const buttonTwo = screen.getByRole("button", { name: "Two" });
    expect(buttonTwo).toHaveFocus();
  });

  it("should back to the first item when use `shift + tab`", async () => {
    const user = userEvent.setup({ delay: null });
    render(mockComponentToRender());

    const buttonTwo = screen.getByRole("button", { name: "Two" });
    buttonTwo.focus();
    await user.tab({ shift: true });

    const buttonOne = screen.getByRole("button", { name: "One" });
    expect(buttonOne).toHaveFocus();
  });

  it("should go to the second item when use TAB", async () => {
    const user = userEvent.setup({ delay: null });
    render(mockComponentToRender());

    const buttonOne = screen.getByRole("button", { name: "One" });
    buttonOne.focus();
    await user.tab();

    const buttonTwo = screen.getByRole("button", { name: "Two" });
    expect(buttonTwo).toHaveFocus();
  });

  it("should move to the first focusable item if TAB pressed on last focusable item", async () => {
    const user = userEvent.setup({ delay: null });
    render(mockComponentToRender());

    const buttonTwo = screen.getByRole("button", { name: "Two" });
    buttonTwo.focus();
    await user.tab();

    const buttonOne = screen.getByRole("button", { name: "One" });
    expect(buttonOne).toHaveFocus();
  });
});

it("should block tabbing if `tab` pressed and trap contains no focusable items", async () => {
  const user = userEvent.setup({ delay: null });
  render(<MockComponent>Test content</MockComponent>);

  expect(screen.getByRole("dialog")).toHaveFocus();

  await user.tab();

  expect(screen.getByRole("dialog")).toHaveFocus();
});

it("should block shift tabbing if `shift + tab` is pressed and trap contains no focusable items", async () => {
  const user = userEvent.setup({ delay: null });
  render(<MockComponent>Test content</MockComponent>);

  expect(screen.getByRole("dialog")).toHaveFocus();

  await user.tab({ shift: true });

  expect(screen.getByRole("dialog")).toHaveFocus();
});

it("only allows non-disabled elements to be focused", async () => {
  const user = userEvent.setup({ delay: null });
  render(
    <MockComponent>
      <button type="button">One</button>
      <button type="button" disabled>
        Disabled button One
      </button>
      <button type="button">Two</button>
      <button type="button" disabled>
        Disabled button two
      </button>
    </MockComponent>,
  );

  const buttonOne = screen.getByRole("button", { name: "One" });
  buttonOne.focus();
  await user.tab();

  const buttonTwo = screen.getByRole("button", { name: "Two" });
  expect(buttonTwo).toHaveFocus();

  await user.tab();
  expect(buttonOne).toHaveFocus();
});

describe("when first focusable elements are radio buttons", () => {
  const WithRadioGroup = () => (
    <MockComponent>
      <RadioButtonGroup name="Colours" legend="Colours" onChange={() => {}}>
        <RadioButton value="Red" label="Red" />
        <RadioButton value="Green" label="Green" />
      </RadioButtonGroup>
      <button type="button">One</button>
      <button type="button">Two</button>
    </MockComponent>
  );

  it("loops focus to the last focusable element, when focus on first radio button shift-tab pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    screen.getByLabelText("Red").focus();
    await user.tab({ shift: true });

    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();
  });

  it("loops focus to the last focusable element, when focus on second radio button shift-tab pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    screen.getByLabelText("Green").focus();
    await user.tab({ shift: true });

    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();
  });
});

describe("with 2 different radio groups", () => {
  const WithTwoGroups = () => (
    <MockComponent>
      <RadioButtonGroup name="Colours" legend="Colours" onChange={() => {}}>
        <RadioButton value="Red" label="Red" />
        <RadioButton value="Green" label="Green" />
      </RadioButtonGroup>
      <RadioButtonGroup name="Fruits" legend="Fruits" onChange={() => {}}>
        <RadioButton value="Apple" label="Apple" />
        <RadioButton value="Melon" label="Melon" />
      </RadioButtonGroup>
      <button type="button">One</button>
      <button type="button">Two</button>
    </MockComponent>
  );

  it("focuses the selected button of the first group, when focus on first radio button of second group shift-tab pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithTwoGroups />);

    screen.getByLabelText("Apple").focus();
    await user.tab({ shift: true });

    expect(screen.getByLabelText("Green")).toHaveFocus();
  });

  it("focuses the selected button of the first group, when focus on second radio button of second group shift-tab pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithTwoGroups />);

    screen.getByLabelText("Melon").focus();
    await user.tab({ shift: true });

    expect(screen.getByLabelText("Green")).toHaveFocus();
  });
});

describe("with 2 different focusable radio groups and a custom selector", () => {
  const WithTwoGroups = () => (
    <MockComponent focusableSelectors="input[type=radio]">
      <RadioButtonGroup name="Colours" legend="Colours" onChange={() => {}}>
        <RadioButton value="Red" label="Red" />
        <RadioButton value="Green" label="Green" />
      </RadioButtonGroup>
      <RadioButtonGroup name="Fruits" legend="Fruits" onChange={() => {}}>
        <RadioButton value="Apple" label="Apple" />
        <RadioButton value="Melon" label="Melon" />
      </RadioButtonGroup>
      <button type="button">One</button>
      <button type="button">Two</button>
    </MockComponent>
  );

  it("focuses the selected button of the first group, when focus on first radio button of second group shift-tab pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithTwoGroups />);

    screen.getByLabelText("Apple").focus();
    await user.tab({ shift: true });

    expect(screen.getByLabelText("Green")).toHaveFocus();
  });

  it("focuses the selected button of the first group, when focus on second radio button of second group shift-tab pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithTwoGroups />);

    screen.getByLabelText("Melon").focus();
    await user.tab({ shift: true });

    expect(screen.getByLabelText("Green")).toHaveFocus();
  });
});

describe("when last focusable elements are radio buttons", () => {
  const WithRadioGroup = () => (
    <MockComponent>
      <button type="button">One</button>
      <button type="button">Two</button>
      <RadioButtonGroup name="Colours" legend="Colours" onChange={() => {}}>
        <RadioButton value="Red" label="Red" />
        <RadioButton value="Green" label="Green" />
      </RadioButtonGroup>
    </MockComponent>
  );

  it("loops focus to the first focusable element, when focus on second radio button tab pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    screen.getByLabelText("Red").focus();
    await user.tab();

    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
  });

  it("loops focus to the first focusable element, when focus on first radio button tab pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    screen.getByLabelText("Green").focus();
    await user.tab();

    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
  });
});

describe("when trap contains radio buttons", () => {
  const WithRadioGroup = () => (
    <MockComponent>
      <button type="button">One</button>
      <RadioButtonGroup name="Colours" legend="Colours" onChange={() => {}}>
        <RadioButton value="Red" label="Red" />
        <RadioButton value="Green" label="Green" />
      </RadioButtonGroup>
      <button type="button">Two</button>
    </MockComponent>
  );

  it("moves focus to the previous focusable element, when focus on first radio button shift-tab pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    screen.getByLabelText("Red").focus();
    await user.tab({ shift: true });

    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
  });

  it("moves focus to the previous focusable element, when focus on second radio button shift-tab pressed", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    screen.getByLabelText("Green").focus();
    await user.tab({ shift: true });

    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
  });

  it("moves focus to the first radio button when none was previously selected, when tabbing into the radio group", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const buttonOne = screen.getByRole("button", { name: "One" });
    buttonOne.focus();
    await user.tab();

    expect(screen.getByLabelText("Red")).toHaveFocus();
  });

  it("should move focus to the selected radio button if one is selected", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const greenRadio = screen.getByLabelText("Green");
    await user.click(greenRadio);
    const buttonOne = screen.getByRole("button", { name: "One" });
    buttonOne.focus();
    await user.tab();

    expect(greenRadio).toHaveFocus();
  });

  it("should move focus to the last radio button when none was previously selected, when shift tabbing into the radio group", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const buttonTwo = screen.getByRole("button", { name: "Two" });
    buttonTwo.focus();
    await user.tab({ shift: true });

    expect(screen.getByLabelText("Green")).toHaveFocus();
  });

  it("should move focus to the selected radio button if one is selected, when shift tabbing into the radio group", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const greenRadio = screen.getByLabelText("Green");
    await user.click(greenRadio);
    const buttonTwo = screen.getByRole("button", { name: "Two" });
    buttonTwo.focus();
    await user.tab({ shift: true });

    expect(greenRadio).toHaveFocus();
  });
});

describe("when trap contains radio buttons when using a custom selector", () => {
  const WithRadioGroup = () => (
    <MockComponent focusableSelectors="input[type=radio]">
      <button type="button">One</button>
      <RadioButtonGroup name="Colours" legend="Colours" onChange={() => {}}>
        <RadioButton value="Red" label="Red" />
        <RadioButton value="Green" label="Green" />
      </RadioButtonGroup>
      <button type="button">Two</button>
    </MockComponent>
  );

  it("when tabbing into the radio group, focus should move to the first radio button when none were previously selected", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const buttonOne = screen.getByRole("button", { name: "One" });
    buttonOne.focus();
    await user.tab();

    expect(screen.getByLabelText("Red")).toHaveFocus();
  });

  it("when tabbing into the radio group, should move focus to the selected radio button if one is selected", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const greenRadio = screen.getByLabelText("Green");
    await user.click(greenRadio);
    const buttonOne = screen.getByRole("button", { name: "One" });
    buttonOne.focus();
    await user.tab();

    expect(greenRadio).toHaveFocus();
  });

  it("when shift tabbing into the radio group, focus should move to the last radio button when none were previously selected", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const buttonTwo = screen.getByRole("button", { name: "Two" });
    buttonTwo.focus();
    await user.tab({ shift: true });

    expect(screen.getByLabelText("Green")).toHaveFocus();
  });

  it("when shift tabbing into the radio group, focus should move to the selected radio button if one is selected", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const greenRadio = screen.getByLabelText("Green");
    await user.click(greenRadio);
    const buttonTwo = screen.getByRole("button", { name: "Two" });
    buttonTwo.focus();
    await user.tab({ shift: true });

    expect(greenRadio).toHaveFocus();
  });
});

describe("when trap contains only one focusable element", () => {
  it("does not move focus pressing tab", async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <MockComponent>
        <button type="button">One</button>
      </MockComponent>,
    );

    await user.tab();

    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
  });

  it("does not move focus pressing shift-tab", async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <MockComponent>
        <button type="button">One</button>
      </MockComponent>,
    );

    await user.tab({ shift: true });

    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
  });
});

describe("when trap contains only one focusable element according to a custom selector", () => {
  const WithSelector = () => (
    <MockComponent focusableSelectors="button.focusable">
      <button type="button">One</button>
      <button type="button" className="focusable">
        Two
      </button>
    </MockComponent>
  );

  it("does not move focus pressing tab", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithSelector />);

    const buttonTwo = screen.getByRole("button", { name: "Two" });
    buttonTwo.focus();
    await user.tab();

    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();
  });

  it("does not move focus pressing shift-tab", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithSelector />);

    const buttonTwo = screen.getByRole("button", { name: "Two" });
    buttonTwo.focus();
    await user.tab({ shift: true });

    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();
  });
});

describe("when trap contains one radio button group and no other focusable elements", () => {
  const WithRadioGroup = () => (
    <MockComponent>
      <RadioButtonGroup name="Colours" legend="Colours" onChange={() => {}}>
        <RadioButton value="Red" label="Red" />
        <RadioButton value="Green" label="Green" />
      </RadioButtonGroup>
    </MockComponent>
  );

  it("does not move focus when pressing tab", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const redRadio = screen.getByLabelText("Red");
    await user.tab();

    expect(redRadio).toHaveFocus();

    await user.tab();
    expect(redRadio).toHaveFocus();
  });

  it("does not move focus pressing shift-tab", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const greenRadio = screen.getByLabelText("Green");
    await user.tab({ shift: true });

    expect(greenRadio).toHaveFocus();

    await user.tab({ shift: true });
    expect(greenRadio).toHaveFocus();
  });
});

describe("when trap contains one radio button group and no other focusable elements according to a custom selector", () => {
  const WithRadioGroup = () => (
    <MockComponent focusableSelectors="input[type=radio]">
      <RadioButtonGroup name="Colours" legend="Colours" onChange={() => {}}>
        <RadioButton value="Red" label="Red" />
        <RadioButton value="Green" label="Green" />
      </RadioButtonGroup>
      <button type="button">One</button>
    </MockComponent>
  );

  it("pressing tab does not move focus", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const redRadio = screen.getByLabelText("Red");
    await user.tab();

    expect(redRadio).toHaveFocus();

    await user.tab();
    expect(redRadio).toHaveFocus();
  });

  it("pressing shift tab does not move focus", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithRadioGroup />);

    const greenRadio = screen.getByLabelText("Green");
    await user.tab({ shift: true });

    expect(greenRadio).toHaveFocus();

    await user.tab({ shift: true });
    expect(greenRadio).toHaveFocus();
  });
});

test("should not throw error if wrapper ref isn't found", () => {
  const wrapperRef = { current: null };
  expect(() => {
    render(
      <ModalContext.Provider value={{ isAnimationComplete: true }}>
        <FocusTrap wrapperRef={wrapperRef}>
          <div id="myComponent">Content</div>
        </FocusTrap>
      </ModalContext.Provider>,
    );
  }).not.toThrow();
});

test("when `additionalWrapperRefs` are specified, tab should cycle through focusable elements inside the provided container refs and ignore all others", async () => {
  const user = userEvent.setup({ delay: null });
  render(<WithAdditionalWrapperRefs />);

  screen.getByRole("button", { name: BUTTON_IN_WRAPPER }).focus();

  await user.tab();
  expect(
    screen.getByRole("button", { name: BUTTON_IN_ADDITIONAL_WRAPPER_ONE }),
  ).toHaveFocus();

  await user.tab();
  expect(
    screen.getByRole("button", { name: BUTTON_IN_ADDITIONAL_WRAPPER_TWO }),
  ).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: BUTTON_IN_WRAPPER })).toHaveFocus();
});

test("when `additionalWrapperRefs` are specified, shift-tab should cycle through focusable elements inside the provided container refs and ignore all others", async () => {
  const user = userEvent.setup({ delay: null });
  render(<WithAdditionalWrapperRefs />);

  screen.getByRole("button", { name: BUTTON_IN_WRAPPER }).focus();

  await user.tab({ shift: true });
  expect(
    screen.getByRole("button", { name: BUTTON_IN_ADDITIONAL_WRAPPER_TWO }),
  ).toHaveFocus();

  await user.tab({ shift: true });
  expect(
    screen.getByRole("button", { name: BUTTON_IN_ADDITIONAL_WRAPPER_ONE }),
  ).toHaveFocus();

  await user.tab({ shift: true });
  expect(screen.getByRole("button", { name: BUTTON_IN_WRAPPER })).toHaveFocus();
});

test("when `additionalWrapperRefs` are specified, tabbing continues to work both forwards and backwards after the wrapper refs are dynamically altered", async () => {
  const user = userEvent.setup({ delay: null });
  render(<WithAdditionalWrapperRefs />);

  await user.click(screen.getByRole("button", { name: BUTTON_IN_WRAPPER }));

  await user.tab();
  expect(
    screen.getByRole("button", { name: BUTTON_IN_ADDITIONAL_WRAPPER_ONE }),
  ).toHaveFocus();

  await user.tab();
  expect(
    screen.getByRole("button", { name: BUTTON_IN_ADDITIONAL_WRAPPER_TWO }),
  ).toHaveFocus();

  await user.tab();
  expect(
    screen.getByRole("button", { name: BUTTON_IN_CONDITIONAL_WRAPPER }),
  ).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: BUTTON_IN_WRAPPER })).toHaveFocus();

  await user.tab({ shift: true });
  expect(
    screen.getByRole("button", { name: BUTTON_IN_CONDITIONAL_WRAPPER }),
  ).toHaveFocus();

  await user.tab({ shift: true });
  expect(
    screen.getByRole("button", { name: BUTTON_IN_ADDITIONAL_WRAPPER_TWO }),
  ).toHaveFocus();

  await user.tab({ shift: true });
  expect(
    screen.getByRole("button", { name: BUTTON_IN_ADDITIONAL_WRAPPER_ONE }),
  ).toHaveFocus();

  await user.tab({ shift: true });
  expect(screen.getByRole("button", { name: BUTTON_IN_WRAPPER })).toHaveFocus();
});

describe("when content in the children tree changes", () => {
  it("should detect any new focusable elements and focus them when they are tabbed to", async () => {
    const WithChangingChild = () => {
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);

      return (
        <MockComponent>
          {loading ? (
            <input aria-label="input" type="text" />
          ) : (
            <button type="button">One</button>
          )}
        </MockComponent>
      );
    };

    const user = userEvent.setup({ delay: null });
    render(<WithChangingChild />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "One" })).toBeVisible();
    });

    await user.tab();

    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
  });

  it("should detect any new focusable elements and focus them when they are tabbed to when using a custom selector", async () => {
    const WithChangingChild = () => {
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);

      return (
        <MockComponent focusableSelectors=".focusable">
          {loading ? (
            <input aria-label="input" type="text" className="focusable" />
          ) : (
            <button type="button">One</button>
          )}
          <button type="button" className="focusable">
            Two
          </button>
        </MockComponent>
      );
    };

    const user = userEvent.setup({ delay: null });
    render(<WithChangingChild />);

    await user.tab();
    expect(screen.getByLabelText("input")).toHaveFocus();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "One" })).toBeVisible();
    });

    await user.tab();
    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();
  });

  it("should detect when additionalWrappers update and remove any elements no longer visible from focusableElements", async () => {
    const WithDisappearingButton = () => {
      const additionalRef = useRef<HTMLDivElement>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);

      return (
        <>
          <MockComponent additionalWrapperRefs={[additionalRef]}>
            <button type="button" id="insidewrapper1">
              One
            </button>
            <button type="button" id="insidewrapper2">
              Two
            </button>
          </MockComponent>
          <div ref={additionalRef}>
            {loading && <button type="button">Magic</button>}
          </div>
        </>
      );
    };

    const user = userEvent.setup({ delay: null });
    render(<WithDisappearingButton />);

    const magicButton = screen.getByRole("button", {
      name: "Magic",
    });

    await user.tab();
    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();

    await user.tab();
    expect(magicButton).toHaveFocus();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await waitFor(() => {
      expect(magicButton).not.toBeInTheDocument();
    });

    await user.tab();
    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
  });
});

test("only focuses elements which meet the custom selector, when tabbing both forwards and backwards and custom focusable element selector is provided", async () => {
  const user = userEvent.setup({ delay: null });
  render(
    <MockComponent focusableSelectors="button.focusable">
      <button type="button" className="focusable">
        One
      </button>
      <button type="button">Two</button>
      <button type="button" className="focusable">
        Three
      </button>
    </MockComponent>,
  );

  const buttonOne = screen.getByRole("button", { name: "One" });
  const buttonThree = screen.getByRole("button", { name: "Three" });
  buttonOne.focus();

  await user.tab();
  expect(buttonThree).toHaveFocus();

  await user.tab({ shift: true });
  expect(buttonOne).toHaveFocus();

  await user.tab({ shift: true });
  expect(buttonThree).toHaveFocus();
});

test("when multiple focus traps are open at once, focus moves correctly between the elements of the currently-focused trap", async () => {
  const user = userEvent.setup({ delay: null });
  render(
    <>
      <MockComponent>
        <button type="button">One</button>
        <button type="button">Two</button>
      </MockComponent>
      <MockComponent>
        <button type="button">Three</button>
        <button type="button">Four</button>
      </MockComponent>
    </>,
  );
  const buttonOne = screen.getByRole("button", { name: "One" });
  const buttonTwo = screen.getByRole("button", { name: "Two" });
  buttonOne.focus();

  await user.tab();
  expect(buttonTwo).toHaveFocus();

  await user.tab();
  expect(buttonOne).toHaveFocus();

  const buttonThree = screen.getByRole("button", { name: "Three" });
  const buttonFour = screen.getByRole("button", { name: "Four" });
  buttonThree.focus();

  await user.tab();
  expect(buttonFour).toHaveFocus();

  await user.tab();
  expect(buttonThree).toHaveFocus();
});

test("when multiple focus traps are open at once, focus moves correctly between the elements of the currently-focused trap when using a custom selector", async () => {
  const user = userEvent.setup({ delay: null });
  render(
    <>
      <MockComponent>
        <button type="button">One</button>
        <button type="button">Two</button>
        <button type="button">Three</button>
      </MockComponent>
      <MockComponent focusableSelectors="button.focusable-button">
        <button className="focusable-button" type="button">
          Four
        </button>
        <button type="button">Five</button>
        <button className="focusable-button" type="button">
          Six
        </button>
      </MockComponent>
    </>,
  );
  const buttonOne = screen.getByRole("button", { name: "One" });
  buttonOne.focus();

  await user.tab();
  expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: "Three" })).toHaveFocus();

  await user.tab();
  expect(buttonOne).toHaveFocus();

  const buttonFour = screen.getByRole("button", { name: "Four" });
  buttonFour.focus();

  await user.tab();
  expect(screen.getByRole("button", { name: "Six" })).toHaveFocus();

  await user.tab();
  expect(buttonFour).toHaveFocus();
});

test("should allow focusing out from the focused element when focusing an element that programmatically focuses another non-focusable element", async () => {
  const WithProgrammaticFocusTrigger = () => {
    const buttonThreeRef = useRef<HTMLButtonElement>(null);

    return (
      <MockComponent>
        <button type="button">One</button>
        <button
          onFocus={() => {
            buttonThreeRef.current?.focus();
          }}
          type="button"
        >
          Two
        </button>
        <button ref={buttonThreeRef} type="button">
          Three
        </button>
      </MockComponent>
    );
  };

  const user = userEvent.setup({ delay: null });
  render(<WithProgrammaticFocusTrigger />);

  await user.tab();
  expect(screen.getByRole("button", { name: "One" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: "Three" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
});

test("should focus the first focusable element when the the focus is on a non focusable element that is the last element", async () => {
  const user = userEvent.setup({ delay: null });
  render(
    <MockComponent>
      <button type="button">One</button>
      <button type="button">Two</button>
      <button type="button" tabIndex={-1}>
        Three
      </button>
    </MockComponent>,
  );
  screen.getByRole("button", { name: "Three" }).focus();

  await user.tab();

  expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
});

test("should focus the last focusable element when the the focus is on a non focusable element that is the first element", async () => {
  const user = userEvent.setup({ delay: null });
  render(
    <MockComponent>
      <button type="button" tabIndex={-1}>
        One
      </button>
      <button type="button">Two</button>
      <button type="button">Three</button>
    </MockComponent>,
  );
  screen.getByRole("button", { name: "One" }).focus();

  await user.tab({ shift: true });

  expect(screen.getByRole("button", { name: "Three" })).toHaveFocus();
});

test("when focusableSelectors is not used, preventDefault is not called upon tab press", async () => {
  render(
    <MockComponent>
      <button type="button">One</button>
      <button type="button">Two</button>
    </MockComponent>,
  );
  const buttonOne = screen.getByRole("button", { name: "One" });
  const firstKeydownEvent = createEvent.keyDown(buttonOne, { key: "Tab" });

  fireEvent(buttonOne, firstKeydownEvent);

  expect(firstKeydownEvent.defaultPrevented).toBeFalsy();
});

test("when focusableSelectors is used, preventDefault is called when needed to prevent an undesired element becomed focused", async () => {
  render(
    <MockComponent focusableSelectors="button.focusable">
      <button type="button">One</button>
      <button type="button" className="focusable">
        Two
      </button>
    </MockComponent>,
  );
  const buttonOne = screen.getByRole("button", { name: "One" });
  const keydownEvent = createEvent.keyDown(buttonOne, { key: "Tab" });

  fireEvent(buttonOne, keydownEvent);

  expect(keydownEvent.defaultPrevented).toBeTruthy();
});

describe("when focus is lost to the document body and `topModalContext` has a value", () => {
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
        <p>I am some irrelevant text</p>
        <button type="button">Outside button</button>
        <div ref={trapModalRef}>
          <FocusTrap wrapperRef={trapWrapper} isOpen>
            <div ref={trapWrapper}>
              <button type="button">One</button>
              <button type="button">Two</button>
            </div>
          </FocusTrap>
        </div>
        <div ref={otherModalRef}>
          <button type="button">Three</button>
        </div>
      </TopModalContext.Provider>
    );
  };

  it("should put focus on the first focusable element when the user tabs and the focus trap is in the top modal", async () => {
    const user = userEvent.setup({ delay: null });
    render(<ComponentWithTopModalContext trapIsTopModal />);

    await user.click(screen.getByText("I am some irrelevant text"));
    expect(document.body).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
  });

  it("should not do anything when the user tabs and the focus trap is not in the top modal", async () => {
    const user = userEvent.setup({ delay: null });
    render(<ComponentWithTopModalContext trapIsTopModal={false} />);

    await user.click(screen.getByText("I am some irrelevant text"));
    expect(document.body).toHaveFocus();

    await user.tab();
    expect(screen.getByText("Outside button")).toHaveFocus();
  });
});

test("when FocusTrap is closed, focus should move normally through focusable elements outside the trap", async () => {
  const ClosedFocusTrap = () => {
    const wrapperRef = useRef(null);
    return (
      <>
        <FocusTrap isOpen={false} wrapperRef={wrapperRef}>
          <div ref={wrapperRef} style={{ visibility: "hidden" }}>
            <button type="button">One</button>
          </div>
        </FocusTrap>
        <button type="button">Two</button>
        <button type="button">Three</button>
        <button type="button">Four</button>
      </>
    );
  };
  const user = userEvent.setup({ delay: null });

  render(<ClosedFocusTrap />);

  await user.tab();
  expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: "Three" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: "Four" })).toHaveFocus();
});

test("should focus the first input that has the `autoFocus` prop set on it", () => {
  render(
    <MockComponent>
      <Select onChange={() => {}} autoFocus label="Autofocus me">
        <Option value="1" text="one" />
      </Select>
      <Checkbox label="Do not autofocus me" autoFocus />
    </MockComponent>,
  );

  expect(screen.getByRole("combobox")).toHaveFocus();
});

test("should loop to the last element when there is elements with tabIndex of -1 (SelectList) and shift + tab pressed", async () => {
  const user = userEvent.setup({ delay: null });
  render(
    <MockComponent>
      <Select onChange={() => {}} autoFocus label="Autofocus me">
        <Option value="1" text="one" />
      </Select>
      <Checkbox label="Do not autofocus me" autoFocus />
    </MockComponent>,
  );

  expect(screen.getByRole("combobox")).toHaveFocus();

  await user.tab({ shift: true });
  await user.tab({ shift: true });

  expect(screen.getByRole("combobox")).toHaveFocus();
});

test("should set focus on the `focusFirstElement` when it and an input with `autoFocus` are detected", () => {
  render(
    mockComponentToRender({
      children: (
        <Select onChange={() => {}} autoFocus label="Autofocus me">
          <Option value="1" text="one" />
        </Select>
      ),
      shouldFocusFirstElement: true,
    }),
  );

  expect(screen.getByRole("button", { name: "first" })).toHaveFocus();
});

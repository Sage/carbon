import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Time, TimeHandle } from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import inputSizes from "../../__internal__/input/input-sizes.style";
import {
  heightConfig,
  paddingConfig,
  fontSizeConfig,
} from "../button-toggle/button-toggle.style";
import I18nProvider from "../i18n-provider";

const localeMock = {
  time: {
    amText: () => "foo-toggle",
    pmText: () => "bar-toggle",
    hoursLabelText: () => "foo-label",
    minutesLabelText: () => "bar-label",
    hoursAriaLabelText: () => "foo-aria-label",
    minutesAriaLabelText: () => "bar-aria-label",
  },
};

const MockComponent = ({
  focusTarget,
}: {
  focusTarget: "hours" | "minutes";
}) => {
  const timeHandle = React.useRef<TimeHandle>(null);

  const handleClick = () => {
    if (focusTarget === "hours") {
      timeHandle.current?.focusHoursInput();
    } else {
      timeHandle.current?.focusMinutesInput();
    }
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Focus input
      </button>
      <Time
        ref={timeHandle}
        onChange={() => {}}
        value={{ hours: "12", minutes: "30" }}
      />
    </>
  );
};

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

testStyledSystemMargin(
  (props) => (
    <Time value={{ hours: "", minutes: "" }} onChange={() => {}} {...props} />
  ),
  () => screen.getByRole("group"),
);

test("should not display the AM/PM toggle by default", () => {
  render(<Time value={{ hours: "", minutes: "" }} onChange={() => {}} />);

  expect(screen.queryByRole("button", { name: "AM" })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "PM" })).not.toBeInTheDocument();
});

test("should display the AM/PM toggle and highlight the first button when toggleValue prop is `AM`", () => {
  render(
    <Time
      value={{ hours: "", minutes: "", period: "AM" }}
      onChange={() => {}}
    />,
  );

  const amToggle = screen.getByRole("button", { name: "AM", pressed: true });
  const pmToggle = screen.getByRole("button", { name: "PM", pressed: false });

  expect(amToggle).toBeVisible();
  expect(pmToggle).toBeVisible();
});

test("should display the AM/PM toggle and highlight the second button when toggleValue prop is `PM`", () => {
  render(
    <Time
      value={{ hours: "", minutes: "", period: "PM" }}
      onChange={() => {}}
    />,
  );

  const amToggle = screen.getByRole("button", { name: "AM", pressed: false });
  const pmToggle = screen.getByRole("button", { name: "PM", pressed: true });

  expect(amToggle).toBeVisible();
  expect(pmToggle).toBeVisible();
});

test("should render the input hint text when prop is set", () => {
  render(
    <Time
      value={{ hours: "12", minutes: "30" }}
      onChange={() => {}}
      inputHint="hint text"
    />,
  );

  expect(screen.getByText("hint text")).toBeVisible();
});

test("should focus the relevant input when the associated label is clicked", async () => {
  render(<Time value={{ hours: "12", minutes: "30" }} onChange={() => {}} />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.click(screen.getByText("Hrs."));

  expect(screen.getByDisplayValue("12")).toHaveFocus();

  await user.click(screen.getByText("Mins."));

  expect(screen.getByDisplayValue("30")).toHaveFocus();
});

test("should focus each input in the expected order when user is tabbing", async () => {
  render(
    <Time
      value={{ hours: "12", minutes: "30", period: "AM" }}
      onChange={() => {}}
    />,
  );

  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
    delay: null,
  });

  await user.tab();

  expect(screen.getByDisplayValue("12")).toHaveFocus();

  await user.tab();

  expect(screen.getByDisplayValue("30")).toHaveFocus();

  await user.tab();

  expect(screen.getByRole("button", { name: "AM" })).toHaveFocus();
});

test("should focus each input in the expected order when user is shift tabbing", async () => {
  render(
    <Time
      value={{ hours: "12", minutes: "30", period: "AM" }}
      onChange={() => {}}
    />,
  );

  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
    delay: null,
  });
  const hrsInput = screen.getByDisplayValue("12");
  const minsInput = screen.getByDisplayValue("30");
  const amToggle = screen.getByRole("button", { name: "AM" });

  act(() => {
    amToggle.focus();
  });
  await user.tab({ shift: true });

  expect(minsInput).toHaveFocus();

  await user.tab({ shift: true });

  expect(hrsInput).toHaveFocus();
});

test("should verify fieldset uses visible legend text as its accessible name", () => {
  render(
    <Time
      value={{ hours: "12", minutes: "30" }}
      onChange={() => {}}
      label="Time"
    />,
  );

  const fieldset = screen.getByRole("group");
  expect(fieldset).toHaveAccessibleName("Time");
  const legend = within(fieldset).getByText("Time");
  expect(legend).toBeVisible();
});

test("should apply the `medium` `size` styling to inputs and toggles by default", () => {
  render(
    <Time
      value={{ hours: "12", minutes: "30", period: "AM" }}
      onChange={() => {}}
    />,
  );

  const [hrsInputPresentation, minsInputPresentation] =
    screen.getAllByRole("presentation");
  const { height, horizontalPadding } = inputSizes.medium;
  const amToggle = screen.getByRole("button", { name: "AM" });
  const pmToggle = screen.getByRole("button", { name: "PM" });

  expect(hrsInputPresentation).toHaveStyle({
    "min-height": height,
    padding: horizontalPadding,
  });
  expect(minsInputPresentation).toHaveStyle({
    "min-height": height,
    padding: horizontalPadding,
  });
  expect(amToggle).toHaveStyle({
    minHeight: `${heightConfig.medium}px`,
    padding: `0 ${paddingConfig.medium}px`,
    "font-size": `${fontSizeConfig.medium}px`,
  });
  expect(pmToggle).toHaveStyle({
    minHeight: `${heightConfig.medium}px`,
    padding: `0 ${paddingConfig.medium}px`,
    "font-size": `${fontSizeConfig.medium}px`,
  });
});

it.each(["small", "medium", "large"] as const)(
  "should apply the expected styling to the inputs and toggle when size is %s",
  (size) => {
    render(
      <Time
        value={{ hours: "12", minutes: "30", period: "AM" }}
        onChange={() => {}}
        size={size}
      />,
    );

    const [hrsInputPresentation, minsInputPresentation] =
      screen.getAllByRole("presentation");
    const { height, horizontalPadding } = inputSizes[size];
    const amToggle = screen.getByRole("button", { name: "AM" });
    const pmToggle = screen.getByRole("button", { name: "PM" });

    expect(hrsInputPresentation).toHaveStyle({
      "min-height": height,
      padding: horizontalPadding,
    });
    expect(minsInputPresentation).toHaveStyle({
      "min-height": height,
      padding: horizontalPadding,
    });
    expect(amToggle).toHaveStyle({
      minHeight: `${heightConfig[size]}px`,
      padding: `0 ${paddingConfig[size]}px`,
      "font-size": `${fontSizeConfig[size]}px`,
    });
    expect(pmToggle).toHaveStyle({
      minHeight: `${heightConfig[size]}px`,
      padding: `0 ${paddingConfig[size]}px`,
      "font-size": `${fontSizeConfig[size]}px`,
    });
  },
);

test("should apply the custom id on the hours input when `hoursInputProps` has an `id` set", () => {
  render(
    <Time
      value={{ hours: "12", minutes: "30" }}
      onChange={() => {}}
      hoursInputProps={{ id: "foo" }}
    />,
  );

  const hoursInput = screen.getByDisplayValue("12");
  expect(hoursInput).toHaveAttribute("id", "foo");
});

test("should apply the custom id on the minutes input when `minutesInputProps` has an `id` set", () => {
  render(
    <Time
      value={{ hours: "12", minutes: "30" }}
      onChange={() => {}}
      minutesInputProps={{ id: "foo" }}
    />,
  );

  const minutesInput = screen.getByDisplayValue("30");
  expect(minutesInput).toHaveAttribute("id", "foo");
});

test("should call onChange when a user types in the hours input and toggle is rendered", async () => {
  const onChangeMock = jest.fn();
  render(
    <Time
      value={{ hours: "", minutes: "", period: "AM" }}
      onChange={onChangeMock}
      hoursInputProps={{ id: "foo" }}
      minutesInputProps={{ id: "bar" }}
    />,
  );

  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
    delay: null,
  });

  const hoursInput = screen.getByLabelText("Hrs.");
  await user.type(hoursInput, "1");

  expect(onChangeMock).toHaveBeenCalledWith(
    expect.objectContaining({
      target: {
        name: undefined,
        id: "foo bar",
        value: { hours: "1", minutes: "", period: "AM" },
      },
    }),
  );
});

test("should call onChange when a user types in the hours input and toggle is not rendered", async () => {
  const onChangeMock = jest.fn();
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={onChangeMock}
      hoursInputProps={{ id: "foo" }}
      minutesInputProps={{ id: "bar" }}
    />,
  );

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.tab();
  await user.keyboard(`{1}`);

  expect(onChangeMock).toHaveBeenCalledWith(
    expect.objectContaining({
      target: {
        name: undefined,
        id: "foo bar",
        value: { hours: "1", minutes: "" },
      },
    }),
  );
});

test("should call onChange when a user types in the minutes input and toggle is rendered", async () => {
  const onChangeMock = jest.fn();
  render(
    <Time
      value={{ hours: "", minutes: "", period: "AM" }}
      onChange={onChangeMock}
      hoursInputProps={{ id: "foo" }}
      minutesInputProps={{ id: "bar" }}
    />,
  );

  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
    delay: null,
  });

  const minutesInput = screen.getByLabelText("Mins.");
  await user.type(minutesInput, "1");

  expect(onChangeMock).toHaveBeenCalledWith(
    expect.objectContaining({
      target: {
        name: undefined,
        id: "foo bar",
        value: { hours: "", minutes: "1", period: "AM" },
      },
    }),
  );
});

test("should call onChange when a user types in the minutes input and toggle is not rendered", async () => {
  const onChangeMock = jest.fn();
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={onChangeMock}
      hoursInputProps={{ id: "foo" }}
      minutesInputProps={{ id: "bar" }}
    />,
  );

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.tab();
  await user.tab();
  await user.keyboard(`{1}`);

  expect(onChangeMock).toHaveBeenCalledWith(
    expect.objectContaining({
      target: {
        name: undefined,
        id: "foo bar",
        value: { hours: "", minutes: "1" },
      },
    }),
  );
});

test("should call onChange when a user clicks the toggle that is not currently selected", async () => {
  const onChangeMock = jest.fn();
  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
    delay: null,
  });
  render(
    <Time
      value={{ hours: "", minutes: "", period: "AM" }}
      onChange={onChangeMock}
      hoursInputProps={{ id: "foo" }}
      minutesInputProps={{ id: "bar" }}
    />,
  );

  const pmToggle = screen.getByRole("button", { name: "PM" });

  await user.click(pmToggle);

  expect(onChangeMock).toHaveBeenCalledWith(
    expect.objectContaining({
      target: {
        name: undefined,
        id: "foo bar",
        value: { hours: "", minutes: "", period: "PM" },
      },
    }),
  );
});

test("should not call onChange when a user clicks the toggle that is currently selected", async () => {
  const onChangeMock = jest.fn();
  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
    delay: null,
  });
  render(
    <Time
      value={{ hours: "", minutes: "", period: "AM" }}
      onChange={onChangeMock}
      hoursInputProps={{ id: "foo" }}
      minutesInputProps={{ id: "bar" }}
    />,
  );

  const amToggle = screen.getByRole("button", { name: "AM" });

  await user.click(amToggle);

  expect(onChangeMock).not.toHaveBeenCalled();
});

test("should call onBlur when the hours input is focused and the user presses shift + tab", async () => {
  const onBlurMock = jest.fn();
  render(
    <Time
      value={{ hours: "12", minutes: "" }}
      onChange={() => {}}
      onBlur={onBlurMock}
    />,
  );

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  act(() => {
    screen.getByDisplayValue("12").focus();
  });
  await user.tab({ shift: true });

  expect(onBlurMock).toHaveBeenCalled();
});

test("should not call onBlur when the hours input is focused and the user presses tab", async () => {
  const onBlurMock = jest.fn();
  render(
    <Time
      value={{ hours: "12", minutes: "" }}
      onChange={() => {}}
      onBlur={onBlurMock}
    />,
  );

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  act(() => {
    screen.getByDisplayValue("12").focus();
  });
  await user.tab();

  expect(onBlurMock).not.toHaveBeenCalled();
});

test("should call onBlur when the minutes input is focused and the user presses tab", async () => {
  const onBlurMock = jest.fn();
  render(
    <Time
      value={{ hours: "", minutes: "12" }}
      onChange={() => {}}
      onBlur={onBlurMock}
    />,
  );

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  act(() => {
    screen.getByDisplayValue("12").focus();
  });
  await user.tab();

  expect(onBlurMock).toHaveBeenCalled();
});

test("should not call onBlur when the minutes input is focused and the user presses shift + tab", async () => {
  const onBlurMock = jest.fn();
  render(
    <Time
      value={{ hours: "", minutes: "12" }}
      onChange={() => {}}
      onBlur={onBlurMock}
    />,
  );

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  act(() => {
    screen.getByDisplayValue("12").focus();
  });
  await user.tab({ shift: true });

  expect(onBlurMock).not.toHaveBeenCalled();
});

test("should render the validation message text when the hours input has an error passed a string value", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      hoursInputProps={{ error: "There is an error" }}
    />,
  );

  expect(screen.getByText("There is an error")).toBeVisible();
});

test("should render the validation message text when the minutes input has an error passed a string value", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      minutesInputProps={{ error: "There is an error" }}
    />,
  );

  expect(screen.getByText("There is an error")).toBeVisible();
});

test("should render the validation message text when both the hours and minutes inputs have errors passed as string values", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      hoursInputProps={{ error: "There is an error in hours input." }}
      minutesInputProps={{ error: "There is an error in minutes input." }}
    />,
  );

  expect(
    screen.getByText(
      "There is an error in hours input. There is an error in minutes input.",
    ),
  ).toBeVisible();
});

test("should render the expected input styling when the hours input has an error passed as a truthy boolean value", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      hoursInputProps={{ error: true }}
    />,
  );

  const [hrsInputPresentation, minsInputPresentation] =
    screen.getAllByRole("presentation");

  expect(hrsInputPresentation).toHaveStyle({
    "box-shadow":
      "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
  });
  expect(minsInputPresentation).not.toHaveStyle({
    "box-shadow":
      "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
  });
});

test("should render the expected input styling when the minutes input has an error passed as a truthy boolean value", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      minutesInputProps={{ error: true }}
    />,
  );

  const [hrsInputPresentation, minsInputPresentation] =
    screen.getAllByRole("presentation");

  expect(hrsInputPresentation).not.toHaveStyle({
    "box-shadow":
      "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
  });
  expect(minsInputPresentation).toHaveStyle({
    "box-shadow":
      "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
  });
});

test("should render the expected input styling when both the hours and minutes inputs have errors passed as truthy boolean values", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      hoursInputProps={{ error: true }}
      minutesInputProps={{ error: true }}
    />,
  );

  const [hrsInputPresentation, minsInputPresentation] =
    screen.getAllByRole("presentation");

  expect(hrsInputPresentation).toHaveStyle({
    "box-shadow":
      "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
  });
  expect(minsInputPresentation).toHaveStyle({
    "box-shadow":
      "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
  });
});

test("should render the validation message text when the hours input has a warning passed as a string value", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      hoursInputProps={{ warning: "There is an warning" }}
    />,
  );

  expect(screen.getByText("There is an warning")).toBeVisible();
});

test("should render the validation message text when the minutes input has a warning passed as a string value", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      minutesInputProps={{ warning: "There is an warning" }}
    />,
  );

  expect(screen.getByText("There is an warning")).toBeVisible();
});

test("should render the validation message text when both the hours and minutes inputs have warnings passed as string values", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      hoursInputProps={{ warning: "There is an warning in hours input." }}
      minutesInputProps={{ warning: "There is an warning in minutes input." }}
    />,
  );

  expect(
    screen.getByText(
      "There is an warning in hours input. There is an warning in minutes input.",
    ),
  ).toBeVisible();
});

test("should render the expected input styling when the hours input has a warning passed as a truthy boolean value", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      hoursInputProps={{ warning: true }}
    />,
  );

  const [hrsInputPresentation, minsInputPresentation] =
    screen.getAllByRole("presentation");

  expect(hrsInputPresentation).toHaveStyleRule(
    "border-color",
    "var(--colorsSemanticCaution500) !important",
  );
  expect(minsInputPresentation).toHaveStyleRule(
    "border",
    "1px solid var(--colorsUtilityMajor300)",
  );
});

test("should render the expected input styling when the minutes input has a warning passed as a truthy boolean value", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      minutesInputProps={{ warning: true }}
    />,
  );

  const [hrsInputPresentation, minsInputPresentation] =
    screen.getAllByRole("presentation");

  expect(hrsInputPresentation).toHaveStyleRule(
    "border",
    "1px solid var(--colorsUtilityMajor300)",
  );
  expect(minsInputPresentation).toHaveStyleRule(
    "border-color",
    "var(--colorsSemanticCaution500) !important",
  );
});

test("should render the expected input styling when the hours and minutes inputs have warnings passed as truthy boolean values", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      hoursInputProps={{ warning: true }}
      minutesInputProps={{ warning: true }}
    />,
  );

  const [hrsInputPresentation, minsInputPresentation] =
    screen.getAllByRole("presentation");

  expect(hrsInputPresentation).toHaveStyleRule(
    "border-color",
    "var(--colorsSemanticCaution500) !important",
  );
  expect(minsInputPresentation).toHaveStyleRule(
    "border-color",
    "var(--colorsSemanticCaution500) !important",
  );
});

test("should set the required attribute on the inputs when the prop is set", () => {
  render(
    <Time
      value={{ hours: "12", minutes: "30" }}
      onChange={() => {}}
      required
      label="Label"
    />,
  );

  expect(screen.getByDisplayValue("12")).toBeRequired();
  expect(screen.getByDisplayValue("30")).toBeRequired();
});

test("should append the optional text on the label when isOptional prop is set", () => {
  render(
    <Time
      value={{ hours: "12", minutes: "30" }}
      onChange={() => {}}
      isOptional
      label="Label"
    />,
  );

  // use jest-styled-component's assertion as workaround for the pseudo element not being accessible
  expect(screen.getByText("Label")).toHaveStyleRule("content", '"(optional)"', {
    modifier: "::after",
  });
});

test("should render with the default translations if no overrides are provided", () => {
  render(
    <Time
      value={{ hours: "", minutes: "", period: "AM" }}
      onChange={() => {}}
      label="Label"
    />,
  );

  expect(screen.getByText("Hrs.")).toBeVisible();
  expect(screen.getByText("Mins.")).toBeVisible();
  expect(screen.getByText("AM")).toBeVisible();
  expect(screen.getByText("PM")).toBeVisible();
});

test("should render with the overridden translations if provided", () => {
  render(
    <I18nProvider locale={localeMock}>
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={() => {}}
        label="Label"
      />
    </I18nProvider>,
  );

  expect(screen.getByText("foo-label")).toBeVisible();
  expect(screen.getByText("bar-label")).toBeVisible();
  expect(screen.getByText("foo-toggle")).toBeVisible();
  expect(screen.getByText("bar-toggle")).toBeVisible();
  expect(screen.getByLabelText("foo-aria-label")).toBeVisible();
  expect(screen.getByLabelText("bar-aria-label")).toBeVisible();
});

test("should render the labels for the hours and minutes inputs if provided instead of the translations", () => {
  render(
    <I18nProvider locale={localeMock}>
      <Time
        hoursInputProps={{ label: "hours prop string" }}
        minutesInputProps={{ label: "minutes prop string" }}
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        label="Label"
      />
    </I18nProvider>,
  );

  expect(screen.getByText("hours prop string")).toBeVisible();
  expect(screen.getByText("minutes prop string")).toBeVisible();
});

test("should call the exposed `focusHoursInput` and focus the hours input", async () => {
  render(<MockComponent focusTarget="hours" />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const button = screen.getByText("Focus input");

  await user.click(button);

  expect(screen.getByDisplayValue("12")).toHaveFocus();
});

test("calling the exposed `focusMinutesInput` and focus the minutes input", async () => {
  render(<MockComponent focusTarget="minutes" />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const button = screen.getByText("Focus input");

  await user.click(button);

  expect(screen.getByDisplayValue("30")).toHaveFocus();
});

it.each(["disabled", "readOnly"])(
  "should not call onChange when `%s` prop is set and toggle is clicked",

  async (prop) => {
    const onChangeMock = jest.fn();
    const user = userEvent.setup({ delay: null });
    render(
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={onChangeMock}
        {...{ [prop]: true }}
      />,
    );

    const pmToggle = screen.getByRole("button", { name: "PM" });

    await user.click(pmToggle);

    expect(onChangeMock).not.toHaveBeenCalled();
  },
);

test("should apply the expected styling when disabled prop is set", () => {
  render(
    <Time
      value={{ hours: "", minutes: "", period: "AM" }}
      onChange={() => {}}
      label="label"
      inputHint="hint"
      disabled
    />,
  );

  const mainLabel = screen.getByText("label");
  const hintText = screen.getByText("hint");
  const hrsLabel = screen.getByText("Hrs.");
  const minsLabel = screen.getByText("Mins.");

  expect(mainLabel).toHaveStyleRule("color: var(--colorsUtilityYin030)");
  expect(hintText).toHaveStyleRule("color: var(--colorsUtilityYin030)");
  expect(hrsLabel).toHaveStyleRule("color: var(--colorsUtilityYin030)");
  expect(minsLabel).toHaveStyleRule("color: var(--colorsUtilityYin030)");
});

test("should apply the expected styling when readOnly prop is set", () => {
  render(
    <Time
      value={{ hours: "", minutes: "", period: "AM" }}
      onChange={() => {}}
      label="label"
      inputHint="hint"
      readOnly
    />,
  );

  const hintText = screen.getByText("hint");
  const hrsLabel = screen.getByText("Hrs.");
  const minsLabel = screen.getByText("Mins.");

  expect(hintText).toHaveStyleRule("color: var(--colorsUtilityYin055)");
  expect(hrsLabel).toHaveStyleRule("color: var(--colorsUtilityYin055)");
  expect(minsLabel).toHaveStyleRule("color: var(--colorsUtilityYin055)");
});

test("should have the expected `data-` attributes set on the root element", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      label="label"
      data-element="foo"
      data-role="bar"
    />,
  );

  const fieldset = screen.getByRole("group", { name: "label" });
  expect(fieldset).toHaveAttribute("data-component", "time");
  expect(fieldset).toHaveAttribute("data-element", "foo");
  expect(fieldset).toHaveAttribute("data-role", "bar");
});

test("should apply the custom `data-` attributes on the input wrappers when they are passed via `hoursInputProps` and `minutesInputProps`", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      hoursInputProps={{
        "data-element": "foo",
        "data-role": "hours-input-wrapper",
      }}
      minutesInputProps={{
        "data-element": "foo",
        "data-role": "minutes-input-wrapper",
      }}
    />,
  );

  const hoursWrapper = screen.getByTestId("hours-input-wrapper");
  const minutesWrapper = screen.getByTestId("minutes-input-wrapper");

  expect(hoursWrapper).toHaveAttribute("data-component", "hours");
  expect(hoursWrapper).toHaveAttribute("data-element", "foo");

  expect(minutesWrapper).toHaveAttribute("data-component", "minutes");
  expect(minutesWrapper).toHaveAttribute("data-element", "foo");
});

test("should apply the custom `data-` attributes on the toggle component wrappers when they are passed via `toggleProps`", () => {
  render(
    <Time
      value={{ hours: "", minutes: "", period: "AM" }}
      label="Time"
      onChange={() => {}}
      toggleProps={{
        wrapperProps: { "data-element": "foo", "data-role": "bar" },
        amToggleProps: {
          "data-element": "foo",
          "data-role": "am-button-wrapper",
        },
        pmToggleProps: {
          "data-element": "foo",
          "data-role": "pm-button-wrapper",
        },
      }}
    />,
  );

  const fieldset = screen.getByRole("group", { name: "Time" });
  const toggleButtonGroup = within(fieldset).getByRole("group");
  expect(toggleButtonGroup).toHaveAttribute(
    "data-component",
    "time-button-toggle-group",
  );
  expect(toggleButtonGroup).toHaveAttribute("data-element", "foo");
  expect(toggleButtonGroup).toHaveAttribute("data-role", "bar");

  const amButtonWrapper = screen.getByTestId("am-button-wrapper");
  expect(amButtonWrapper).toHaveAttribute("data-component", "am-button-toggle");
  expect(amButtonWrapper).toHaveAttribute("data-element", "foo");

  const pmButtonWrapper = screen.getByTestId("pm-button-wrapper");
  expect(pmButtonWrapper).toHaveAttribute("data-component", "pm-button-toggle");
  expect(pmButtonWrapper).toHaveAttribute("data-element", "foo");
});

test("should apply the correct aria-describedby attribute to fieldset when inputHint is provided", () => {
  render(
    <Time
      value={{ hours: "", minutes: "" }}
      onChange={() => {}}
      inputHint="hint"
    />,
  );

  const fieldset = screen.getByRole("group");

  expect(fieldset).toHaveAccessibleDescription("hint");
});

test("should not apply the aria-describedby attribute to fieldset when inputHint is not provided", () => {
  render(<Time value={{ hours: "", minutes: "" }} onChange={() => {}} />);

  const fieldset = screen.getByRole("group");

  expect(fieldset).not.toHaveAttribute("aria-describedby");
});

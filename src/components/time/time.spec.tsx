import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Time, TimeHandle } from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/test-utils";
import inputSizes from "../../__internal__/input/input-sizes.style";
import {
  heightConfig,
  paddingConfig,
  fontSizeConfig,
} from "../button-toggle/button-toggle.style";
import I18nProvider from "../i18n-provider";
import { rootTagTestRtl } from "../../__internal__/utils/helpers/tags/tags-specs";

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

describe("Time component", () => {
  testStyledSystemMargin((props) => (
    <Time value={{ hours: "", minutes: "" }} onChange={() => {}} {...props} />
  ));

  it("should not display the AM/PM toggle by default", () => {
    render(<Time value={{ hours: "", minutes: "" }} onChange={() => {}} />);

    expect(screen.queryByText("AM")).not.toBeInTheDocument();
    expect(screen.queryByText("PM")).not.toBeInTheDocument();
  });

  it("should display the AM/PM toggle and highlight the first button when toggleValue prop is `AM`", () => {
    render(
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={() => {}}
      />
    );

    const amToggle = screen.queryByText("AM");
    const pmToggle = screen.queryByText("PM");

    expect(amToggle).toBeInTheDocument();
    expect(amToggle).toHaveAttribute("aria-pressed", "true");
    expect(pmToggle).toBeInTheDocument();
    expect(pmToggle).toHaveAttribute("aria-pressed", "false");
  });

  it("should display the AM/PM toggle and highlight the second button when toggleValue prop is `PM`", () => {
    render(
      <Time
        value={{ hours: "", minutes: "", period: "PM" }}
        onChange={() => {}}
      />
    );

    const amToggle = screen.queryByText("AM");
    const pmToggle = screen.queryByText("PM");

    expect(amToggle).toBeInTheDocument();
    expect(amToggle).toHaveAttribute("aria-pressed", "false");
    expect(pmToggle).toBeInTheDocument();
    expect(pmToggle).toHaveAttribute("aria-pressed", "true");
  });

  it("should render the input hint text when prop is set", () => {
    render(
      <Time
        value={{ hours: "12", minutes: "30" }}
        onChange={() => {}}
        inputHint="hint text"
      />
    );

    expect(screen.queryByText("hint text")).toBeInTheDocument();
  });

  it("should focus the relevant input when the associated label is clicked", async () => {
    render(<Time value={{ hours: "12", minutes: "30" }} onChange={() => {}} />);

    const user = userEvent.setup();
    await user.click(screen.getByText("Hrs."));

    expect(screen.getByDisplayValue("12")).toBeFocused();

    await user.click(screen.getByText("Mins."));

    expect(screen.getByDisplayValue("30")).toBeFocused();
  });

  it("should focus each input in the expected order when user is tabbing", async () => {
    render(
      <Time
        value={{ hours: "12", minutes: "30", period: "AM" }}
        onChange={() => {}}
      />
    );

    const user = userEvent.setup();
    await act(async () => {
      await user.tab();
    });

    expect(screen.getByDisplayValue("12")).toBeFocused();

    await act(async () => {
      await user.tab();
    });

    expect(screen.getByDisplayValue("30")).toBeFocused();

    await act(async () => {
      await user.tab();
    });

    expect(screen.queryByText("AM")).toBeFocused();
  });

  it("should focus each input in the expected order when user is shift tabbing", async () => {
    render(
      <Time
        value={{ hours: "12", minutes: "30", period: "AM" }}
        onChange={() => {}}
      />
    );

    const user = userEvent.setup();
    const hrsInput = screen.getByDisplayValue("12");
    const minsInput = screen.getByDisplayValue("30");
    const amToggle = screen.queryByText("AM");

    act(() => {
      amToggle?.focus();
    });

    expect(amToggle).toHaveFocus();

    await act(async () => {
      await user.tab({ shift: true });
    });

    expect(minsInput).toBeFocused();

    await act(async () => {
      await user.tab({ shift: true });
    });

    expect(hrsInput).toBeFocused();
  });

  it("should render a legend with any passed label text", () => {
    render(
      <Time
        value={{ hours: "12", minutes: "30" }}
        onChange={() => {}}
        label="Time"
      />
    );

    const legend = screen.queryByText("Time");

    expect(legend).toBeInTheDocument();
    expect(legend?.parentElement?.tagName).toBe("LEGEND");
  });

  it("should apply the `medium` `size` styling to inputs and toggles by default", () => {
    render(
      <Time
        value={{ hours: "12", minutes: "30", period: "AM" }}
        onChange={() => {}}
      />
    );

    const [hrsInputPresentation, minsInputPresentation] = screen.getAllByRole(
      "presentation"
    );
    const { height, horizontalPadding } = inputSizes.medium;
    const amToggle = screen.queryByText("AM");
    const pmToggle = screen.queryByText("PM");

    expect(hrsInputPresentation).toHaveStyle({
      "min-height": height,
      padding: horizontalPadding,
    });
    expect(minsInputPresentation).toHaveStyle({
      "min-height": height,
      padding: horizontalPadding,
    });
    expect(amToggle).toHaveStyle({
      height: `${heightConfig.medium}px`,
      padding: `0 ${paddingConfig.medium}px`,
      "font-size": `${fontSizeConfig.medium}px`,
    });
    expect(pmToggle).toHaveStyle({
      height: `${heightConfig.medium}px`,
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
        />
      );

      const [hrsInputPresentation, minsInputPresentation] = screen.getAllByRole(
        "presentation"
      );
      const { height, horizontalPadding } = inputSizes[size];
      const amToggle = screen.queryByText("AM");
      const pmToggle = screen.queryByText("PM");

      expect(hrsInputPresentation).toHaveStyle({
        "min-height": height,
        padding: horizontalPadding,
      });
      expect(minsInputPresentation).toHaveStyle({
        "min-height": height,
        padding: horizontalPadding,
      });
      expect(amToggle).toHaveStyle({
        height: `${heightConfig[size]}px`,
        padding: `0 ${paddingConfig[size]}px`,
        "font-size": `${fontSizeConfig[size]}px`,
      });
      expect(pmToggle).toHaveStyle({
        height: `${heightConfig[size]}px`,
        padding: `0 ${paddingConfig[size]}px`,
        "font-size": `${fontSizeConfig[size]}px`,
      });
    }
  );

  it("should apply the custom id on the hours input when `hoursInputProps` has an `id` set", () => {
    const { container } = render(
      <Time
        value={{ hours: "12", minutes: "30" }}
        onChange={() => {}}
        hoursInputProps={{ id: "foo" }}
      />
    );

    expect(container.querySelector("[id='foo']")).toBeInTheDocument();
  });

  it("should apply the custom id on the minutes input when `minutesInputProps` has an `id` set", () => {
    const { container } = render(
      <Time
        value={{ hours: "12", minutes: "30" }}
        onChange={() => {}}
        minutesInputProps={{ id: "foo" }}
      />
    );

    expect(container.querySelector("[id='foo']")).toBeInTheDocument();
  });

  it("should call onChange when a user types in the hours input and toggle is rendered", async () => {
    const onChangeMock = jest.fn();
    render(
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={onChangeMock}
        hoursInputProps={{ id: "foo" }}
        minutesInputProps={{ id: "bar" }}
      />
    );

    const user = userEvent.setup();

    await act(async () => {
      await user.tab();
      await user.keyboard(`{1}`);
    });

    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          name: undefined,
          id: "foo bar",
          value: { hours: "1", minutes: "", period: "AM" },
        },
      })
    );
  });

  it("should call onChange when a user types in the hours input and toggle is not rendered", async () => {
    const onChangeMock = jest.fn();
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={onChangeMock}
        hoursInputProps={{ id: "foo" }}
        minutesInputProps={{ id: "bar" }}
      />
    );

    const user = userEvent.setup();
    await user.tab();
    await user.keyboard(`{1}`);

    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          name: undefined,
          id: "foo bar",
          value: { hours: "1", minutes: "" },
        },
      })
    );
  });

  it("should call onChange when a user types in the minutes input and toggle is rendered", async () => {
    const onChangeMock = jest.fn();
    render(
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={onChangeMock}
        hoursInputProps={{ id: "foo" }}
        minutesInputProps={{ id: "bar" }}
      />
    );

    const user = userEvent.setup();

    await act(async () => {
      await user.tab();
      await user.tab();
      await user.keyboard(`{1}`);
    });

    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          name: undefined,
          id: "foo bar",
          value: { hours: "", minutes: "1", period: "AM" },
        },
      })
    );
  });

  it("should call onChange when a user types in the minutes input and toggle is not rendered", async () => {
    const onChangeMock = jest.fn();
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={onChangeMock}
        hoursInputProps={{ id: "foo" }}
        minutesInputProps={{ id: "bar" }}
      />
    );

    const user = userEvent.setup();
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
      })
    );
  });

  it("should call onChange when a user clicks the toggle that is not currently selected", async () => {
    const onChangeMock = jest.fn();
    render(
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={onChangeMock}
        hoursInputProps={{ id: "foo" }}
        minutesInputProps={{ id: "bar" }}
      />
    );

    const pmToggle = await screen.findByText("PM");

    await act(async () => {
      await userEvent.click(pmToggle);
    });

    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          name: undefined,
          id: "foo bar",
          value: { hours: "", minutes: "", period: "PM" },
        },
      })
    );
  });

  it("should not call onChange when a user clicks the toggle that is currently selected", async () => {
    const onChangeMock = jest.fn();
    render(
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={onChangeMock}
        hoursInputProps={{ id: "foo" }}
        minutesInputProps={{ id: "bar" }}
      />
    );

    const amToggle = await screen.findByText("AM");

    await act(async () => {
      await userEvent.click(amToggle);
    });

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it("should call onBlur when the hours input is focused and the user presses shift + tab", async () => {
    const onBlurMock = jest.fn();
    render(
      <Time
        value={{ hours: "12", minutes: "" }}
        onChange={() => {}}
        onBlur={onBlurMock}
      />
    );

    const user = userEvent.setup();

    screen.getByDisplayValue("12").focus();
    await user.tab({ shift: true });

    expect(onBlurMock).toHaveBeenCalled();
  });

  it("should not call onBlur when the hours input is focused and the user presses tab", async () => {
    const onBlurMock = jest.fn();
    render(
      <Time
        value={{ hours: "12", minutes: "" }}
        onChange={() => {}}
        onBlur={onBlurMock}
      />
    );

    const user = userEvent.setup();

    screen.getByDisplayValue("12").focus();
    await user.tab();

    expect(onBlurMock).not.toHaveBeenCalled();
  });

  it("should call onBlur when the minutes input is focused and the user presses tab", async () => {
    const onBlurMock = jest.fn();
    render(
      <Time
        value={{ hours: "", minutes: "12" }}
        onChange={() => {}}
        onBlur={onBlurMock}
      />
    );

    const user = userEvent.setup();

    screen.getByDisplayValue("12").focus();
    await user.tab();

    expect(onBlurMock).toHaveBeenCalled();
  });

  it("should not call onBlur when the minutes input is focused and the user presses shift + tab", async () => {
    const onBlurMock = jest.fn();
    render(
      <Time
        value={{ hours: "", minutes: "12" }}
        onChange={() => {}}
        onBlur={onBlurMock}
      />
    );

    const user = userEvent.setup();

    screen.getByDisplayValue("12").focus();
    await user.tab({ shift: true });

    expect(onBlurMock).not.toHaveBeenCalled();
  });

  it("should render the validation message text when the hours input has an error passed a string value", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        hoursInputProps={{ error: "There is an error" }}
      />
    );

    expect(screen.getByText("There is an error")).toBeInTheDocument();
  });

  it("should render the validation message text when the minutes input has an error passed a string value", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        minutesInputProps={{ error: "There is an error" }}
      />
    );

    expect(screen.getByText("There is an error")).toBeInTheDocument();
  });

  it("should render the validation message text when both the hours and minutes inputs have errors passed as string values", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        hoursInputProps={{ error: "There is an error in hours input." }}
        minutesInputProps={{ error: "There is an error in minutes input." }}
      />
    );

    expect(
      screen.getByText(
        "There is an error in hours input. There is an error in minutes input."
      )
    ).toBeInTheDocument();
  });

  it("should render the expected input styling when the hours input has an error passed as a truthy boolean value", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        hoursInputProps={{ error: true }}
      />
    );

    const [hrsInputPresentation, minsInputPresentation] = screen.getAllByRole(
      "presentation"
    );

    expect(hrsInputPresentation).toHaveStyle({
      "box-shadow":
        "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
    });
    expect(minsInputPresentation).not.toHaveStyle({
      "box-shadow":
        "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
    });
  });

  it("should render the expected input styling when the minutes input has an error passed as a truthy boolean value", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        minutesInputProps={{ error: true }}
      />
    );

    const [hrsInputPresentation, minsInputPresentation] = screen.getAllByRole(
      "presentation"
    );

    expect(hrsInputPresentation).not.toHaveStyle({
      "box-shadow":
        "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
    });
    expect(minsInputPresentation).toHaveStyle({
      "box-shadow":
        "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
    });
  });

  it("should render the expected input styling when both the hours and minutes inputs have errors passed as truthy boolean values", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        hoursInputProps={{ error: true }}
        minutesInputProps={{ error: true }}
      />
    );

    const [hrsInputPresentation, minsInputPresentation] = screen.getAllByRole(
      "presentation"
    );

    expect(hrsInputPresentation).toHaveStyle({
      "box-shadow":
        "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
    });
    expect(minsInputPresentation).toHaveStyle({
      "box-shadow":
        "inset 1px 1px 0 var(--colorsSemanticNegative500),inset -1px -1px 0 var(--colorsSemanticNegative500)",
    });
  });

  it("should render the validation message text when the hours input has a warning passed as a string value", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        hoursInputProps={{ warning: "There is an warning" }}
      />
    );

    expect(screen.getByText("There is an warning")).toBeInTheDocument();
  });

  it("should render the validation message text when the minutes input has a warning passed as a string value", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        minutesInputProps={{ warning: "There is an warning" }}
      />
    );

    expect(screen.getByText("There is an warning")).toBeInTheDocument();
  });

  it("should render the validation message text when both the hours and minutes inputs have warnings passed as string values", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        hoursInputProps={{ warning: "There is an warning in hours input." }}
        minutesInputProps={{ warning: "There is an warning in minutes input." }}
      />
    );

    expect(
      screen.getByText(
        "There is an warning in hours input. There is an warning in minutes input."
      )
    ).toBeInTheDocument();
  });

  it("should render the expected input styling when the hours input has a warning passed as a truthy boolean value", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        hoursInputProps={{ warning: true }}
      />
    );

    const [hrsInputPresentation, minsInputPresentation] = screen.getAllByRole(
      "presentation"
    );

    expect(hrsInputPresentation).toHaveStyle({
      "border-color": "var(--colorsSemanticCaution500) !important",
    });
    expect(minsInputPresentation).toHaveStyle({
      border: "1px solid var(--colorsUtilityMajor300)",
    });
  });

  it("should render the expected input styling when the minutes input has a warning passed as a truthy boolean value", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        minutesInputProps={{ warning: true }}
      />
    );

    const [hrsInputPresentation, minsInputPresentation] = screen.getAllByRole(
      "presentation"
    );

    expect(hrsInputPresentation).toHaveStyle({
      border: "1px solid var(--colorsUtilityMajor300)",
    });
    expect(minsInputPresentation).toHaveStyle({
      "border-color": "var(--colorsSemanticCaution500) !important",
    });
  });

  it("should render the expected input styling when the hours and minutes inputs have warnings passed as truthy boolean values", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        hoursInputProps={{ warning: true }}
        minutesInputProps={{ warning: true }}
      />
    );

    const [hrsInputPresentation, minsInputPresentation] = screen.getAllByRole(
      "presentation"
    );

    expect(hrsInputPresentation).toHaveStyle({
      "border-color": "var(--colorsSemanticCaution500) !important",
    });
    expect(minsInputPresentation).toHaveStyle({
      "border-color": "var(--colorsSemanticCaution500) !important",
    });
  });

  it("should set the required attribute on the inputs when the prop is set", () => {
    render(
      <Time
        value={{ hours: "12", minutes: "30" }}
        onChange={() => {}}
        required
        label="Label"
      />
    );

    expect(screen.getByDisplayValue("12")).toHaveAttribute("required");
    expect(screen.getByDisplayValue("30")).toHaveAttribute("required");
  });

  it("should append the optional text on the label when isOptional prop is set", () => {
    render(
      <Time
        value={{ hours: "12", minutes: "30" }}
        onChange={() => {}}
        isOptional
        label="Label"
      />
    );

    expect(screen.queryByText("Label")).toHaveStyleRule(
      "content",
      '"(optional)"',
      { modifier: "::after" }
    );
  });

  it("should render with the default translations if no overrides are provided", () => {
    render(
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={() => {}}
        label="Label"
      />
    );

    expect(screen.queryByText("Hrs.")).toBeInTheDocument();
    expect(screen.queryByText("Mins.")).toBeInTheDocument();
    expect(screen.queryByText("AM")).toBeInTheDocument();
    expect(screen.queryByText("PM")).toBeInTheDocument();
  });

  it("should render with the overridden translations if provided", () => {
    render(
      <I18nProvider locale={localeMock}>
        <Time
          value={{ hours: "", minutes: "", period: "AM" }}
          onChange={() => {}}
          label="Label"
        />
      </I18nProvider>
    );

    expect(screen.queryByText("foo-label")).toBeInTheDocument();
    expect(screen.queryByText("bar-label")).toBeInTheDocument();
    expect(screen.queryByText("foo-toggle")).toBeInTheDocument();
    expect(screen.queryByText("bar-toggle")).toBeInTheDocument();
    expect(screen.queryByLabelText("foo-aria-label")).toBeInTheDocument();
    expect(screen.queryByLabelText("bar-aria-label")).toBeInTheDocument();
  });

  it("should render the labels for the hours and minutes inputs if provided instead of the translations", () => {
    render(
      <I18nProvider locale={localeMock}>
        <Time
          hoursInputProps={{ label: "hours prop string" }}
          minutesInputProps={{ label: "minutes prop string" }}
          value={{ hours: "", minutes: "" }}
          onChange={() => {}}
          label="Label"
        />
      </I18nProvider>
    );

    expect(screen.queryByText("hours prop string")).toBeInTheDocument();
    expect(screen.queryByText("minutes prop string")).toBeInTheDocument();
  });

  it("should call the exposed `focusHoursInput` and focus the hours input", async () => {
    render(<MockComponent focusTarget="hours" />);

    const user = userEvent.setup();
    const button = screen.getByText("Focus input");

    await user.click(button);

    expect(screen.getByDisplayValue("12")).toHaveFocus();
  });

  it("calling the exposed `focusMinutesInput` and focus the minutes input", async () => {
    render(<MockComponent focusTarget="minutes" />);

    const user = userEvent.setup();
    const button = screen.getByText("Focus input");

    await user.click(button);

    expect(screen.getByDisplayValue("30")).toHaveFocus();
  });

  it.each(["disabled", "readOnly"])(
    "should not call onChange when `%s` prop is set and toggle is clicked",
    async (prop) => {
      const onChangeMock = jest.fn();
      render(
        <Time
          value={{ hours: "", minutes: "", period: "AM" }}
          onChange={onChangeMock}
          {...{ [prop]: true }}
        />
      );

      const pmToggle = await screen.findByText("PM");

      await act(async () => {
        await userEvent.click(pmToggle);
      });

      expect(onChangeMock).not.toHaveBeenCalled();
    }
  );

  it("should apply the expected styling when disabled prop is set", () => {
    render(
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={() => {}}
        label="label"
        inputHint="hint"
        disabled
      />
    );

    const mainLabel = screen.getByText("label");
    const hintText = screen.getByText("hint");
    const hrsLabel = screen.getByText("Hrs.");
    const minsLabel = screen.getByText("Mins.");

    expect(mainLabel).toHaveStyle({
      color: "var(--colorsUtilityYin030)",
    });
    expect(hintText).toHaveStyle({
      color: "var(--colorsUtilityYin030)",
    });
    expect(hrsLabel).toHaveStyle({
      color: "var(--colorsUtilityYin030)",
    });
    expect(minsLabel).toHaveStyle({
      color: "var(--colorsUtilityYin030)",
    });
  });

  it("should apply the expected styling when readOnly prop is set", () => {
    render(
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={() => {}}
        label="label"
        inputHint="hint"
        readOnly
      />
    );

    const hintText = screen.queryByText("hint");
    const hrsLabel = screen.queryByText("Hrs.");
    const minsLabel = screen.queryByText("Mins.");

    expect(hintText).toHaveStyle({
      color: "var(--colorsUtilityYin055)",
    });
    expect(hrsLabel).toHaveStyle({
      color: "var(--colorsUtilityYin055)",
    });
    expect(minsLabel).toHaveStyle({
      color: "var(--colorsUtilityYin055)",
    });
  });

  it("should have the expected `data-` attributes set on the root element", () => {
    render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        label="label"
        data-element="foo"
        data-role="bar"
      />
    );

    rootTagTestRtl(screen.getByRole("group"), "time", "foo", "bar");
  });

  it("should apply the custom `data-` attributes on the inputs when they are passed via `hoursInputProps` and `minutesInputProps`", () => {
    const { container } = render(
      <Time
        value={{ hours: "", minutes: "" }}
        onChange={() => {}}
        hoursInputProps={{ "data-element": "foo", "data-role": "bar" }}
        minutesInputProps={{ "data-element": "foo", "data-role": "bar" }}
      />
    );

    const hours = container.querySelector(
      '[data-component="hours"]'
    ) as HTMLElement;
    const minutes = container.querySelector(
      '[data-component="minutes"]'
    ) as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    rootTagTestRtl(hours!, "hours", "foo", "bar");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    rootTagTestRtl(minutes!, "minutes", "foo", "bar");
  });

  it("should apply the custom `data-` attributes on the toggle component elements when they are passed via `toggleProps`", () => {
    const { container } = render(
      <Time
        value={{ hours: "", minutes: "", period: "AM" }}
        onChange={() => {}}
        toggleProps={{
          wrapperProps: { "data-element": "foo", "data-role": "bar" },
          amToggleProps: { "data-element": "foo", "data-role": "bar" },
          pmToggleProps: { "data-element": "foo", "data-role": "bar" },
        }}
      />
    );

    const toggleGroup = container.querySelector(
      '[data-component="time-button-toggle-group"]'
    ) as HTMLElement;
    const amToggle = container.querySelector(
      '[data-component="am-button-toggle"]'
    ) as HTMLElement;
    const pmToggle = container.querySelector(
      '[data-component="pm-button-toggle"]'
    ) as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    rootTagTestRtl(toggleGroup!, "time-button-toggle-group", "foo", "bar");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    rootTagTestRtl(amToggle!, "am-button-toggle", "foo", "bar");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    rootTagTestRtl(pmToggle!, "pm-button-toggle", "foo", "bar");
  });
});

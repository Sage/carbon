import React, { useRef } from "react";
import { render, screen, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  testStyledSystemMargin,
  mockMatchMedia,
} from "../../__spec_helper__/__internal__/test-utils";

import NumeralDate from "./numeral-date.component";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Logger from "../../__internal__/utils/logger";
import Button from "../button";

jest.mock("../../__internal__/utils/logger");

testStyledSystemMargin(
  (props) => <NumeralDate data-role="numeral-date" {...props} />,
  () => screen.getByRole("group"),
);

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("should display deprecation warning once when used in an uncontrolled manner", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<NumeralDate />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Numeral Date` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );

  expect(loggerSpy).toHaveBeenCalledTimes(1);
  loggerSpy.mockClear();
});

test("should display an error when invalid `dateFormat` prop passed", () => {
  const consoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => undefined);
  const expected =
    "Forbidden prop dateFormat supplied to NumeralDate. " +
    "Only one of these date formats is allowed: " +
    "['dd', 'mm', 'yyyy'], ['mm', 'dd', 'yyyy'], ['yyyy', 'mm', 'dd'], ['dd', 'mm'], ['mm', 'dd'], ['mm', 'yyyy']";

  expect(() =>
    render(
      <NumeralDate
        // @ts-expect-error testing incorrect date format
        dateFormat={["xx"]}
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
      />,
    ),
  ).toThrow(expected);
  consoleSpy.mockReset();
});

test("should not throw an error if no `dateFormat` is passed", () => {
  const consoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => undefined);
  render(
    <NumeralDate value={{ dd: "", mm: "", yyyy: "" }} onChange={() => {}} />,
  );

  expect(consoleSpy).not.toHaveBeenCalled();
  consoleSpy.mockReset();
});

test("should throw when component changes from uncontrolled to controlled", () => {
  const consoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => undefined);
  const { rerender } = render(<NumeralDate value={undefined} />);
  expect(() => {
    rerender(<NumeralDate value={{ dd: "02", mm: "01", yyyy: "2020" }} />);
  }).toThrow(
    "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
      "Decide between using a controlled or uncontrolled input element for the lifetime of the component",
  );
  consoleSpy.mockReset();
});

test("should throw when component changes from controlled to uncontrolled", () => {
  const consoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => undefined);
  const { rerender } = render(
    <NumeralDate value={{ dd: "02", mm: "01", yyyy: "2020" }} />,
  );
  expect(() => {
    rerender(<NumeralDate value={undefined} />);
  }).toThrow(
    "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
      "Decide between using a controlled or uncontrolled input element for the lifetime of the component",
  );
  consoleSpy.mockReset();
});

describe("when the `error` prop is passed a string value and `validationRedesignOptIn` is not set", () => {
  it("should render with `aria-invalid` set to 'true'", () => {
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          error="error"
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });

    expect(dayInput).toBeInvalid();
    expect(monthInput).toBeInvalid();
    expect(yearInput).toBeInvalid();
  });

  it("should display the tooltip when the user hovers on the 'Day' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          error="error"
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    await user.hover(dayInput);

    expect(await screen.findByRole("tooltip", { name: "error" })).toBeVisible();
  });

  it("should display the tooltip when the user hovers on the 'Month' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          error="error"
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.hover(monthInput);

    expect(await screen.findByRole("tooltip", { name: "error" })).toBeVisible();
  });

  it("should display the tooltip when the user hovers on the 'Year' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          error="error"
        />
      </CarbonProvider>,
    );

    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.hover(yearInput);

    expect(await screen.findByRole("tooltip", { name: "error" })).toBeVisible();
  });

  // coverage
  it("should render error icon beside the legend if 'validationOnLabel' is set to true", () => {
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          error="error"
          label="label"
          validationOnLabel
        />
      </CarbonProvider>,
    );

    const icon = within(screen.getByTestId("legend")).getByTestId("icon-error");

    expect(icon).toBeVisible();
  });
});

describe("when the `error` prop is passed a boolean value and `validationRedesignOptIn` is not set", () => {
  it("should render with `aria-invalid` set to 'true'", () => {
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          error
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });

    expect(dayInput).toBeInvalid();
    expect(monthInput).toBeInvalid();
    expect(yearInput).toBeInvalid();
  });

  it("should not display the tooltip when the user hovers on the 'Day' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          error
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    await user.hover(dayInput);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("should not display the tooltip when the user hovers on the 'Month' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          error
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.hover(monthInput);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("should not display the tooltip when the user hovers on the 'Year' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          error
        />
      </CarbonProvider>,
    );

    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.hover(yearInput);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});

describe("when the `warning` prop is passed a string value and `validationRedesignOptIn` is not set", () => {
  it("should render with `aria-invalid` set to 'false'", () => {
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          warning="warning"
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
  });

  it("should display the tooltip when the user hovers on the 'Day' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          warning="warning"
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    await user.hover(dayInput);

    expect(
      await screen.findByRole("tooltip", { name: "warning" }),
    ).toBeVisible();
  });

  it("should display the tooltip when the user hovers on the 'Month' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          warning="warning"
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.hover(monthInput);

    expect(
      await screen.findByRole("tooltip", { name: "warning" }),
    ).toBeVisible();
  });

  it("should display the tooltip when the user hovers on the 'Year' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          warning="warning"
        />
      </CarbonProvider>,
    );

    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.hover(yearInput);

    expect(
      await screen.findByRole("tooltip", { name: "warning" }),
    ).toBeVisible();
  });
});

describe("when the `warning` prop is passed a boolean value and `validationRedesignOptIn` is not set", () => {
  it("should render with `aria-invalid` set to 'false'", () => {
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          warning
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
  });

  it("should not display the tooltip when the user hovers on the 'Day' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          warning
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    await user.hover(dayInput);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("should not display the tooltip when the user hovers on the 'Month' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          warning
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.hover(monthInput);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("should not display the tooltip when the user hovers on the 'Year' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          warning
        />
      </CarbonProvider>,
    );

    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.hover(yearInput);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});

describe("when the `info` prop is passed a string value and `validationRedesignOptIn` is not set", () => {
  it("should render with `aria-invalid` set to 'false'", () => {
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          info="info"
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
  });

  it("should display the tooltip when the user hovers on the 'Day' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          info="info"
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    await user.hover(dayInput);

    expect(await screen.findByRole("tooltip", { name: "info" })).toBeVisible();
  });

  it("should display the tooltip when the user hovers on the 'Month' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          info="info"
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.hover(monthInput);

    expect(await screen.findByRole("tooltip", { name: "info" })).toBeVisible();
  });

  it("should display the tooltip when the user hovers on the 'Year' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          info="info"
        />
      </CarbonProvider>,
    );

    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.hover(yearInput);

    expect(await screen.findByRole("tooltip", { name: "info" })).toBeVisible();
  });
});

describe("when the `info` prop is passed a boolean value and `validationRedesignOptIn` is not set", () => {
  it("should render with `aria-invalid` set to 'false'", () => {
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          info
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
  });

  it("should not display the tooltip when the user hovers on the 'Day' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          info
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    await user.hover(dayInput);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("should not display the tooltip when the user hovers on the 'Month' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          info
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.hover(monthInput);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("should not display the tooltip when the user hovers on the 'Year' input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <NumeralDate
          value={{ dd: "02", mm: "01", yyyy: "2020" }}
          onChange={() => {}}
          info
        />
      </CarbonProvider>,
    );

    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.hover(yearInput);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});

test("should render the validation message when the `error` prop is passed a string value and `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <NumeralDate
        value={{ dd: "02", mm: "01", yyyy: "2020" }}
        onChange={() => {}}
        error="error"
      />
    </CarbonProvider>,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  const yearInput = screen.getByRole("textbox", { name: "Year" });

  expect(dayInput).toBeInvalid();
  expect(monthInput).toBeInvalid();
  expect(yearInput).toBeInvalid();
  expect(screen.getByText("error")).toBeVisible();
});

test("should not render the validation message when the `error` prop is passed a boolean value and `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <NumeralDate
        value={{ dd: "02", mm: "01", yyyy: "2020" }}
        onChange={() => {}}
        error
      />
    </CarbonProvider>,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  const yearInput = screen.getByRole("textbox", { name: "Year" });

  expect(dayInput).toBeInvalid();
  expect(monthInput).toBeInvalid();
  expect(yearInput).toBeInvalid();
  expect(screen.queryByText("error")).not.toBeInTheDocument();
});

test("should render the validation message when `warning` prop is passed a string value and `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <NumeralDate
        value={{ dd: "02", mm: "01", yyyy: "2020" }}
        onChange={() => {}}
        warning="warning"
      />
    </CarbonProvider>,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  const yearInput = screen.getByRole("textbox", { name: "Year" });

  expect(dayInput).not.toBeInvalid();
  expect(monthInput).not.toBeInvalid();
  expect(yearInput).not.toBeInvalid();
  expect(screen.getByText("warning")).toBeVisible();
});

test("should not render the validation message when `warning` prop is passed a boolean value and `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <NumeralDate
        value={{ dd: "02", mm: "01", yyyy: "2020" }}
        onChange={() => {}}
        warning
      />
    </CarbonProvider>,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  const yearInput = screen.getByRole("textbox", { name: "Year" });

  expect(dayInput).not.toBeInvalid();
  expect(monthInput).not.toBeInvalid();
  expect(yearInput).not.toBeInvalid();
  expect(screen.queryByText("warning")).not.toBeInTheDocument();
});

test("should render the `labelHelp` text as additional content and not render the help icon or tooltip when `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <NumeralDate
        label="label"
        value={{ dd: "02", mm: "01", yyyy: "2020" }}
        onChange={() => {}}
        labelHelp="labelHelp"
      />
    </CarbonProvider>,
  );

  const labelHelpText = screen.getByText("labelHelp");

  expect(labelHelpText).toBeVisible();
  expect(
    screen.queryByRole("button", { name: "help" }),
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});

test("should have the default styling when the `labelsInline` prop is set and `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <NumeralDate
        label="label"
        value={{ dd: "02", mm: "01", yyyy: "2020" }}
        onChange={() => {}}
        labelHelp="labelHelp"
        labelInline
      />
    </CarbonProvider>,
  );

  const fields = screen.getAllByTestId("field-line");

  expect(fields[0]).toHaveStyle("display: block");
});

test("should render the help icon and tooltip when `labelHelp` prop is set and `validationRedesignOptIn` is not set", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <CarbonProvider>
      <NumeralDate
        label="label"
        value={{ dd: "02", mm: "01", yyyy: "2020" }}
        onChange={() => {}}
        labelHelp="labelHelp"
      />
    </CarbonProvider>,
  );

  const labelHelp = screen.getByRole("button", { name: "help" });
  await user.hover(labelHelp);

  expect(
    await screen.findByRole("tooltip", { name: "labelHelp" }),
  ).toBeVisible();
});

test("should render provided `fieldHelp` text when the `validationRedesignOptIn` is not set", () => {
  render(
    <CarbonProvider>
      <NumeralDate
        value={{ dd: "02", mm: "01", yyyy: "2020" }}
        onChange={() => {}}
        fieldHelp="fieldHelp"
      />
    </CarbonProvider>,
  );

  const fieldHelpText = screen.getByText("fieldHelp");
  const fieldset = screen.getByRole("group");

  expect(fieldHelpText).toBeVisible();
  expect(fieldset).toHaveAccessibleDescription("fieldHelp");
});

// coverage
test("should not render with `labelInline` when `adaptiveLabelBreakpoint` set and screen is smaller than the breakpoint", () => {
  mockMatchMedia(false);
  render(
    <CarbonProvider>
      <NumeralDate label="label" labelInline adaptiveLabelBreakpoint={1000} />
    </CarbonProvider>,
  );

  expect(screen.getByRole("group")).not.toHaveStyle({
    display: "flex",
    alignItems: "center",
  });
});

// coverage
test("should render with `labelInline` when `adaptiveLabelBreakpoint` set and screen is bigger than the breakpoint", () => {
  mockMatchMedia(true);
  render(
    <CarbonProvider>
      <NumeralDate label="label" labelInline adaptiveLabelBreakpoint={1000} />
    </CarbonProvider>,
  );

  expect(screen.getByTestId("legend")).toHaveStyle({
    float: "left",
    height: "65px",
  });
});

describe("when the `enableInternalError` prop is not set and `validationRedesignOptIn` is true", () => {
  it("should not render the validation message when the `Day` field is blurred and has a value greater than 31", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate value={{ dd: "", mm: "", yyyy: "" }} onChange={() => {}} />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });

    await user.type(dayInput, "32");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.queryByText("Day should be a number within a 1-31 range."),
    ).not.toBeInTheDocument();
  });

  it("should not render the validation message when the `Day` field is blurred and has a value less than 1", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate value={{ dd: "", mm: "", yyyy: "" }} onChange={() => {}} />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(dayInput, "0");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.queryByText("Day should be a number within a 1-31 range."),
    ).not.toBeInTheDocument();
  });

  it("should not render the validation message when the `Month` field is blurred and has a value greater than 12", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate value={{ dd: "", mm: "", yyyy: "" }} onChange={() => {}} />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "13");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.queryByText("Month should be a number within a 1-12 range."),
    ).not.toBeInTheDocument();
  });

  it("should not render the validation message when the `Month` field is blurred and has a value less than 1", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate value={{ dd: "", mm: "", yyyy: "" }} onChange={() => {}} />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "0");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.queryByText("Month should be a number within a 1-12 range."),
    ).not.toBeInTheDocument();
  });
});

describe("when the `enableInternalError` prop and `validationRedesignOptIn` are set", () => {
  it("should not render the validation message when the `Day` field is blurred and has a valid value", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    await user.type(dayInput, "31");
    await user.tab();

    expect(
      screen.queryByText("Day should be a number within a 1-31 range."),
    ).not.toBeInTheDocument();
  });

  it("should render the validation message when the user types a value in the `Day` field greater than 31 and tabs", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(dayInput, "32");
    await user.tab();

    expect(dayInput).toBeInvalid();
    expect(monthInput).toBeInvalid();
    expect(yearInput).toBeInvalid();
    expect(
      screen.getByText("Day should be a number within a 1-31 range."),
    ).toBeVisible();
  });

  it("should render the validation message when the user types a value in the `Day` field less than 1 and tabs", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(dayInput, "0");
    await user.tab();

    expect(dayInput).toBeInvalid();
    expect(monthInput).toBeInvalid();
    expect(yearInput).toBeInvalid();
    expect(
      screen.getByText("Day should be a number within a 1-31 range."),
    ).toBeVisible();
  });

  it("should render the validation message when the user types `02` in the `Month` field and tabs when the `Day` field has a value greater than 28", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "29", mm: "", yyyy: "2021" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "02");
    await user.tab();

    expect(dayInput).toBeInvalid();
    expect(monthInput).toBeInvalid();
    expect(yearInput).toBeInvalid();
    expect(
      screen.getByText("Day in February should be a number within 1-28."),
    ).toBeVisible();
  });

  it("should not render the validation message when the user types '02' in the `Month` field and tabs when the `Day` field has a valid value", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "29", mm: "", yyyy: "2020" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.type(monthInput, "02");
    await user.tab();

    expect(
      screen.queryByText("Day in February should be a number within 1-28."),
    ).not.toBeInTheDocument();
  });

  it("should use the current year and not render the validation message when the user types '02' in the `Month` field and tabs when the `Day` field has a valid value", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "28", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.type(monthInput, "02");
    await user.tab();

    expect(
      screen.queryByText("Day in February should be a number within 1-28."),
    ).not.toBeInTheDocument();
  });

  it("should render the validation message when the `Month` is blurred and has a value greater than 12", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "31", mm: "", yyyy: "2020" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "13");
    await user.tab();

    expect(dayInput).toBeInvalid();
    expect(monthInput).toBeInvalid();
    expect(yearInput).toBeInvalid();
    expect(
      screen.getByText("Month should be a number within a 1-12 range."),
    ).toBeVisible();
  });

  it("should render the validation message when the `Month` is blurred and has a value less than 1", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "31", mm: "", yyyy: "2020" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "0");
    await user.tab();

    expect(dayInput).toBeInvalid();
    expect(monthInput).toBeInvalid();
    expect(yearInput).toBeInvalid();
    expect(
      screen.getByText("Month should be a number within a 1-12 range."),
    ).toBeVisible();
  });

  it("should render the validation message when the `Year` is blurred and has a value less than 1800", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "31", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const yearInput = screen.getByRole("textbox", { name: "Year" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.type(yearInput, "1799");
    await user.tab();

    expect(dayInput).toBeInvalid();
    expect(monthInput).toBeInvalid();
    expect(yearInput).toBeInvalid();
    expect(
      screen.getByText("Year should be a number within a 1800-2200 range."),
    ).toBeVisible();
  });

  it("should render the validation message when the `Year` is blurred and has a value greater than 2200", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "31", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const yearInput = screen.getByRole("textbox", { name: "Year" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.type(yearInput, "2201");
    await user.tab();

    expect(dayInput).toBeInvalid();
    expect(monthInput).toBeInvalid();
    expect(yearInput).toBeInvalid();
    expect(
      screen.getByText("Year should be a number within a 1800-2200 range."),
    ).toBeVisible();
  });

  it("should render the appropriate validation message when the `Day` and `Month` fields are blurred and have values greater than the valid limits", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.type(dayInput, "32");
    await user.type(monthInput, "13");
    await user.tab();

    expect(
      screen.getByText(
        "Day should be a number within a 1-31 range. " +
          "Month should be a number within a 1-12 range.",
      ),
    ).toBeVisible();
  });

  it("should render the appropriate validation message when the `Day` and `Year` fields are blurred and have values greater than the valid limits", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(dayInput, "32");
    await user.type(yearInput, "2201");
    await user.tab();

    expect(
      screen.getByText(
        "Day should be a number within a 1-31 range. " +
          "Year should be a number within a 1800-2200 range.",
      ),
    ).toBeVisible();
  });

  it("should render the appropriate validation message when the `Month` and `Year` fields are blurred and have values greater than the valid limits", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "13");
    await user.type(yearInput, "2201");
    await user.tab();

    expect(
      screen.getByText(
        "Month should be a number within a 1-12 range. " +
          "Year should be a number within a 1800-2200 range.",
      ),
    ).toBeVisible();
  });

  it("should render the appropriate validation message when the `Day`, `Month`, and `Year` fields are blurred and have values greater than the valid limits", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalError
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(dayInput, "32");
    await user.type(monthInput, "13");
    await user.type(yearInput, "2201");
    await user.tab();

    expect(
      screen.getByText(
        "Day should be a number within a 1-31 range. " +
          "Month should be a number within a 1-12 range. " +
          "Year should be a number within a 1800-2200 range.",
      ),
    ).toBeVisible();
  });
});

describe("when the `enableInternalWarning` prop is not set and `validationRedesignOptIn` is true", () => {
  it("should not render the validation message when the `Day` field is blurred and has a value greater than 31", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate value={{ dd: "", mm: "", yyyy: "" }} onChange={() => {}} />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });

    await user.type(dayInput, "32");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.queryByText("Day should be a number within a 1-31 range."),
    ).not.toBeInTheDocument();
  });

  it("should not render the validation message when the `Day` field is blurred and has a value less than 1", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate value={{ dd: "", mm: "", yyyy: "" }} onChange={() => {}} />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(dayInput, "0");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.queryByText("Day should be a number within a 1-31 range."),
    ).not.toBeInTheDocument();
  });

  it("should not render the validation message when the `Month` field is blurred and has a value greater than 12", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate value={{ dd: "", mm: "", yyyy: "" }} onChange={() => {}} />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "13");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.queryByText("Month should be a number within a 1-12 range."),
    ).not.toBeInTheDocument();
  });

  it("should not render the validation message when the `Month` field is blurred and has a value less than 1", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate value={{ dd: "", mm: "", yyyy: "" }} onChange={() => {}} />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "0");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.queryByText("Month should be a number within a 1-12 range."),
    ).not.toBeInTheDocument();
  });
});

describe("when the `enableInternalWarning` prop and `validationRedesignOptIn` are set", () => {
  it("should not render the validation message when the `Day` field is blurred and has a valid value", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    await user.type(dayInput, "31");
    await user.tab();

    expect(
      screen.queryByText("Day should be a number within a 1-31 range."),
    ).not.toBeInTheDocument();
  });

  it("should render the validation message when the user types a value in the `Day` field greater than 31 and tabs", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(dayInput, "32");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.getByText("Day should be a number within a 1-31 range."),
    ).toBeVisible();
  });

  it("should render the validation message when the user types a value in the `Day` field less than 1 and tabs", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(dayInput, "0");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.getByText("Day should be a number within a 1-31 range."),
    ).toBeVisible();
  });

  it("should render the validation message when the user types `02` in the `Month` field and tabs when the `Day` field has a value greater than 28", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "29", mm: "", yyyy: "2021" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "02");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.getByText("Day in February should be a number within 1-28."),
    ).toBeVisible();
  });

  it("should not render the validation message when the user types '02' in the `Month` field and tabs when the `Day` field has a valid value", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "29", mm: "", yyyy: "2020" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.type(monthInput, "02");
    await user.tab();

    expect(
      screen.queryByText("Day in February should be a number within 1-28."),
    ).not.toBeInTheDocument();
  });

  it("should render the validation message when the `Month` is blurred and has a value greater than 12", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "31", mm: "", yyyy: "2020" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "13");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.getByText("Month should be a number within a 1-12 range."),
    ).toBeVisible();
  });

  it("should render the validation message when the `Month` is blurred and has a value less than 1", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "31", mm: "", yyyy: "2020" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "0");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.getByText("Month should be a number within a 1-12 range."),
    ).toBeVisible();
  });

  it("should render the validation message when the `Year` is blurred and has a value less than 1800", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "31", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const yearInput = screen.getByRole("textbox", { name: "Year" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.type(yearInput, "1799");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.getByText("Year should be a number within a 1800-2200 range."),
    ).toBeVisible();
  });

  it("should render the validation message when the `Year` is blurred and has a value greater than 2200", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "31", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const yearInput = screen.getByRole("textbox", { name: "Year" });
    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.type(yearInput, "2201");
    await user.tab();

    expect(dayInput).not.toBeInvalid();
    expect(monthInput).not.toBeInvalid();
    expect(yearInput).not.toBeInvalid();
    expect(
      screen.getByText("Year should be a number within a 1800-2200 range."),
    ).toBeVisible();
  });

  it("should render the appropriate validation message when the `Day` and `Month` fields are blurred and have values greater than the valid limits", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    await user.type(dayInput, "32");
    await user.type(monthInput, "13");
    await user.tab();

    expect(
      screen.getByText(
        "Day should be a number within a 1-31 range. " +
          "Month should be a number within a 1-12 range.",
      ),
    ).toBeVisible();
  });

  it("should render the appropriate validation message when the `Day` and `Year` fields are blurred and have values greater than the valid limits", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(dayInput, "32");
    await user.type(yearInput, "2201");
    await user.tab();

    expect(
      screen.getByText(
        "Day should be a number within a 1-31 range. " +
          "Year should be a number within a 1800-2200 range.",
      ),
    ).toBeVisible();
  });

  it("should render the appropriate validation message when the `Month` and `Year` fields are blurred and have values greater than the valid limits", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(monthInput, "13");
    await user.type(yearInput, "2201");
    await user.tab();

    expect(
      screen.getByText(
        "Month should be a number within a 1-12 range. " +
          "Year should be a number within a 1800-2200 range.",
      ),
    ).toBeVisible();
  });

  it("should render the appropriate validation message when the `Day`, `Month`, and `Year` fields are blurred and have values greater than the valid limits", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          enableInternalWarning
        />
      </CarbonProvider>,
    );

    const dayInput = screen.getByRole("textbox", { name: "Day" });
    const monthInput = screen.getByRole("textbox", { name: "Month" });
    const yearInput = screen.getByRole("textbox", { name: "Year" });
    await user.type(dayInput, "32");
    await user.type(monthInput, "13");
    await user.type(yearInput, "2201");
    await user.tab();

    expect(
      screen.getByText(
        "Day should be a number within a 1-31 range. " +
          "Month should be a number within a 1-12 range. " +
          "Year should be a number within a 1800-2200 range.",
      ),
    ).toBeVisible();
  });
});

test("should submit the form when enter key is pressed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onSubmit = jest.fn();
  render(
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit(ev);
      }}
    >
      <NumeralDate
        value={{ dd: "11", mm: "11", yyyy: "2011" }}
        onChange={() => {}}
      />
      <button type="submit">Submit</button>
    </form>,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  await user.type(dayInput, "{enter}");

  expect(onSubmit).toHaveBeenCalled();
});

test("should update the input values when the delete key is pressed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <NumeralDate
      value={{ dd: "11", mm: "11", yyyy: "2011" }}
      onChange={() => {}}
    />,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  const yearInput = screen.getByRole("textbox", { name: "Year" });
  await user.type(dayInput, "{delete}");
  await user.type(monthInput, "{delete}");
  await user.type(yearInput, "{delete}");

  expect(dayInput).toHaveValue("");
  expect(monthInput).toHaveValue("");
  expect(yearInput).toHaveValue("");
});

test("should update the input values when the backspace key is pressed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <NumeralDate
      value={{ dd: "11", mm: "11", yyyy: "2011" }}
      onChange={() => {}}
    />,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  const yearInput = screen.getByRole("textbox", { name: "Year" });
  await user.type(dayInput, "{backspace}");
  await user.type(monthInput, "{backspace}");
  await user.type(yearInput, "{backspace}");

  expect(dayInput).toHaveValue("");
  expect(monthInput).toHaveValue("");
  expect(yearInput).toHaveValue("");
});

test("should not update the input values when user presses non-numeric key", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <NumeralDate value={{ dd: "", mm: "", yyyy: "" }} onChange={() => {}} />,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  const yearInput = screen.getByRole("textbox", { name: "Year" });
  await user.type(dayInput, "{a}");
  await user.type(monthInput, "{b}");
  await user.type(yearInput, "{c}");

  expect(dayInput).toHaveValue("");
  expect(monthInput).toHaveValue("");
  expect(yearInput).toHaveValue("");
});

test("should set the attribute on each input when the `required` prop is set", () => {
  render(
    <NumeralDate
      value={{ dd: "", mm: "", yyyy: "" }}
      onChange={() => {}}
      required
    />,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  const yearInput = screen.getByRole("textbox", { name: "Year" });

  expect(dayInput).toBeRequired();
  expect(monthInput).toBeRequired();
  expect(yearInput).toBeRequired();
});

test("should render the expected inputs when the `dateFormat` is set as 'mmddyyyy'", () => {
  render(
    <NumeralDate
      value={{ dd: "", mm: "", yyyy: "" }}
      onChange={() => {}}
      dateFormat={["mm", "dd", "yyyy"]}
    />,
  );

  const inputs = screen.getAllByRole("textbox");

  expect(inputs[0]).toHaveAccessibleName("Month");
  expect(inputs[1]).toHaveAccessibleName("Day");
  expect(inputs[2]).toHaveAccessibleName("Year");
});

test("should render the expected inputs when the `dateFormat` is set as 'yyyymmdd'", () => {
  render(
    <NumeralDate
      value={{ dd: "", mm: "", yyyy: "" }}
      onChange={() => {}}
      dateFormat={["yyyy", "mm", "dd"]}
    />,
  );

  const inputs = screen.getAllByRole("textbox");

  expect(inputs[0]).toHaveAccessibleName("Year");
  expect(inputs[1]).toHaveAccessibleName("Month");
  expect(inputs[2]).toHaveAccessibleName("Day");
});

test("should render the expected inputs when the `dateFormat` is set as 'ddmm'", () => {
  render(
    <NumeralDate
      value={{ dd: "", mm: "" }}
      onChange={() => {}}
      dateFormat={["dd", "mm"]}
    />,
  );

  const inputs = screen.getAllByRole("textbox");

  expect(inputs).toHaveLength(2);
  expect(inputs[0]).toHaveAccessibleName("Day");
  expect(inputs[1]).toHaveAccessibleName("Month");
});

test("should render the expected inputs when the `dateFormat` is set as 'mmdd'", () => {
  render(
    <NumeralDate
      value={{ dd: "", mm: "" }}
      onChange={() => {}}
      dateFormat={["mm", "dd"]}
    />,
  );

  const inputs = screen.getAllByRole("textbox");

  expect(inputs).toHaveLength(2);
  expect(inputs[0]).toHaveAccessibleName("Month");
  expect(inputs[1]).toHaveAccessibleName("Day");
});

test("should render the expected inputs when the `dateFormat` is set as 'mmyyyy'", () => {
  render(
    <NumeralDate
      value={{ dd: "", mm: "" }}
      onChange={() => {}}
      dateFormat={["mm", "yyyy"]}
    />,
  );

  const inputs = screen.getAllByRole("textbox");

  expect(inputs).toHaveLength(2);
  expect(inputs[0]).toHaveAccessibleName("Month");
  expect(inputs[1]).toHaveAccessibleName("Year");
});

test("should call `onBlur` callback if prop is passed and user clicks outside of inputs", async () => {
  const onBlur = jest.fn();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <NumeralDate
      value={{ dd: "", mm: "", yyyy: "" }}
      onChange={() => {}}
      onBlur={onBlur}
    />,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  await user.click(dayInput);
  await user.click(document.body);

  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(onBlur).toHaveBeenCalled();
});

test("should not call `onBlur` callback if prop is passed and user clicks from one input to another", async () => {
  const onBlur = jest.fn();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <NumeralDate
      value={{ dd: "", mm: "", yyyy: "" }}
      onChange={() => {}}
      onBlur={onBlur}
    />,
  );

  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  await user.click(dayInput);
  await user.click(monthInput);

  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(onBlur).not.toHaveBeenCalled();
});

describe("when `dayRef` prop is passed", () => {
  it("should be passed down to the `Day` input when it is as an object", () => {
    const ref = { current: null };
    render(
      <NumeralDate
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
        dayRef={ref}
      />,
    );

    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Day" }));
  });

  it("should be passed down to the `Day` input when it is as a callback", () => {
    const ref = jest.fn();
    render(
      <NumeralDate
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
        dayRef={ref}
      />,
    );

    expect(ref).toHaveBeenCalledWith(
      screen.getByRole("textbox", { name: "Day" }),
    );
  });

  it("should set to empty after unmount", () => {
    const ref = { current: null };
    const { unmount } = render(
      <NumeralDate
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
        dayRef={ref}
      />,
    );

    unmount();

    expect(ref.current).toBe(null);
  });
});

describe("when `monthRef` prop is passed", () => {
  it("should be passed down to the `Month` input when it is as an object", () => {
    const ref = { current: null };
    render(
      <NumeralDate
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
        monthRef={ref}
      />,
    );

    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Month" }));
  });

  it("should be passed down to the `Month` input when it is as a callback", () => {
    const ref = jest.fn();
    render(
      <NumeralDate
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
        monthRef={ref}
      />,
    );

    expect(ref).toHaveBeenCalledWith(
      screen.getByRole("textbox", { name: "Month" }),
    );
  });

  it("should set to empty after unmount", () => {
    const ref = { current: null };
    const { unmount } = render(
      <NumeralDate
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
        monthRef={ref}
      />,
    );

    unmount();

    expect(ref.current).toBe(null);
  });
});

describe("when `yearRef` prop is passed", () => {
  it("should be passed down to the `Year` input when it is as an object", () => {
    const ref = { current: null };
    render(
      <NumeralDate
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
        yearRef={ref}
      />,
    );

    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Year" }));
  });

  it("should be passed down to the `Year` input when it is as a callback", () => {
    const ref = jest.fn();
    render(
      <NumeralDate
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
        yearRef={ref}
      />,
    );

    expect(ref).toHaveBeenCalledWith(
      screen.getByRole("textbox", { name: "Year" }),
    );
  });

  it("should set to empty after unmount", () => {
    const ref = { current: null };
    const { unmount } = render(
      <NumeralDate
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
        yearRef={ref}
      />,
    );

    unmount();

    expect(ref.current).toBe(null);
  });
});

test("should not call the onChange callback when the prop is set and the user types a value that exceeds the 'Day' input limit", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <NumeralDate value={{ dd: "12", mm: "", yyyy: "" }} onChange={onChange} />,
  );
  const dayInput = screen.getByRole("textbox", { name: "Day" });
  await user.click(dayInput);
  await user.keyboard("{End}");
  await user.type(dayInput, "3");

  expect(onChange).not.toHaveBeenCalled();
});

test("should not call the onChange callback when the prop is set and the user types a value that exceeds the 'Month' input limit", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <NumeralDate value={{ dd: "", mm: "12", yyyy: "" }} onChange={onChange} />,
  );
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  await user.click(monthInput);
  await user.keyboard("{End}");
  await user.type(monthInput, "3");

  expect(onChange).not.toHaveBeenCalled();
});

test("should not call the onChange callback when the prop is set and the user types a value that exceeds the 'Year' input limit", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <NumeralDate
      value={{ dd: "", mm: "", yyyy: "2011" }}
      onChange={onChange}
    />,
  );
  const yearInput = screen.getByRole("textbox", { name: "Year" });
  await user.click(yearInput);
  await user.keyboard("{End}");
  await user.type(yearInput, "3");

  expect(onChange).not.toHaveBeenCalled();
});

test("should set the passed `data-` props as attributes on the root element", () => {
  render(
    <NumeralDate
      value={{ dd: "", mm: "", yyyy: "" }}
      onChange={() => {}}
      data-element="numeral-date-element"
      data-role="numeral-date-role"
    />,
  );
  const rootElement = screen.getByTestId("numeral-date-role");

  expect(rootElement).toHaveAttribute("data-element", "numeral-date-element");
});

test("should pass the `helpAriaLabel` prop as `aria-label` attribute on the help component", () => {
  render(
    <NumeralDate
      label="label"
      value={{ dd: "02", mm: "01", yyyy: "2020" }}
      onChange={() => {}}
      labelHelp="labelHelp"
      helpAriaLabel="help aria"
    />,
  );
  const helpElement = screen.getByRole("button", { name: "help aria" });

  expect(helpElement).toBeVisible();
});

test("should set the inputs to `disabled` when the prop is passed", () => {
  render(
    <NumeralDate
      value={{ dd: "", mm: "", yyyy: "" }}
      onChange={() => {}}
      disabled
    />,
  );
  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  const yearInput = screen.getByRole("textbox", { name: "Year" });

  expect(dayInput).toBeDisabled();
  expect(monthInput).toBeDisabled();
  expect(yearInput).toBeDisabled();
});

test("should set the inputs to `readOnly` when the prop is passed", () => {
  render(
    <NumeralDate
      value={{ dd: "", mm: "", yyyy: "" }}
      onChange={() => {}}
      readOnly
    />,
  );
  const dayInput = screen.getByRole("textbox", { name: "Day" });
  const monthInput = screen.getByRole("textbox", { name: "Month" });
  const yearInput = screen.getByRole("textbox", { name: "Year" });

  expect(dayInput).toHaveAttribute("readonly");
  expect(monthInput).toHaveAttribute("readonly");
  expect(yearInput).toHaveAttribute("readonly");
});

test.each(["error", "warning", "info"])(
  "should render with expected accessible description when '%s' and 'fieldHelp' props are passed and 'validationRedesignOptIn' is false",
  (validation) => {
    render(
      <NumeralDate
        value={{ dd: "", mm: "", yyyy: "" }}
        onChange={() => {}}
        label="label"
        fieldHelp="fieldHelp"
        validationOnLabel
        {...{ [validation]: "Message" }}
      />,
    );

    const fieldset = screen.getByRole("group", { name: "label" });
    expect(fieldset).toHaveAccessibleDescription("fieldHelp Message");
  },
);

test.each(["error", "warning"])(
  "should render with expected accessible description when '%s' and 'labelHelp' props are passed and 'validationRedesignOptIn' is true",
  (validation) => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          value={{ dd: "", mm: "", yyyy: "" }}
          onChange={() => {}}
          labelHelp="labelHelp"
          {...{ [validation]: "Message" }}
        />
      </CarbonProvider>,
    );

    const fieldset = screen.getByRole("group");
    expect(fieldset).toHaveAccessibleDescription("Message labelHelp");
  },
);

test("should focus the first textbox when the component is programmatically focused when the date format is dd/mm/yyyy", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const MockComponent = () => {
    const ndRef = useRef<HTMLInputElement>(null);
    return (
      <>
        <Button onClick={() => ndRef.current?.focus()}>Click me</Button>
        <NumeralDate
          ref={ndRef}
          onChange={() => {}}
          label="Numeral date"
          value={{ dd: "", mm: "", yyyy: "" }}
          name="numeralDate_name"
          id="numeralDate_id"
        />
      </>
    );
  };

  render(<MockComponent />);

  const button = screen.getByRole("button", { name: "Click me" });
  const firstInput = screen.getByRole("textbox", { name: "Day" });

  await user.click(button);

  expect(firstInput).toHaveFocus();
});

test("should focus the first textbox when the component is programmatically focused when the date format is mm/yyyy", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const MockComponent = () => {
    const ndRef = useRef<HTMLInputElement>(null);
    return (
      <>
        <Button onClick={() => ndRef.current?.focus()}>Click me</Button>
        <NumeralDate
          ref={ndRef}
          dateFormat={["mm", "yyyy"]}
          onChange={() => {}}
          label="Numeral date"
          value={{ mm: "", yyyy: "" }}
          name="numeralDate_name"
          id="numeralDate_id"
        />
      </>
    );
  };

  render(<MockComponent />);

  const button = screen.getByRole("button", { name: "Click me" });
  const firstInput = screen.getByRole("textbox", { name: "Month" });

  await user.click(button);

  expect(firstInput).toHaveFocus();
});

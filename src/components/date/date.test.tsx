import React, { useState } from "react";
import { screen, within, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { enGB as enGBLocale } from "date-fns/locale/en-GB";
import { de as deLocale } from "date-fns/locale/de";
import { es as esLocale } from "date-fns/locale/es";
import { enCA as enCALocale } from "date-fns/locale/en-CA";
import { enZA as enZALocale } from "date-fns/locale/en-ZA";
import { fr as frLocale } from "date-fns/locale/fr";
import { frCA as frCALocale } from "date-fns/locale/fr-CA";
import { enUS as enUSLocale } from "date-fns/locale/en-US";
import {
  render,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";

import CarbonProvider from "../carbon-provider";
import DateInput, { DateChangeEvent } from "./date.component";
import I18nProvider from "../i18n-provider";

const ariaLabels = {
  nextMonthButton: () => "foo",
  previousMonthButton: () => "foo",
};

testStyledSystemMargin(
  (props) => <DateInput onChange={() => {}} value="" {...props} />,
  () => screen.getAllByRole("presentation")[0],
);

const VALID_INPUT_STRINGS = [
  "040419",
  "04042019",
  "04 04 19",
  "04 04 2019",
  "04.04.19",
  "04.04.2019",
  "04-04-19",
  "04-04-2019",
  "04/04/19",
  "04/04/2019",
];

type OnChangeEventValues = (value: {
  formattedValue: string;
  rawValue: string | null;
}) => void;

const MockComponent = ({
  onChange,
  allowEmptyValue,
  initialValue,
}: {
  onChange?: OnChangeEventValues;
  allowEmptyValue?: boolean;
  initialValue: string;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <DateInput
      label="label"
      onChange={(ev: DateChangeEvent) => {
        setValue(ev.target.value.formattedValue);
        onChange?.(ev.target.value);
      }}
      value={value}
      allowEmptyValue={allowEmptyValue}
    />
  );
};

// temporarily running timers on every spec as we have issues
// around how slow the tests that open the calendar are.
// FE-6724 raised to investigate and implement a better solution
beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test("should render the presentation element with expected width when no `size` prop is passed", () => {
  render(<DateInput label="label" onChange={() => {}} value="" />);
  const presentation = screen.getAllByRole("presentation")[1];

  expect(presentation).toHaveStyle({ width: "135px" });
});

test("should render the presentation element with expected width when `size` is 'small'", () => {
  render(<DateInput label="label" size="small" onChange={() => {}} value="" />);
  const presentation = screen.getAllByRole("presentation")[1];

  expect(presentation).toHaveStyle({ width: "120px" });
});

test("should render the presentation element with expected width when `size` is 'medium'", () => {
  render(
    <DateInput label="label" size="medium" onChange={() => {}} value="" />,
  );
  const presentation = screen.getAllByRole("presentation")[1];

  expect(presentation).toHaveStyle({ width: "135px" });
});

test("should render the presentation element with expected width when `size` is 'large'", () => {
  render(<DateInput label="label" size="large" onChange={() => {}} value="" />);
  const presentation = screen.getAllByRole("presentation")[1];

  expect(presentation).toHaveStyle({ width: "140px" });
});

test("should set 100% width on the presentation element when `inputWidth` is passed", () => {
  render(
    <DateInput
      label="label"
      inputWidth={50}
      onChange={() => {}}
      value=""
      labelInline
    />,
  );
  const presentation = screen.getAllByRole("presentation")[1];

  expect(presentation).toHaveStyle("width: 100%");
});

test("should set 100% width on the presentation element when `maxWidth` is passed", () => {
  render(
    <DateInput label="label" maxWidth="200px" onChange={() => {}} value="" />,
  );
  const presentation = screen.getAllByRole("presentation")[1];

  expect(presentation).toHaveStyle("width: 100%");
});

test("should accept ref as an object and pass it to the input", () => {
  const ref = { current: null };
  render(<DateInput label="label" ref={ref} onChange={() => {}} value="" />);

  expect(ref.current).toBe(screen.getByRole("textbox"));
});

test("should accept ref as a callback and pass it to the input", () => {
  const ref = jest.fn();
  render(<DateInput label="label" ref={ref} onChange={() => {}} value="" />);

  expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
});

test("should set ref to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(
    <DateInput label="label" ref={ref} onChange={() => {}} value="" />,
  );
  unmount();

  expect(ref.current).toBe(null);
});

test("should render with provided data- attributes", () => {
  render(
    <DateInput
      data-element="bar"
      data-role="baz"
      onChange={() => {}}
      value=""
    />,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

test("should render with the input focused and picker visible when `autoFocus` is true", () => {
  render(<DateInput label="label" autoFocus onChange={() => {}} value="" />);

  expect(screen.getByRole("textbox")).toHaveFocus();
  expect(screen.getByRole("grid")).toBeVisible();
});

test("should not render with the input focused or the picker visible when `autoFocus` is false", () => {
  render(
    <DateInput label="label" autoFocus={false} onChange={() => {}} value="" />,
  );

  expect(screen.getByRole("textbox")).not.toHaveFocus();
  expect(screen.queryByRole("grid")).not.toBeInTheDocument();
});

test("should open the picker and call the `onFocus` callback if one passed when the input is focused by the user", () => {
  const onFocus = jest.fn();
  render(
    <DateInput label="label" onChange={() => {}} value="" onFocus={onFocus} />,
  );
  const input = screen.getByRole("textbox");
  act(() => {
    input.focus();
  });

  expect(screen.getByRole("grid")).toBeVisible();
  expect(onFocus).toHaveBeenCalled();
});

test("should open the picker and call the `onClick` and `onFocus` callbacks if passed when the user clicks on the input", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onFocus = jest.fn();
  const onClick = jest.fn();
  render(
    <DateInput
      label="label"
      onChange={() => {}}
      value=""
      onFocus={onFocus}
      onClick={onClick}
    />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);

  expect(screen.getByRole("grid")).toBeVisible();
  expect(onFocus).toHaveBeenCalled();
  expect(onClick).toHaveBeenCalled();
});

test("should open the picker and call the `onClick` callback if passed when the user clicks on the input icon", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onClick = jest.fn();
  render(
    <DateInput label="label" onChange={() => {}} value="" onClick={onClick} />,
  );
  const icon = screen.getByTestId("icon");
  await user.click(icon);

  expect(screen.getByRole("grid")).toBeVisible();
  expect(onClick).toHaveBeenCalled();
});

test("picker closes when input icon is double clicked", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput label="label" onChange={() => {}} value="" />);

  const icon = screen.getByTestId("input-icon-toggle");
  await user.dblClick(icon);

  await waitFor(() =>
    expect(screen.queryByRole("grid")).not.toBeInTheDocument(),
  );
});

test("picker does not close when input icon is double clicked", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput label="label" onChange={() => {}} value="" />);

  await user.dblClick(screen.getByRole("textbox"));

  expect(screen.getByRole("grid")).toBeVisible();
});

test("should not trigger a focus event when the user clicks on the input and `disabled` prop is set", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onFocus = jest.fn();
  render(
    <DateInput
      label="label"
      onChange={() => {}}
      value=""
      disabled
      onFocus={onFocus}
    />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);

  expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  expect(onFocus).not.toHaveBeenCalled();
});

test("should not trigger a focus event when the user clicks on the input and `readOnly` prop is set", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onFocus = jest.fn();
  render(
    <DateInput
      label="label"
      onChange={() => {}}
      value=""
      readOnly
      onFocus={onFocus}
    />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);

  expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  expect(onFocus).not.toHaveBeenCalled();
});

test("should call `onBlur` and `onChange` callbacks when the user clicks away from the input and the value is a valid format", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onBlur = jest.fn();
  const onChange = jest.fn();
  render(
    <DateInput
      label="label"
      onChange={onChange}
      onBlur={onBlur}
      value="010122"
    />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.click(document.body);

  expect(onBlur).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalled();
});

test("should call `onBlur` but not `onChange` callbacks when the user clicks away from the input and the value is not a valid format", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onBlur = jest.fn();
  const onChange = jest.fn();
  render(
    <DateInput label="label" onChange={onChange} onBlur={onBlur} value="foo" />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.click(document.body);

  expect(onBlur).toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});

test("should call `onBlur` but not `onChange` callbacks when the user clicks away from the input and the value has not been updated since initial render", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onBlur = jest.fn();
  const onChange = jest.fn();
  render(
    <DateInput
      label="label"
      onChange={onChange}
      onBlur={onBlur}
      value="2022-01-01"
    />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.click(document.body);

  expect(onBlur).toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});

test("should not call `onBlur` or `onChange` callbacks when user clicks away from the input and the `readOnly` prop is set", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onBlur = jest.fn();
  const onChange = jest.fn();
  render(
    <DateInput
      label="label"
      onChange={onChange}
      onBlur={onBlur}
      value=""
      readOnly
    />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.click(document.body);

  expect(onBlur).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});

test("should not call `onBlur` when the user clicks on the input and then the input icon", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onBlur = jest.fn();
  render(
    <DateInput label="label" onChange={() => {}} onBlur={onBlur} value="" />,
  );
  const input = screen.getByRole("textbox");
  const icon = screen.getByTestId("input-icon-toggle");
  await user.click(input);
  await user.click(icon);

  expect(onBlur).not.toHaveBeenCalled();
});

test("should call `onChange` callback with expected values when user clicks away from the input and the value has a year with two digits between '69' and '99'", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(<MockComponent onChange={onChange} initialValue="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.type(input, "12.12.69");
  await user.click(document.body);

  expect(onChange).toHaveBeenCalledWith({
    formattedValue: "12/12/1969",
    rawValue: "1969-12-12",
  });
  expect(screen.getByRole("textbox")).toHaveValue("12/12/1969");
});

test("should call `onChange` callback with expected values when user clicks away from the input and the value has a year with two digits not between '69' and '99'", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(<MockComponent onChange={onChange} initialValue="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.type(input, "12.12.20");
  await user.click(document.body);

  expect(onChange).toHaveBeenCalledWith({
    formattedValue: "12/12/2020",
    rawValue: "2020-12-12",
  });
  expect(screen.getByRole("textbox")).toHaveValue("12/12/2020");
});

test("should call `onChange` callback with expected values when user clicks away from the input and the value has a year of '00'", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(<MockComponent onChange={onChange} initialValue="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.type(input, "12.12.00");
  await user.click(document.body);

  expect(onChange).toHaveBeenCalledWith({
    formattedValue: "12/12/2000",
    rawValue: "2000-12-12",
  });
  expect(screen.getByRole("textbox")).toHaveValue("12/12/2000");
});

test("should call `onChange` callback when user clears the input and clicks away with `allowEmptyValue` prop set", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <MockComponent
      onChange={onChange}
      initialValue="04/04/2019"
      allowEmptyValue
    />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.clear(input);
  await user.click(document.body);

  expect(onChange).toHaveBeenCalledWith({
    formattedValue: "",
    rawValue: "",
  });
  expect(screen.getByRole("textbox")).toHaveValue("");
});

test("should not close the picker or call the `onChange` and `onBlur` callbacks when the user clicks inside of the picker but not on a day element", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  const onBlur = jest.fn();
  render(<DateInput onChange={onChange} onBlur={onBlur} value="04/04/2019" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  const picker = screen.getByRole("grid");
  await user.click(picker);

  expect(picker).toBeVisible();
  expect(onChange).not.toHaveBeenCalled();
  expect(onBlur).not.toHaveBeenCalled();
});

test("should not close the picker or call the `onChange` and `onBlur` callbacks when the user clicks on a disabled day", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <DateInput
      onChange={onChange}
      value="04/04/2019"
      minDate="2019-04-04"
      maxDate="2019-05-31"
    />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);

  await user.click(screen.getByLabelText("Wednesday, April 3rd, 2019"));

  expect(screen.queryByRole("grid")).toBeVisible();
  expect(onChange).not.toHaveBeenCalled();
});

test("should close the open picker when a user presses the 'Escape' key", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput onChange={() => {}} value="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.keyboard("{Escape}");

  expect(screen.queryByRole("grid")).not.toBeInTheDocument();
});

test("should close the open picker when the user presses the 'Escape' key and focus is within the picker", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput onChange={() => {}} value="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.tab();
  await user.keyboard("{Escape}");

  expect(screen.queryByRole("grid")).not.toBeInTheDocument();
});

test("should call `onKeyDown` callback when the user types and the input is focused", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onKeyDown = jest.fn();
  render(<DateInput onChange={() => {}} value="" onKeyDown={onKeyDown} />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.type(input, "12");

  expect(onKeyDown).toHaveBeenCalledTimes(2);
});

test("should keep the picker open and move focus to the previous month button when the user presses tab and the input is focused", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput onChange={() => {}} value="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.tab();

  expect(screen.getByRole("grid")).toBeVisible();
  expect(screen.getByRole("button", { name: "Previous month" })).toHaveFocus();
});

test("should keep the picker open and move focus to the previous month button when the user presses tab and the input is focused and `disablePortal` is set", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput onChange={() => {}} value="" disablePortal />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.tab();

  expect(screen.getByRole("grid")).toBeVisible();
  expect(screen.getByRole("button", { name: "Previous month" })).toHaveFocus();
});

test("should close the picker when the user presses shift + tab and the input is focused and the picker is open", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput onChange={() => {}} value="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);

  expect(screen.getByRole("grid")).toBeVisible();
  await user.tab({ shift: true });
  expect(screen.queryByRole("grid")).not.toBeInTheDocument();
});

test("should close the picker when the user presses shift + tab and the previous month button is focused", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput onChange={() => {}} value="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.tab();

  expect(screen.getByRole("button", { name: "Previous month" })).toHaveFocus();
  await user.tab({ shift: true });
  expect(screen.queryByRole("grid")).not.toBeInTheDocument();
});

test("should not close the picker when the user presses shift + tab and neither the input or previous month button are focused", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput onChange={() => {}} value="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.tab();
  await user.tab();

  expect(screen.getByRole("button", { name: "Next month" })).toHaveFocus();
  await user.tab({ shift: true });
  expect(screen.getByRole("grid")).toBeVisible();
});

test("should focus the next button and then the selected day element when the user presses tab and close the picker with a subsequent tab press", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput onChange={() => {}} value="04/04/2019" />);

  const input = screen.getByRole("textbox");
  await user.click(input);

  const previousMonthButton = await screen.findByRole("button", {
    name: "Previous month",
  });
  await user.tab();

  expect(previousMonthButton).toHaveFocus();

  await user.tab();

  expect(screen.getByRole("button", { name: "Next month" })).toHaveFocus();

  await user.tab();

  expect(
    screen.getByLabelText("Thursday, April 4th, 2019", { exact: false }),
  ).toHaveFocus();

  await user.tab();

  await waitFor(() => {
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });
});

test("should close the picker, update the value and refocus the input element when the user clicks a day element", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<MockComponent initialValue="04/04/2019" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.click(screen.getByLabelText("Thursday, April 11th, 2019"));

  expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  await waitFor(() => {
    expect(input).toHaveFocus();
  });
  expect(input).toHaveValue("11/04/2019");
});

test("should render the help icon when the `labelHelp` prop is passed and display tooltip when user hovers mouse over icon", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <DateInput
      label="label"
      onChange={() => {}}
      value=""
      labelHelp="help text"
    />,
  );
  const helpIcon = screen.getByRole("button", { name: "help" });
  await user.hover(helpIcon);

  expect(screen.getByRole("tooltip")).toHaveTextContent("help text");
});

test("should render the input with the expected required attribute when the `required` prop is true", () => {
  render(<DateInput label="label" onChange={() => {}} value="" required />);
  const input = screen.getByRole("textbox");

  expect(input).toBeRequired();
});

test("should render the picker as a descendant of the main presentation element when `disablePortal` is true", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <DateInput label="label" onChange={() => {}} value="" disablePortal />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);

  expect(
    within(screen.getAllByRole("presentation")[0]).getByRole("grid"),
  ).toBeVisible();
});

test("should not render the picker as a descendant of the main presentation element when `disablePortal` is false", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<DateInput label="label" onChange={() => {}} value="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);

  expect(
    within(screen.getAllByRole("presentation")[0]).queryByRole("grid"),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("grid")).toBeVisible();
});

describe("when the `locale` is undefined", () => {
  test("should render with the input value matching 'en-GB' expected format when initial `value` is ISO format`", () => {
    render(
      <I18nProvider>
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("05/04/2019");
  });

  test("should update the input value to match 'en-GB' expected format when initial `value` has a different valid format and the input is blurred", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <I18nProvider>
        <MockComponent initialValue="04 04 2019" />
      </I18nProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.tab();

    expect(input).toHaveValue("04/04/2019");
  });

  test.each(VALID_INPUT_STRINGS)(
    "should update the input value to match expected 'en-GB' format when the user types '%s' and the input is blurred",
    async (inputString) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(
        <I18nProvider>
          <MockComponent initialValue="" />
        </I18nProvider>,
      );
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, inputString);
      await user.tab();

      expect(input).toHaveValue("04/04/2019");
    },
  );
});

describe("when the `locale` is 'en-GB''", () => {
  test("should render with the input value matching expected format when initial `value` is ISO format", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "en-GB",
          date: { ariaLabels, dateFnsLocale: () => enGBLocale },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("05/04/2019");
  });

  test("should update the input value to match the expected format when initial `value` has a different valid format and the input is blurred", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <I18nProvider
        locale={{
          locale: () => "en-GB",
          date: { ariaLabels, dateFnsLocale: () => enGBLocale },
        }}
      >
        <MockComponent initialValue="04 04 2019" />
      </I18nProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.tab();

    expect(input).toHaveValue("04/04/2019");
  });

  test.each(VALID_INPUT_STRINGS)(
    "should update the input value to match the expected format when the user types '%s' and the input is blurred",
    async (inputString) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(
        <I18nProvider
          locale={{
            locale: () => "en-GB",
            date: { ariaLabels, dateFnsLocale: () => enGBLocale },
          }}
        >
          <MockComponent initialValue="" />
        </I18nProvider>,
      );
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, inputString);
      await user.tab();

      expect(input).toHaveValue("04/04/2019");
    },
  );

  test("should render with the input value matching the expected format when `dateFormatOverride` is set", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "en-GB",
          date: {
            ariaLabels,
            dateFnsLocale: () => enGBLocale,
            dateFormatOverride: "y-m-ddd",
          },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("2019-0-005");
  });
});

describe("when the `locale` is 'de-DE'", () => {
  test("should render with the input value matching expected format when initial `value` is ISO format", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: { ariaLabels, dateFnsLocale: () => deLocale },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("05.04.2019");
  });

  test("should update the input value to match the expected format when initial `value` has a different valid format and the input is blurred", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: { ariaLabels, dateFnsLocale: () => deLocale },
        }}
      >
        <MockComponent initialValue="04 04 2019" />
      </I18nProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.tab();

    expect(input).toHaveValue("04.04.2019");
  });

  test.each(VALID_INPUT_STRINGS)(
    "should update the input value to match the expected format when the user types '%s' and the input is blurred",
    async (inputString) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(
        <I18nProvider
          locale={{
            locale: () => "de-DE",
            date: { ariaLabels, dateFnsLocale: () => deLocale },
          }}
        >
          <MockComponent initialValue="" />
        </I18nProvider>,
      );
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, inputString);
      await user.tab();

      expect(input).toHaveValue("04.04.2019");
    },
  );

  test("should render with the input value matching the expected format when `dateFormatOverride` is set", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            ariaLabels,
            dateFnsLocale: () => deLocale,
            dateFormatOverride: "y-m-ddd",
          },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("2019-0-005");
  });
});

describe("when the `locale` is 'es'", () => {
  test("should render with the input value matching expected format when initial `value` is ISO format", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "es",
          date: { ariaLabels, dateFnsLocale: () => esLocale },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("05/04/2019");
  });

  test("should update the input value to match the expected format when initial `value` has a different valid format and the input is blurred", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <I18nProvider
        locale={{
          locale: () => "es",
          date: { ariaLabels, dateFnsLocale: () => esLocale },
        }}
      >
        <MockComponent initialValue="04 04 2019" />
      </I18nProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.tab();

    expect(input).toHaveValue("04/04/2019");
  });

  test.each(VALID_INPUT_STRINGS)(
    "should update the input value to match the expected format when the user types '%s' and the input is blurred",
    async (inputString) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(
        <I18nProvider
          locale={{
            locale: () => "es",
            date: { ariaLabels, dateFnsLocale: () => esLocale },
          }}
        >
          <MockComponent initialValue="" />
        </I18nProvider>,
      );
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, inputString);
      await user.tab();

      expect(input).toHaveValue("04/04/2019");
    },
  );

  test("should render with the input value matching the expected format when `dateFormatOverride` is set", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "es",
          date: {
            ariaLabels,
            dateFnsLocale: () => esLocale,
            dateFormatOverride: "y-m-ddd",
          },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("2019-0-005");
  });
});

describe("when the `locale` is 'en-ZA'", () => {
  test("should render with the input value matching expected format when initial `value` is ISO format", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "en-ZA",
          date: { ariaLabels, dateFnsLocale: () => enZALocale },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("05/04/2019");
  });

  test("should update the input value to match the expected format when initial `value` has a different valid format and the input is blurred", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <I18nProvider
        locale={{
          locale: () => "en-ZA",
          date: { ariaLabels, dateFnsLocale: () => enZALocale },
        }}
      >
        <MockComponent initialValue="04 04 2019" />
      </I18nProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.tab();

    expect(input).toHaveValue("04/04/2019");
  });

  test.each(VALID_INPUT_STRINGS)(
    "should update the input value to match the expected format when the user types '%s' and the input is blurred",
    async (inputString) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(
        <I18nProvider
          locale={{
            locale: () => "en-ZA",
            date: { ariaLabels, dateFnsLocale: () => enZALocale },
          }}
        >
          <MockComponent initialValue="" />
        </I18nProvider>,
      );
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, inputString);
      await user.tab();

      expect(input).toHaveValue("04/04/2019");
    },
  );

  test("should render with the input value matching the expected format when `dateFormatOverride` is set", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "en-ZA",
          date: {
            ariaLabels,
            dateFnsLocale: () => enZALocale,
            dateFormatOverride: "y-m-ddd",
          },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("2019-0-005");
  });
});

describe("when the `locale` is 'fr-FR'", () => {
  test("should render with the input value matching expected format when initial `value` is ISO format", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "fr-FR",
          date: { ariaLabels, dateFnsLocale: () => frLocale },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("05/04/2019");
  });

  test("should update the input value to match the expected format when initial `value` has a different valid format and the input is blurred", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <I18nProvider
        locale={{
          locale: () => "fr-FR",
          date: { ariaLabels, dateFnsLocale: () => frLocale },
        }}
      >
        <MockComponent initialValue="04 04 2019" />
      </I18nProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.tab();

    expect(input).toHaveValue("04/04/2019");
  });

  test.each(VALID_INPUT_STRINGS)(
    "should update the input value to match the expected format when the user types '%s' and the input is blurred",
    async (inputString) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(
        <I18nProvider
          locale={{
            locale: () => "fr-FR",
            date: { ariaLabels, dateFnsLocale: () => frLocale },
          }}
        >
          <MockComponent initialValue="" />
        </I18nProvider>,
      );
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, inputString);
      await user.tab();

      expect(input).toHaveValue("04/04/2019");
    },
  );

  test("should render with the input value matching the expected format when `dateFormatOverride` is set", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "fr-FR",
          date: {
            ariaLabels,
            dateFnsLocale: () => frLocale,
            dateFormatOverride: "y-m-ddd",
          },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("2019-0-005");
  });
});

describe("when the `locale` is 'fr-CA'", () => {
  test("should render with the input value matching expected format when initial `value` is ISO format", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "fr-CA",
          date: { ariaLabels, dateFnsLocale: () => frCALocale },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("05/04/2019");
  });

  test("should update the input value to match the expected format when initial `value` has a different valid format and the input is blurred", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <I18nProvider
        locale={{
          locale: () => "fr-CA",
          date: { ariaLabels, dateFnsLocale: () => frCALocale },
        }}
      >
        <MockComponent initialValue="04 04 2019" />
      </I18nProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.tab();

    expect(input).toHaveValue("04/04/2019");
  });

  test.each(VALID_INPUT_STRINGS)(
    "should update the input value to match the expected format when the user types '%s' and the input is blurred",
    async (inputString) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(
        <I18nProvider
          locale={{
            locale: () => "fr-CA",
            date: { ariaLabels, dateFnsLocale: () => frCALocale },
          }}
        >
          <MockComponent initialValue="" />
        </I18nProvider>,
      );
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, inputString);
      await user.tab();

      expect(input).toHaveValue("04/04/2019");
    },
  );

  test("should render with the input value matching the expected format when `dateFormatOverride` is set", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "fr-CA",
          date: {
            ariaLabels,
            dateFnsLocale: () => frCALocale,
            dateFormatOverride: "y-m-ddd",
          },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("2019-0-005");
  });
});

describe("when the `locale` is 'en-CA'", () => {
  test("should render with the input value matching expected format when initial `value` is ISO format", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "en-CA",
          date: { ariaLabels, dateFnsLocale: () => enCALocale },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("04/05/2019");
  });

  test("should update the input value to match the expected format when initial `value` has a different valid format and the input is blurred", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <I18nProvider
        locale={{
          locale: () => "en-CA",
          date: { ariaLabels, dateFnsLocale: () => enCALocale },
        }}
      >
        <MockComponent initialValue="04 04 2019" />
      </I18nProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.tab();

    expect(input).toHaveValue("04/04/2019");
  });

  test.each(VALID_INPUT_STRINGS)(
    "should update the input value to match the expected format when the user types '%s' and the input is blurred",
    async (inputString) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(
        <I18nProvider
          locale={{
            locale: () => "en-CA",
            date: { ariaLabels, dateFnsLocale: () => enCALocale },
          }}
        >
          <MockComponent initialValue="" />
        </I18nProvider>,
      );
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, inputString);
      await user.tab();

      expect(input).toHaveValue("04/04/2019");
    },
  );

  test("should render with the input value matching the expected format when `dateFormatOverride` is set", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "en-CA",
          date: {
            ariaLabels,
            dateFnsLocale: () => enCALocale,
            dateFormatOverride: "y-m-ddd",
          },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("2019-0-005");
  });
});

describe("when the `locale` is 'en-US'", () => {
  test("should render with the input value matching expected format when initial `value` is ISO format", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "en-US",
          date: { ariaLabels, dateFnsLocale: () => enUSLocale },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("04/05/2019");
  });

  test("should update the input value to match the expected format when initial `value` has a different valid format and the input is blurred", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <I18nProvider
        locale={{
          locale: () => "en-US",
          date: { ariaLabels, dateFnsLocale: () => enUSLocale },
        }}
      >
        <MockComponent initialValue="04/04/2019" />
      </I18nProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.tab();

    expect(input).toHaveValue("04/04/2019");
  });

  test.each(VALID_INPUT_STRINGS)(
    "should update the input value to match the expected format when the user types '%s' and the input is blurred",
    async (inputString) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(
        <I18nProvider
          locale={{
            locale: () => "en-US",
            date: { ariaLabels, dateFnsLocale: () => enUSLocale },
          }}
        >
          <MockComponent initialValue="" />
        </I18nProvider>,
      );
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, inputString);
      await user.tab();

      expect(input).toHaveValue("04/04/2019");
    },
  );

  test("should render with the input value matching the expected format when `dateFormatOverride` is set", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "en-US",
          date: {
            ariaLabels,
            dateFnsLocale: () => enUSLocale,
            dateFormatOverride: "y-m-ddd",
          },
        }}
      >
        <DateInput onChange={() => {}} value="2019-04-05" />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("2019-0-005");
  });
});

test("should update the input value and call `onChange` with expected parameters when the user types a string with a valid leap year and the input is blurred", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(<MockComponent onChange={onChange} initialValue="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.type(input, "29/02/2012");
  await user.tab();

  expect(input).toHaveValue("29/02/2012");
  expect(onChange).toHaveBeenCalledWith({
    formattedValue: "29/02/2012",
    rawValue: "2012-02-29",
  });
});

test("should call `onChange` with expected parameters but not update the input value when the user types a string with an invalid leap year and the input is blurred", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(<MockComponent onChange={onChange} initialValue="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.type(input, "29.02.2013");
  await user.tab();

  expect(input).toHaveValue("29.02.2013");
  expect(onChange).toHaveBeenCalledWith({
    formattedValue: "29.02.2013",
    rawValue: null,
  });
});

test("should call `onChange` with expected parameters but not update the input value when the user types an invalid string and the input is blurred", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(<MockComponent onChange={onChange} initialValue="" />);
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.type(input, "04.04/2019");
  await user.tab();

  expect(input).toHaveValue("04.04/2019");
  expect(onChange).toHaveBeenCalledWith({
    formattedValue: "04.04/2019",
    rawValue: null,
  });
});

describe("when the `validationRedesignOptIn` prop is falsy", () => {
  test("should render tooltip and validation icon when `error` is passed a string value and the user hovers the mouse over the input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <DateInput
          label="label"
          onChange={() => {}}
          value=""
          error="error message"
        />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");
    const icon = screen.getByTestId("icon-error");
    await user.hover(input);

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(icon).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toHaveTextContent("error message");
  });

  test("should render tooltip and validation icon when `validationOnLabel` is set and `error` is passed a string value and the user hovers the mouse over the input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <DateInput
          label="label"
          onChange={() => {}}
          value=""
          error="error message"
          validationOnLabel
        />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.hover(input);

    expect(screen.getByRole("tooltip")).toHaveTextContent("error message");
  });

  test("should render tooltip and validation icon when `validationOnLabel` is set and `error` is passed a string value and the user hovers the mouse over the label", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <DateInput
          label="label"
          onChange={() => {}}
          value=""
          error="error message"
          validationOnLabel
        />
      </CarbonProvider>,
    );
    const label = screen.getByText("label");
    await user.hover(label);

    expect(screen.getByRole("tooltip")).toHaveTextContent("error message");
  });

  test("should not render tooltip or validation icon when `error` is passed a boolean value", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <DateInput label="label" onChange={() => {}} value="" error />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.hover(input);

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByTestId("icon-error")).not.toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  test("should render tooltip and validation icon when an `warning` is passed a string value and the user hovers the mouse over the input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <DateInput
          label="label"
          onChange={() => {}}
          value=""
          warning="warning message"
        />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");
    const icon = screen.getByTestId("icon-warning");
    await user.hover(input);

    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(icon).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toHaveTextContent("warning message");
  });

  test("should not render tooltip or validation icon when `warning` is passed a boolean value", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <DateInput label="label" onChange={() => {}} value="" warning />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.hover(input);

    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(screen.queryByTestId("icon-warning")).not.toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  test("should render tooltip and validation icon when an `info` is passed a string value and the user hovers the mouse over the input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <DateInput
          label="label"
          onChange={() => {}}
          value=""
          info="info message"
        />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");
    const icon = screen.getByTestId("icon-info");
    await user.hover(input);

    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(icon).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toHaveTextContent("info message");
  });

  test("should not render tooltip or validation icon when `info` is passed a boolean value", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <DateInput label="label" onChange={() => {}} value="" info />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");
    await user.hover(input);

    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(screen.queryByTestId("icon-info")).not.toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});

describe("when the `validationRedesignOptIn` prop is true", () => {
  test("should render the validation message when an `error` is passed a string value and the user hovers the mouse over the input", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <DateInput
          label="label"
          onChange={() => {}}
          value=""
          error="error message"
        />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("error message")).toBeInTheDocument();
  });

  test("should not render the validation message when `error` is passed a boolean value", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <DateInput label="label" onChange={() => {}} value="" error />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByText("error message")).not.toBeInTheDocument();
  });

  test("should render the validation message when an `warning` is passed a string value and the user hovers the mouse over the input", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <DateInput
          label="label"
          onChange={() => {}}
          value=""
          warning="warning message"
        />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByText("warning message")).toBeInTheDocument();
  });

  test("should not render the validation message when `warning` is passed a boolean value", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <DateInput label="label" onChange={() => {}} value="" warning />
      </CarbonProvider>,
    );
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(screen.queryByText("warning message")).not.toBeInTheDocument();
  });
});

test("should call `onPickerOpen` callback when the user opens the DatePicker and `onPickerClose` callback when the user closes the DatePicker", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onPickerOpen = jest.fn();
  const onPickerClose = jest.fn();
  render(
    <DateInput
      label="label"
      onChange={() => {}}
      onPickerOpen={onPickerOpen}
      onPickerClose={onPickerClose}
      value="010122"
    />,
  );
  const input = screen.getByRole("textbox");
  await user.click(input);
  expect(onPickerOpen).toHaveBeenCalled();

  await user.click(document.body);
  expect(onPickerClose).toHaveBeenCalled();
});

test("should select the correct date when the locale is overridden and a date is typed into the input", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();

  render(
    <I18nProvider
      locale={{
        locale: () => "de-DE",
        date: {
          ariaLabels,
          dateFnsLocale: () => deLocale,
          dateFormatOverride: "dd/MM/yyyy",
        },
      }}
    >
      <DateInput onChange={onChange} value="2019-04-05" />
    </I18nProvider>,
  );
  const input = screen.getByRole("textbox");

  await user.type(input, "05/04");

  const caption = screen.getByRole("status");
  expect(caption).toHaveTextContent("April 2019");
});

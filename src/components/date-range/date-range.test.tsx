import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { enGB as enGBLocale } from "date-fns/locale/en-GB";

import DateRange, {
  DateRangeChangeEvent,
  DateRangeProps,
} from "./date-range.component";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import CarbonProvider from "../carbon-provider";
import I18nProvider from "../i18n-provider";

const ControlledDateRange = ({
  value: initialValue,
  onChange,
  ...props
}: DateRangeProps) => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <DateRange
      {...props}
      value={value}
      onChange={(ev) => {
        setValue([
          ev.target.value[0].formattedValue,
          ev.target.value[1].formattedValue,
        ]);
        onChange(ev);
      }}
    />
  );
};

testStyledSystemMargin(
  (props) => (
    <DateRange
      data-role="date-range"
      value={["10/10/2016", "11/11/2016"]}
      onChange={() => {}}
      {...props}
    />
  ),
  () => screen.getByTestId("date-range"),
);

test("should update the input values to match the 'en-GB' locale's format when initialised with valid ISO strings", () => {
  render(
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["2016-10-10", "2016-11-11"]}
      onChange={() => {}}
    />,
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
    "10/10/2016",
  );
  expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
    "11/11/2016",
  );
});

test("should not update the input values to match the 'en-GB' locale's format when initialised with empty strings and `allowEmptyValue` is set for both", () => {
  render(
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["", ""]}
      onChange={() => {}}
      startDateProps={{ allowEmptyValue: true }}
      endDateProps={{ allowEmptyValue: true }}
    />,
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveValue("");
  expect(screen.getByRole("textbox", { name: "end" })).toHaveValue("");
});

test("should call the `onChange` callback with the expected values when the 'start' input changes", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
    />,
  );
  await user.type(screen.getByRole("textbox", { name: "start" }), "15/10/2016");

  expect(onChange).toHaveBeenCalledWith({
    target: {
      id: "foo",
      name: "bar",
      value: [
        { formattedValue: "15/10/2016", rawValue: "2016-10-15" },
        { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
      ],
    },
  });
});

test("should call the `onChange` callback with the expected values when the 'end' input changes", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
    />,
  );
  await user.type(screen.getByRole("textbox", { name: "end" }), "15/10/2016");

  expect(onChange).toHaveBeenCalledWith({
    target: {
      id: "foo",
      name: "bar",
      value: [
        { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
        { formattedValue: "15/10/2016", rawValue: "2016-10-15" },
      ],
    },
  });
});

test("should call the `onChange` callback with the expected values when the 'start' input changes and `allowEmptyValue` is set in `startDateProps`", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
      startDateProps={{ allowEmptyValue: true }}
    />,
  );
  await user.clear(screen.getByRole("textbox", { name: "start" }));

  expect(onChange).toHaveBeenCalledWith({
    target: {
      id: "foo",
      name: "bar",
      value: [
        { formattedValue: "", rawValue: "" },
        { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
      ],
    },
  });
});

test("should call the `onChange` callback with the expected values when the 'start' input changes and `allowEmptyValue` is not set in `startDateProps`", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
    />,
  );
  await user.clear(screen.getByRole("textbox", { name: "start" }));

  expect(onChange).toHaveBeenCalledWith({
    target: {
      id: "foo",
      name: "bar",
      value: [
        { formattedValue: "", rawValue: null },
        { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
      ],
    },
  });
});

test("should call the `onChange` callback with the expected values when the 'end' input changes and `allowEmptyValue` is set in `endDateProps`", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
      endDateProps={{ allowEmptyValue: true }}
    />,
  );
  await user.clear(screen.getByRole("textbox", { name: "end" }));

  expect(onChange).toHaveBeenCalledWith({
    target: {
      id: "foo",
      name: "bar",
      value: [
        { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
        { formattedValue: "", rawValue: "" },
      ],
    },
  });
});

test("should call the `onChange` callback with the expected values when the 'end' input changes and `allowEmptyValue` is not set in `endDateProps`", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
    />,
  );
  await user.clear(screen.getByRole("textbox", { name: "end" }));

  expect(onChange).toHaveBeenCalledWith({
    target: {
      id: "foo",
      name: "bar",
      value: [
        { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
        { formattedValue: "", rawValue: null },
      ],
    },
  });
});

test("should call the `onChange` callback with the expected values when the 'start' input changes and input value cannot be parsed to a valid date", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
    />,
  );
  await user.type(screen.getByRole("textbox", { name: "start" }), "foo");

  expect(onChange).toHaveBeenCalledWith({
    target: {
      id: "foo",
      name: "bar",
      value: [
        { formattedValue: "foo", rawValue: null },
        { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
      ],
    },
  });
});

test("should call the `onChange` callback with the expected values when the 'end' input changes and input value cannot be parsed to a valid date", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
    />,
  );
  await user.type(screen.getByRole("textbox", { name: "end" }), "foo");

  expect(onChange).toHaveBeenCalledWith({
    target: {
      id: "foo",
      name: "bar",
      value: [
        { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
        { formattedValue: "foo", rawValue: null },
      ],
    },
  });
});

test("should call the `onChange` callback when the user types a valid date string that does not match the locales format and blurs the 'start' input", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  const MockComponent = () => {
    const [value, setValue] = React.useState(["10/10/2016", "11/11/2016"]);
    const handleChange = (e: DateRangeChangeEvent) => {
      const newValue = [
        e.target.value[0].formattedValue,
        e.target.value[1].formattedValue,
      ];
      setValue(newValue);
      onChange(e.target.value);
    };
    return (
      <DateRange
        startLabel="start"
        onChange={handleChange}
        endLabel="end"
        value={value}
      />
    );
  };
  render(<MockComponent />);
  await user.type(screen.getByRole("textbox", { name: "start" }), "15.10.2016");
  await user.tab({ shift: true });

  expect(onChange).toHaveBeenCalledWith([
    { formattedValue: "15/10/2016", rawValue: "2016-10-15" },
    { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
  ]);
});

test("should call the `onChange` callback when the user types a valid date string that does not match the locales format and blurs the 'end' input", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  const MockComponent = () => {
    const [value, setValue] = React.useState(["10/10/2016", "11/11/2016"]);
    const handleChange = (e: DateRangeChangeEvent) => {
      const newValue = [
        e.target.value[0].formattedValue,
        e.target.value[1].formattedValue,
      ];
      setValue(newValue);
      onChange(e.target.value);
    };
    return (
      <DateRange
        startLabel="start"
        onChange={handleChange}
        endLabel="end"
        value={value}
      />
    );
  };
  render(<MockComponent />);
  await user.type(screen.getByRole("textbox", { name: "end" }), "15.11.2016");
  await user.tab();

  expect(onChange).toHaveBeenCalledWith([
    { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
    { formattedValue: "15/11/2016", rawValue: "2016-11-15" },
  ]);
});

test("should call the `onChange` callback when the user clears the 'start' input with `allowEmptyValue` set and back tabs away from the input", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  const MockComponent = () => {
    const [value, setValue] = React.useState(["10/10/2016", "11/11/2016"]);
    const handleChange = (e: DateRangeChangeEvent) => {
      const newValue = [
        e.target.value[0].formattedValue,
        e.target.value[1].formattedValue,
      ];
      setValue(newValue);
      onChange(e.target.value);
    };
    return (
      <DateRange
        startLabel="start"
        onChange={handleChange}
        endLabel="end"
        value={value}
        startDateProps={{ allowEmptyValue: true }}
      />
    );
  };
  render(<MockComponent />);
  await user.clear(screen.getByRole("textbox", { name: "start" }));
  await user.tab({ shift: true });

  expect(onChange).toHaveBeenCalledWith([
    { formattedValue: "", rawValue: "" },
    { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
  ]);
});

test("should call the `onChange` callback when the user clears the 'end' input with `allowEmptyValue` set and back tabs away from the input", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  const MockComponent = () => {
    const [value, setValue] = React.useState(["10/10/2016", "11/11/2016"]);
    const handleChange = (e: DateRangeChangeEvent) => {
      const newValue = [
        e.target.value[0].formattedValue,
        e.target.value[1].formattedValue,
      ];
      setValue(newValue);
      onChange(e.target.value);
    };
    return (
      <DateRange
        startLabel="start"
        onChange={handleChange}
        endLabel="end"
        value={value}
        endDateProps={{ allowEmptyValue: true }}
      />
    );
  };
  render(<MockComponent />);
  await user.clear(screen.getByRole("textbox", { name: "end" }));
  await user.tab();

  expect(onChange).toHaveBeenCalledWith([
    { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
    { formattedValue: "", rawValue: "" },
  ]);
});

test("should not call `onBlur` callback when focus moves from 'start' to 'end' input", async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <DateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />,
  );

  await user.click(screen.getByRole("textbox", { name: "start" }));
  await user.click(screen.getByRole("textbox", { name: "end" }));

  expect(onBlur).not.toHaveBeenCalled();
});

test("should not call `onBlur` callback when focus moves from 'end' to 'start' input", async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <DateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />,
  );

  await user.click(screen.getByRole("textbox", { name: "end" }));
  await user.click(screen.getByRole("textbox", { name: "start" }));

  expect(onBlur).not.toHaveBeenCalled();
});

test("should call `onBlur` callback with expected values when user types a value into 'start' input and moves focus away from both inputs", async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />,
  );
  await user.type(screen.getByRole("textbox", { name: "start" }), "15/10/2016");
  await user.tab({ shift: true });

  expect(onBlur).toHaveBeenCalledWith({
    target: {
      value: [
        { formattedValue: "15/10/2016", rawValue: "2016-10-15" },
        { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
      ],
    },
  });
});

test("should call `onBlur` callback with expected values when user types a value into 'end' input and moves focus away from both inputs", async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />,
  );
  await user.type(screen.getByRole("textbox", { name: "end" }), "15/10/2016");
  await user.tab();

  expect(onBlur).toHaveBeenCalledWith({
    target: {
      value: [
        { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
        { formattedValue: "15/10/2016", rawValue: "2016-10-15" },
      ],
    },
  });
});

test("should call `onBlur` callback with expected values when user clears the 'start' input, moves focus away from both inputs and `allowEmptyValue` is set in `startDateProps`", async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
      startDateProps={{ allowEmptyValue: true }}
    />,
  );
  await user.clear(screen.getByRole("textbox", { name: "start" }));
  await user.tab({ shift: true });

  expect(onBlur).toHaveBeenCalledWith({
    target: {
      value: [
        { formattedValue: "", rawValue: "" },
        { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
      ],
    },
  });
});

test("should call `onBlur` callback with expected values when user clears the 'end' input, moves focus away from both inputs and `allowEmptyValue` is set in `endDateProps`", async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
      endDateProps={{ allowEmptyValue: true }}
    />,
  );
  await user.clear(screen.getByRole("textbox", { name: "end" }));
  await user.tab();

  expect(onBlur).toHaveBeenCalledWith({
    target: {
      value: [
        { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
        { formattedValue: "", rawValue: "" },
      ],
    },
  });
});

test("should call `onBlur` callback with expected values when user clears the 'start' input, moves focus away from both inputs and `allowEmptyValue` is not set in `startDateProps`", async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />,
  );
  await user.clear(screen.getByRole("textbox", { name: "start" }));
  await user.tab({ shift: true });

  expect(onBlur).toHaveBeenCalledWith({
    target: {
      value: [
        { formattedValue: "", rawValue: null },
        { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
      ],
    },
  });
});

test("should call `onBlur` callback with expected values when user clears the 'end' input, moves focus away from both inputs and `allowEmptyValue` is not set in `endDateProps`", async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />,
  );
  await user.clear(screen.getByRole("textbox", { name: "end" }));
  await user.tab();

  expect(onBlur).toHaveBeenCalledWith({
    target: {
      value: [
        { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
        { formattedValue: "", rawValue: null },
      ],
    },
  });
});

test("should call `onBlur` callback with expected values when user enters invalid string in the 'start' input and moves focus away from both inputs", async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />,
  );
  await user.type(screen.getByRole("textbox", { name: "start" }), "foo");
  await user.tab({ shift: true });

  expect(onBlur).toHaveBeenCalledWith({
    target: {
      value: [
        { formattedValue: "foo", rawValue: null },
        { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
      ],
    },
  });
});

test("should call `onBlur` callback with expected values when user enters invalid string in the 'end' input and moves focus away from both inputs", async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />,
  );
  await user.type(screen.getByRole("textbox", { name: "end" }), "foo");
  await user.tab();

  expect(onBlur).toHaveBeenCalledWith({
    target: {
      value: [
        { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
        { formattedValue: "foo", rawValue: null },
      ],
    },
  });
});

test("names each calendar by its input's label", async () => {
  const user = userEvent.setup();
  render(
    <DateRange
      startLabel="Start date"
      endLabel="End date"
      value={["10/10/2016", "11/11/2016"]}
      onChange={() => {}}
      startDateProps={{ disablePortal: true, "data-role": "start" }}
      endDateProps={{ disablePortal: true, "data-role": "end" }}
    />,
  );

  await user.click(
    within(screen.getByTestId("start")).getByRole("button", {
      name: "Open calendar",
    }),
  );
  expect(screen.getByRole("dialog")).toHaveAccessibleName("Start date");

  await user.click(
    within(screen.getByTestId("end")).getByRole("button", {
      name: "Open calendar",
    }),
  );
  expect(screen.getByRole("dialog")).toHaveAccessibleName("End date");
});

test("should close the open 'start' picker when the user moves focus to the `end` input", async () => {
  const user = userEvent.setup();
  render(
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={() => {}}
      startDateProps={{ disablePortal: true, "data-role": "start" }}
      endDateProps={{ disablePortal: true, "data-role": "end" }}
    />,
  );
  const startDate = screen.getByTestId("start");
  const endDate = screen.getByTestId("end");

  const startCalendarButton = within(startDate).getByRole("button", {
    name: "Open calendar",
  });
  await user.click(startCalendarButton);

  expect(within(startDate).getByRole("grid")).toBeVisible();
  expect(within(endDate).queryByRole("grid")).not.toBeInTheDocument();

  const endCalendarButton = within(endDate).getByRole("button", {
    name: "Open calendar",
  });
  await user.click(endCalendarButton);

  expect(within(endDate).getByRole("grid")).toBeVisible();
  expect(within(startDate).queryByRole("grid")).not.toBeInTheDocument();
});

test("should close the open 'end' picker when the user moves focus to the `start` input", async () => {
  const user = userEvent.setup();
  render(
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={() => {}}
      startDateProps={{ disablePortal: true, "data-role": "start" }}
      endDateProps={{ disablePortal: true, "data-role": "end" }}
    />,
  );
  const startDate = screen.getByTestId("start");
  const endDate = screen.getByTestId("end");

  const endCalendarButton = within(endDate).getByRole("button", {
    name: "Open calendar",
  });
  await user.click(endCalendarButton);

  expect(within(endDate).getByRole("grid")).toBeVisible();
  expect(within(startDate).queryByRole("grid")).not.toBeInTheDocument();

  const startCalendarButton = within(startDate).getByRole("button", {
    name: "Open calendar",
  });
  await user.click(startCalendarButton);

  expect(within(startDate).getByRole("grid")).toBeVisible();
  expect(within(endDate).queryByRole("grid")).not.toBeInTheDocument();
});

test("should set the `disabled` attribute on the 'start' input when the prop is set on `startDateProps`", () => {
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      startDateProps={{ disabled: true }}
    />,
  );

  expect(screen.getByRole("textbox", { name: "start" })).toBeDisabled();
});

test("should set the `disabled` attribute on the 'end' input when the prop is set on `endDateProps`", () => {
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      endDateProps={{ disabled: true }}
    />,
  );

  expect(screen.getByRole("textbox", { name: "end" })).toBeDisabled();
});

test("should set the `readOnly` attribute on the 'start' input when the prop is set on `startDateProps`", () => {
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      startDateProps={{ readOnly: true }}
    />,
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveAttribute(
    "readonly",
  );
});

test("should set the `readOnly` attribute on the 'end' input when the prop is set on `endDateProps`", () => {
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      endDateProps={{ readOnly: true }}
    />,
  );

  expect(screen.getByRole("textbox", { name: "end" })).toHaveAttribute(
    "readonly",
  );
});

test("should set the `required` attribute on both inputs when the prop is set", () => {
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      required
    />,
  );

  expect(screen.getByRole("textbox", { name: "start" })).toBeRequired();
  expect(screen.getByRole("textbox", { name: "end" })).toBeRequired();
});

test("should override the `value` on the 'start' input when the prop is set on `startDateProps`", () => {
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      startDateProps={{ value: "01/01/2001" }}
    />,
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
    "01/01/2001",
  );
  expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
    "11/11/2016",
  );
});

test("should override the `value` on the 'end' input when the prop is set on `endDateProps`", () => {
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      endDateProps={{ value: "01/01/2001" }}
    />,
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
    "10/10/2016",
  );
  expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
    "01/01/2001",
  );
});

test("should support passing custom class names via `startDateProps` and `endDateProps`", () => {
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      startDateProps={{ className: "foo" }}
      endDateProps={{ className: "bar" }}
    />,
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveClass("foo");
  expect(screen.getByRole("textbox", { name: "end" })).toHaveClass("bar");
});

test("should support rendering the component with `data-` tags", () => {
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      data-element="foo"
      data-role="bar"
    />,
  );
  const dateRange = screen.getByTestId("bar");

  expect(dateRange).toHaveAttribute("data-component", "date-range");
  expect(dateRange).toHaveAttribute("data-element", "foo");
});

test("should set the `data-element` attribute internally on each individual date input", () => {
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      startDateProps={{ "data-role": "start" }}
      endDateProps={{ "data-role": "end" }}
    />,
  );

  expect(screen.getByTestId("start")).toHaveAttribute(
    "data-element",
    "start-date",
  );
  expect(screen.getByTestId("end")).toHaveAttribute("data-element", "end-date");
});

test("should support ref as an object on the 'start' input", () => {
  const ref = { current: null };
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      startRef={ref}
    />,
  );

  expect(ref.current).toBe(screen.getByRole("textbox", { name: "start" }));
});

test("should support ref as a callback on the 'start' input", () => {
  const ref = jest.fn();
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      startRef={ref}
    />,
  );

  expect(ref).toHaveBeenCalledWith(
    screen.getByRole("textbox", { name: "start" }),
  );
});

test("should set the ref on the 'start' input to null after the component is unmounted", () => {
  const ref = { current: null };
  const { unmount } = render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      startRef={ref}
    />,
  );
  unmount();

  expect(ref.current).toBeNull();
});

test("should support ref as an object on the 'end' input", () => {
  const ref = { current: null };
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      endRef={ref}
    />,
  );

  expect(ref.current).toBe(screen.getByRole("textbox", { name: "end" }));
});

test("should support ref as a callback on the 'end' input", () => {
  const ref = jest.fn();
  render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      endRef={ref}
    />,
  );

  expect(ref).toHaveBeenCalledWith(
    screen.getByRole("textbox", { name: "end" }),
  );
});

test("should set the ref on the 'end' input to null after the component is unmounted", () => {
  const ref = { current: null };
  const { unmount } = render(
    <DateRange
      startLabel="start"
      onChange={() => {}}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      endRef={ref}
    />,
  );
  unmount();

  expect(ref.current).toBeNull();
});

test("should display the error message for both inputs when strings are passed to the error props and `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <DateRange
        startLabel="start"
        onChange={() => {}}
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        startError="start error"
        endError="end error"
        startDateProps={{ "data-role": "start" }}
        endDateProps={{ "data-role": "end" }}
      />
    </CarbonProvider>,
  );
  const start = screen.getByTestId("start");
  const end = screen.getByTestId("end");

  expect(within(start).getByText("start error")).toBeVisible();
  expect(within(end).getByText("end error")).toBeVisible();
});

test("should not display the error message for both inputs when booleans are passed to the error props and `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <DateRange
        startLabel="start"
        onChange={() => {}}
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        startError
        endError
        startDateProps={{ "data-role": "start" }}
        endDateProps={{ "data-role": "end" }}
      />
    </CarbonProvider>,
  );
  const start = screen.getByTestId("start");
  const end = screen.getByTestId("end");

  expect(within(start).queryByText("start error")).not.toBeInTheDocument();
  expect(within(end).queryByText("end error")).not.toBeInTheDocument();
});

// for coverage
test("should display the error message below both inputs when strings are passed to the error props, `validationRedesignOptIn` is true and `validationMessagePositionTop` is false", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <DateRange
        validationMessagePositionTop={false}
        startLabel="start"
        onChange={() => {}}
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        startError="start error"
        endError="end error"
        startDateProps={{ "data-role": "start" }}
        endDateProps={{ "data-role": "end" }}
      />
    </CarbonProvider>,
  );
  const start = screen.getByTestId("start");
  const end = screen.getByTestId("end");

  expect(within(start).getByText("start error")).toBeVisible();
  expect(within(end).getByText("end error")).toBeVisible();
});

test("should display the warning message for both inputs when strings are passed to the warning props and `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <DateRange
        startLabel="start"
        onChange={() => {}}
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        startWarning="start warning"
        endWarning="end warning"
        startDateProps={{ "data-role": "start" }}
        endDateProps={{ "data-role": "end" }}
      />
    </CarbonProvider>,
  );
  const start = screen.getByTestId("start");
  const end = screen.getByTestId("end");

  expect(within(start).getByText("start warning")).toBeVisible();
  expect(within(end).getByText("end warning")).toBeVisible();
});

test("should not display the warning message for both inputs when booleans are passed to the warning props and `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <DateRange
        startLabel="start"
        onChange={() => {}}
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        startWarning
        endWarning
        startDateProps={{ "data-role": "start" }}
        endDateProps={{ "data-role": "end" }}
      />
    </CarbonProvider>,
  );
  const start = screen.getByTestId("start");
  const end = screen.getByTestId("end");

  expect(within(start).queryByText("start warning")).not.toBeInTheDocument();
  expect(within(end).queryByText("end warning")).not.toBeInTheDocument();
});

// for coverage
test("should display the warning message below both inputs when strings are passed to the error props, `validationRedesignOptIn` is true and `validationMessagePositionTop` is false", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <DateRange
        validationMessagePositionTop={false}
        startLabel="start"
        onChange={() => {}}
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        startWarning="start warning"
        endWarning="end warning"
        startDateProps={{ "data-role": "start" }}
        endDateProps={{ "data-role": "end" }}
      />
    </CarbonProvider>,
  );
  const start = screen.getByTestId("start");
  const end = screen.getByTestId("end");

  expect(within(start).getByText("start warning")).toBeVisible();
  expect(within(end).getByText("end warning")).toBeVisible();
});

test("should have the expected styling when the `labelsInline` prop is set", () => {
  render(
    <DateRange
      startLabel="start"
      endLabel="end"
      onChange={() => {}}
      value={["10/10/2016", "11/11/2016"]}
      labelsInline
      startDateProps={{ "data-role": "start" }}
      endDateProps={{ "data-role": "end" }}
    />,
  );

  expect(screen.getByTestId("start")).toHaveStyle("vertical-align: top");
  expect(screen.getByTestId("end")).toHaveStyle("vertical-align: top");
});

test("should have the default styling when the `labelsInline` prop is set and `validationRedesignOptIn` is set", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <DateRange
        startLabel="start"
        endLabel="end"
        onChange={() => {}}
        value={["10/10/2016", "11/11/2016"]}
        labelsInline
        startDateProps={{ "data-role": "start" }}
        endDateProps={{ "data-role": "end" }}
      />
    </CarbonProvider>,
  );

  expect(screen.getByTestId("start")).toHaveStyle("vertical-align: bottom");
  expect(screen.getByTestId("end")).toHaveStyle("vertical-align: bottom");
});

describe("Locale formatting overrides", () => {
  it("should render with the input value matching the expected format when `dateFormatOverride` is passed as a translation key", () => {
    render(
      <I18nProvider
        locale={{
          locale: () => "en-GB",
          date: {
            ariaLabels: {
              nextMonthButton: () => "foo",
              previousMonthButton: () => "foo",
              chooseMonth: () => "Choose the month",
              chooseYear: () => "Choose the year",
              closeButton: () => "Close",
            },
            dateFnsLocale: () => enGBLocale,
            dateFormatOverride: "y-m-ddd",
          },
        }}
      >
        <DateRange
          startLabel="start"
          endLabel="end"
          value={["2016-10-10", "2016-11-11"]}
          onChange={() => {}}
        />
      </I18nProvider>,
    );

    expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
      "2016-0-010",
    );
    expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
      "2016-0-011",
    );
  });

  it("should render with the input value matching the expected format when `dateFormatOverride` is passed as a prop", () => {
    render(
      <DateRange
        startLabel="start"
        endLabel="end"
        value={["2016-10-10", "2016-11-11"]}
        onChange={() => {}}
        dateFormatOverride="y-m-ddd"
      />,
    );

    expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
      "2016-0-010",
    );
    expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
      "2016-0-011",
    );
  });

  it("should keep a value in the `dateFormatOverride` prop format in both inputs", () => {
    render(
      <DateRange
        startLabel="start"
        endLabel="end"
        value={["15-7-2025", "28-7-2025"]}
        onChange={() => {}}
        dateFormatOverride="d-M-yyyy"
      />,
    );

    expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
      "15-7-2025",
    );
    expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
      "28-7-2025",
    );
  });
});

describe("Standard handlers passed in startDateProps and endDateProps", () => {
  it.each(["start", "end"] as const)(
    "runs DateRange's onChange and then the consumer's onChange for the %s input",
    async (input) => {
      const user = userEvent.setup();
      const calls: string[] = [];
      const onChange = jest.fn(() => calls.push("range"));
      const consumerOnChange = jest.fn(() => calls.push("consumer"));
      render(
        <DateRange
          startLabel="start"
          endLabel="end"
          value={["10/10/2016", "11/11/2016"]}
          onChange={onChange}
          {...{ [`${input}DateProps`]: { onChange: consumerOnChange } }}
        />,
      );

      await user.type(screen.getByRole("textbox", { name: input }), "1");

      expect(consumerOnChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
      expect(calls.slice(0, 2)).toEqual(["range", "consumer"]);
    },
  );

  it("keeps the range value in step when the consumer handles onChange", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <ControlledDateRange
        startLabel="start"
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        onChange={onChange}
        startDateProps={{ onChange: () => {} }}
      />,
    );

    await user.clear(screen.getByRole("textbox", { name: "start" }));
    await user.type(
      screen.getByRole("textbox", { name: "start" }),
      "12/12/2016",
    );
    await user.clear(screen.getByRole("textbox", { name: "end" }));
    await user.type(screen.getByRole("textbox", { name: "end" }), "13/12/2016");

    expect(onChange).toHaveBeenLastCalledWith({
      target: {
        value: [
          { formattedValue: "12/12/2016", rawValue: "2016-12-12" },
          { formattedValue: "13/12/2016", rawValue: "2016-12-13" },
        ],
      },
    });
  });

  it("runs DateRange's onBlur and the consumer's onBlur", async () => {
    const user = userEvent.setup();
    const onBlur = jest.fn();
    const consumerOnBlur = jest.fn();
    render(
      <>
        <DateRange
          startLabel="start"
          endLabel="end"
          value={["10/10/2016", "11/11/2016"]}
          onChange={() => {}}
          onBlur={onBlur}
          endDateProps={{ onBlur: consumerOnBlur }}
        />
        <button type="button">Outside</button>
      </>,
    );

    await user.click(screen.getByRole("textbox", { name: "end" }));
    await user.click(screen.getByRole("button", { name: "Outside" }));

    expect(consumerOnBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("runs the consumer's onKeyDown and keeps blur blocked while tabbing between the inputs", async () => {
    const user = userEvent.setup();
    const onBlur = jest.fn();
    const consumerOnKeyDown = jest.fn();
    render(
      <DateRange
        startLabel="start"
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        onChange={() => {}}
        onBlur={onBlur}
        startDateProps={{ onKeyDown: consumerOnKeyDown }}
        endDateProps={{ onKeyDown: consumerOnKeyDown }}
      />,
    );

    await user.click(screen.getByRole("textbox", { name: "start" }));
    await user.tab();
    await user.tab();
    await user.tab({ shift: true });
    await user.tab({ shift: true });

    expect(consumerOnKeyDown).toHaveBeenCalled();
    expect(onBlur).not.toHaveBeenCalled();
  });

  it.each(["start", "end"] as const)(
    "runs the consumer's onFocus for the %s input",
    async (input) => {
      const user = userEvent.setup();
      const consumerOnFocus = jest.fn();
      render(
        <DateRange
          startLabel="start"
          endLabel="end"
          value={["10/10/2016", "11/11/2016"]}
          onChange={() => {}}
          {...{ [`${input}DateProps`]: { onFocus: consumerOnFocus } }}
        />,
      );

      await user.click(screen.getByRole("textbox", { name: input }));

      expect(consumerOnFocus).toHaveBeenCalledTimes(1);
    },
  );
});

describe("Standard value", () => {
  it.each(["start", "end"] as const)(
    "shows `value` again in the %s input when the consumer rejects an edit",
    async (input) => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <DateRange
          startLabel="start"
          endLabel="end"
          value={["10/10/2016", "11/11/2016"]}
          onChange={onChange}
        />,
      );

      await user.type(screen.getByRole("textbox", { name: input }), "15");

      expect(onChange).toHaveBeenCalled();
      expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
        "10/10/2016",
      );
      expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
        "11/11/2016",
      );
    },
  );

  it("shows the consumer's corrected value", async () => {
    const user = userEvent.setup();
    const MockComponent = () => {
      const [value, setValue] = React.useState(["10/10/2016", "11/11/2016"]);

      return (
        <DateRange
          startLabel="start"
          endLabel="end"
          value={value}
          onChange={(ev) =>
            setValue([ev.target.value[0].formattedValue, "31/12/2016"])
          }
        />
      );
    };
    render(<MockComponent />);

    await user.clear(screen.getByRole("textbox", { name: "end" }));
    await user.type(screen.getByRole("textbox", { name: "end" }), "1");

    expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
      "31/12/2016",
    );
  });

  it("shows a new `value` passed by the consumer", () => {
    const { rerender } = render(
      <DateRange
        startLabel="start"
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        onChange={() => {}}
      />,
    );

    rerender(
      <DateRange
        startLabel="start"
        endLabel="end"
        value={["2017-01-01", "2017-02-02"]}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
      "01/01/2017",
    );
    expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
      "02/02/2017",
    );
  });
});

describe("Standard form field names", () => {
  it("names the inputs from `name`", () => {
    render(
      <DateRange
        name="booking"
        startLabel="start"
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("textbox", { name: "start" })).toHaveAttribute(
      "name",
      "booking-start",
    );
    expect(screen.getByRole("textbox", { name: "end" })).toHaveAttribute(
      "name",
      "booking-end",
    );
  });

  it("gives `startDateProps.name` and `endDateProps.name` priority", () => {
    render(
      <DateRange
        name="booking"
        startLabel="start"
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        onChange={() => {}}
        startDateProps={{ name: "from" }}
        endDateProps={{ name: "to" }}
      />,
    );

    expect(screen.getByRole("textbox", { name: "start" })).toHaveAttribute(
      "name",
      "from",
    );
    expect(screen.getByRole("textbox", { name: "end" })).toHaveAttribute(
      "name",
      "to",
    );
  });

  it("keeps generated names without `name`", () => {
    render(
      <DateRange
        startLabel="start"
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: "start" }).getAttribute("name"),
    ).not.toMatch(/-start$/);
  });
});

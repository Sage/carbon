import React from "react";
import { render, act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DateRange, { DateRangeChangeEvent } from "./date-range.component";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import CarbonProvider from "../carbon-provider";

testStyledSystemMargin((props) => (
  <DateRange
    value={["10/10/2016", "11/11/2016"]}
    onChange={() => {}}
    {...props}
  />
));

test("should update the input values to match the 'en-GB' locale's format when initialised with valid ISO strings", () => {
  render(
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["2016-10-10", "2016-11-11"]}
      onChange={() => {}}
    />
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
    "10/10/2016"
  );
  expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
    "11/11/2016"
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
    />
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveValue("");
  expect(screen.getByRole("textbox", { name: "end" })).toHaveValue("");
});

test("should call the `onChange` callback with the expected values when the 'start' input changes", async () => {
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
    />
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
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
    />
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
    />
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
    />
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
    />
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
    />
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
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
    />
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
    <DateRange
      startLabel="start"
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onChange={onChange}
      id="foo"
      name="bar"
    />
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
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("textbox", { name: "start" }));
  });
  await act(async () => {
    await user.click(screen.getByRole("textbox", { name: "end" }));
  });

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
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("textbox", { name: "end" }));
  });
  await act(async () => {
    await user.click(screen.getByRole("textbox", { name: "start" }));
  });

  expect(onBlur).not.toHaveBeenCalled();
});

test("should call `onBlur` callback with expected values when user types a value into 'start' input and moves focus away from both inputs", async () => {
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
    />
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
    <DateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />
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
    <DateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
      startDateProps={{ allowEmptyValue: true }}
    />
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
    <DateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
      endDateProps={{ allowEmptyValue: true }}
    />
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
    <DateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />
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
    <DateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />
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
    <DateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />
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
    <DateRange
      startLabel="start"
      onChange={onChange}
      endLabel="end"
      value={["10/10/2016", "11/11/2016"]}
      onBlur={onBlur}
    />
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
    />
  );
  const startDate = screen.getByTestId("start");
  const endDate = screen.getByTestId("end");
  await act(async () => {
    await user.click(screen.getByRole("textbox", { name: "start" }));
  });

  expect(within(startDate).getByRole("grid")).toBeVisible();
  expect(within(endDate).queryByRole("grid")).not.toBeInTheDocument();

  await act(async () => {
    await user.click(screen.getByRole("textbox", { name: "end" }));
  });

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
    />
  );
  const startDate = screen.getByTestId("start");
  const endDate = screen.getByTestId("end");
  await act(async () => {
    await user.click(screen.getByRole("textbox", { name: "end" }));
  });

  expect(within(endDate).getByRole("grid")).toBeVisible();
  expect(within(startDate).queryByRole("grid")).not.toBeInTheDocument();

  await act(async () => {
    await user.click(screen.getByRole("textbox", { name: "start" }));
  });

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
    />
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
    />
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
    />
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveAttribute(
    "readonly"
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
    />
  );

  expect(screen.getByRole("textbox", { name: "end" })).toHaveAttribute(
    "readonly"
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
    />
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
    />
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
    "01/01/2001"
  );
  expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
    "11/11/2016"
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
    />
  );

  expect(screen.getByRole("textbox", { name: "start" })).toHaveValue(
    "10/10/2016"
  );
  expect(screen.getByRole("textbox", { name: "end" })).toHaveValue(
    "01/01/2001"
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
    />
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
    />
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
    />
  );

  expect(screen.getByTestId("start")).toHaveAttribute(
    "data-element",
    "start-date"
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
    />
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
    />
  );

  expect(ref).toHaveBeenCalledWith(
    screen.getByRole("textbox", { name: "start" })
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
    />
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
    />
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
    />
  );

  expect(ref).toHaveBeenCalledWith(
    screen.getByRole("textbox", { name: "end" })
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
    />
  );
  unmount();

  expect(ref.current).toBeNull();
});

test("should only display the start input tooltip when the user hovers over it and both inputs have error strings passed with `validationRedesignOptIn` not set", async () => {
  const user = userEvent.setup();
  render(
    <CarbonProvider>
      <DateRange
        startLabel="start"
        onChange={() => {}}
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        startError="start error"
        endError="end error"
      />
    </CarbonProvider>
  );

  const start = screen.getByRole("textbox", { name: "start" });
  await user.hover(start);
  const startTooltip = screen.getByRole("tooltip", { name: "start error" });
  const endTooltip = screen.queryByRole("tooltip", { name: "end error" });

  expect(startTooltip).toBeVisible();
  expect(endTooltip).not.toBeInTheDocument();
});

test("should only display the end input tooltip when the user hovers over it and both inputs have error strings passed with `validationRedesignOptIn` not set", async () => {
  const user = userEvent.setup();
  render(
    <CarbonProvider>
      <DateRange
        startLabel="start"
        onChange={() => {}}
        endLabel="end"
        value={["10/10/2016", "11/11/2016"]}
        startError="start error"
        endError="end error"
      />
    </CarbonProvider>
  );

  const end = screen.getByRole("textbox", { name: "end" });
  await user.hover(end);
  const tooltips = screen.getAllByRole("tooltip");

  expect(tooltips).toHaveLength(1);
  expect(tooltips[0]).toBeVisible();
  expect(tooltips[0]).toHaveTextContent("end error");
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
    </CarbonProvider>
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
    </CarbonProvider>
  );
  const start = screen.getByTestId("start");
  const end = screen.getByTestId("end");

  expect(within(start).queryByText("start error")).not.toBeInTheDocument();
  expect(within(end).queryByText("end error")).not.toBeInTheDocument();
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
    </CarbonProvider>
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
    </CarbonProvider>
  );
  const start = screen.getByTestId("start");
  const end = screen.getByTestId("end");

  expect(within(start).queryByText("start warning")).not.toBeInTheDocument();
  expect(within(end).queryByText("end warning")).not.toBeInTheDocument();
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
    />
  );

  expect(screen.getByTestId("start")).toHaveStyle("vertical-align: top");
  expect(screen.getByTestId("end")).toHaveStyle("vertical-align: top");
});

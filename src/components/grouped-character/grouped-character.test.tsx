import React, { useState } from "react";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import GroupedCharacter, { CustomEvent } from "./grouped-character.component";
import { testStyledSystemMarginRTL } from "../../__spec_helper__/__internal__/test-utils";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

const ControlledGroupedCharacter = ({
  initialValue,
  onChange,
  onBlur,
  groupsConfig = [2, 2, 4],
  ...props
}: {
  initialValue: string;
  onChange?: (event: CustomEvent) => void;
  onBlur?: (event: CustomEvent) => void;
  groupsConfig?: number[];
}) => {
  const [stateValue, setStateValue] = useState<string>(initialValue);
  return (
    <GroupedCharacter
      separator="-"
      value={stateValue}
      groups={groupsConfig}
      onChange={(ev) => {
        setStateValue(ev.target.value.rawValue);
        onChange?.(ev);
      }}
      onBlur={(ev) => {
        setStateValue(ev.target.value.formattedValue);
        onBlur?.(ev);
      }}
      {...props}
    />
  );
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

testStyledSystemMarginRTL(
  (props) => (
    <GroupedCharacter
      data-role="grouped-character"
      groups={[2, 2, 3]}
      separator="-"
      {...props}
    />
  ),
  () => screen.getByTestId("grouped-character"),
  undefined,
  { modifier: "&&&" },
);

test("deprecation warning for uncontrolled should display warning once", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");

  render(<GroupedCharacter groups={[2, 2, 3]} separator="-" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Grouped Character` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );

  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
  loggerSpy.mockClear();
});

test("when component is uncontrolled, it should set the default input value same as defaultValue provided", () => {
  render(
    <GroupedCharacter
      separator="-"
      defaultValue="aabbcccc"
      groups={[2, 2, 4]}
    />,
  );

  const input = screen.getByRole("textbox");

  expect(input).toHaveValue("aa-bb-cccc");
});

test("when component is uncontrolled, it should invoke the provided onChange handler with the expected value", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();

  render(
    <GroupedCharacter
      separator="-"
      defaultValue="aabbcccc"
      groups={[2, 2, 4]}
      onChange={onChange}
    />,
  );

  await user.type(screen.getByRole("textbox"), "cc-aa-aabb");

  expect(onChange).toHaveBeenLastCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        value: {
          formattedValue: "cc-aa-aabb",
          rawValue: "ccaaaabb",
        },
      }),
    }),
  );
});

test("the component takes configuration for how characters should be grouped", () => {
  render(
    <GroupedCharacter separator="-" value="12345678" groups={[2, 2, 4]} />,
  );

  expect(screen.getByRole("textbox")).toHaveValue("12-34-5678");
});

test("emits a formatted string on change event", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledGroupedCharacter initialValue="" onChange={onChange} />);

  const input = screen.getByRole("textbox");

  await user.click(input);
  await user.clear(input);
  await user.type(input, "123456");

  expect(onChange).toHaveBeenLastCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        value: expect.objectContaining({
          formattedValue: "12-34-56",
          rawValue: "123456",
        }),
      }),
    }),
  );
});

test("invokes provided onChange handler with proper event target name and id if those are provided", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ControlledGroupedCharacter
      initialValue="12345678"
      onChange={(ev) => {
        onChange?.({
          value: ev.target.value,
          id: "unique_id",
          name: "nice_name",
        });
      }}
    />,
  );

  const input = screen.getByRole("textbox");

  await user.click(input);
  await user.clear(input);
  await user.type(input, "1");

  expect(onChange).toHaveBeenLastCalledWith(
    expect.objectContaining({
      id: "unique_id",
      name: "nice_name",
      value: {
        formattedValue: "1",
        rawValue: "1",
      },
    }),
  );
});

test("emits a formatted string on blur event", async () => {
  const onBlur = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ControlledGroupedCharacter
      initialValue="12345678"
      onBlur={(ev) => {
        onBlur?.(ev.target.value);
      }}
    />,
  );

  const input = screen.getByRole("textbox");

  await user.click(input);
  await user.clear(input);
  await user.type(screen.getByRole("textbox"), "123456");
  await user.tab();

  expect(onBlur).toHaveBeenLastCalledWith(
    expect.objectContaining({
      formattedValue: "12-34-56",
      rawValue: "123456",
    }),
  );
});

// coverage
// This test scenario may seem obvious but it is required for coverage
test("does nothing if onBlur is not provided", async () => {
  const onBlur = jest.fn();
  const user = userEvent.setup({ delay: null });

  render(
    <GroupedCharacter
      separator="-"
      value="12345678"
      groups={[2, 2, 4]}
      onBlur={undefined}
    />,
  );

  const input = screen.getByRole("textbox");

  await user.click(input);
  await user.clear(input);
  await user.type(screen.getByRole("textbox"), "123456");
  await user.tab();

  expect(onBlur.mock.calls[0]).toBe(undefined);
});

test("does not allow values of length greater than that allowed by the group config", () => {
  render(
    <GroupedCharacter separator="-" value="1234567890" groups={[2, 2, 4]} />,
  );

  expect(screen.getByRole("textbox")).toHaveValue("12-34-5678");
});

test("does not allow any more characters to be entered when value string is at max length", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledGroupedCharacter initialValue="12-34-5678" />);

  const input = screen.getByRole("textbox");

  await user.click(input);
  await user.clear(input);
  await user.type(input, "123456789");

  expect(input).toHaveValue("12-34-5678");
});

test("pressing backspace after a separating character moves the cursor backwards, if the cursor is positioned at the end of input", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledGroupedCharacter initialValue="" />);

  const input = screen.getByRole("textbox") as HTMLInputElement;

  await user.click(input);
  await user.clear(input);
  await user.type(input, "12-34-");
  input.setSelectionRange(6, 6);
  await user.keyboard("{backspace}");

  expect(input.selectionStart).toBe(4);
  expect(input.selectionEnd).toBe(4);

  await user.click(input);
  await user.clear(input);
  await user.type(input, "12-");
  input.setSelectionRange(3, 3);
  await user.keyboard("{backspace}");

  expect(input.selectionStart).toBe(1);
  expect(input.selectionEnd).toBe(1);
});

test("pressing a character at the point where a separator should appear, moves the cursor forward if the cursor is positioned in the middle of the input value", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledGroupedCharacter initialValue="" />);

  const input = screen.getByRole("textbox") as HTMLInputElement;

  await user.click(input);
  await user.clear(input);
  await user.type(input, "1222");
  input.setSelectionRange(6, 6);
  await user.type(input, "4");

  expect(input.selectionStart).toBe(7);
  expect(input.selectionEnd).toBe(7);
});

test("pressing backspace after a separator moves the cursor backwards two positions", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledGroupedCharacter initialValue="1231231" />);

  const input = screen.getByRole("textbox") as HTMLInputElement;

  await user.click(input);
  await user.keyboard("{arrowLeft}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");

  expect(input.selectionStart).toBe(4);
  expect(input.selectionEnd).toBe(4);

  await user.keyboard("{backspace}");

  expect(input.selectionStart).toBe(2);
  expect(input.selectionEnd).toBe(2);
});

test("adding a character before a separator moves cursor forwards two positions", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledGroupedCharacter initialValue="123123" />);

  const input = screen.getByRole("textbox") as HTMLInputElement;

  await user.click(input);
  await user.keyboard("{arrowLeft}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");

  expect(input.selectionStart).toBe(5);
  expect(input.selectionEnd).toBe(5);

  await user.keyboard("1");

  expect(input.selectionStart).toBe(7);
  expect(input.selectionEnd).toBe(7);
});

// coverage
// This test case may seem obvious but it is required for coverage
test("when no character is present, cursor position goes to 0", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledGroupedCharacter initialValue="" />);

  const input = screen.getByRole("textbox") as HTMLInputElement;

  await user.click(input);

  expect(input.selectionStart).toBe(0);
  expect(input.selectionEnd).toBe(0);
});

test("pressing backspace when the cursor is at one position beyond the separator, the cursor should move one position backwards", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ControlledGroupedCharacter
      initialValue="1234567"
      groupsConfig={[2, 2, 3]}
    />,
  );

  const input = screen.getByRole("textbox") as HTMLInputElement;

  await user.click(input);
  await user.keyboard("{arrowLeft}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");

  expect(input.selectionStart).toBe(8);
  expect(input.selectionEnd).toBe(8);

  await user.keyboard("{backspace}");

  expect(input.selectionStart).toBe(7);
  expect(input.selectionEnd).toBe(7);
});

test("the required prop is passed to the input", () => {
  render(
    <GroupedCharacter
      label="required"
      separator="-"
      value="12345678"
      groups={[2, 2, 4]}
      required
    />,
  );

  expect(screen.getByRole("textbox")).toBeRequired();
});

describe("refs", () => {
  it("accepts ref as a ref object", () => {
    const ref = { current: null };
    render(
      <GroupedCharacter
        separator="-"
        value="12345678"
        groups={[2, 2, 4]}
        ref={ref}
      />,
    );

    expect(ref.current).toBe(screen.getByRole("textbox"));
  });

  it("accepts ref as a ref callback", () => {
    const ref = jest.fn();

    render(
      <GroupedCharacter
        separator="-"
        value="12345678"
        groups={[2, 2, 4]}
        ref={ref}
      />,
    );

    expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
  });

  it("sets ref to empty after unmount", () => {
    const ref = { current: null };

    const { unmount } = render(
      <GroupedCharacter
        separator="-"
        value="12345678"
        groups={[2, 2, 4]}
        ref={ref}
      />,
    );

    unmount();

    expect(ref.current).toBe(null);
  });
});

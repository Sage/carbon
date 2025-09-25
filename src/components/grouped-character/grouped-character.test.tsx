import React, { useState } from "react";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import GroupedCharacter, { CustomEvent } from "./grouped-character.component";
import {
  testStyledSystemMargin,
  assertDeprecationWarning,
} from "../../__spec_helper__/__internal__/test-utils";

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

test("displays a deprecation warning when used", () => {
  assertDeprecationWarning({
    component: (
      <ControlledGroupedCharacter
        data-role="grouped-character"
        groupsConfig={[2, 2, 3]}
        initialValue="12345678"
      />
    ),
    deprecationMessage: `The GroupedCharacter component is deprecated and will soon be removed.`,
  });
});

testStyledSystemMargin(
  (props) => {
    return (
      <ControlledGroupedCharacter
        data-role="grouped-character"
        groupsConfig={[2, 2, 3]}
        initialValue="12345678"
        {...props}
      />
    );
  },
  () => screen.getByTestId("grouped-character"),
  { modifier: "&&&" },
);

test("should render with the provided data- attributes", () => {
  render(
    <GroupedCharacter
      data-element="bar"
      data-role="baz"
      groups={[2, 2, 3]}
      separator="-"
      value=""
      onChange={() => {}}
    />,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

test("the component takes configuration for how characters should be grouped", () => {
  render(
    <GroupedCharacter
      separator="-"
      value="12345678"
      groups={[2, 2, 4]}
      onChange={() => {}}
    />,
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
      onChange={() => {}}
    />,
  );

  const input = screen.getByRole("textbox");

  await user.click(input);
  await user.clear(input);
  await user.type(screen.getByRole("textbox"), "123456");
  await user.tab();

  expect(onBlur.mock.calls[0]).toBe(undefined);
});

test("calls provided onKeyDown handler", async () => {
  const onKeyDown = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <GroupedCharacter
      separator="-"
      value="12345678"
      groups={[2, 2, 4]}
      onKeyDown={onKeyDown}
      onChange={() => {}}
    />,
  );

  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.clear(input);
  await user.type(screen.getByRole("textbox"), "123456");

  expect(onKeyDown).toHaveBeenCalledTimes(6);
});

test("does not allow values of length greater than that allowed by the group config", () => {
  render(
    <GroupedCharacter
      separator="-"
      value="1234567890"
      onChange={() => {}}
      groups={[2, 2, 4]}
    />,
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

test("pressing backspace after a separator moves the cursor backwards one position", async () => {
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

  expect(input.selectionStart).toBe(3);
  expect(input.selectionEnd).toBe(3);
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

test("pressing delete when the cursor is at one position before the separator, should move the cursor one position forward", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledGroupedCharacter initialValue="1234567" />);

  const input = screen.getByRole("textbox") as HTMLInputElement;

  await user.click(input);
  await user.keyboard("{arrowLeft}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");

  expect(input.selectionStart).toBe(2);
  expect(input.selectionEnd).toBe(2);
  expect(input).toHaveValue("12-34-567");

  await user.keyboard("{Delete}");

  expect(input.selectionStart).toBe(3);
  expect(input.selectionEnd).toBe(3);
  expect(input).toHaveValue("12-34-567");
});

test("pressing delete when the cursor is at one position after the separator, should keep the cursor in the same position", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledGroupedCharacter initialValue="1234567" />);

  const input = screen.getByRole("textbox") as HTMLInputElement;

  await user.click(input);
  await user.keyboard("{arrowLeft}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");
  await user.keyboard("{arrowRight}");

  expect(input.selectionStart).toBe(3);
  expect(input.selectionEnd).toBe(3);
  expect(input).toHaveValue("12-34-567");

  await user.keyboard("{Delete}");

  expect(input.selectionStart).toBe(3);
  expect(input.selectionEnd).toBe(3);
  expect(input).toHaveValue("12-45-67");
});

test("the required prop is passed to the input", () => {
  render(
    <GroupedCharacter
      label="required"
      separator="-"
      value="12345678"
      groups={[2, 2, 4]}
      required
      onChange={() => {}}
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
        onChange={() => {}}
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
        onChange={() => {}}
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
        onChange={() => {}}
        groups={[2, 2, 4]}
        ref={ref}
      />,
    );

    unmount();

    expect(ref.current).toBe(null);
  });
});

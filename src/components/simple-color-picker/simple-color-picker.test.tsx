import React, { useEffect, useRef } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SimpleColor, SimpleColorPicker } from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test("should display deprecation warning once when rendered as uncontrolled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<SimpleColorPicker legend="uncontrolled" name="uncontrolled" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Simple Color Picker` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockClear();
});

testStyledSystemMargin(
  (props) => (
    <SimpleColorPicker legend="SimpleColorPicker Legend" name="test" {...props}>
      <SimpleColor id="foo" key="bar" value="#00A376" defaultChecked />
    </SimpleColorPicker>
  ),
  () => screen.getByRole("radiogroup"),
);

test("the `onKeyDown` callback prop is called when the user presses a key", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onKeyDown = jest.fn();
  render(
    <SimpleColorPicker
      onKeyDown={onKeyDown}
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  screen.getAllByRole("radio")[0].focus();
  await user.keyboard("a");

  expect(onKeyDown).toHaveBeenCalledTimes(1);
  expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: "a" }));
});

test("when the `defaultChecked` prop is set on one of the `SimpleColor` children, the corresponding input is checked", () => {
  render(
    <SimpleColorPicker legend="SimpleColorPicker Legend" name="test">
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" defaultChecked />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  // an error is thrown for using toHaveValue on a radio button, so we need to directly check the `value` attribute
  // eslint-disable-next-line jest-dom/prefer-to-have-value
  expect(screen.getByRole("radio", { checked: true })).toHaveAttribute(
    "value",
    "#0073C1",
  );
});

test("the `data-down` attribute is set to `false` for colors on the bottom row, and `true` for all others", () => {
  render(
    <SimpleColorPicker
      maxWidth="100"
      childWidth="40"
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
      <SimpleColor value="#ABCDEF" />
      <SimpleColor value="#654321" />
      <SimpleColor value="#BADA44" />
    </SimpleColorPicker>,
  );

  expect(screen.getAllByRole("radio")[0]).toHaveAttribute("data-down", "true");
  expect(screen.getAllByRole("radio")[1]).toHaveAttribute("data-down", "true");
  expect(screen.getAllByRole("radio")[2]).toHaveAttribute("data-down", "true");
  expect(screen.getAllByRole("radio")[3]).toHaveAttribute("data-down", "true");
  expect(screen.getAllByRole("radio")[4]).toHaveAttribute("data-down", "false");
  expect(screen.getAllByRole("radio")[5]).toHaveAttribute("data-down", "false");
});

test("pressing the left arrow key when focused on the first color changes selection to the last color", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <SimpleColorPicker
      onChange={onChange}
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  screen.getAllByRole("radio")[0].focus();
  await user.keyboard("{ArrowLeft}");

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: "#582C83" }),
    }),
  );
  expect(screen.getAllByRole("radio")[2]).toHaveFocus();
});

test("pressing the right arrow key changes selection to the next color", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <SimpleColorPicker
      onChange={onChange}
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  screen.getAllByRole("radio")[1].focus();
  await user.keyboard("{ArrowRight}");

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: "#582C83" }),
    }),
  );
  expect(screen.getAllByRole("radio")[2]).toHaveFocus();
});

test("pressing the right arrow key when focused on the last color changes selection to the first color", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <SimpleColorPicker
      onChange={onChange}
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  screen.getAllByRole("radio")[2].focus();
  await user.keyboard("{ArrowRight}");

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: "#00A376" }),
    }),
  );
  expect(screen.getAllByRole("radio")[0]).toHaveFocus();
});

test("when the input has multiple rows, pressing the up arrow key changes selection to the color immediately above", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <SimpleColorPicker
      onChange={onChange}
      maxWidth="100"
      childWidth="100"
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  screen.getAllByRole("radio")[1].focus();
  await user.keyboard("{ArrowUp}");

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: "#00A376" }),
    }),
  );
  expect(screen.getAllByRole("radio")[0]).toHaveFocus();
});

test("when focus is already on the top row, pressing the up arrow key does not change selection", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <SimpleColorPicker
      onChange={onChange}
      maxWidth="100"
      childWidth="40"
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  screen.getAllByRole("radio")[1].focus();
  await user.keyboard("{ArrowUp}");

  expect(onChange).not.toHaveBeenCalled();
  expect(screen.getAllByRole("radio")[1]).toHaveFocus();
});

test("when the input has multiple rows, pressing the down arrow key changes selection to the color immediately below", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <SimpleColorPicker
      onChange={onChange}
      maxWidth="100"
      childWidth="100"
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  screen.getAllByRole("radio")[1].focus();
  await user.keyboard("{ArrowDown}");

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: "#582C83" }),
    }),
  );
  expect(screen.getAllByRole("radio")[2]).toHaveFocus();
});

test("when focus is already on the bottom row, pressing the down arrow key does not change selection", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <SimpleColorPicker
      onChange={onChange}
      maxWidth="100"
      childWidth="40"
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
      <SimpleColor value="#ABCDEF" />
    </SimpleColorPicker>,
  );

  screen.getAllByRole("radio")[3].focus();
  await user.keyboard("{ArrowDown}");

  expect(onChange).not.toHaveBeenCalled();
  expect(screen.getAllByRole("radio")[3]).toHaveFocus();
});

test("focus is not changed if a non-arrow key is pressed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <SimpleColorPicker
      onChange={onChange}
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  screen.getAllByRole("radio")[0].focus();
  await user.keyboard("{Control}");

  expect(onChange).not.toHaveBeenCalled();
  expect(screen.getAllByRole("radio")[0]).toHaveFocus();
});

test("the `onBlur` callback prop should not be called if focus moves from one color input to another", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onBlur = jest.fn();
  render(
    <SimpleColorPicker
      onBlur={onBlur}
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  await user.click(screen.getAllByRole("radio")[0]);
  await user.click(screen.getAllByRole("radio")[1]);
  jest.runAllTimers();

  expect(onBlur).not.toHaveBeenCalled();
});

// mostly kept for coverage - it's not clear what value this particular test really provides
test("the `onBlur` callback prop should not be called if the currently-focused color input is clicked", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onBlur = jest.fn();
  render(
    <SimpleColorPicker
      onBlur={onBlur}
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  await user.click(screen.getAllByRole("radio")[0]);
  await user.click(screen.getAllByRole("radio")[0]);
  jest.runAllTimers();

  expect(onBlur).not.toHaveBeenCalled();
});

test("the `onBlur` callback prop should be called if an input is blurred by clicking outside the component", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onBlur = jest.fn();
  render(
    <SimpleColorPicker
      onBlur={onBlur}
      legend="SimpleColorPicker Legend"
      name="test"
    >
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  await user.click(screen.getAllByRole("radio")[0]);
  await user.click(document.body);

  await waitFor(() => {
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
  expect(onBlur).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: "#00A376" }),
    }),
  );
});

test("validates the incorrect children prop", () => {
  const consoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => {});

  expect(() => {
    render(
      <SimpleColorPicker name="test" legend="SimpleColorPicker Legend">
        <p>Invalid children</p>
        <p>Invalid children</p>
      </SimpleColorPicker>,
    );
  }).toThrow("SimpleColorPicker accepts only children of type `SimpleColor`.");

  consoleSpy.mockRestore();
});

test("returns a list of inputs in the ref", () => {
  let outsideRef;

  const MockComponent = () => {
    const simpleColorPickerData = useRef<{
      gridItemRefs: Array<HTMLInputElement | null>;
    }>(null);

    useEffect(() => {
      outsideRef = simpleColorPickerData.current;
    }, []);

    return (
      <SimpleColorPicker
        ref={simpleColorPickerData}
        legend="SimpleColorPicker Legend"
        name="test"
      >
        <SimpleColor value="#00A376" />
        <SimpleColor value="#0073C1" />
        <SimpleColor value="#582C83" />
      </SimpleColorPicker>
    );
  };

  render(<MockComponent />);
  const inputs = screen.getAllByRole("radio");

  expect(outsideRef).toEqual(
    expect.objectContaining({
      gridItemRefs: expect.arrayContaining(inputs),
    }),
  );
});

test("the `required` prop is passed to the inputs", () => {
  render(
    <SimpleColorPicker required legend="SimpleColorPicker Legend" name="test">
      <SimpleColor value="#00A376" />
      <SimpleColor value="#0073C1" />
      <SimpleColor value="#582C83" />
    </SimpleColorPicker>,
  );

  screen.getAllByRole("radio").forEach((input) => {
    expect(input).toBeRequired();
  });
});

test("empty children are accepted without error", () => {
  expect(() => {
    render(
      <SimpleColorPicker name="test" legend="SimpleColorPicker Legend">
        {null}
        {false}
        {undefined}
      </SimpleColorPicker>,
    );
  }).not.toThrow();
});

test("should display deprecation warning once when the `isBlurBlocked` prop is `true`", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(
    <SimpleColorPicker
      isBlurBlocked
      legend="SimpleColorPicker Legend"
      name="test"
    />,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "The 'isBlurBlocked' prop in SimpleColorPicker is deprecated and support will soon be removed.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockClear();
});

// for coverage only (validation styles covered by Playwright)
test.each(["error", "warning", "info"])(
  "renders validation icon when `%s` prop is passed as string and `validationOnLegend` is `true`",
  (type) => {
    render(
      <SimpleColorPicker
        {...{ [type]: "Message" }}
        validationOnLegend
        legend="SimpleColorPicker Legend"
        name="test"
      />,
    );

    expect(
      within(screen.getByRole("radiogroup")).getByTestId(`icon-${type}`),
    ).toBeVisible();
  },
);

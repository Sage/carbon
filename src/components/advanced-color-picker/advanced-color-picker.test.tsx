import React, { useState } from "react";
import userEvent from "@testing-library/user-event";
import { act, render, screen, waitFor } from "@testing-library/react";
import AdvancedColorPicker, {
  AdvancedColorPickerProps,
} from "./advanced-color-picker.component";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

const ControlledColorPicker = (props: Partial<AdvancedColorPickerProps>) => {
  const [color, setColor] = useState<string>("");

  return (
    <AdvancedColorPicker
      name="advancedPicker"
      availableColors={[
        { value: "#FFFFFF", label: "white" },
        { value: "transparent", label: "transparent" },
        { value: "#000000", label: "black" },
        { value: "#A3CAF0", label: "blue" },
        { value: "#FD9BA3", label: "pink" },
        { value: "#B4AEEA", label: "purple" },
        { value: "#ECE6AF", label: "goldenrod" },
        { value: "#EBAEDE", label: "orchid" },
        { value: "#EBC7AE", label: "desert" },
        { value: "#AEECEB", label: "turquoise" },
        { value: "#AEECD6", label: "mint" },
      ]}
      selectedColor={color}
      onChange={(event) => setColor(event.target.value)}
      {...props}
    />
  );
};

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

testStyledSystemMargin(
  (props) => (
    <ControlledColorPicker
      data-role="advanced-color-picker-wrapper"
      name="advancedPicker"
      open
      {...props}
    />
  ),
  () => screen.getByTestId("advanced-color-picker-wrapper"),
);

test("when the main button is clicked, the dialog opens and the onOpen callback is called", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  const onOpen = jest.fn();

  render(<ControlledColorPicker onOpen={onOpen} />);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(onOpen).not.toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: "Change colour" }));

  expect(await screen.findByRole("dialog")).toBeVisible();
  expect(onOpen).toHaveBeenCalledTimes(1);
});

test.each([
  ["enter", "{Enter}"],
  ["space", " "],
])("when the %s key is pressed, the dialog should open", async (_, keyCode) => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<ControlledColorPicker />);
  screen.getByRole("button", { name: "Change colour" }).focus();
  await user.keyboard(keyCode);
  expect(await screen.findByRole("dialog")).toBeVisible();
});

test.each(["a", "b", "q", "t", "x", "4", "0"])(
  "when the %s key is pressed, the dialog should not open",
  async (key) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ControlledColorPicker />);
    screen.getByRole("button", { name: "Change colour" }).focus();
    await user.keyboard(key);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  },
);

test("the accessible description of the button includes the name of the currently selected color when none is selected", () => {
  render(<ControlledColorPicker selectedColor="#EBAEDE" />);

  expect(
    screen.getByRole("button", { name: "Change colour" }),
  ).toHaveAccessibleDescription("Current colour assigned: orchid");
});

test.each([
  { value: "#FFFFFF", label: "white" },
  { value: "transparent", label: "transparent" },
  { value: "#000000", label: "black" },
  { value: "#A3CAF0", label: "blue" },
  { value: "#FD9BA3", label: "pink" },
  { value: "#B4AEEA", label: "purple" },
  { value: "#ECE6AF", label: "goldenrod" },
  { value: "#EBAEDE", label: "orchid" },
  { value: "#EBC7AE", label: "desert" },
  { value: "#AEECEB", label: "turquoise" },
  { value: "#AEECD6", label: "mint" },
])(
  "the accessible description of the button includes the name of the currently selected color after the user selects $label as a new color",
  async ({ label }) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<ControlledColorPicker />);
    await user.click(screen.getByRole("button", { name: "Change colour" }));
    await user.click(screen.getByRole("radio", { name: label }));
    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(
      screen.getByRole("button", { name: "Change colour" }),
    ).toHaveAccessibleDescription(`Current colour assigned: ${label}`);
  },
);

test("the button has the correct background color matching the initially-selected color", () => {
  render(<ControlledColorPicker selectedColor="#EBAEDE" />);

  expect(screen.getByRole("button", { name: "Change colour" })).toHaveStyle({
    backgroundColor: "#EBAEDE",
  });
});

test.each([
  { value: "#FFFFFF", label: "white" },
  { value: "#000000", label: "black" },
  { value: "#A3CAF0", label: "blue" },
  { value: "#FD9BA3", label: "pink" },
  { value: "#B4AEEA", label: "purple" },
  { value: "#ECE6AF", label: "goldenrod" },
  { value: "#EBAEDE", label: "orchid" },
  { value: "#EBC7AE", label: "desert" },
  { value: "#AEECEB", label: "turquoise" },
  { value: "#AEECD6", label: "mint" },
])(
  "the button has the correct background color after the user selects $label as a new color",
  async ({ value, label }) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<ControlledColorPicker />);
    await user.click(screen.getByRole("button", { name: "Change colour" }));
    await user.click(screen.getByRole("radio", { name: label }));
    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.getByRole("button", { name: "Change colour" })).toHaveStyle({
      backgroundColor: value,
    });
  },
);

test("the button has the correct background image after the user selects the transparent color", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledColorPicker />);
  await user.click(screen.getByRole("button", { name: "Change colour" }));
  await user.click(screen.getByRole("radio", { name: "transparent" }));
  await user.click(screen.getByRole("button", { name: "Close" }));

  const transparentSvg =
    "%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%" +
    "2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20fill-opacity%3D%22." +
    "45%22%3E%3Crect%20x%3D%22200%22%20width%3D%22200%22%20height%3D%22200%22%20%2" +
    "F%3E%3Crect%20y%3D%22200%22%20width%3D%22200%22%20height%3D%22200%22%20%2F%3E%3C%2Fsvg%3E";

  expect(screen.getByRole("button", { name: "Change colour" })).toHaveStyle({
    backgroundImage: `#eee url("data:image/svg+xml,${transparentSvg}")`,
  });
});

test("when the close button is clicked, the dialog is closed and the onClose callback function is called", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  const onClose = jest.fn();

  render(<ControlledColorPicker onClose={onClose} />);
  await user.click(screen.getByRole("button", { name: "Change colour" }));
  expect(await screen.findByRole("dialog")).toBeVisible();
  expect(onClose).not.toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: "Close" }));
  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeVisible();
  });
  expect(onClose).toHaveBeenCalledTimes(1);
});

test.each([
  ["enter", "{Enter}"],
  ["space", " "],
])(
  "when the %s key is pressed on a color input with the dialog open, the dialog should close",
  async (_, keyCode) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<ControlledColorPicker />);

    await user.click(screen.getByRole("button", { name: "Change colour" }));
    expect(await screen.findByRole("dialog")).toBeVisible();

    act(() => {
      screen.getByRole("radio", { name: "pink" }).focus();
    });
    await user.keyboard(keyCode);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
);

test.each(["a", "b", "q", "t", "x", "4", "0"])(
  "when the %s key is pressed on a color input with the dialog open, the dialog should not close",
  async (key) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<ControlledColorPicker />);

    await user.click(screen.getByRole("button", { name: "Change colour" }));
    expect(await screen.findByRole("dialog")).toBeVisible();

    act(() => {
      screen.getByRole("radio", { name: "pink" }).focus();
    });
    await user.keyboard(key);
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByRole("dialog")).toBeVisible();
  },
);

test("tabbing from the close button should focus the selected color input", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledColorPicker selectedColor="#EBAEDE" />);
  await user.click(screen.getByRole("button", { name: "Change colour" }));

  act(() => {
    screen.getByRole("button", { name: "Close" }).focus();
  });
  await user.keyboard("{Tab}");

  expect(screen.getByRole("radio", { name: "orchid" })).toHaveFocus();
});

test("tabbing from a color input should focus the close button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledColorPicker selectedColor="#EBAEDE" />);
  await user.click(screen.getByRole("button", { name: "Change colour" }));

  await waitFor(() => {
    expect(screen.getByRole("radio", { name: "orchid" })).toHaveFocus();
  });

  await user.keyboard("{Tab}");
  expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
});

test("shift-tabbing from the close button should focus the selected color input", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledColorPicker selectedColor="#EBAEDE" />);
  await user.click(screen.getByRole("button", { name: "Change colour" }));

  act(() => {
    screen.getByRole("button", { name: "Close" }).focus();
  });
  await user.keyboard("{Shift>}{Tab}");
  expect(screen.getByRole("radio", { name: "orchid" })).toHaveFocus();
});

test("shift-tabbing from a color input should focus the close button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<ControlledColorPicker selectedColor="#EBAEDE" />);
  await user.click(screen.getByRole("button", { name: "Change colour" }));

  await waitFor(() => {
    expect(screen.getByRole("radio", { name: "orchid" })).toHaveFocus();
  });

  await user.keyboard("{Shift>}{Tab}");
  expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
});

test("when a color input is clicked, it triggers the onChange callback", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  const onChange = jest.fn();

  render(
    <ControlledColorPicker selectedColor="#EBAEDE" open onChange={onChange} />,
  );

  expect(onChange).not.toHaveBeenCalled();

  await user.click(screen.getByRole("radio", { name: "pink" }));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange.mock.calls[0][0].target).toHaveAccessibleName("pink");
});

test("when the user closes the component, it does trigger the onBlur callback", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  const onBlur = jest.fn();

  render(<ControlledColorPicker selectedColor="#EBAEDE" onBlur={onBlur} />);
  await user.click(screen.getByRole("button", { name: "Change colour" }));

  expect(onBlur).not.toHaveBeenCalled();
  await user.click(screen.getByRole("radio", { name: "white" }));

  expect(await screen.findByRole("radio", { name: "white" })).toHaveFocus();

  await user.click(screen.getByRole("button", { name: "Close" }));
  act(() => {
    jest.runAllTimers();
  });

  expect(onBlur).toHaveBeenCalledTimes(1);
  expect(onBlur.mock.calls[0][0].target).toHaveAccessibleName("white");
});

test("when another color input is clicked, it does not trigger the onBlur callback", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  const onBlur = jest.fn();

  render(<ControlledColorPicker selectedColor="#EBAEDE" onBlur={onBlur} />);
  await user.click(screen.getByRole("button", { name: "Change colour" }));

  expect(onBlur).not.toHaveBeenCalled();
  await user.click(screen.getByRole("radio", { name: "white" }));

  expect(await screen.findByRole("radio", { name: "white" })).toHaveFocus();

  await user.click(screen.getByRole("radio", { name: "pink" }));
  act(() => {
    jest.runAllTimers();
  });

  expect(onBlur).toHaveBeenCalledTimes(0);
});

test("when the 'open' prop is true, the dialog is open on mount", async () => {
  render(<ControlledColorPicker open />);

  expect(await screen.findByRole("dialog")).toBeVisible();
});

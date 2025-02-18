import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Password from "./password.component";
import guid from "../../__internal__/utils/helpers/guid";

const mockedGuid = "guid-12345";
jest.mock("../../__internal__/utils/helpers/guid");

(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

test("should render a text input with type 'password'", () => {
  render(<Password label="password" />);

  const passwordInput = screen.getByLabelText("password");
  expect(passwordInput).toBeVisible();
  expect(passwordInput).toHaveAttribute("type", "password");
});

test("should render a `Show password` button", () => {
  render(<Password />);

  const showPasswordButton = screen.getByRole("button", {
    name: "Show password",
  });
  expect(showPasswordButton).toBeVisible();
});

test("should change the text input type from 'password' to 'text' when the `Show password` button is clicked", async () => {
  render(<Password label="password" />);

  const user = userEvent.setup();
  const showPasswordButton = screen.getByRole("button", {
    name: "Show password",
  });
  await user.click(showPasswordButton);
  const passwordInput = screen.getByLabelText("password");

  expect(passwordInput).toHaveAttribute("type", "text");
});

test("should render the aria-live region with hidden announcement text", () => {
  render(<Password />);

  const liveRegion = screen.getByRole("status");
  expect(liveRegion).toHaveTextContent("Your password is currently hidden.");
});

test("should change the aria-live region announcement text from hidden to shown when the `Show password` button is clicked", async () => {
  render(<Password />);

  const user = userEvent.setup();
  const showPasswordButton = screen.getByRole("button", {
    name: "Show password",
  });
  await user.click(showPasswordButton);
  const liveRegion = screen.getByRole("status");

  expect(liveRegion).toHaveTextContent(
    "Your password has been shown. Focus on the password input to have it read to you, if it is safe to do so.",
  );
});

test("should render the aria-live region as visually hidden but available in the accessibility tree", () => {
  render(<Password />);

  const liveRegion = screen.getByRole("status");
  expect(liveRegion).toBeInTheDocument();
  expect(liveRegion).toHaveStyle({
    border: "0",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
  });
});

test("should render the text input with 'autoComplete' attribute set to 'off'", () => {
  render(<Password label="password" />);

  const passwordInput = screen.getByLabelText("password");
  expect(passwordInput).toHaveAttribute("autocomplete", "off");
});

test("should render the text input as disabled when the `disabled` prop is `true`", () => {
  render(<Password label="password" disabled />);

  const passwordInput = screen.getByLabelText("password");
  expect(passwordInput).toBeDisabled();
});

test("should render the text input with type 'password' when the `forceObscurity` prop is `true`", () => {
  render(<Password label="password" forceObscurity />);

  const passwordInput = screen.getByLabelText("password");
  expect(passwordInput).toHaveAttribute("type", "password");
});

test("should set the text input's 'id' attribute to the passed `id` prop value", () => {
  render(<Password label="password" id="1973" />);

  const passwordInput = screen.getByLabelText("password");
  expect(passwordInput).toHaveAttribute("id", "1973");
});

test("should generate the text input's 'id' attribute via a guid when the `id` prop is not passed", () => {
  render(<Password label="password" />);

  const passwordInput = screen.getByLabelText("password");
  expect(passwordInput).toHaveAttribute("id", mockedGuid);
});

test("should render with provided data- attributes", () => {
  render(<Password label="password" data-role="bar" data-element="baz" />);

  expect(screen.getByTestId("bar")).toHaveAttribute("data-element", "baz");
});

describe("Show/Hide password Button", () => {
  test("should render the `Show password` button icon with type 'view' initially", () => {
    render(<Password />);

    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("type", "view");
  });

  test("should change the icon type from 'view' to 'hide' when clicked", async () => {
    render(<Password />);

    const user = userEvent.setup();
    const showPasswordButton = screen.getByRole("button", {
      name: "Show password",
    });
    await user.click(showPasswordButton);
    const icon = screen.getByTestId("icon");

    expect(icon).toHaveAttribute("type", "hide");
  });

  test("should render the `Show Password` button with text 'Show' initially", () => {
    render(<Password />);

    const showPasswordButton = screen.getByRole("button", {
      name: "Show password",
    });
    expect(showPasswordButton).toHaveTextContent("Show");
  });

  test("should change the text from 'Show' to 'Hide' when clicked", async () => {
    render(<Password />);

    const user = userEvent.setup();
    const showPasswordButton = screen.getByRole("button", {
      name: "Show password",
    });
    await user.click(showPasswordButton);

    expect(showPasswordButton).toHaveTextContent("Hide");
  });

  test("should render the `Show password` button with an 'aria-label' of 'Show password' initially", () => {
    render(<Password />);

    const showPasswordButton = screen.getByRole("button", {
      name: "Show password",
    });
    expect(showPasswordButton).toHaveAccessibleName("Show password");
  });

  test("should change the 'aria-label' from 'Show password' to 'Hide password' when clicked", async () => {
    render(<Password />);

    const user = userEvent.setup();
    const showPasswordButton = screen.getByRole("button", {
      name: "Show password",
    });
    await user.click(showPasswordButton);

    expect(showPasswordButton).toHaveAccessibleName("Hide password");
  });

  test("should render the `Show password` button with 'aria-controls' attribute set to the input's 'id'", () => {
    render(<Password id="1973" />);

    const showPasswordButton = screen.getByRole("button", {
      name: "Show password",
    });
    expect(showPasswordButton).toHaveAttribute("aria-controls", "1973");
  });

  test("should render the `Show password` button as disabled when the `disabled` prop is `true`", () => {
    render(<Password disabled />);

    const showPasswordButton = screen.getByRole("button", {
      name: "Show password",
    });
    expect(showPasswordButton).toBeDisabled();
  });

  test("should render the `Show password` button as disabled when the `forceObscurity` prop is `true`", () => {
    render(<Password forceObscurity />);

    const showPasswordButton = screen.getByRole("button", {
      name: "Show password",
    });
    expect(showPasswordButton).toBeDisabled();
  });
});

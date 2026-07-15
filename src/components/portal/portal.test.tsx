import React from "react";
import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Portal from ".";

import guid from "../../__internal__/utils/helpers/guid";

const mockedGuid = "guid-12345";
jest.mock("../../__internal__/utils/helpers/guid");

(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

test("renders a portal entrance and exit with a unique matching ID", () => {
  render(<Portal />);

  const portalEntrance = screen.getByTestId("data-portal-entrance");
  const portalExit = screen.getByTestId("carbon-portal-exit");

  expect(portalEntrance).toHaveAttribute("data-portal-entrance", mockedGuid);
  expect(portalExit).toHaveAttribute("data-portal-exit", mockedGuid);
});

test("renders children within portal exit", () => {
  render(<Portal>Children</Portal>);

  const portalExit = screen.getByTestId("carbon-portal-exit");
  const children = within(portalExit).getByText("Children");

  expect(children).toBeInTheDocument();
});

test("renders with the 'class' attribute on the portal exit, via the `className` prop", () => {
  const className = "foo";
  render(<Portal className={className} />);

  const portalExit = screen.getByTestId("carbon-portal-exit");
  expect(portalExit).toHaveClass(`carbon-portal ${className}`);
});

test("renders with the 'id' attribute on the portal exit, via the `id` prop", () => {
  render(<Portal id="1973" />);

  const portalExit = screen.getByTestId("carbon-portal-exit");
  expect(portalExit).toHaveAttribute("id", "1973");
});

test("renders one portal exit parent which contains all passed children, when multiple `Portal`'s are rendered with matching 'id' attributes", () => {
  render(
    <>
      <Portal id="foo">Portal Content</Portal>
      <Portal id="foo">Portal Content</Portal>
    </>,
  );

  const portalExit = screen.getAllByTestId("carbon-portal-exit");
  const portalContent = screen.getAllByText("Portal Content");
  expect(portalExit).toHaveLength(1);
  expect(portalContent).toHaveLength(2);
});

test("allows a custom function to be triggered via the `onReposition` prop on window resize", () => {
  const repositionMock = jest.fn();
  render(<Portal onReposition={repositionMock} />);

  fireEvent(window, new Event("resize"));
  expect(repositionMock).toHaveBeenCalled();
});

test("renders with the 'data-not-inert' attribute set to true on the portal exit, when the `inertOptOut` prop is true", () => {
  render(<Portal inertOptOut />);

  const portalExit = screen.getByTestId("carbon-portal-exit");
  expect(portalExit).toHaveAttribute("data-not-inert", "true");
});

test("copies the nearest ancestor's data-carbon-theme onto the portal exit", async () => {
  render(
    <div data-carbon-theme="dark">
      <Portal id="themed">Children</Portal>
    </div>,
  );

  const portalExit = screen.getByTestId("carbon-portal-exit");
  await waitFor(() => {
    expect(portalExit).toHaveAttribute("data-carbon-theme", "dark");
  });
});

test("updates portal theme when nearest themed ancestor changes", async () => {
  const ThemedHost = () => {
    const [theme, setTheme] = React.useState("light");

    return (
      <div data-carbon-theme={theme}>
        <button onClick={() => setTheme("dark")}>toggle theme</button>
        <Portal id="themed">Children</Portal>
      </div>
    );
  };

  const { unmount } = render(<ThemedHost />);

  const portalExit = screen.getByTestId("carbon-portal-exit");
  const toggle = screen.getByRole("button", { name: "toggle theme" });

  await waitFor(() => {
    expect(portalExit).toHaveAttribute("data-carbon-theme", "light");
  });

  fireEvent.click(toggle);

  await waitFor(() => {
    expect(portalExit).toHaveAttribute("data-carbon-theme", "dark");
  });

  const scopedProvider = within(portalExit).getByTestId(
    "carbon-portal-scoped-tokens-provider",
  );

  expect(scopedProvider).toHaveAttribute("data-carbon-theme", "dark");

  unmount();
});

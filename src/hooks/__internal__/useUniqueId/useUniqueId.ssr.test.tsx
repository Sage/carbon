import React from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { act, screen } from "@testing-library/react";
import useUniqueId from ".";

const MockComponent = () => {
  const [id, name] = useUniqueId();
  return <input id={id} name={name} />;
};

test("server and first client render use the same generated id and name", () => {
  const view = renderToString(<MockComponent />);
  const container = document.createElement("div");
  container.innerHTML = view; // eslint-disable-line no-unsanitized/property
  document.body.appendChild(container);

  const serverInput = screen.getByRole("textbox");
  const serverId = serverInput.getAttribute("id");
  const serverName = serverInput.getAttribute("name");

  expect(serverId).toBeTruthy();
  expect(serverName).toBeTruthy();

  const recoverableErrors: unknown[] = [];
  const consoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
  const consoleWarn = jest.spyOn(console, "warn").mockImplementation(() => {});

  let root: ReturnType<typeof hydrateRoot>;

  act(() => {
    root = hydrateRoot(container, <MockComponent />, {
      onRecoverableError: (error) => recoverableErrors.push(error),
    });
  });

  expect(recoverableErrors).toEqual([]);
  expect(consoleError).not.toHaveBeenCalled();
  expect(consoleWarn).not.toHaveBeenCalled();

  const clientInput = screen.getByRole("textbox");
  expect(clientInput).toHaveAttribute("id", serverId);
  expect(clientInput).toHaveAttribute("name", serverName);

  act(() => root.unmount());
  document.body.removeChild(container);
});

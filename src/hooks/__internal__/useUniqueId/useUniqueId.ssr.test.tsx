import React from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import useUniqueId from ".";

const MockComponent = () => {
  const [id, name] = useUniqueId();
  return <input id={id} name={name} />;
};

afterEach(() => {
  jest.restoreAllMocks();
});

test("server and first client render use the same generated id and name", () => {
  const html = renderToString(<MockComponent />);
  const container = document.createElement("div");
  container.innerHTML = html;

  const serverId = container.querySelector("input")?.getAttribute("id");
  const serverName = container.querySelector("input")?.getAttribute("name");

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
  expect(container.querySelector("input")).toHaveAttribute("id", serverId);
  expect(container.querySelector("input")).toHaveAttribute("name", serverName);

  act(() => root.unmount());
});

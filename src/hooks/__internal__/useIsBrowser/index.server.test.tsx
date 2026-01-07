import React from "react";
import useIsBrowser from ".";
import { renderToString } from "react-dom/server";

const MockComponent = () => {
  const { isBrowser } = useIsBrowser();
  return <p>{isBrowser && "isBrowser"}</p>;
};

test("returns isBrowser set to false in a server-side environment", () => {
  const view = renderToString(<MockComponent />);
  expect(view).not.toContain("isBrowser");
});

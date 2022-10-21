import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { TopModalContextProvider } from "./top-modal-context";

const MockComponent = ({ providerOpen }: { providerOpen: boolean }) => (
  <>
    {providerOpen && (
      <TopModalContextProvider>some children</TopModalContextProvider>
    )}
  </>
);

describe("TopModalContextProvider", () => {
  let rerender: RenderResult["rerender"];

  beforeEach(() => {
    window.__CARBON_INTERNALS_MODAL_SETTER_LIST = [];
    ({ rerender } = render(<MockComponent providerOpen />));
  });

  it("adds a setter function to the global list when mounted", () => {
    expect(window.__CARBON_INTERNALS_MODAL_SETTER_LIST?.length).toBe(1);
  });

  it("adds a second setter to the global list if a second provider is mounted", () => {
    render(<MockComponent providerOpen />);
    expect(window.__CARBON_INTERNALS_MODAL_SETTER_LIST?.length).toBe(2);
  });

  it("removes the setter function when unmounted", () => {
    rerender(<MockComponent providerOpen={false} />);
    expect(window.__CARBON_INTERNALS_MODAL_SETTER_LIST?.length).toBe(0);
  });
});

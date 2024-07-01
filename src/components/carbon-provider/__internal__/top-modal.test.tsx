import React from "react";
import { render } from "@testing-library/react";
import TopModalProvider from "./top-modal-provider.component";

const MockComponent = ({ providerOpen }: { providerOpen: boolean }) => (
  <>{providerOpen && <TopModalProvider>some children</TopModalProvider>}</>
);

describe("TopModalContextProvider", () => {
  beforeEach(() => {
    window.__CARBON_INTERNALS_MODAL_SETTER_LIST = [];
  });

  afterAll(() => {
    window.__CARBON_INTERNALS_MODAL_SETTER_LIST = [];
  });

  it("adds a setter function to the global list when mounted", () => {
    render(<MockComponent providerOpen />);
    expect(window.__CARBON_INTERNALS_MODAL_SETTER_LIST?.length).toBe(1);
  });

  it("adds a second setter to the global list if a second provider is mounted", () => {
    render(
      <>
        <MockComponent providerOpen />
        <MockComponent providerOpen />
      </>
    );
    expect(window.__CARBON_INTERNALS_MODAL_SETTER_LIST?.length).toBe(2);
  });

  it("removes the setter function when unmounted", () => {
    const { rerender } = render(<MockComponent providerOpen />);
    rerender(<MockComponent providerOpen={false} />);
    expect(window.__CARBON_INTERNALS_MODAL_SETTER_LIST?.length).toBe(0);
  });
});

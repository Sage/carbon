import React from "react";
import { render } from "@testing-library/react";

import { PluginProvider, usePluginContext } from "./plugin-provider";

describe("When the PluginProvider is called", () => {
  it("returns the provided parent element from the context", () => {
    const parentElement = document.createElement("div");
    const consumerSpy = jest.fn();

    const Consumer = () => {
      const { getParentRef } = usePluginContext();
      consumerSpy(getParentRef());
      return null;
    };

    render(
      <PluginProvider parentRef={parentElement}>
        <Consumer />
      </PluginProvider>,
    );

    expect(consumerSpy).toHaveBeenCalledWith(parentElement);
  });

  it("returns undefined when no parent element is supplied", () => {
    const consumerSpy = jest.fn();

    const Consumer = () => {
      const { getParentRef } = usePluginContext();
      consumerSpy(getParentRef());
      return null;
    };

    render(
      <PluginProvider parentRef={null}>
        <Consumer />
      </PluginProvider>,
    );

    expect(consumerSpy).toHaveBeenCalledWith(undefined);
  });
});

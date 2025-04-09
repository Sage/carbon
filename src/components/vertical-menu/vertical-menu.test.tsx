import React from "react";
import { render, screen } from "@testing-library/react";

import { VerticalMenu, VerticalMenuItem } from ".";
import logger from "../../__internal__/utils/logger";

describe("VerticalMenu", () => {
  it("logs error if not within VerticalMenu or VerticalMenuFullscreen", () => {
    const loggerSpy = jest.spyOn(logger, "error").mockImplementation(() => {});

    render(<VerticalMenuItem title="Item1" />);

    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "Carbon VerticalMenu: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
      ),
    );

    loggerSpy.mockRestore();
  });

  it("does not log error if within VerticalMenu", () => {
    const loggerSpy = jest.spyOn(logger, "error").mockImplementation(() => {});

    render(
      <VerticalMenu>
        <VerticalMenuItem title="Item1" />
      </VerticalMenu>,
    );

    expect(loggerSpy).not.toHaveBeenCalled();

    loggerSpy.mockRestore();
  });

  it("does not log error if within VerticalMenuFullScreen", () => {
    const loggerSpy = jest.spyOn(logger, "error").mockImplementation(() => {});

    render(
      <VerticalMenu>
        <VerticalMenuItem title="Item1" />
      </VerticalMenu>,
    );

    expect(loggerSpy).not.toHaveBeenCalled();

    loggerSpy.mockRestore();
  });

  it("should accept aria-label prop", () => {
    render(
      <VerticalMenu aria-label="test">
        <VerticalMenuItem title="Item1" />
      </VerticalMenu>,
    );

    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "test",
    );
  });

  it("should accept aria-labelledby prop", () => {
    render(
      <VerticalMenu aria-labelledby="test">
        <VerticalMenuItem title="Item1" />
      </VerticalMenu>,
    );

    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-labelledby",
      "test",
    );
  });

  it("should render with a custom width", () => {
    render(
      <VerticalMenu width="100px">
        <VerticalMenuItem title="Item1" />
      </VerticalMenu>,
    );

    expect(screen.getByRole("navigation")).toHaveStyle({
      width: "100px",
    });
  });

  it("should render with a custom height", () => {
    render(
      <VerticalMenu height="100px">
        <VerticalMenuItem title="Item1" />
      </VerticalMenu>,
    );

    expect(screen.getByRole("navigation")).toHaveStyle({
      height: "100px",
    });
  });

  it("should override the scrollbar styling", () => {
    render(
      <VerticalMenu height="100px">
        <VerticalMenuItem title="Item1" />
      </VerticalMenu>,
    );

    expect(screen.getByRole("navigation")).toHaveStyleRule(
      "background-color",
      "#cccccc",
      {
        modifier: "::-webkit-scrollbar-track",
      },
    );

    expect(screen.getByRole("navigation")).toHaveStyleRule(
      "background-color",
      "#808080",
      {
        modifier: "::-webkit-scrollbar-thumb",
      },
    );

    expect(screen.getByRole("navigation")).toHaveStyleRule("width", "12px", {
      modifier: "::-webkit-scrollbar",
    });
  });

  it("should have the expected data attributes", () => {
    render(
      <VerticalMenu data-element="foo" data-role="bar">
        <VerticalMenuItem title="Item1" />
      </VerticalMenu>,
    );

    const menu = screen.getByRole("navigation");

    expect(menu).toHaveAttribute("data-component", "vertical-menu");
    expect(menu).toHaveAttribute("data-element", "foo");
    expect(menu).toHaveAttribute("data-role", "bar");
  });
});

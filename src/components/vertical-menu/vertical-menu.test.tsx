import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  VerticalMenu,
  VerticalMenuFullScreen,
  VerticalMenuItem,
  VerticalMenuTrigger,
} from ".";
import Logger from "../../__internal__/utils/logger";

// mock Logger.deprecate so that no console warnings occur while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

describe("VerticalMenu", () => {
  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
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

  describe("callbacks", () => {
    it(`should close the Vertical Menu Full Screen when escape key is pressed`, async () => {
      const user = userEvent.setup();

      const setMockState = jest.fn();
      const useStateMock = (useState: unknown) => [useState, setMockState];
      jest
        .spyOn(React, "useState")
        .mockImplementation(useStateMock as typeof React.useState);

      render(
        <>
          <VerticalMenuFullScreen isOpen onClose={setMockState(false)}>
            <VerticalMenuItem title="Item1" />
          </VerticalMenuFullScreen>
          ,
        </>,
      );
      await user.keyboard("{esc}");
      expect(setMockState).toHaveBeenCalledWith(false);
    });

    it(`should call onClick callback when a click event is triggered and using VerticalMenuTrigger`, async () => {
      const user = userEvent.setup();

      const setMockState = jest.fn();
      const useStateMock = (useState: unknown) => [useState, setMockState];
      jest
        .spyOn(React, "useState")
        .mockImplementation(useStateMock as typeof React.useState);

      render(
        <VerticalMenuTrigger onClick={setMockState(false)}>
          Menu
        </VerticalMenuTrigger>,
      );
      await user.click(screen.getByText("Menu"));
      expect(setMockState).toHaveBeenCalledWith(false);
    });

    it(`should call onClose callback when a click event is triggered`, async () => {
      const user = userEvent.setup();

      const setMockState = jest.fn();
      const useStateMock = (useState: unknown) => [useState, setMockState];
      jest
        .spyOn(React, "useState")
        .mockImplementation(useStateMock as typeof React.useState);

      render(
        <>
          <VerticalMenuFullScreen isOpen onClose={setMockState(false)}>
            <VerticalMenuItem title="Item1" />
          </VerticalMenuFullScreen>
          ,
        </>,
      );
      const closeBtn = screen.getByRole("button");
      await user.click(closeBtn);
      expect(setMockState).toHaveBeenCalledWith(false);
    });

    it(`should call onClose callback when a Space key event is triggered`, async () => {
      const user = userEvent.setup();

      const setMockState = jest.fn();
      const useStateMock = (useState: unknown) => [useState, setMockState];
      jest
        .spyOn(React, "useState")
        .mockImplementation(useStateMock as typeof React.useState);

      render(
        <VerticalMenuFullScreen isOpen onClose={setMockState(false)}>
          <VerticalMenuItem title="Item1" />
        </VerticalMenuFullScreen>,
      );
      const closeBtn = screen.getByRole("button");
      act(() => closeBtn.focus());

      await user.keyboard("{Space}");

      expect(setMockState).toHaveBeenCalledWith(false);
    });

    it(`should call onClose callback when a Enter key event is triggered`, async () => {
      const user = userEvent.setup();

      const setMockState = jest.fn();
      const useStateMock = (useState: unknown) => [useState, setMockState];
      jest
        .spyOn(React, "useState")
        .mockImplementation(useStateMock as typeof React.useState);

      render(
        <VerticalMenuFullScreen isOpen onClose={setMockState(false)}>
          <VerticalMenuItem title="Item1" />
        </VerticalMenuFullScreen>,
      );
      const closeBtn = screen.getByRole("button");
      act(() => closeBtn.focus());

      await user.keyboard("{enter}");

      expect(setMockState).toHaveBeenCalledWith(false);
    });
  });
});

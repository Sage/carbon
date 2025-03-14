import React, { useContext } from "react";
import { screen, act } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import FixedNavigationBarContext, {
  FixedNavigationBarContextProvider,
  FixedNavigationBarContextProviderProps,
} from "./fixed-navigation-bar.context";
import * as useResizeObserverModule from "../../../hooks/__internal__/useResizeObserver/useResizeObserver";

const useResizeObserverSpy = jest.spyOn(useResizeObserverModule, "default");

const ConsumerComponent = () => {
  const { submenuMaxHeight } = useContext(FixedNavigationBarContext);
  return <div data-role="output">{submenuMaxHeight}</div>;
};

const mockNavbarElement = { offsetHeight: 40 } as HTMLElement;
const navbarRef = { current: mockNavbarElement };

const MockComponent = (
  props: Omit<FixedNavigationBarContextProviderProps, "navbarRef">,
) => {
  return (
    <FixedNavigationBarContextProvider navbarRef={navbarRef} {...props}>
      <ConsumerComponent />
    </FixedNavigationBarContextProvider>
  );
};

describe("FixedNavigationBarContextProvider", () => {
  describe.each(["sticky", undefined] as const)(
    "when the position is %s",
    (position) => {
      it("does not provide a max-height", () => {
        render(
          <MockComponent position={position} orientation="top" offset="20px" />,
        );
        const result = screen.getByTestId("output");
        expect(result).toHaveTextContent("");
      });
    },
  );

  describe("when the position is fixed and the orientation is top", () => {
    it("computes the max height correctly", () => {
      render(
        <MockComponent position="fixed" orientation="top" offset="20px" />,
      );
      const result = screen.getByTestId("output");
      expect(result).toHaveTextContent("calc(100vh - 40px - 20px)");
    });
  });

  describe("when the position is fixed and the orientation is bottom", () => {
    it("computes the max height correctly", () => {
      render(
        <MockComponent position="fixed" orientation="bottom" offset="20px" />,
      );
      const result = screen.getByTestId("output");
      expect(result).toHaveTextContent("20px");
    });
  });

  describe("when the position is fixed and the orientation is not defined", () => {
    it("does not provide a max-height", () => {
      render(<MockComponent position="fixed" offset="20px" />);
      const result = screen.getByTestId("output");
      expect(result).toHaveTextContent("");
    });
  });

  describe("when the height of the navbar changes", () => {
    it("the max height is recalculated", () => {
      render(
        <MockComponent position="fixed" orientation="top" offset="20px" />,
      );
      const result = screen.getByTestId("output");
      expect(result).toHaveTextContent("calc(100vh - 40px - 20px)");

      act(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line jest provided property
        mockNavbarElement.offsetHeight = 75;

        useResizeObserverSpy.mock.calls[
          useResizeObserverSpy.mock.calls.length - 1
        ][1]();
      });

      const resizeResult = screen.getByTestId("output");
      expect(resizeResult).toHaveTextContent("calc(100vh - 75px - 20px)");
    });
  });
});

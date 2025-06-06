import React from "react";
import { render, renderHook, screen } from "@testing-library/react";
import { useGlobalHeader, GlobalHeaderProvider } from "./global-header.context";

// Test component to help test the hook
const TestComponent = () => {
  const { isWithinGlobalHeader } = useGlobalHeader();
  return (
    <div data-role="test-component">
      {isWithinGlobalHeader ? "Inside Header" : "Outside Header"}
    </div>
  );
};

describe("GlobalHeaderContext", () => {
  describe("useGlobalHeader hook", () => {
    it("should return isWithinGlobalHeader as false when used outside of provider", () => {
      const { result } = renderHook(() => useGlobalHeader());

      expect(result.current.isWithinGlobalHeader).toBe(false);
    });

    it("should return isWithinGlobalHeader as true when used inside provider", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlobalHeaderProvider>{children}</GlobalHeaderProvider>
      );

      const { result } = renderHook(() => useGlobalHeader(), {
        wrapper,
      });

      expect(result.current.isWithinGlobalHeader).toBe(true);
    });

    it("should return the correct context value when provider is present", () => {
      const TestComponentWithAssertion = () => {
        const context = useGlobalHeader();
        expect(context).toEqual({ isWithinGlobalHeader: true });
        return <div>Test</div>;
      };

      render(
        <GlobalHeaderProvider>
          <TestComponentWithAssertion />
        </GlobalHeaderProvider>,
      );
    });

    it("should return default value when provider is not present", () => {
      const TestComponentWithAssertion = () => {
        const context = useGlobalHeader();
        expect(context).toEqual({ isWithinGlobalHeader: false });
        return <div>Test</div>;
      };

      render(<TestComponentWithAssertion />);
    });
  });

  describe("GlobalHeaderProvider", () => {
    it("should render children correctly", () => {
      const childText = "Child Component";

      render(
        <GlobalHeaderProvider>
          <div data-role="child">{childText}</div>
        </GlobalHeaderProvider>,
      );

      expect(screen.getByTestId("child")).toHaveTextContent(childText);
    });

    it("should provide the correct context value to children", () => {
      render(
        <GlobalHeaderProvider>
          <TestComponent />
        </GlobalHeaderProvider>,
      );

      expect(screen.getByTestId("test-component")).toHaveTextContent(
        "Inside Header",
      );
    });

    it("should work with nested providers", () => {
      render(
        <GlobalHeaderProvider>
          <GlobalHeaderProvider>
            <TestComponent />
          </GlobalHeaderProvider>
        </GlobalHeaderProvider>,
      );

      expect(screen.getByTestId("test-component")).toHaveTextContent(
        "Inside Header",
      );
    });

    it("should work with multiple children", () => {
      render(
        <GlobalHeaderProvider>
          <div data-role="child1">Child 1</div>
          <div data-role="child2">Child 2</div>
          <TestComponent />
        </GlobalHeaderProvider>,
      );

      expect(screen.getByTestId("child1")).toHaveTextContent("Child 1");
      expect(screen.getByTestId("child2")).toHaveTextContent("Child 2");
      expect(screen.getByTestId("test-component")).toHaveTextContent(
        "Inside Header",
      );
    });

    it("should persist values between rerenders", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlobalHeaderProvider>{children}</GlobalHeaderProvider>
      );

      const { result, rerender } = renderHook(() => useGlobalHeader(), {
        wrapper,
      });

      const { isWithinGlobalHeader: firstResult } = result.current;
      rerender();
      const { isWithinGlobalHeader: secondResult } = result.current;

      expect(firstResult).toBe(true);
      expect(secondResult).toBe(true);
    });
  });
});

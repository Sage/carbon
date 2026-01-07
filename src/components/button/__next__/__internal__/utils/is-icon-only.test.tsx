import React from "react";
import isIconOnly from "./is-icon-only";

const TestIcon = () => <span>I am an Icon</span>;
TestIcon.displayName = "Icon";

describe("isIconOnly", () => {
  it("should return true when only icon is provided", () => {
    expect(isIconOnly(<TestIcon />)).toBe(true);
  });

  it("should return false when children text is provided", () => {
    expect(isIconOnly("Click me")).toBe(false);
  });

  it("should return false when children number is provided", () => {
    expect(isIconOnly(42)).toBe(false);
  });

  it("should return false when children with no icon is provided", () => {
    expect(isIconOnly(<span>I am no Icon</span>)).toBe(false);
  });

  it("should return false when both icon and text are provided", () => {
    expect(
      isIconOnly(
        <>
          <TestIcon />
          Click me
        </>,
      ),
    ).toBe(false);
  });

  it("should return false when no children are provided", () => {
    expect(isIconOnly(undefined)).toBe(false);
  });
});

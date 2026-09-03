import { renderHook } from "@testing-library/react";
import Logger from "../../../__internal__/utils/logger";
import { useTileContext } from "./tile.context";

test("default context setters are safe no-ops outside provider", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  const { result } = renderHook(() => useTileContext());

  expect(result.current.hasFooter).toBe(false);
  expect(result.current.footerVariant).toBeUndefined();
  expect(() => result.current.setHasFooter(true)).not.toThrow();
  expect(() => result.current.setFooterVariant("selected")).not.toThrow();

  loggerSpy.mockRestore();
});

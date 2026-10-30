import { renderHook } from "@testing-library/react";
import { useTileContext } from "./tile.context";

test("throws when used outside provider", () => {
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  expect(() => renderHook(() => useTileContext())).toThrow(
    "Carbon Tile: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  );

  consoleErrorSpy.mockRestore();
});

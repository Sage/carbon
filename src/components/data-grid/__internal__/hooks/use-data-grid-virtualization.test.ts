import { createRef } from "react";
import { renderHook } from "@testing-library/react";
import { useVirtualizer } from "@tanstack/react-virtual";

import useDataGridVirtualization from "./use-data-grid-virtualization";

jest.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: jest.fn(),
}));

const mockedUseVirtualizer = jest.mocked(useVirtualizer);
const scrollElementRef = createRef<HTMLDivElement>();

const renderVirtualization = (
  options: {
    rowCount?: number;
    height?: number | string;
    disabled?: boolean;
    overscan?: number;
  } = {},
) => {
  const { rowCount = 25, disabled = false, overscan = 3 } = options;
  const height = "height" in options ? options.height : 200;

  return renderHook(() =>
    useDataGridVirtualization({
      rowCount,
      getRowKey: (index) => `row-${index}`,
      scrollElementRef,
      height,
      disabled,
      overscan,
    }),
  );
};

beforeEach(() => {
  mockedUseVirtualizer.mockReturnValue({
    getVirtualItems: () => [],
    getTotalSize: () => 0,
  } as unknown as ReturnType<typeof useVirtualizer>);
});

test.each([
  { description: "the grid is unconstrained", height: undefined },
  { description: "virtualization is disabled", height: 200, disabled: true },
  { description: "there are no more than 20 rows", height: 200, rowCount: 20 },
])("renders every row when $description", ({ height, disabled, rowCount }) => {
  const { result } = renderVirtualization({
    height,
    disabled,
    rowCount,
  });

  expect(result.current.renderedRowIndexes).toEqual(
    Array.from({ length: rowCount ?? 25 }, (_, index) => index),
  );
  expect(result.current.topPadding).toBe(0);
  expect(result.current.bottomPadding).toBe(0);
  expect(mockedUseVirtualizer.mock.calls.at(-1)?.[0].enabled).toBe(false);
});

test("returns the virtual rows and spacer sizes for a constrained large grid", () => {
  mockedUseVirtualizer.mockReturnValue({
    getVirtualItems: () => [
      { index: 2, start: 120, end: 160 },
      { index: 3, start: 160, end: 200 },
      { index: 4, start: 200, end: 240 },
    ],
    getTotalSize: () => 1040,
  } as unknown as ReturnType<typeof useVirtualizer>);

  const { result } = renderVirtualization();

  expect(result.current.renderedRowIndexes).toEqual([2, 3, 4]);
  expect(result.current.topPadding).toBe(80);
  expect(result.current.bottomPadding).toBe(800);
  expect(mockedUseVirtualizer.mock.calls.at(-1)?.[0]).toEqual(
    expect.objectContaining({ count: 25, enabled: true, overscan: 3 }),
  );
});

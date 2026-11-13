import React, { useRef } from "react";
import { renderToString } from "react-dom/server";

import useSelectListVirtualization from "./use-select-list-virtualization";

const TestComponent = () => {
  const listRef = useRef<HTMLUListElement>(null);

  useSelectListVirtualization({
    rows: [{ key: "option-1", selected: true }],
    open: true,
    enabled: true,
    overscan: 5,
    listRef,
    listId: "select-list",
    onClose: jest.fn(),
  });

  return <ul ref={listRef} />;
};

test("renders without errors when window is not available", () => {
  expect(() => renderToString(<TestComponent />)).not.toThrow();
});

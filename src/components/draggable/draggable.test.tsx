import React from "react";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";
import {
  testStyledSystemMargin,
  testStyledSystemPadding,
} from "../../__spec_helper__/__internal__/test-utils";

import {
  DraggableContainer,
  DraggableItem,
  DragHandle,
  useDraggableItemContext,
} from ".";
import Box from "../box";
import Card from "../card";
import { Tile } from "../tile";
import { useDragDropContext } from "./__internal__/drag-drop-provider";

test.each(["container", "item", "handle"])(
  "%s forwards ordinary HTML attributes and handlers but reserves native drag props",
  (component) => {
    const onDrag = jest.fn();
    const onClick = jest.fn();
    const attributes = {
      draggable: true,
      onDrag,
      onDragCapture: onDrag,
      onDragStart: onDrag,
      onDragStartCapture: onDrag,
      onDragEnd: onDrag,
      onDragEndCapture: onDrag,
      onDragOver: onDrag,
      onDragOverCapture: onDrag,
      onDragEnter: onDrag,
      onDragEnterCapture: onDrag,
      onDragLeave: onDrag,
      onDragLeaveCapture: onDrag,
      onDrop: onDrag,
      onDropCapture: onDrag,
      onClick,
      title: "Draggable content",
      "aria-label": "Example",
    };
    render(
      component === "handle" ? (
        <DragHandle {...attributes} />
      ) : (
        <DraggableContainer {...(component === "container" ? attributes : {})}>
          <DraggableItem id="one" {...(component === "item" ? attributes : {})}>
            Content
          </DraggableItem>
        </DraggableContainer>
      ),
    );
    const element = screen.getByTestId(
      component === "handle" ? "drag-handle" : `draggable-${component}`,
    );

    expect(element).toHaveAttribute("aria-label", "Example");
    expect(element).toHaveAttribute("title", "Draggable content");
    expect(element).not.toHaveAttribute("draggable");

    fireEvent.click(element);

    expect(onClick).toHaveBeenCalledTimes(1);

    for (const event of [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop",
    ]) {
      fireEvent(element, new Event(event, { bubbles: true, cancelable: true }));
    }

    expect(onDrag).not.toHaveBeenCalled();
  },
);

test("supports bounded drop-area sizing and padding without rendering sizing attributes", () => {
  render(
    <DraggableContainer
      width="320px"
      height="240px"
      minWidth="260px"
      maxWidth="640px"
      minHeight="160px"
      maxHeight="480px"
      p="12px"
    />,
  );

  const container = screen.getByTestId("draggable-container");

  expect(container).toHaveStyle({ width: "320px" });
  expect(container).toHaveStyle({ height: "240px" });
  expect(container).toHaveStyle({ "min-width": "260px" });
  expect(container).toHaveStyle({ "max-width": "640px" });
  expect(container).toHaveStyle({ "min-height": "160px" });
  expect(container).toHaveStyle({ "max-height": "480px" });
  expect(container).toHaveStyle({ padding: "12px" });
  expect(container).toHaveStyle({ "box-sizing": "border-box" });
  expect(container).not.toHaveAttribute("width");
  expect(container).not.toHaveAttribute("height");
});

// needed for coverage
test("moveTo safely does nothing outside a DraggableItem", () => {
  const { result } = renderHook(useDraggableItemContext);

  expect(result.current.moveTo(1)).toBeUndefined();
  expect(result.current.isDraggable).toBe(false);
  expect(result.current.index).toBe(0);
  expect(result.current.itemCount).toBe(0);
});

const MoveControl = ({
  position,
  label,
}: {
  position: number;
  label: string;
}) => {
  const { index, itemCount, moveTo } = useDraggableItemContext();
  return (
    <button type="button" onClick={() => moveTo(position)}>
      {label} ({index + 1}/{itemCount})
    </button>
  );
};

test("keeps contexts stable on parent updates and only updates items whose positions change", () => {
  const onRender = jest.fn();
  const getOrder = jest.fn();
  const nextGetOrder = jest.fn();
  const Control = React.memo(({ label }: { label: string }) => {
    const { index, itemCount, moveTo } = useDraggableItemContext();
    useDragDropContext();
    onRender(label);
    return (
      <button type="button" onClick={() => moveTo(index === 0 ? 1 : 0)}>
        {label} ({index + 1}/{itemCount})
      </button>
    );
  });
  const renderItems = (onOrder: typeof getOrder) => (
    <DraggableContainer getOrder={onOrder}>
      {["one", "two", "three"].map((id) => (
        <DraggableItem key={id} id={id}>
          <Control label={id} />
        </DraggableItem>
      ))}
    </DraggableContainer>
  );
  const { rerender } = render(renderItems(getOrder));
  onRender.mockClear();

  rerender(renderItems(nextGetOrder));

  expect(onRender).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole("button", { name: "one (1/3)" }));

  expect(nextGetOrder).toHaveBeenLastCalledWith(["two", "one", "three"], "one");
  expect(getOrder).not.toHaveBeenCalled();
  expect(onRender.mock.calls.map(([label]) => label)).toEqual(["two", "one"]);
  onRender.mockClear();

  fireEvent.click(screen.getByRole("button", { name: "one (2/3)" }));

  expect(nextGetOrder).toHaveBeenLastCalledWith(["one", "two", "three"], "one");
  expect(onRender.mock.calls.map(([label]) => label)).toEqual(["one", "two"]);
});

test("stable move controls use the latest children and notify consumers when the item count changes", () => {
  const getOrder = jest.fn();
  const renderItems = (ids: string[], label: string) => (
    <DraggableContainer getOrder={getOrder}>
      {ids.map((id) => (
        <DraggableItem key={id} id={id}>
          <MoveControl label={`${label} ${id}`} position={ids.length - 1} />
        </DraggableItem>
      ))}
    </DraggableContainer>
  );
  const { rerender } = render(renderItems(["one", "two"], "Original"));

  rerender(renderItems(["three", "one", "two"], "Updated"));
  fireEvent.click(screen.getByRole("button", { name: "Updated one (2/3)" }));

  expect(getOrder).toHaveBeenCalledWith(["three", "two", "one"], "one");
  expect(
    screen.getAllByRole("button").map((button) => button.textContent),
  ).toEqual(["Updated three (1/3)", "Updated two (2/3)", "Updated one (3/3)"]);
});

test("manual controls share ordering and getOrder without remounting their item or creating a live region", () => {
  const getOrder = jest.fn();
  render(
    <DraggableContainer getOrder={getOrder}>
      <DraggableItem id="one">
        <MoveControl position={1} label="Move first" />
      </DraggableItem>
      <DraggableItem id="two">
        <MoveControl position={0} label="Move second" />
      </DraggableItem>
    </DraggableContainer>,
  );

  const first = screen.getByRole("button", { name: "Move first (1/2)" });

  expect(screen.queryByRole("status")).not.toBeInTheDocument();

  first.focus();
  fireEvent.click(first);

  expect(
    screen.getAllByTestId("draggable-item").map((item) => item.textContent),
  ).toEqual(["Move second (1/2)", "Move first (2/2)"]);
  expect(getOrder).toHaveBeenCalledWith(["two", "one"], "one");
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Move first (2/2)" })).toBe(first);
  expect(first).toHaveFocus();
});

test.each([-1, 2, 0.5, 0])(
  "ignores invalid or unchanged manual position %s without calling getOrder",
  (position) => {
    const getOrder = jest.fn();
    render(
      <DraggableContainer getOrder={getOrder}>
        <DraggableItem id="one">
          <MoveControl position={position} label="Move first" />
        </DraggableItem>
        <DraggableItem id="two">Second panel</DraggableItem>
      </DraggableContainer>,
    );
    fireEvent.click(screen.getByRole("button"));

    expect(getOrder).not.toHaveBeenCalled();
  },
);

const IntegratedPanel = ({
  handleRef,
}: {
  handleRef?: React.Ref<HTMLSpanElement>;
}) => {
  const { isDraggable, surfaceRef } = useDraggableItemContext();
  const [count, setCount] = React.useState(0);
  return (
    <article ref={surfaceRef}>
      {isDraggable && <DragHandle ref={handleRef} title="Move panel" />}
      <button onClick={() => setCount(count + 1)} type="button">
        Count {count}
      </button>
    </article>
  );
};

test("the public integration works independently outside a DraggableItem", () => {
  render(<IntegratedPanel />);

  expect(screen.getByRole("article")).toBeVisible();
  expect(screen.queryByTestId("drag-handle")).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveTextContent("Count 1");
});

test("registers an internal handle, forwards its ref and preserves registration on rerenders", () => {
  const ref = React.createRef<HTMLSpanElement>();
  const { unmount } = render(
    <DraggableContainer>
      <DraggableItem id="custom">
        <IntegratedPanel handleRef={ref} />
      </DraggableItem>
    </DraggableContainer>,
  );

  const handle = screen.getByTitle("Move panel");

  expect(ref.current).toBe(handle);
  expect(handle).toHaveAttribute("draggable", "true");
  expect(
    screen.queryByTestId("draggable-item-drag-handle"),
  ).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button"));

  expect(screen.getByTitle("Move panel")).toBe(handle);
  expect(handle).toHaveAttribute("draggable", "true");
  unmount();
  expect(ref.current).toBeNull();
  expect(handle).not.toHaveAttribute("draggable");
});

test("renders DragHandle independently with custom attributes without enabling native dragging", () => {
  render(<DragHandle data-role="custom-handle" aria-label="Move" />);

  expect(screen.getByTestId("custom-handle")).toHaveAttribute(
    "aria-label",
    "Move",
  );
  expect(screen.getByTestId("custom-handle")).not.toHaveAttribute("draggable");
});

test("throws error when DraggableContainer contains a child which is not DraggableItem", () => {
  jest.spyOn(global.console, "error").mockImplementation(() => {});

  expect(() => {
    render(
      <DraggableContainer>
        <div>Not draggable</div>
      </DraggableContainer>,
    );
  }).toThrow(
    "`DraggableContainer` only accepts children of type `DraggableItem`.",
  );

  jest.restoreAllMocks();
});

test("renders with provided data- attributes", () => {
  render(
    <DraggableContainer
      data-element="draggable-element"
      data-role="draggable-role"
    >
      <DraggableItem
        data-element="item-element"
        data-role="item-role"
        id="apple"
      >
        Apple
      </DraggableItem>
    </DraggableContainer>,
  );

  expect(screen.getByTestId("draggable-role")).toHaveAttribute(
    "data-element",
    "draggable-element",
  );
  expect(screen.getByTestId("item-role")).toHaveAttribute(
    "data-element",
    "item-element",
  );
});

testStyledSystemMargin(
  (props) => (
    <DraggableContainer {...props}>
      <DraggableItem id="apple">Apple</DraggableItem>
    </DraggableContainer>
  ),
  () => screen.getByTestId("draggable-container"),
);

testStyledSystemPadding(
  (props) => (
    <DraggableContainer>
      <DraggableItem id="apple" {...props}>
        Apple
      </DraggableItem>
    </DraggableContainer>
  ),
  () => screen.getByTestId("draggable-item-content"),
);

test("should render with default padding when no padding props are passed", () => {
  render(
    <DraggableContainer>
      <DraggableItem id="apple">Apple</DraggableItem>
    </DraggableContainer>,
  );

  expect(screen.getByTestId("draggable-item-content")).toHaveStyleRule(
    "padding-top",
    "var(--spacing100)",
  );
  expect(screen.getByTestId("draggable-item-content")).toHaveStyleRule(
    "padding-bottom",
    "var(--spacing100)",
  );
});

for (const [name, child] of [
  ["Card", <Card key="card">Card</Card>],
  ["Tile", <Tile key="tile">Tile</Tile>],
  ["custom DragHandle", <IntegratedPanel key="panel" />],
] as const) {
  test.each([
    { py: undefined, expected: "var(--spacing000)" },
    { py: 0, expected: "var(--spacing000)" },
    { py: 3, expected: "var(--spacing300)" },
  ])(
    `respects vertical padding py=$py after ${name}'s handle registers`,
    ({ py, expected }) => {
      render(
        <DraggableContainer>
          <DraggableItem id="item" py={py}>
            {child}
          </DraggableItem>
        </DraggableContainer>,
      );

      expect(
        screen.queryByTestId("draggable-item-drag-handle"),
      ).not.toBeInTheDocument();
      const content = screen.getByTestId("draggable-item-content");
      expect(content).toHaveStyleRule("padding-top", expected);
      expect(content).toHaveStyleRule("padding-bottom", expected);
    },
  );
}

test("accepts Box as its child with Cards and Tiles inside DraggableItems", () => {
  render(
    <DraggableContainer>
      <Box
        data-role="custom-parent"
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <DraggableItem id="card">
          <Card width="100%" data-role="custom-card">
            Card content
          </Card>
        </DraggableItem>
        <DraggableItem id="tile">
          <Tile data-role="custom-tile">Tile content</Tile>
        </DraggableItem>
      </Box>
    </DraggableContainer>,
  );

  const parent = screen.getByTestId("custom-parent");

  expect(parent).toHaveStyle({ display: "flex" });
  expect(parent).toHaveStyle({ "flex-direction": "column" });
  expect(within(parent).getAllByTestId("draggable-item")).toHaveLength(2);
  expect(within(parent).getByTestId("custom-card")).toHaveTextContent(
    "Card content",
  );
  expect(within(parent).getByTestId("custom-tile")).toHaveTextContent(
    "Tile content",
  );
  const cardHandle = within(screen.getByTestId("custom-card")).getByTestId(
    "drag-handle",
  );
  expect(cardHandle).toHaveAttribute("draggable", "true");
  const tileHandle = within(screen.getByTestId("custom-tile")).getByTestId(
    "drag-handle",
  );
  expect(tileHandle).toHaveAttribute("draggable", "true");
  expect(
    within(parent).queryAllByTestId("draggable-item-drag-handle"),
  ).toHaveLength(0);
});

const CustomParent = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => <section aria-label={title}>{children}</section>;

test("supports a parent component without ref forwarding and updates its items", () => {
  const { rerender } = render(
    <DraggableContainer>
      <CustomParent title="Items">
        <DraggableItem id="one">One</DraggableItem>
      </CustomParent>
    </DraggableContainer>,
  );

  expect(
    within(screen.getByRole("region", { name: "Items" })).getByText("One"),
  ).toBeVisible();

  rerender(
    <DraggableContainer>
      <CustomParent title="Updated items">
        <DraggableItem id="two">Two</DraggableItem>
        <DraggableItem id="three">Three</DraggableItem>
      </CustomParent>
    </DraggableContainer>,
  );

  expect(
    within(screen.getByRole("region", { name: "Updated items" }))
      .getAllByTestId("draggable-item")
      .map((item) => item.textContent),
  ).toEqual(["Two", "Three"]);
  expect(screen.queryByText("One")).not.toBeInTheDocument();
});

test.each([undefined, true, false])(
  "uses Card's built-in handle without a duplicate when draggable is %s",
  (draggable) => {
    render(
      <DraggableContainer>
        <DraggableItem id="card">
          <Box>
            <Card
              draggable={draggable}
              rightChildren={<button type="button">Move up</button>}
            >
              Card
            </Card>
          </Box>
        </DraggableItem>
      </DraggableContainer>,
    );

    expect(screen.getByTestId("drag-handle")).toHaveAttribute(
      "draggable",
      "true",
    );
    expect(
      screen.queryByTestId("draggable-item-drag-handle"),
    ).not.toBeInTheDocument();
    expect(screen.getAllByTestId("icon")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Move up" })).toBeInTheDocument();
  },
);

test("switches between Card, Tile and fallback handles when the child changes", () => {
  const renderItem = (child: React.ReactNode) => (
    <DraggableContainer>
      <DraggableItem id="item">{child}</DraggableItem>
    </DraggableContainer>
  );

  const { rerender } = render(renderItem(<Card>Card</Card>));
  const oldCardHandle = screen.getByTestId("drag-handle");

  expect(oldCardHandle).toHaveAttribute("draggable", "true");

  rerender(renderItem(<Tile>Tile</Tile>));
  const oldTileHandle = screen.getByTestId("drag-handle");

  expect(oldTileHandle).toHaveAttribute("draggable", "true");
  expect(oldCardHandle).not.toHaveAttribute("draggable");
  expect(
    screen.queryByTestId("draggable-item-drag-handle"),
  ).not.toBeInTheDocument();

  rerender(renderItem(<div>Fallback content</div>));

  expect(screen.queryByTestId("drag-handle")).not.toBeInTheDocument();

  const oldFallbackHandle = screen.getByTestId("draggable-item-drag-handle");

  expect(oldFallbackHandle).toHaveAttribute("draggable", "true");
  expect(oldTileHandle).not.toHaveAttribute("draggable");

  rerender(renderItem(<Card>Card again</Card>));

  expect(screen.getByTestId("drag-handle")).toHaveAttribute(
    "draggable",
    "true",
  );
  expect(
    screen.queryByTestId("draggable-item-drag-handle"),
  ).not.toBeInTheDocument();
  expect(oldFallbackHandle).not.toHaveAttribute("draggable");
});

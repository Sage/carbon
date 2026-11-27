import createDropGeometry from "./drop-geometry";
import type { RegisteredDropItem } from "./drop-placement";

const rect = (top: number, width = 100): DOMRect => ({
  x: 0,
  y: top,
  left: 0,
  top,
  right: width,
  bottom: top + 40,
  width,
  height: 40,
  toJSON: () => ({}),
});

const nativeResizeObserver = global.ResizeObserver;
let onResize: () => void;
const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();
let container: HTMLDivElement;
let items: RegisteredDropItem[];
let geometry: ReturnType<typeof createDropGeometry>;

beforeEach(() => {
  jest.clearAllMocks();
  global.ResizeObserver = jest.fn().mockImplementation((callback) => {
    onResize = callback;
    return { observe, unobserve, disconnect };
  });
  container = document.createElement("div");
  document.body.append(container);
  items = Array.from({ length: 120 }, (_, index) => {
    const element = document.createElement("div");
    element.dataset.component = "draggable-item";
    const surface = document.createElement("article");
    const dragHandle = document.createElement("span");
    element.append(surface);
    surface.append(dragHandle);
    container.append(element);
    jest
      .spyOn(surface, "getBoundingClientRect")
      .mockReturnValue(rect(index * 50));
    return {
      id: String(index),
      element,
      dragHandle,
      getSurface: () => surface,
      onIndicatorChange: jest.fn(),
    };
  });
  geometry = createDropGeometry(container, () => items);
});

afterEach(() => {
  geometry.cleanup();
  container.remove();
  global.ResizeObserver = nativeResizeObserver;
  jest.restoreAllMocks();
});

test("measures 120 surfaces once and reuses the snapshot across pointer updates", () => {
  const initial = geometry.get();
  for (let index = 0; index < 20; index++) {
    expect(geometry.get()).toBe(initial);
  }

  expect(initial.items).toHaveLength(120);
  items.forEach((item) => {
    expect(item.getSurface().getBoundingClientRect).toHaveBeenCalledTimes(1);
  });
  expect(observe).toHaveBeenCalledTimes(241);
});

test.each(["scroll", "resize", "surface resize", "registration"])(
  "refreshes bounds after %s",
  (event) => {
    const initial = geometry.get();
    const surface = items[0].getSurface();
    jest.mocked(surface.getBoundingClientRect).mockReturnValue(rect(200, 150));

    if (event === "surface resize") onResize();
    else if (event === "registration") geometry.invalidate();
    else container.dispatchEvent(new Event(event, { bubbles: true }));

    // Window resize events originate on window, unlike captured element scrolls.
    if (event === "resize") window.dispatchEvent(new Event("resize"));

    expect(geometry.get()).not.toBe(initial);
    expect(geometry.get().items[0].bounds).toMatchObject({
      top: 200,
      width: 150,
    });
    expect(surface.getBoundingClientRect).toHaveBeenCalledTimes(2);
    expect(observe).toHaveBeenCalledTimes(241);
  },
);

test.each(["content", "style", "class", "text"])(
  "invalidates geometry after a %s mutation",
  async (change) => {
    const initial = geometry.get();
    const surface = items[0].getSurface();
    if (change === "content") surface.append(document.createElement("span"));
    if (change === "style") surface.style.height = "80px";
    if (change === "class") surface.className = "expanded";
    if (change === "text") {
      const text = document.createTextNode("Expanded content");
      surface.append(text);
      await Promise.resolve();
      geometry.get();
      text.textContent = "Updated content";
    }
    await Promise.resolve();

    expect(geometry.get()).not.toBe(initial);
  },
);

test("indicator and ghost wrapper classes do not invalidate geometry", async () => {
  const initial = geometry.get();
  items[0].element.className = "indicator-top";
  items[1].element.className = "drag-ghost";
  await Promise.resolve();

  expect(geometry.get()).toBe(initial);
});

test("refreshes layout direction and stops observing removed surfaces", () => {
  const initial = geometry.get();
  const removed = items[items.length - 1];
  items.pop();
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.direction = "rtl";
  geometry.invalidate();

  const next = geometry.get();
  expect(initial.layout).toEqual({ horizontal: false, reverse: false });
  expect(next.layout).toEqual({ horizontal: true, reverse: true });
  expect(next.items).toHaveLength(119);
  expect(unobserve).toHaveBeenCalledWith(removed.element);
  expect(unobserve).toHaveBeenCalledWith(removed.getSurface());
});

test("uses the container's layout for empty lists and excludes hidden surfaces", () => {
  items.forEach((item) => {
    jest
      .mocked(item.getSurface().getBoundingClientRect)
      .mockReturnValue(rect(0, 0));
  });
  container.style.display = "grid";
  container.style.gridTemplateColumns = "100px 100px";

  expect(geometry.get()).toMatchObject({
    items: [],
    layout: { horizontal: true, reverse: false },
  });
  items = [];
  container.style.display = "flex";
  container.style.flexDirection = "column-reverse";
  geometry.invalidate();
  expect(geometry.get().layout).toEqual({ horizontal: false, reverse: true });
});

test("cleans up observers and event listeners", async () => {
  const initial = geometry.get();
  geometry.cleanup();
  container.dispatchEvent(new Event("scroll"));
  window.dispatchEvent(new Event("resize"));
  container.style.padding = "20px";
  await Promise.resolve();

  expect(geometry.get()).toBe(initial);
  expect(disconnect).toHaveBeenCalled();
});

test("can measure without ResizeObserver", () => {
  geometry.cleanup();
  // Older environments can still invalidate on scroll, window resize and mutations.
  global.ResizeObserver = undefined as unknown as typeof ResizeObserver;
  geometry = createDropGeometry(container, () => items);

  expect(geometry.get().items).toHaveLength(120);
});

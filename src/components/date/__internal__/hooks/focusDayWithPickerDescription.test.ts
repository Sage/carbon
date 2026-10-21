import focusDayWithPickerDescription from "./focusDayWithPickerDescription";

const setup = () => {
  const day = document.createElement("button");
  const other = document.createElement("button");
  document.body.append(day, other);

  return {
    day,
    other,
    teardown: () => {
      day.remove();
      other.remove();
    },
  };
};

test("describes the day and blurs the previous element before focusing it", () => {
  const { day, other, teardown } = setup();
  let describedOnFocus: string | null = null;
  const focusEvents: string[] = [];

  other.focus();
  other.addEventListener("blur", () => {
    focusEvents.push("previous-blurred");
  });
  day.addEventListener("focus", () => {
    describedOnFocus = day.getAttribute("aria-describedby");
    focusEvents.push("day-focused");
  });

  focusDayWithPickerDescription(day, "description");

  expect(day).toHaveFocus();
  expect(describedOnFocus).toBe("description");
  expect(focusEvents).toEqual(["previous-blurred", "day-focused"]);
  teardown();
});

test("keeps focus on a day that is  already focused", () => {
  const { day, teardown } = setup();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("tabindex", "0");
  document.body.append(svg);

  svg.focus();
  expect(svg).toHaveFocus();

  focusDayWithPickerDescription(day, "description");

  expect(day).toHaveFocus();
  svg.remove();
  teardown();
});

test("focuses the day when the activeElement is not an HTMLElement", () => {
  const { day, teardown } = setup();

  day.focus();
  focusDayWithPickerDescription(day, "description");

  expect(day).toHaveFocus();
  expect(day).toHaveAttribute("aria-describedby", "description");
  teardown();
});

test("removes the description when the day loses focus", () => {
  const { day, other, teardown } = setup();

  focusDayWithPickerDescription(day, "description");
  other.focus();

  expect(day).not.toHaveAttribute("aria-describedby");
  teardown();
});

test("cleanup removes the description while the day is still focused", () => {
  const { day, teardown } = setup();

  const cleanup = focusDayWithPickerDescription(day, "description");
  cleanup();

  expect(day).toHaveFocus();
  expect(day).not.toHaveAttribute("aria-describedby");
  teardown();
});

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

test("describes the day before focusing it", () => {
  const { day, teardown } = setup();
  let describedOnFocus: string | null = null;
  day.addEventListener("focus", () => {
    describedOnFocus = day.getAttribute("aria-describedby");
  });

  focusDayWithPickerDescription(day, "description");

  expect(day).toHaveFocus();
  expect(describedOnFocus).toBe("description");
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

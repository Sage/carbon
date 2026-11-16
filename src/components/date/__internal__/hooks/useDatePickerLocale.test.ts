import { renderHook } from "@testing-library/react";
import { de, enGB, pl } from "date-fns/locale";

import useLocale from "../../../../hooks/__internal__/useLocale";
import useDatePickerLocale from "./useDatePickerLocale";

jest.mock("../../../../hooks/__internal__/useLocale");

const mockedUseLocale = useLocale as jest.MockedFunction<typeof useLocale>;

const mockLocale = (dateFnsLocale: typeof enGB | typeof de | typeof pl) => {
  mockedUseLocale.mockReturnValue({
    locale: () => "en-GB",
    date: {
      dateFnsLocale: () => dateFnsLocale,
      ariaLabels: {
        closeButton: () => "Close picker",
        chooseDate: () => "Choose a date",
      },
    },
  } as ReturnType<typeof useLocale>);
};

test("provides all locale values needed by the date picker", () => {
  mockLocale(enGB);

  const { result } = renderHook(() => useDatePickerLocale());

  expect(result.current.datePickerDialogAriaLabel).toBe("Choose a date");
  expect(result.current.closeButtonLabel).toBe("Close picker");
  expect(result.current.localize).toBe(enGB.localize);
  expect(result.current.weekStartsOn).toBe(1);
  expect(result.current.weekdaysLong).toEqual([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  expect(result.current.weekdaysShort).toEqual([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);
  expect(mockedUseLocale).toHaveBeenCalledTimes(1);
});

test.each([
  ["German", de, ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]],
  ["Polish", pl, ["nie", "pon", "wto", "śro", "czw", "pią", "sob"]],
] as const)(
  "provides the expected short weekday labels for the %s locale",
  (_, dateFnsLocale, expectedWeekdays) => {
    mockLocale(dateFnsLocale);

    const { result } = renderHook(() => useDatePickerLocale());

    expect(result.current.weekdaysShort).toEqual(expectedWeekdays);
  },
);

test("derives all calendar locale values from an explicit override", () => {
  mockLocale(enGB);

  const { result } = renderHook(() => useDatePickerLocale(de));

  expect(result.current.dayPickerLocale.code).toBe("de");
  expect(result.current.localize).toBe(de.localize);
  expect(result.current.weekdaysLong[1]).toBe("Montag");
  expect(result.current.weekdaysShort[1]).toBe("Mo");
  expect(result.current.closeButtonLabel).toBe("Close picker");
});

test("retains existing locale labels when locale options are overridden", () => {
  mockLocale(enGB);

  const { result } = renderHook(() =>
    useDatePickerLocale({
      options: { weekStartsOn: 5, firstWeekContainsDate: 1 },
    }),
  );

  expect(result.current.weekStartsOn).toBe(5);
  expect(result.current.localize).toBe(enGB.localize);
  expect(result.current.dayPickerLocale.code).toBe("en-GB");
  expect(result.current.dayPickerLocale.options?.firstWeekContainsDate).toBe(1);
  expect(result.current.weekdaysLong[0]).toBe("Sunday");
});

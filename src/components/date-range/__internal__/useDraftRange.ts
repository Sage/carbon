import { useState } from "react";
import { differenceInCalendarDays, format as formatDate } from "date-fns";
import type { DateRange as DayPickerRange } from "react-day-picker";

import useLocale from "../../../hooks/__internal__/useLocale";
import { formattedValue } from "../../date/__internal__/utils/utils";

/** A start and end date as text in the current date format. An unset date is "". */
type RangeText = [string, string];

const isSameDay = (first: Date, second: Date) =>
  differenceInCalendarDays(first, second) === 0;

/**
 * The selection in progress while the combined calendar is open. It is a draft: the owner reports
 * it only on Apply, and discards it otherwise.
 */
const useDraftRange = ({
  isOpen,
  committed,
  format,
  toDate,
}: {
  isOpen: boolean;
  /** The value the field currently holds. */
  committed: RangeText;
  format: string;
  toDate: (text?: string) => Date | undefined;
}) => {
  const { ariaLabels, dateFnsLocale } = useLocale().date;
  const [committedStart, committedEnd] = committed;

  const [draft, setDraft] = useState<RangeText>(["", ""]);
  // The committed value the draft was taken from. A new value while open resets the draft.
  const [draftSource, setDraftSource] = useState<RangeText>(["", ""]);
  const [statusMessage, setStatusMessage] = useState("");

  if (
    isOpen &&
    (draftSource[0] !== committedStart || draftSource[1] !== committedEnd)
  ) {
    setDraftSource(committed);
    setDraft(committed);
  }

  const text = isOpen ? draft : committed;
  const startDate = toDate(text[0]);
  const endDate = toDate(text[1]);

  const selectedRange: DayPickerRange | undefined =
    startDate && endDate
      ? {
          from: startDate < endDate ? startDate : endDate,
          to: startDate < endDate ? endDate : startDate,
        }
      : { from: startDate || endDate, to: undefined };

  const toLongDate = (date: Date) =>
    formatDate(date, "PPPP", { locale: dateFnsLocale() });

  const startDraft = () => {
    setDraftSource(committed);
    setDraft(committed);
    setStatusMessage("");
  };

  /** Applies a day click: the first click sets the start, the second completes the range. */
  const selectDay = (date: Date) => {
    let newStart = date;
    let newEnd: Date | undefined;

    // With a start date and no end date, the click completes the range. Otherwise it starts a new one.
    if (startDate && !endDate) {
      if (date < startDate && !isSameDay(date, startDate)) {
        newEnd = startDate;
      } else {
        newStart = startDate;
        newEnd = date;
      }
    }

    setDraft([
      formattedValue(format, newStart),
      newEnd ? formattedValue(format, newEnd) : "",
    ]);
    setStatusMessage(
      newEnd
        ? ariaLabels.rangeSelected?.(
            toLongDate(newStart),
            toLongDate(newEnd),
            differenceInCalendarDays(newEnd, newStart) + 1,
          ) || ""
        : ariaLabels.startDateSelected?.(toLongDate(newStart)) || "",
    );
  };

  const clear = () => {
    setStatusMessage("");
    setDraft(["", ""]);
  };

  return {
    text,
    selectedRange,
    statusMessage,
    hasChanges: draft[0] !== committedStart || draft[1] !== committedEnd,
    draft,
    startDraft,
    selectDay,
    clear,
  };
};

export default useDraftRange;

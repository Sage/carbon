import { isValid, parseISO } from "date-fns";

const ISO_DATE_OR_DATETIME_PATTERN =
  /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?)?$/;

const isValidISOString = (value: string) =>
  ISO_DATE_OR_DATETIME_PATTERN.test(value) && isValid(parseISO(value));

export default isValidISOString;

// Separate index.ts to export only required sub-modules from date-fns/fp
// import { format, formatISO, isMatch, parse, parseISO } from "date-fns/fp" adds extra 300kb to bundle size.
export { format } from "date-fns/fp/format";
export { formatISO } from "date-fns/fp/formatISO";
export { isMatch } from "date-fns/fp/isMatch";
export { isValid } from "date-fns/fp/isValid";
export { parse } from "date-fns/fp/parse";
export { parseWithOptions } from "date-fns/fp/parseWithOptions";
export { parseISO } from "date-fns/fp/parseISO";

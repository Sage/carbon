// Separate index.ts to export only required sub-modules from date-fns/fp
// import { format, formatISO, isMatch, parse, parseISO } from "date-fns/fp" adds extra 300kb to bundle size.
export { default as format } from "date-fns/fp/format";
export { default as formatISO } from "date-fns/fp/formatISO";
export { default as isMatch } from "date-fns/fp/isMatch";
export { default as isValid } from "date-fns/fp/isValid";
export { default as parse } from "date-fns/fp/parse";
export { default as parseWithOptions } from "date-fns/fp/parseWithOptions";
export { default as parseISO } from "date-fns/fp/parseISO";

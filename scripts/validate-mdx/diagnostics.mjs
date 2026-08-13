// @ts-check
import { locationAt } from "./utils.mjs";

/**
 * @param {ReturnType<import('./parse-mdx.mjs').parseMdxDocument>} document
 * @param {string} rule
 * @param {string} message
 * @param {number} [index]
 * @param {'error' | 'warning'} [severity]
 */
export default function diagnostic(
  document,
  rule,
  message,
  index = 0,
  severity = "error",
) {
  return {
    filePath: document.filePath,
    rule,
    message,
    severity,
    ...locationAt(document.content, index),
  };
}

import React from "react";

/**
 * Extracts plain text content from a React node.
 *
 * This utility recursively traverses a React node structure to extract all text content,
 * handling strings, numbers, arrays, and React elements. Non-text content like fragments
 * or components without text children will return an empty string.
 *
 * @param node - A React node which can be a string, number, element, array, or fragment
 *
 * @returns The extracted text content as a string, or an empty string if no text is found
 *
 * @example
 * ```typescript
 * // Extracts simple strings
 * extractTextFromNode('Hello World') // returns 'Hello World'
 *
 * // Extracts from React elements
 * extractTextFromNode(<span>Username</span>) // returns 'Username'
 *
 * // Handles nested structures
 * extractTextFromNode(<div>First <strong>Second</strong></div>) // returns 'First Second'
 *
 * // Returns empty for null/undefined
 * extractTextFromNode(null) // returns ''
 * ```
 */
function extractTextFromNode(node: React.ReactNode): string {
  if (!node) {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node
      .map(extractTextFromNode)
      .map((text) => text.trim())
      .filter(Boolean)
      .join(" ");
  }

  if (React.isValidElement(node)) {
    return extractTextFromNode(node.props.children);
  }

  return "";
}

export default extractTextFromNode;

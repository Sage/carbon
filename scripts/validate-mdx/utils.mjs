// @ts-check

/** @param {string} value */
export function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

/** @param {string} value */
export function normalizeSectionKey(value) {
  return normalizeWhitespace(value)
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[:!?]+$/g, "");
}

/**
 * Convert a section title to sentence case: only its first character is
 * uppercase. Whitespace is normalized so headings and Contents labels share
 * exactly the same canonical text.
 * @param {string} value
 */
export function sectionSentenceCase(value) {
  const normalized = normalizeWhitespace(value).toLocaleLowerCase("en");
  return normalized
    ? normalized[0].toLocaleUpperCase("en") + normalized.slice(1)
    : normalized;
}

/**
 * Replace fenced code with whitespace while preserving offsets and line breaks.
 * @param {string} content
 */
export function maskCodeFences(content) {
  return content.replace(/```[^\n]*\n[\s\S]*?```/g, (block) =>
    block.replace(/[^\n]/g, " "),
  );
}

/**
 * GitHub/Storybook-compatible-enough heading anchor for the headings used here.
 * @param {string} heading
 */
export function headingAnchor(heading) {
  return heading
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/&amp;/g, "and")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * @param {string} content
 * @param {number} index
 */
export function locationAt(content, index) {
  const before = content.slice(0, Math.max(0, index));
  const lines = before.split("\n");
  return { line: lines.length, column: lines.at(-1)?.length + 1 || 1 };
}

/**
 * Reduce MDX/Markdown to text that can count as authored prose.
 * @param {string} value
 */
export function plainText(value) {
  return normalizeWhitespace(
    value
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<Canvas\b[\s\S]*?\/>/g, " ")
      .replace(/<ArgTypes\b[\s\S]*?\/>/g, " ")
      .replace(/<Controls\b[\s\S]*?\/>/g, " ")
      .replace(/<Meta\b[\s\S]*?\/>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/^#{1,6}\s+.*$/gm, " ")
      .replace(/^import\s+.*$/gm, " ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[`*_~]/g, "")
      .replace(/\{\s*"\s*"\s*\}/g, " ")
      .replace(/&[a-zA-Z#0-9]+;/g, " "),
  );
}

/**
 * @param {string} content
 * @param {string} tagName
 */
export function findSelfClosingTags(content, tagName) {
  const tags = [];
  const regex = new RegExp(`<${tagName}\\b[\\s\\S]*?\\/>`, "g");
  let match;
  while ((match = regex.exec(content)) !== null) {
    tags.push({ raw: match[0], index: match.index, end: regex.lastIndex });
  }
  return tags;
}

/**
 * Infer H2 headings that are probably examples missing one `#`. A candidate
 * must be between Examples and Props, be absent from Contents, and contain at
 * least one Canvas. These constraints avoid guessing for legitimate sections.
 * @param {ReturnType<import('./parse-mdx.mjs').parseMdxDocument>} document
 */
export function findLikelyMisleveledExampleHeadings(document) {
  const examples = document.section("Examples");
  const props = document.section("Props");
  if (!examples || !props || examples.heading.index >= props.heading.index) {
    return [];
  }

  const tocAnchors = new Set(document.tocEntries.map(({ anchor }) => anchor));
  return document.sections
    .filter(
      (section) =>
        section.heading.index > examples.heading.index &&
        section.heading.index < props.heading.index &&
        !tocAnchors.has(headingAnchor(section.title)),
    )
    .filter((section) =>
      document.canvasTags.some(
        ({ index }) => index >= section.start && index < section.end,
      ),
    )
    .map(({ heading }) => heading);
}

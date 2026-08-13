// @ts-check
import diagnostic from "../diagnostics.mjs";
import {
  findLikelyMisleveledExampleHeadings,
  headingAnchor,
  sectionSentenceCase,
} from "../utils.mjs";

/** @param {string} title */
function canonicalLabel(title) {
  return sectionSentenceCase(title);
}

/** @param {ReturnType<import('../parse-mdx.mjs').parseMdxDocument>} document */
export default function validateContents(document) {
  const diagnostics = [];
  const contents = document.section("Contents");
  if (!contents) return diagnostics;
  if (!document.tocEntries.length) {
    diagnostics.push(
      diagnostic(
        document,
        "contents/empty",
        "Contents must contain Markdown links to the document sections.",
        contents.start,
      ),
    );
    return diagnostics;
  }

  const seenAnchors = new Set();
  for (const entry of document.tocEntries) {
    const heading = document.headingByAnchor(entry.anchor);
    if (!heading) {
      diagnostics.push(
        diagnostic(
          document,
          "contents/broken-link",
          `Contents entry “${entry.label}” points to missing #${entry.anchor}.`,
          entry.index,
        ),
      );
      continue;
    }
    const expectedLabel = canonicalLabel(heading.title);
    if (entry.label !== expectedLabel) {
      diagnostics.push(
        diagnostic(
          document,
          "contents/label",
          `Contents label “${entry.label}” does not use the canonical capitalization “${expectedLabel}”. Replace it with “- [${expectedLabel}](#${entry.anchor})”.`,
          entry.index,
        ),
      );
    }
    if (seenAnchors.has(entry.anchor)) {
      diagnostics.push(
        diagnostic(
          document,
          "contents/duplicate-entry",
          `Contents contains duplicate #${entry.anchor}.`,
          entry.index,
        ),
      );
    }
    seenAnchors.add(entry.anchor);
  }

  const likelyMisleveledExamples = new Set(
    findLikelyMisleveledExampleHeadings(document),
  );
  const expectedH2 = document.sections
    .filter(({ title }) => title !== "Contents")
    .map(({ heading }) => heading)
    .filter((heading) => !likelyMisleveledExamples.has(heading));
  for (const heading of expectedH2) {
    const anchor = headingAnchor(heading.title);
    if (!seenAnchors.has(anchor)) {
      const label = canonicalLabel(heading.title);
      diagnostics.push(
        diagnostic(
          document,
          "contents/missing-entry",
          `Add “- [${label}](#${anchor})” to Contents.`,
          contents.start,
        ),
      );
    }
  }

  const actualH2Order = document.tocEntries
    .map((entry) => document.headingByAnchor(entry.anchor))
    .filter((heading) => heading?.level === 2 && heading.title !== "Contents")
    .map((heading) => heading.index);
  if (
    actualH2Order.some((index, position) => index < actualH2Order[position - 1])
  ) {
    diagnostics.push(
      diagnostic(
        document,
        "contents/order",
        "Contents entries must follow the same order as the document sections.",
        contents.start,
      ),
    );
  }
  return diagnostics;
}

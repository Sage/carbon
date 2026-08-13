// @ts-check
import { REQUIRED_SECTIONS } from "../config.mjs";
import diagnostic from "../diagnostics.mjs";
import {
  findLikelyMisleveledExampleHeadings,
  sectionSentenceCase,
} from "../utils.mjs";

/** @param {string} title */
function canonicalSectionName(title) {
  return sectionSentenceCase(title);
}

/** @param {ReturnType<import('../parse-mdx.mjs').parseMdxDocument>} document */
export default function validateStructure(document) {
  const diagnostics = [];
  const h1s = document.headings.filter(({ level }) => level === 1);
  if (h1s.length !== 1) {
    diagnostics.push(
      diagnostic(
        document,
        "structure/h1",
        `Expected exactly one component H1, found ${h1s.length}.`,
        h1s[1]?.index ?? 0,
      ),
    );
  }

  for (const heading of document.headings) {
    if (heading.level > 4) {
      diagnostics.push(
        diagnostic(
          document,
          "structure/heading-depth",
          `Heading level H${heading.level} is not supported; use H4 or above.`,
          heading.index,
        ),
      );
    }
    if (heading.level > 1 && heading.parent?.level !== heading.level - 1) {
      diagnostics.push(
        diagnostic(
          document,
          "structure/heading-hierarchy",
          `H${heading.level} “${heading.title}” must be nested below an H${heading.level - 1}.`,
          heading.index,
        ),
      );
    }
  }

  const canonicalSeen = new Map();
  for (const section of document.sections) {
    const canonical = canonicalSectionName(section.title);
    if (canonical && section.title !== canonical) {
      diagnostics.push(
        diagnostic(
          document,
          "structure/section-name",
          `Rename section “${section.title}” to the canonical “${canonical}”.`,
          section.heading.index,
        ),
      );
    }
    if (canonicalSeen.has(canonical)) {
      diagnostics.push(
        diagnostic(
          document,
          "structure/duplicate-section",
          `Section “${section.title}” is duplicated.`,
          section.heading.index,
        ),
      );
    }
    canonicalSeen.set(canonical, section);
  }

  for (const required of REQUIRED_SECTIONS) {
    if (!canonicalSeen.has(required)) {
      diagnostics.push(
        diagnostic(
          document,
          "structure/missing-section",
          `Add the required “## ${required}” section and its content.`,
          h1s[0]?.index ?? 0,
        ),
      );
    }
  }

  for (const heading of findLikelyMisleveledExampleHeadings(document)) {
    diagnostics.push(
      diagnostic(
        document,
        "structure/example-heading-level",
        `“## ${heading.title}” looks like an example heading missing one “#”. Use “### ${heading.title}”.`,
        heading.index,
      ),
    );
  }

  let previousOrder = -1;
  for (const section of document.sections) {
    const canonical = canonicalSectionName(section.title);
    const order = REQUIRED_SECTIONS.indexOf(canonical);
    if (order === -1) continue;
    if (order < previousOrder) {
      diagnostics.push(
        diagnostic(
          document,
          "structure/section-order",
          `Section “${section.title}” is out of order. Follow the standard ${REQUIRED_SECTIONS.join(" → ")} flow.`,
          section.heading.index,
        ),
      );
    } else {
      previousOrder = order;
    }
  }
  return diagnostics;
}

// @ts-check
import { KNOWN_SECTIONS } from "./skills-config.mjs";

/**
 * Extract stories imports from MDX content.
 * Matches namespace imports (`import * as X from "..."`) and default imports
 * (`import X from "....stories"`).
 * @param {string} content
 * @returns {Map<string, string>} alias -> relative path
 */
export function extractStoriesImports(content) {
  const storiesImports = new Map();
  const namespaceImportRegex =
    /^import\s+\*\s+as\s+(\w+)\s+from\s+["']([^"']+)["']/;
  const defaultImportRegex = /^import\s+(\w+)\s+from\s+["']([^"']+)["']/;

  for (const line of content.split("\n")) {
    const nsMatch = line.match(namespaceImportRegex);
    if (nsMatch) {
      storiesImports.set(nsMatch[1], nsMatch[2]);
      continue;
    }
    const defMatch = line.match(defaultImportRegex);
    if (defMatch && defMatch[2].includes(".stories")) {
      storiesImports.set(defMatch[1], defMatch[2]);
    }
  }

  return storiesImports;
}

/**
 * Parse an MDX file content into structured data.
 * @param {string} content
 * @returns {import("./skills-types.mjs").ParsedMdx}
 */
export function parseMdxFile(content) {
  const normalized = content.replace(/\r\n/g, "\n");

  // Extract imports (namespace: import * as X from "..." AND default: import X from "...")
  const storiesImports = extractStoriesImports(normalized);

  // Extract component title (first H1)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const componentTitle = titleMatch ? titleMatch[1].trim() : "Unknown";

  // Extract description: text between PDS link closing tag (or H1) and ## Contents
  const description = extractDescription(content);

  // Extract category
  const category = extractCategory(content);

  // Extract Quick Start section (heading + full content)
  const quickStart = extractQuickStart(content);

  // Extract examples (Canvas refs grouped by heading)
  const examples = extractExamples(content);

  // Extract ArgType refs
  const argTypeRefs = extractArgTypeRefs(content);

  // Extract Designer Notes section
  const designerNotes = extractSection(content, "Designer Notes");

  // Extract Related Components section
  const relatedComponents = extractSection(content, "Related Components");

  // Extract Ref methods section
  const refMethods = extractSection(content, "Ref methods");

  // Extract other sections not in the known set
  const otherSections = extractOtherSections(content);

  return {
    componentTitle,
    description,
    category,
    quickStart,
    storiesImports,
    examples,
    argTypeRefs,
    designerNotes,
    relatedComponents,
    refMethods,
    otherSections,
  };
}

/**
 * Extract description text from MDX content.
 * Skips any leading <DeprecationWarning> block and PDS/zeroheight link.
 * @param {string} content
 * @returns {string}
 */
export function extractDescription(content) {
  // Start after the H1 title
  const h1Match = content.match(/^#\s+.+$/m);
  if (!h1Match) return "";
  let startIdx = h1Match.index + h1Match[0].length + 1;

  // Skip <DeprecationWarning>...</DeprecationWarning> block if it immediately follows H1
  const deprecWarningStart = content.indexOf("<DeprecationWarning", startIdx);
  if (
    deprecWarningStart !== -1 &&
    content.slice(startIdx, deprecWarningStart).trim() === ""
  ) {
    const deprecWarningEnd = content.indexOf(
      "</DeprecationWarning>",
      deprecWarningStart,
    );
    if (deprecWarningEnd !== -1) {
      startIdx = deprecWarningEnd + "</DeprecationWarning>".length;
    }
  }

  // Skip PDS/zeroheight <a> link if it immediately follows (after H1 or DeprecationWarning)
  const pdsTextIdx = content.indexOf("Product Design System", startIdx);
  if (pdsTextIdx !== -1) {
    const pdsAStart = content.lastIndexOf("<a", pdsTextIdx);
    if (
      pdsAStart !== -1 &&
      pdsAStart >= startIdx &&
      content.slice(startIdx, pdsAStart).trim() === ""
    ) {
      const pdsAEnd = content.indexOf("</a>", pdsAStart);
      if (pdsAEnd !== -1) {
        startIdx = pdsAEnd + "</a>".length;
      }
    }
  }

  // Find where description ends: **Category:** or first ## heading
  const categoryIdx = content.indexOf("**Category:**", startIdx);
  const contentsIdx = content.indexOf("## Contents", startIdx);
  const nextH2Idx = content.indexOf("\n## ", startIdx);

  const candidates = [
    categoryIdx !== -1 ? categoryIdx : Infinity,
    contentsIdx !== -1 ? contentsIdx : Infinity,
    nextH2Idx !== -1 ? nextH2Idx : Infinity,
    content.length,
  ];
  const endIdx = Math.min(...candidates);

  return content.slice(startIdx, endIdx).trim();
}

/**
 * Extract category from MDX content.
 * Returns null if no category is defined.
 * @param {string} content
 * @returns {string | null}
 */
export function extractCategory(content) {
  const categoryMatch = content.match(/\*\*Category:\*\*\s*(.+?)(?:\n|$)/);
  if (!categoryMatch) return null;
  return categoryMatch[1].trim();
}

/**
 * Extract the full Quick Start section (preserving heading and all content).
 * @param {string} content
 * @returns {{ heading: string, content: string } | null}
 */
export function extractQuickStart(content) {
  const quickStartMatch = content.match(/^(##\s+Quick\s*Start)\s*$/im);
  if (!quickStartMatch) return null;

  const heading = quickStartMatch[1].trim();
  const afterQS = content.slice(
    quickStartMatch.index + quickStartMatch[0].length,
  );
  const nextH2 = afterQS.match(/^##\s+/m);
  const sectionContent = nextH2 ? afterQS.slice(0, nextH2.index) : afterQS;

  return { heading, content: sectionContent.trim() };
}

/**
 * Extract examples grouped by heading with their Canvas references.
 * @param {string} content
 * @returns {Array<{heading: string, items: Array<{description: string, canvasRef: import("./skills-types.mjs").CanvasRef | null}>}>}
 */
export function extractExamples(content) {
  const examplesMatch = content.match(/^##\s+Examples\s*$/m);
  if (!examplesMatch) return [];

  const afterExamples = content.slice(
    examplesMatch.index + examplesMatch[0].length,
  );
  // End at next ## heading (Props, Translation keys, etc.)
  const nextH2 = afterExamples.match(/^##\s+/m);
  const examplesSection = nextH2
    ? afterExamples.slice(0, nextH2.index)
    : afterExamples;

  /** @type {Array<{heading: string, items: Array<{description: string, canvasRef: import("./skills-types.mjs").CanvasRef | null}>}>} */
  const examples = [];

  // Split by ### headings
  const headingRegex = /^###\s+(.+)$/gm;
  /** @type {RegExpExecArray | null} */
  let headingMatch;
  const headings = [];

  while ((headingMatch = headingRegex.exec(examplesSection)) !== null) {
    headings.push({
      title: headingMatch[1].trim(),
      index: headingMatch.index + headingMatch[0].length,
    });
  }

  for (let i = 0; i < headings.length; i++) {
    if (headings[i].title.toLowerCase() === "interactive demo") continue;

    const start = headings[i].index;
    const end =
      i + 1 < headings.length
        ? headings[i + 1].index - headings[i + 1].title.length - 4
        : examplesSection.length;
    const block = examplesSection.slice(start, end);

    // Split block by <Canvas .../> elements, capturing the description before each
    const canvasRegex = /<Canvas\s+of=\{(\w+)\.(\w+)\}\s*\/>/g;
    /** @type {Array<{description: string, canvasRef: import("./skills-types.mjs").CanvasRef | null}>} */
    const items = [];
    let lastIndex = 0;
    /** @type {RegExpExecArray | null} */
    let canvasMatch;
    while ((canvasMatch = canvasRegex.exec(block)) !== null) {
      const description = block.slice(lastIndex, canvasMatch.index).trim();
      items.push({
        description,
        canvasRef: {
          alias: canvasMatch[1],
          exportName: canvasMatch[2],
          heading: headings[i].title,
        },
      });
      lastIndex = canvasMatch.index + canvasMatch[0].length;
    }

    // If no Canvas found, still capture the block as a prose-only item
    if (items.length === 0) {
      const prose = block.trim();
      if (prose) {
        items.push({ description: prose, canvasRef: null });
      }
    } else {
      // Capture any trailing text after the last Canvas as a prose-only item
      const trailing = block.slice(lastIndex).trim();
      if (trailing) {
        items.push({ description: trailing, canvasRef: null });
      }
    }

    if (items.length > 0) {
      examples.push({
        heading: headings[i].title,
        items,
      });
    }
  }

  return examples;
}

/**
 * Extract ArgType references from the Props section.
 * @param {string} content
 * @returns {import("./skills-types.mjs").ArgTypeRef[]}
 */
export function extractArgTypeRefs(content) {
  const propsMatch = content.match(/^##\s+Props\s*$/m);
  if (!propsMatch) return [];

  const afterProps = content.slice(propsMatch.index + propsMatch[0].length);
  const nextH2 = afterProps.match(/^##\s+/m);
  const propsSection = nextH2 ? afterProps.slice(0, nextH2.index) : afterProps;

  /** @type {import("./skills-types.mjs").ArgTypeRef[]} */
  const refs = [];
  const headingRegex = /^###\s+(.+)$/gm;
  const argTypeOnlyRegex = /<ArgTypes[\s\S]*?of=\{(\w+)\}[\s\S]*?\/>/g;

  const headingsInSection = [];
  let hMatch;
  while ((hMatch = headingRegex.exec(propsSection)) !== null) {
    headingsInSection.push({ title: hMatch[1].trim(), index: hMatch.index });
  }

  let aMatch;
  while ((aMatch = argTypeOnlyRegex.exec(propsSection)) !== null) {
    let heading = null;
    for (const h of headingsInSection) {
      if (h.index < aMatch.index) heading = h.title;
    }
    refs.push({ alias: aMatch[1], heading });
  }

  return refs;
}

/**
 * Extract a named section (## SectionName) content.
 * @param {string} content
 * @param {string} sectionName
 * @returns {string | null}
 */
export function extractSection(content, sectionName) {
  const regex = new RegExp(`^##\\s+${sectionName}\\s*$`, "m");
  const match = regex.exec(content);
  if (!match) return null;

  const afterSection = content.slice(match.index + match[0].length);
  const nextH2 = afterSection.match(/^##\s+/m);
  const sectionContent = nextH2
    ? afterSection.slice(0, nextH2.index).trim()
    : afterSection.trim();
  return sectionContent || null;
}

/**
 * Extract sections that are not in the known/handled set.
 * @param {string} content
 * @returns {Array<{title: string, content: string}>}
 */
export function extractOtherSections(content) {
  const h2Regex = /^##\s+(.+)$/gm;
  /** @type {Array<{title: string, index: number, endOfHeading: number}>} */
  const allH2 = [];
  let m;
  while ((m = h2Regex.exec(content)) !== null) {
    allH2.push({
      title: m[1].trim(),
      index: m.index,
      endOfHeading: m.index + m[0].length,
    });
  }

  /** @type {Array<{title: string, content: string}>} */
  const others = [];
  for (let i = 0; i < allH2.length; i++) {
    if (KNOWN_SECTIONS.has(allH2[i].title.toLowerCase())) continue;
    const start = allH2[i].endOfHeading;
    const end = i + 1 < allH2.length ? allH2[i + 1].index : content.length;
    const sectionContent = content.slice(start, end).trim();
    if (sectionContent) {
      others.push({ title: allH2[i].title, content: sectionContent });
    }
  }
  return others;
}

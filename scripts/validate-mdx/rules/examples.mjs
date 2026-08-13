// @ts-check
import diagnostic from "../diagnostics.mjs";
import { plainText } from "../utils.mjs";

/** @param {string} value */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** @param {string} title @param {string} prop */
function headingMentionsProp(title, prop) {
  const escaped = escapeRegExp(prop);
  return new RegExp(
    `(^|[^\\p{L}\\p{N}_$-])${escaped}($|[^\\p{L}\\p{N}_$-])`,
    "u",
  ).test(title.replace(/\(Deprecated\)/g, ""));
}

/** @param {string} content */
function inlineCodeIdentifiers(content) {
  const identifiers = new Set();
  const withoutFences = content.replace(/```[\s\S]*?```/g, "");
  for (const match of withoutFences.matchAll(/(?<!`)`([^`\n]+)`(?!`)/g)) {
    const identifier = match[1].trim();
    if (/^[A-Za-z_$][\w$-]*$/.test(identifier)) {
      identifiers.add(identifier);
    }
  }
  return identifiers;
}

/**
 * @param {ReturnType<import('../parse-mdx.mjs').parseMdxDocument>} document
 * @param {import('../source-inspector.mjs').default} inspector
 */
export default function validateExamples(document, inspector) {
  const diagnostics = [];
  const examples = document.section("Examples");
  if (!examples) return diagnostics;

  const exampleHeadings = document.headings.filter(
    ({ level, index }) =>
      level === 3 && index >= examples.heading.end && index < examples.end,
  );
  const canvases = document.canvasTags.filter(
    ({ index }) => index >= examples.heading.end && index < examples.end,
  );
  const storySources = new Map(
    document.storyImports.map(({ alias, source }) => [
      alias,
      inspector.resolveStory(document.filePath, source),
    ]),
  );

  for (const [headingIndex, heading] of exampleHeadings.entries()) {
    const blockEnd = exampleHeadings[headingIndex + 1]?.index ?? examples.end;
    const childHeadings = document.headings.filter(
      ({ level, index }) =>
        level === 4 && index > heading.end && index < blockEnd,
    );
    const firstChild = childHeadings[0];
    const firstDirectCanvas = canvases.find(
      ({ index }) => index > heading.end && index < blockEnd,
    );
    const descriptionEnd = Math.min(
      firstChild?.index ?? blockEnd,
      firstDirectCanvas?.index ?? blockEnd,
    );
    const description = plainText(
      document.content.slice(heading.end, descriptionEnd),
    );

    const deprecatedProps = new Set();
    for (const canvas of canvases.filter(
      ({ index }) => index > heading.end && index < blockEnd,
    )) {
      const alias = canvas.raw.match(
        /<Canvas of=\{([A-Za-z_$][\w$]*)\.[A-Za-z_$][\w$]*\} \/>/,
      )?.[1];
      const storySource = alias ? storySources.get(alias) : null;
      if (!storySource) continue;
      for (const prop of inspector.deprecatedPropsForStory(storySource)) {
        deprecatedProps.add(prop);
      }
    }
    const inlineIdentifiers = inlineCodeIdentifiers(
      document.content.slice(heading.end, blockEnd),
    );
    const presentedDeprecatedProps = [...deprecatedProps].filter(
      (prop) =>
        inlineIdentifiers.has(prop) || headingMentionsProp(heading.title, prop),
    );
    if (
      presentedDeprecatedProps.length &&
      !heading.title.includes("(Deprecated)")
    ) {
      diagnostics.push(
        diagnostic(
          document,
          "examples/deprecated-prop",
          `Example “${heading.title}” explicitly presents deprecated ${presentedDeprecatedProps.length > 1 ? "props" : "prop"} ${presentedDeprecatedProps.map((prop) => `“${prop}”`).join(", ")}. Prefix the heading with “(Deprecated)”: “### (Deprecated) ${heading.title}”.`,
          heading.index,
        ),
      );
    }

    // A description on the H3 covers every Canvas and H4 in the example.
    if (description) continue;

    if (!childHeadings.length || firstDirectCanvas?.index < firstChild?.index) {
      diagnostics.push(
        diagnostic(
          document,
          "examples/description",
          `Add a short text below “### ${heading.title}” explaining when or why to use this example.`,
          heading.index,
        ),
      );
    }

    // Without an H3 description, every H4 must provide its own text.
    for (const [childIndex, childHeading] of childHeadings.entries()) {
      const childBlockEnd = childHeadings[childIndex + 1]?.index ?? blockEnd;
      const firstChildCanvas = canvases.find(
        ({ index }) => index > childHeading.end && index < childBlockEnd,
      );
      const childDescription = plainText(
        document.content.slice(
          childHeading.end,
          firstChildCanvas?.index ?? childBlockEnd,
        ),
      );
      if (!childDescription) {
        diagnostics.push(
          diagnostic(
            document,
            "examples/description",
            `Add a short text below “#### ${childHeading.title}” because its parent “### ${heading.title}” has no description.`,
            childHeading.index,
          ),
        );
      }
    }
  }

  for (const canvas of canvases) {
    const heading = document.headingBefore(canvas.index, examples.heading.end);
    if (!heading || heading.level < 3 || heading.level > 4) {
      diagnostics.push(
        diagnostic(
          document,
          "examples/heading",
          "Each example Canvas must belong to an H3 example or one of its H4 subsections.",
          canvas.index,
        ),
      );
    }
    const parentExample =
      heading?.level === 3
        ? heading
        : heading?.parent?.level === 3
          ? heading.parent
          : null;
    if (!parentExample) {
      diagnostics.push(
        diagnostic(
          document,
          "examples/heading",
          "Each example Canvas must ultimately belong to an H3 example.",
          canvas.index,
        ),
      );
    }
  }
  return diagnostics;
}

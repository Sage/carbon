// @ts-check
import diagnostic from "../diagnostics.mjs";

/**
 * @param {ReturnType<import('../parse-mdx.mjs').parseMdxDocument>} document
 * @param {import('../source-inspector.mjs').default} inspector
 */
export default function validateStorybookBlocks(document, inspector) {
  const diagnostics = [];
  const aliases = new Map();
  for (const storyImport of document.storyImports) {
    const sourcePath = inspector.resolveStory(
      document.filePath,
      storyImport.source,
    );
    aliases.set(storyImport.alias, sourcePath);
    if (!sourcePath) {
      diagnostics.push(
        diagnostic(
          document,
          "storybook/story-import",
          `Cannot resolve stories import “${storyImport.source}”.`,
          storyImport.index,
        ),
      );
    }
  }

  const rawCanvasCount = (document.masked.match(/<Canvas\b/g) ?? []).length;
  if (rawCanvasCount !== document.canvasTags.length) {
    diagnostics.push(
      diagnostic(
        document,
        "storybook/canvas-self-closing",
        "Every Canvas must be a self-closing tag.",
        document.masked.indexOf("<Canvas"),
      ),
    );
  }
  for (const canvas of document.canvasTags) {
    const match = canvas.raw.match(
      /^<Canvas of=\{([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\} \/>$/,
    );
    if (!match) {
      const detail = /\bname\s*=/.test(canvas.raw)
        ? " Remove the name prop; the story export already identifies the example."
        : "";
      diagnostics.push(
        diagnostic(
          document,
          "storybook/canvas-format",
          `Use exactly “<Canvas of={Stories.Example} />”.${detail}`,
          canvas.index,
        ),
      );
      continue;
    }
    const [, alias, exportName] = match;
    const sourcePath = aliases.get(alias);
    if (sourcePath === undefined) {
      diagnostics.push(
        diagnostic(
          document,
          "storybook/canvas-alias",
          `Canvas references “${alias}”, which is not a namespace stories import.`,
          canvas.index,
        ),
      );
    } else if (
      sourcePath &&
      !inspector.exportedNames(sourcePath).has(exportName)
    ) {
      diagnostics.push(
        diagnostic(
          document,
          "storybook/canvas-story",
          `Story “${alias}.${exportName}” is not exported by ${document.storyImports.find(({ alias: value }) => value === alias)?.source}.`,
          canvas.index,
        ),
      );
    }
  }

  const rawArgTypesCount = (document.masked.match(/<ArgTypes\b/g) ?? []).length;
  if (rawArgTypesCount !== document.argTypesTags.length) {
    diagnostics.push(
      diagnostic(
        document,
        "storybook/argtypes-self-closing",
        "Every ArgTypes block must be self-closing.",
        document.masked.indexOf("<ArgTypes"),
      ),
    );
  }
  for (const [argTypesIndex, argTypes] of document.argTypesTags.entries()) {
    const ofMatch = argTypes.raw.match(/\bof=\{([A-Za-z_$][\w$]*)\}/);
    if (!ofMatch) {
      diagnostics.push(
        diagnostic(
          document,
          "storybook/argtypes-of",
          "ArgTypes must contain a correctly spaced of={Stories} reference.",
          argTypes.index,
        ),
      );
      continue;
    }
    const alias = ofMatch[1];
    if (!aliases.has(alias)) {
      diagnostics.push(
        diagnostic(
          document,
          "storybook/argtypes-alias",
          `ArgTypes references “${alias}”, which is not a namespace stories import.`,
          argTypes.index,
        ),
      );
    }
    const onlyOf = `<ArgTypes of={${alias}} />`;
    const hasExtraProps = /\b(exclude|include)=/.test(argTypes.raw);
    const validFormat = hasExtraProps
      ? argTypes.raw.startsWith(`<ArgTypes\n  of={${alias}}`) &&
        argTypes.raw.endsWith("\n/>")
      : argTypes.raw === onlyOf;
    if (!validFormat || /\bname\s*=/.test(argTypes.raw)) {
      diagnostics.push(
        diagnostic(
          document,
          "storybook/argtypes-format",
          hasExtraProps
            ? "Format multiline ArgTypes with Prettier-style two-space indentation and a final /> line."
            : `Use exactly “${onlyOf}”.`,
          argTypes.index,
        ),
      );
    }
    if (document.sectionAt(argTypes.index)?.title !== "Props") {
      diagnostics.push(
        diagnostic(
          document,
          "storybook/argtypes-section",
          "ArgTypes must be inside the Props section.",
          argTypes.index,
        ),
      );
    }
    const previousArgTypes = document.argTypesTags[argTypesIndex - 1];
    const propsStart = document.sectionAt(argTypes.index)?.heading.end ?? 0;
    const heading = document.headingBefore(
      argTypes.index,
      previousArgTypes?.end ?? propsStart,
    );
    if (document.argTypesTags.length > 1 && heading?.level !== 3) {
      diagnostics.push(
        diagnostic(
          document,
          "storybook/argtypes-heading",
          "Props contains multiple ArgTypes blocks. Add an H3 component name before each block.",
          argTypes.index,
        ),
      );
    }
  }
  if (document.section("Props") && !document.argTypesTags.length) {
    diagnostics.push(
      diagnostic(
        document,
        "storybook/missing-argtypes",
        "Props must contain at least one ArgTypes block.",
        document.section("Props").start,
      ),
    );
  }

  for (const meta of document.metaTags) {
    const match = meta.raw.match(/\bof=\{([A-Za-z_$][\w$]*)\}/);
    if (!match || !aliases.has(match[1])) {
      diagnostics.push(
        diagnostic(
          document,
          "storybook/meta",
          "Meta must reference an imported stories namespace with of={Stories}.",
          meta.index,
        ),
      );
    }
  }
  if (document.metaTags.length !== 1) {
    diagnostics.push(
      diagnostic(
        document,
        "storybook/meta-count",
        `Expected exactly one Meta block, found ${document.metaTags.length}.`,
        document.metaTags[1]?.index ?? 0,
      ),
    );
  }
  return diagnostics;
}

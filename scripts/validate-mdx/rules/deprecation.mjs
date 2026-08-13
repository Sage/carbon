// @ts-check
import diagnostic from "../diagnostics.mjs";
import { plainText } from "../utils.mjs";

/**
 * @param {ReturnType<import('../parse-mdx.mjs').parseMdxDocument>} document
 * @param {import('../source-inspector.mjs').default} inspector
 * @param {Array<{source: string, defaultImport: string | null, named: Array<{imported: string, typeOnly?: boolean}>, namespace: string | null}>} componentImports
 */
export default function validateDeprecation(
  document,
  inspector,
  componentImports,
) {
  const diagnostics = [];
  const primaryStoryAlias = document.metaTags[0]?.raw.match(
    /\b(?:of|component)=\{([A-Za-z_$][\w$]*)\}/,
  )?.[1];
  const primaryStoryImports = primaryStoryAlias
    ? document.storyImports.filter(({ alias }) => alias === primaryStoryAlias)
    : document.storyImports.slice(0, 1);
  const deprecatedFromStories = primaryStoryImports.some((storyImport) => {
    const storyPath = inspector.resolveStory(
      document.filePath,
      storyImport.source,
    );
    return storyPath ? inspector.isDeprecatedStory(storyPath) : false;
  });
  // The first component import is the documented module. Later imports are
  // supporting components and must not mark the page itself as deprecated.
  const deprecatedFromComponent = componentImports[0]
    ? Boolean(inspector.inspectComponentImport(componentImports[0])?.deprecated)
    : false;
  const shouldBeDeprecated = deprecatedFromStories || deprecatedFromComponent;
  const hasWarning = document.deprecationTags.length > 0;

  if (shouldBeDeprecated && !hasWarning) {
    diagnostics.push(
      diagnostic(
        document,
        "deprecation/missing-warning",
        "Code marks this component as deprecated; add a DeprecationWarning after the H1.",
        document.headings.find(({ level }) => level === 1)?.end ?? 0,
      ),
    );
  }
  if (document.deprecationTags.length > 1) {
    diagnostics.push(
      diagnostic(
        document,
        "deprecation/count",
        "Use exactly one DeprecationWarning block.",
        document.deprecationTags[1].index,
      ),
    );
  }
  for (const warning of document.deprecationTags) {
    if (plainText(warning.raw).length < 20) {
      diagnostics.push(
        diagnostic(
          document,
          "deprecation/text",
          "DeprecationWarning must explain the deprecation and recommended migration.",
          warning.index,
        ),
      );
    }
    const h1 = document.headings.find(({ level }) => level === 1);
    const contents = document.section("Contents");
    if (
      (h1 && warning.index < h1.end) ||
      (contents && warning.index > contents.heading.index)
    ) {
      diagnostics.push(
        diagnostic(
          document,
          "deprecation/position",
          "Place DeprecationWarning after the H1 and before the description and Contents.",
          warning.index,
        ),
      );
    }
  }
  if (hasWarning) {
    const hasImport = new RegExp(
      "^import\\s+DeprecationWarning\\s+from\\s+[\"'][^\"']*deprecation-warning\\.component[\"'];?$",
      "m",
    ).test(document.masked);
    if (!hasImport) {
      diagnostics.push(
        diagnostic(
          document,
          "deprecation/import",
          "Import DeprecationWarning from .storybook/utils/deprecation-warning.component.",
          document.deprecationTags[0].index,
        ),
      );
    }
    if (!shouldBeDeprecated) {
      diagnostics.push(
        diagnostic(
          document,
          "deprecation/unverified",
          "DeprecationWarning is present, but no component-level @deprecated annotation or Deprecated/ story title was detected.",
          document.deprecationTags[0].index,
          "warning",
        ),
      );
    }
  }
  return diagnostics;
}

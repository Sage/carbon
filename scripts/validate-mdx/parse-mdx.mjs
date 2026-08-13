// @ts-check
import ts from "typescript";
import {
  findSelfClosingTags,
  headingAnchor,
  maskCodeFences,
  plainText,
} from "./utils.mjs";

/**
 * @typedef {{level: number, title: string, index: number, end: number, line: number, parent: Heading | null}} Heading
 * @typedef {{title: string, heading: Heading, start: number, end: number, content: string}} Section
 * @typedef {{alias: string, source: string, index: number}} StoryImport
 */

/**
 * @param {string} content
 * @param {string} filePath
 */
export function parseMdxDocument(content, filePath) {
  const masked = maskCodeFences(content);
  /** @type {Heading[]} */
  const headings = [];
  /** @type {Heading[]} */
  const stack = [];
  const headingRegex = /^(#{1,6})[ \t]+(.+?)[ \t]*$/gm;
  let headingMatch;
  while ((headingMatch = headingRegex.exec(masked)) !== null) {
    const level = headingMatch[1].length;
    while (stack.length && stack.at(-1).level >= level) stack.pop();
    const heading = {
      level,
      title: content
        .slice(
          headingMatch.index + headingMatch[1].length,
          headingRegex.lastIndex,
        )
        .trim(),
      index: headingMatch.index,
      end: headingRegex.lastIndex,
      line: content.slice(0, headingMatch.index).split("\n").length,
      parent: stack.at(-1) ?? null,
    };
    headings.push(heading);
    stack.push(heading);
  }

  const h2s = headings.filter((heading) => heading.level === 2);
  /** @type {Section[]} */
  const sections = h2s.map((heading, index) => {
    const end = h2s[index + 1]?.index ?? content.length;
    return {
      title: heading.title,
      heading,
      start: heading.end,
      end,
      content: content.slice(heading.end, end).trim(),
    };
  });

  /** @type {StoryImport[]} */
  const storyImports = [];
  const storyImportRegex =
    /^import\s+\*\s+as\s+([A-Za-z_$][\w$]*)\s+from\s+["']([^"']+\.stories(?:\.[^"']+)*)["'];?/gm;
  let importMatch;
  while ((importMatch = storyImportRegex.exec(masked)) !== null) {
    storyImports.push({
      alias: importMatch[1],
      source: importMatch[2],
      index: importMatch.index,
    });
  }
  const defaultStoryImportRegex =
    /^import\s+([A-Za-z_$][\w$]*)\s+from\s+["']([^"']+\.stories(?:\.[^"']+)*)["'];?/gm;
  while ((importMatch = defaultStoryImportRegex.exec(masked)) !== null) {
    if (!storyImports.some(({ alias }) => alias === importMatch[1])) {
      storyImports.push({
        alias: importMatch[1],
        source: importMatch[2],
        index: importMatch.index,
      });
    }
  }

  const categoryMatches = [
    ...content.matchAll(/^\*\*Category:\*\*[ \t]*(.+?)[ \t]*$/gm),
  ].map((match) => ({
    value: match[1].trim(),
    index: match.index,
  }));

  const h1 = headings.find((heading) => heading.level === 1) ?? null;
  const contentsSection = sections.find(
    (section) => section.title.toLowerCase() === "contents",
  );
  const descriptionRegion = h1
    ? content.slice(h1.end, contentsSection?.heading.index ?? content.length)
    : "";
  const description = plainText(
    descriptionRegion
      .replace(
        /<DeprecationWarning\b[^>]*>[\s\S]*?<\/DeprecationWarning>/g,
        " ",
      )
      .replace(/<a\b[^>]*>[\s\S]*?Product Design System[\s\S]*?<\/a>/gi, " ")
      .replace(/^\*\*Category:\*\*.*$/gm, " "),
  );

  const tocEntries = [];
  if (contentsSection) {
    const tocRegex = /^(\s*)-\s+\[([^\]]+)\]\(#([^)]+)\)\s*$/gm;
    let tocMatch;
    while ((tocMatch = tocRegex.exec(contentsSection.content)) !== null) {
      const absoluteIndex = contentsSection.start + tocMatch.index;
      tocEntries.push({
        indent: tocMatch[1].length,
        label: tocMatch[2].trim(),
        anchor: tocMatch[3].trim(),
        index: absoluteIndex,
      });
    }
  }

  return {
    filePath,
    content,
    masked,
    headings,
    sections,
    storyImports,
    categoryMatches,
    description,
    tocEntries,
    canvasTags: findSelfClosingTags(masked, "Canvas"),
    argTypesTags: findSelfClosingTags(masked, "ArgTypes"),
    metaTags: findSelfClosingTags(masked, "Meta"),
    deprecationTags: [
      ...masked.matchAll(
        /<DeprecationWarning\b[^>]*>[\s\S]*?<\/DeprecationWarning>/g,
      ),
    ].map((match) => ({
      raw: content.slice(match.index, match.index + match[0].length),
      index: match.index,
      end: match.index + match[0].length,
    })),
    section(title) {
      return sections.find((section) => section.title === title) ?? null;
    },
    sectionAt(index) {
      return (
        sections.find(
          (section) => index >= section.heading.index && index < section.end,
        ) ?? null
      );
    },
    headingBefore(index, minimumIndex = 0) {
      return (
        headings
          .filter(
            (heading) => heading.index >= minimumIndex && heading.index < index,
          )
          .at(-1) ?? null
      );
    },
    headingByAnchor(anchor) {
      return headings.find(
        (heading) => headingAnchor(heading.title) === anchor,
      );
    },
  };
}

/**
 * Parse imports from fenced Quick start snippets with TypeScript's parser.
 * @param {string} sectionContent
 */
export function parseQuickStartImports(sectionContent) {
  const imports = [];
  const parseErrors = [];
  const fenceRegex = /```(?:js|javascript|jsx|ts|tsx)?\s*\n([\s\S]*?)```/g;
  let fenceMatch;
  while ((fenceMatch = fenceRegex.exec(sectionContent)) !== null) {
    const code = fenceMatch[1];
    const sourceFile = ts.createSourceFile(
      "quick-start.tsx",
      code,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    if (/^\s*import\s/m.test(code)) {
      for (const diagnostic of sourceFile.parseDiagnostics) {
        parseErrors.push({
          message: ts.flattenDiagnosticMessageText(diagnostic.messageText, " "),
          index: fenceMatch.index + (diagnostic.start ?? 0),
        });
      }
    }
    sourceFile.forEachChild((node) => {
      if (
        !ts.isImportDeclaration(node) ||
        !ts.isStringLiteral(node.moduleSpecifier)
      ) {
        return;
      }
      const clause = node.importClause;
      const named = [];
      let namespace = null;
      if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        for (const element of clause.namedBindings.elements) {
          named.push({
            imported: element.propertyName?.text ?? element.name.text,
            local: element.name.text,
            typeOnly: clause.isTypeOnly || element.isTypeOnly,
          });
        }
      } else if (
        clause?.namedBindings &&
        ts.isNamespaceImport(clause.namedBindings)
      ) {
        namespace = clause.namedBindings.name.text;
      }
      imports.push({
        source: node.moduleSpecifier.text,
        defaultImport: clause?.name?.text ?? null,
        named,
        namespace,
        index: fenceMatch.index + node.getStart(sourceFile),
      });
    });
  }
  return { imports, parseErrors };
}

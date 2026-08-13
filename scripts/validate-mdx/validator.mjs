// @ts-check
import { parseMdxDocument } from "./parse-mdx.mjs";
import validateContents from "./rules/contents.mjs";
import validateDeprecation from "./rules/deprecation.mjs";
import validateExamples from "./rules/examples.mjs";
import validateMetadata from "./rules/metadata.mjs";
import validateQuickStart from "./rules/quick-start.mjs";
import validateStorybookBlocks from "./rules/storybook.mjs";
import validateStructure from "./rules/structure.mjs";

/**
 * @param {string} content
 * @param {string} filePath
 * @param {import('./source-inspector.mjs').default} inspector
 */
export default function validateMdx(content, filePath, inspector) {
  const document = parseMdxDocument(content, filePath);
  const quickStart = validateQuickStart(document, inspector);
  return [
    ...validateStructure(document),
    ...validateMetadata(document),
    ...validateContents(document),
    ...validateStorybookBlocks(document, inspector),
    ...validateExamples(document, inspector),
    ...quickStart.diagnostics,
    ...validateDeprecation(document, inspector, quickStart.componentImports),
  ];
}

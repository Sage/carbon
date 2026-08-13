// @ts-check
import { CATEGORIES } from "../config.mjs";
import { extractDescription } from "../../skills/mdx-parser.mjs";
import diagnostic from "../diagnostics.mjs";
import { plainText } from "../utils.mjs";

/** @param {ReturnType<import('../parse-mdx.mjs').parseMdxDocument>} document */
export default function validateMetadata(document) {
  const diagnostics = [];
  const h1 = document.headings.find(({ level }) => level === 1);
  const buildSkillsDescription = plainText(
    extractDescription(document.content),
  );
  if (!buildSkillsDescription) {
    const categoryBeforeDescription =
      document.categoryMatches.length === 1 && Boolean(document.description);
    diagnostics.push(
      diagnostic(
        document,
        categoryBeforeDescription
          ? "metadata/description-order"
          : "metadata/description",
        categoryBeforeDescription
          ? "The component description must be placed before “**Category:**”."
          : "Add a component description before “**Category:**” and Contents.",
        document.categoryMatches[0]?.index ?? h1?.end ?? 0,
      ),
    );
  }

  if (document.categoryMatches.length !== 1) {
    diagnostics.push(
      diagnostic(
        document,
        "metadata/category",
        `Expected exactly one “**Category:**” declaration, found ${document.categoryMatches.length}.`,
        document.categoryMatches[1]?.index ?? h1?.end ?? 0,
      ),
    );
  } else {
    const category = document.categoryMatches[0];
    if (!CATEGORIES.has(category.value)) {
      diagnostics.push(
        diagnostic(
          document,
          "metadata/category-value",
          `Unknown category “${category.value}”. Use one of: ${[...CATEGORIES].join(", ")}.`,
          category.index,
        ),
      );
    }
    const contents = document.section("Contents");
    if (contents && category.index > contents.heading.index) {
      diagnostics.push(
        diagnostic(
          document,
          "metadata/category-position",
          "Place the category after the component description and before Contents.",
          category.index,
        ),
      );
    }
  }
  return diagnostics;
}

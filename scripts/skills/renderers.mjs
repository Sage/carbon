// @ts-check
import { escapePipes } from "./utils.mjs";
import { transformLinks } from "./links.mjs";

/**
 * Render the props table.
 * @param {import("./skills-types.mjs").PropInfo[]} props
 * @returns {string}
 */
export function renderPropsTable(props) {
  if (!props.length) return "No props metadata found.\n";

  const sortedProps = [...props].sort((a, b) => {
    if (a.deprecated !== b.deprecated) return a.deprecated ? 1 : -1;
    if (a.required !== b.required) return a.required ? -1 : 1;
    const groupOrder = (/** @type {string} */ name) =>
      name.startsWith("data-") ? 1 : name.startsWith("aria-") ? 2 : 0;
    const ga = groupOrder(a.name);
    const gb = groupOrder(b.name);
    if (ga !== gb) return ga - gb;
    return a.name.localeCompare(b.name);
  });

  const hasDeprecated = sortedProps.some((p) => p.deprecated);
  const lines = [];

  if (hasDeprecated) {
    lines.push(
      "| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |",
    );
    lines.push("| --- | --- | --- | --- | --- | --- | --- | --- |");
  } else {
    lines.push("| Name | Type | Required | Literals | Description | Default |");
    lines.push("| --- | --- | --- | --- | --- | --- |");
  }

  for (const prop of sortedProps) {
    const literals = prop.literals?.join(" | ") ?? "";
    const description = prop.description?.replace(/\s+/g, " ") ?? "";
    const defaultValue = (prop.defaultValue ?? "").replace(/\r/g, "");

    if (hasDeprecated) {
      lines.push(
        `| ${prop.name} | ${escapePipes(prop.type)} | ${prop.required ? "Yes" : "No"} | ${escapePipes(literals)} | ${prop.deprecated ? "Yes" : ""} | ${escapePipes((prop.deprecationReason ?? "").replace(/\s+/g, " ").trim())} | ${escapePipes(description)} | ${escapePipes(defaultValue)} |`,
      );
    } else {
      lines.push(
        `| ${prop.name} | ${escapePipes(prop.type)} | ${prop.required ? "Yes" : "No"} | ${escapePipes(literals)} | ${escapePipes(description)} | ${escapePipes(defaultValue)} |`,
      );
    }
  }

  return lines.join("\n") + "\n";
}

/**
 * Render the full component index.md content (no skill frontmatter).
 * @param {import("./skills-types.mjs").ParsedMdx} parsed
 * @param {Map<string, import("./skills-types.mjs").PropInfo[]>} propsMap - heading -> props
 * @param {import("./skills-types.mjs").ExampleFile[]} exampleFiles
 * @param {boolean} isDeprecated
 * @param {Set<string>} availableSlugs
 * @returns {string}
 */
export function renderSkillMd(
  parsed,
  propsMap,
  exampleFiles,
  isDeprecated,
  availableSlugs,
) {
  const lines = [`# ${parsed.componentTitle}`, ""];

  if (isDeprecated) {
    lines.push(
      "> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)",
      "",
    );
  }

  if (parsed.description) {
    lines.push(transformLinks(parsed.description, availableSlugs), "");
  }

  if (parsed.category) {
    lines.push(`**Category:** ${parsed.category}`, "");
  }

  if (parsed.quickStart) {
    lines.push(parsed.quickStart.heading, "", parsed.quickStart.content, "");
  }

  if (parsed.designerNotes) {
    lines.push(
      "## Designer Notes",
      "",
      transformLinks(parsed.designerNotes, availableSlugs),
      "",
    );
  }

  if (parsed.relatedComponents) {
    lines.push(
      "## Related Components",
      "",
      transformLinks(parsed.relatedComponents, availableSlugs),
      "",
    );
  }

  for (const section of parsed.otherSections) {
    lines.push(
      `## ${section.title}`,
      "",
      transformLinks(section.content, availableSlugs),
      "",
    );
  }

  if (exampleFiles.length > 0) {
    lines.push("## Examples", "");
    const byHeading = new Map();
    for (const ef of exampleFiles) {
      const existing = byHeading.get(ef.heading) ?? [];
      existing.push({ fileName: ef.fileName, description: ef.description });
      byHeading.set(ef.heading, existing);
    }

    for (const [heading, items] of byHeading.entries()) {
      lines.push(`### ${heading}`, "");
      for (const { fileName, description } of items) {
        if (description) {
          lines.push(transformLinks(description, availableSlugs), "");
        }
        if (fileName) {
          lines.push(`See: \`examples/${fileName}\``, "");
        }
      }
    }
  }

  if (propsMap.size > 0) {
    lines.push("## Props", "");
    for (const [heading, props] of propsMap.entries()) {
      lines.push(`### ${heading}`, "");
      lines.push(renderPropsTable(props));
    }
  }

  if (parsed.refMethods) {
    lines.push("## Ref methods", "", parsed.refMethods, "");
  }

  return lines.join("\n");
}

/**
 * Render the root SKILL.md content for the centralized carbon-react skill.
 * @returns {string}
 */
export function renderSkillRootContent() {
  return [
    "---",
    "name: carbon-react",
    "description: Carbon component catalog with typed props, Storybook usage examples, and curated docs references. Use proactively when the user asks about any Carbon component and its props, which component to use for a given UI need, migrating a deprecated component, usage guidance or when implementing or reviewing any UI built with carbon-react.",
    "---",
    "",
    "# Carbon Component Catalog",
    "",
    "Use `index.md` to find a component and its description.",
    "Use `components/{slug}/index.md` for a component's props and examples.",
    "Use `components/{slug}/examples/*.md` for example source code.",
    "",
    "## Deprecated components",
    "",
    "Deprecated components are marked in `index.md` and in their file.",
    "Prefer the non-legacy version (`button`) over the legacy one (`button-legacy`) unless explicitly asked.",
    "Do not use deprecated props unless explicitly asked.",
    "For migrating a deprecated component, read `references/docs/deprecation-migration.md`.",
    "",
    "## Reference docs",
    "",
    "- `references/docs/usage.md` — general usage guide",
    "- `references/docs/installation.md` — installation",
    "- `references/docs/recommended-practices.md` — recommended practices",
    "- `references/docs/validations.md` — validation for input components",
    "- `references/docs/useMediaQuery.md` — custom React hook and a JavaScript implementation of a CSS media query",
    "- `references/docs/deprecation-migration.md` — deprecated components migration guide",
    "- `references/docs/usage-with-routing.md` — using Carbon components with routing libraries",
    "- `references/docs/i18n.md` — how localisation works in Carbon",
    "",
  ].join("\n");
}

/**
 * Render the catalog index.md listing all components with descriptions, organized by category.
 * @param {Array<{title: string, slug: string, description: string, category: string, isDeprecated: boolean}>} entries
 * @returns {string}
 */
export function renderIndexContent(entries) {
  // Group entries by category
  const byCategory = new Map();
  for (const entry of entries) {
    const cat = entry.category || "Other";
    if (!byCategory.has(cat)) {
      byCategory.set(cat, []);
    }
    byCategory.get(cat).push(entry);
  }

  // Sort categories, with "Other" at the end
  const categories = Array.from(byCategory.keys()).sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });

  const lines = ["# Carbon Component Catalog", ""];

  for (const category of categories) {
    const entries = byCategory.get(category) || [];
    // Sort entries by title within each category
    entries.sort((a, b) => a.title.localeCompare(b.title));

    lines.push(`### ${category}`, "");
    lines.push("| Component | Description | Deprecated |");
    lines.push("| --- | --- | --- |");

    for (const entry of entries) {
      const deprecatedLabel = entry.isDeprecated ? "Yes" : "No";
      const link = `[${entry.title}](components/${entry.slug}/)`;
      lines.push(
        `| ${link} | ${entry.description || ""} | ${deprecatedLabel} |`,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

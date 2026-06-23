// @ts-check
import { referenceSlugMap, referenceDocSelfSlugMap } from "./skills-config.mjs";

/**
 * Transform Storybook links to skill-relative links or plain text.
 * @param {string} content
 * @param {Set<string>} availableSlugs
 * @returns {string}
 */
export function transformLinks(content, availableSlugs) {
  // Handle markdown links: [text](../?path=/docs/slug--docs) or [text](?path=/docs/slug--docs)
  let result = content.replace(
    /\[([^\]]+)\]\(\.{0,2}\/?\??path=\/(?:docs|story)\/([^#)]+?)(?:--(?:docs|[^#)]*))?(?:#[^)]*)?\)/g,
    (match, text, slug) => {
      if (availableSlugs.has(slug)) {
        return `[${text}](../${slug}/index.md)`;
      }
      if (referenceSlugMap.has(slug)) {
        return `[${text}](${referenceSlugMap.get(slug)})`;
      }
      return text;
    },
  );

  // Handle HTML <a> tags with storybook paths
  result = result.replace(
    /<a[^>]*href="[^"]*\?path=\/(?:docs|story)\/([^#"]+?)(?:--(?:docs|[^#"]*))?(?:#[^"]*)?"[^>]*>([\s\S]*?)<\/a>/g,
    (match, slug, text) => {
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      if (availableSlugs.has(slug)) {
        return `[${cleanText}](../${slug}/index.md)`;
      }
      if (referenceSlugMap.has(slug)) {
        return `[${cleanText}](${referenceSlugMap.get(slug)})`;
      }
      return cleanText;
    },
  );

  return result;
}

/**
 * Transform Storybook links for reference doc context (references/docs/).
 * Component slugs → ../../components/{slug}/index.md
 * Reference doc slugs → ./filename.md
 * @param {string} content
 * @param {Set<string>} availableSlugs
 * @returns {string}
 */
export function transformLinksForRefDoc(content, availableSlugs) {
  let result = content.replace(
    /\[([^\]]+)\]\(\.{0,2}\/?\??path=\/(?:docs|story)\/([^#)]+?)(?:--(?:docs|[^#)]*))?(?:#[^)]*)?\)/g,
    (match, text, slug) => {
      if (availableSlugs.has(slug)) {
        return `[${text}](../../components/${slug}/index.md)`;
      }
      if (referenceDocSelfSlugMap.has(slug)) {
        return `[${text}](${referenceDocSelfSlugMap.get(slug)})`;
      }
      return text;
    },
  );

  result = result.replace(
    /<a[^>]*href="[^"]*\?path=\/(?:docs|story)\/([^#"]+?)(?:--(?:docs|[^#"]*))?(?:#[^"]*)?"[^>]*>([\s\S]*?)<\/a>/g,
    (match, slug, text) => {
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      if (availableSlugs.has(slug)) {
        return `[${cleanText}](../../components/${slug}/index.md)`;
      }
      if (referenceDocSelfSlugMap.has(slug)) {
        return `[${cleanText}](${referenceDocSelfSlugMap.get(slug)})`;
      }
      return cleanText;
    },
  );

  return result;
}

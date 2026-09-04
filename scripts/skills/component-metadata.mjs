// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";

/**
 * Human-authored guidance that cannot be derived reliably from component code.
 *
 * @typedef {Object} ComponentMetadata
 * @property {string} component
 * @property {string} summary
 * @property {string[]} [useWhen]
 * @property {string[]} [avoidWhen]
 * @property {Array<{component: string, when: string}>} [alternatives]
 * @property {string[]} [pitfalls]
 * @property {Array<{story: string, description: string}>} [examples]
 */

/**
 * Load and validate build-time component guidance.
 *
 * These files deliberately live outside `src` so they cannot become runtime
 * package modules. The skill generator is their only consumer.
 *
 * @param {string} metadataDir
 * @returns {Promise<Map<string, ComponentMetadata>>}
 */
export async function loadComponentMetadata(metadataDir) {
  const metadataByComponent = new Map();
  const files = fg.sync("*.json", { cwd: metadataDir, absolute: true }).sort();

  for (const filePath of files) {
    let value;
    try {
      value = JSON.parse(await fs.readFile(filePath, "utf8"));
    } catch (error) {
      throw new Error(
        `${path.relative(process.cwd(), filePath)} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    const metadata = validateComponentMetadata(value, filePath);
    const expectedFileName = `${toKebabCase(metadata.component)}.json`;
    if (path.basename(filePath) !== expectedFileName) {
      throw new Error(
        `${path.relative(process.cwd(), filePath)} must be named ${expectedFileName}`,
      );
    }
    if (metadataByComponent.has(metadata.component)) {
      throw new Error(
        `Duplicate component metadata for ${metadata.component}: ${path.relative(process.cwd(), filePath)}`,
      );
    }
    metadataByComponent.set(metadata.component, metadata);
  }

  return metadataByComponent;
}

/**
 * @param {unknown} value
 * @param {string} filePath
 * @returns {ComponentMetadata}
 */
export function validateComponentMetadata(
  value,
  filePath = "component metadata",
) {
  if (!isRecord(value)) fail(filePath, "must contain a JSON object");

  const allowedKeys = new Set([
    "component",
    "summary",
    "useWhen",
    "avoidWhen",
    "alternatives",
    "pitfalls",
    "examples",
  ]);
  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key))
      fail(filePath, `contains unknown field \"${key}\"`);
  }

  requireText(value.component, filePath, "component");
  requireText(value.summary, filePath, "summary");
  requireTextArray(value.useWhen, filePath, "useWhen");
  requireTextArray(value.avoidWhen, filePath, "avoidWhen");
  requireTextArray(value.pitfalls, filePath, "pitfalls");

  if (value.alternatives !== undefined) {
    if (!Array.isArray(value.alternatives) || value.alternatives.length === 0) {
      fail(
        filePath,
        'field "alternatives" must be a non-empty array when provided',
      );
    }
    const components = new Set();
    for (const [index, alternative] of value.alternatives.entries()) {
      if (!isRecord(alternative)) {
        fail(filePath, `alternatives[${index}] must be an object`);
      }
      rejectUnknownKeys(
        alternative,
        new Set(["component", "when"]),
        filePath,
        `alternatives[${index}]`,
      );
      requireText(
        alternative.component,
        filePath,
        `alternatives[${index}].component`,
      );
      requireText(alternative.when, filePath, `alternatives[${index}].when`);
      if (components.has(alternative.component)) {
        fail(
          filePath,
          `references alternative \"${alternative.component}\" more than once`,
        );
      }
      components.add(alternative.component);
    }
  }

  if (value.examples !== undefined) {
    if (!Array.isArray(value.examples) || value.examples.length === 0) {
      fail(
        filePath,
        'field "examples" must be a non-empty array when provided',
      );
    }
    const stories = new Set();
    for (const [index, example] of value.examples.entries()) {
      if (!isRecord(example)) {
        fail(filePath, `examples[${index}] must be an object`);
      }
      rejectUnknownKeys(
        example,
        new Set(["story", "description"]),
        filePath,
        `examples[${index}]`,
      );
      requireText(example.story, filePath, `examples[${index}].story`);
      requireText(
        example.description,
        filePath,
        `examples[${index}].description`,
      );
      if (stories.has(example.story)) {
        fail(filePath, `selects story \"${example.story}\" more than once`);
      }
      stories.add(example.story);
    }
  }

  return /** @type {ComponentMetadata} */ (value);
}

/** @param {unknown} value */
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @param {string} filePath
 * @param {string} field
 */
function requireText(value, filePath, field) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(filePath, `field \"${field}\" must be a non-empty string`);
  }
}

/**
 * @param {unknown} value
 * @param {string} filePath
 * @param {string} field
 * @param {boolean} [required]
 */
function requireTextArray(value, filePath, field, required = false) {
  if (value === undefined && !required) return;
  if (!Array.isArray(value) || value.length === 0) {
    fail(
      filePath,
      `field \"${field}\" must be a non-empty array when provided`,
    );
  }
  for (const [index, item] of value.entries()) {
    requireText(item, filePath, `${field}[${index}]`);
  }
}

/**
 * @param {Record<string, unknown>} value
 * @param {Set<string>} allowedKeys
 * @param {string} filePath
 * @param {string} field
 */
function rejectUnknownKeys(value, allowedKeys, filePath, field) {
  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key)) {
      fail(filePath, `${field} contains unknown field \"${key}\"`);
    }
  }
}

/** @param {string} value */
function toKebabCase(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .toLowerCase();
}

/** @param {string} filePath @param {string} message */
function fail(filePath, message) {
  throw new Error(`${path.relative(process.cwd(), filePath)} ${message}`);
}

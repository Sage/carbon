// @ts-check

/**
 * @typedef {Object} PropsDefinition
 * @property {string} name
 * @property {import("ts-morph").InterfaceDeclaration | import("ts-morph").TypeAliasDeclaration} node
 */

/**
 * @typedef {Object} PropInfo
 * @property {string} name
 * @property {string} type
 * @property {boolean} required
 * @property {Array<string | number | boolean> | null} literals
 * @property {string | null} description
 * @property {string | null} defaultValue
 * @property {boolean} deprecated
 * @property {string | null} deprecationReason
 */

/**
 * @typedef {Object} CanvasRef
 * @property {string} alias
 * @property {string} exportName
 * @property {string} heading
 */

/**
 * @typedef {Object} ArgTypeRef
 * @property {string} alias
 * @property {string | null} heading
 */

/**
 * @typedef {Object} MdxSection
 * @property {string} title
 * @property {string} content
 */

/**
 * @typedef {Object} ParsedMdx
 * @property {string} componentTitle
 * @property {string} description
 * @property {string | null} category
 * @property {{ heading: string, content: string } | null} quickStart
 * @property {Map<string, string>} storiesImports - alias -> relative path
 * @property {Array<{heading: string, items: Array<{description: string, canvasRef: CanvasRef | null}>}>} examples
 * @property {ArgTypeRef[]} argTypeRefs
 * @property {string | null} designerNotes
 * @property {string | null} relatedComponents
 * @property {string | null} refMethods
 * @property {Array<{title: string, content: string}>} otherSections
 */

/**
 * @typedef {Object} MdxEntry
 * @property {string} mdxPath
 * @property {string} content
 * @property {boolean} isNext
 * @property {string} baseName
 * @property {boolean} isDeprecated
 */

/**
 * @typedef {Object} OutputFile
 * @property {string} path
 * @property {string} content
 */

/**
 * @typedef {Object} ExampleFile
 * @property {string} heading
 * @property {string | null} fileName
 * @property {string} description
 */

export {};

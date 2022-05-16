import * as pathModule from "path";
import fg from "fast-glob";
import * as ttp from "typescript-to-proptypes";

/**
 * Generate a TypeScript program object for all the ts files in src
 */
async function generateTsProgram() {
  const tsconfig = ttp.loadConfig(
    pathModule.resolve(pathModule.resolve(), "./tsconfig.json")
  );

  const tsFiles = await fg("**/*.{ts,tsx}", {
    absolute: true,
    cwd: pathModule.resolve(pathModule.resolve(), "./src"),
  });

  return ttp.createProgram(tsFiles, tsconfig);
}

/**
 * Generate a PropTypes AST from the TypeScript interfaces in the current file
 * @param filename File to get the prop types from
 * @param program TypeScript program object
 */
function generateProptypes(filename, program) {
  return ttp.parseFromProgram(filename, program);
}

export { generateTsProgram, generateProptypes };

/* eslint-disable no-console */
import * as fs from "fs";
import * as path from "path";
import fg from "fast-glob";
import * as ttp from "typescript-to-proptypes";

import generateJsProptypes from "./generate_js_proptypes";

function filterExistingPropTypes(defFiles: string[], tsComponents: string[]) {
  const filesWithoutPropTypes: string[] = [];

  defFiles.forEach((defFile) => {
    if (!tsComponents.some((component) => defFile.includes(component))) {
      return;
    }

    const jsFile = defFile.replace(".d.ts", ".js");
    const source = fs.readFileSync(jsFile, "utf8");

    // Check component has props and propTypes
    if (!source.includes(".propTypes = {")) {
      filesWithoutPropTypes.push(defFile);
    }
  });

  return filesWithoutPropTypes;
}

async function runScript() {
  const srcComponentsPath = path.resolve(__dirname, "../../src/components");
  const libComponentsPath = path.resolve(__dirname, "../../lib/components");

  const tsComponentPaths = await fg("**/*.component.tsx", {
    absolute: true,
    cwd: srcComponentsPath,
  });

  const tsComponents = tsComponentPaths.map((tsComponentPath: string) => {
    const startIndex = tsComponentPath.lastIndexOf("/");
    const endIndex = tsComponentPath.indexOf(".component");

    return tsComponentPath.substring(startIndex + 1, endIndex);
  });

  const allDefFiles = await fg("**/*.component.d.ts", {
    absolute: true,
    cwd: libComponentsPath,
  });

  const filteredDefFiles = filterExistingPropTypes(allDefFiles, tsComponents);

  const tsconfig = ttp.loadConfig(
    path.resolve(__dirname, "../../tsconfig.json")
  );

  const program = ttp.createProgram(filteredDefFiles, tsconfig);

  filteredDefFiles.forEach(async (defFile) => {
    const jsFile = defFile.replace(".d.ts", ".js");

    try {
      await generateJsProptypes(program, jsFile, defFile);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      err.message = `${defFile}: ${err.message}`;
      console.error(err);
      process.exit(1);
    }
  });
}

runScript();

import * as ttp from "typescript-to-proptypes";
import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";

import injectProptypes from "./inject";

const prettierConfig = prettier.resolveConfig.sync(process.cwd(), {
  config: path.join(__dirname, "../../.prettierrc.json"),
});

const newlineIssuesRegExp = new RegExp(/(?<=(\/>)|,)(\r?\n){2}/g);

function fixBabelNewlineIssues(source: string) {
  return source.replace(newlineIssuesRegExp, "\n");
}

export default async function generateJsProptypes(
  program: ttp.ts.Program,
  jsFile: string,
  tsFile: string
): Promise<void> {
  const proptypesAST = ttp.parseFromProgram(tsFile, program, {
    checkDeclarations: true,
  });

  if (proptypesAST.body.length === 0) {
    return;
  }

  const source = fs.readFileSync(jsFile, "utf8");
  source.toString();

  const result = injectProptypes(proptypesAST, source);

  if (!result) {
    throw new Error(`Unable to inject propTypes into ${jsFile}.`);
  }

  const formatted = prettier.format(result, {
    ...prettierConfig,
    filepath: jsFile,
  });
  const finalSource = fixBabelNewlineIssues(formatted);

  await fs.writeFile(jsFile, finalSource, (err) => {
    if (err) throw err;
  });
}

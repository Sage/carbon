import fs from "fs";
import path from "path";

import tokenJSON from "@sage/design-tokens-fusion/json/global.json" with { type: "json" };
import modeJSON from "@sage/design-tokens-fusion/json/light.json" with { type: "json" };
import badgeJSON from "@sage/design-tokens-fusion/json/components/badge.json" with { type: "json" };
import buttonJSON from "@sage/design-tokens-fusion/json/components/button.json" with { type: "json" };
import containerJSON from "@sage/design-tokens-fusion/json/components/container.json" with { type: "json" };
import datavizJSON from "@sage/design-tokens-fusion/json/components/dataviz.json" with { type: "json" };
import focusJSON from "@sage/design-tokens-fusion/json/components/focus.json" with { type: "json" };
import inputJSON from "@sage/design-tokens-fusion/json/components/input.json" with { type: "json" };
import linkJSON from "@sage/design-tokens-fusion/json/components/link.json" with { type: "json" };
import logoJSON from "@sage/design-tokens-fusion/json/components/logo.json" with { type: "json" };
import messageJSON from "@sage/design-tokens-fusion/json/components/message.json" with { type: "json" };
import navJSON from "@sage/design-tokens-fusion/json/components/nav.json" with { type: "json" };
import pageJSON from "@sage/design-tokens-fusion/json/components/page.json" with { type: "json" };
import pillJSON from "@sage/design-tokens-fusion/json/components/pill.json" with { type: "json" };
import popoverJSON from "@sage/design-tokens-fusion/json/components/popover.json" with { type: "json" };
import profileJSON from "@sage/design-tokens-fusion/json/components/profile.json" with { type: "json" };
import progressJSON from "@sage/design-tokens-fusion/json/components/progress.json" with { type: "json" };
import tabJSON from "@sage/design-tokens-fusion/json/components/tab.json" with { type: "json" };
import tableJSON from "@sage/design-tokens-fusion/json/components/table.json" with { type: "json" };

import modeDarkJSON from "@sage/design-tokens-fusion/json/dark.json" with { type: "json" };

const projectRoot = process.cwd();
const args = process.argv.slice(2);
const includeDarkMode = args.includes('--include-dark') || args.includes('--dark');

const camelToKebab = (str) => 
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // camelCase to kebab-case
    .replace(/([a-zA-Z])(\d+)([a-zA-Z])/g, "$1-$2-$3") // letter-number-letter: container2xs -> container-2-xs
    .toLowerCase()
    .replace(/stop(\d)/g, "stop-$1") // stop1 -> stop-1
    .replace(/w([a-z])$/g, "w-$1"); // max-ws -> max-w-s etc.

const formatBoxShadowString = (boxShadowArray) => 
  boxShadowArray
    .map((boxShadow) => {
      const { type, offsetX, offsetY, blur, spread, color } = boxShadow;
      return `${type} ${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
    })
    .join(", ");


const formatTypographyString = ({
  fontFamily,
  fontWeight,
  lineHeight,
  fontSize,
}) => {
  if (fontFamily.includes("sage-icons")) {
    return `${fontSize} ${fontFamily}`;
  }

  return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
};

const SPACE = "  ";

const generateFusionTokens = (tokens) =>
  Object.entries(tokens)
    .map(([key, value]) => {
      const kebabKey = camelToKebab(key);
      if (kebabKey.includes("depth") && Array.isArray(value)) {
        return `${SPACE}--${kebabKey}: ${formatBoxShadowString(value)};`;
      }

      if (kebabKey.includes("font") && typeof value === "object") {
        return `${SPACE}--${kebabKey}: ${formatTypographyString(value)};`;
      }

      return `${SPACE}--${kebabKey}: ${value};`;
    })
    .join("\r\n");

const light = {
  ...tokenJSON,
  ...modeJSON,
  ...badgeJSON,
  ...buttonJSON,
  ...containerJSON,
  ...focusJSON,
  ...datavizJSON,
  ...inputJSON,
  ...logoJSON,
  ...linkJSON,
  ...messageJSON,
  ...navJSON,
  ...pageJSON,
  ...popoverJSON,
  ...profileJSON,
  ...progressJSON,
  ...pillJSON,
  ...tabJSON,
  ...tableJSON,
};

const filterDarkModeDuplicates = () => {
  const lightEntries = Object.entries(light).map(([key]) => key);
  const darkEntries = Object.entries(modeDarkJSON).filter(
    ([key, value]) => lightEntries.includes(key) && light[key] !== value
  );
  return Object.fromEntries(darkEntries);
};

// Generate CSS strings
const lightCSS = generateFusionTokens(light);

let staticTokensCSS;
if (includeDarkMode) {
  const darkCSS = generateFusionTokens(filterDarkModeDuplicates());
  staticTokensCSS = `
${lightCSS}

carbon-dark-mode, [data-carbon-theme="dark"] {
  ${darkCSS}
}
`;
} else {
  staticTokensCSS = `
${lightCSS}
`;
}

const outputDir = path.join(projectRoot, "src/components/tokens-wrapper/__internal__/static-tokens");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Also generate as a JS string for styled-components
const jsExport = `
export default \`${staticTokensCSS}\`;
`;

fs.writeFileSync(
  path.join(outputDir, "index.js"),
  jsExport
);

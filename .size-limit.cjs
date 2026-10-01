const peerDependencies = [
  "@sage/design-tokens",
  "react",
  "react-dom",
  "styled-components",
];

const createCheck = (name, path, imported) => ({
  name,
  path,
  import: imported,
  gzip: true,
  ignore: peerDependencies,
});

module.exports = [
  createCheck("Icon", "lib/components/icon/index.js", "Icon"),
  createCheck("Button", "lib/components/button/index.js", "Button"),
  createCheck("Box", "lib/components/box/index.js", "Box"),
  createCheck("Textbox", "lib/components/textbox/index.js", "Textbox"),
  createCheck(
    "TextEditor",
    "lib/components/text-editor/index.js",
    "TextEditor",
  ),
  createCheck("Select", "lib/components/select/index.js", "{ Select }"),
  createCheck("Menu", "lib/components/menu/index.js", "{ Menu }"),
  createCheck("Dialog", "lib/components/dialog/index.js", "Dialog"),
  createCheck("DateInput", "lib/components/date/index.js", "DateInput"),
  createCheck(
    "FlatTable",
    "lib/components/flat-table/index.js",
    "{ FlatTable }",
  ),
];

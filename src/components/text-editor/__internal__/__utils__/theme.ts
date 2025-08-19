import { EditorThemeClasses } from "lexical";

/** The theme overrides needed to correctly style the editor */
const THEME: EditorThemeClasses = {
  text: {
    bold: "textBold",
    italic: "textItalic",
    underline: "textUnderline",
  },
};

const getTheme = () => THEME;

const setTheme = (newTheme: EditorThemeClasses) => {
  Object.assign(THEME, newTheme);
};

export { getTheme, setTheme, THEME };

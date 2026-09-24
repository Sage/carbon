import type Locale from "../../../locales/locale";

type ResolvedFileInputLocale = Omit<
  Required<Locale["fileInput"]>,
  "actions"
> & {
  actions: Required<Locale["fileInput"]["actions"]>;
};

export default ResolvedFileInputLocale;

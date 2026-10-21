import type Locale from "../../../locales/locale";

export type ResolvedFileInputLocale = Omit<
  Required<Locale["fileInput"]>,
  "actions" | "announcements"
> & {
  actions: Required<Locale["fileInput"]["actions"]>;
  announcements: Required<NonNullable<Locale["fileInput"]["announcements"]>>;
};

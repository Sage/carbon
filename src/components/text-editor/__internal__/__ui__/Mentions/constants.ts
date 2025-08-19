export const PUNCTUATION =
  "\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%'\"~=<>_:;";

export const NAME = `\\b[A-Z][^\\s${PUNCTUATION}]`;

export const DocumentMentionsRegex = {
  NAME,
  PUNCTUATION,
};

export const PUNC = DocumentMentionsRegex.PUNCTUATION;
export const TRIGGERS = ["@"].join("");
export const VALID_CHARS = `[^${TRIGGERS}${PUNC}\\s]`;
export const VALID_JOINS =
  `(?:` +
  `\\.[ |$]|` + // E.g. "r. " in "Mr. Smith"
  ` |` + // E.g. " " in "Josh Duck"
  `[${PUNC}]|` + // E.g. "-' in "Salier-Hellendag"
  `)`;
export const LENGTH_LIMIT = 75;
export const ALIAS_LENGTH_LIMIT = 50;
export const SUGGESTION_LIST_LENGTH_LIMIT = 5;

export const AtSignMentionsRegex = new RegExp(
  `(^|\\s|\\()(` +
    `[${TRIGGERS}]` +
    `((?:${VALID_CHARS}${VALID_JOINS}){0,${LENGTH_LIMIT}})` +
    `)$`,
);
export const AtSignMentionsRegexAliasRegex = new RegExp(
  `(^|\\s|\\()(` +
    `[${TRIGGERS}]` +
    `((?:${VALID_CHARS}){0,${ALIAS_LENGTH_LIMIT}})` +
    `)$`,
);

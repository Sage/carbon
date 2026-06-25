const PUNCTUATION =
  "\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%'\"~=<>_:;";

const NAME = `\\b[A-Z][^\\s${PUNCTUATION}]`;

const DocumentMentionsRegex = {
  NAME,
  PUNCTUATION,
};

const PUNC = DocumentMentionsRegex.PUNCTUATION;
const TRIGGERS = ["@"].join("");
const VALID_CHARS = `[^${TRIGGERS}${PUNC}\\s]`;
const VALID_JOINS =
  `(?:` +
  `\\.[ |$]|` + // E.g. "r. " in "Mr. Smith"
  ` |` + // E.g. " " in "Josh Duck"
  `[${PUNC}]|` + // E.g. "-' in "Salier-Hellendag"
  `)`;
const LENGTH_LIMIT = 75;
const ALIAS_LENGTH_LIMIT = 50;
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

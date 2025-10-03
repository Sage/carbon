import { MenuTextMatch } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import {
  AtSignMentionsRegex,
  AtSignMentionsRegexAliasRegex,
} from "./constants";

export function checkForAtSignMentions(
  text: string,
  minMatchLength: number,
): MenuTextMatch | null {
  // Check the text against the regex for mentions.

  const match =
    AtSignMentionsRegex.exec(text) || AtSignMentionsRegexAliasRegex.exec(text);

  // If a match is found, check if it meets the minimum match length.
  // If it does, return the match details.
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];

    // The matching string is the part of the text that matches the regex.
    const matchingString = match[3];

    // If the matching string is shorter than the minimum match length, return null.
    if (matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: match[2],
      };
    }
  }

  return null;
}

export function getPossibleQueryMatch(text: string): MenuTextMatch | null {
  // Matches must be at least 1 character long.
  return checkForAtSignMentions(text, 1);
}

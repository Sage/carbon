/* istanbul ignore file */
/**
 * Owing to the nature of how this plugin runs, it is not possible to test it in isolation.
 * It is tested as part of the TextEditor Playwright tests.
 *
 * The AutoLinkerPlugin component is a wrapper around the AutoLinkPlugin component provided
 * by Lexical. It is used to automatically convert URLs and email addresses into clickable
 * links.
 *
 * The regular expressions used to match URLs and email addresses are provided as per the
 * Lexical documentation; as such not all edge cases may be covered.
 */
import {
  AutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from "@lexical/react/LexicalAutoLinkPlugin";

import React from "react";

const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)(?<![-.+():%])/;

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, (text) => {
    return text.startsWith("http") ? text : `https://${text}`;
  }),
  createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
    return `mailto:${text}`;
  }),
];

const AutoLinkerPlugin = () => {
  return <AutoLinkPlugin matchers={MATCHERS} />;
};

export default AutoLinkerPlugin;

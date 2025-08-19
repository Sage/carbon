export { default } from "./text-editor.component";
export { createEmpty, createFromHTML } from "./__internal__/__utils__/helpers";
export type {
  TextEditorHandle,
  TextEditorProps,
  EditorFormattedValues,
} from "./__internal__/__utils__/interfaces.types";

export { default as MentionsPlugin } from "./__internal__/__ui__/Mentions/";
export type { Mention } from "./__internal__/__ui__/Mentions";

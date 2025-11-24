import { MarginProps } from "styled-system";

import { TagProps } from "../../../../__internal__/utils/helpers/tags";
import { LexicalEditor } from "lexical";
import { RefObject } from "react";

export interface TextEditorHandle {
  /** Programmatically focus on the text editor. */
  focus: () => void;
}

export interface TextEditorProps extends MarginProps, TagProps {
  /** The maximum number of characters allowed in the editor */
  characterLimit?: number;
  /** The message to be shown when the editor is in an error state */
  error?: string;
  /** Custom footer content to be displayed below the editor */
  footer?: React.ReactNode;
  /** Custom header content to be displayed above the editor */
  header?: React.ReactNode;
  /** A hint string rendered before the editor but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /** The label to display above the editor */
  labelText: string;
  /** The identifier for the Text Editor. This allows for the using of multiple Text Editors on a screen */
  namespace?: string;
  /** Callback that is triggered when the editor loses focus. */
  onBlur?: (ev: React.FocusEvent<HTMLElement>) => void;
  /**
   * [Legacy] Callback that is triggered when the editor's cancel button is activated. The cancel button is rendered when this function is provided.
   * @deprecated Please ensure that `TextEditor` is used as a part of a `Form` component, which will handle the cancel functionality.
   */
  onCancel?: () => void;
  /** Callback that is triggered when the editor's text content is modified or styled. */
  onChange?: (value: string, formattedValues: EditorFormattedValues) => void;
  /** Callback that is triggered when the editor gains focus. */
  onFocus?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** Callback that is triggered when a link is added in the editor's content. */
  onLinkAdded?: (link: string, state: string) => void;
  /**
   * [Legacy] Callback that is triggered when the editor's save button is activated. The save button is rendered when this function is provided.
   * @deprecated Please ensure that `TextEditor` is used as a part of a `Form` component, which will handle the save functionality.
   */
  onSave?: (value: EditorFormattedValues) => void;
  /** The placeholder to display when the editor is empty */
  placeholder?: string;
  /** An array of link preview nodes to render in the editor */
  previews?: React.JSX.Element[];
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Whether the content of the editor is required to have a value */
  required?: boolean;
  /** Number greater than 2 multiplied to override the default min-height of the editor */
  rows?: number;
  /** The size of the toolbar */
  size?: "small" | "medium" | "large";
  /** The message to be shown when the editor is in an warning state */
  warning?: string;
  /**
   * Alias of `initialValue` prop.
   * @deprecated Please use `initialValue` instead.
   */
  value?: string | undefined;
  /** The initial value of the editor, as a HTML string, or JSON */
  initialValue?: string | undefined;
  /**
   * Allows the injection of one or more Lexical-compatible React components into the editor to extend its functionality.
   * This prop is optional and supports a single plugin, multiple plugins (via fragments or arrays), or `null`.
   */
  customPlugins?: React.ReactNode;
  /** Render the ValidationMessage above the TextEditor */
  validationMessagePositionTop?: boolean;
  /**  */
  toolbarControls?: ToolbarControl[];
}

export interface PlaceholderProps {
  /** The namespace of the editor that this placeholder belongs to */
  namespace: string;
  /** The text to display in the placeholder */
  text: string | undefined;
}

export interface ContentEditorProps {
  /** A hint string rendered before the editor but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /** Whether the content editor has focused */
  isFocused?: boolean;
  /** The namespace of the editor that this content editor belongs to */
  namespace: string;
  /** The link previews to render at the foot of the editor */
  previews?: React.JSX.Element[];
  /** The number of rows to render in the editor */
  rows?: number;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Whether the editor is required */
  required?: boolean;
  /** Editor has an error */
  error?: boolean;
  /** Editor has a warning */
  warning?: boolean;
  /** Render the ValidationMessage above the Editor */
  validationMessagePositionTop?: boolean;

  /** The size of the content editor */
  size?: "small" | "medium" | "large";
}

export interface CharacterCounterPluginProps {
  /** Whether the content editor has focused */
  isFocused?: boolean;
  /** The maximum number of characters to allow before showing the warning */
  maxChars: number;
  /** The namespace of the editor that this counter belongs to */
  namespace: string;
  /** The size of the content editor */
  marginTop?: string;
}

export interface FocusCommandPayload {
  defaultToEnd: boolean;
}

export interface ToolbarProps {
  /** Reference to the editor for the toolbar to consume */
  contentEditorRef: RefObject<HTMLDivElement>;
  /** The namespace of the editor that this toolbar belongs to */
  namespace: string;
  /** Determines if the Text Editor has a header */
  hasHeader?: boolean;
  /** The callback to call when the cancel button is clicked */
  onCancel?: (editor: LexicalEditor) => void;
  /** The callback to call when the save button is clicked */
  onSave?: (value: EditorFormattedValues) => void;
  /** The size of the toolbar */
  size?: "small" | "medium" | "large";
  /** The list of enabled controls */
  toolbarControls?: ToolbarControl[];
}

export type ButtonGroupProps = {
  /** The children of the button group */
  children?: React.ReactNode | React.ReactNode[];
  /** The name of the button group */
  name: string;
  /** The namespace of the containing editor */
  namespace?: string;
  /** Determines if the button group should show a divider */
  showDivider?: boolean;
};

export interface FormattingButtonProps {
  /** Whether the button is active or not, relative to the text at the current cursor position */
  isActive: boolean;
  /** Whether the button is the first in a group of buttons */
  isFirstButton?: boolean;
  /** The namespace of the editor that this button belongs to */
  namespace: string;
  /** The size of the button */
  size?: "small" | "medium" | "large";
}

export interface SaveObjectProps {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
}

export interface SaveProps {
  children: SaveObjectProps[];
}

export interface EditorFormattedValues {
  htmlString?: string;
  json?: {
    root: {
      children: SaveProps[];
      direction: string;
      format: string;
      indent: number;
      type: string;
      version: string;
    };
  };
}

export interface SaveButtonProps {
  /** The namespace of the editor that this button belongs to */
  namespace: string;
  /** The callback to call when the save button is clicked */
  onSave: (value: EditorFormattedValues) => void;
  /** The size of the button */
  size?: "small" | "medium" | "large";
}

export type ToolbarControl =
  | "typography"
  | "bold"
  | "italic"
  | "underline"
  | "unordered-list"
  | "ordered-list"
  | "link";

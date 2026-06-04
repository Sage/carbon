# Text Editor

Provides an interactive Text Editor that allows users to format text with various styles and save the content as JSON or HTML. For further documentation on this component, please read our documentation regarding Lexical

## Import

```javascript
import TextEditor, {
  createEmpty,
  createFromHTML,
  type TextEditorHandle,
} from "carbon-react/lib/components/text-editor";
```

## Validation States

This component supports input validation, see our Validations documentation page for more information.

## Examples

### Focusing the Text Editor Programmatically

The `TextEditorHandle` type provides an imperative handle for programmatic control over the Text Editor.
Using a `ref`, you can access its `focus()` method to set focus on the Text Editor as needed.

See: `examples/ProgrammaticFocus.md`

### Toolbar controls

The `toolbarControls` prop allows you to customize which controls are displayed in the toolbar. It accepts an array of strings, each representing a control to be included. The available controls are:

- `typography`
- `bold`
- `italic`
- `underline`
- `unordered-list`
- `ordered-list`
- `link`

By default, all controls are included, but you can provide any combination of them to tailor the toolbar to your specific needs.

See: `examples/ToolbarControls.md`

### With Header and Footer

The Text Editor accepts `header` and `footer` properties that can contain any valid React node, rendered above the toolbar and below the editor respectively to provide space for custom elements like titles, controls, or contextual information.

See: `examples/HeaderAndFooter.md`

### onChange Handler

Providing an `onChange` callback allows for accessing any content updates within the editor. The function will be called whenever text content is modified or styled.

#### Parameters

- `value`: The updated text content as a string.
- `formattedValues`: An object containing two properties that represent the editor's content in a serialised format. This can be used to save the content to an external store like a database or local storage.
  - `htmlString`: A HTML representation of the editor content, as a string.
  - `json`: The JSON representation of the editor content, as a string.

> **Note**: `TextEditor` is an uncontrolled component. See [Externally overwriting the editor's content](#externally-overwriting-the-editors-content) for details on updating content after initialization.

See: `examples/OnChange.md`

### Externally overwriting the editor's content

**`TextEditor` is an uncontrolled component**. It manages its own underlying state for performance reasons, since it manages a virtual DOM representation of the editor content, which is expensive to update frequently. However, there are times when you may need to externally overwrite the editor's content, for example, when resetting a form or updating the content based on external data from a server or local storage.

Updating the component's `key` will force React to re-create it, which will reset the editor's content to a new `initialValue` provided.

> **Caution**: Be wary about overwriting the editor's content too frequently. As resetting the component's key re-creates it from scratch each time, so doing this regularly could lead to a poor user experience. The editor is designed to handle its own state efficiently, so external updates should be used sparingly.

See: `examples/ExternallyOverwriting.md`

### onSave Handler

To handle the content of the editor when the `Save` button is clicked, you can set the `onSave` property to a function. The callback function
returns two values: the JSON and HTML content of the editor. The value of `json` reflects the structure that the editor understands/uses
internally; the value of `htmlString` is the raw content of the editor in HTML format (note that the HTML returned is not complete HTML - only
the content of the editor is converted).

If the `onSave` property is not provided, the `Save` button will not be displayed.

Type into the editor and the click the **Show Data Formats** button in the example below to see the JSON and HTML content of the editor.

See: `examples/OnSave.md`

### onFormSubmission Handler (with Inline Styles)

The `onFormSubmission` callback is triggered when the parent form is submitted. This is particularly useful when your Text Editor is nested within a `Form` component. Simply pass the callback as a prop to the TextEditor component.

The callback receives an object containing:

1. **`formattedValues`**: An object containing the serialised editor content:

   - `htmlString`: A HTML representation of the editor content with CSS classes, as a string.
   - `json`: The JSON representation of the editor content.

2. **`htmlStringWithInlineStyles`**: A string containing HTML with all formatting converted to inline styles instead of CSS classes. This format is especially useful for:
   - Templates where external stylesheets are not supported
   - Exporting content to external systems
   - Portable content that needs to maintain styling without dependencies

**Key Difference from `onSave`**: While `onSave` is a callback prop on the TextEditor for immediate save operations, `onFormSubmission` is triggered specifically when the containing form is submitted, making it ideal for form-based workflows.

See: `examples/OnFormSubmission.md`

### Setting Initial Values

You can set the editor's initial value using either HTML or JSON format. For HTML content, use the `createFromHTML` function to convert it to the editor's expected format, then pass the result to the `initialValue` property. For JSON content, pass the object directly to `initialValue` using the same format returned by the `onSave` callback.

See: `examples/SettingInitialValues.md`

### Link Support

The editor supports adding links by typing URLs directly or selecting text and pasting a URL to wrap it as a link. Links open in new tabs when clicked.

See: `examples/LinksAndWithLinkAddedCallback.md`

### With Link Previews

The `previews` property accepts an array of React JSX elements to render link previews below the editor. You can use simple anchor elements, custom preview components, or mix different styles as needed.

See: `examples/WithLinkPreviews.md`

### Translations

You can override the default translations for the Text Editor by passing a custom locale object to the `i18nProvider`. Consult the [translation keys](#translation-keys) section for a list of available keys.

See: `examples/Translations.md`

### Read-Only Mode

You can specify that the editor should be read-only by setting the `readOnly` property to `true`. In read-only mode, the editor will not allow any changes to be made to the content.

See: `examples/ReadOnly.md`

### Multiple Editors

You can render multiple instances of the Text Editor on the same page. Each editor should have a unique `namespace` property, which is used to identify
the editor when monitoring for formatting changes, accessible navigation, etc.

See: `examples/MultipleEditors.md`

### With Custom Plugins

The `customPlugins` prop allows consumers of the `TextEditor` component to inject one or more custom [Lexical](https://lexical.dev/) plugins. This provides flexibility to extend the editor with features like mentions, emoji pickers, custom toolbars, and more — without modifying the core editor. This prop is optional and supports a single plugin, multiple plugins (via fragments or arrays), or `null`.

#### Example: Creating and Using a Custom Plugin

```tsx
// CustomWordCountPlugin.tsx
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getRoot } from "lexical";

const CustomWordCountPlugin = () => {
  // Get the Lexical editor instance from context
  const [editor] = useLexicalComposerContext();
  // Local state to store the current word count
  const [wordCount, setWordCount] = useState(0);
  useEffect(() => {
    // Register a listener to run every time the editor updates
    return editor.registerUpdateListener(({ editorState }) => {
      // Read the editor state in a read-only context
      editorState.read(() => {
        // Get the full text content from the root of the editor
        const text = $getRoot().getTextContent();
        // Split the text by whitespace and count non-empty words
        const count = text.trim().split(/\s+/).filter(Boolean).length;
        // Update local word count state
        setWordCount(count);
      });
    });
  }, [editor]); // Only run this effect once per editor instance
  // Render the word count UI with styled container
  return (
    <Typography ml={1} mb={0}>
      Word Count: {wordCount}
    </Typography>
  );
};
```

```tsx
// Using it with TextEditor
import TextEditor from "./TextEditor";
import { CustomWordCountPlugin } from "./CustomWordCountPlugin";

const App = () => (
  <TextEditor
    labelText="Text Editor"
    customPlugins={<CustomWordCountPlugin />}
  />
);
```

See: `examples/WithCustomPlugins.md`

### Mentions

The Text Editor supports mentions, and offers a built-in `Mentions` component to facilitate this. The `Mentions` component provides an interface for displaying a list of mentionable items and handling user interactions.

To use the `Mentions` component, you need to provide it with a list of items that can be mentioned. Each item should be a `Mention` instance and have an `id` and a `name`.

```tsx
import TextEditor, {
  MentionsPlugin,
  Mention,
} from "carbon-react/lib/components/text-editor";

const mentionsData: Mention[] = [
  {
    id: "1",
    name: "Amanda Ball",
  },
  {
    id: "2",
    name: "Anaya Underwood",
    initials: "AU",
  },
  {
    id: "3",
    name: "Alastair Cox",
    initials: "AC",
  },
  {
    id: "4",
    name: "Anwar al-Awlaki",
    src: "https://loremfaces.net/24/id/2.jpg",
  },
  {
    id: "5",
    name: "Angela Alabaster",
    src: "https://loremfaces.net/24/id/1.jpg",
  },
  {
    id: "6",
    name: "Alfred Jones",
    iconType: "accessibility_web",
  },
];
```

Import the `Mentions` component and include it in the `customPlugins` prop of the `TextEditor`. You also need to provide an array of `Mention` items that can be queried (this will happen internal to the plugin).

Queries are triggered by typing the `@` character followed by text. The plugin will filter the provided items based on the query and display a list of matching items.

Mentions accept the following properties. If none of `initials`, `src` and `iconType` are provided, then a default icon will be displayed:

| Property | Purpose                                                         |
| -------- | --------------------------------------------------------------- |
| id       | The ID of the Mention entry                                     |
| name     | The name shown in the list                                      |
| initials | The initials to be shown in the Mention's avatar                |
| iconType | The icon to be used in the Mention's avatar                     |
| src      | The source URL of the image to be shown in the Mention's avatar |

See: `examples/Mentions.md`

## Props

### Text Editor

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| labelText | string | Yes |  |  |  | The label to display above the editor |  |
| characterLimit | number \| undefined | No |  |  |  | The maximum number of characters allowed in the editor |  |
| customPlugins | React.ReactNode | No |  |  |  | Allows the injection of one or more Lexical-compatible React components into the editor to extend its functionality. This prop is optional and supports a single plugin, multiple plugins (via fragments or arrays), or `null`. |  |
| error | string \| undefined | No |  |  |  | The message to be shown when the editor is in an error state |  |
| footer | React.ReactNode | No |  |  |  | Custom footer content to be displayed below the editor |  |
| header | React.ReactNode | No |  |  |  | Custom header content to be displayed above the editor |  |
| id | string \| undefined | No |  |  |  | The id attribute, set on the content editable div within the Text Editor |  |
| initialValue | string \| undefined | No |  |  |  | The initial value of the editor, as a HTML string, or JSON |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the editor but after the label. Intended to describe the purpose or content of the input. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| namespace | string \| undefined | No |  |  |  | The identifier for the Text Editor. This allows for the using of multiple Text Editors on a screen |  |
| onBlur | ((ev: React.FocusEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Callback that is triggered when the editor loses focus. |  |
| onChange | ((value: string, formattedValues: EditorFormattedValues) => void) \| undefined | No |  |  |  | Callback that is triggered when the editor's text content is modified or styled. |  |
| onFocus | ((ev: React.FocusEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Callback that is triggered when the editor gains focus. |  |
| onFormSubmission | ((value: EditorFormattedValuesWithInlineStyles) => void) \| undefined | No |  |  |  | Callback that is triggered when a parent form of the editor is submitted. The callback returns the current content of the editor in multiple formats, including HTML with inline styles. |  |
| onLinkAdded | ((link: string, state: string) => void) \| undefined | No |  |  |  | Callback that is triggered when a link is added in the editor's content. |  |
| placeholder | string \| undefined | No |  |  |  | The placeholder to display when the editor is empty |  |
| previews | React.JSX.Element[] | No |  |  |  | An array of link preview nodes to render in the editor |  |
| readOnly | boolean \| undefined | No |  |  |  | Whether the editor is read-only |  |
| required | boolean \| undefined | No |  |  |  | Whether the content of the editor is required to have a value |  |
| rows | number \| undefined | No |  |  |  | Number greater than 2 multiplied to override the default min-height of the editor |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | The size of the toolbar |  |
| toolbarControls | ToolbarControl[] \| undefined | No |  |  |  |  |  |
| validationMessagePositionTop | boolean \| undefined | No |  |  |  | Render the ValidationMessage above the TextEditor |  |
| warning | string \| undefined | No |  |  |  | The message to be shown when the editor is in an warning state |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | The aria-label to be rendered when in read-only mode |  |
| onCancel | (() => void) \| undefined | No |  | Yes | Please ensure that `TextEditor` is used as a part of a `Form` component, which will handle the cancel functionality. | [Legacy] Callback that is triggered when the editor's cancel button is activated. The cancel button is rendered when this function is provided. |  |
| onSave | ((value: EditorFormattedValues) => void) \| undefined | No |  | Yes | Please ensure that `TextEditor` is used as a part of a `Form` component, which will handle the save functionality. | [Legacy] Callback that is triggered when the editor's save button is activated. The save button is rendered when this function is provided. |  |
| value | string \| undefined | No |  | Yes | Please use `initialValue` instead. | Alias of `initialValue` prop. |  |

## Ref methods

`TextEditor`'s forwarded ref exposes the following imperative methods:

| Method Name | Description                               |
| ----------- | ----------------------------------------- |
| `focus()`   | Programmatically focuses the text editor. |

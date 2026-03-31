---
name: carbon-component-text-editor
description: Carbon TextEditor component props and usage examples.
---

# TextEditor

## Import
`import TextEditor from "carbon-react/lib/components/text-editor";`

## Source
- Export: `./components/text-editor`
- Props interface: `TextEditorProps`

## Props
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

## Examples
### Demo

**Args**

```tsx
{
    labelText: "Text Editor Label",
    placeholder: "Enter your text here...",
    rows: 4,
    size: "medium",
    namespace: "storybook-demo",
    inputHint: "",
    characterLimit: undefined,
    required: false,
    readOnly: false,
    error: "",
    warning: "",
    validationMessagePositionTop: false,
    header: "",
    footer: "",
    toolbarControls: [
      "typography",
      "bold",
      "italic",
      "underline",
      "unordered-list",
      "ordered-list",
      "link",
    ],
    initialValue: undefined,
    // Callbacks handled via actions
    onChange: action("onChange"),
    onFocus: action("onFocus"),
    onBlur: action("onBlur"),
    onLinkAdded: action("onLinkAdded"),
    onCancel: action("onCancel"),
    onSave: action("onSave"),
  }
```

**Render**

```tsx
(args: TextEditorProps) => (
    <Box mx={2} my={0}>
      <Typography mb={2}>
        This is an interactive demo of the Text Editor component. Use the
        controls in the panel below to modify props and see how the component
        behaves with different configurations.
      </Typography>
      <TextEditor
        {...args}
        customPlugins={
          <MentionsPlugin
            namespace={args.namespace || "storybook-mentions"}
            searchOptions={[
              {
                id: "1",
                name: "Amanda Ball",
              },
              {
                id: "2",
                name: "Anaya Underwood",
              },
              {
                id: "3",
                name: "Tylar Cox",
              },
              {
                id: "4",
                name: "Ibrahim Abbasov",
              },
            ]}
          />
        }
      />
    </Box>
  )
```


### Focusing the Text Editor Programmatically

**Render**

```tsx
() => {
  const editorRef = useRef<TextEditorHandle>(null);

  return (
    <Box mx={2} my={0}>
      <Button mb="30px" onClick={() => editorRef.current?.focus()}>
        Focus the editor
      </Button>

      <TextEditor
        ref={editorRef}
        namespace="storybook-default"
        labelText="Text Editor"
      />
    </Box>
  );
}
```


### ToolbarControls

**Args**

```tsx
{
    labelText: "Text Editor Label",
    rows: 4,
    size: "medium",
    namespace: "storybook-demo",
    toolbarControls: ["typography", "italic", "unordered-list", "link"],
  }
```

**Render**

```tsx
(args: TextEditorProps) => (
    <Box mx={2} my={0}>
      <TextEditor {...args} />
    </Box>
  )
```


### With Header and Footer

**Render**

```tsx
() => {
  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-header-and-footer"
        labelText="Text Editor"
        header={<Button buttonType="gradient-white">Button</Button>}
        footer={
          <Typography color="--colorsUtilityYin055">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text{" "}
            <Link href="https://carbon.sage.com/?path=/story/welcome--welcome-page">
              ever since the 1500s
            </Link>
          </Typography>
        }
      />
    </Box>
  );
}
```


### onChange Handler

**Render**

```tsx
() => {
  const [valueString, setValueString] = React.useState<string | undefined>(
    undefined,
  );
  const [valueHTML, setValueHTML] = React.useState<string | undefined>(
    undefined,
  );

  const handleChange = useCallback(
    (value: string, formattedValues: EditorFormattedValues) => {
      setValueString(value);
      setValueHTML(formattedValues.htmlString);
    },
    [],
  );

  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-onchange"
        labelText="Text Editor"
        onChange={handleChange}
      />
      <div>Unformatted content: {valueString || "No content"}</div>
      <div>
        HTML formatted content:{" "}
        {valueHTML === "<p><br></p>" ? "No content" : valueHTML}
      </div>
    </Box>
  );
}
```


### Externally overwriting the editor's content

**Render**

```tsx
() => {
  const [content, setContent] = useState("");
  const [resetKey, setResetKey] = useState(generateGuid); // Use a guid string as a key for the editor

  const handleSubmit: FormProps["onSubmit"] = async (ev) => {
    ev.preventDefault();

    await saveContent(content); // Saving content to a server or local storage

    setResetKey(generateGuid()); // Reset editor by changing the key
    setContent("");
  };

  return (
    <Box mx={2} my={0}>
      <Form
        onSubmit={handleSubmit}
        saveButton={
          <Button type="submit" buttonType="primary">
            Save
          </Button>
        }
      >
        <TextEditor
          key={resetKey}
          labelText="Feedback"
          initialValue={createEmpty()}
          onChange={(value) => setContent(createFromHTML(value))}
        />
      </Form>
    </Box>
  );
}
```


### onSave Handler

**Render**

```tsx
() => {
  const [data, setData] = useState<EditorFormattedValues>({
    htmlString: "<p><br></p>",
    json: undefined,
  });
  const [showData, setShowData] = useState(false);
  return (
    <Box mx={2} my={0}>
      <>
        <TextEditor
          namespace="storybook-onsave"
          labelText="Text Editor"
          onSave={({ htmlString, json }) => setData({ htmlString, json })}
        />
      </>
      <Button
        buttonType="primary"
        size="small"
        my={2}
        onClick={() => setShowData(!showData)}
      >
        Show Data Formats
      </Button>
      {showData && (
        <Box
          display="flex"
          flexDirection="row"
          gap={4}
          justifyContent="space-around"
        >
          <Box maxWidth="30%">
            <Typography variant="h4" mb={1}>
              HTML
            </Typography>
            {data?.htmlString || "No content"}
          </Box>
          <Box maxWidth="30%">
            <Typography variant="h4" mb={1}>
              JSON
            </Typography>
            {JSON.stringify(data?.json, null, 2) || "No content"}
          </Box>
        </Box>
      )}
    </Box>
  );
}
```


### onFormSubmission Handler (with Inline Styles)

**Render**

```tsx
() => {
  const [data, setData] = useState<EditorFormattedValuesWithInlineStyles>({
    htmlString: "<p><br></p>",
    json: undefined,
    htmlStringWithInlineStyles: "",
  });
  const [showData, setShowData] = useState(false);

  const handleFormSubmit: FormProps["onSubmit"] = async (ev) => {
    ev.preventDefault();
  };

  return (
    <Box mx={2} my={0}>
      <Form
        onSubmit={handleFormSubmit}
        saveButton={
          <Button type="submit" buttonType="primary">
            Submit Form
          </Button>
        }
      >
        <TextEditor
          namespace="storybook-onformsubmission"
          labelText="Text Editor"
          onFormSubmission={setData}
        />
      </Form>
      <Button
        buttonType="primary"
        size="small"
        my={2}
        onClick={() => setShowData(!showData)}
      >
        Show Data Formats
      </Button>
      {showData && (
        <Box display="flex" flexDirection="column" gap={4}>
          <Box>
            <Typography variant="h4" mb={1}>
              HTML (with Classes)
            </Typography>
            <Box
              p={2}
              backgroundColor="--colorsUtilityYin025"
              borderRadius="borderRadius050"
              maxHeight="200px"
              overflow="auto"
            >
              {data?.htmlString || "No content"}
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" mb={1}>
              HTML (with Inline Styles)
            </Typography>
            <Box
              p={2}
              backgroundColor="--colorsUtilityYin025"
              borderRadius="borderRadius050"
              maxHeight="200px"
              overflow="auto"
            >
              {data?.htmlStringWithInlineStyles || "No content"}
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" mb={1}>
              JSON
            </Typography>
            <Box
              p={2}
              backgroundColor="--colorsUtilityYin025"
              borderRadius="borderRadius050"
              maxHeight="200px"
              overflow="auto"
            >
              {JSON.stringify(data?.json, null, 2) || "No content"}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
```


### Setting Initial Values

**Render**

```tsx
() => {
  const initialValue = `<p><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const value = createFromHTML(initialValue); // Use JSON.stringify(initialValue) when using JSON objects

  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-withhtmlvalue"
        labelText="Text Editor"
        initialValue={value}
      />
    </Box>
  );
}
```


### Link Support

**Render**

```tsx
() => {
  const defaultHTML = `<a href="https://carbon.sage.com/?path=/story/welcome--welcome-page" rel="noreferrer" ><span data-lexical-text="true">Carbon</span></a>`;
  const value = createFromHTML(defaultHTML);
  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-links"
        labelText="Text Editor"
        initialValue={value}
      />
    </Box>
  );
}
```


### Link Added Callback

**Render**

```tsx
() => {
  const [options, setOptions] = useState<{ url: string; state: string }>({
    url: "",
    state: "",
  });

  const handleLinkAdded = useCallback((link: string, state: string) => {
    setOptions({ url: link, state });
  }, []);

  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-linkscallback"
        labelText="Text Editor"
        onLinkAdded={handleLinkAdded}
      />
      <span>
        <strong>Link:</strong> {options.url || "No link added"}
        <br />
        <strong>Mutation:</strong> {options.state || "None"}
      </span>
    </Box>
  );
}
```


### Link Previews

**Render**

```tsx
() => {
  const initialValue = `<p><span data-lexical-text="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi ipsum, facilisis ut luctus non, gravida in orci. Aliquam risus massa, consequat non facilisis vel, bibendum quis nunc. Cras sit amet velit vel libero molestie accumsan. Integer id ipsum nec nunc porta bibendum. Aenean ut porta risus, eget dignissim felis. Praesent vitae tempus ante. Mauris nibh risus, congue ac augue ac, congue auctor metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae enim arcu. Integer quis mattis nunc, in porta neque. Proin sit amet purus congue, faucibus mauris id, consectetur justo. Vestibulum odio nisi, vehicula at odio ut, dapibus scelerisque tortor. Etiam vulputate massa orci, porttitor sollicitudin odio sollicitudin vitae. Mauris et eleifend dolor. Curabitur luctus lacinia sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus.</span></p>`;
  const value = createFromHTML(initialValue);

  const firstRender = useRef(false);
  const previews = useRef<React.JSX.Element[]>([]);
  const removeUrl = (reportedUrl: string | undefined) => {
    previews.current = previews.current.filter(
      (preview) => reportedUrl !== preview.props.url,
    );
  };

  if (!firstRender.current) {
    firstRender.current = true;
    previews.current.push(
      <EditorLinkPreview
        onClose={(urlString) => removeUrl(urlString)}
        title="Han Shot First"
        url="https://en.wikipedia.org/wiki/Han_shot_first"
        description="Had a slight weapons malfunction but, uh everything's perfectly all right now. We're fine. We're all fine here now. Thank you. How are you?"
        key="key-1"
      />,
    );
  }

  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-complexlinkpreviews"
        labelText="Text Editor"
        previews={previews.current}
        initialValue={value}
      />
    </Box>
  );
}
```


### Translations

**Render**

```tsx
() => {
  return (
    <I18nProvider
      locale={{
        ...enGB,
        textEditor: {
          boldAria: () => "Make text bold",
          cancelButton: () => "No",
          cancelButtonAria: () => "Cancel the current content",
          characterCounter: (count: string | number) =>
            `You've got ${count} characters left`,
          characterLimit: (count: number) =>
            `Please delete the last ${count} characters`,
          contentEditorAria: () => "Rich text content editor",
          italicAria: () => "Make text italic",
          orderedListAria: () => "Ordered list",
          saveButton: () => "Yes",
          saveButtonAria: () => "Save the current content",
          toolbarAriaLabel: () => "Formatting",
          unorderedListAria: () => "Unordered list",
          underlineAria: () => "Underline text",
          hyperlink: {
            buttonAria: () => "Hyperlink",
            cancelButton: () => "Cancel",
            cancelButtonAria: () => "Cancel",
            dialogTitle: () => "Add link",
            linkFieldLabel: () => "Link",
            saveButton: () => "Save",
            saveButtonAria: () => "Save",
            textFieldLabel: () => "Text",
          },
          typography: {
            selectAria: () => "Heading type",
            paragraph: () => "Paragraph",
            title: () => "Title",
            subtitle: () => "Subtitle",
            sectionHeader: () => "Section header",
            sectionSubheader: () => "Section subheader",
          },
          mentions: {
            listAriaLabel: () => "List of mentionable people",
          },
        },
      }}
    >
      <Box mx={2} my={0}>
        <TextEditor
          namespace="storybook-customtranslations"
          characterLimit={10}
          labelText="Translated Text Editor"
          onCancel={() => {}}
          onSave={() => {}}
        />
      </Box>
    </I18nProvider>
  );
}
```


### Read-Only Mode

**Render**

```tsx
() => {
  const initialValue = `<p><span style="white-space: pre-wrap;">This is an HTML example.</span><br><a href="https://carbon.sage.com/?path=/story/welcome--welcome-page" rel="noreferrer" ><span data-lexical-text="true">Carbon</span></a></p>`;
  const value = createFromHTML(initialValue);
  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-readonly"
        labelText="Text Editor"
        readOnly
        initialValue={value}
      />
    </Box>
  );
}
```


### Multiple Editors

**Render**

```tsx
() => {
  return (
    <Box mx={2} my={0}>
      <TextEditor labelText="Text Editor One" namespace="rte-one" />
      <TextEditor labelText="Text Editor Two" namespace="rte-two" />
    </Box>
  );
}
```


### With Custom Plugin

**Render**

```tsx
() => {
  const CustomWordCountPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [wordCount, setWordCount] = useState(0);
    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const text = $getRoot().getTextContent();
          const count = text.trim().split(/\s+/).filter(Boolean).length;
          setWordCount(count);
        });
      });
    }, [editor]);
    return <Typography m={1}>Word Count: {wordCount}</Typography>;
  };

  return (
    <Box mx={2} my={0}>
      <TextEditor
        placeholder="Example of a custom word count plugin that updates in real time, showing the number of words at the bottom left of the editor as you type."
        namespace="storybook-default"
        labelText="Text Editor"
        customPlugins={<CustomWordCountPlugin />}
      />
    </Box>
  );
}
```


### Mentions

**Args**

```tsx
{
  characterLimit: 1000,
  error: "",
  inputHint: "Type '@' to mention someone",
  labelText: "Text Editor with Mentions support",
  namespace: "storybook-mentions",
  readOnly: false,
  size: "medium",
  warning: "",
}
```

**Render**

```tsx
({ ...args }) => {
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

  return (
    <Box mx={2} my={0}>
      <main>
        <TextEditor
          namespace="storybook-mentions"
          labelText="Text Editor"
          inputHint="Press '@' to mention someone"
          onChange={action("onChange")}
          customPlugins={[
            <MentionsPlugin
              namespace="storybook-mentions"
              searchOptions={mentionsData}
            />,
          ]}
          {...args}
        />
      </main>
    </Box>
  );
}
```


### MDX Example 1

**Args**

```tsx
To use the Text Editor, import the `TextEditor` component. Use `createFromHTML` to convert HTML content for the editor, or `createEmpty` for an empty initial state.

## Interactive Demo

Use the [Demo](../?path=/story/text-editor--demo) story with controls to explore basic props, callbacks, and validation states.

## Advanced Usage

### Focusing the Text Editor Programmatically

The `TextEditorHandle` type provides an imperative handle for programmatic control over the Text Editor.
Using a `ref`, you can access its `focus()` method to set focus on the Text Editor as needed.

<Canvas of={TextEditorStories.ProgrammaticFocus} />

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

<Canvas of={TextEditorStories.ToolbarControls} />

### With Header and Footer

The Text Editor accepts `header` and `footer` properties that can contain any valid React node, rendered above the toolbar and below the editor respectively to provide space for custom elements like titles, controls, or contextual information.

<Canvas of={TextEditorStories.HeaderAndFooter} />

### onChange Handler

Providing an `onChange` callback allows for accessing any content updates within the editor. The function will be called whenever text content is modified or styled.

#### Parameters

- `value`: The updated text content as a string.
- `formattedValues`: An object containing two properties that represent the editor's content in a serialised format. This can be used to save the content to an external store like a database or local storage.
  - `htmlString`: A HTML representation of the editor content, as a string.
  - `json`: The JSON representation of the editor content, as a string.

> **Note**: `TextEditor` is an uncontrolled component. See [Externally overwriting the editor's content](#externally-overwriting-the-editors-content) for details on updating content after initialization.

<Canvas of={TextEditorStories.OnChange} />

### Externally overwriting the editor's content

**`TextEditor` is an uncontrolled component**. It manages its own underlying state for performance reasons, since it manages a virtual DOM representation of the editor content, which is expensive to update frequently. However, there are times when you may need to externally overwrite the editor's content, for example, when resetting a form or updating the content based on external data from a server or local storage.

Updating the component's `key` will force React to re-create it, which will reset the editor's content to a new `initialValue` provided.

> **Caution**: Be wary about overwriting the editor's content too frequently. As resetting the component's key re-creates it from scratch each time, so doing this regularly could lead to a poor user experience. The editor is designed to handle its own state efficiently, so external updates should be used sparingly.

<Canvas of={TextEditorStories.ExternallyOverwriting} />

### onSave Handler

To handle the content of the editor when the `Save` button is clicked, you can set the `onSave` property to a function. The callback function
returns two values: the JSON and HTML content of the editor. The value of `json` reflects the structure that the editor understands/uses
internally; the value of `htmlString` is the raw content of the editor in HTML format (note that the HTML returned is not complete HTML - only
the content of the editor is converted).

If the `onSave` property is not provided, the `Save` button will not be displayed.

Type into the editor and the click the **Show Data Formats** button in the example below to see the JSON and HTML content of the editor.

<Canvas of={TextEditorStories.OnSave} />

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

<Canvas of={TextEditorStories.OnFormSubmission} />

### Setting Initial Values

You can set the editor's initial value using either HTML or JSON format. For HTML content, use the `createFromHTML` function to convert it to the editor's expected format, then pass the result to the `initialValue` property. For JSON content, pass the object directly to `initialValue` using the same format returned by the `onSave` callback.

<Canvas of={TextEditorStories.SettingInitialValues} />

### Link Support

The editor supports adding links by typing URLs directly or selecting text and pasting a URL to wrap it as a link. Links open in new tabs when clicked.

<Canvas of={TextEditorStories.Links} />

There may be times when you want to perform an action when a link is added to the editor. You can use the `onLinkAdded` callback to obtain a
string representation of the link that was added, updated or removed. The function will be called whenever a link is added to the editor.
In the example below, the most recently-added link will be displayed in the `Link` section below the editor; adding a new link will replace
the previous one.

Note that this usage is for demonstration purposes only; you should maintain the list of URLs added to the editor in your application state.

<Canvas of={TextEditorStories.WithLinkAddedCallback} />

### With Link Previews

The `previews` property accepts an array of React JSX elements to render link previews below the editor. You can use simple anchor elements, custom preview components, or mix different styles as needed.

<Canvas of={TextEditorStories.WithLinkPreviews} />

### Translations

You can override the default translations for the Text Editor by passing a custom locale object to the `i18nProvider`. Consult the [translation keys](#translation-keys) section for a list of available keys.

<Canvas of={TextEditorStories.Translations} />

### Read-Only Mode

You can specify that the editor should be read-only by setting the `readOnly` property to `true`. In read-only mode, the editor will not allow any changes to be made to the content.

<Canvas of={TextEditorStories.ReadOnly} />

### Multiple Editors

You can render multiple instances of the Text Editor on the same page. Each editor should have a unique `namespace` property, which is used to identify
the editor when monitoring for formatting changes, accessible navigation, etc.

<Canvas of={TextEditorStories.MultipleEditors} />

### With Custom Plugins

The `customPlugins` prop allows consumers of the `TextEditor` component to inject one or more custom [Lexical](https://lexical.dev/) plugins. This provides flexibility to extend the editor with features like mentions, emoji pickers, custom toolbars, and more — without modifying the core editor. This prop is optional and supports a single plugin, multiple plugins (via fragments or arrays), or `null`.

#### Example: Creating and Using a Custom Plugin
```


### MDX Example 2

**Args**

```tsx
<Canvas of={TextEditorStories.WithCustomPlugins} />

### Mentions

The Text Editor supports mentions, and offers a built-in `Mentions` component to facilitate this. The `Mentions` component provides an interface for displaying a list of mentionable items and handling user interactions.

To use the `Mentions` component, you need to provide it with a list of items that can be mentioned. Each item should be a `Mention` instance and have an `id` and a `name`.
```

